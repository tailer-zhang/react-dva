import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { ListView } from 'antd-mobile';
import styles from '../../styles/trade/CustomerShareList.less';
import EmptyResult from '../../components/share/EmptyResult';
import Dic from "../../utils/dictionary";


export default class CustomerShareList extends Component {
  constructor(){
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
    const { loadingMore, reach_bottom } = this.props.trade;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'trade/fetchCustAmtDiviList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    const { dispatch } = this.props;
    dispatch({type:'trade/fetch',payload:{touchItem:data}});
    dispatch(routerRedux.push({ pathname: '/customerShareDetail', state: data }))
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#efeff4', height: 20 }} />
    )
  }

  row=(rowData, sectionID, rowID) => {
    return (
      <div
        key={rowID}
        className={styles.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={styles.head}>
          {rowData.prodName}
        </div>
        <div className={styles.mid}>
          <p>{rowData.shrType}</p>
        </div>
        <div className={styles.footer}>
          <div>
            <p>{rowData.custName}</p>
            <p>客户名称</p>
          </div>
          <div>
            <p>预付金额：<span>{rowData.refundAmt}元</span></p>
            <p>预付时间：<span>{rowData.refundAbleDate}</span></p>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.trade;
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
    const { custAmtDiviList } = this.props.trade
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(custAmtDiviList)}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', border: '1px solid #ddd', margin: '0.1rem 0' }}
          // contentContainerStyle={{ width: document.body.clientWidth }}
          pageSize={4}
          scrollRenderAheadDistance={20}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
      </div>);
  }
}
