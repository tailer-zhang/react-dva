//交易 驳回修改 赎回驳回详情
import React,{ Component,PropTypes } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import {WhiteSpace,List,Tabs,TextareaItem,DatePicker,Toast} from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import CancelBtn2 from '../../components/share/CancelBtn2';
import Dic from '../../utils/dictionary';

import rebutStyles from '../../styles/trade/redeem.less';
import redeemStyles from '../../styles/trade/rebut.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


import moment from 'moment';
import 'moment/locale/zh-cn';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

const RejectCom = ({data,rejectFlag})=>{
  // console.log('=====00000',rejectFlag);
  return(
    rejectFlag=='1'?<div></div>:<div className={redeemStyles.rebutCause}>
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

class RebutRedeem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
  let { dispatch,rebutSpace,location,formStorage,form } = this.props;
  let {rejectFlag} = location.state;
  let data = rebutSpace.model;
  let attachInfo = data.attachList;
  let tradInfo = rebutSpace.model.tradeModel;
  let tradeData = location.state.tradeDetail;
  if(tradInfo==undefined) tradInfo={};
  const titleProps = {
    title:rejectFlag=='0'?'赎回驳回详情':'赎回详情',
  };
  const pushTitle= {
    fileTitle:'赎回申请单'
  }
  const cancleTitle = {
    btnType:'作废',
  };
  return (
    <div className={rebutStyles.tradeInfo} style={{position:'relative'}}>
      <Title {...titleProps}></Title>
      <div className={rebutStyles.box} style={{bottom:rejectFlag=='0'?'1.2rem':'0'}}>
      <RejectCom data={data} rejectFlag={rejectFlag}/>
      <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
       <TabPane tab="赎回信息" key="1">
         <WhiteSpace/>
          <List>
            <Item extra={tradInfo.reqSeq}>申请单编号</Item>
          </List>
          <WhiteSpace/>
           <List>
             <Item extra={tradInfo.custName}>客户名称</Item>
             <Item extra={Dic.fetchDicValue('custType',tradInfo.custType)}>客户类型</Item>
             <Item extra={ Dic.fetchDicValue('operCertType',tradInfo.certType)}>客户证件类型</Item>
             <Item extra={tradInfo.certNo}>证件号码</Item>
           </List>
           <WhiteSpace/>
            <List>
              <Item extra={tradInfo.prodName}>产品名称</Item>
              <Item extra={tradInfo.prodExpiName}>产品类别</Item>
            </List>
            <WhiteSpace/>
             <List>
               <Item extra={tradInfo.reqShr}>赎回份额</Item>
               <Item extra={tradInfo.avlShr}>可用份额</Item>
               {tradInfo.cardNo?<Item extra={tradInfo.cardNo}>赎回至</Item>:''}
               <Item extra={tradInfo.remitDate}>赎回日期</Item>
               <TextareaItem title='赎回原因' autoHeight  value={tradInfo.remark}/>
             </List>
             {
               tradInfo.custType=='0'?<List>
                 <Item  style={{backgroundColor:'#efeff4'}}>经办人信息</Item>
                 <Item  extra={tradInfo.operator}>姓名</Item>
                 <Item  extra={Dic.fetchDicValue('operCertType',tradInfo.operCertType)}>证件类型</Item>
                 <Item  extra={tradInfo.operCertNo}>证件号</Item>
               </List>:<div />
             }
             <p style={{height:'2rem'}}></p>
         </TabPane>
         <TabPane tab="交易附件" key="2">
          <DataImg dataSource={attachInfo} />
         </TabPane>
       </Tabs>
     </div>
    {rejectFlag=='0'?( <div className={redeemStyles.footerSec}>
      <div className={redeemStyles.p}><CancelBtn2 {...cancleTitle} dispatch={dispatch} rebutSpace={rebutSpace} tradeData={tradeData}  /></div>
      <div className={redeemStyles.p} onClick = {()=>{
        if(!tradInfo||tradInfo.recStat!='1'){
          Toast.fail('该交易状态已作废,无法进行驳回修改!');
          return;
        }
        dispatch(routerRedux.push({pathname:'/TradeRedChange',state:{
            data:data,
            rowData:data.tradeModel
          }}));
      }}>修改</div>
    </div>):<div />}
    </div>);
  }

};



function connectProdunctFunc({rebutSpace,formStorage})
{
 return { rebutSpace,formStorage }
}
export default connect(connectProdunctFunc)(RebutRedeem);
