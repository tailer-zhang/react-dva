import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView } from 'antd-mobile';
import rejectListStyle from '../style/rejectList.less';
import Dic from '../../../../../utils/dictionary';

class RejectList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.rejectModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return;
    dispatch({ type: 'RejectModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(rowData) {
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: rowData.tradPubPriType, dataSource: rowData } }))
  }

  type= (e) => {
    const evt = e ? e : window.event;
    if (evt.stopPropagation) {        //W3C
      evt.stopPropagation();
    } else {       //IE
      evt.cancelBubble = true;
    }
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
        className={rejectListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={rejectListStyle.head}>
          <div><p>{Dic.fetchDicValue('tradCode', rowData.tradCode)}</p></div>
          <div><p>{rowData.prodName}</p></div>
          <div>
            <p>{rowData.confStatName}</p>
          </div>
        </div>
        <div className={rejectListStyle.mid}>
          <div><p>{rowData.reqAmt !== undefined ? parseFloat(rowData.reqAmt / 10000).toFixed(2) : '--'}<span className={rejectListStyle.lastCharacter}>万</span></p></div>
          <div><p>{rowData.custName}</p></div>
        </div>
        <div className={rejectListStyle.last}>
          <div><p>申请金额(人民币)</p></div>
          <div><p>客户名称</p></div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.rejectModel;
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
          dataSource={this.state.ds.cloneWithRows(this.props.rejectModel.rejectList)}
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

function mapStateToProps({ PrivateTypeModel }) {
  return { PrivateTypeModel }
}

export default connect(mapStateToProps)(RejectList);
