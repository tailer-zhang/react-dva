import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import Managerlist from '../components/Managerlist';
import bankCardStyles from '../../../../styles/customer/bankCard.less';

class SelectManagers extends React.Component {
  constructor(props) {
    super();
    this.state = props;
  }

  searchEvent = (value) => {
    console.log('search', value);
    const { dispatch } = this.props;
    // //预约跳转选客户
    dispatch({
      type: 'customer/fetchManagersList',
      payload: { loadingMore: false, keyWord: value },
    });
  }

  clear = () => {
    const { dispatch } = this.props;
    //预约跳转选客户
    dispatch({
      type: 'customer/fetchManagersList',
      payload: { loadingMore: false, keyWord: '' },
    });
  }

  render() {
    const { customer, dispatch } = this.props;
    const titleProps = {
      title: '管理人',
      showBack: 'yes',
    };
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps}></Title>
          {/*<SearchBar placeholder="管理人名称" onSubmit={this.searchEvent} onClear={this.clear} />*/}
        </div>
        <div className={bankCardStyles.content}>
          <Managerlist managerList={customer.managerList} location={this.state.location} dispatch={dispatch} customer={customer} />
        </div>
      </div>
    );
  }
}

function connectCustomer({ customer }) {
  return { customer }
}

export default connect(connectCustomer)(SelectManagers);
