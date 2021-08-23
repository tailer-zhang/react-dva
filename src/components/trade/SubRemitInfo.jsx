import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import XTListItem2 from './XTListItem2';//列表项

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import tradeStyles from '../../styles/trade/trade.less';

const SubRemitInfo = () => {
  return(
    <div className={tradeStyles.remitWrap}>
      <div className={tradeStyles.menuArea}>
        <XTListItem2 />
      </div>
    </div>
  );
};
export default SubRemitInfo;
