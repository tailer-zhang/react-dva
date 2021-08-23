//交易 驳回修改 撤单驳回修改
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import Title from '../../components/product/Title';
import {Link,routerRedux} from 'dva/router';
import { List,WhiteSpace,Tabs,InputItem,Toast } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import PushFile from '../../components/share/PushFile';
import * as  Commons from '../../utils/commonUtil';
import Dic from '../../utils/dictionary';

import redeemStyles from '../../styles/trade/redeem.less';
import rebutStyles from '../../styles/trade/rebut.less';


const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


const RejectCom = ({data,rejectFlag})=>{
  return(
  <div className={rebutStyles.rebutCause}>
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

class RecallChange extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isFixed: false
    }
  }

  componentDidMount() {
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
      let {remiPic} = formStorage
      if (blobs.size > 5000000) {//5M 5000000
        Toast.fail('文件大小超出限制', 3);
        return;
      }
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
                remiPic.push(arr)
                dispatch({
                  type: 'formStorage/fetch',
                  payload: {
                    remiPic: remiPic
                  }
                });
              }
            } else Toast.fail(data && data.message ? data.message : '图片上传错误!', 3);
          }
        }
      });
  }catch (e) {

    }
  }


  onFocus(){
    this.setState({isFixed:true})
  }
  onBlur(){
    this.setState({isFixed:false})
  }
  onChangeMethord(item,value,name)
  {
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

  sureSubmit(e)
  {
    // e.preventDefault();
    let { dispatch,formStorage,form} = this.props;
    let { formValue } = formStorage;
    if(!formStorage.remiPic||formStorage.remiPic.length<=0)
    {
      Toast.fail('撤单申请资料不能为空!',2);
      return;
    }
    form.validateFields((error,value)=>{
      if(!error)
      {
         let saveValue = {
          ...value,
          id:formValue.id,
          reqSeq:formValue.reqSeq,
          origReqSeq:formValue.origReqSeq,
          custId:formValue.custId,
          custType:formValue.currType,
          remiPic:formStorage.remiPic,
          version:formValue.version,
          custShrId:formValue.custShrId,
         };
         Toast.loading('撤单申请资料提交中...',60,undefined,true);
         console.log("卡卡卡",saveValue);
         dispatch({
            type:'rebutSpace/fetchRecRebutUp',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code=='00')
                {
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'撤单驳回修改提交成功!',
                    backTitle:'返回驳回修改列表',
                    backMethord:()=>{
                      dispatch(routerRedux.push({pathname:'/tradeRebut'}))
                    }
                  }}));
                }else if(data&&data.message){
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
      else  {
        if(!value.refundType) Toast.fail('请选择退款原因',3);
        if(!value.remark) Toast.fail('撤单申请原因不能为空',3);
      }
    })
  }

  onChange(files, type, index)
  {
    console.log('files',files,type,index);
    let {dispatch,formStorage,customer} = this.props;
    let {remiPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
     console.log('image',image);
     if(image.file.size > 5000000){//5M 5000000
       Toast.fail('文件大小超出限制',2);
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
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      remiPic:formStorage.remiPic?formStorage.remiPic.concat(resultFiles):resultFiles
                    }
                  });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
          }
        }
     });

    }
    else if(type=='remove')//表示移除图片
    {
      let remipicRe =[];
      let remipicFilter = remiPic.filter((item)=>{
        return /\.pdf/.test(item.fileId)
      })
      remipicRe = remipicFilter.length>0?remipicFilter:remiPic;
      // console.log(' 组合==》',remipicRe)
      // remiPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            remiPic:remipicRe
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
      //        if(data&&data.code=='0'&&data.object)
      //        {
      //          let resultFiles = data.object.files;
      //          if(files.length>0)
      //          {
      //            dispatch({
      //                type:'formStorage/fetch',
      //                payload:{
      //                  remiPic:formStorage.remiPic?formStorage.remiPic.concat(resultFiles):resultFiles
      //                }
      //              });
      //          }
      //        }
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
      //      }
      //    }
      // });
    }
  }

  getOptions0()
  {
    return({
      space0:{valueType:'whiteSpace'},
      remark:{
        required:false,
        type:'text',
        numberOfLines:5,
        title:'撤单原因',
        placeholder:'请输入撤单原因',
      },
    });
  }

  getOptions1()
  {
    return ({
        refundType: {
          required: true,
          desc: '退款原因',
          valueType: 'select',
          errMsg:'请选择退款原因!',
          type: Dic.fetchDicList('drawback')
        },
        space1:{valueType:'whiteSpace'},
      }
    )
  }

  render(){
    const { getFieldProps } = this.props.form;
    let {dispatch,location,formStorage,form,customer} = this.props;
    let { formValue } = formStorage;
    console.log('一ioooo',formValue);
    let {data,rowData} = location.state;
    let isFixed = this.state.isFixed;
    const titleProps = {
      title:'撤单驳回修改',
    };

    let reqFiles = formStorage.remiPic?formStorage.remiPic:[];
    let remiPic = [];
    reqFiles.map((item,index)=>{
      remiPic.push({...item,url:Commons.ImageHostAddress+item.fileId});
    });

    return (
      <div className={rebutStyles.buyChange}>
       <Title {...titleProps}/>
       <div className={redeemStyles.box}>
        <RejectCom data={data} />
           <Form options={this.getOptions0()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
             <WhiteSpace/>
          <Form options={this.getOptions1()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
             <PushFile
                       from={'recall'}
                       key={'PushFile'}
                       onChange={this.onChange.bind(this)}
                       files={remiPic}
                       maxImgCount={1}
                       title={'撤单申请资料'}
                     />
             <WhiteSpace/>
        </div>
        <p className={redeemStyles.shBtn} style={{height:'1.2rem',textAlign:'center',backgroundColor:'#f22f33',lineHeight:'1.2rem',color:'#ffffff',position:'fixed'}} onClick={this.sureSubmit.bind(this)}>提交</p>
      </div>
    );
  }
};
function connectTradeFun({rebutSpace,formStorage,customer}){
  return {rebutSpace,formStorage,customer}
}
export default connect(connectTradeFun)(createForm()(RecallChange));
