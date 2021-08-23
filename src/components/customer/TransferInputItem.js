import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast,Picker,List} from 'antd-mobile';
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
import {initUploadFileParams} from '../../utils/commonMethods'

const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function onFieldsChange(props, changedFields)
{

  let {dispatch,formStorage} = props;

  console.log('changedFields=======',changedFields)
  let myObject = formStorage.formValue || {}
  //受让方经办人证件类型
  if(changedFields.assOperCertType && changedFields.assOperCertType.value)
  {
    let value = changedFields.assOperCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assOperCertType:value
      },
    });
  }
//受让方经办人证件号码
  if(changedFields.assOperCertNo && changedFields.assOperCertNo.value)
  {
    let value = changedFields.assOperCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assOperCertNo:value
      },
    });
  }
  //受让方经办人姓名
  if(changedFields.assOperName && changedFields.assOperName.value)
  {
    let value = changedFields.assOperName.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assOperName:value
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
  if(changedFields.transferAmount && changedFields.transferAmount.value)
  {
    let value = changedFields.transferAmount.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferAmount:value
      },
    });
  }
  //转让份额
  if(changedFields.transferShare && changedFields.transferShare.value)
  {
    let value = changedFields.transferShare.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferShare:value
      },
    });
  }
  //转让手续费
  if(changedFields.transferChar && changedFields.transferChar.value)
  {
    let value = changedFields.transferChar.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferChar:value
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
  if(changedFields.startDate&&changedFields.startDate.value)
  {
    let value = changedFields.startDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        startDate:value
      },
    });
  }
  //定制结束日期
  if(changedFields.endDate&&changedFields.endDate.value)
  {
    let value = changedFields.endDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        endDate:value
      },
    });
  }
  //转让方经办人姓名
  if(changedFields.operName && changedFields.operName.value)
  {
    let value = changedFields.operName.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operName:value
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
  if(changedFields.assiCustNameDesc && changedFields.assiCustNameDesc.value)
  {
    let value = changedFields.assiCustNameDesc.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustNameDesc:value
      },
    });
  }
  //输入的受让人证件号码
  if(changedFields.assiCustCertNo && changedFields.assiCustCertNo.value)
  {
    let value = changedFields.assiCustCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustCertNo:value
      },
    });
  }
  //输入的受让人证件类型
  if(changedFields.assiCustCertType && changedFields.assiCustCertType.value)
  {
    let value = changedFields.assiCustCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustCertType:value
      },
    });
  }
  if(myObject && myObject.assiCustNameDesc && myObject.assiCustCertNo ){
    console.log('12121!@!@!@@')
  }
}

