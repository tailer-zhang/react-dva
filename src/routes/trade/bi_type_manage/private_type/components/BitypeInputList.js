import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import typeListStyle from '../style/typeList.less';
import Dic from '../../../../../utils/dictionary';

class BitypeInputList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.privateTypeModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'PrivateTypeModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: 'biTypeInputItemDetailCnt', state: data }))
  }

  type(data, e) {
    const evt = e ? e : window.event;
    if (evt.stopPropagation) {        //W3C
      evt.stopPropagation();
    } else {       //IE
      evt.cancelBubble = true;
    }
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: 'private', dataSource: data } }))
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
        className={typeListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={typeListStyle.head}>
          <div><p>{Dic.fetchDicValue('tradCode', rowData.tradCode)}</p></div>
          <div><p style={{ color: '#000' }}>{rowData.prodName}</p></div>
          <div>
            <Button type="primary" inline size="small" style={{ marginLeft: '0px' }} activeStyle={false} onClick={this.type.bind(this, rowData)}>录入</Button>
          </div>
        </div>
        <div className={typeListStyle.mid}>
          <div><p>{rowData.reqAmt !== undefined ? parseFloat(rowData.reqAmt / 10000).toFixed(2) : '--'}<span className={typeListStyle.lastCharacter}>万</span></p></div>
          <div><p>{rowData.custName}</p></div>
        </div>
        <div className={typeListStyle.last}>
          <div><p>申请金额(人民币)</p></div>
          <div><p>{rowData.inveTypeName}</p></div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.privateTypeModel;
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
          dataSource={this.state.ds.cloneWithRows(this.props.privateTypeModel.privateInputList)}
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

export default connect()(BitypeInputList);
