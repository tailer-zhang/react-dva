import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView } from 'antd-mobile';
import XTListItem3 from './XTListItem3';//产品列表项
import EmptyResult from '../../components/share/EmptyResult';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';//样式文件


const CusTradeList = ({trade,dispatch,rejectFlag}) => {
  let {SMTradeList,loadingMore,loading} = trade;
  const ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });
   function touchCell(rowData, sectionID, rowID)
   {
    //认、申购
    if(rowData.tradCode=="0020"||rowData.tradCode=="0022"){
      dispatch(routerRedux.push({pathname:'/RebutBuy',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//赎回
    else if(rowData.tradCode=="0024" || rowData.tradCode=="0098"){
      dispatch(routerRedux.push({pathname:'/RebutRedeem',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//撤单
    else if(rowData.tradCode=="0052"){
      dispatch(routerRedux.push({pathname:'/RebutRecall',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//转让
    else if(rowData.tradCode=="0033"){
      dispatch(routerRedux.push({pathname:'/transferDetail',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }
    else if(rowData.tradCode=="0036"){
     dispatch(routerRedux.push({pathname:'/RebutFundChange',state:{tradeDetail:rowData,rejectFlag:'1'}}))
   }//基金转换
    else if(rowData.tradCode=="0071"){
      dispatch(routerRedux.push({pathname:'/Rebutpostpone',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//延期申请
   }
   const row = (rowData, sectionID, rowID) => {
     return (
       <div key={rowID} onClick={()=>touchCell(rowData, sectionID, rowID)}>
        <XTListItem3 data={rowData} rejectFlag={rejectFlag}/>
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
    console.log('0000-----00000',loadingMore)
     if(event==undefined||loadingMore){
       return;
     }else{
     console.log('5555=========',loadingMore)

       dispatch({type:'trade/fetchSMTradeList',payload:{loadingMore:true}});
     }
   };
   if(SMTradeList.length>0){
   return (
     <ListView
         dataSource={ds.cloneWithRows(SMTradeList)}
         renderFooter={() => {
          if(loadingMore)
            return (<div style={{ padding: 30, textAlign: 'center' }}>
            </div>);
          else return <div />;
        }}

         renderRow={row}
         renderSeparator={separator}
         className="fortest"
         style={{
           height: "100%",
         }}
         pageSize={10}
         scrollRenderAheadDistance={1000}
         scrollEventThrottle={50}
         onScroll={() => { console.log('scroll'); }}

         onEndReached={onEndReached}
         onEndReachedThreshold={1000}
       />
       );
   }else if(loading){
    return(<div style={{backgroundColor:'#efeff4'}}></div>);
   }
   return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>)

};
export default CusTradeList;
