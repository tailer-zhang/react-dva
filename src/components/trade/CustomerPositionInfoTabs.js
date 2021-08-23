//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
import { List, Button ,ListView } from 'antd-mobile';
import CompListTitle2 from '../../components/share/CompListTitle2';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/customer/customerAdd.less';
import redeemList from '../../styles/trade/redeem.less';

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const RedList = (props)=>{
  let { rowData } = props;
  return (
    <div>
      <div>
        <section className={redeemList.listTitle2}>
          <div className={redeemList.prodName} style={{width:'85%'}}>{ rowData.prodName}</div>
          <div className={redeemList.redeemBtn} style={{width:'14%',backgroundColor:'#f22f33',borderRadius:'0.13333rem'}}>转让</div>
        </section>
      </div>
      <ul className={styles.redeemUl} >
        <li>
          <p className={styles.transMoney}>{ rowData.totShr }<span></span></p>
          <section>持有份额(份)</section>
        </li>
        <li>
          <p className={styles.listUname}>{ rowData.custName }</p>
          <section>客户名称</section>
        </li>
      </ul>
    </div>
  )
}

class CustomerPositionInfoTabs extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
      ds:ds,
      isLoading:false
    };
  }

  onEndReached(event) {
    console.log("000000000000000000000000000");
    let { tradeRedList,dispatch } = this.props;
    let {loadingMore} = tradeRedList;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'trade/fetchSharetransList',payload:{loadingMore:true}});
    }

  }

  render() {

    let { dispatch,dataSource,tradeRedList,type } = this.props;
    let { loadingMore,loading} = tradeRedList;
    // function touchCell(rowData,sectionID,rowID){
    //   dispatch(routerRedux.push({pathname:'/TradeInfoSee',state:{tradeRedeem:rowData,mode:'show'}}));
    // }
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height: 20,
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}
             style={{
               padding: '0.4rem 0.4rem',
               width:'100%',
               height:'3.3335rem'
             }}
             onClick={()=>dispatch(routerRedux.push({
               pathname:'/TradeInfoSee',
               state:{
                 tradeRedeem:rowData,
                 mode:'transfer',
                 type:type
               }}))}
        >
          <RedList rowData={rowData}/>
        </div>
      );
    };
    if(dataSource.length>0){
      return (<div style={{ width: '100%',height:'100%' }}>
        <ListView ref="lv"
                  dataSource={this.state.ds.cloneWithRows(dataSource)}
                  renderFooter={() => {
                    if(loadingMore)
                      return (<div style={{ padding: 0, textAlign: 'center' }}>
                      </div>);
                    else return <div />;
                  }}
                  style={{
                    height:'100%'
                  }}
                  renderRow={row}
                  renderSeparator={separator}
                  className="am-list"
                  pageSize={10}
                  scrollRenderAheadDistance={1000}
                  scrollEventThrottle={50}
                  onEndReached={this.onEndReached.bind(this)}
                  onEndReachedThreshold={1000}
        />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/> </div>);
  }
}

export default CustomerPositionInfoTabs;
