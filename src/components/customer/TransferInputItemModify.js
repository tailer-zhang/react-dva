import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast, List,Picker } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import tradeInfo from '../../styles/trade/redeem.less';
import transfer from '../../styles/trade/transfer.less';
import changeStyle from '../../styles/customer/accountChange.less'

import getNameOfBank from "../../utils/Bank";
import Dic from '../../utils/dictionary';
import * as Commons from "../../utils/commonUtil";
import recordsStyle from '../../styles/customer/recordsStyle.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import redeemStyles from '../../styles/trade/rebut.less';
import { convertCurrency } from '../../utils/formatUtils';

const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const TabPane = Tabs.TabPane;
let isRepeat = 0;


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

function onFieldsChange(props, changedFields)
{
  let {dispatch,formStorage} = props;
  console.log('changedFields',changedFields)
  let myObject = formStorage.formValue || {}
  console.log('#####',myObject)
  //受让方经办人证件类型
  if(changedFields.targOperCertType && changedFields.targOperCertType.value)
  {
    let value = changedFields.targOperCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targOperCertType:value
      },
    });
  }
//受让方经办人证件号码
  if(changedFields.targOperCertNo && changedFields.targOperCertNo.value)
  {
    let value = changedFields.targOperCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targOperCertNo:value
      },
    });
  }
  //受让方经办人姓名
  if(changedFields.targOperator && changedFields.targOperator.value)
  {
    let value = changedFields.targOperator.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targOperator:value
      },
    });
  }
  //转让日期
  if(changedFields.remitDate && changedFields.remitDate.value)
  {
    let value = changedFields.remitDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        remitDate:value
      },
    });
  }
  //转让金额
  if(changedFields.reqAmt && changedFields.reqAmt.value)
  {
    let value = changedFields.reqAmt.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        reqAmt:value
      },
    });
  }
  //转让份额
  if(changedFields.reqShr && changedFields.reqShr.value)
  {
    let value = changedFields.reqShr.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        reqShr:value
      },
    });
  }
  //转让手续费
  if(changedFields.fee && changedFields.fee.value)
  {
    let value = changedFields.fee.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        fee:value
      },
    });
  }
  //转让类型
  if(changedFields.transferType&&changedFields.transferType.value){
    let value = changedFields.transferType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferType:value
      }
    })
  }
  //定制开始日期
  if(changedFields.customStartDate&&changedFields.customStartDate.value)
  {
    console.log('定制开始日期====',changedFields.customStartDate.value)
    let value = changedFields.customStartDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        customStartDate:value
      },
    });
  }
  //定制结束日期
  if(changedFields.customEndDate&&changedFields.customEndDate.value)
  {
    console.log('提交表单值结束日期====',changedFields.customEndDate.value)
    let value = changedFields.customEndDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        customEndDate:value
      },
    });
  }
  //转让方经办人姓名
  if(changedFields.operator && changedFields.operator.value)
  {
    let value = changedFields.operator.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operator:value
      },
    });
  }
  //转让方经办人证件号
  if(changedFields.operCertNo && changedFields.operCertNo.value)
  {
    let value = changedFields.operCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operCertNo:value
      },
    });
  }
  //转让方经办人证件类型
  if(changedFields.operCertType && changedFields.operCertType.value)
  {
    let value = changedFields.operCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operCertType:value
      },
    });
  }
  //输入的受让人姓名
  if(changedFields.targetName && changedFields.targetName.value)
  {
    console.log('y')
    let value = changedFields.targetName.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targetName:value
      },
    });
  }
  //输入的受让人证件号码
  if(changedFields.targetCertNo && changedFields.targetCertNo.value)
  {
    let value = changedFields.targetCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targetCertNo:value
      },
    });
  }
  //输入的受让人证件类型
  if(changedFields.targetCertType && changedFields.targetCertType.value)
  {
    let value = changedFields.targetCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        targetCertType:value
      },
    });
  }

}

