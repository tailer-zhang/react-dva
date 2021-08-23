import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import AcceptorList from '../components/AcceptorList';
import bankCardStyles from '../../../../../styles/customer/bankCard.less';

class PubAcceptorSelectCnt extends React.Component {
  constructor(props) {
    super();
    this.state = props;
  }

  searchEvent = (value) => {
    console.log('search', value);
    const { dispatch } = this.props;
    // //预约跳转选客户
    dispatch({
      type: 'customer/fetchAcceptorsList',
      payload: { loadingMore: false, empName: value },
    });
  }

  clear = () => {
    const { dispatch } = this.props;
    //预约跳转选客户
    dispatch({
      type: 'customer/fetchAcceptorsList',
      payload: { loadingMore: false, empName: '' },
    });
  }

  render() {
    const { customer, dispatch } = this.props;
    const titleProps = {
      title: '受理客户',
      showBack: 'yes',
    };
    return (
      <div className={bankCardStyles.secCustomer}>
        <div style={{ position: 'fixed', top: '0', zIndex: '0', width: '100%' }}>
          <Title {...titleProps}></Title>
        </div>
        {/*<SearchBar*/}
          {/*style={{ backgroundColor: '#f7f7f8' }}*/}
          {/*placeholder={customer.custName === '' ? "客户名称" : customer.custName}*/}
          {/*onSubmit={(value) => this.searchEvent(value)}*/}
          {/*onClear={() => this.clear()}*/}
        {/*/>*/}
        <div
          style={{
            height: '100%',
            backgroundColor: '#efeff4',
            paddingTop: 100,
            width: document.body.clientWidth,
          }}>
          <AcceptorList acceptorList={customer.acceptorList} location={this.state.location} dispatch={dispatch} customer={customer} />
        </div>
      </div>
    )
  }
}

function connectCustomer({ customer }) {
  return { customer }
}

export default connect(connectCustomer)(PubAcceptorSelectCnt);
