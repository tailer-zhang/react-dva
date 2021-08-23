import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Switch, InputItem, DatePicker,WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Form from '../../utils/form';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const Item = List.Item;
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

export default class OrgServiceAdd extends React.Component{
  constructor() {
    super();
  }

  getOptions() {
    return({
      space0:{valueType:'whiteSpace'},
      mbrCertifyType: {
        required:false,
        valueType:'select',
        type:Dic.fetchDicList('mbrCertifyType'),
        title:'会员认证方式',
        desc:'会员认证方式'
      },
      ctCertifyType: {
        required:false,
        valueType:'select',
        type:Dic.fetchDicList('ctCertifyType'),
        title:'合同认证方式',
        desc:'合同认证方式'
      },
      importantReceive: {
        required:false,
        valueType:'select',
        type:Dic.fetchDicList('importantReceive'),
        title:'资料接收',
        desc:'资料接收'
      },
    })
  }

  render() {
    const {dispatch,defaultActiveKey,formValue,onChangeMethord,saveFormMethord,form} = this.props;
    const { getFieldProps,getFieldError} = this.props.form;
    return (
          <Form options={this.getOptions()} dispatch={dispatch} formValue={formValue} form={form}
              onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}
              id={this.props.id}/>
    )
  }
}

// <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom: '1.334rem'}}>
//   <WhiteSpace style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
//   <List className={PerCusDetailStyles.list1}>
//   </List>
// </div>
