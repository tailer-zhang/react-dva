import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import regAuth from '../../styles/trade/regAuth.less';
import Dic from '../../utils/dictionary';

class RegAuthList extends React.Component {
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
    dispatch({ type: 'trade/fetchCustRegisterList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: 'regAuthDetail', state: { dataSource: data } }))
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
        className={rowData.registerFlag && rowData.registerFlag === '1'? regAuth.listDone :  regAuth.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={regAuth.head}>
          <div>
            {rowData.registerFlag && rowData.registerFlag === '1'?<img className={regAuth.custDone} src={require('../../image/trade/cust_done_certi.png')}/>: <img src={require('../../image/trade/cust_incom_certi.png')}/>}
          </div>
          <div>
            <p className={regAuth.custName}>{rowData.custName}</p>
            <p className={regAuth.prodName}>{rowData.prodName}</p>
            {rowData.registerFlag && rowData.registerFlag === '1'?<p className={regAuth.prodName}>{rowData.registerTime}</p>:''}

          </div>
          <div className={rowData.registerFlag && rowData.registerFlag === '1' ?regAuth.larrowDone :  regAuth.arrow }>
            <img  src={require("../../image/icon/arrow_r.png")}/>
          </div>
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
          dataSource={this.state.ds.cloneWithRows(this.props.trade.custRegisterList)}
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

export default connect()(RegAuthList);
