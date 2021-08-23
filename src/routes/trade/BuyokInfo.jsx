//撤单 认申购信息查看
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import TransList2 from '../../components/share/TransList2';
import {WhiteSpace,List,Tabs,TextareaItem } from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import Dic from '../../utils/dictionary';

import redeem from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';
import redeemStyles from '../../styles/trade/rebut.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

class BuyokInfo extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    let {dispatch,trade,location } = this.props
    let data = trade.model
    let tradeInfo = data.tradeModel;
    let attachInfo = data.attachList;
    console.log('卡卡卡卡======',tradeInfo);

    const tmpTitle = (tradeInfo == undefined ? '': (tradeInfo.tradCode == '0036' ? '转换' : '赎回'))

    const titleProps = {
      title:tmpTitle + '信息详情',
    }
    if(tradeInfo == undefined) tradeInfo ={};

    return (
      <div className={redeem.tradeInfo} style={{position:'relative'}}>
        <Title {...titleProps}></Title>
        <div style={{backgroundColor:'#efeff4'}}>
         <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
           <TabPane tab="交易信息" key="1">
           <WhiteSpace/>
             <div style={{height:'auto'}}>
                <List style={{backgroundColor:'#fff'}}>
                  <Item  extra={tradeInfo.reqSeq} >申请单编号</Item>
                </List>
                <WhiteSpace/>
                <List style={{backgroundColor:'#fff'}}>
                  <Item  extra={tradeInfo.custName}>客户名称</Item>
                  <Item  extra={Dic.fetchDicValue('custType',tradeInfo.custType)}>客户类型</Item>
                  <Item  extra={Dic.fetchDicValue('operCertType',tradeInfo.certType)}>客户证件类型</Item>
                  <Item  extra={tradeInfo.certNo}>证件号码</Item>
                </List>
                <WhiteSpace/>
                <List style={{backgroundColor:'#fff'}}>
                  <Item  extra={tradeInfo.prodName}>产品名称</Item>
                  <Item  extra={tradeInfo.prodExpiName}>产品类别</Item>
                </List>
                <WhiteSpace/>
                <List style={{backgroundColor:'#fff'}}>
                  <Item  extra={tradeInfo.reqShr}>{tmpTitle}份额</Item>
                  <Item  extra={tradeInfo.avlShr}>可{tmpTitle}份额</Item>
                  {
                    tradeInfo.tradCode == '0036' ? <Item  extra={tradeInfo.targProdName + '-' + tradeInfo.targShrType}>转入产品</Item> : <Item  extra={tradeInfo.cardNo}>赎回至</Item>
                  }
                  <Item  extra={tradeInfo.remitDate}>{tmpTitle}日期</Item>
                </List>
                  <List style={{backgroundColor:'#fff'}}>
                      <TextareaItem title={tmpTitle + '原因'} style={{textAlign:'right'}} autoHeight  value={tradeInfo.remark}/>
                  </List>
                <WhiteSpace/>
                {
                  tradeInfo.custType=='0'?<List>
                    <Item  style={{backgroundColor:'#efeff4'}}>经办人信息</Item>
                    <Item  extra={tradeInfo.operator}>姓名</Item>
                    <Item  extra={Dic.fetchDicValue('operCertType',tradeInfo.operCertType)}>证件类型</Item>
                    <Item  extra={tradeInfo.operCertNo}>证件号</Item>
                  </List>:<div />
                }
             </div>
           </TabPane>
           <TabPane tab="资料查看" key="2">
            <DataImg dataSource={attachInfo} />
           </TabPane>
         </Tabs>
       </div>
       <p style={{height:'1.6rem',backgroundColor:'#efeff4'}}></p>
       <div className={redeemStyles.footerSec}>
       <p style={{backgroundColor:'#f22f33',color:'#ffffff',height:'1.2rem',textAlign:'center',lineHeight:'1.2rem'}} onClick={()=>dispatch(routerRedux.push({pathname:'/RecallAsk',state:tradeInfo}))}>撤单</p>
       </div>
      </div>);
      }
};

function tradeConnectFun({trade})
{
  return { trade }
}

export default connect(tradeConnectFun)(BuyokInfo);
