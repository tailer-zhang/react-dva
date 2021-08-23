//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView } from 'antd-mobile';
import CompListTitle2 from '../../components/share/CompListTitle2';

import styles from '../../styles/customer/customerAdd.less';
import redeemList from '../../styles/trade/redeem.less';

const OrderUseInfo = React.createClass({
  render() {
    const { dispatch,dataSource,trade}= this.props;
    console.log('orderNo----orderNo-orderNo-orderNo-',dataSource);
    function touchCell(){
      dispatch(routerRedux.push({pathname:'/OrderDetail'}));
    };

      return (
        <div>
          {dataSource.map((item,index)=>{
            let usedPosi = item.usedAmt-item.recyAmt;
            let usedCont = item.usedCont - item.recyCont;
              return (
                <div className={redeemList.list + " " + redeemList.newsDiv} key={index} onClick={()=>touchCell()}>
                  <div className={redeemList.useList}>
                    <section className={redeemList.listTit}>
                      <div className={redeemList.prodName}>共享额度</div>
                      <div className={redeemList.auditType} style={{float:'right',magin:'0'}}>{item.recyStat}</div>
                    </section>
                    <ul className={styles.useAmtUl}>
                       <li>
                         <p className={styles.transMoney}>{usedPosi}<span></span></p>
                         <section>使用额度(人民币)</section>
                       </li>
                       <li>
                       <p className={styles.listUname}>{usedCont}</p>
                       <section>使用合同数(份)</section>
                       </li>
                    </ul>
                  </div>
                </div>);
            })
          }
        </div>
      )
  }
});


export default OrderUseInfo;
{/*<div className={redeemList.propTime}>{`占额时间${item.createTime} ~ ${item.updateTime}`}</div>*/}
