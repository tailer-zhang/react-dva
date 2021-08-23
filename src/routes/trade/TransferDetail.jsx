//交易 驳回修改 赎回驳回详情
import React,{ Component,PropTypes } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import {WhiteSpace,List,Tabs,InputItem,DatePicker } from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import CancelBtn2 from '../../components/share/CancelBtn2';
import Dic from '../../utils/dictionary';


import rebutStyles from '../../styles/trade/redeem.less';
import redeemStyles from '../../styles/trade/rebut.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


// import moment from 'moment';
// import 'moment/locale/zh-cn';
//
// const zhNow = moment().locale('zh-cn').utcOffset(8);
// const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
// const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
//
// const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
// const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);


const TransferDetail =createForm()((props) => {
  const { getFieldProps } = props.form;
  let { dispatch,rebutSpace } = props;
  let data = rebutSpace.model;
  let tradInfo = rebutSpace.model.tradeModel;
  let tradCapi = data.capiList;
  let tradAttach = data.attachList
  if(tradInfo==undefined) tradInfo={};
  const titleProps = {
    title:'转让信息详情',
  };

  return (
    <div className={rebutStyles.tradeInfo} style={{position:'relative'}}>
      <Title {...titleProps}></Title>
      <div className={rebutStyles.boxScrollTra}>
      <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
        <TabPane tab="转让信息" key="1">
         <WhiteSpace/>
          <List>
            <Item extra={tradInfo.reqSeq}>申请单编号</Item>
          </List>
          <WhiteSpace/>
           <List>
             <Item extra={tradInfo.custName}>转让方客户名称</Item>
             <Item extra={tradInfo.certTypeName}>转让方证件类型</Item>
             <Item extra={tradInfo.certNo}>转让方证件号码</Item>
           </List>
           <WhiteSpace/>
            <List>
              <Item extra={tradInfo.prodName}>产品名称</Item>
              <Item extra={tradInfo.prodExpiName}>产品类别</Item>
            </List>
            <WhiteSpace/>
             <List>
               <Item extra={tradInfo.reqShr}>转让份额</Item>
               <Item extra={tradInfo.reqAmt}>转让金额</Item>
               <Item extra={tradInfo.fee}>转让手续费</Item>
             </List>
             <WhiteSpace/>
              <List>
                <Item extra={tradInfo.confShr}>确认份额</Item>
                <Item extra={tradInfo.confAmt}>确认金额</Item>
              </List>
             <WhiteSpace/>
              <List>
                 <Item extra={tradInfo.targetName}>受让方客户名称</Item>
                 <Item extra={tradInfo.targetCertNo}>受让方卡号</Item>
                 <Item extra={Dic.fetchDicValue('operCertType',tradInfo.targetCertType)}>受让方证件类型</Item>
                 <Item extra={tradInfo.targetCertNo}>受让方证件号码</Item>
              </List>
              <p style={{height:'2rem'}}></p>
        </TabPane>
        <TabPane tab="交易附件" key="2">
          <DataImg dataSource={tradAttach} />
        </TabPane>
       </Tabs>
     </div>
    </div>
  );
});



function connectProdunctFunc({rebutSpace})
{
 return { rebutSpace }
}
export default connect(connectProdunctFunc)(TransferDetail);
