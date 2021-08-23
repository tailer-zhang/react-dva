//汇款信息组件2 获取上一页数据
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView } from 'antd-mobile';

import remitStyle from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class RemitInfo2 extends React.Component{
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

  touchCell(rowData,sectionID,rowID){
    let {rejectFlag,dispatch } = this.props;
   if(rejectFlag=='1'){
     dispatch(routerRedux.push({pathname:'/CustomerCapiDetail',state:rowData}));
   }else{
    //  dispatch({
    //    type:'',
    //    payload:''
    //  });
   }
 }

  onEndReached(event) {

  }

  render() {
    let { dispatch,dataSource,data,rejectFlag} = this.props;

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
            height:'4.8rem',
            border:'0'
          }}
          onClick = {this.touchCell.bind(this,rowData, sectionID, rowID)}
        >
          <div className={styles.remit}>
             <section className={styles.remitTime} > <p>{rowData.tradTime} </p> </section>
             <div className={styles.remitCard}>
               {
                // <p className={styles.contractNum}>流水号<span>{rowData.capiSeq}</span></p>
               }
                <ul className={styles.transUl}>
                  <li>
                    <p className={styles.transMoney}>{rowData.amount}<span></span></p>
                    <section>汇款金额（人民币）</section>
                  </li>
                  <li>
                    <p style={{width:'96%'}}>{data.custName}</p>
                    <section>汇款人</section>
                  </li>
                </ul>
                <section className={styles.bankType}><span>{rowData.bankName}</span> | <span>{rowData.lendCardNo}</span></section>
             </div>
          </div>
        </div>
      );
    };
    return (<div style={{ margin: '0 auto', width: '96%' }}>
      <ListView ref="lv"
        dataSource={this.state.ds.cloneWithRows(dataSource?dataSource:[])}
        renderRow={row}
        renderSeparator={separator}
        className="fortest"
        style={{
          height: document.body.clientHeight * 5/6,
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
  }
}


export default RemitInfo2;
