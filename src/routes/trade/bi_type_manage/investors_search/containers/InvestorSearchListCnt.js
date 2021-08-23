import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import FilterItem from '../components/FilterItem';
import InvestorsList from '../components/InvestorsList';
import rebutStyles from '../../../../../styles/trade/redeem.less';

function connectInvestorsModel({ InvestorSearchModel }) {
  return { InvestorSearchModel }
}

class InvestorSearchListCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const filterArgs = {}
    dispatch({ type: 'InvestorSearchModel/clear', payload: { keyWord: '', loadingMore: false, investorList: [], filterArgs } });
  }

  onOpenChange= () => {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    console.log('filterArgs', filterArgs)
    dispatch({
      type: 'InvestorSearchModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        investorList: [],
      },
    })
    this.setState({ open: !this.state.open });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'InvestorSearchModel/fetchList', payload: { keyWord: value, loadingMore: false, investorList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'InvestorSearchModel/fetchList', payload: { keyWord: '', loadingMore: false, investorList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
    const titleProps = {
      title: '投资者查询',
      showBack: 'yes',
    };
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular' }}>
        <Drawer
          sidebar={sidebar}
          dragHandleStyle={{ height: '100%', display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          open={this.state.open}
          position='right'
          onOpenChange={this.onOpenChange}
        >
          <div style={{ position: 'fixed', top: '0', zIndex: '0', width: '100%' }}>
            <Title {...titleProps}>
              <div className={rebutStyles.orderImg} onTouchStart={this.onOpenChange.bind(this)}>
                <img src={isFilter === false ? require('../../../../../image/icon/orde_02.png') : require('../../../../../image/icon/order.png')} />
              </div>
            </Title>
            <SearchBar placeholder="客户名称" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div
            style={{
              height: '100%',
              backgroundColor: '#efeff4',
              paddingTop: '2.5333rem',
              width: document.body.clientWidth,
            }}>
            <InvestorsList investorList={this.props.InvestorSearchModel.investorList} investorModel={this.props.InvestorSearchModel} />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(connectInvestorsModel)(InvestorSearchListCnt);
