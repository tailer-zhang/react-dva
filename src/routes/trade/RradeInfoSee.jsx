//废弃 赎回列表
import React,{ Component,PropTypes } from 'react';
import Title from '../../components/product/Title';
import TransList2 from '../../components/share/TransList2';
import CompListTitle2 from '../../components/share/CompListTitle2';
import { SearchBar,WhiteSpace,List,Tabs } from 'antd-mobile';
import PushFile from '../../components/share/PushFile';

import tradeInfo from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

const RradeInfoSee = () =>{
  const titleProps = {
    title:'交易信息详情',
  }
  return (
    <div className={tradeInfo.tradeInfo}>
      <Title {...titleProps}></Title>
      <p className={tradeInfo.pFull}></p>
      <div>
       <Tabs defaultActiveKey="1">
         <TabPane tab="持仓信息" key="1">
         <WhiteSpace/>
           <div>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="胡兆兰" >客户名称</Item>
                <Item  extra="身份证">证件类型</Item>
                <Item  extra="236451111106254573">证件号码</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="安心盈4号">产品名称</Item>
                <Item  extra="安心盈4号">产品类型</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="1000000.00">持有份额（份）</Item>
                <Item  extra="1000000.00">可用份额（份）</Item>
                <Item  extra="0.00">交易冻结份额（份）</Item>
                <Item  extra="0.00">质押冻结份额（份）</Item>
                <Item  extra="0.00">异常冻结份额（份）</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="1000000.00">总成本</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="0.00">累计收益</Item>
              </List>
              <WhiteSpace/>
              <List style={{backgroundColor:'#fff'}}>
                <Item  extra="系统管理员">创建人</Item>
                <Item  extra="2017-01-13">创建时间</Item>
                <Item>记录状态</Item>
              </List>
           </div>
         </TabPane>
         <TabPane tab="交易确认份额" key="2">
         <WhiteSpace/>
         </TabPane>
         <TabPane tab="交易冻结份额" key="3">
          <div className={tradeInfo.tradeDjDate}>
            <p>2015年04月28日</p>
          </div>
           <div>
            <PublicInfo/>
           </div>
         </TabPane>
       </Tabs>
     </div>
      <WhiteSpace />
       <p className={tradeInfo.shBtn}>赎回</p>
    </div>
  );
};

const PublicInfo = () =>{
  return (
  <div className={tradeInfo.publicInfo}>
    <p className={styles.contractNum}>合同编号：<span style={{display:'none'}}>123456789963256</span></p>
    <ul className={styles.transUl}>
      <li>
        <p className={styles.transMoney}>100.00<span>万</span></p>
        <section>交易金额（人民币）</section>
      </li>
      <li style={{display:'none'}}>
      <p>2016-12-12</p>
      <section>签单日期</section>
      </li>
    </ul>
  </div>
  );
}

export default RradeInfoSee;
