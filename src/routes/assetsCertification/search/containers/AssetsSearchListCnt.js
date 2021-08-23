import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import FilterItem from '../components/FilterItem';
import AssetsSearchList from '../components/AssetsSearchList'
import rebutStyles from '../../../../styles/trade/redeem.less';

class AssetsSearchListCnt extends React.Component {
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
      type: 'AssetsSearchModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        assetsSearchList: [],
      },
    })
    this.setState({ open: !this.state.open, isFilter: true });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsSearchModel/fetchList', payload: { keyWord: value, loadingMore: false, assetsSearchList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsSearchModel/fetchList', payload: { keyWord: '', loadingMore: false, assetsSearchList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const { AssetsSearchModel, dispatch } = this.props
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
    const titleProps = {
      title: '资产证明申请查询',
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
            <AssetsSearchList AssetsSearchModel={AssetsSearchModel} dispatch={dispatch} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectProps({ AssetsSearchModel }) {
  return { AssetsSearchModel };
}

export default connect(connectProps)(AssetsSearchListCnt);
