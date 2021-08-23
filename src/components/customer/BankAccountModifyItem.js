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
export default class AccountChangeItem extends React.Component{
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
      let {dispatch, formStorage} = this.props;
      let {changeList} = formStorage;
      if (blobs.size > 5000000) {//5M 5000000
        Toast.fail('文件大小超出限制', 3);
        return;
      }

      if(global.selectKey==='select_modify_item'){
        dispatch({
          type:'trade/uploadTradeCommonFiles',
          payload:{
            params:{},
            images:[{file: blobs}],
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

      }else if (!isNaN(global.selectKey)) {
        const { fileList} = this.props;
        let {dispatch,formStorage} = this.props;
        let {myFileArr} = formStorage;
        let fileArr = myFileArr || []
        fileArr[global.selectKey] = fileArr[global.selectKey] || []
        dispatch({
          type:'trade/uploadTradeCommonFiles',
          payload:{
            params:{},
            images:[{file: blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model;
                if(resultFiles.length>0)
                {
                  let temp = {
                    fileName: resultFiles[0].fileName,
                    id: fileList[global.selectKey].id,
                    fileId: resultFiles[0].fileId,
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

  submit=()=>{
    let {dispatch,formStorage,location} = this.props;
    let {myFileArr, formValue, changeList} = formStorage
    if(formValue.bankName == undefined){
      Toast.fail('请填写新开户行',2);
      return
    }
    let custParams = {}
    let myLength = myFileArr&&myFileArr.length ? myFileArr.length : 0
     for(let i = 0 ; i < myLength; i++){
       if(myFileArr[i]&&myFileArr[i][0]&&myFileArr[i][0].id){
         custParams['list' + myFileArr[i][0].id] = myFileArr[i]
       }
     }
        let saveValue = {
          bankName: formValue.bankName,
          list: changeList || [],
          id:location.state.data.id,
          custName: location.state.data.acctName,
          cardNo:location.state.data.cardNo,
          certNo: location.state.data.certNo,
          certType: location.state.data.certType,
          ...custParams
        };
        dispatch({
          type:'bank/changeUpdate',
          payload:{
            params:saveValue,
            backMethod:(data)=>{
              if(data&&data.code=='00'){
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'开户行变更成功!',
                    backTitle:'返回银行账户列表',
                  }}));
              }else {
                Toast.fail(data&&data.message?data.message:'开户行变更错误!',2);
              }
            }
          }
        });
  }
  getOption0() {
    let {details} = this.props;
    console.log("详情页的内容"+JSON.stringify(details));
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: details.acctName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra:  details.certTypeName + '|' + details.certNo,
        arrow: 'empty'
      }
    })
  }
  getOption1() {
    let {details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '户名',
        changeType: 'modify',
        extra: details.acctName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '开户证件',
        changeType: 'modify',
        extra: details.certTypeName + '|' + details.certNo,
        arrow: 'empty'
      },
      accountType1: {
        valueType: 'selfSelect',
        desc: '原开户行',
        changeType: 'modify',
        extra: details.bankName,
        arrow: 'empty'
      },
      bankName: {
        required:true,
        type: 'text',
        changeType: 'modify',
        desc:'新开户行',
        placeholder: '请输入'
      },
      bankNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        changeType: 'modify',
        extra: details.cardNo,
        arrow: 'empty'
      },
    })
  }

  onChange=(files, type, index)=> {
    let {dispatch,formStorage,customer} = this.props;
    let {changeList} = formStorage;
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

  renderList(){
    const { fileList} = this.props;
    let arr = []
    let {dispatch,formStorage} = this.props;
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
                          let temp = {
                              fileName: resultFiles[0].fileName,
                              id: fileList[i].id,
                              fileId: resultFiles[0].fileId,
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
                fileArr[i].splice(index,1);
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    myFileArr:fileArr
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
    const { dispatch,onChangeMethord,form,formStorage} = this.props;
    let reqFiles = formStorage.changeList?formStorage.changeList:[];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:Commons.ImageHostAddress+item.fileId});
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
                selectKey={'select_modify_item'}
              />
              {this.renderList()}
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
