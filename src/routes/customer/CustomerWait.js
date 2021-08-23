import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { ListView } from 'antd-mobile';
import Title from '../../components/product/Title';
import CustomerWaitList from '../../components/customer/CustomerWaitList';
import styles from '../../styles/customer/customerWait.less';
// import styles from '../../styles/customer/customerInquireList.less';

const CustomerWait = ({props,customer,dispatch}) => {
  const titleProps = {title: '客户待办',showBack: 'no'};
  // let data = customer;
  // let rowData = data[0];
  return(
    <div style={{height: '100%'}}>
      {/*<Title {...titleProps} />*/}
      <div style={{height: '100%'}}>
        <CustomerWaitList data={customer} dispatch={dispatch}/>
      </div>
    </div>
  )
}

function connectWait({customer}) {
  return {customer}
}

export default connect(connectWait)(CustomerWait);