@connect()
@createForm({onFieldsChange:onFieldsChange})
export default class TransferInputItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
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
    try{
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
      let {dispatch,formStorage} = this.props;
      let {fileInfo, changeList1,changeList2} = formStorage;
      if(blobs.size > 5000000){//5M 5000000
        Toast.fail('文件大小超出限制',3);
        return;
      }
      if(global.selectKey=='select_key1'){
        dispatch({
          type:'trade/uploadTradeCommonFiles',
          payload:{
            params:{},
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                  fileInfo.push(arr)
                  dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      fileInfo:fileInfo
                    }
                  });
                }
              }
              else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
            }
          }
        });
      }else if(global.selectKey=='select_key2'){
        dispatch({
          type:'trade/uploadTradeCommonFiles',
          payload:{
            params:{},
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                  changeList1.push(arr)
                  dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      changeList1:changeList1
                    }
                  });
                }
              }
              else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
            }
          }
        });
      }else if(global.selectKey=='select_key3'){
        dispatch({
          type:'trade/uploadTradeCommonFiles',
          payload:{
            params:{},
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                  changeList2.push(arr)
                  dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      changeList2:changeList2
                    }
                  });
                }
              }
              else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
            }
          }
        });
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


  submit=()=>{
    let {dispatch,formStorage,type, originData, form,newBank,assi} = this.props;
    console.log('this.props提交',this.props)
    let where = formStorage.newBank ?formStorage.newBank.bankName : ''
    let cardNo = formStorage.newBank ? formStorage.newBank.cardNo : ''
    let {formValue} = formStorage
    let targCustType = (formValue.assi &&formValue.assi.custType) ? formValue.assi.custType:formValue.targCustType   //受让方客户是机构还是个人
    console.log('提交时候的的formValue',formValue)
    if(isRepeat>=1) return;
   if(!formStorage.fileInfo || formStorage.fileInfo.length == 0){
      Toast.fail('请选择转受让资料',3);
      return
    }else {
     form.validateFields((error,value)=>{
       if(!error)
       {
     let custParams = {}
     let custParamsMana = {}
     let custParamsPro = {}
     if(type === '0' || type === '1' ||type === '2' ){
       if(formValue.custType == '0'){  //转让方经办人信息
           if(!formValue.operator){
             Toast.fail('请填写转让方经办人姓名',3);
             return
           }else if(!formValue.operCertNo){
             Toast.fail('请填写转让方经办人证件号',3);
             return
           } else if(!formValue.operCertType){
             Toast.fail('请选择转让方经办人证件类型',3);
             return
           }else if(!formStorage.changeList2 || formStorage.changeList2.length == 0){
             Toast.fail('请选择转让方经办人附件',3);
             return
           }
           custParams.operator = formValue.operator //转让方经办人姓名
           custParams.operCertNo = formValue.operCertNo //转让方经办人证件号码
           custParams.operCertType = formValue.operCertType //转让方经办人证件类型
           custParams.fileInfosJbr = formStorage.changeList2//转让方经办人附件
       }
        custParamsPro.custType = formValue.custType, //转让方是机构客户还是个人客户
         custParamsPro.prodId = formValue.prodId, //产品id
         custParamsPro.shrTypeId = formValue.shrTypeId, //类别id
         custParamsPro.cardNo = formValue.cardNo,//银行卡
         custParamsPro.custId =formValue.custId,//客户的id
         custParamsPro.certType = formValue.certType,//证件类型
         custParamsPro.certNo = formValue.certNo//证件号码
     }else{
       custParamsMana.prodId =  formValue.prodNameValue?formValue.prodNameValue:(formValue.prodId?formValue.prodId:''), //产品id
         custParamsMana.shrTypeId =  formValue.prodTypeId?formValue.prodTypeId:(formValue.shrTypeId?formValue.shrTypeId:'')//类别id
       let prodName = formValue.prodNameDesc?formValue.prodNameDesc:(formValue.prodName?formValue.prodName:'')
       let prodType =formValue.prodTypeText?formValue.prodTypeText:(formValue.prodExpiName?formValue.prodExpiName:'')
       if(formValue.prodNameDesc){
         if(!formValue.prodTypeText){
           custParamsMana.shrTypeId = ''
         }
       }
     if(!custParamsMana.shrTypeId){
       console.log('1')
       Toast.fail('请输入产品类别',3);
       return
     }
       if(!prodName){
         Toast.fail('请输入产品名称',3);
         return
       }
       if(!prodType){
         console.log('2')
         Toast.fail('请输入产品类别',3);
         return
       }
     }
     let assCustParams = {}
     let assInfo = {}
     if(type === '0' ||  type === '1'  ||  type === '3'){
       if(!targCustType){
         Toast.fail('请输入受让人信息',3);
         return
       }
       if(targCustType == '0'){ //受让方经办人信息
         if(!formValue.targOperator){
           Toast.fail('请填写受让方经办人姓名',3);
           return
         }else if(!formValue.targOperCertNo){
           Toast.fail('请填写受让方经办人证件号',3);
           return
         } else if(!formValue.targOperCertType){
           Toast.fail('请选择受让方经办人证件类型',3);
           return
         }else if(!formStorage.changeList1 || formStorage.changeList1.length == 0){
           Toast.fail('请选择受让方经办人附件',3);
           return
         }
         assCustParams.targOperator = formValue.targOperator //受让方经办人姓名
         assCustParams.targOperCertNo = formValue.targOperCertNo //受让方经办人证件号码
         assCustParams.targOperCertType = formValue.targOperCertType //受让方经办人证件类型
         if(type === '3'){
           assCustParams.fileInfos_jbr_srf = formStorage.changeList1//受让方经办人附件
         }else {
           assCustParams.fileInfosJbrSrf = formStorage.changeList1//受让方经办人附件
         }

       }
       assInfo.targCustType =  formValue.assi&&formValue.assi.custType ? formValue.assi.custType:formValue.targCustType //受让方客户是机构还是个人
       assInfo.targetCertType= formValue.custCertTy ?formValue.custCertTy: formValue.targetCertType//受让人证件类型
       assInfo.targetCertTypeName= formValue.targetCertTypeName//受让人证件类型中文名称
       assInfo.targetCertNo = formValue.custCertNo  ? formValue.custCertNo : formValue.targetCertNo//受让人证件号码

       assInfo.targetName= formValue.custNameDesc ?  formValue.custNameDesc: formValue.targetName//受让人姓名
       assInfo.targMgrName = formValue.assi&&formValue.assi.mgrName ? formValue.assi.mgrName:formValue.targMgrName//受让人理财师姓名
       assInfo.targBrahName = formValue.assi&&formValue.assi.brahName ?formValue.assi.brahName : formValue.subBranch//受让人所属分公司
       let whereTrans = formStorage.transBank ?formStorage.transBank.bankName : ''
       let cardNoTrans = formStorage.transBank ? formStorage.transBank.cardNo : ''
       if(formValue.custNameDesc){
         if(formStorage.transBank){
           assInfo.targetCardNo= cardNoTrans//受让人银行卡号
           assInfo.targetBankName= whereTrans//受让人银行开户行名称
         }else{
           if(!cardNo){
             assInfo.targetCardNo = ''
             assInfo.targetBankName = ''
           }else{
             assInfo.targetCardNo= cardNo?cardNo:(formValue.targetCardNo ? formValue.targetCardNo.split("(")[1].split(")")[0] : '--')//受让人银行卡号
             assInfo.targetBankName= where ? where : (formValue.targetCardNo ? formValue.targetCardNo.split("(")[0] : '--')//受让人银行开户行名称
           }

         }
       }else{
         if(formStorage.transBank){
           assInfo.targetCardNo= cardNoTrans//受让人银行卡号
           assInfo.targetBankName= whereTrans//受让人银行开户行名称
         }else{
           assInfo.targetCardNo= cardNo?cardNo:(formValue.targetCardNo ? formValue.targetCardNo.split("(")[1].split(")")[0] : '--')//受让人银行卡号
           assInfo.targetBankName= where ? where : (formValue.targetCardNo ? formValue.targetCardNo.split("(")[0] : '--')//受让人银行开户行名称
         }
       }
       if(!assInfo.targetCardNo){
         console.log('1')
         Toast.fail('请重新选择受让人银行卡号!',3);
         return
       }
       if(!assInfo.targetBankName) {
         Toast.fail('请重新选择受让人开户行!',2);
         return;
       }
       if(!assInfo.targetBankName) {
         Toast.fail('受让人银行开户行名称不能为空!',2);
         return;
       }
     }
          console.log('提交前的=====',formValue)
         let saveValue = {
           transferFlag:type, //转让标识
           reqShr: formValue.reqShr,//转让份额
           remitDate: formValue.remitDate,//转让日期
           reqAmt: formValue.reqAmt,//转让金额
           fee: formValue.fee,//转让手续费
           transferType:formValue.transferType?formValue.transferType.join():'00',//转让类型 默认非定制转让
           customStartDate:formValue.customStartDate,
           customEndDate:formValue.customEndDate,
           fileInfo: formStorage.fileInfo,//转让方附件
           newCardFlag: 1,
           reqSeq: formValue.reqSeq, //交易编号
           id: formValue. id, //交易 id
          version : formValue.version , // version


           ...assCustParams,
           ...assInfo,
           ...custParamsPro,
           ...custParamsMana,
           ...custParams
         };
          console.log('保存参数=====',saveValue,assCustParams,assInfo,custParamsPro,custParamsMana,custParams)
         if(saveValue.remitDate){
           saveValue.remitDate = saveValue.remitDate.format('YYYY-MM-DD');
         }
         //定制转让
         if(saveValue.transferType=='01'){
           saveValue.customStartDate = saveValue.customStartDate.format('YYYY-MM-DD');
           saveValue.customEndDate = saveValue.customEndDate.format('YYYY-MM-DD');
           let iosStartDateModel = saveValue.customStartDate.split('-').join('/'); //转换后的开始日期
           let iosEndDateModel = saveValue.customEndDate.split('-').join('/');//转换后的结束日期
           // console.log(saveValue.customStartDate,saveValue.customEndDate)
           if(new Date(iosStartDateModel).getTime()> new Date(iosEndDateModel).getTime()){
             console.log('日期校验')
             Toast.fail('结束日期不能小于开始日期!',2);
             setTimeout(()=>{
               Toast.hide();
             },2000)
             return;
           }

         }
         // console.log('修改请求参数=====》：saveValue',saveValue)
         // return;
         isRepeat = 1;
         dispatch({
           type:'trade/fetchReject',
           payload:{
             params:saveValue,
             backMethord:(data)=>{
               isRepeat = 0;
               Toast.hide();
               if(data&&data.code=='00'){
                 dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                     successTitle:'转受让驳回修改提交成功!',
                     backTitle:'返回转受让驳回详情页面',
                   }}));
               }else {
                 Toast.fail(data&&data.message?data.message:'转受让交易提交错误!',2);
               }
             }
           }
         });

       }
       else Toast.fail('输入参数中存在错误!',3);
     })

    }
  }
  getOptionsDate(){
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage;
    return({
      customStartDate:{
        valueType:'date',
        title:'定制开始日期',
        desc:'定制开始日期',
        mode:'date',
        extra:'请选择开始日期',
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      customEndDate:{
        valueType:'date',
        title:'定制结束日期',
        desc:'定制结束日期',
        mode:'date',
        extra:'请选择结束日期',
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      }
    })


    // valueType:'date',
    //   title:'转让日期',
    //   desc:'转让日期',
    //   mode:'date',
    //   extra:'请选择转让日期',
    //   disabled:formValue.long,
    //   minDate:minDate,
    //   maxDate:maxDate,
    //   required:true,
  }
  getOption0() {
    let {dispatch,formStorage} = this.props;
    let {formValue} = formStorage
    return({
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: formValue.prodName,
        arrow: 'empty'
      },
      prodExpiName: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: formValue.prodExpiName,
        arrow: 'empty'
      },
    })
  }
  // 管理人客户转入的时候需要选择产品名称和产品类别
  getOption7() {
    let {dispatch,formStorage} = this.props;
    let {formValue} = formStorage
    let prodExpiNameOption = {}
    console.log('formValue',formValue)
    if(formValue.prodNameDesc){
      prodExpiNameOption = {
        prodExpiName: {
          required:true,
          valueType:'selfSelect',
          title:'产品类别',
          desc:'产品类别',
          extra:formValue.prodTypeText?formValue.prodTypeText:'*',
          onClick:()=>{
            if (formValue.prodNameDesc==undefined || formValue.prodName==undefined ) Toast.fail('请先选择产品名称!',2);
            else dispatch(routerRedux.push({
              pathname:'/tradeProduct',
              state: {
                params: {prodId:  formValue.producIdDesc,},
                selectValue: formValue.prodTypeText,
                mode: 'managerType',
                formValue: formValue
              }
            }));
          },
          otherProps:{
            error:!formValue.prodExpiName,
          },
        },
      };
    }else{
      prodExpiNameOption = {
        prodExpiName: {
          required:true,
          valueType:'selfSelect',
          title:'产品类别',
          desc:'产品类别',
          extra:formValue.prodTypeText?formValue.prodTypeText:(formValue.prodExpiName?formValue.prodExpiName:'*'),
          onClick:()=>{
            if (formValue.prodNameDesc==undefined || formValue.prodName==undefined ) Toast.fail('请先选择产品名称!',2);
            else dispatch(routerRedux.push({
              pathname:'/tradeProduct',
              state: {
                params: {prodId:  formValue.producIdDesc,},
                selectValue: formValue.prodTypeText,
                mode: 'managerType',
                formValue: formValue
              }
            }));
          },
        },
      };
    }
    return({
      prodName: {
        required:true,
        valueType:'selfSelect',
        title:'产品名称',
        desc:'产品名称',
        extra:formValue.prodNameDesc?formValue.prodNameDesc:(formValue.prodName?formValue.prodName:'*'),
        onClick:()=>{

          dispatch(routerRedux.push({
            pathname: '/tradeProduct',
            state: {
              params: {},
              selectValue: formValue.prodNameDesc,
              mode: 'manager',
              formValue: formValue
            }
          }));
        }
      },
      ...prodExpiNameOption,

    })
  }
  getOption1() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      remitDate:{
        valueType:'date',
        title:'转让日期',
        desc:'转让日期',
        mode:'date',
        extra:'请选择转让日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      reqShr: {
        required:true,
        type: 'number',
        desc:'转让份额',
      },
      reqAmt: {
        required:true,
        type: 'number',
        desc:'转让金额',
      },
      fee: {
        type: 'number',
        desc:'转让手续费',
        placeholder: '请输入转让手续费',
        extra: formValue.fee || ''
      },


    })
  }
  //转让方信息
  getOption2() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      custName: {
        valueType: 'selfSelect',
        desc: '客户姓名',
        extra: formValue.custName? formValue.custName : '--',
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.certType),
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra:  formValue.certNo? formValue.certNo : '--',
        arrow: 'empty'
      },
      cardNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra:formValue.cardNo? formValue.cardNo : '--',
        arrow: 'empty'
      },
      bankNa: {
        valueType: 'selfSelect',
        desc: '开户行',
        extra: formValue.bankNa? formValue.bankNa : '--',
        arrow: 'empty'
      }
    })
  }
  //转让方经办人信息
  getOption3() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      operator: {
        required:true,
        type: 'text',
        desc:'姓名',
        placeholder: '请输入',
        extra:  formValue.operator ? formValue.operator : '--',
      },
      operCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入',
        extra: formValue.operCertNo ? formValue.operCertNo : '--',
      },
      operCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.operCertType),
      },
    })
  }
