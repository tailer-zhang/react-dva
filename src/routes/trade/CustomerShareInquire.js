import React from 'react';
import { connect } from 'dva';
import { Drawer, SearchBar } from 'antd-mobile';
import Title from '../../components/product/Title';
import CustomerShareList from '../../components/trade/CustomerShareList';
import rebutStyles from '../../styles/trade/redeem.less';
import CustomerShareFilterItem from '../../components/trade/CustomerShareFilterItem'
class CustomerShareInquire extends React.Component{
  constructor(props) {
    super(props);
    let {trade} = props;
    this.state = {
      open: false,
      position: 'right',
      isFilter:false,
      ...trade.filterArgs
    };
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/fetchCustAmtDiviList',
      payload: {
        filterArgs,
        loadingMore: false,
        custAmtDiviList: [],
      },
    })
    if(filterArgs.tradCode === ''){
      this.setState({ open: !this.state.open, isFilter: false });
    }else {
      this.setState({ open: !this.state.open, isFilter: true });
    }
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'trade/fetchCustAmtDiviList', payload: { keyWord: value, loadingMore: false, custAmtDiviList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'trade/fetchCustAmtDiviList', payload: { keyWord: '', loadingMore: false, custAmtDiviList: [] } });
  }


  render() {
    const { isFilter } = this.state;
    const titleProps = {
      title: '客户分红清算资金查询',
      showBack:'no'
    };
    const sidebar = (<CustomerShareFilterItem close={this.onCloseMethord} />)
    const {dispatch,trade} = this.props;
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
                <img src={isFilter === false ? require('../../image/icon/orde_02.png') : require('../../image/icon/order.png')} />
              </div>
            </Title>
            <SearchBar placeholder="客户名称/产品名称" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }}>
            <CustomerShareList trade={trade} dispatch={dispatch} loadingMore={trade.loadingMore} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(CustomerShareInquire);
