import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import tradeInfo from '../../styles/trade/redeem.less';
import recordsStyle from '../../styles/customer/recordsStyle.less'
import ApprProgress from '../../components/customer/ApprProgress'
import * as Commons from "../../utils/commonUtil";
import Dic from "../../utils/dictionary";

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function connectProps({rebutSpace, formStorage, bank}) {
  return {rebutSpace, formStorage, bank}
}
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
@connect(connectProps)
@createForm({onFieldsChange:onFieldsChange})
export default class RebutItem extends React.Component{
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
      let {dispatch,formStorage,basic} = this.props;
      let {changeList, changeList1} = formStorage;
      if(blobs.size > 5000000){//5M 5000000
        Toast.fail('文件大小超出限制',3);
        return;
      }
      if(global.selectKey=='select_key1'){
        let params = {orderNo:'',reqSeq: basic.reqNo,type: '8'};
        dispatch({
          type:'trade/uploadTradeFiles',
          payload:{
            params:params,
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {url: resultFiles[0].fileSvrPath}
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
        let params = {orderNo:'',reqSeq: basic.reqNo,type: 'a'};
        dispatch({
          type:'trade/uploadTradeFiles',
          payload:{
            params:params,
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {url: resultFiles[0].fileSvrPath}
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

    }


  }


  submit(data){
    let saveValue = {
      id: data.id
    }
    let {dispatch} = this.props
    dispatch({
      type:'bank/abolish',
      payload:{
        params:saveValue,
        backMethod:(data)=>{
          if(data&&data.code=='00'){
            Toast.success('作废成功！')
            dispatch({
              type: 'bank/getRejectList',
              payload: {
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                rejectList: [],
                source: location.state
              },
            })
            setTimeout(function () {
              history.go(-1)
            }, 1000)
          }else {
            Toast.fail(data&&data.message?data.message:'废除失败!',2);
          }
        }
      }
    });
  }
  commit=()=>{
    let {dispatch,formStorage,newBankData, basic } = this.props;
    let {formValue} = formStorage
    if(!newBankData){
      Toast.fail('请选择新银行账户',3);
      return
    }else if(!formStorage.changeList || formStorage.changeList.length == 0){
      Toast.fail('请选择附件',3);
      return
    }else {
      let custParams = {}
      if(basic.custType == '0'){
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
        custParams.operName = formValue.operName
        custParams.operCertNo = formValue.operCertNo
        custParams.operCertType = formValue.operCertType
      }
      {
        let saveValue = {
          origCardNo: basic.origCardNo,
          cardNo: newBankData.cardNo,
          id: basic.id,
          custId: basic.custId,
          reqNO: basic.reqNo,
          ...custParams
        };
        console.log('saveValue',saveValue);
        dispatch({
          type:'bank/modifySubmit',
          payload:{
            params:saveValue,
            backMethod:(data)=>{
              if(data&&data.code=='00'){
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'提交成功!',
                    backTitle:'返回驳回修改列表',
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
  onChange=(files, type, index)=> {
    let {dispatch,formStorage,basic} = this.props;
    let {changeList} = formStorage;
    let params = {orderNo:'',reqSeq: basic.reqNo,type: '8'};
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
        type:'trade/uploadTradeFiles',
        payload:{
          params:params,
          images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(resultFiles.length>0)
              {
                let arr = {url: resultFiles[0].fileSvrPath}
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
      let file = changeList[index];
      dispatch({
        type:'trade/delTradeFiles',
        payload:{
          delList:[{id:file.fileId}],
          backMethord:(data)=>{
            if(data&&data.code=='00')
            {
                changeList.splice(index,1);
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    changeList:changeList
                  }
                });
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
          }
        }
      });
    }
  }
  onChange2=(files, type, index)=> {
    let {dispatch,formStorage,basic} = this.props;
    let {changeList1} = formStorage;
    let params = {orderNo:'',reqSeq: basic.reqNo,type: 'a'};
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
        type:'trade/uploadTradeFiles',
        payload:{
          params:params,
          images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(resultFiles.length>0)
              {
                let arr = {url: resultFiles[0].fileSvrPath}
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
      let file = changeList1[index];
      dispatch({
        type:'trade/delTradeFiles',
        payload:{
          delList:[{id:file.fileId}],
          backMethord:(data)=>{
            if(data&&data.code=='00')
            {
              changeList1.splice(index,1);
              dispatch({
                type:'formStorage/fetch',
                payload:{
                  changeList1:changeList1
                }
              });
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
          }
        }
      });
    }
  }
  getOption0() {
    let {basic} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        changeType: 'modify',
        extra: basic.prodName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        changeType: 'modify',
        extra: basic.shrType,
        arrow: 'empty'
      }
    })
  }
  getOption1() {
    let {basic} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: basic.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra: basic.certTypeName + '  |  ' + basic.certNo,
        arrow: 'empty'
      }
    })
  }
  getOption2() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '原银行账户',
        extra: '',
        arrow: 'empty'
      }
    })
  }
  getOption3() {
    let {dispatch,basic,newBankData} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '新银行账户',
        extra: '修改',
        onClick: ()=>{
          dispatch(routerRedux.push({
            pathname: '/selectBankCus',
            state: {originData: {data: basic},newBankData:newBankData}
          }))
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
  render(){
    const { dispatch,onChangeMethord,form,formStorage,basic,bankImageList,progressList,newBankData} = this.props;
    let {formValue} = formStorage
    let where = newBankData ? newBankData.bankName: ''
    let cardNo = newBankData ? newBankData.cardNo: ''
    let reqFiles = formStorage.changeList?formStorage.changeList: [];
    let reqFiles1 = formStorage.changeList1?formStorage.changeList1: [];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:item.url || Commons.ImageHostAddress+item.fileSvrPath});
    });
    let imageArr1 = []
    reqFiles1.map((item,index)=>{
      imageArr1.push({url:item.url || Commons.ImageHostAddress+item.fileSvrPath});
    });
    return (
      <div className={tradeInfo.redbox} id='redbox'>
        <div className={tradeInfo.box}>
          <Tabs swipeable={false} animated={false}>
            <TabPane tab="银行卡信息" key="1">
              <div>
                <WhiteSpace/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>申请状态：<span style={{color: '#E8191B'}}>{basic.confStatName}</span></p>
                  <p>驳回原因：{basic.remark}</p>
                  <p>驳回时间：{basic.createTime}</p>
                </div>
                <WhiteSpace />
                <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>银行卡号：{basic.origCardNo}</p>
                  <p>开户行：{basic.origBankName}</p>
                </div>
                <WhiteSpace />
                <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>银行卡号：{cardNo}</p>
                  <p>开户行：{where}</p>
                </div>
              </div>
            </TabPane>
            {basic.custType==0 ? <TabPane tab="经办人信息" key="2">
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
              {basic.custType==0 ?<PushFile
                key={'PushFile2'}
                onChange={this.onChange2}
                files={imageArr1}
                maxImgCount={20}
                maxImgCount={20}
                title={'经办人附件'}
                selectKey={'select_key2'}
              /> : null}
            </TabPane>
            <TabPane tab="审批进度" key="4">
              <ApprProgress progressList={progressList}/>
              <WhiteSpace/>
            </TabPane>
          </Tabs>
        </div>
        <div>
          <p className={recordsStyle.shBtn} style={{position:'absolute',zIndex:'99',cursor:'pointer'}} onClick={this.submit.bind(this, basic)}>作废申请</p>
          <p className={recordsStyle.shBtn1} style={{position:'absolute',zIndex:'99',cursor:'pointer'}} onClick={this.commit}>提交修改</p>
        </div>
      </div>
    )
  }
}
