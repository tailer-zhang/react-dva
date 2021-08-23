import React from 'react';
import {fmoney,convertCurrency} from '../../utils/formatUtils';
import buyStyle from '../../styles/product/buyDetail.less';




class CustBuyDetail extends React.Component{
  constructor(props) {
      super(props)
  }

  render()
  {
     let {location} = this.props;
     let data = location.state;

    return(
      <div className={buyStyle.buyInfoBody}>
          <p>
            <span className={buyStyle.spanTitle}>客户名称</span>
            <span className={buyStyle.spanInfor}>{data.custName}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>证件类型</span>
            <span className={buyStyle.spanInfor}>{data.certTypeName}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>证件号码</span>
            <span className={buyStyle.spanInfor}>{data.certNo}</span>
          </p>
          <span className={buyStyle.spanWrite}></span>
          <p>
            <span className={buyStyle.spanTitle}>打款日期</span>
            <span className={buyStyle.spanInfor}>{data.remitDate}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>购买金额(人民币)</span>
            <span className={buyStyle.spanInfor + " " + buyStyle.langTitle}>{fmoney(data.reqAmt)}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>大写金额</span>
            <span className={buyStyle.spanInfor}>{convertCurrency(data.reqAmt)}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>确认份额(份)</span>
            <span className={buyStyle.spanInfor+ " " + buyStyle.contTitle}>{fmoney(data.confShr)}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>交易类型</span>
            <span className={buyStyle.spanInfor}>{data.tradCodeName}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>合同状态</span>
            <span className={buyStyle.spanInfor}>{data.confStatName}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>合同编号</span>
            <span className={buyStyle.spanInfor}>{data.contNo}</span>
          </p>
          <p>
            <span className={buyStyle.spanTitle}>到期日期</span>
            <span className={buyStyle.spanInfor}>{data.contEndDate}</span>
          </p>
      </div>
    );
  }
}

export default CustBuyDetail;