//受让方信息
  getOption4() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      targetName: {
        required:true,
        valueType:'selfSelect',
        title:'受让人姓名',
        desc:'受让人姓名',
        extra:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : '--'),
        onClick:()=>{
          dispatch(routerRedux.push({
            pathname:'/tradeProduct',
            state: {
              params: {},
              defaultActiveKey:'2',
              selectValue: formValue.custName,
              mode: 'assiPeople',
              formValue: formValue
            }
          }));
        },
      },
      targetCertNo: {
        required:true,
        valueType: 'selfSelect',
        desc:'证件号',
        extra: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : '--'),
        arrow: 'empty'

      },
      targetCertType: {
        required:true,
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.custCertTy?formValue.custCertTy:formValue.targetCertType),
        arrow: 'empty'
      }
    })
  }
  getOption8() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      targetName: {
        required:true,
        type: 'text',
        desc:'受让人姓名',
        placeholder: '请输入受让人姓名',
        extra:formValue.targetName ? formValue.targetName : '--',
      },
      targetCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入证件号',
        extra: formValue.targetCertNo ? formValue.targetCertNo : '--',
      },
      targetCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.targetCertType),
      }
    })
  }
  getOption5() {
    let {dispatch,form,formStorage,location,type} = this.props;
    let where = formStorage.newBank ?formStorage.newBank.bankName : ''
    let whereTrans = formStorage.transBank ?formStorage.transBank.bankName : ''
    let cardNo = formStorage.newBank ? formStorage.newBank.cardNo : ''
    let cardNoTrans = formStorage.transBank ? formStorage.transBank.cardNo : ''

    let {formValue} = formStorage
    console.log('受让方formValue',formValue)
    console.log('newBank',formStorage.newBank)
    let assiOpenBankOption = {}
    let targetCardNoOption = {}
    if(formStorage.transBank){
      assiOpenBankOption ={
        assiOpenBank: {
          required:true,
          valueType: 'selfSelect',
          desc:'开户行',
          extra: whereTrans ? whereTrans : ( '--'),
          arrow: 'empty'
        },
      };
    }else{
      if(formValue.custNameDesc){
        assiOpenBankOption ={
          assiOpenBank: {
            required:true,
            valueType: 'selfSelect',
            desc:'开户行',
            extra: where ? where : ( '--'),
            arrow: 'empty'
          },
        };
      }else{
        assiOpenBankOption ={
          assiOpenBank: {
            required:true,
            valueType: 'selfSelect',
            desc:'开户行',
            extra: where ? where : (formValue.targetCardNo ? formValue.targetCardNo.split("(")[0] : '--'),
            arrow: 'empty'
          },
        };
      }
    }
    if(formStorage.transBank){
      targetCardNoOption = {
        targetCardNo: {
          required:true,
          valueType: 'selfSelect',
          title:'银行卡号',
          desc: '银行卡号',
          extra:cardNoTrans?cardNoTrans:( '--'),
          onClick: ()=>{
            if(type === '0' || type === '3'  ){
              let assiCustName = formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : '') //受让人姓名
              console.log('assiCustName',assiCustName)
              if(assiCustName){
                let  addBank = {
                  custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                  certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                  certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                  id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                }
                dispatch(routerRedux.push({
                  pathname: '/selectBankCus',
                  state: {
                    transInfo:'0',
                    targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                    targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                    targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                    addBank:addBank,
                  }
                }))
              }else{
                Toast.show('请先选择受让人姓名', 2)
              }
            }else{
              if(formValue.targetName && formValue.targetCertNo && formValue.targetCertType){
                let saveValue = {
                  targetName: formValue.targetName,
                  targetCertType: formValue.targetCertType ,
                  targetCertNo: formValue.targetCertNo
                };
                dispatch({
                  type:'trade/fetchSelectCustIsExists',
                  payload:{
                    params:saveValue,
                    backMethord:(data)=>{
                      console.log('data',data)
                      Toast.hide();
                      if(data&&data.code=='00')
                      {
                        dispatch({
                          type:'formStorage/fetchFormValue',
                          payload:{
                            assi:data.model,
                          }
                        });
                        let  addBank = {
                          custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                          certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                          certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                          id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                        }
                        dispatch(routerRedux.push({
                          pathname: '/selectBankCus',
                          state: {
                            transInfo:'0',
                            targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                            targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                            targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                            addBank:addBank,
                          }
                        }))
                      } else {
                        Toast.fail(data&&data.msg?data.msg:'受让人信息不存在，请填写正确的受让人信息',2);

                      }
                    }
                  }
                });
              } else  {
                Toast.show('请先填写受让人姓名', 2)

              }
            }
          }
        },
      };
    }else{
      if(formValue.custNameDesc){
        targetCardNoOption = {
          targetCardNo: {
            required:true,
            valueType: 'selfSelect',
            title:'银行卡号',
            desc: '银行卡号',
            extra:cardNo?cardNo:( '--'),
            onClick: ()=>{
              if(type === '0' || type === '3'  ){
                let assiCustName = formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : '') //受让人姓名
                console.log('assiCustName',assiCustName)
                if(assiCustName){
                  let  addBank = {
                    custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                    certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                    certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                    id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                  }
                  dispatch(routerRedux.push({
                    pathname: '/selectBankCus',
                    state: {
                      transInfo:'0',
                      targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                      targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                      targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                      addBank:addBank,
                    }
                  }))
                }else{
                  Toast.show('请先选择受让人姓名', 2)
                }
              }else{
                if(formValue.targetName && formValue.targetCertNo && formValue.targetCertType){
                  let saveValue = {
                    targetName: formValue.targetName,
                    targetCertType: formValue.targetCertType ,
                    targetCertNo: formValue.targetCertNo
                  };
                  dispatch({
                    type:'trade/fetchSelectCustIsExists',
                    payload:{
                      params:saveValue,
                      backMethord:(data)=>{
                        console.log('data',data)
                        Toast.hide();
                        if(data&&data.code=='00')
                        {
                          dispatch({
                            type:'formStorage/fetchFormValue',
                            payload:{
                              assi:data.model,
                            }
                          });
                          let  addBank = {
                            custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                            certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                            certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                            id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                          }
                          dispatch(routerRedux.push({
                            pathname: '/selectBankCus',
                            state: {
                              transInfo:'0',
                              targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                              targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                              targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                              addBank:addBank,
                            }
                          }))
                        } else {
                          Toast.fail(data&&data.msg?data.msg:'受让人信息不存在，请填写正确的受让人信息',2);

                        }
                      }
                    }
                  });
                } else  {
                  Toast.show('请先填写受让人姓名', 2)

                }
              }
            }
          },
        };
      }else{
        targetCardNoOption = {
          targetCardNo: {
            required:true,
            valueType: 'selfSelect',
            title:'银行卡号',
            desc: '银行卡号',
            extra:cardNo?cardNo:(formValue.targetCardNo ? formValue.targetCardNo.split("(")[1].split(")")[0] : '--'),
            onClick: ()=>{
              if(type === '0' || type === '3'  ){
                let assiCustName = formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : '') //受让人姓名
                console.log('assiCustName',assiCustName)
                if(assiCustName){
                  let  addBank = {
                    custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                    certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                    certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                    id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                  }
                  dispatch(routerRedux.push({
                    pathname: '/selectBankCus',
                    state: {
                      transInfo:'0',
                      targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                      targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                      targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                      addBank:addBank,
                    }
                  }))
                }else{
                  Toast.show('请先选择受让人姓名', 2)
                }
              }else{
                if(formValue.targetName && formValue.targetCertNo && formValue.targetCertType){
                  let saveValue = {
                    targetName: formValue.targetName,
                    targetCertType: formValue.targetCertType ,
                    targetCertNo: formValue.targetCertNo
                  };
                  dispatch({
                    type:'trade/fetchSelectCustIsExists',
                    payload:{
                      params:saveValue,
                      backMethord:(data)=>{
                        console.log('data',data)
                        Toast.hide();
                        if(data&&data.code=='00')
                        {
                          dispatch({
                            type:'formStorage/fetchFormValue',
                            payload:{
                              assi:data.model,
                            }
                          });
                          let  addBank = {
                            custName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                            certType:formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                            certNo:formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                            id:formValue.assi&&formValue.assi.id ? formValue.assi.id : (formValue.targCustId ? formValue.targCustId : '') ,
                          }
                          dispatch(routerRedux.push({
                            pathname: '/selectBankCus',
                            state: {
                              transInfo:'0',
                              targetName:formValue.custNameDesc?formValue.custNameDesc:(formValue.targetName ? formValue.targetName : ''),
                              targetCertType: formValue.custCertTy?formValue.custCertTy:(formValue.targetCertType? formValue.targetCertType : ''),
                              targetCertNo: formValue.custCertNo ? formValue.custCertNo : (formValue.targetCertNo ? formValue.targetCertNo : ''),
                              addBank:addBank,
                            }
                          }))
                        } else {
                          Toast.fail(data&&data.msg?data.msg:'受让人信息不存在，请填写正确的受让人信息',2);

                        }
                      }
                    }
                  });
                } else  {
                  Toast.show('请先填写受让人姓名', 2)

                }
              }
            }
          },
        };

      }
    }

    return({
      ...assiOpenBankOption,
      ...targetCardNoOption,

    })
  }
  //受让方经办人信息
  getOption6() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      targOperator: {
        required:true,
        type: 'text',
        desc:'姓名',
        placeholder: '请输入',
        extra: formValue.targOperator ? formValue.targOperator : '--',
      },
      targOperCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入',
        extra: formValue.targOperCertNo ? formValue.targOperCertNo : formValue.targOperCertNo,
      },
      targOperCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.targOperCertType),
      },
    })
  }
  onChange=(files, type, index)=> {
    let {dispatch,formStorage,customer} = this.props;
    let {fileInfo} = formStorage;
    const temArr = fileInfo|| []
    for (let index = 0; index < files.length; index ++) {
      const ifUpload = temArr.find((it) => {
        if(files[index].file){
          return it.fileName === files[index].file.name
        }else {
          return false
        }
      })
      if (ifUpload) {
        Toast.fail('文件已经存在', 2);
        return
      }
    }
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
              if(resultFiles.length>0)
              {
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                fileInfo.push(arr)
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    fileInfo:fileInfo
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
      fileInfo.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          fileInfo:fileInfo
        }
      });
    }
  }
  onChange2=(files, type, index)=> {
    let {dispatch,formStorage,customer} = this.props;
    let {changeList1} = formStorage;
    const temArr = changeList1|| []
    for (let index = 0; index < files.length; index ++) {
      const ifUpload = temArr.find((it) => {
        if(files[index].file){
          return it.fileName === files[index].file.name
        }else {
          return false
        }
      })
      if (ifUpload) {
        Toast.fail('文件已经存在', 2);
        return
      }
    }
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
              if(resultFiles.length>0)
              {
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                changeList1.push(arr)
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    changeList1:changeList1
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
      changeList1.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          changeList1:changeList1
        }
      });
    }
  }
  onChange3=(files, type, index)=> {
    let {dispatch,formStorage} = this.props;
    let {changeList2} = formStorage;
    const temArr = changeList2|| []
    for (let index = 0; index < files.length; index ++) {
      const ifUpload = temArr.find((it) => {
        if(files[index].file){
          return it.fileName === files[index].file.name
        }else {
          return false
        }
      })
      if (ifUpload) {
        Toast.fail('文件已经存在', 2);
        return
      }
    }
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
              if(resultFiles.length>0)
              {
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                changeList2.push(arr)
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    changeList2:changeList2
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
      changeList2.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          changeList2:changeList2
        }
      });
    }
  }
  tabClick(key)
  {
    let {dispatch} = this.props;
    dispatch({
      type:'formStorage/fetch',
      payload:{
        defaultActiveKey:key
      }
    });
  }
  render(){
    const { dispatch,location,formStorage,form,rebutSpace,type} = this.props;
    console.log('this.props11111111111111',this.props)
    const { defaultActiveKey ,formValue,attachList} = formStorage;
    console.log('formStorage22222',formStorage)
    let targCustType = (formValue.assi &&formValue.assi.custType) ? formValue.assi.custType:formValue.targCustType
    let { data,rejectFlag } = location.state;
    let isFixed = this.state.isFixed;
    let rowData = data.tradeModel;
    let reqFiles = formStorage.fileInfo?formStorage.fileInfo:[];
    let reqFiles1 = formStorage.changeList1?formStorage.changeList1:[];
    let reqFiles2 = formStorage.changeList2?formStorage.changeList2:[];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:Commons.ImageHostAddress+item.fileId});
    });
    let imageArr1 = []
    reqFiles1.map((item,index)=>{
      imageArr1.push({url:Commons.ImageHostAddress+item.fileId});
    });
    let imageArr2 = []
    reqFiles2.map((item,index)=>{
      imageArr2.push({url:Commons.ImageHostAddress+item.fileId});
    });
    let tansferModel = ''
    if(type === '0'){
      tansferModel = '转给本人客户'
    }else if(type === '1'){
      tansferModel = '转给其他理财师客户'
    }else if(type === '2'){
      tansferModel = '转给管理人客户'
    }else if(type === '3'){
      tansferModel = '管理人客户转入'
    }

    var transferDatas = Dic.transferDatas;
    return (
      <div className={tradeInfo.redbox}>
        <div className={tradeInfo.box}>
          <RejectCom data={data}/>
          <Tabs swipeable={false} animated={false}
                onTabClick={this.tabClick.bind(this)}
                defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'}>
            <TabPane tab="转让信息" key="1">
              <div>
                <WhiteSpace/>
                <div className={transfer.first}>
                  <div className={transfer.head_title}>
                    <p className={transfer.userName}>转受让模式</p>
                  </div>
                  <p className={transfer.rightText}>{tansferModel}</p>
                </div>
                <WhiteSpace/>
                <div className={transfer.first}>
                  <div className={transfer.head_title}>
                    <p className={transfer.userName}>交易信息</p>
                  </div>
                </div>
                {
                  (type == '3' ) ? <Form options={this.getOption7()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/> :
                    <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                }
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                {
                  type =='3'&& <Picker extra="请选择"
                                       data={transferDatas}
                                       title="选择类型"
                                       cols={1}
                                       {...getFieldProps('transferType', {
                                         initialValue: formValue.transferType,
                                       })}

                                       onDismiss={e => console.log('dismiss', e)}
                  >
                    <List.Item arrow="horizontal">转让类型</List.Item>
                  </Picker>
                }

                {
                  (type == '3'&&formValue.transferType == '01')&&
                  <Form options={this.getOptionsDate()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)} />
                }
                <WhiteSpace />
                {
                  (type == '3' ) ? null :(
                    <div>
                      <div className={transfer.first}>
                        <div className={transfer.head_title}>
                          <p className={transfer.userName}>转让方信息</p>
                        </div>
                      </div>
                      <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                      <WhiteSpace />
                      {formValue.custType==0 ? (
                          <div>
                            <div className={transfer.first}>
                              <div className={transfer.head_title}>
                                <p className={transfer.userName}>转让方经办人信息</p>
                              </div>
                            </div>
                            <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                            <PushFile
                              key={'PushFile3'}
                              onChange={this.onChange3}
                              files={imageArr2}
                              from={'change'}
                              maxImgCount={20}
                              title={'经办人证件附件'}
                              selectKey={'select_key3'}
                            />
                          </div>
                        )
                        : null}
                    </div>
                    )
                }


              </div>
            </TabPane>
            {
              ( type == '0' || type == '1'  || type == '3') ?
                (
                    <TabPane tab="受让信息" key="2">
                      <WhiteSpace />
                      {
                        (type === '0' || type === '3'  )?(
                          <div>
                            <WhiteSpace />
                            <Form options={this.getOption4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                          </div>
                        ):null}
                      {
                        (type === '1' || type === '2'  )?(
                          <div>
                            <WhiteSpace />
                            <Form options={this. getOption8()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                          </div>
                        ):null}
                      <Form options={this.getOption5()} dispatch={dispatch} formValue={formValue}  form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                      {(targCustType == '0')? (
                          <div>
                            <WhiteSpace />
                            <div className={transfer.first}>
                              <div className={transfer.head_title}>
                                <p className={transfer.userName}>受让方经办人信息</p>
                              </div>
                            </div>
                            <Form options={this.getOption6()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                            <PushFile
                              key={'PushFile2'}
                              onChange={this.onChange2}
                              files={imageArr1}
                              from={'change'}
                              maxImgCount={20}
                              title={'经办人证件附件'}
                              selectKey={'select_key2'}
                            />
                          </div>
                        )
                        : null}
                      <WhiteSpace/>
                    </TabPane>
                )
                :null

            }
            <TabPane tab="转受让资料" key="3">
              <PushFile
                key={'PushFile1'}
                onChange={this.onChange}
                files={imageArr}
                maxImgCount={20}
                from={'change'}
                title={'转受让资料'}
                selectKey={'select_key1'}
              />
            </TabPane>
          </Tabs>
        </div>
        <div>
          <p className={tradeInfo.shBtn0} style={{position:'absolute',zIndex:'99',cursor:'pointer'}} onClick={this.submit}>提交</p>
        </div>
      </div>
    )
  }
}