@connect()
@createForm({onFieldsChange:onFieldsChange})
export default class TransferInputItemModify extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {
      fileUploadParams:{}
    }
  }

  componentDidMount()
  {
    this.setState({
      fileUploadParams: initUploadFileParams('product')
    })
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }
  componentWillUnmount(){
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
      let {dispatch,formStorage} = this.props;
      let fileKeyType = receiveData.fileKeyType;
      let acceptFileData =formStorage[fileKeyType];
      acceptFileData = [...acceptFileData,...receiveData.resposeResult.model]
        dispatch({
          type:'formStorage/fetch',
          payload:{
            [fileKeyType]:acceptFileData
          }
        });
    }catch (e) {

    }

  }

  submit=()=>{
    let {dispatch,formStorage,details,type, originData, form,newBankData,assi} = this.props;
    console.log('this.props提交',this.props)
    let where = newBankData ? newBankData.bankName : ''
    let cardNo = newBankData ? newBankData.cardNo : ''
    let {formValue} = formStorage
    console.log('提交时候的的formValue',formValue)
    if(isRepeat>=1) return;
   if(!formStorage.changeList || formStorage.changeList.length == 0){
      Toast.fail('请选择转受让资料',3);
      return
    }else {
     form.validateFields((error,value)=>{
       if(!error)
       {
         console.log('value',value)
         let custParams = {}
         let custParamsPro = {}
         let custParamsMana = {}
         if(type === '0' || type === '1' ||type === '2' ){
           if(details.custType == '0'){  //转让方经办人信息
             if(!formValue.operName){
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
             custParams.operator = formValue.operName //转让方经办人姓名
             custParams.operCertNo = formValue.operCertNo //转让方经办人证件号码
             custParams.operCertType = formValue.operCertType //转让方经办人证件类型
             custParams.fileInfosJbr = formStorage.changeList2//转让方经办人附件
           }
            custParamsPro.custType = details.custType, //是机构客户还是个人客户
             custParamsPro.prodId = details.prodId, //产品id
             custParamsPro.shrTypeId = details.shrTypeId, //类别id
             custParamsPro.cardNo = details.cardNo,//银行卡
             custParamsPro.custId =details.custId,//客户的id
             custParamsPro.certType = details.certType,//证件类型
             custParamsPro.certNo = details.certNo//证件号码
         }else{
             custParamsMana.prodId = formValue.prodNameValue, //产品id
              custParamsMana.shrTypeId = formValue.prodTypeId//类别id
           if(!formValue.prodNameValue){
             Toast.fail('请输入产品名称',3);
             return
           }
           if(!formValue.prodTypeId){
             Toast.fail('请输入产品类别',3);
             return
           }
         }
         let assCustParams = {}
         let assInfo = {}
         if(type == '0' ||  type == '1'  ||  type == '3'){

           let  targCustType =  formValue&&formValue.assi&&formValue.assi.custType ? formValue.assi.custType:''//受让方客户是机构还是个人
           // console.log('````````````targCustType',targCustType)
           if(!targCustType){
             Toast.fail('请输入受让人信息',3);
             return
           }
           if(targCustType == '0'){ //受让方经办人信息

             if(!formValue.assOperName){
               Toast.fail('请填写受让方经办人姓名',3);
               return
             }else if(!formValue.assOperCertNo){
               Toast.fail('请填写受让方经办人证件号',3);
               return
             } else if(!formValue.assOperCertType){
               Toast.fail('请选择受让方经办人证件类型',3);
               return
             }else if(!formStorage.changeList1 || formStorage.changeList1.length == 0){
               Toast.fail('请选择受让方经办人附件',3);
               return
             }
             assCustParams.targOperator = formValue.assOperName //受让方经办人姓名
             assCustParams.targOperCertNo = formValue.assOperCertNo //受让方经办人证件号码
             assCustParams.targOperCertType = formValue.assOperCertType //受让方经办人证件类型
             if(type === '3'){
               assCustParams.fileInfos_jbr_srf = formStorage.changeList1//受让方经办人附件
             }else {
               assCustParams.fileInfosJbrSrf = formStorage.changeList1//受让方经办人附件
             }

           }
           assInfo.targCustType =  formValue&&formValue.assi&&formValue.assi.custType ? formValue.assi.custType:'' //受让方客户是机构还是个人
           assInfo.targetCertType= formValue.custCertTy ?formValue.custCertTy: formValue.assiCustCertType//受让人证件类型
           assInfo.targetCertTypeName= formValue.custCertType//受让人证件类型中文名称
           assInfo.targetCertNo = formValue.custCertNo  ? formValue.custCertNo : formValue.assiCustCertNo//受让人证件号码
           assInfo.targetName= formValue.custNameDesc ?  formValue.custNameDesc: formValue.assiCustNameDesc//受让人姓名
           assInfo.targMgrName = formValue && formValue.assi && formValue.assi.mgrName ? formValue.assi.mgrName:''//受让人理财师姓名
           assInfo.targBrahName = formValue && formValue.assi &&formValue.assi.brahName ? formValue.assi.brahName : ''//受让人所属分公司
           let whereTrans = formStorage.transBank ?formStorage.transBank.bankName : ''
           let cardNoTrans = formStorage.transBank ? formStorage.transBank.cardNo : ''
           if(formStorage.transBank){
             assInfo.targetCardNo= cardNoTrans//受让人银行卡号
             assInfo.targetBankName= whereTrans//受让人银行开户行名称
           }else{
             assInfo.targetCardNo= cardNo//受让人银行卡号
             assInfo.targetBankName= where//受让人银行开户行名称
           }

           if(!assInfo.targetCardNo) {
             Toast.fail('受让人银行账号不能为空!',2);
             return;
           }
           if(!assInfo.targetBankName) {
             Toast.fail('受让人银行开户行名称不能为空!',2);
             return;
           }
         }
         let saveValue = {
           transferFlag:type, //转让标识
           reqShr: formValue.transferShare,//转让份额
           remitDate: formValue.remitDate,//转让日期
           reqAmt: formValue.transferAmount,//转让金额
           fee: formValue.transferChar,//转让手续费
           transferType:formValue.transferType?formValue.transferType.join():'00',//转让类型 默认非定制转让
           id: formValue.id,//id
           fileInfo: formStorage.changeList,//转受让附件
           newCardFlag: 1,

           ...assCustParams,
           ...custParamsMana,
           ...assInfo,
           ...custParamsPro,
           ...custParams
         };
         //定制转让
         if(saveValue.transferType=='01'){
           saveValue.startDate = formValue.startDate.format('YYYY-MM-DD');
           saveValue.endDate = formValue.endDate.format('YYYY-MM-DD');
           let iosStartDateModel = saveValue.startDate.split('-').join('/');
           let iosEndDateModel = saveValue.endDate.split('-').join('/')
           // console.log(saveValue.startDate,saveValue.endDate)
            if(new Date(iosEndDateModel).getTime()< new Date(iosStartDateModel).getTime()){
              console.log('日期校验')
              Toast.fail('结束日期不能小于开始日期!',2);
              setTimeout(()=>{
                Toast.hide();
              },2000)
              return;
            }

         }

         if(saveValue.remitDate){
           saveValue.remitDate = saveValue.remitDate.format('YYYY-MM-DD');
         }
         console.log('请求参数3：saveValue',saveValue);

         isRepeat = 1;
         if(type == '3'){
           // console.log('232323')
           dispatch({
             type:'trade/fetchInputCreate',
             payload:{
               params:saveValue,
               backMethord:(data)=>{
                 isRepeat = 0;
                 Toast.hide();
                 if(data&&data.code=='00'){
                   dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                       successTitle:'转受让交易提交成功!',
                       backTitle:'返回客户持仓详情页面',
                     }}));
                 }else {
                   Toast.fail(data&&data.message?data.message:'转受让交易提交错误!',2);
                 }
               }
             }
           });
         }else {
           console.log('######$$$$$')
           dispatch({
             type:'trade/fetchCreate',
             payload:{
               params:saveValue,
               backMethord:(data)=>{
                 isRepeat = 0;
                 Toast.hide();
                 if(data&&data.code=='00'){
                   dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                       successTitle:'转受让交易提交成功成功!',
                       backTitle:'返回客户持仓详情页面',
                     }}));
                 }else {
                   Toast.fail(data&&data.message?data.message:'银行卡保存错误!',2);
                 }
               }
             }
           });
         }

       }
       else Toast.fail('输入参数中存在错误!',3);
     })

    }
  }
  getOption0() {
    let {details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: details.prodName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: details.prodExpiName,
        arrow: 'empty'
      },
    })
  }
  // 管理人客户转入的时候需要选择产品名称和产品类别
  getOption7() {
    let {dispatch,formStorage} = this.props;
    let {formValue} = formStorage;
    return({
      accountName: {
        required:true,
        valueType:'selfSelect',
        title:'产品名称',
        desc:'产品名称',
        extra:formValue.prodNameDesc?formValue.prodNameDesc:'*',
        otherProps:{
          error:!formValue.prodNameDesc,
        },
        onClick:()=>{
          // 如果已经选择份额类别再重新选择产品清空份额类别重新选择
          if (formValue.prodNameDesc) {
            formValue.prodNameDesc = null;
            formValue.prodTypeText = null;
          }

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
      accountType: {
        required:true,
        valueType:'selfSelect',
        title:'产品类别',
        desc:'产品类别',
        extra:formValue.prodTypeText?formValue.prodTypeText:'*',
        onClick:()=>{
          if (formValue.prodNameDesc==undefined) Toast.fail('请先选择产品名称!',2);
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
          error:!formValue.prodTypeText,
        },
      },
    })
  }
  getOption1() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage;
    console.log('表单值===',formValue)
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
      transferShare: {
        required:true,
        type: 'number',
        desc:'转让份额',
        placeholder: '请输入转让份额',
        extra: formValue.transferShare || ''
      },
      transferAmount: {
        required:true,
        type: 'number',
        desc:'转让金额',
        placeholder: '请输入转让金额',
        extra: formValue.transferAmount || ''
      },
      transferChar: {
        type: 'number',
        desc:'转让手续费',
        placeholder: '请输入转让手续费',
        extra: formValue.transferChar || ''
      }
    })
  }
  getOptionsDate(){
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage;
    return({
        startDate:{
            valueType:'date',
            title:'定制开始日期',
            desc:'定制开始日期',
            mode:'date',
            extra:'请选择开始日期',
            disabled:formValue.long,
            minDate:minDate,
            maxDate:maxDate,
            required:true,
        },
      endDate:{
        valueType:'date',
        title:'定制结束日期',
        desc:'定制结束日期',
        mode:'date',
        extra:'请选择结束日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      }
    })
  }
  getOption2() {
    let {details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户姓名',
        extra: details.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: Dic.fetchDicValue('transCertType',details.certType),
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: details.certNo,
        arrow: 'empty'
      },
      cardNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra: details.cardNo,
        arrow: 'empty'
      },
      bankName: {
        valueType: 'selfSelect',
        desc: '开户行',
        extra: details.bankName,
        arrow: 'empty'
      }
    })
  }
  //转让方经办人信息
  getOption3() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      operName: {
        required:true,
        type: 'text',
        desc:'姓名',
        placeholder: '请输入',
        extra: formValue.operName || ''
      },
      operCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入',
        extra: formValue.operCertNo || ''
      },
      operCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
      },
    })
  }
