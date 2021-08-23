//我的预约  预约详情
import React,{ Component,PropTypes } from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import { WhiteSpace,List,Tabs,TextareaItem } from 'antd-mobile';
import PushFile from '../../components/share/PushFile';
import CancelBtn1 from '../../components/share/CancelBtn1';
import OrderUseInfo from '../../components/share/TransList5';
import Dic from '../../utils/dictionary';


import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

const OrderDetail = ({dispatch,trade}) =>{
let data = trade.model;
  const titleProps = {
    title:'预约详情',
    showBack:'no'
  };
  const cancelBtn = {
    btnType:'取消预约',
  };

  let boxClass = data&&data.recStatValue=='1'&&(!data.tradeReqSeq||data.tradeConfStat=='0')?tradeInfo.box:tradeInfo.div;

  // console.log("传入数据data&&data.recStatValue===",  data);
  return (
    <div className={tradeInfo.tradeInfo}>
      <Title {...titleProps}></Title>

      <div className={boxClass} >
       <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
         <TabPane tab="基本信息" key="1">
         <WhiteSpace/>
           <div>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.orderNo} >预约单号</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.prodName}>产品名称</Item>
                <Item  extra={data.shrType}>份额类别</Item>
              </List>
              <WhiteSpace/>
                {data.tradCode=='0022'?'':<List>
                  <Item extra={data.addiOrdName}>追加资金</Item>
                </List>
                }

              <WhiteSpace/>
              <List>
                <Item extra={data.custName}>客户名称</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.resvAmt}>预约金额(人民币)</Item>
                <Item  extra={data.orderTime}>预约时间</Item>
                <Item  extra={data.ordDate}>预计打款日期</Item>
                <Item  extra={data.expiDate}>到期日期</Item>
              </List>

              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.contractCode}>合同编号</Item>
                <Item  extra={data.usedStat}>使用状态</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.tradeReqSeq}>交易单号</Item>
                <Item  extra={data.tradeReqAmt}>交易金额</Item>
                <Item  extra={Dic.fetchDicValue('tradCode',data.tradCode)}>交易类型</Item>
                <Item  extra={data.tradeConfStatName}>交易审核状态</Item>
                <Item  extra={data.onlineSignName}>支持线上签署</Item>
              </List>
             <WhiteSpace/>
               {
                 data.confStat === '2' ?
                   <List style={{backgroundColor:'#fff'}}>
                     <Item  extra={data.confFailMsg}>确认失败原因</Item>
                   </List> : ""
               }
               {
                 data.confStat === '2' ? <WhiteSpace/> : ""
               }
              <List style={{backgroundColor:'#fff'}}>
                  <TextareaItem title="备注" style={{textAlign:'right'}} autoHeight  value={data.remark}/>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={data.sellerName}>理财师</Item>
              </List>
           </div>
         </TabPane>
         <TabPane tab="审批信息" key="2">
         <WhiteSpace/>
         <List>
             <Item extra={data.chkPosiName}>审批人职位</Item>
             <Item extra={data.chkName}>审批人</Item>
         </List>
         <WhiteSpace/>
         <List>
             <Item extra={data.chkStat}>审批状态</Item>
             <Item extra={data.chkTime}>审批时间</Item>
             <TextareaItem title='审批意见' autoHeight  value={data.chkMsg}/>
         </List>

         </TabPane>
         <TabPane tab="额度使用信息" key="3">
          <WhiteSpace />
          <OrderUseInfo dataSource={data.privateReserveAmountDtoList}/>
         </TabPane>
       </Tabs>
     </div>
      {
        data&&data.recStatValue=='1'&&(!data.tradeReqSeq||data.tradeConfStat=='0')?(<div style={{backgroundColor:'#f22f33',
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width:'100%',}}>
              <CancelBtn1 {...cancelBtn} data={trade} trade={trade} dispatch={dispatch}/>
            </div>):<div />
      }
    </div>
  );
};
function connectProdunctFunc({trade})
{
  return {trade};
}
export default connect(connectProdunctFunc)(OrderDetail);
