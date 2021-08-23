import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import FilterItem from '../components/FilterItem';
import rebutStyles from '../../../../../styles/trade/redeem.less';
import PubbiTypeInputList from '../components/PubbiTypeInputList'

class PubbiTypeInputListCnt extends React.Component {
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
      type: 'PublicTypeModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        publicInputList: [],
      },
    })
    this.setState({ open: !this.state.open, isFilter: true });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'PublicTypeModel/fetchList', payload: { keyWord: value, loadingMore: false, publicInputList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'PublicTypeModel/fetchList', payload: { keyWord: '', loadingMore: false, publicInputList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const { PublicTypeModel, dispatch } = this.props;
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
    const titleProps = {
      title: '公募双录录入',
      showBack: 'no',
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
            <SearchBar placeholder="产品名称/产品简称/产品代码" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }}>
            <PubbiTypeInputList publicTypeModel={PublicTypeModel} dispatch={dispatch} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectPublicModle({ PublicTypeModel }) {
  return { PublicTypeModel }
}

export default connect(connectPublicModle)(PubbiTypeInputListCnt);
