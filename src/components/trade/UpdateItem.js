import React  from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import newUserStyles from '../../styles/customer/bankCard.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import PushFile from '../../components/share/PushFile';
import {Toast} from "antd-mobile/lib/index";
import * as Commons from "../../utils/commonUtil";
import {initUploadFileParams} from "../../utils/commonMethods";

const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class UpdateItem extends React.Component{
  constructor(props) {
    super(props);
    this.state={
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
    console.log(e,'文件数据=====')
    if(!e.data ||!e.origin) return;
    // try{
      let blobs,content,content1,receiveData=JSON.parse(e.data);
      if(receiveData.resposeResult.code != '00'){
        Toast.fail(receiveData.resposeResult.data&&receiveData.resposeResult.data.message?receiveData.resposeResult.data.message:'图片上传错误!',3)
        return;
      }
      let {dispatch,formStorage,customer} = this.props;
      let {postponePic, formValue} = formStorage;
      let resultFiles = receiveData.resposeResult.model;
      if(resultFiles.length>0)
      {
        let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
        postponePic.push(arr)
        dispatch({
          type:'formStorage/fetch',
          payload:{
            reqPic:postponePic
          }
        });
      }
    // }catch (e) {
    //
    // }

  }


  onChangeMethord(item,value,name)
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'bankFormValue',
        newValue:payload
      }
    });
    dispatch(routerRedux.goBack());
  }

  save=()=>{
    let {dispatch,form,formStorage, location} = this.props;
    let data = location.state.dataSource
    let {formValue,postponePic} = formStorage
    console.log('formValue#######>>>>>',formValue)
    console.log('postponePic#######>>>>>', formStorage.postponePic)
    form.validateFields((error,value)=>{
      //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
      if(!error)
      {
        let value = {
          reqSeq: data.reqSeq,
          orderContNo: data.orderContNo,
          tradAcct: data.tradAcct,
          prodId: data.prodId,
          remark: data.remark || '',
          endDate: data.endDate,
          remitDate: formValue.remitDate,
          version: data.version,
          custId: data.custId,
          certNo: data.certNo,
          reqAmt: data.reqAmt,//币种
          currType: data.currType,//交易金额
          postponeCount: formValue.delay,
          reqPic: formStorage.postponePic || [],
          // days: formValue.delay,reqAmt
        }
        console.log('value是什么=============================================',value)

        // return
        dispatch({
          type:'trade/create',
          payload:{
            params:value,
            backMethod:(data)=>{
              console.log("00000000000000",data)
              if(data&&data.code==='00')
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'延期申请成功!',
                    backTitle: '返回延期申请列表'
                  }}));
              else {
                Toast.fail(data&&data.message?data.message:'延期申请提交错误!',3);
              }
            }
          },
        });
        console.log("地------",dispatch)
      }
    })
  }

  getOption0() {
    const { formStorage } = this.props
    const formValue = formStorage.formValue || {}
    return({
      remitDate:{
        valueType:'date',
        title:'申请日期',
        desc:'申请日期',
        mode:'date',
        extra:'请选择申请日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      delay: {
        required: true,
        type: 'number',
        desc: '延期天数',
        trigger: 'onBlur',
        placeholder: '请输入延期天数',
        errMsg: '银行卡号号码非法!',
      },
      diedline: {
       valueType: 'selfSelect',
       desc: '合同到期日',
       extra: formValue.diedline || '',
       arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption1() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      space0:{valueType:'whiteSpace'},
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: data.prodName,
        arrow: 'empty'
      },
      prodType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: data.prodExpiName,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption2() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: data.custName,
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: data.certTypeName,
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: data.certNo,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption3() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      seq: {
        valueType: 'selfSelect',
        desc: '合同编号',
        extra: data.contNo,
        arrow: 'empty'
      },
      applydate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: data.comtDate ,
        arrow: 'empty'
      },
      deadline: {
        valueType: 'selfSelect',
        desc: '到期日',
        extra: data.endDate ,
        arrow: 'empty'
      },
      type: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: data.tradCodeName,
        arrow: 'empty'
      },
      num: {
        valueType: 'selfSelect',
        desc: '交易金额',
        extra: data.reqAmt !== undefined ? parseFloat(data.reqAmt / 10000).toFixed(2) : '--',
        arrow: 'empty'
      }
    })
  }

  onChange=(files, type, index)=>{
    let {dispatch,formStorage } = this.props;
    let {postponePic} = formStorage;
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
                postponePic.push(arr)
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    postponePic:postponePic
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
      postponePic.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          postponePic:postponePic
        }
      });
    }
  }

  render() {
    let {dispatch,form,formStorage} = this.props;
    let {fileUploadParams} = this.state;
    let ffff = {}
    let reqFiles = formStorage.postponePic?formStorage.postponePic:[];
    let postponePic = [];
    reqFiles.map((item,index)=>{
      postponePic.push({url:Commons.ImageHostAddress+item.fileId});
    });

    return (
      <div className={newUserStyles.newBankIdBox} style={{marginBottom: '100px'}}>
        <p className={newUserStyles.pFull}></p>
        <div className={newUserStyles.card}><List>
            <Form dispatch={dispatch} options={this.getOption0()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
            <PushFile
                fileUploadParams={fileUploadParams}
              from = {'postpone'}
              key={'PushFile1'}
              onChange={this.onChange}
              files={postponePic}
              maxImgCount={10}
              title={'附件资料'}
            />
            <Form dispatch={dispatch} options={this.getOption1()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
            <Form dispatch={dispatch} options={this.getOption2()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
            <Form dispatch={dispatch} options={this.getOption3()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
          </List>
        </div>
        <div className={proDetailStyles.orderBtn} onClick={this.save}>
          <span>提交申请</span>
        </div>
      </div>
    );
  }
};
function onFieldsChange(props, changedFields)
{
  let {dispatch, formStorage} = props;
  const { location } = props
  let data = location.state.dataSource
  let myObject = formStorage.formValue || {}
  if(changedFields.delay)
  {
    let temp = changedFields.delay;
    myObject.delay = temp.value
    dispatch({
      type:'trade/getDate',
      payload:{
        params: {endDate: data.endDate, days: myObject.delay},
        backMethod:(data)=>{
          myObject.diedline = data
          dispatch({
            type:'formStorage/fetch',
            payload:{
              formValue:myObject
            }
          });
        }
      }
    });

  }
}
function connectProps({trade,formStorage}) {
  return {trade,formStorage}
}

export default connect(connectProps)(createForm({onFieldsChange:onFieldsChange})(UpdateItem));
