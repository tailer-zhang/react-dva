import React from 'react';
import { ListView } from 'antd-mobile';
import {routerRedux} from 'dva/router';
import Dic from '../../utils/dictionary';
import styles from '../../styles/trade/tradeReject.less';
import EmptyResult from '../../components/share/EmptyResult';

class TradeUnsubmittedList extends React.Component{
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

  clickCell(rowData, sectionID, rowID,e)
  {
    // e.preventDefault();
    let {dispatch} = this.props;
    dispatch(routerRedux.push({
      pathname:'/tradeUnsubmittedDetail',
      state:{
        // rejectFlag: 0,
        // id: rowData.id,
        rejectData: rowData
      }
    }));
  }

  onEndReached(event) {
    let {dispatch,dataSource} = this.props;
    let {loadingMore} = dataSource;
    if(event == undefined||loadingMore) return;
    else dispatch({
      type: 'tradeSafe/tradeInquire',
      payload: {loadingMore: true,confStat:'0'}
    })
  }

  renderRow(rowData, sectionID, rowID)
  {
      return (
        <div key={rowID}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
          style={{
            padding: '0 0.4rem 0.6133333rem',
            backgroundColor: 'white',
          }}>
          <div className={styles.total}>
            <div style={{display: 'flex'}}>
              <p className={styles.code}>{rowData.contNo}</p>
              <p className={styles.pass}>{rowData.confStatName}</p>
            </div>
            <div style={{display: 'flex'}}>
              <div style={{flex: '2.5'}}>
                <h3 className={styles.des}>{rowData.premiumYear}<span className={styles.year}></span></h3>
                <span className={styles.dolar}>交易金额({Dic.fetchDicValue('payCurType',rowData.payCurType)})</span>
              </div>
              <div style={{flex: '1.5',display: 'flex',flexDirection: 'column'}}>
              <h3 className={styles.title}>{rowData.custName}</h3>
              <p className={styles.customer}>客户名称</p>
              </div>
            </div>
          </div>
        </div>
      );
  }

  render() {
    // 中间间隔
    let {dispatch,dataSource} = this.props;
    console.log('data======',dataSource);
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loading,loadingMore,tradeSafeList} = dataSource;
    if(tradeSafeList&&tradeSafeList.length>0) {
      return (<div style={{ width: '100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(tradeSafeList?tradeSafeList:[])}
          renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
            {/*{this.state.isLoading ? '加载中...' : '加载完毕'}*/}
          </div>}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: document.body.clientHeight,
            overflow: 'auto',
          }}
          pageSize={10}
          scrollRenderAheadDistance={50}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={10}
        />
      </div>)
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    } else{
      return <div className={styles.empty}><EmptyResult /></div>
    }
  }
};


export default TradeUnsubmittedList;
