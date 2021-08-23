import React  from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import postpone from '../../styles/trade/postpone.less';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import PushFile from '../../components/share/PushFile';
import {Toast} from "antd-mobile/lib/index";
import Title from '../../components/product/Title';
import * as Commons from "../../utils/commonUtil";

const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class Rebutdelaymodify extends React.Component{
  constructor() {
    super();
  }

  componentDidMount()
  {
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

  //监听的返回数据
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
      let {remiPic, formValue} = formStorage;
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
                let arr = {fileName: resultFiles[0].fileName, fileId: resultFiles[0].fileId}
                reqPic.push(arr)
                dispatch({
                  type: 'formStorage/fetch',
                  payload: {
                    reqPic: remiPic
                  }
                });
              }
            } else Toast.fail(data && data.message ? data.message : '图片上传错误!', 3);
          }
        }
      })
    }catch (e) {

    }
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
    let {dispatch,form,formStorage, location,rebutSpace, } = this.props;
    let data = rebutSpace.model.tradeModel;
    const {formValue,remiPic} = formStorage
    console.log('formValue#######>>>>>',formValue)
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
          reqPic: formStorage.remiPic || [],
          // days: formValue.delay,
        }
        console.log('value是什么', value)
        dispatch({
          type:'trade/create',
          payload:{
            params:value,
            backMethod:(data)=>{
              if(data&&data.code==='00')
                dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'延期申请修改成功!',
                    backTitle: '返回驳回修改列表'
                  }}));
              else {
                Toast.fail(data&&data.message?data.message:'延期申请提交错误!',3);
              }
            }
          }
        });
      }
    })
  }

  getOption0() {
    const { formStorage } = this.props
    console.log('修改',this.props)
    const formValue = formStorage.formValue || {}
    return({
      space0:{valueType:'whiteSpace'},
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
        required: true,
        type: 'number',
        desc: '合同到期日',
        extra:  formValue.diedline || '',
        trigger: 'onBlur',
        placeholder: '--年--月--日',
        errMsg: '',
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption1() {
    let { dispatch,rebutSpace, } = this.props;
    console.log('%%%%%%%%&&&&',this.props)
    let tradInfo = rebutSpace.model.tradeModel;
    return({
      space0:{valueType:'whiteSpace'},
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: tradInfo.prodName,
        arrow: 'empty'
      },
      prodType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: tradInfo.prodExpiName,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption2() {
    let { dispatch,rebutSpace, } = this.props;
    let tradInfo = rebutSpace.model.tradeModel;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: tradInfo.custName,
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: tradInfo.certTypeName,
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: tradInfo.certNo,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption3() {
    let { dispatch,rebutSpace, } = this.props;
    let tradInfo = rebutSpace.model.tradeModel;
    return({
      seq: {
        valueType: 'selfSelect',
        desc: '合同编号',
        extra: tradInfo.contNo,
        arrow: 'empty'
      },
      deadline: {
        valueType: 'selfSelect',
        desc: '最新合同到期日',
        extra: tradInfo.newEndDate,
        arrow: 'empty'
      },
      type: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: tradInfo.tradCodeName,
        arrow: 'empty'
      },
    })
  }

  commit=()=>{
    this.props.dispatch(routerRedux.push({pathname:'/rebutdelaymodify',state:{}}))
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
      // console.log('sssssss',index);

      remiPic.splice(index,1);
      dispatch({
        type:'formStorage/fetch',
        payload:{
          remiPic:remiPic
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


  render() {
    let { dispatch,rebutSpace,location,formStorage,form } = this.props;
    let {rejectFlag,attachInfo} = location.state;
    console.log("formStorage-------",formStorage)

    let data = rebutSpace.model;
    let ffff = {}
    let reqFiles = formStorage.remiPic?formStorage.remiPic:[];
    let remiPic = [];
    reqFiles.map((item,index)=>{
      remiPic.push({url:Commons.ImageHostAddress+item.fileId});
    });
    console.log("reqFiles-------",reqFiles)



    const titleProps = {
      title: '延期申请',
      showBack: 'yes',
    };
    return (
      <div>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps} />
        </div>
        <div className={postpone.newBankIdBox}>
          <p className={postpone.pFull}></p>
          <div className={postpone.card}>
            <div className={postpone.head}>
              <p>驳回原因<span>{data.noPassReason}</span></p>
              <p>驳回人/驳回时间<span>{data.appTime}</span>/<span>{data.appUserName}</span></p>
            </div>
            <List>
              <Form dispatch={dispatch} options={this.getOption0()} form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <PushFile
                from = {'postpone'}
                key={'PushFile1'}
                onChange={this.onChange.bind(this)}
                files={remiPic}
                maxImgCount={10}
                title={'附件资料'}
              />
              <Form dispatch={dispatch} options={this.getOption1()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <Form dispatch={dispatch} options={this.getOption2()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <Form dispatch={dispatch} options={this.getOption3()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <WhiteSpace />
            </List>
          </div>
        </div>
        <div className={postpone.orderBtn} onClick={this.save}>
          <span>提交申请</span>
        </div>
      </div>

    );
  }
};
function onFieldsChange(props, changedFields)
{
  // let {dispatch, formStorage} = props;
  let { dispatch,rebutSpace,formStorage } = props;
  let tradInfo = rebutSpace.model.tradeModel;
  /*const { location } = props
  let data = location.state.dataSource*/
  let myObject = formStorage.formValue || {}
  if(changedFields.delay)
  {
    let temp = changedFields.delay;
    myObject.delay = temp.value
    dispatch({
      type:'trade/getDate',
      payload:{
        params: {endDate: tradInfo.endDate, days: myObject.delay},
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
function connectProps({trade,rebutSpace,formStorage}) {
  return {trade,rebutSpace,formStorage}
}

export default connect(connectProps)(createForm({onFieldsChange:onFieldsChange})(Rebutdelaymodify));
