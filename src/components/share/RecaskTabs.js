import React from 'react';
import { WhiteSpace,Toast,Modal} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import * as  Commons from '../../utils/commonUtil';
import tradeInfo from '../../styles/trade/redeem.less';
import {initUploadFileParams} from "../../utils/commonMethods";

export default class RecaskTabs extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isFixed: false,
      modal:false,
      confirmRevoke:false,
      orginalList:[],
      fileUploadParams:{}
    }
  }
  tabClick(key)
  {
    let {setpNum} = this.state;

    if(key>setpNum)
      return;
    this.setState({
      deActiveKey:key
    });
  }

  onFocus(){
    this.setState({
      isFixed:true
    });
  }

  onBlur(){
    this.setState({
      isFixed:false
    })
  }

  getOptions0()
  {
    return ({
      space0:{valueType:'whiteSpace'},
      remark:{
        required:true,
        type:'text',
        title:'撤单原因',
        desc:'',
        placeholder:'撤单原因',
        numberOfLines:6,
      },
      space1:{valueType:'whiteSpace'},
    });
  }

  getOptions1()
  {
    return ({
        refundType: {
          required: true,
          desc: '退款原因',
          valueType: 'select',
          errMsg:'备注说明!',
          type: Dic.fetchDicList('drawback')
        },
        space1:{valueType:'whiteSpace'},
      }
    )
  }
  getOptions(index)
  {
    return ({
        [`refundType0${index}`]: {
          required: true,
          desc: '退款原因',
          valueType: 'select',
          errMsg:'备注说明!',
          type: Dic.fetchDicList('drawback')
        },
        space1:{valueType:'whiteSpace'},
      }
    )
  }

  componentDidMount() {
    this.setState({
      fileUploadParams: initUploadFileParams('product')
    })
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);

    //查询原交易单
    console.log('preo====',this.props);
    this.getOriRecallList()
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

  onMessage=(e)=> {
    if(!e.data ||!e.origin) return;
    try {
      let blobs,content,content1,receiveData=JSON.parse(e.data);
      if(receiveData.resposeResult.code != '00'){
        Toast.fail(receiveData.resposeResult.data&&receiveData.resposeResult.data.message?receiveData.resposeResult.data.message:'图片上传错误!',3)
        return;
      }
      // if(receiveData&&receiveData.natvieBase){
      //   //android native imge infor
      //   content = 'data:image/png;base64,'+receiveData.natvieBase;
      //   blobs = this.dataURLtoFile(content, new Date().getTime()+ '.png')
      // }else{
      //   content1 = receiveData;
      //   if(typeof content1 !='string') return;
      //   content = content1.replace(/\//g,"").replace(/\+/g,"").replace(/\,/g,"").replace(/\;/g,"").replace(/\:/g,"").replace(/\=/g,"");
      //   blobs = this.dataURLtoFile(content1, content.substring(content.length - 20, content.length) + '.png')
      // }
      // if(!blobs) return;
      let {dispatch, formStorage, customer} = this.props;
      let {reqPic} = formStorage;
      let resultFiles = receiveData.resposeResult.model;
      if (resultFiles.length > 0) {
        console.log()
        let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
        reqPic.push(arr)
        dispatch({
          type: 'formStorage/fetch',
          payload: {
            reqPic: reqPic
          }
        });
      }

    }catch (e) {

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
     // console.log('image',image);
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
    }
  }
  preSubmit(){
    if(this.state.confirmRevoke || this.state.orginalList.length==0){
      this.totalSubmit();//提交
      return;
    }
    const { dispatch,formStorage,tradeData,form} = this.props;
    if((!formStorage.reqPic||formStorage.reqPic.length<=0)&&tradeData.signType=='01')
    {
      Toast.fail('撤单申请资料不能为空!',1);
      return;
    }
    form.validateFields((error,value)=>{
      // console.log('field----',value,error)
      if(!error){
        if(!this.state.confirmRevoke){
          this.setState({
            modal:true
          })
        }
      }else{
        //校验
        if(!value.remark){
          Toast.fail('撤单申请原因不能为空',3);
          return;
        }
        if(!value.refundType){
          Toast.fail('请选择退款原因',3);
          return;
        }
      }
    })
  }
  closeModal=()=>{
    this.setState({
      modal:false
    })
  }
  confirmRevoke = ()=>{
    this.setState({
      modal:false,
      confirmRevoke:true
    })
  }
  getOriRecallList(){
    const { dispatch,formStorage,tradeData,form} = this.props;
    dispatch({
      type:'tradeForm/getOriRecallList',
      payload:{
        params:{
          orderContNo:tradeData.orderContNo,
          reqSeq:tradeData.reqSeq
        },
        backMethod:(data)=>{
          // if(data&&data.code=='00'){
          this.setState({
            orginalList:data.list?data.list:[]
          })
          // }
        }
      }
    })
  }
  totalSubmit(){
    const { dispatch,formStorage,tradeData,form} = this.props;
    let recallList = '';
    if((!formStorage.reqPic||formStorage.reqPic.length<=0)&&tradeData.signType=='01')
    {
      Toast.fail('撤单申请资料不能为空!',1);
      return;
    }
    form.validateFields((error,value)=>{
      if(!error)
      {
        if(this.state.orginalList.length>0){
          recallList = this.state.orginalList.map((item,index)=>{
            return {
              id:item.id,
              reqSeq:item.reqSeq,
              refundType:value['refundType0'+index]
            }
          })
        }
        let saveValue = {
          ...value,
          id:tradeData.id,
          remiPic:formStorage.reqPic[0],
          recallList:recallList
        };
        Toast.loading('撤单申请资料提交中...',60,undefined,true);
        dispatch({
          type:'tradeForm/fetchRecAsk',
          payload:{
            params:saveValue,
            backMethord:(data)=>{
              Toast.hide();
              if(data&&data.code=='00')
              {
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'撤单申请提交成功!',
                    backTitle:'返回撤单列表',
                    backMethord:()=>{
                      dispatch(routerRedux.push({pathname:'/recallList'}))
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
      else {
        //校验
        if(!value.remark) {
          Toast.fail('撤单申请原因不能为空',3);
          setTimeout(()=>{
            Toast.hide();
          },3000)
          return;
        }
        if(!value.refundType){
          Toast.fail('请选择退款原因',3);
          setTimeout(()=>{
            Toast.hide();
          },3000)
          return;
        }

        Toast.fail('请选择退款原因',3);
        setTimeout(()=>{
          Toast.hide();
        },3000)
      }
    });
  }

  render() {
    const { dispatch,formStorage,tradeData,onChangeMethord,form} = this.props;
    let {formValue} = formStorage;
    let {fileUploadParams} = this.state;
    // console.log('mmmmmm',tradeData);
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
        <div className={tradeInfo.box}>
          <Form options={this.getOptions0()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
        <Form options={this.getOptions1()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
          <PushFile
              fileUploadParams={fileUploadParams}
            key={'PushFile1'}
            onChange={this.onChange1.bind(this)}
            files={reqPic}
            maxImgCount={1}
            from={'recall'}
            title={'撤单申请资料'}
          />
          <WhiteSpace/>
          {
            this.state.orginalList.length>0&&this.state.confirmRevoke?
              <div className={tradeInfo.originalOrder}>
                { this.state.orginalList.map((item,index)=>{
                  return (
                    <section key={item.id}>
                      <div className={tradeInfo.originalWrapper}>
                      <div className={tradeInfo.leftItem}>交易单号：
                        <div>{item.reqSeq}</div>
                      </div>
                      <div className={tradeInfo.rightItem}>申请金额：
                        <div>{item.reqAmt}元</div>
                      </div>
                      </div>
                      <Form options={this.getOptions(index)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                    </section>
                  )
                })
                }
              </div>
              :''
          }
        </div>
        <p style={{width:'100%'}} className={tradeInfo.shBtn} onClick={this.preSubmit.bind(this)}
        >提交</p>
        <Modal
          title="追加交易撤单提示"
          transparent
          maskClosable={false}
          visible={this.state.modal}
          style={{width:'80%'}}
          footer={[
            { text: '放弃', onPress: () =>{this.closeModal()}},
            { text: '原交易撤单确认', onPress: () => {this.confirmRevoke()}}
            ]}
          platform="ios"
        >
          此笔追加交易撤单，必须将原交易一并撤单，请确认
        </Modal>
      </div>
    )
  }
}
