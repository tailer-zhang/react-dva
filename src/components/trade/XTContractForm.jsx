import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Switch, InputItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Dic from '../../utils/dictionary';

import tradeStyles from '../../styles/trade/trade.less';//样式文件

const Item = List.Item;
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const XTContractForm = createForm()((props) => {
  const { getFieldProps } = props.form;
  let { dispatch } = props;
  return(
    <div className={tradeStyles.contractForm}>
      <List className={tradeStyles.marginTop20}>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="可选,小于结束日期"
          {...getFieldProps('date1', {
            initialValue: zhNow,
          })}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item>申请日期</List.Item>
        </DatePicker>
      </List>
      <List className={tradeStyles.marginTop20}>
        <Item extra="人民币" arrow="horizontal" onClick={() =>dispatch(routerRedux.push({pathname:'/MarketMonth',state:{
            title:'货币类型',
            dataSource:Dic.fetchDicList('moneyType'),
            selectValue:'0',
            onChange:(value,name)=>{
              console.log('value变化',value,name);

            }
          }}))}>币种</Item>
        <InputItem {...getFieldProps('tradeMon')} placeholder="" type="number">交易金额</InputItem>
        <InputItem {...getFieldProps('poundage')} placeholder="" type="number">手续费</InputItem>
      </List>
      <h3 className={tradeStyles.agent}>经办人信息</h3>
      <List className={tradeStyles.marginTop20}>
        <InputItem {...getFieldProps('userName')} placeholder="" type="text">姓名</InputItem>
        <Item extra="身份证" arrow="horizontal" onClick={() =>dispatch(routerRedux.push({pathname:'/MarketMonth',state:{
            title:'证件类型',
            dataSource:Dic.fetchDicList('credentials'),
            selectValue:'0',
            onChange:(value,name)=>{
              console.log('value变化',value,name);

            }
          }}))} >证件类型</Item>
        <InputItem {...getFieldProps('certNum')} placeholder="" type="text">证件号码</InputItem>
      </List>
    </div>
  );
});
export default  connect()(XTContractForm);
