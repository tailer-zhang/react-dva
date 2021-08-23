import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import TransList2 from '../share/TransList2';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';
import productStyle from '../../styles/product/ProductStyle.less';

import Dic from '../../utils/dictionary';




const XTListItem3 = ({data,rejectFlag}) => {
  let tradCode = data.tradCode,desc='',value='',bottomHtml='';
  if(tradCode=='0020' || tradCode=='0022'){
    bottomHtml=<div className={productStyle.itemWrapBuy }>到期日：{data.endDate}</div>
  }else{
    bottomHtml=''
  }
  if(tradCode=='0024'||tradCode=='0033' || tradCode==='0098')//赎回或转让
  {
    desc = '申请份额(份)';
    value = data.reqShr;
  }
  else if(tradCode=='0052'&&data.reqShr) //
  {
    desc = '申请份额(份)';
    value = data.reqShr;
  }
  else if (tradCode=='0036') {
    desc = '转换份额(份)';
    value = data.reqShr;
  }
  else if(tradCode == '0071') {
    desc = '延期申请(天)';
    value = data.postponeCount;
  }
  else {
    desc = '申请金额(元)';
    value = data.reqAmt;
  }

  return (
    <div>
      <div className={productStyle.itemWrap2 }>
        <div className={redeemList.list} style={{paddingLeft:'0',paddingBottom:'0',height:'2.93333rem'}}>
          <section className={redeemList.listTitle2}>
            <div className={redeemList.prodName} style={{width:'62%'}}>{data.prodName}</div>
            <div className={redeemList.auditCust} style={{width:'37%'}}><p  style={{color:'#f22f33',width:'41%',marginRight:'0.1333rem',fontSize:'0.32rem',fontFamily:'PingFang SC Light',backgroundColor:'#ffe2e3',borderRadius:'6px',height:'0.49335rem',textAlign:'center',marginTop:'0.2rem',lineHeight:'0.52rem'}}>{Dic.fetchDicValue('tradCode',data.tradCode)}</p>
              <p className={redeemList.auditType} style={{width:'50%',lineHeight:'0.49335rem'}}>{data.confStatName}</p>
            </div>
          </section>
          <div>
            <ul className={styles.redeemUl}>
              <li>
                <p className={styles.transMoney}>{value}{rejectFlag!=undefined?'':<span>万</span>}</p>
                <section>{desc}</section>
              </li>
              <li>
                <p className={styles.listUname}>{data.custName}</p>
                <section>客户名称</section>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        {bottomHtml}
      </div>
    </div>
  );
};
export default XTListItem3;