//受让方信息
  getOption4() {
    let {dispatch,form,formStorage,location,bank,newBankData} = this.props;
    let {formValue} = formStorage
    return({
      assiCustNameDesc: {
        required:true,
        valueType:'selfSelect',
        title:'受让人姓名',
        desc:'受让人姓名',
        extra:formValue.custNameDesc?formValue.custNameDesc:'*',
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
        otherProps:{
          error:!formValue.custNameDesc,
        },
      },
      assiCustCertNo: {
        required:true,
        valueType: 'selfSelect',
        desc:'证件号',
        extra: formValue.custCertNo || '',
        arrow: 'empty'

      },
      assiCustCertType: {
        required:true,
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: Dic.fetchDicValue('transCertType',formValue.custCertTy),
        arrow: 'empty'
      }
    })
  }
  getOption8() {
    let {dispatch,form,formStorage,location,bank,newBankData} = this.props;
    let {formValue} = formStorage
    return({
      assiCustNameDesc: {
        required:true,
        type: 'text',
        desc:'受让人姓名',
        placeholder: '请输入受让人姓名',
        extra:formValue.assiCustNameDesc|| '',
      },
      assiCustCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入证件号',
        extra: formValue.assiCustCertNo|| '',
      },
      assiCustCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
      }
    })
  }
  getOption5() {
    let {dispatch,form,formStorage,location,type,newBankData,assi} = this.props;
    let where = newBankData ? newBankData.bankName : ''
    let whereTrans = formStorage.transBank ?formStorage.transBank.bankName : ''
    let cardNo = newBankData ? newBankData.cardNo : ''
    let cardNoTrans = formStorage.transBank ? formStorage.transBank.cardNo : ''
    let {formValue} = formStorage
    console.log('受让方formValue',formValue)
    let assiBankCard = {}
    let assiOpenBank = {}
    if(formStorage.transBank){
      assiBankCard ={
        assiBankCard: {
          required:true,
          valueType: 'selfSelect',
          title:'银行卡号',
          desc: '银行卡号',
          extra:cardNoTrans?cardNoTrans:'*',
          onClick: ()=>{
            if(type === '0' || type === '3'  ){
              if(formValue.custNameDesc){
                let  addBank = {
                  custName:formValue.custNameDesc,
                  certType:formValue.custCertTy,
                  certNo:formValue.custCertNo,
                  id:formValue.assi&&formValue.assi.id ? formValue.assi.id : '' ,
                }
                dispatch(routerRedux.push({
                  pathname: '/selectBankCus',
                  state: {
                    transInfo:'0',
                    targetName:formValue.custNameDesc ,
                    targetCertType: formValue.custCertTy,
                    targetCertNo: formValue.custCertNo,
                    addBank:addBank,
                    newBankData:newBankData
                  }
                }))
              }else{
                Toast.show('请先选择受让人姓名', 2)
              }
            }else{
              if(formValue.assiCustNameDesc && formValue.assiCustCertNo && formValue.assiCustCertType){
                let saveValue = {
                  targetName: formValue.assiCustNameDesc,
                  targetCertType: formValue.assiCustCertType ,
                  targetCertNo: formValue.assiCustCertNo
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
                          custName:formValue.assiCustNameDesc,
                          certType: formValue.assiCustCertType,
                          certNo:formValue.assiCustCertNo,
                          id:data.model&&data.model.id ? data.model.id : '' ,
                        }

                        dispatch(routerRedux.push({
                          pathname: '/selectBankCus',
                          state: {
                            transInfo:'0',
                            targetName:formValue.assiCustNameDesc ,
                            targetCertType: formValue.assiCustCertType,
                            targetCertNo: formValue.assiCustCertNo,
                            addBank:addBank,
                            newBankData:newBankData
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
      assiOpenBank ={
        assiOpenBank: {
          required:true,
          valueType: 'selfSelect',
          desc:'开户行',
          extra: whereTrans || '',
          arrow: 'empty'
        },
      };

    }else{
      assiBankCard ={
        assiBankCard: {
          required:true,
          valueType: 'selfSelect',
          title:'银行卡号',
          desc: '银行卡号',
          extra:cardNo?cardNo:'*',
          onClick: ()=>{
            if(type === '0' || type === '3'  ){
              if(formValue.custNameDesc){
                let  addBank = {
                  custName:formValue.custNameDesc,
                  certType:formValue.custCertTy,
                  certNo:formValue.custCertNo,
                  id:formValue.assi&&formValue.assi.id ? formValue.assi.id : '' ,
                }
                dispatch(routerRedux.push({
                  pathname: '/selectBankCus',
                  state: {
                    transInfo:'0',
                    targetName:formValue.custNameDesc ,
                    targetCertType: formValue.custCertTy,
                    targetCertNo: formValue.custCertNo,
                    addBank:addBank,
                    newBankData:newBankData
                  }
                }))
              }else{
                Toast.show('请先选择受让人姓名', 2)
              }
            }else{
              if(formValue.assiCustNameDesc && formValue.assiCustCertNo && formValue.assiCustCertType){
                let saveValue = {
                  targetName: formValue.assiCustNameDesc,
                  targetCertType: formValue.assiCustCertType ,
                  targetCertNo: formValue.assiCustCertNo
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
                          custName:formValue.assiCustNameDesc,
                          certType: formValue.assiCustCertType,
                          certNo:formValue.assiCustCertNo,
                          id:data.model&&data.model.id ? data.model.id : '' ,
                        }

                        dispatch(routerRedux.push({
                          pathname: '/selectBankCus',
                          state: {
                            transInfo:'0',
                            targetName:formValue.assiCustNameDesc ,
                            targetCertType: formValue.assiCustCertType,
                            targetCertNo: formValue.assiCustCertNo,
                            addBank:addBank,
                            newBankData:newBankData
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
      assiOpenBank ={
        assiOpenBank: {
          required:true,
          valueType: 'selfSelect',
          desc:'开户行',
          extra: where || '',
          arrow: 'empty'
        },
      };

    }
    return({
      ...assiBankCard,
      ...assiOpenBank,
    })
  }
  //受让方经办人信息
  getOption6() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      assOperName: {
        required:true,
        type: 'text',
        desc:'姓名',
        placeholder: '请输入',
        extra: formValue.assOperName || ''
      },
      assOperCertNo: {
        required:true,
        type: 'text',
        desc:'证件号',
        placeholder: '请输入',
        extra: formValue.assOperCertNo || ''
      },
      assOperCertType: {
        type: Dic.fetchDicList('transCertType'),
        required: true,
        valueType: 'select',
        desc: '证件类型',
        title: '证件类型',
      },
    })
  }
  onChange=(files, type, index)=> {
    let {dispatch,formStorage,customer} = this.props;
    let {changeList} = formStorage;
    const temArr = changeList|| []
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
                changeList.push(arr)
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    changeList:changeList
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
      changeList.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          changeList:changeList
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
  render(){
    const { getFieldProps } = this.props.form
    const { dispatch,form,formStorage, details,type,newBankData} = this.props;
    const {fileUploadParams,infoValues} = this.state;
    // console.log('this.props11111111111111',this.props)
    const { defaultActiveKey,formValue } = formStorage;
    let  targCustType =  formValue&&formValue.assi&&formValue.assi.custType ? formValue.assi.custType:''
    // console.log('targCustType',targCustType)
    let reqFiles = formStorage.changeList?formStorage.changeList:[];
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
                <Form options={this.getOption1()} dispatch={dispatch} formValue={formValue} form={form}  onChangeMethord={this.onChangeMethord.bind(this)}/>
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
                      {details.custType==0 ? (
                          <div>
                            <div className={transfer.first}>
                              <div className={transfer.head_title}>
                                <p className={transfer.userName}>转让方经办人信息</p>
                              </div>
                            </div>
                            <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                            <PushFile
                                fileUploadParams={fileUploadParams}
                                fileKeyType={'changeList2'}
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
                                fileUploadParams={fileUploadParams}
                                fileKeyType={'changeList1'}
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
                  fileUploadParams={fileUploadParams}
                  fileKeyType={'changeList'}
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
