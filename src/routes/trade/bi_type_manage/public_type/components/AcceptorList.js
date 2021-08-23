import React, { PropTypes, Component } from 'react';
import { routerRedux } from 'dva/router';
import acceptorStyle from '../style/acceptorStyle.less';
import { List, ListView, Badge } from 'antd-mobile';
import Dic from '../../../../../utils/dictionary';

export default class AcceptorList extends React.Component{

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
    dispatch({ type: 'customer/fetchAcceptorsList', payload: { loadingMore: true } });
  }


  clickCell(rowData, sectionID, rowID, e) {
    const { location, dispatch } = this.props;
    const { mode, select, withOutGoBack } = location.state;
    if (mode === 'slelectAcceptor') {
      if (select)
        select(rowData);
      if (!withOutGoBack)
        dispatch(routerRedux.goBack());
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const { location } = this.props;
    const { selectAcceptor } = location.state;
    return (
      <div
        key={rowID}
        style={{
          padding: '0  0.4rem 0.6133333rem',
          backgroundColor: selectAcceptor.videoPerson === rowData.value ? '#cccccc' : 'white',
        }}
        onClick={this.clickCell.bind(this, rowData, sectionID, rowID)}
      >
        <div className="my-list">
          <div style={{ paddingTop: '40px' }}>
            <div className={acceptorStyle.userInfo}>
              <div className={acceptorStyle.arrow}>
                <img src={require('../../../../../image/icon/arrow_r.png')} />
              </div>
              <p className={acceptorStyle.userName}>{rowData.value}</p>
              <p className={acceptorStyle.userId}>
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
    // return (
    //   <div style={{ textAlign: 'center' }}>上拉加载更多</div>
    // )
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{ borderBottom: '1px solid #dcdcdc' }} />
    );
    const { acceptorList } = this.props;
    return (<div style={{ width: '100%' }}>
      <ListView
        dataSource={this.state.ds.cloneWithRows(acceptorList)}
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
