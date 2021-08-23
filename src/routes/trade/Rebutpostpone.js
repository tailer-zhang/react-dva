import React  from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { List, Tabs, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import DataImg from '../../components/share/DataImg';
import {Toast} from "antd-mobile/lib/index";
import Title from '../../components/product/Title';
import * as Commons from "../../utils/commonUtil";
import redeemStyles from '../../styles/trade/rebut.less';
import postpone from '../../styles/trade/postpone.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


import moment from 'moment';
import 'moment/locale/zh-cn';
import CancelBtn2 from '../../components/share/CancelBtn2';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

class Rebutpostpone extends React.Component{
  constructor(props) {
    super(props);
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

  }

  getOption0() {
    let { dispatch,location } = this.props;
    let tradInfo = location.state.tradeDetail;
    console.log('location.statelocation.state=====',location.state)
    console.log('tradInfo======',tradInfo)
    return({
      space0:{valueType:'whiteSpace'},
      applydate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: tradInfo.remitDate ? tradInfo.remitDate : '--',
        arrow: 'empty'
      },
      delay: {
        valueType: 'selfSelect',
        desc: '延期天数',
        extra: tradInfo.postponeCount || '--',
        arrow: 'empty'
      },
      diedline: {
        valueType: 'selfSelect',
        desc: '合同到期日',
        extra: tradInfo.newEndDate || '--',
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption1() {
    let { dispatch, location} = this.props;
    let tradInfo = location.state.tradeDetail;
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
        extra: tradInfo.prodExpiName ? tradInfo.prodExpiName : '--',
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption2() {
    let { dispatch, location} = this.props;
    let tradInfo = location.state.tradeDetail;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: tradInfo.custName ? tradInfo.custName : '--',
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: tradInfo.certTypeName ? tradInfo.certTypeName : '--',
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: tradInfo.certNo ? tradInfo.certNo : '--',
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  getOption3() {
    let { dispatch, location} = this.props;
    let tradInfo = location.state.tradeDetail;
    return({
      seq: {
        valueType: 'selfSelect',
        desc: '合同编号',
        extra: tradInfo.contNo ? tradInfo.contNo : '--',
        arrow: 'empty'
      },
      deadline: {
        valueType: 'selfSelect',
        desc: '最新合同到期日',
        extra: tradInfo.newEndDate ? tradInfo.newEndDate : '--',
        arrow: 'empty'
      },
      type: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: tradInfo.tradCodeName ? tradInfo.tradCodeName : '--' ,
        arrow: 'empty'
      }
    })
  }

  onChange=(files, type, index)=>{
    console.log("============",files, type, index)
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

  //作废
  submit=()=>{
    let {dispatch,location,} = this.props
    let data = this.props.location.state
    console.log('zoulema   zuofei de ',data)
    dispatch({
      type:'rebutSpace/fetchTradeCancel',
      payload:{reqId:data.tradeDetail.id,mgrCode:data.tradeDetail.mgrCode,
        backMethord:(data)=>{
          if(data&&data.code === '00'){
            Toast.success('作废成功！')
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
    let { rebutSpace } = this.props;
    let data = rebutSpace.model;
    console.log("ywywyy======================",data)
    this.props.dispatch(routerRedux.push({pathname:'/rebutdelaymodify',state:{
        data:data,
        rowData:data.tradeModel,
        mode:'edit'
      }}))
  }

  render() {
    let { dispatch,rebutSpace,location,formStorage,form } = this.props;
    let {rejectFlag} = location.state;
    let data = rebutSpace.model;
    console.log('data-----------威威--->',this.props)
    let tradeData = location.state.tradeDetail;
    let attachInfo = data.attachList;
    console.log('data-----------attachInfo--->',attachInfo)
    let ffff = {}
    let reqFiles = formStorage.postponePic?formStorage.postponePic:[];
    let postponePic = [];
    reqFiles.map((item,index)=>{
      postponePic.push({url:Commons.ImageHostAddress+item.fileId});
    });
    const titleProps = {
      title: '延期申请详情',
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
            {rejectFlag=='0'?( <div className={postpone.head}>
              <p>驳回原因<span>{data.noPassReason}</span></p>
              <p>驳回人/驳回时间<span>{data.appTime}</span>/<span>{data.appUserName}</span></p>
            </div>):<div />}

            <List>
              <Form dispatch={dispatch} options={this.getOption0()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
             <div>
              <DataImg dataSource={attachInfo}/>
             </div>
              <Form dispatch={dispatch} options={this.getOption1()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <Form dispatch={dispatch} options={this.getOption2()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <Form dispatch={dispatch} options={this.getOption3()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
              <WhiteSpace />
            </List>
          </div>
        </div>
        {rejectFlag=='0'?( <div>
          <p className={postpone.shBtn} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.submit}>作废</p>
          <p className={postpone.shBtn1} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.commit}>修改</p>
        </div>):<div />}
      </div>

    );
  }
};
function onFieldsChange(props, changedFields)
{
  let {dispatch, formStorage} = props;
  let myObject = formStorage.bankFormValue || {}
  if(changedFields.bankName)
  {
    let bankName = changedFields.bankName;
    myObject.bankName = bankName.value
    dispatch({
      type:'formStorage/fetch',
      payload:{
        bankFormValue:myObject
      }
    });
  }
  if(changedFields.cardNo)
  {
    let cardNo = changedFields.cardNo;
    myObject.cardNo = cardNo.value
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        bankFormValue:myObject
      },
    });
  }
}
function connectRebutFunc({rebutSpace,formStorage,trade}) {
  return {rebutSpace,formStorage,trade}
}
export default connect(connectRebutFunc)(createForm({onFieldsChange:onFieldsChange})(Rebutpostpone));
