// 交易 转换驳回修改
import React,{ Component,PropTypes } from 'react';
import Title from '../../components/product/Title';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Form from '../../utils/form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {Link,routerRedux} from 'dva/router';
import {WhiteSpace,List,Tabs,InputItem,Switch,Toast  } from 'antd-mobile';
import PushFile from '../../components/share/PushFile';
import DataUpload from '../../components/trade/DataUpload';
import Dic from '../../utils/dictionary';
import * as  Commons from '../../utils/commonUtil';

import redeemStyles from '../../styles/trade/rebut.less';
import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

const RejectCom = ({data})=>{
  return(
  <div className={redeemStyles.rebutCause}>
    <section>
      <p>驳回原因</p>
      <p>驳回人/驳回时间</p>
    </section>
    <section>
      <p>{data.noPassReason}</p>
      <p><span >{data.appUserName}</span>/<span>{data.appTime}</span></p>
    </section>
  </div>
  );
}


class TradeRedChange extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isFixed: false
    }
  }

  onFocus(){
    this.setState({
      isFixed:true
    });
  }
  onBlur(){
    this.setState({
      isFixed:false
    });
  }

  onChangeMethord(item,value,name){
    let { dispatch } = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload,
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    let {dispatch,form} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:form.getFieldsValue()
    });
  }

  longValueChange(value)
  {
    let {dispatch,formValue} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        certEndDate:value?moment('9999-12-31','YYYY-MM-DD'):zhNow
      }
    });
  }

  sureSubmit(e)
  {
    // e.preventDefault();
    let { dispatch,location,formStorage,form} = this.props;
    let { formValue,operCertPic,reqPic } = formStorage;
    let { rowData } = location.state;
    if(!reqPic||reqPic.length<=0)
      {
        Toast.fail('转换申请资料不能为空!',3);
        return;
      }
    if(formValue.custType=='0'){
      if(!operCertPic||operCertPic.length<=0)
        {
          Toast.fail('经办人资料不能为空!',3);
          return;
        }
    }
    form.validateFields((error,value)=>{
      if(!error)
      {
         let saveValue = {
          ...value,
          id:rowData.id,
          reqSeq:rowData.reqSeq,
          custId:rowData.custId,
          custType:rowData.custType,
          accId:rowData.accId,
          prodId:rowData.prodId,
          shrTypeId:rowData.shrTypeId,
          orderContNo:rowData.orderContNo,
          contNo:rowData.orderNo,
          tradCode:rowData.tradCode,
          operCertPic:formStorage.operCertPic,
          reqPic:formStorage.reqPic,
          version:rowData.version,
          custShrId:rowData.custShrId,
          avlShr:formValue.avlShr,
          targProdInfo:formValue.targProdInfo ? formValue.targProdInfo : formValue.targProdId + '-' + formValue.targShrTypeId,
          tradAcct:rowData.tradAcct
         };
         Toast.loading('转换申请资料提交中...',60,undefined,true);
         dispatch({
            type:'rebutSpace/fetchFundcRebutUp',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code=='00')
                {
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'转换驳回修改提交成功!',
                    backTitle:'返回驳回修改列表',
                    backMethord:()=>{
                      dispatch(routerRedux.push({pathname:'/tradeRebut'}))
                    }
                  }}));
                }
                else if(data&&data.message){
                    let cutStr = "<br/>";
                    if(data.message.indexOf(cutStr)>0){
                      let newMessage = data.message.replace(new RegExp(cutStr),"");
                      Toast.fail(<textarea rows='5' cols='40' style={{backgroundColor:'rgba(0,0,0,0)',color:'#ffffff',textAlign:'center' }} value={newMessage}>{newMessage}</textarea>,3);
                    }
                    else {
                      Toast.fail(data.message,3)
                    }
                  }
                  else {
                    Toast.fail('资料上传错误！',3)
                  }
              }
            }
         });
      }
      else Toast.fail('输入参数中存在错误!',3);
    })
  }


  onChange(files, type, index)
  {
    console.log('files',files,type,index);
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
              console.log('========resultFiles',resultFiles);
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
      console.log('sssssss',index);

      operCertPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            operCertPic:operCertPic
          }
      });
    }
  }

  onChange1(files, type, index)
  {
    console.log('files',files,type,index);
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
    }
  }



  getOptions0()
  {
    let { dispatch,formStorage } = this.props;
    let { formValue } = formStorage;
    let tmpProdInfo = formValue.targProdName + '-' + formValue.targShrType;
      return({
      space0:{valueType:'whiteSpace'},
      avlShr:{
        valueType:'selfSelect',
        title:'可转换份额',
        desc:'可转换份额',
        extra:formValue.avlShr,
        arrow:'empty'
      },
      targProdInfo: {
        required:true,
        valueType:'selfSelect',
        title:'转入产品',
        desc:'转入产品',
        extra:formValue.targProdInfoDesc ? formValue.targProdInfoDesc : tmpProdInfo,
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
        required:true,
      },
      remitDate:{
        valueType:'date',
        title:'转换日期',
        desc:'转换日期',
        mode:'date',
        extra:'可选,小于结束日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      });
  }

  getOptions1()
  {
    let { dispatch,formStorage } = this.props;
    let { formValue } = formStorage;
    let custType = formValue.custType;
    return({
      operator:{
       required: custType=='0'?true:false,
       type:'text',
       title:'经办人姓名',
       desc:'经办人',
     },
     operCertType:{
       required: custType=='0'?true:false,
       valueType:'select',
       type:Dic.fetchDicList('certType'),
       title:'经办人证件类型',
       desc:'证件类型',
     },
     operCertNo:{
       type:'text',
       title:'经办人证件号码',
       desc:'证件号码',
     },
    });
  }
  getOptions2()
  {
    return({
      space1:{valueType:'whiteSpace'},
      remark:{
        desc:'转换原因',
        type:'text',
        numberOfLines:3,
      }
    });
  }

  render(){
    const { getFieldProps } = this.props.form;
    let {dispatch,location,formStorage,form} = this.props;
    let { formValue} = formStorage;
    let {data,rowData} = location.state;
    let custType = formValue.custType;
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


    const titleProps = {
      title:'转换驳回修改',
    };

    return (
      <div className={tradeInfo.tradeInfo}>
        <Title {...titleProps}></Title>
        <div className={tradeInfo.box}>
         <RejectCom data={data}/>
         <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
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
                  <li>{formValue.prodName}</li>
                  <li>{Dic.fetchDicValue('custType',formValue.custType)}</li>
                  <li>{formValue.custName}</li>
                  <li>{Dic.fetchDicValue('custType',formValue.custType)}</li>
                  <li>{Dic.fetchDicValue('certType',formValue.certType)}</li>
                  <li>{formValue.certNo}</li>
                </ul>
              </div>
              <div>
                <Form options={this.getOptions0()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                { custType =='1'?<div />:<div>
                  <List.Item style={{backgroundColor:'#efeff4'}}>经办人</List.Item>
                  <Form options={this.getOptions1()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                </div>
                }
                <Form options={this.getOptions2()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
              </div>
              <p style={{height:'2rem'}}></p>
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
             custType =='0'?<div><PushFile
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
       </div>
         <p className={tradeInfo.shBtn} style={{position:'fixed'}} onClick={this.sureSubmit.bind(this)}>提交</p>
      </div>);
    }
  };

function connectTradeFun({formStorage,rebutSpace,customer}){
 return { formStorage,rebutSpace,customer }
}
export default connect(connectTradeFun)(createForm()(TradeRedChange))

//逻辑需求记录  全额开关 默认为关，点击打开 可用份额 份额值添加到转换份额
