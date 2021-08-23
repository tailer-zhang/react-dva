//需登记注册身份验证查询
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../components/product/Title';
import RegAuthList from '../../components/trade/RegAuthList';
import redeemList from '../../styles/trade/redeem.less';

class RegAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      isFilter: false
    };
  }
  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/fetchCustRegisterList',
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
    dispatch({ type: 'trade/fetchCustRegisterList', payload: { keyWord: value, loadingMore: false, custRegisterList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'trade/fetchCustRegisterList', payload: { keyWord: '', loadingMore: false, custRegisterList: [] } });
  }

  render() {
    const { trade, dispatch } = this.props
    const titleProps = {
      title: '需登记注册身份验证查询',
      showBack: 'no',
    };

    return (
      <div style={{backgroundColor:'#efeff4',height:'100%'}}>
        <Title {...titleProps} />
        <SearchBar placeholder="客户名称/产品名称" onSubmit={this.search} onClear={this.clear} />
        <div className={redeemList.boxScroll}>
          <RegAuthList trade={trade} dispatch={dispatch} />
        </div>
    </div>

    );
  }
}

function connectPrivateModel({ trade }) {
  return { trade };
}

export default connect(connectPrivateModel)(RegAuth);
