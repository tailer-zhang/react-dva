//撤单 撤单申请
import React,{ Component,PropTypes } from 'react';
import { createForm } from 'rc-form';
import {connect} from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import {WhiteSpace,List,Tabs,InputItem,Toast } from 'antd-mobile';
import MarketMonth from '../productPages/MarketMonth';
import {decryptStr} from '../../utils/createEncrypt';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Form from '../../utils/form';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';

import RecaskTabs from '../../components/share/RecaskTabs';
import Dic from '../../utils/dictionary';

// import styles from '../../styles/customer/customerAdd.less';
import tradeInfo from '../../styles/trade/redeem.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


class RecallAsk extends React.Component{
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
    let {dispatch,form} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:form.getFieldsValue()
    });
  }

  render(){
  const titleProps = {
    title:'撤单申请',
  };
  let { dispatch,form,formStorage,location,tradeForm,customer} = this.props;
  let {formValue} = formStorage;
  let tradeData = location.state;
  // console.log('formValue========',tradeData,formValue);
  return (
    <div className={tradeInfo.tradeInfo}>
      <Title {...titleProps}></Title>
        <RecaskTabs form={form} tradeForm={tradeForm} formStorage={formStorage} customer={customer}
          tradeData={tradeData}  dispatch={dispatch} onChangeMethord={this.onChangeMethord.bind(this)} />
    </div>);
  }
};

function connectTradeFun({ tradeForm,formStorage,customer}){
  return { tradeForm,formStorage,customer }
}
export default connect(connectTradeFun)(createForm()(RecallAsk));
