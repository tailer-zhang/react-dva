import React, { PropTypes, Component } from 'react';
import { routerRedux } from 'dva/router';
import managerStyle from '../style/managerStyle.less';
import { List, ListView, Badge } from 'antd-mobile';
import Dic from '../../../../utils/dictionary';

export default class Managerlist extends React.Component{

  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
      ds:ds,
      isLoading:false
    };
  }

  onEndReached() {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.customer;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'customer/fetchManagersList', payload: { loadingMore: true } });
  }


  clickCell(rowData, sectionID, rowID, e) {
    const { location, dispatch } = this.props;
    const { mode, select, withOutGoBack } = location.state;
    if (mode === 'selectManagers') {
      if (select)
        select(rowData);
      if (!withOutGoBack)
        dispatch(routerRedux.goBack());
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const { location } = this.props;
    const { selectManager } = location.state;
    return (
      <div
        key={rowID}
        style={{
          padding: '0.1rem  0.4rem 0.3rem',
          backgroundColor: selectManager.key === rowData.key ? '#cccccc' : 'white',
        }}
        onClick={this.clickCell.bind(this, rowData, sectionID, rowID)}
      >
        <div className="my-list">
          <div>
            <div className={managerStyle.userInfo}>
              <div className={managerStyle.arrow}>
                <img src={require('../../../../image/icon/arrow_r.png')} />
              </div>
              <p className={managerStyle.userName}>{rowData.value}</p>
              <p className={managerStyle.userId}>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.customer;
    if (reach_bottom) {
      return (
        <div style={{ textAlign: 'center' }}>没有更多了</div>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>上拉加载更多</div>
    )
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{ borderBottom: '1px solid #dcdcdc' }} />
    );
    const { managerList } = this.props;
    return (<div style={{ width: '100%' }}>
      <ListView
        dataSource={this.state.ds.cloneWithRows(managerList)}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={separator}
        className="fortest"
        useBodyScroll
        pageSize={4}
        scrollRenderAheadDistance={30}
        scrollEventThrottle={100}
        onScroll={() => { console.log('scroll'); }}
        onEndReached={this.onEndReached.bind(this)}
        renderFooter={this.renderFooter}
        onEndReachedThreshold={10}
      />
    </div>);
  }
}
