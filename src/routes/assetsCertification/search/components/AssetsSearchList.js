import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile'
import style from '../style/searchStyle.less'
import { routerRedux } from 'dva/router';
@connect()
export default class AssetsSearchList extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      ds: ds,
      isLoading: false,
    };
  }

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.AssetsSearchModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'AssetsSearchModel/fetchList', payload: { loadingMore: true } });
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#efeff4', height: 20 }} />
    )
  }

  jumpToDetail(data) {
    const { dispatch } = this.props;
    if (data.chkStatName === '待总审') {
      dispatch(routerRedux.push({ pathname: '/beingProcessed', state: { dataSource: data } }))
    } else if (data.chkStatName === '总审通过') {
      dispatch(routerRedux.push({ pathname: '/approvedCnt', state: { dataSource: data } }))
    } else if (data.chkStatName === '总审退回') {
      dispatch(routerRedux.push({ pathname: '/searchRejectDetail', state: { dataSource: data } }))
    }
  }

  row = (data, sectionId, rowId) => {
    return (
      <div className={style.container} onClick={this.jumpToDetail.bind(this, data)}>
        <div className={style.header}>
          <div>{data.custName}</div>
          <div><p>{data.chkStatName}</p></div>
          <div style={{ clear: 'both' }} />
        </div>
        <div className={style.separator} />
        <div className={style.title}>
          {data.prodNames}
        </div>
        <div className={style.mid}>
          {data.managerName}
        </div>
        <div style={{ clear: 'both' }} />
        <div className={style.last}>
          <div>{data.createTime}</div>
          <div>{data.formatName}</div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    )
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.AssetsSearchModel;
    if (reach_bottom) {
      return (
        <div>没有更多了</div>
      )
    }
    return (
      <div>上拉加载更多</div>
    )
  }

  render() {
    const { assetsSearchList } = this.props.AssetsSearchModel
    return (
      <ListView
        ref="lv"
        dataSource={this.state.ds.cloneWithRows(assetsSearchList)}
        renderRow={this.row}
        renderSeparator={this.separator}
        className="am-list"
        style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', width: '100%', overflowX: 'hidden' }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReachedThreshold={1000}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
      />
    )
  }
}
