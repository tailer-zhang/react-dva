import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView } from 'antd-mobile';
import searchListStyle from '../style/searchList.less';
import Dic from '../../../../../utils/dictionary';

class SearchList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.searchModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return;
    dispatch({ type: 'SearchModel/fetchList', payload: { loadingMore: true } });
  }

  getOptions() {
    return ({
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: '银领定增',
        arrow: 'empty',
      },
      prodCode: {
        valueType: 'selfSelect',
        desc: '产品代码',
        extra: 'YK08976',
        arrow: 'empty',
      },
      customerName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: '小小',
        arrow: 'empty',
      },
      cardNumber: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra: '923838457844',
        arrow: 'empty',
      },
      tradeType: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: 'x',
        arrow: 'empty',
      },
      applyDate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: '2017-09-01',
        arrow: 'empty',
      },
      applyAmount: {
        valueType: 'selfSelect',
        desc: '申请金额(元)',
        extra: '2342',
        arrow: 'empty',
      },
      applyPortion: {
        valueType: 'selfSelect',
        desc: '申请份额(份)',
        extra: '23',
        arrow: 'empty',
      },
      acceptor: {
        valueType: 'selfSelect',
        desc: '受理人员',
        extra: '小田',
        arrow: 'empty',
      },
      recordDtate: {
        valueType: 'selfSelect',
        desc: '录像时间',
        extra: '2017-09-01',
        arrow: 'empty',
      },
      recheckState: {
        valueType: 'selfSelect',
        desc: '复核状态',
        extra: '通过',
        arrow: 'empty',
      },
    })
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: '/itemDetail', state: { from: data.tradPubPriType, source: data, origin: 'multi_searchList', dataSource: { reqSeq: data.reqSeq } } }))
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
        className={searchListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={searchListStyle.head}>
          <div><img src={rowData.tradPubPriType === '01' ? require('../../../../../image/product/private_image.png') : require('../../../../../image/product/public_image.png')} alt=" " /></div>
          <div><p>{rowData.prodName}</p></div>
          <div><p>{Dic.fetchDicValue('tradCode', rowData.tradCode)}</p></div>
          <div>
            <p>{rowData.confStatName}</p>
          </div>
        </div>
        <div className={searchListStyle.mid}>
          <div><p>{rowData.reqAmt !== undefined ? parseFloat(rowData.reqAmt / 10000).toFixed(2) : '--'}<span className={searchListStyle.lastCharacter}>万</span></p></div>
          <div><p>{rowData.custName}</p></div>
        </div>
        <div className={searchListStyle.last}>
          <div><p>申请金额(人民币)</p></div>
          <div><p>客户名称</p></div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.searchModel;
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
          dataSource={this.state.ds.cloneWithRows(this.props.searchList)}
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

export default SearchList;
