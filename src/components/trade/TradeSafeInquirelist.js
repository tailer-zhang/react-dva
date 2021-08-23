import React from 'react';
import { ListView } from 'antd-mobile';
import {routerRedux} from 'dva/router';
import Dic from '../../utils/dictionary';
import styles from '../../styles/trade/tradeSafeInquireList.less';
import EmptyResult from '../../components/share/EmptyResult';

class CustomerInquireList extends React.Component{
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

  onEndReached(event) {
    let {dispatch,dataSource} = this.props;
    let {loadingMore} = dataSource;
    if(event == undefined||loadingMore) return;
    else dispatch({
      type: 'tradeSafe/tradeInquire',
      payload: {loadingMore: true}
    })
  }

  clickCell(rowData, sectionID, rowID)
  {
    let {dispatch} = this.props;
    dispatch(routerRedux.push({pathname:'/tradeSafeContract',state:{
      mgrCode: rowData.mgrCode,rejectFlag: '1',id: rowData.id
    }}));
  }

  renderRow(rowData, sectionID, rowID)
  {
      return (
        <div key={rowID}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
          style={{
            padding: '0  0.4rem 0.6133333rem',
            backgroundColor: 'white',
          }}>
          <div className={styles.wrap}>
            <p className={styles.code}>{rowData.contNo}</p>
            <p className={styles.pass}>{rowData.confStatName}</p>
          </div>
          <div className={styles.flex}>
            <div className={styles.des}>
              <h3>{rowData.premiumYear}</h3>
              <span style={{color: '#848484',fontSize: '0.32rem',fontFamily: 'PingFangSC-Light',}}>交易金额({Dic.fetchDicValue('payCurType',rowData.payCurType)}/年)</span>
            </div>
            <div className={styles.title}>
            <h3>{rowData.custName}</h3>
            <p>客户名称</p>
            </div>
          </div>
        </div>
      );
  }

  render() {
    // 中间间隔
    let {dispatch,dataSource} = this.props;
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loadingMore,loading,tradeSafeList} = dataSource;
    // if(tradeSafeList.length>0)
    if(tradeSafeList&&tradeSafeList.length>0) {
      return (<div style={{height:'100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(tradeSafeList?tradeSafeList:[])}
          renderFooter={() =>
            {
              if(loadingMore) {
                <div style={{ padding: 30, textAlign: 'center' }}></div>
              } else{
                return <div />
              }
            }
          }
          renderRow={this.renderRow.bind(this)}
          renderSeparator={separator}
          className="am-list"
          style={{
            // height: document.body.clientHeight-10,
            height:'100%',
            // paddingTop: '2.66rem',
            overflow: 'auto',
          }}
          pageSize={10}
          scrollRenderAheadDistance={50}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={30}
        />
      </div>)
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    } else {
      return <div className={styles.empty}><EmptyResult /></div>
    }
  }
};


export default CustomerInquireList;
