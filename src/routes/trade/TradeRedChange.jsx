// 交易 赎回驳回修改
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

  componentDidMount()
  {
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }
  componentWillUnmount(){
    this.props.dispatch({
      type:'formStorage/fetch',
      payload:{
        reqPic:[]
      }
    });
    let _this = this
    window.removeEventListener('message',_this.onMessage,false)
  }
  //移除监听
  destroyed(){
    let _this = this
    window.removeEventListener('message',_this.onMessage,false)
  }
  dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  //监听的返回数据
  onMessage=(e)=> {
    if(!e.data ||!e.origin) return;
    try {
      let blobs,content,content1,receiveData=JSON.parse(e.data);
      if(receiveData&&receiveData.natvieBase){
        //android native imge infor
        content = 'data:image/png;base64,'+receiveData.natvieBase;
        blobs = this.dataURLtoFile(content, new Date().getTime()+ '.png')
      }else{
        content1 = receiveData;
        if(typeof content1 !='string') return;
        content = content1.replace(/\//g,"").replace(/\+/g,"").replace(/\,/g,"").replace(/\;/g,"").replace(/\:/g,"").replace(/\=/g,"");
        blobs = this.dataURLtoFile(content1, content.substring(content.length - 20, content.length) + '.png')
      }
      if(!blobs) return;
      let {dispatch, formStorage, customer} = this.props;
      let {reqPic, operCertPic, formValue} = formStorage;
      if (blobs.size > 5000000) {//5M 5000000
        Toast.fail('文件大小超出限制', 3);
        return;
      }
      if (formValue.custType == '0') {
        dispatch({
          type: 'trade/uploadTradeCommonFiles',
          payload: {
            params: {},
            images: [{file: blobs}],
            backMethord: (data) => {
              if (data && data.code == '00' && data.model) {
                let resultFiles = data.model;
                if (resultFiles.length > 0) {
                  console.log()
                  let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                  operCertPic.push(arr)
                  dispatch({
                    type: 'formStorage/fetch',
                    payload: {
                      operCertPic: operCertPic
                    }
                  });
                }
              } else Toast.fail(data && data.message ? data.message : '图片上传错误!', 3);
            }
          }
        });
      } else {
        dispatch({
          type: 'trade/uploadTradeCommonFiles',
          payload: {
            params: {},
            images: [{file: blobs}],
            backMethord: (data) => {
              if (data && data.code == '00' && data.model) {
                let resultFiles = data.model;
                if (resultFiles.length > 0) {
                  let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                  reqPic.push(arr)
                  dispatch({
                    type: 'formStorage/fetch',
                    payload: {
                      reqPic: reqPic
                    }
                  });
                }
              } else Toast.fail(data && data.message ? data.message : '图片上传错误!', 3);
            }
          }
        })
      }
    }catch (e) {

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
        Toast.fail('赎回申请资料不能为空!',3);
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
           openShrId: rowData.openShrId
         };
         Toast.loading('赎回申请资料提交中...',60,undefined,true);
         dispatch({
            type:'rebutSpace/fetchRedmRebutUp',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code=='00')
                {
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'赎回驳回修改提交成功!',
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

      // let image = files.splice(index,1);
      //
      // files.map((item,value)=>{
      //   images.push({file:item.file});
      //   return images;
      // })
      // dispatch({
      //   type:'trade/uploadTradeCommonFiles',
      //   payload:{
      //    params:{},
      //     images:image.file,
      //      backMethord:(data)=>{
      //        if(data&&data.code=='00'&&data.model)
      //        {
      //          let resultFiles = data.model;
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

      // let image = files.splice(index,1);

      // files.map((item,value)=>{
      //   images.push({file:item.file});
      //   return images;
      // })
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
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
      //      }
      //    }
      // });
    }
  }



  getOptions0()
  {
    let { dispatch,formStorage } = this.props;
    let { formValue } = formStorage;
      return({
      space0:{valueType:'whiteSpace'},
      avlShr:{
        valueType:'selfSelect',
        title:'可用份额',
        desc:'可用份额',
        extra:formValue.avlShr,
        arrow:'empty'
      },
        reqShr:{
          title:'赎回份额',
          desc:'赎回份额',
          type:'text',
          required:true,
        },
        remitDate:{
          valueType:'date',
          title:'赎回日期',
          desc:'赎回日期',
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
        desc:'赎回原因',
        type:'text',
        numberOfLines:3,
      }
    });
  }

  render(){
    const { getFieldProps } = this.props.form;
    let {dispatch,location,formStorage,form} = this.props;
    console.log('this.props$$$$$$$$$$$$',this.props)
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
      title:'赎回驳回修改',
    };

    return (
      <div className={tradeInfo.tradeInfo}>
        <Title {...titleProps}></Title>
        <div className={tradeInfo.box}>
         <RejectCom data={data}/>
         <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
           <TabPane tab="赎回信息" key="1">
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
               title={'赎回申请资料'}
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

//逻辑需求记录  全额开关 默认为关，点击打开 可用份额 份额值添加到赎回份额
