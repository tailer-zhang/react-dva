import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker,Toast} from 'antd-mobile';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import styles from '../../styles/customer/personalCustAddMore.less';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { createForm } from 'rc-form';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import * as  Commons from '../../utils/commonUtil';


const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

import tradeInfo from '../../styles/trade/redeem.less';
import tradeStyles from '../../styles/trade/trade.less';

const TabPane = Tabs.TabPane;
const Item = List.Item;
let isRepeat = 0;
export default class FundChangeAskTabs extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {
      isFixed: false
    }
  }

  componentDidMount()
  {

  }

  onFocus(){
    this.setState({ isFixed:true })
  }

  onBlur(){
    this.setState({ isFixed:false })
  }

  submit(e) {
    let { dispatch,formStorage,form} = this.props;
    let {formValue,operCertPic,reqPic} = formStorage;

    if(!reqPic||reqPic.length<=0)
    {
      Toast.fail('转换申请资料不能为空!',3,undefined,true);
      return;
    }
    else if(formValue.custType=='0'){
      if(!operCertPic||operCertPic.length<=0)
      {
        Toast.fail('经办人资料不能为空!',3);
        return;
      }
    }
    if(isRepeat >= 1) return;
    form.validateFields((error,value)=>{
      if(!error)
      {
        let saveValue = {
          ...value,
          custId:formValue.custId,
          custType:formValue.custType,
          prodId:formValue.prodId,
          shrTypeId:formValue.shrTypeId,
          tradAcct:formValue.tradAcct,
          operCertPic:formStorage.operCertPic,
          custShrId:formValue.id,
          reqPic:formStorage.reqPic,
          avlShr:formValue.avlShr,
          targProdInfo:formValue.targProdInfo,
        };
        if(saveValue.remitDate)
          saveValue.remitDate = saveValue.remitDate.format('YYYY-MM-DD');
        if(formValue.avlShr<saveValue.reqShr)
        {
          Toast.fail('转换份额不应超过可用份额!',3);
          return;
        }
        // console.log('=====xxxxxxxsddsds===',saveValue);
        isRepeat = 1;
        Toast.loading('转换申请资料提交中...',60,undefined,true);
        dispatch({
          type:'tradeForm/fetchFundChangeAsk',
          payload:{
            params:saveValue,
            backMethord:(data)=>{
              isRepeat = 0;
              Toast.hide();
              if(data&&data.code=='00')
              {
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                  successTitle:'转换申请提交成功!',
                  backTitle:'返回转换买列表',
                  backMethord:()=>{
                    dispatch(routerRedux.push({pathname:'/fundChangeList'}))
                  }
                }}));
              }
              else if(data&&data.message){
                let cutStr = "<br/>";
                if(data.message.indexOf(cutStr)>0){
                  let newMessage = data.message.replace(new RegExp(cutStr),"");
                  Toast.fail(<textarea rows='5' cols='40' style={{backgroundColor:'rgba(0,0,0,0)',color:'#ffffff',textAlign:'center' }} defaultValue={newMessage} />,3);
                }
                else {
                  Toast.fail(data.message,3)
                }
              }
              else {
                Toast.fail('转换申请提交失败！',3);
              }
            }
          }
        });
      }
      else Toast.fail('输入参数存在错误！',3)
    });
  }

  tabClick(key)
  {
    // let {setpNum} = this.state;
    //
    // if(key>setpNum)
    //   return;
    // this.setState({
    //   defaultActiveKey:key
    // });
    let {dispatch} = this.props;
    dispatch({
      type:'formStorage/fetch',
      payload:{
        defaultActiveKey:key
      }
    });
  }

  onChange(files, type, index)
  {
    // console.log('files',files,type,index);
    let {dispatch,formStorage,customer} = this.props;
    let {operCertPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
     if(image.file.size > 5000000){//5M 5000000
       Toast.fail('文件大小超出限制',3);
       return;
     }
     dispatch({
       type:'trade/uploadTradeCommonFiles',
       payload:{
        params:{},
         images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              // console.log('========resultFiles',resultFiles);
              if(files.length>0)
              {
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      operCertPic:formStorage.operCertPic?formStorage.operCertPic.concat(resultFiles):resultFiles
                    }
                  });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
          }
        }
     });

    }
    else if(type=='remove')//表示移除图片
    {
      // console.log('sssssss',index);

      operCertPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            operCertPic:operCertPic
          }
      });

      let image = files.splice(index,1);

      files.map((item,value)=>{
        images.push({file:item.file});
        return images;
      })
      // dispatch({
      //   type:'trade/uploadTradeCommonFiles',
      //   payload:{
      //    params:{},
      //     images:image.file,
      //      backMethord:(data)=>{
      //        if(data&&data.code=='0'&&data.object)
      //        {
      //          let resultFiles = data.object.files;
      //          if(files.length>0)
      //          {
      //            dispatch({
      //                type:'formStorage/fetch',
      //                payload:{
      //                  operCertPic:formStorage.operCertPic?formStorage.operCertPic.concat(resultFiles):resultFiles
      //                }
      //              });
      //          }
      //        }
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
      //      }
      //    }
      // });
    }
  }

  onChange1(files, type, index)
  {
    // console.log('files',files,type,index);
    let {dispatch,formStorage,customer} = this.props;
    let {reqPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
     console.log('image',image);
     dispatch({
       type:'trade/uploadTradeCommonFiles',
       payload:{
        params:{},
         images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(files.length>0)
              {
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      reqPic:formStorage.reqPic?formStorage.reqPic.concat(resultFiles):resultFiles
                    }
                  });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
          }
        }
     });

    }
    else if(type=='remove')//表示移除图片
    {
      reqPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            reqPic:reqPic
          }
      });

      let image = files.splice(index,1);

      files.map((item,value)=>{
        images.push({file:item.file});
        return images;
      })
      // dispatch({
      //   type:'trade/uploadTradeCommonFiles',
      //   payload:{
      //    params:{},
      //     images:image.file,
      //      backMethord:(data)=>{
      //        if(data&&data.code=='0'&&data.object)
      //        {
      //          let resultFiles = data.object.files;
      //          if(files.length>0)
      //          {
      //            dispatch({
      //                type:'formStorage/fetch',
      //                payload:{
      //                  reqPic:formStorage.reqPic?formStorage.reqPic.concat(resultFiles):resultFiles
      //                }
      //              });
      //          }
      //        }
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
      //      }
      //    }
      // });
    }
  }

  getOptions0()
  {
    let { formStorage, dispatch, form } = this.props;
    let { formValue } = formStorage;

    return ({
      space0:{valueType:'whiteSpace'},
      avlShr:{
        valueType:'selfSelect',
        title:'可转换份额',
        desc:'可转换份额',
        extra:formValue.avlShr,
        arrow:'empty',
        required:'true',
      },
      targProdInfo: {
        required:true,
        valueType:'selfSelect',
        title:'转入产品',
        desc:'转入产品',
        extra:formValue.targProdInfoDesc,
        otherProps:{
          error:!formValue.targProdInfo,
        },
        onClick:()=>{
          dispatch(routerRedux.push({
            pathname: '/fundProdList',
            state: {
              params: {prodId:formValue.prodId, shrTypeId:formValue.shrTypeId},
              selectValue: formValue.targProdInfo,
              formValue: formValue
            }
          }));
        }
      },
      reqShr:{
        title:'转换份额',
        desc:'转换份额',
        type:'text',
        required:'true',
        otherProps:{
          extra:<span style={{color:'red', display:'block'}}>{
            form.getFieldValue('reqShr') === formValue.avlShr ? '取消' : '全部'
          }</span>,
          onExtraClick:() => {
            form.setFieldsValue({
              reqShr:form.getFieldValue('reqShr') === formValue.avlShr ? '' : formValue.avlShr
            });
          }
        }
      },
      remitDate:{
        title:'转换时间',
        desc:'转换时间',
        valueType:'date',
        mode:'date',
        extra:'可选,小于结束日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
      }
    })
  }

  getOptions1()
  {
    return({
      operator:{
        title:'经办人姓名',
        desc:'姓名',
        type:'text',
        required:true,
      },
      operCertType:{
        title:'经办人证件类型',
        desc:'证件类型',
        valueType:'select',
        type:Dic.fetchDicList('certType'),
        required:true,
      },
      operCertNo:{
        title:'经办人证件号码',
        desc:'证件号码',
        type:'text',
        required:true,
      },
    })
  }
  getOptions2()
  {
    let { formStorage } = this.props;
    let { formValue } = formStorage;
    return ({
      space1:{valueType:'whiteSpace'},
      remark:{
        title:'转换原因',
        type:'text',
        numberOfLines:3,
        placeholder:'请输入转换原因',
        required:'true',
      }
    })
  }
  render(){
    const { dispatch,onChangeMethord,form,askInfo,tradeForm,formStorage,customer} = this.props;
    let { formValue,defaultActiveKey } = formStorage;
    let infoList = askInfo.postModel;
    let custType = formValue.custType;

    const { getFieldProps,getFieldError } = this.props.form;
    let { deActiveKey,stepNum,btnText } = this.state;
    let isFixed = this.state.isFixed;

    let operFiles = formStorage.operCertPic?formStorage.operCertPic:[];
    let operCertPic = [];
    operFiles.map((item,index)=>{
      operCertPic.push({url:Commons.ImageHostAddress+item.fileId});
    });


    let reqFiles = formStorage.reqPic?formStorage.reqPic:[];
    let reqPic = [];
    reqFiles.map((item,index)=>{
      reqPic.push({url:Commons.ImageHostAddress+item.fileId});
    });

    return (
      <div>
        <Tabs defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'} swipeable={false} animated={false} onChange={this.tabClick.bind(this)}>
          <TabPane tab="转换信息" key="1">
             <div className={tradeInfo.prodInfo}>
               <ul className={tradeInfo.indoUlLeft}>
                 <li>产品名称</li>
                 <li>产品类别</li>
                 <li>客户名称</li>
                 <li>客户类型</li>
                 <li>客户证件类型</li>
                 <li>证件号码</li>
               </ul>
               <ul className={tradeInfo.indoUlRight}>
                 <li>{infoList.prodName}</li>
                 <li>{infoList.prodExpiName}</li>
                 <li>{infoList.custName}</li>
                 <li>{Dic.fetchDicValue('custType',infoList.custType)}</li>
                 <li>{Dic.fetchDicValue('operCertType',infoList.certType)}</li>
                 <li>{infoList.certNo}</li>
               </ul>
             </div>
             <div>
               <Form options={this.getOptions0()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
               {
                 custType=='1'?<div />:<div><List.Item style={{backgroundColor:'#efeff4'}}>经办人</List.Item>
                 <Form options={this.getOptions1()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/></div>
               }
               <Form options={this.getOptions2()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
             </div>
             <p style={{height:'6.667rem'}}></p>
          </TabPane>
          <TabPane tab="资料上传" key="2">
            <PushFile
              key={'PushFile1'}
              onChange={this.onChange1.bind(this)}
              files={reqPic}
              maxImgCount={5}
              title={'转换申请资料'}
            />
          <WhiteSpace/>
          {
            custType=='0'?<div><PushFile
                                    key={'PushFile'}
                                    onChange={this.onChange.bind(this)}
                                    files={operCertPic}
                                    maxImgCount={5}
                                    title={'经办人证件'}
                                  />
                                <WhiteSpace/></div>:<div />
          }

          </TabPane>
        </Tabs>
        <div>
          {
            <p className={tradeInfo.shBtn} style={{position:'fixed',zIndex:'99',cursor:'pointer'}} onClick={this.submit.bind(this)}>提交</p>
          }
        </div>

      </div>)
  }
}
