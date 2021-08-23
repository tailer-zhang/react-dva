//交易 驳回修改 认购驳回详情
import React,{ Component,PropTypes} from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';
import { WhiteSpace,List,Tabs,InputItem,DatePicker } from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import CancelBtn2 from '../../components/share/CancelBtn2';
import RemitInfo2 from '../../components/share/RemitInfo2';
import Dic from '../../utils/dictionary';

import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';
import redeemStyles from '../../styles/trade/rebut.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


import moment from 'moment';
import 'moment/locale/zh-cn';
import Form from '../../utils/form';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

const RejectCom = ({data,rejectFlag})=>{
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

const RebutBuy =createForm()((props) => {
  const { getFieldProps } = props.form;
  let { dispatch,rebutSpace,location,tradeForm,} = props;
  // console.log('props555555555555',props)
  let custRegisterFileList = rebutSpace.custRegisterFileList ||[]
  let tradeData = location.state.tradeDetail;
  let {rejectFlag} = location.state;
  let data = rebutSpace.model;
  if(data== undefined) data={};
  let tradInfo = rebutSpace.model.tradeModel;
  let tradCapi = data.capiList;
  let tradAttach = data.attachList;
  if(tradInfo==undefined) tradInfo={};

  const titleProps = {
    title:rejectFlag=='1'?'认购信息详情':'认购驳回详情',
  };
  const fileTitle ={
    fileTitle:'证件资料'
  };
  const cancleTitle = {
    btnType:'作废',
  };
  return (
    <div className={tradeInfo.tradeInfo} style={{position:'relative'}}>
      <Title {...titleProps}></Title>
      <div className={tradeInfo.box} style={{bottom:rejectFlag=='1'?'0':'1.2rem'}}>
      <RejectCom data={data} rejectFlag={rejectFlag}/>
       <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
         <TabPane tab="交易信息" key="1" swipeable={false} animated={false}>
         <WhiteSpace/>
           <div>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.reqSeq}>交易单号</Item>
                <Item  extra={tradInfo.contNo}>合同编号</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.prodName} >产品名称</Item>
                <Item  extra={tradInfo.prodExpiName}>产品类别</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.custName}>客户名称</Item>
                <Item extra={Dic.fetchDicValue('operCertType',tradInfo.certType)}>证件类型</Item>
                <Item  extra={tradInfo.certNo}>证件号码</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={Dic.fetchDicValue('tradCode',tradInfo.tradCode)}>交易类型</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.remitDate}>申请日期</Item>
                <Item  extra={tradInfo.resvAmt}>预约金额（人民币）</Item>
                <Item  extra={tradInfo.expiDate}>预约到期日</Item>
                {
                    tradInfo.endDate?<Item  extra={tradInfo.endDate}>合同到期日</Item>:<div/>
                }
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.reqAmt}>交易金额（人民币）</Item>
                <Item  extra={tradInfo.bankName}>开户行</Item>
                <Item  extra={tradInfo.fee}>手续费</Item>
              </List>
              <WhiteSpace/>
             {
               tradeData.isNeedRegister ==='1'?(
                 <List style={{backgroundColor:'#fff'}}>
                   <Item  extra={tradeData.registerFlag && tradeData.registerFlag === '1' ? '是': '否'}>是否已完成登记注册身份验证</Item>
                 </List>
               ):<div />
             }

             <WhiteSpace/>
             {tradeData.isNeedRegister ==='1'&& tradeData.registerFlag && tradeData.registerFlag === '1' ? <DataImg dataSource={custRegisterFileList} /> :
               <div/>
             }
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.revokeFlgName}>是否发起撤单</Item>
              </List>
              <WhiteSpace/>
             {rejectFlag == '0'?null: < List style={{backgroundColor:'#fff'}}>
               <Item  extra={tradInfo.reqStatName}>申请状态</Item>
               <Item  extra={tradInfo.confShr}>确认份额(份)</Item>
               <Item  extra={tradInfo.confNetVal}>净值</Item>
               <Item extra={tradInfo.comtDate}>确认日期</Item>
               <Item extra={tradInfo.endDate}>到期日</Item>
               </List>}
              <WhiteSpace/>
             <List style={{backgroundColor:'#fff'}}>
               <Item extra={tradInfo.signTypeName}>签署方式</Item>
               <Item extra={tradInfo.signFlagName}>电子合同是否签署</Item>
               <Item extra={tradInfo.signDate}>电子合同签署日期</Item>
             </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra={tradInfo.mgrName}>理财师</Item>
              </List>
              {
                tradInfo.custType=='0'?<List>
                  <Item style={{backgroundColor:'#efeff4'}}>经办人信息</Item>
                  <Item  extra={tradInfo.operator}>姓名</Item>
                  <Item  extra={Dic.fetchDicValue('operCertType',tradInfo.operCertType)}>证件类型</Item>
                  <Item  extra={tradInfo.operCertNo}>证件号码</Item>
                </List>:<div />
              }
           </div>
           <p style={{height:'2rem'}}></p>
         </TabPane>
         <TabPane tab="汇款信息" key="2">
          <RemitInfo2 dataSource={tradCapi} dispatch={dispatch} rejectFlag={rejectFlag} data={tradInfo}/>
         </TabPane>
         <TabPane tab="资料查看" key="3">
            <DataImg dataSource={tradAttach} />
         </TabPane>
       </Tabs>
     </div>
     {rejectFlag=='0'?(<div className={redeemStyles.footerSec} style={{cursor:'pointer'}}>
       <div className={redeemStyles.p}><CancelBtn2 {...cancleTitle} dispatch={dispatch} tradeData={tradeData}  /></div>
       <div className={redeemStyles.p} onClick = {()=>dispatch(routerRedux.push({pathname:'/RebutBuyChange',state:{
         data:data,
         rejectFlag:rejectFlag,
       }}))}>修改</div>
     </div>):<div />}
    </div>
  );
});
function connectProdunctFunc({rebutSpace,formStorage,tradeForm})
{
 return { rebutSpace,formStorage,tradeForm }
}

export default connect(connectProdunctFunc)(RebutBuy);
