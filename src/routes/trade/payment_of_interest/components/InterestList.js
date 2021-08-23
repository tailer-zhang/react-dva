import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, WhiteSpace } from 'antd-mobile';
import interestStyle from '../style/interestStyle.less';

class InterestList extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      ds,
      isLoading: false,
    };
  }

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.interestModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return;
    dispatch({ type: 'InterestModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(rowData) {
    this.props.dispatch(routerRedux.push({ pathname: '/interestDetail', state: { dataSource: rowData } }))
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
        className={interestStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={interestStyle.head}>
          <div><p>{rowData.prodName}</p></div>
        </div>
        <div className={interestStyle.shrType}>{rowData.shrType}</div>
        {rowData.earnTypeName ? <div className={interestStyle.shrType1}>{rowData.earnTypeName}</div> : null}
        <div className={interestStyle.mid}>
          <div><p>{rowData.custName}</p></div>
          <div><p>交易金额(元):<span className={interestStyle.lastCharacter}>&nbsp;{rowData.reqAmt || '--'}</span></p></div>
        </div>
        <div className={interestStyle.last}>
          <div><p>客户名称</p></div>
          <div><p>收益分配基准日:&nbsp;<span className={interestStyle.lastCharacter}>{rowData.interestDate || '--'}</span></p></div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.interestModel;
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
    const { interestModel } = this.props
    console.log('____', interestModel)
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(interestModel.interestList)}
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

function mapStateToProps({ PrivateTypeModel }) {
  return { PrivateTypeModel }
}

export default connect()(InterestList);
