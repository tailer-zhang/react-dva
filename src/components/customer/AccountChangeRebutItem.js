import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import tradeInfo from '../../styles/trade/redeem.less';
import * as Commons from "../../utils/commonUtil";
import ApprProgress from '../../components/customer/ApprProgress'

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function onFieldsChange(props, changedFields)
{
  let {dispatch} = props;
  if(changedFields.bankName && changedFields.bankName.value)
  {
    let value = changedFields.bankName.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        bankName:value
      },
    });
  }
}

@connect()
@createForm({onFieldsChange:onFieldsChange})
export default class AccountChangeRebutItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {}
  }

  //------------------------- android multiple choices -------------------------
  componentDidMount()
  {
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }
  componentWillUnmount(){
    let _this = this
    global.selectKey = ''
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
      let {dispatch, formStorage, location, childlist} = this.props;
      let data = location.state
      let {changeList} = formStorage;
      if (blobs.size > 5000000) {//5M 5000000
        Toast.fail('文件大小超出限制', 3);
        return;
      }
      if(global.selectKey==='select_modify_item1'){
        let params = {orderNo:'',reqSeq: data.reqNo,type: 'k'};
        dispatch({
          type:'trade/uploadTradeFiles',
          payload:{
            params: params,
            images:[{file: blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let arr = {srcFileName: resultFiles[0].srcFileName, fileSvrPath: resultFiles[0].fileSvrPath}
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

      }else if (!isNaN(global.selectKey)) {
        const {fileList} = this.props;
        let {myFileArr} = formStorage;
        let fileArr = myFileArr || []
        fileArr[global.selectKey] = fileArr[global.selectKey] || []
        let params = {orderNo:'',reqSeq: childlist[global.selectKey].reqNo,type: 'k'};
        dispatch({
          type:'trade/uploadTradeFiles',
          payload:{
            params: params,
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let temp = {
                    fileName: resultFiles[0].srcFileName,
                    id: fileList[global.selectKey].id,
                    fileId: resultFiles[0].fileSvrPath,
                  }
                  fileArr[global.selectKey].push(temp)
                  dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      myFileArr: fileArr
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


  //------------------------- android multiple choices -------------------------

  //作废
  submit=()=>{
    let data = this.props.location.state
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
  //提交
  commit=()=>{
    let {dispatch,formStorage, location} = this.props;
    let data = location.state
    let {formValue} = formStorage
    if(formValue.bankName == undefined){
      Toast.fail('请填写新开户行',2);
      return
    }else {
        let saveValue = {
          bankName: formValue.bankName,
          id: data.id,
          reqNO: data.reqNo
        };
        console.log('saveValue',saveValue);
        dispatch({
          type:'openBank/changeReject',
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
  getOption0() {
    let {location} = this.props;
    let data = location.state
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: data.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra: data.certTypeName,
        arrow: 'empty'
      }
    })
  }
  getOption1() {
    let {location} = this.props;
    let data = location.state
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '户名',
        changeType: 'modify',
        extra: data.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '开户证件',
        changeType: 'modify',
        extra: data.certTypeName,
        arrow: 'empty'
      },
      accountType1: {
        valueType: 'selfSelect',
        desc: '原开户行',
        changeType: 'modify',
        extra: data.origBankName,
        arrow: 'empty'
      },
      bankName: {
        required:true,
        type: 'text',
        changeType: 'modify',
        desc:'新开户行',
        extra: data.bankName,
        placeholder: '请输入'
      },
      bankNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        changeType: 'modify',
        extra: data.cardNo,
        arrow: 'empty'
      },
    })
  }

  onChange=(files, type, index)=> {
    let {dispatch,formStorage,customer, location} = this.props;
    let {changeList} = formStorage;
    let data = location.state
    const temArr = changeList
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
      let params = {orderNo:'',reqSeq: data.reqNo,type: 'k'};
      let image = files[files.length-1];
      dispatch({
        type:'trade/uploadTradeFiles',
        payload:{
          params: params,
          images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(resultFiles.length>0)
              {
                let arr = {srcFileName: resultFiles[0].srcFileName, fileSvrPath: resultFiles[0].fileSvrPath}
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
            else Toast.fail(data&&data.message?data.message:'图片删除错误!',2);
          }
        }
      });
    }
  }

  renderList(){
    const { fileList} = this.props;
    let arr = []
    let {dispatch,formStorage,childlist} = this.props;
    let {myFileArr} = formStorage;
    let fileArr = myFileArr || []
    for(let i =0; i < fileList.length; i++){
      let tempArr = []
      let data = fileList[i]
      fileArr[i] = fileArr[i] || []
      fileArr[i].map((item,index)=>{
        tempArr.push({url:Commons.ImageHostAddress+item.fileId});
      });
      let temp = (
        <div key={i}>
          <PushFile
            from = {'change'}
            key={i}
            onChange={(files, type, index)=>{
              if(type=='add')//表示添加图片
              {
                let params = {orderNo:'',reqSeq: childlist[i].reqNo,type: 'k'};
                let image = files[files.length-1];
                dispatch({
                  type:'trade/uploadTradeFiles',
                  payload:{
                    params: params,
                    images:[{file:image.file}],
                    backMethord:(data)=>{
                      if(data&&data.code=='00'&&data.model)
                      {
                        let resultFiles = data.model;
                        if(resultFiles.length>0)
                        {
                          let temp = {
                            fileName: resultFiles[0].srcFileName,
                            id: fileList[i].id,
                            fileId: resultFiles[0].fileSvrPath,
                          }
                          fileArr[i].push(temp)
                          dispatch({
                            type:'formStorage/fetch',
                            payload:{
                              myFileArr: fileArr
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
                let file = fileArr[i][index];
                dispatch({
                  type:'trade/delTradeFiles',
                  payload:{
                    delList:[{id:file.id}],
                    backMethord:(data)=>{
                      if(data&&data.code=='00')
                      {
                        fileArr[i].splice(index,1);
                        dispatch({
                          type:'formStorage/fetch',
                          payload:{
                            myFileArr:fileArr
                          }
                        });
                      }
                      else Toast.fail(data&&data.message?data.message:'图片删除错误!',2);
                    }
                  }
                });
              }
            }}
            files={tempArr}
            maxImgCount={20}
            title={data.prodName}
            selectKey={i}
          />
        </div>
      )
      arr.push(temp)
    }
    return arr
  }
  render(){
    const { dispatch,onChangeMethord,form,formStorage, progressList} = this.props;
    let reqFiles = formStorage.changeList?formStorage.changeList:[];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:item.url? item.url : item.fileSvrPath ? Commons.ImageHostAddress+item.fileSvrPath :  Commons.ImageHostAddress+item.fileId});
    });
    let {formValue} = formStorage
    return (
      <div className={tradeInfo.redbox} id='redbox'>
        <div className={tradeInfo.box}>
          <Tabs swipeable={false} animated={false}>
            <TabPane tab="银行卡信息" key="1">
              <div>
                <WhiteSpace/>
                <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
              </div>
            </TabPane>
            <TabPane tab="附件信息" key="3">
              <PushFile
                from = {'change'}
                key={'PushFile1'}
                onChange={this.onChange}
                files={imageArr}
                maxImgCount={20}
                title={'申请共用附件'}
                selectKey={'select_modify_item1'}
              />
              {this.renderList()}
            </TabPane>
            <TabPane tab="审批进度" key="4">
              <ApprProgress progressList={progressList}/>
              <WhiteSpace/>
            </TabPane>
          </Tabs>
        </div>
        <div>
          <p className={tradeInfo.shBtn} style={{position:'absolute',zIndex:'99',cursor:'pointer'}} onClick={this.submit.bind(this)}>作废申请</p>
          <p className={tradeInfo.shBtn1} style={{position:'absolute',zIndex:'99',cursor:'pointer'}} onClick={this.commit}>提交修改</p>
        </div>
      </div>
    )
  }
}
