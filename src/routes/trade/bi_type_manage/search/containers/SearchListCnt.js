import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import rebutStyles from '../../../../../styles/trade/redeem.less';
import FilterItem from '../components/FilterItem'
import SearchList from '../components/SearchList'

class SearchListCnt extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isFilter: false,
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const filterArgs = {}
    dispatch({ type: 'SearchModel/clear', payload: { keyWord: '', loadingMore: false, rejectList: [], filterArgs } });
  }

  onOpenChange= () => {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord= (filterArgs) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SearchModel/fetchList',
      payload: {
        filterArgs,
        loadingMore: false,
        searchList: [],
      },
    })
    this.setState({ open: !this.state.open });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'SearchModel/fetchList', payload: { keyWord: value, loadingMore: false, searchList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'SearchModel/fetchList', payload: { keyWord: '', loadingMore: false, searchList: [] } });
  }

  render() {
    const { isFilter } = this.state;
    const sidebar = (<FilterItem close={this.onCloseMethord} />)
    const titleProps = {
      title: '双录查询列表',
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
            <SearchBar placeholder="产品名称/客户名称" onSubmit={this.search} onClear={this.clear} />
          </div>
          <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }}>
            <SearchList searchList={this.props.SearchModel.searchList} searchModel={this.props.SearchModel} dispatch={this.props.dispatch} />
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectProps({ SearchModel }) {
  return { SearchModel };
}

export default connect(connectProps)(SearchListCnt);
