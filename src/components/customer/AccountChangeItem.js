import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import tradeInfo from '../../styles/trade/redeem.less';
import changeStyle from '../../styles/customer/accountChange.less'
import getNameOfBank from "../../utils/Bank";
import Dic from '../../utils/dictionary';
import * as Commons from "../../utils/commonUtil";

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function onFieldsChange(props, changedFields)
{
  let {dispatch} = props;
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
}

@connect()
@createForm({onFieldsChange:onFieldsChange})
export default class AccountChangeItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {}
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
      let {changeList, changeList1} = formStorage;
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
      }
    }catch (e) {
      console.log(e)
    }
  }

  submit=()=>{
    let {dispatch,formStorage,newBankData,details, originData, form} = this.props;
    let {formValue} = formStorage
    if(!newBankData){
      Toast.fail('请选择新银行账户',3);
      return
    }else if(!formStorage.changeList || formStorage.changeList.length == 0){
      Toast.fail('请选换卡申请择附件',3);
      return
    }else {
      let custParams = {}
      if(details.custType == '0'){
        if(!formValue.operName){
          Toast.fail('请填写经办人姓名',3);
          return
        }else if(!formValue.operCertNo){
          Toast.fail('请填写经办人证件号',3);
          return
        } else if(!formValue.operCertType){
          Toast.fail('请选择经办人证件类型',3);
          return
        }else if(!formStorage.changeList1 || formStorage.changeList1.length == 0){
          Toast.fail('请选择经办人附件',3);
          return
        }
        custParams.operator = formValue.operName
        custParams.operCertNo = formValue.operCertNo
        custParams.operCertType = formValue.operCertType
        custParams.operCertPic = formStorage.changeList1
      }
      {
        let saveValue = {
          origCardNo: details.cardNo,
          cardNo: newBankData.cardNo,
          custType: details.custType,
          id: details.id,
          chaCardPic: formStorage.changeList,
          ...custParams
        };
        dispatch({
          type:'bank/bankCustChange',
          payload:{
            params:saveValue,
            backMethord:(data)=>{
              if(data&&data.code=='00'){
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'银行卡变更成功!',
                    backTitle:'返回选择持仓记录列表',
                  }}));
              }else {
               Toast.fail(data&&data.message?data.message:'银行卡保存错误!',2);
              }
            }
          }
        });
      }
    }
  }
  getOption0() {
    let {details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        changeType: 'modify',
        extra: details.prodName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        changeType: 'modify',
        extra: details.prodExpiName,
        arrow: 'empty'
      },
      bankName: {
        valueType: 'selfSelect',
        desc: '持有份额',
        changeType: 'modify',
        extra: details.totShr,
        arrow: 'empty'
      },
      cardNo: {
        valueType: 'selfSelect',
        desc: '可用份额',
        changeType: 'modify',
        extra: details.avlShr,
        arrow: 'empty'
      },
    })
  }
  getOption1() {
    let {details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: details.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra: Dic.fetchDicValue('bankCertType',details.certType) + ' | ' + details.certNo,
        arrow: 'empty'
      }
    })
  }
  getOption2() {
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '原银行账户',
        extra: '',
        onClick: ()=>{
          console.log('点击原银行账户！！！')
        },
        arrow: 'empty'
      }
    })
  }
  getOption3() {
    let {dispatch,details, originData,newBankData, form} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '新银行账户',
        extra: '请选择',
        onClick: ()=>{
          dispatch(routerRedux.push({
            pathname: '/selectBankCus',
            state: {originData: originData,newBankData:newBankData}
          }))
          console.log('click++++++')
        }
      }
    })
  }
  getOption4() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      operName: {
        required:true,
        type: 'text',
        changeType: 'modify',
        desc:'姓名',
        placeholder: '请输入',
        extra: formValue.operName || ''
      },
      operCertNo: {
        required:true,
        type: 'text',
        changeType: 'modify',
        desc:'证件号',
        placeholder: '请输入',
        extra: formValue.operCertNo || ''
      },
      operCertType: {
        type: Dic.fetchDicList('bankCertType'),
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
  render(){
    const { dispatch,onChangeMethord,form,formStorage, details, newBankData} = this.props;
    let where = newBankData ? newBankData.bankName : ''
    let cardNo = newBankData ? newBankData.cardNo : ''
    let reqFiles = formStorage.changeList?formStorage.changeList:[];
    let reqFiles1 = formStorage.changeList1?formStorage.changeList1:[];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:Commons.ImageHostAddress+item.fileId});
    });
    let imageArr1 = []
    reqFiles1.map((item,index)=>{
      imageArr1.push({url:Commons.ImageHostAddress+item.fileId});
    });
    let {formValue} = formStorage
    return (
      <div className={tradeInfo.redbox} id='redbox'>
        <div className={tradeInfo.box}>
          <Tabs swipeable={false} animated={false}>
            <TabPane tab="基本信息" key="1">
              <div>
                <WhiteSpace/>
                <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <div className={changeStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>银行卡号：{details.cardNo}</p>
                  <p>开户行：{details.bankName}</p>
                </div>
                <WhiteSpace />
                <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                {newBankData ?
                  <div className={changeStyle.midContent} style={{backgroundColor: '#fff'}}>
                    <p>银行卡号：{cardNo}</p>
                    <p>开户行：{where}</p>
                  </div>
                : null}
              </div>
            </TabPane>
            {details.custType==0 ? <TabPane tab="经办人信息" key="2">
              <Form options={this.getOption4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
              <WhiteSpace/>
            </TabPane> : null}
            <TabPane tab="附件信息" key="3">
              <PushFile
                key={'PushFile1'}
                onChange={this.onChange}
                files={imageArr}
                maxImgCount={20}
                from={'change'}
                title={'换卡申请附件'}
                selectKey={'select_key1'}
              />
              {details.custType==0 ?<PushFile
                key={'PushFile2'}
                onChange={this.onChange2}
                files={imageArr1}
                from={'change'}
                maxImgCount={20}
                title={'经办人附件'}
                selectKey={'select_key2'}
              /> : null}
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
