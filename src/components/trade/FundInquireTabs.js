import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory } from 'dva/router';
import { ListView } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/trade/fondInquireTabs.less';
import Dic from '../../utils/dictionary';

// trade.custamtList
const FoundInquireTabs = ({custAmtListData,dispatch}) => {
  let {custamtList,loadingMore,loading} = custAmtListData;
  const ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });
   function touchCell(rowData, sectionID, rowID)
   {
     dispatch({type:'trade/fetch',payload:{touchItem:rowData}});
     dispatch(routerRedux.push('/fundDetail'));
   }
   const row = (rowData, sectionID, rowID) => {
     return (
       <div key={rowID} onClick={()=>touchCell(rowData, sectionID, rowID)} style={{paddingLeft:'0.4rem',paddingBottom:'0.4rem',fontFamily:'PingFangSC-Regular'}}>
         <div className={styles.wrap} style={{paddingRight:'0.4rem'}}>
           <p className={styles.code}><span className={styles.type} style={{display:'block',fontSize:'0.32rem',marginRight:'8px',lineHeight:'0.5rem'}}>{Dic.fetchDicValue('tradCode',rowData.tradCode)}</span>{rowData.contNo}</p>
         </div>
         <div className={styles.flex}>
           <div className={styles.des}>
             <h3>{rowData.amount}<em></em></h3>
             <span style={{color: '#848484',fontSize: '0.3467rem'}}>转账金额(人民币 )</span>
           </div>
           <div className={styles.title}>
           <h3>{rowData.custName}</h3>
           <p>客户名称</p>
           </div>
         </div>
       </div>
     );
   };
   const separator = (sectionID, rowID) => (
     <div key={`${sectionID}-${rowID}`} style={{
       backgroundColor: '#F5F5F9',
       height: 18,
     }}
     />
   );
   const onEndReached=(event)=>{
     if(event==undefined||loadingMore){
       return;
     }else{
       dispatch({type:'trade/fetchCustamtList',payload:{loadingMore:true}});
     }
   };
   if(custamtList.length>0){
     return (
       <ListView
           dataSource={ds.cloneWithRows(custamtList)}
           renderFooter={() => {
             return <div />;
           }}
           renderRow={row}
           renderSeparator={separator}
           className="am-list"
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

}


export default FoundInquireTabs;
