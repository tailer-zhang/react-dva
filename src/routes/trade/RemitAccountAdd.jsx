//废弃 添加汇款账号页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Switch, InputItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';

const Item = List.Item;
const AccountForm = createForm()((props) => {
  const { getFieldProps } = props.form;
  return(
    <div className={tradeStyles.contractForm} style={{paddingBottom:'0'}}>
      <List>
        <InputItem {...getFieldProps('bank')} placeholder="" type="text">开户行</InputItem>
        <InputItem {...getFieldProps('account')} placeholder="" type="number">账号</InputItem>
      </List>
    </div>
  );
});

const RemitAccountAdd = () => {
  const TitleProps = {
    title:'添加汇款账号'
  };
  return(
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps} />
      <div className={tradeStyles.controlMenu}>
        <p className={tradeStyles.WhiteSpace}></p>
        <div className={tradeStyles.tabInput}>
          <AccountForm />
          <p className={tradeStyles.remitAddBtn}>保存并使用</p>
        </div>
      </div>
    </div>
  );
};
export default RemitAccountAdd;
