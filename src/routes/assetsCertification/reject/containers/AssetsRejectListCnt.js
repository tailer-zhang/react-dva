import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import FilterItem from '../components/FilterItem';
import AssetsRejectList from '../components/AssetsRejectList'
import rebutStyles from '../../../../styles/trade/redeem.less';

class AssetsRejectListCnt extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isFilter: false,
    };
  }

  onOpenChange= () => {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'AssetsRejectModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        assetsRejectList: [],
      },
    })
    this.setState({ open: !this.state.open, isFilter: true });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsRejectModel/fetchList', payload: { keyWord: value, loadingMore: false, assetsRejectList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsRejectModel/fetchList', payload: { keyWord: '', loadingMore: false, assetsRejectList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const { AssetsRejectModel, dispatch } = this.props
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
    const titleProps = {
      title: '资产证明申请驳回',
      showBack: 'yes',
    };

    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular' }}>
        <Drawer
          dragHandleStyle={{ height: '100%', display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          open={this.state.open}
          sidebar={sidebar}
          position='right'
          onOpenChange={this.onOpenChange}
        >
          <div style={{ position: 'fixed', top: '0', zIndex: '0', width: '100%' }}>
            <Title {...titleProps}>
              <div className={rebutStyles.orderImg} onTouchStart={this.onOpenChange.bind(this)}>
                <img src={isFilter === false ? require('../../../../image/icon/orde_02.png') : require('../../../../image/icon/order.png')} />
              </div>
            </Title>
            <SearchBar placeholder="客户名称/产品名称" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }}>
            <AssetsRejectList AssetsRejectModel={AssetsRejectModel} dispatch={dispatch} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectProps({ AssetsRejectModel }) {
  return { AssetsRejectModel };
}

export default connect(connectProps)(AssetsRejectListCnt);
