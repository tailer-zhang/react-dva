//交易 撤单 撤单详情
import React,{ Component,PropTypes} from 'react';
import { connect } from 'dva';
import {Link,browserHistory,routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';
import { WhiteSpace,List,Tabs,InputItem,DatePicker } from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import CancelBtn1 from '../../components/share/CancelBtn1';
import RemitInfo1 from '../../components/share/RemitInfo1';
import Dic from '../../utils/dictionary';

import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';
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


const RecallDetail =createForm()((props) => {

  const { getFieldProps } = props.form;
  let { dispatch,trade,location } = props;
  let data = trade.model;
  let dealInfo = data.tradeModel;
  let attachInfo = data.attachList;
  let tradCapi = data.capiList;
  let tradeData = location.state;
  if(dealInfo== undefined) dealInfo={};
  const titleProps = {
    title:'认购信息详情',
  };
  return (
    <div className={tradeInfo.tradeInfo} style={{position:'relative'}}>
      <Title {...titleProps}></Title>
      <div className={tradeInfo.box} style={{backgroundColor:'#efeff4'}}>
       <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
         <TabPane tab="交易信息" key="1" swipeable={false} animated={false}>
         <WhiteSpace/>
           <div>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.reqSeq}>交易单号</Item>
                <Item  extra={dealInfo.contNo}>合同编号</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.prodName}>产品名称</Item>
                <Item  extra={dealInfo.prodExpiName}>产品类别</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.custName}>客户名称</Item>
                <Item extra={Dic.fetchDicValue('tradeCertType',dealInfo.certType)}>证件类型</Item>
                <Item  extra={dealInfo.certNo}>证件号码</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={Dic.fetchDicValue('tradCode',dealInfo.tradCode)}>交易类型</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <List.Item extra={dealInfo.remitDate}>申请日期</List.Item>
                <Item  extra={dealInfo.resvAmt}>预约金额（人民币）</Item>
                <List.Item extra={dealInfo.expiDate}>预约到日期</List.Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.reqAmt}>交易金额（人民币）</Item>
                <Item  extra={dealInfo.fee?dealInfo.fee:'0'}>手续费</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.revokeFlgName}>是否发起撤单</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.reqStatName}>申请状态</Item>
                <Item  extra={dealInfo.confShr}>确认份额(份)</Item>
                <Item  extra={dealInfo.confNetVal}>净值</Item>
                <List.Item extra={dealInfo.comtDate}>确认日期</List.Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={dealInfo.mgrName}>理财师</Item>
              </List>
              {
                dealInfo.custType=='0'?<List>
                  <Item  style={{backgroundColor:'#efeff4'}}>经办人信息</Item>
                  <Item  extra={dealInfo.operator}>姓名</Item>
                  <Item  extra={Dic.fetchDicValue('operCertType',dealInfo.operCertType)}>证件类型</Item>
                  <Item  extra={dealInfo.operCertNo}>证件号</Item>
                </List>:<div />
              }
           </div>
         </TabPane>
         <TabPane tab="汇款信息" key="2">
            <RemitInfo1 dispatch={dispatch} dataSource={tradCapi} data={dealInfo}/>
         </TabPane>
         <TabPane tab="资料查看" key="3">
            <DataImg dataSource={attachInfo} />
         </TabPane>
       </Tabs>
     </div>
     <div className={redeemStyles.footerSec}>
      <p style={{backgroundColor:'#f22f33',color:'#ffffff',cursor:'pointer'}} onClick={()=>dispatch(routerRedux.push({pathname:'/RecallAsk',state:dealInfo}))}>撤单</p>
     </div>
    </div>
  );
});
function connectProdunctFunc({trade})
{
  return { trade }
}
export default connect(connectProdunctFunc)(RecallDetail);
