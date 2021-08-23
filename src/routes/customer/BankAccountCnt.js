import React from 'react';
import Title from '../../components/product/Title';
import BankAccountList from '../../components/customer/BankAccountList';
import { connect } from 'dva';
import modifyStyle from '../../styles/customer/cusModifyStyle.less';

class BankAccountCnt extends React.Component{
  constructor(props){
    super(props)
  }

  searchEvent(value) {
    let {dispatch} = this.props;
    dispatch({
      type: 'bank/fetchbankAccountList',
      payload: {custName: value}
    })
  }
  clear() {
    let {dispatch} = this.props;
    dispatch({
      type: 'bank/fetchbankAccountList',
      payload: {custName: ''}
    })
  }
  render(){
    let { dispatch,bank,location } = this.props;
    const TitleProp = {title:'开户行变-更选择银行账户',showBack: 'yes'};
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...TitleProp}></Title>
        </div>
        <div className={modifyStyle.secCustomer} style={{paddingTop: '1.47333rem'}}>
          <BankAccountList
            dataSource={bank}
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

export default connect(connectSec)(BankAccountCnt);
