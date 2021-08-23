import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import FilterItem from '../components/FilterItem';
import InqueryList from '../components/InqueryList';
import rebutStyles from '../../../../../styles/trade/redeem.less';

class InvestorApplyInqueryCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onOpenChange= () => {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    console.log('filterArgs', filterArgs)
    dispatch({
      type: 'ChangeApplyModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        applyforChangeList: [],
      },
    })
    this.setState({ open: !this.state.open });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'ChangeApplyModel/fetchList', payload: { keyWord: value, loadingMore: false, applyforChangeList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'ChangeApplyModel/fetchList', payload: { keyWord: '', loadingMore: false, applyforChangeList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const { ChangeApplyModel } = this.props
    const titleProps = {
      title: '转换申请查询',
      showBack: 'yes',
    };
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
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
            <InqueryList ChangeApplyModel={ChangeApplyModel} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectProps({ ChangeApplyModel }) {
  return { ChangeApplyModel }
}

export default connect(connectProps)(InvestorApplyInqueryCnt);
