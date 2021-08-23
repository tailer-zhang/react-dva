import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import pubTypeListStyle from '../style/pubTypeList.less';

class PubbiTypeInputList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.publicTypeModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'PublicTypeModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(rowData) {
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: 'public', dataSource: rowData } }))
  }

  type(data, e) {
    const evt = e ? e : window.event;
    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {       //IE
      evt.cancelBubble = true;
    }
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: 'public', dataSource: data } }))
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
        className={pubTypeListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={pubTypeListStyle.head}>
          <div className={pubTypeListStyle.headTitle}>
            <p>{`(${rowData.prodCode})`}{rowData.prodName}</p>
          </div>
          <div>
            <Button type="primary" inline size="small" style={{ marginLeft: '0px' }} activeStyle={false} onClick={this.type.bind(this, rowData)}>录入</Button>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={pubTypeListStyle.mid}>
          {rowData.fundTypeName ? <p>{rowData.fundTypeName}</p> : null}
          {rowData.prodRiskLevelName ? <p style={{ marginLeft: 10 }}>{rowData.prodRiskLevelName}风险</p> : null}
        </div>
        <div className={pubTypeListStyle.last}>
          <div>
            <p>{rowData.mgrName}</p>
          </div>
          <div>
            <p>{rowData.prodEstaDate ? rowData.prodEstaDate : '--'}</p>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.publicTypeModel;
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
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.publicTypeModel.publicInputList)}
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

export default connect()(PubbiTypeInputList);
