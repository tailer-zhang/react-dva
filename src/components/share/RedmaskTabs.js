import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker,Toast,Checkbox} from 'antd-mobile';
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
import {initUploadFileParams} from '../../utils/commonMethods'
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);
const CheckboxItem = Checkbox.CheckboxItem;

import tradeInfo from '../../styles/trade/redeem.less';
import tradeStyles from '../../styles/trade/trade.less';
import URLS from "../../utils/Urls";
import {Tool} from "../../utils/tools";
const TabPane = Tabs.TabPane;
const Item = List.Item;
let isRepeat = 0;
export default class  RedmaskTabs extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {
      isFixed: false,
      ifChecked: false,
      show: 1,
      ifshow: false,
      imageUrl: '',
      fileUploadParams:{}
    }
  }

  componentDidMount()
  {
    this.setState({
      fileUploadParams: initUploadFileParams('product')
    })
    // document.onkeydown = function (e) {
    //   var ev = (typeof event!= 'undefined') ? window.event : e
    //   if (ev.keyCode == 13) {
    //     return
    //   }
    // }
    let _this = this

    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
    let basicHeight = window.innerHeight
    window.addEventListener('resize', ()=>{
      if(window.innerHeight >= basicHeight){
        this.setState({ ifshow:false })
      }else {

      }
    })
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
  //监听的返回数据
  onMessage=(e)=> {
    if(!e.data ||!e.origin) return;
    try{
      let blobs,content,content1,receiveData=JSON.parse(e.data);
      if(receiveData.resposeResult.code != '00'){
        Toast.fail(receiveData.resposeResult.data&&receiveData.resposeResult.data.message?receiveData.resposeResult.data.message:'图片上传错误!',3)
        return;
      }
      let {dispatch,formStorage,customer} = this.props;
      let {reqPic, operCertPic, formValue} = formStorage;
      let fileKeyType = receiveData.fileKeyType;
      let acceptFileData =formStorage[fileKeyType];
      acceptFileData = [...acceptFileData,...receiveData.resposeResult.model]
      dispatch({
        type:'formStorage/fetch',
        payload:{
          [fileKeyType]:acceptFileData
        }
      });
    }catch(e) {
      console.log(e)
    }


  }
  onFocus(){
    console.log('onfocus------', window.innerHeight)
    this.setState({ isFixed:true })
    this.setState({ ifshow:true })
  }

  onBlur(){
    console.log('onBlur------')
    this.setState({ isFixed:false })
    this.setState({ ifshow:false })
  }

  submit(fastRedmFlg, e) {
    this.setState({
      show: fastRedmFlg
    })
    let { dispatch,formStorage,form} = this.props;
    let {formValue,operCertPic,reqPic} = formStorage;
    if(!reqPic||reqPic.length<=0)
    {
      Toast.fail('赎回申请资料不能为空!',3,undefined,true);
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
          fastRedmFlg:fastRedmFlg,
          openShrId: formValue.openShrId,
          openDayId: formValue.openDayId
        };
        if(saveValue.remitDate)
          saveValue.remitDate = saveValue.remitDate.format('YYYY-MM-DD');
        if(formValue.avlShr<saveValue.reqShr)
        {
          Toast.fail('赎回份额不应超过可用份额!',3);
          return;
        }
        // console.log('=====xxxxxxxsddsds===',saveValue);
        isRepeat = 1;
        Toast.loading('赎回申请资料提交中...',60,undefined,true);
        dispatch({
          type:'tradeForm/fetchRedmAsk',
          payload:{
            params:saveValue,
            backMethord:(data)=>{
              isRepeat = 0;
              Toast.hide();
              if(data&&data.code=='00')
              {
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                  successTitle:'赎回申请提交成功!',
                  backTitle:'返回赎回买列表',
                  backMethord:()=>{
                    dispatch(routerRedux.push({pathname:'/redeemList'}))
                  }
                }}));
              }
              else if(data&&data.message){
                let cutStr = "<br/>";
                if(data.message.indexOf(cutStr)>0){
                  let newMessage = data.message.replace(new RegExp(cutStr),"");

                  // Toast.fail(<textarea rows='5' cols='30' style={{backgroundColor:'rgba(0,0,0,0)',color:'#ffffff',textAlign:'center', wordWrap:'break-word' }} defaultValue={newMessage} />,3);
                  Toast.fail(newMessage, 3)
                }
                else {
                  Toast.fail(data.message,3)
                }
              }
              else {
                Toast.fail('赎回申请提交失败！',3);
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
              if(files.length>0)
              {
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                operCertPic.push(arr)
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      operCertPic:operCertPic
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
    let {dispatch,formStorage,customer} = this.props;
    let {reqPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
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
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                reqPic.push(arr)
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      reqPic:reqPic
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
    let { formStorage } = this.props;
    let { formValue } = formStorage;
    return ({
      space0:{valueType:'whiteSpace'},
      avlShr:{
        valueType:'selfSelect',
        title:'可用份额',
        desc:'可用份额',
        extra:formValue.avlShr,
        arrow:'empty',
        required:'true',
      },
      reqShr:{
        title:'赎回份额',
        desc:'赎回份额',
        type:'text',
        required:'true',
      },
      remitDate:{
        title:'赎回时间',
        desc:'赎回时间',
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
        title:'赎回原因',
        type:'text',
        numberOfLines:3,
        placeholder:'请输入赎回原因',
        required:'true',
      },
    })
  }
  getOptions3()
  {
    return ({
      space1:{valueType:'whiteSpace'},
      hint: {
        valueType:'checked',
        placeholder:'',
        required:'true',
      }
    })
  }
  ifcheck=(checked)=>{
    this.setState({ifChecked: checked})
  }
  render(){
    const { dispatch,onChangeMethord,form,askInfo,tradeForm,formStorage,customer} = this.props;
    const {fileUploadParams} = this.state;
    var u = navigator.userAgent;
    let { formValue,defaultActiveKey } = formStorage;
    let infoList = askInfo.postModel;
    let custType = formValue.custType;
    let fastRedmFlg = formValue.fastRedmFlg;

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
      <div className={tradeInfo.redbox} id='redbox'>
        <div className={tradeInfo.box} style={{top: this.state.ifshow? u.indexOf('Android') > -1 ? '-200px': '-500px' : '1.333rem'}}>
          <Tabs defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'} swipeable={false} animated={false} onChange={this.tabClick.bind(this)}>
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
               {this.state.show&&fastRedmFlg == '1'? <Form options={this.getOptions3()} dispatch={dispatch} formValue={formValue} form={form} ifcheck={this.ifcheck}/>:null}
             </div>
          </TabPane>
          <TabPane tab="资料上传" key="2">
            <PushFile
                fileKeyType={'reqPic'}
                fileUploadParams={fileUploadParams}
              key={'PushFile1'}
              onChange={this.onChange1.bind(this)}
              files={reqPic}
              maxImgCount={5}
              title={'赎回申请资料'}
            />
          <WhiteSpace/>
          {
            custType=='0'?<div><PushFile
                                    fileKeyType={'operCertPic'}
                                    fileUploadParams={fileUploadParams}
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
        <div style={{position:'absolute',zIndex:'99',backgroundColor:'#fff',bottom:'0'}}>
          {
            fastRedmFlg == '1' ? (<p className={tradeInfo.shBtn} style={{width: '100%'}}>
                <span className={tradeStyles.nextStep0} style={{display:'block',width:'50%',height:'100%',float:'left',color: this.state.ifChecked?'#f22f33':'gray'}} onClick={this.state.ifChecked?this.submit.bind(this,1):()=>{
                  if (this.state.show == 0){
                    this.setState({
                      show: 1
                    })
                  }
                }
                }>快速赎回</span>
                <span className={tradeStyles.nextStep} style={{display:'block',width:'50%',height:'100%',float:'left',backgroundColor:'#f22f33'}} onClick={this.submit.bind(this,0)}>普通赎回</span>
              </p>) :
              (<p className={tradeInfo.shBtn} onClick={this.submit.bind(this,0)}>提交</p>)
          }
        </div>
      </div>)
  }
}
