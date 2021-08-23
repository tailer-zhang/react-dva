//缴费记录 赵博文

import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { List,InputItem,TextareaItem,DatePicker,WhiteSpace,Toast } from 'antd-mobile';
import Titles from '../../components/product/Titles';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import styles from '../../styles/trade/tradePayRecord.less';
import Form from '../../utils/form';
import Dic from '../../utils/dictionary';
import * as Commons from '../../utils/commonUtil';
// import PushImg from '../../components/share/PushImg';
// import PushFile from '../../components/share/PushFile';
import DataImg from '../../components/share/DataImg';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2118-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1990-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;
class TradePayRecord extends React.Component{
  constructor(props) {
    super(props);
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
        tradePayPic:[]
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
      let {tradePayPic} = formStorage
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
                let arr = {srcFileName: resultFiles[0].fileName, fileSvrPath: resultFiles[0].fileId}
                tradePayPic.push(arr)
                dispatch({
                  type: 'formStorage/fetch',
                  payload: {
                    tradePayPic: tradePayPic
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
  onChange(files, type, index)
  {
    console.log('files',files,type,index);
    let {dispatch,formStorage,customer} = this.props;
    let {tradePayPic,recordFormValue} = formStorage;
    const temArr = tradePayPic
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
              var arrTem=[]
              let arrTe = {srcFileName: resultFiles[0].fileName, fileSvrPath: resultFiles[0].fileId}
              arrTem.push(arrTe)
              if(files.length>0)
              {
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    tradePayPic:formStorage.tradePayPic?formStorage.tradePayPic.concat(arrTem):arrTem
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
    let    tradePayPic = formStorage.recordFormValue.fileList
    console.log('tradePayPic3',tradePayPic)
    let file = tradePayPic[index];
    console.log('file',file)
    dispatch({
      type:'trade/delTradeInsuFiles',
      payload:{
        delList:[{id:file.id}],
        backMethord:(data)=>{
          if(data&&data.code=='00')
          {
            tradePayPic.splice(index,1);
            dispatch({
              type:'formStorage/fetch',
              payload:{
                tradePayPic:tradePayPic
              }
            });
          }
          else Toast.fail(data&&data.message?data.message:'图片删除错误!',2);
        }
      }
    });
  }
  }
  onChangeMethord(item,value,name)
  {
    let {dispatch,form,formStorage} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        newValue:payload,
        key:'recordFormValue'
      }
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord(payload)
  {
    let {dispatch,form,formStorage} = this.props;
    let { getFieldProps,getFieldError} = form;
    dispatch({
      type:'formStorage/fetch',
      payload:{
        recordFormValue:{...formStorage.recordFormValue,...payload}
      }
    });
  }

  getOptions() {
    return({
      payAmt: {
        required:true,
        type: 'text',
        desc:'缴费金额',
        validatorType:'float',
        errMsg:'缴费金额必须为数字!',
      },
      payCurType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('payCurType'),
        title:'缴费币种',
        desc:'缴费币种'
      },
      payDate: {
        valueType:'date',
        desc:'打款日期',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        minDate:minDate,
        maxDate:maxDate,
      },
      remark: {
        required:false,
        type: 'text',
        desc:'备注'
      }
    })
  }
  /**
   * 删除缴费记录
   * @param        {[type]} e [description]
   * @return,@back {[type]}   [description]
   * @author
   * @version
   */
  deleteRecord(e)
  {
    // e.preventDefault();
    let {dispatch,form,formStorage,location} = this.props;
    let {index,recordDetail} = location.state;
    let {list,paymentIdlist} = formStorage;
    /**
     * 如果是已经存在的record，添加到paymentIdlist
     */
    if(recordDetail.id)
    {
      if(paymentIdlist==undefined)
        paymentIdlist = [];
      paymentIdlist.push({paymentId:recordDetail.id});
    }
    list.splice(index,1);
    dispatch({
      type:'formStorage/fetch',
      payload:{
        list:list,
        paymentIdlist:paymentIdlist
      }
    });
    dispatch(routerRedux.goBack());
  }

  render() {
    let {dispatch,form,location,tradeSafe,formStorage} = this.props;
    let {index,mode} = location.state;
    let {formValue} = formStorage;
    console.log('formStorage',formStorage)
    // let formValue1 = formStorage.formValue;
    // console.log('index',index);
    // if(formValue1==undefined) formValue1 = {};
    // let formValue = formValue1.list[index];
    // let {mode} = location.state;
    let { getFieldProps,getFieldError} = form;
    let titleProps = {title: '查看缴费记录'}; //formStorage.recordFormValue.fileList
    let {recordFormValue ,tradePayPic} = formStorage;
    formStorage.tradePayPic = formStorage.tradePayPic||[];
    let reqFiles = formStorage.tradePayPic.length>0?formStorage.tradePayPic:formStorage.recordFormValue.fileList;
    reqFiles = reqFiles || [];
    // let tradePayPic = [];
    reqFiles.map((item,index)=>{
      tradePayPic.push({url:Commons.ImageHostAddress+item.fileSvrPath});
    });
    console.log('-------tradePayPic',tradePayPic);

    // let formValue1 = formStorage.formValue;
    // console.log('formValue1',formValue1);
    // if(formValue1==undefined) formValue1 = {};
    // let formValue = formValue1.list[index];
    // // let newFormValue = formValue.list[index];
    return (
      <div style={{position: 'relative'}}>
        <Titles {...titleProps}>
        </Titles>
        <div>
          <List>
            <Form options={this.getOptions()} dispatch={dispatch} formValue={recordFormValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)} saveFormMethord={this.saveFormMethord.bind(this)}/>
            {/*<PushFile
              from={'tradePayPic'}
              key={'PushFile'}
              onChange={this.onChange.bind(this)}
              files={tradePayPic}
              maxImgCount={10}
              title={'缴费记录资料'}
            />*/}
            <DataImg dataSource={tradePayPic}/>
          </List>
        </div>
        <WhiteSpace style={{backgroundColor: '#efeff4',height: '0.693rem'}}/>
        {mode?<p className={styles.record} onClick={this.deleteRecord.bind(this)}>删除缴费记录</p>:<div />}
      </div>
    )
  }
}

function connectPayRecord({trade,tradeSafe,formStorage}) {
  return {trade,tradeSafe,formStorage}
}

export default connect(connectPayRecord)(createForm()(TradePayRecord));
