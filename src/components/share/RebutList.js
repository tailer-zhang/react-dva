//交易 驳回修改列表
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button,ListView } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import EmptyResult from '../../components/share/EmptyResult';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class RebutList extends React.Component {
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
    let { trade,dispatch } = this.props;
    let {loadingMore,loading} = trade;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'trade/fetchTaskList',payload:{loadingMore:true}});
    }
  }


  render() {
    let { dispatch,dataSource,trade } = this.props;
    let { loadingMore,loading} = trade;
    function selectPage(rowData, sectionID, rowID){
      if(rowData.tradCode=="0020"||rowData.tradCode=="0022"){
        dispatch(routerRedux.push({pathname:'/RebutBuy',state:null?{}:{tradeDetail:rowData,rejectFlag:'0'}}))
      }
      else if(rowData.tradCode=="0024" || rowData.tradCode=="0098"){
        dispatch(routerRedux.push({pathname:'/RebutRedeem',state:null?{}:{tradeDetail:rowData,rejectFlag:'0'}}))
      }
      else if(rowData.tradCode=="0052"){
        dispatch(routerRedux.push({pathname:'/RebutRecall',state:null?{}:{tradeDetail:rowData,rejectFlag:'0'}}))
      }
      else if(rowData.tradCode=="0036"){
        dispatch(routerRedux.push({pathname:'/RebutFundChange',state:null?{}:{tradeDetail:rowData,rejectFlag:'0'}}))
      }
      else if(rowData.tradCode=="0071"){
        dispatch(routerRedux.push({pathname:'/Rebutpostpone',state:null?{}:{tradeDetail:rowData,rejectFlag:'0'}}))
      }
      else if(rowData.tradCode=="0033"){
        dispatch(routerRedux.push({
          pathname:'/TransferReject',
          state:{
            data:rowData,
            tradeDetail:rowData,
            transfer:'0',
            originData: location.state,
            type:rowData.transferFlag,
            rejectFlag:'0'
          }}))
      }
    };
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      let tradCode = rowData.tradCode,desc='',value='';
      if(tradCode=='0024'||tradCode=='0033')//赎回或转让
      {
        desc = '申请份额(份)';
        value = rowData.reqShr;
      }
      else if(tradCode=='0052'&&rowData.reqShr)
      {
        desc = '申请份额(份)';
        value = rowData.reqShr;
      }
      else if(tradCode == '0071') {
        desc = '延期申请(天)';
        value = rowData.postponeCount;
      }
      else if(tradCode == '0036') {
        desc = '转换份额(份)';
        value = rowData.reqShr;
      }

      else {
        desc = '申请金额(元)';
        value = rowData.reqAmt;
      }

      return (
        <div key={rowID}
          style={{
            padding: '0.4rem 0.4rem',
            backgroundColor: 'white',
            width:'100%',
            height:'3.3335rem'
          }}
          className={redeemList.list}
          onClick={ ()=>selectPage(rowData, sectionID, rowID) }
        >
          <section className={redeemList.listTitle2}>
            <div className={redeemList.prodName} style={{width:'51%'}}>{rowData.prodName}</div>
            <div className={redeemList.auditCust} style={{width:'49%',paddingTop:' 0.133rem'}}>
              <p className={redeemList.tradeType} style={{width:'34%',lineHeight:'0.5rem',margin:'0'}}>{rowData.tradCodeName}</p>
              <p style={{float:'right',width:'auto',margin:'0',lineHeight:'0.4667rem',padding: '0 0.16rem',display: 'inline-block',}} className={redeemList.auditType}>{Dic.fetchDicValue('confStat',rowData.confStat)}</p>
            </div>
          </section>
          <div>
            <ul className={styles.redeemUl}>
              <li>
                <p className={styles.transMoney}>{value}<span></span></p>
                <section>{desc}</section>
              </li>
              <li>
              <p className={styles.listUname}>{rowData.custName}</p>
              <section>客户名称</section>
              </li>
            </ul>
          </div>
        </div>
      );
    };

    if(dataSource.length>0){
      return (<div style={{height:'100%',width: '100%' }}>
        <ListView ref="lv"
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{ padding: 20, textAlign: 'center' }}>
             </div>);
           else return <div />;
         }}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          style={{
            height:"100%",
          }}
          pageSize={10}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={50}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={500}
        />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>);
  }
}


export default RebutList;
