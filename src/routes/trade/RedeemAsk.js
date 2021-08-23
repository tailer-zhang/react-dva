//赎回 赎回申请
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import { createForm } from 'rc-form';
import {WhiteSpace,List,Tabs,InputItem,Switch,DatePicker} from 'antd-mobile';
import RedmaskTabs from '../../components/share/RedmaskTabs';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';

import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Dic from '../../utils/dictionary';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';

const Item = List.Item;
const TabPane = Tabs.TabPane;

class RedeemAsk extends React.Component{
  constructor(props) {
    super(props);
  }

  onChangeMethord(item,value,name)
  {
    let { dispatch } = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    // let {dispatch,form} = this.props;
    // dispatch({
    //   type:'formStorage/fetchFormValue',
    //   payload:form.getFieldsValue()
    // });
  }



  render(){
    const {dispatch,location,formStorage,form,tradeForm,customer} = this.props;
    let { formValue } = formStorage;
    let askInfo = location.state;
    const titleProps = {
      title:'赎回申请',
      btn1:'赎回申请附件',
      btn2:'经办人',
    };

    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <RedmaskTabs formStorage={formStorage} customer={customer} form={form} tradeForm={tradeForm} dispatch={dispatch} onChangeMethord={this.onChangeMethord.bind(this)} askInfo={askInfo}/>
      </div>);
      }
    };
function connectTradeFun({tradeForm,formStorage,customer}){
  return {tradeForm,formStorage,customer }
}

export default connect(connectTradeFun)(createForm()(RedeemAsk));

//逻辑需求记录  全额开关 默认为关，点击打开 可用份额 份额值添加到赎回份额
