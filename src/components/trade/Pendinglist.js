import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import pending from '../../styles/trade/pending.less';
import Dic from '../../utils/dictionary';

class Pendinglist extends React.Component {
  constructor() {
    super();
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
    dispatch({ type: 'trade/fetchpostponelist', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    // this.props.dispatch(routerRedux.push({ pathname: 'applyPendingupdate', state: data }))
  }

  type(data, e) {
    const evt = e ? e : window.event;
    if (evt.stopPropagation) {        //W3C
      evt.stopPropagation();
    } else {       //IE
      evt.cancelBubble = true;
    }
    this.props.dispatch(routerRedux.push({ pathname: '/applyPendingupdate', state: { from: 'private', dataSource: data } }))
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
        className={pending.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={pending.head}>
          <div><p>{Dic.fetchDicValue('tradCode', rowData.tradCode)}</p></div>
          <div><p style={{ color: '#000' }}>{rowData.prodName}</p></div>
          <div>
            <Button type="primary" inline size="small" style={{ marginLeft: '0px' }} activeStyle={false} onClick={this.type.bind(this, rowData)}>延期</Button>
          </div>
        </div>
        <div className={pending.sub}>
          {rowData.prodExpiName || '--'}
        </div>
        <div className={pending.mid}>
          <div><p>{rowData.reqAmt !== undefined ? parseFloat(rowData.reqAmt / 10000).toFixed(2) : '--'}<span className={pending.lastCharacter}>万</span></p></div>
          <div><p>{rowData.custName}</p></div>
        </div>
        <div className={pending.last}>
          <div><p>申请金额(人民币)</p></div>
          <div><p>客户名称</p></div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.trade;
    if (reach_bottom) {
      return (
        <div style={{textAlign: 'center'}}>没有更多了</div>
      )
    }
    return (
      <div style={{textAlign: 'center'}}>上拉加载更多</div>
    )
  }

  render() {
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.trade.postponelist)}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', border: '1px solid #ddd', margin: '0.1rem 0' }}
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

export default connect()(Pendinglist);
