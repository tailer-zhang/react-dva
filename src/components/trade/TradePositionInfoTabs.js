import React, { Component, PropTypes } from 'react';
import { Link,routerRedux } from 'dva/router';
import { ListView } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/trade/tradePositionInfoTabs.less';

const TradePositionInfoTabs = ({custShrListData,dispatch,confAmtCode}) => {
  let {custShrList,loadingMore,loading} = custShrListData;
  const ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });
   function touchCell(rowData, sectionID, rowID)
   {
    dispatch(routerRedux.push({pathname:'/TradeInfoSee',state:{tradeRedeem:rowData,mode:'hide',
        confAmtCode:confAmtCode,openShrId:rowData.openShrId?rowData.openShrId:'',RedeemLists:true}}));
   }
   const row = (rowData, sectionID, rowID) => {
     return (
       <div key={rowID} style={{paddingLeft:'0.4rem',paddingBottom:'0.4rem',fontFamily:'PingFangSC-Regular'}} onClick={()=>touchCell(rowData, sectionID, rowID)}>
         <p className={styles.p1} style={{paddingTop:'0.4rem'}}>{rowData.custName}</p>
         <p className={styles.p2}>{rowData.prodName}</p>
         <div className={styles.flex}>
           <div className={styles.left} style={{textAlign:'left'}}>
             <p>{rowData.totShr}<em></em></p>
             <span>持有份额(份)</span>
           </div>
           <div className={styles.right} style={{textAlign:'left'}}>
             <p>{rowData.avlShr}<em></em></p>
             <span>可用份额(份)</span>
           </div>
         </div>
       </div>
     );
   };

   const separator = (sectionID, rowID) => (
     <div key={`${sectionID}-${rowID}`} style={{
       backgroundColor: '#efeff4',
       height: 20,
     }}
     />
   );


   const onEndReached=(event)=>{

     if(event==undefined||loadingMore){
       return;
     }else{
       dispatch({type:'trade/fetchCustShrList',payload:{loadingMore:true}});
     }
   };
  //  let {custShrList,loadingMore, loading} = custShrListData;
  if(custShrList.length>0){
    return (
     <ListView
          dataSource={ds.cloneWithRows(custShrList)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{ padding: 20, textAlign: 'center',display:'none' }}>
             </div>);
           else return <div />;
         }}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          style={{
            height:"100%",
            overflow: 'auto',
          }}
          pageSize={10}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={50}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={onEndReached}
          onEndReachedThreshold={1000}
        />	);
  }else if (loading) {
    return (<div style={{backgroundColor:'#efeff4'}}></div>);
  }
  return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>);

}

export default TradePositionInfoTabs;
