//我的预约 交易信息详情 交易确认份额组件

import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView } from 'antd-mobile';
import Dic from '../../utils/dictionary';

import remitStyle from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const TradeCard = React.createClass({
  getInitialState() {
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    return {
      ds:ds,
      isLoading: false,
    };
  },

  onEndReached(event) {

  },

  render() {
    let { dispatch,dataSource,confAmtCode} = this.props;
    console.log("卡卡卡卡扩",dataSource);
    // function touchCell(rowData,sectionID,rowID){
    //   dispatch(routerRedux.push({pathname:'/RecallDetail',state:rowData}));
    //   console.log("顶顶顶顶",rowData);
    // }
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}
          style={{
            backgroundColor: '#efeff4',
            width:'100%',
            height:' 4.733rem'
          }}
          onClick={({})=>{
            if(confAmtCode=='1'){
              dispatch(routerRedux.push({pathname:'/CustomerConfAmt',state:{rowData:rowData}}));
            }
            else{
              confAmtCode == '';
              return ;
            }
          }}
        >
          <div className={styles.trade}>
             <section className={styles.remitTime}><p>{rowData.confDate} </p> </section>
             <div className={styles.remitCard}>
                <p className={styles.contractNum}>{Dic.fetchDicValue('tradCode1',rowData.confTradCode)}</p>
                <ul className={styles.transUl}>
                  {
                    (rowData.reqAmt && rowData.reqAmt>0) ?
                      (<li>
                      <p className={styles.transMoney}>{rowData.reqAmt}<span></span></p>
                      <section>申请金额(人民币)</section>
                      </li>) : (<li>
                              <p className={styles.transMoney}>{rowData.reqShr}<span></span></p>
                              <section>申请份额(份)</section>
                              </li>)
                  }
                  <li>
                    <p className={styles.partOk}>{rowData.confShr}</p>
                    <section>确认份额(份)</section>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      );
    };
    return (<div style={{ margin: '0 auto', width: '96%' }}>
      <ListView ref="lv"
        dataSource={this.state.ds.cloneWithRows(dataSource)}
        renderRow={row}
        renderSeparator={separator}
        className="fortest"
        style={{
          height: document.body.clientHeight * 1,
          overflow: 'auto',
          margin: '0.1rem 0',
        }}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    </div>);
  },
});


export default TradeCard;
