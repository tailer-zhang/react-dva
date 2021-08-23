import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../components/product/Title';
import Pendinglist from '../../components/trade/Pendinglist';

class ApplyPending extends React.Component {
  constructor() {
    super();
    this.state = {
      isFilter: false
    };
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/fetchCustAmtDiviList',
      payload: {
        filterArgs,
        loadingMore: false,
        privateInputList: [],
      },
    })
    this.setState({ open: !this.state.open, isFilter: true });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'trade/fetchpostponelist', payload: { keyWord: value, loadingMore: false, postponelist: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'trade/fetchpostponelist', payload: { keyWord: '', loadingMore: false, postponelist: [] } });
  }

  render() {
    const { trade, dispatch } = this.props
    const titleProps = {
      title: '延期申请',
      showBack: 'no',
    };

    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular' }}>
          <div style={{ position: 'fixed', top: '0', zIndex: '0', width: '100%' }}>
            <Title {...titleProps} />
            <SearchBar placeholder="客户名称/产品名称" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }}>
            <Pendinglist trade={trade} dispatch={dispatch} />
          </div>
      </div>
    );
  }
}

function connectPrivateModel({ trade }) {
  return { trade };
}

export default connect(connectPrivateModel)(ApplyPending);
