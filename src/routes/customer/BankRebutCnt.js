//银行卡维护  选择客户
import React,{ Component,PropTypes } from 'react';
import Title from '../../components/product/Title';
import SecCustomerList from '../../components/customer/SecCustomerList';
import RebutList from '../../components/customer/RebutList';
import { SearchBar, Badge } from 'antd-mobile';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import bankCardStyles from '../../styles/customer/bankCard.less';

class BankRebutCnt extends React.Component{
  constructor(props){
    super(props)

  }

  searchEvent(value) {
    let {dispatch} = this.props;
    dispatch({ type: 'bank/getRejectList', payload: { keyWord: value, loadingMore: false, rejectList: [] } });
  }
  clear() {
    let {dispatch} = this.props;
    dispatch({ type: 'bank/getRejectList', payload: { keyWord: '', loadingMore: false, rejectList: [] } });
  }

  render(){
    let { dispatch,bank,location } = this.props;
    const TitleProp = {title:'驳回修改',showBack: 'yes'};
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...TitleProp}></Title>
          <SearchBar style={{backgroundColor:'#f7f7f8'}}
                     placeholder="客户名称"
                     onSubmit={this.searchEvent.bind(this)}
                     onClear={this.clear.bind(this)}
          />
        </div>
        <div className={bankCardStyles.secCustomer + " " + bankCardStyles.bankCustomer1}>
          <RebutList
            dispatch={dispatch}
            location={location}
          />
        </div>
      </div>
    )
  }
}
function connectSec({bank}) {
  return {bank}
}

export default connect(connectSec)(BankRebutCnt);

