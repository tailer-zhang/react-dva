import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
// import Title from '../../../components/product/Title';
import Dic from '../../../utils/dictionary';
import {fmoney,convertCurrency} from '../../../utils/formatUtils';
import styles from '../../../styles/trade/written.less';
const WrittenDetail = (props) => {
  const TitleProps = {
    title:'预约产品详情',
    showBack:'no',
  };
  let {state}= props.location;
  let {intentionWriteTradDetail} = props.intentionWritten;
  let data = intentionWriteTradDetail;
  return(
    <div className={styles.detail}>
    {/*<Title {...TitleProps}></Title>*/}

      <div className={styles.WrittenDetail}>
        <section>
          <p><span>客户名称</span><span>{data.custName}</span></p>
        </section>
        <span className={styles.space}></span>
        <section>
          <p><span>预约金额</span><span>{data.origAmt?fmoney(data.origAmt,2):''}</span></p>
          {state.currType=='156'?<p><span>大写金额</span><span>{data.origAmt?convertCurrency(data.origAmt):''}</span></p>:<div/>}
          <p><span>预约币种</span><span>{state.currTypeName}</span></p>
          <p><span>折合人民币</span><span>{data.reqAmt}</span></p>
          <p><span>预约产品日期</span><span>{data.reqDate}</span></p>
        </section>
        <span className={styles.space}></span>
        <section>
          <p><span>预约产品</span><span>{state.prodTypeName}</span></p>
        </section>
        <div>
          <span>备注：</span>
          {data.remark?<p>{data.remark}</p>:<i/>}
        </div>
      </div>
    </div>
  );
};

function connectTradeFunc({intentionWritten})
{
  return {intentionWritten};
}
export default connect(connectTradeFunc)(WrittenDetail);
