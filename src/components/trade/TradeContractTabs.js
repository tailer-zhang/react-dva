import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { Tabs, WhiteSpace,List, WingBlank,TextareaItem } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import styles from '../../styles/trade/tradeContractTabs.less';

const TabPane = Tabs.TabPane;
const Item = List.Item;

const TradeContractTabs = ({dispatch,data}) => {
  let insurModel = data.insurModel;
  if(insurModel==undefined)//取不到对象，默认为空对象
    insurModel = {};
    console.log('insurModel====',insurModel);
  let resultList = data.list;
  if(resultList==undefined)//取不到数组，默认为空数组
     resultList = [];
  return (
    <div>
      <Tabs defaultActiveKey="1" swipeable={false}>
       <TabPane tab="合同详情" key="1">
         <div>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.contNo}>合同编号</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.prodName}>产品名称</Item>
          <Item extra={insurModel.kpiName}>产品类别</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.custName}>投保人姓名</Item>
          <Item extra={Dic.fetchDicValue('operCertType',insurModel.certType)}>投保人证件类型</Item>
          <Item extra={insurModel.certNo}>投保人证件号</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.insurePerson}>被保人</Item>
          <Item extra={insurModel.beneficiaries}>受益人</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.payTerm}>缴费年限</Item>
          <Item extra={Dic.fetchDicValue('payCurType',insurModel.payCurType)}>缴费币种</Item>
          <Item extra={insurModel.premiumYear}>年缴保费</Item>
          <Item extra={insurModel.premiumYrmb}>年缴保费折合人民币</Item>
          <Item extra={insurModel.premium}>保额</Item>
          <Item extra={insurModel.premiumRmb}>保额折合人民币</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <Item extra={insurModel.effectDate}>保单生效日</Item>
          <Item extra={Dic.fetchDicValue('tradeSafeFilter1',insurModel.insureStat)}>保单状态</Item>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          {/*<Item extra={insurModel.remark}>备注</Item>*/}
          <div className={styles.reTaltol}>
            <p>备注</p>
            <p className={styles.remark}>
              {insurModel.remark}
            </p>
          </div>
          <WhiteSpace size="md" style={{background: '#efeff4'}}/>
          <WhiteSpace size="lg" style={{background: '#efeff4'}}/>
         </div>
       </TabPane>
       <TabPane tab="缴费记录" key="2">
         <div>
           {
             Object.values(resultList).map((item,index)=>{
               return (
                 <div className={styles.wrape} key={index}
                      onClick={(e)=>{
                        //   e.preventDefault();
                        dispatch(routerRedux.push({
                          pathname: '/tradePayRecordSee',
                          state: {
                            index: index,
                            recordDetail:item,
                            tradePayPic:item.fileList,
                          }
                        }))
                      }}>
                   <WhiteSpace size="lg" style={{background: '#efeff4'}}/>
                   <WhiteSpace size="md" style={{background: '#efeff4'}}/>
                   <h5 className={styles.data}>{item.payDate}</h5>
                     <WhiteSpace size="md" style={{background: '#efeff4'}}/>
                   <div className={styles.total}>
                     <div className={styles.flex}>
                       <div className={styles.left}>
                         <h3>{item.payAmt }<span style={{color: '#f22f33',fontSize: '0.32rem',}}></span></h3>
                         <em>交易金额({Dic.fetchDicValue('payCurType',item.payCurType) })</em>
                       </div>
                       <div className={styles.right}>
                         <h3>{item.payAmtRmb}<span style={{color: '#000',fontSize: '0.32rem',}}>元</span></h3>
                         <em>折合人民币</em>
                       </div>
                     </div>
                     <div className={styles.foot}>
                        <p>备注:</p>
                        <p>{item.remark}</p>
                     </div>
                   </div>
                 </div>
               )
             })
           }
         </div>
       </TabPane>
      </Tabs>
    </div>
  )
}


export default TradeContractTabs;
