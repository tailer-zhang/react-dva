import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { ListView } from 'antd-mobile';

const ProductData = ({proDataList,loadingMore,dispatch})=>{
  const ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });

   //
   //    href="http://10.130.37.172/vpExcel.xlsx"
   const row = (rowData, sectionID, rowID) => {

     return (
       <div key={rowID} className={proDetailStyles.dataPadding} onClick={()=>{
                   dispatch(routerRedux.push({pathname:'/filePreview', state:rowData}));
           }}>
         <div className={proDetailStyles.dataItem}>
           <div className={proDetailStyles.dataItemLeft}>
             <img src={require("../../image/icon/pdf.png")} className={proDetailStyles.dataImg}/>
             <div className={proDetailStyles.title_time}>
               <h3>{rowData.srcFileName}</h3>
               <p className={proDetailStyles.txt1}>
                 <span>{rowData.updateTime}</span>
                 <span></span>
               </p>
             </div>
           </div>
           <div className={proDetailStyles.touchWrap}>
             <img src={require("../../image/icon/arrow_r.png")} className={proDetailStyles.downLoadIcon}/>
           </div>
         </div>
       </div>
     );
   };

   const separator = (sectionID, rowID) => (
     <div key={`${sectionID}-${rowID}`} style={{
       backgroundColor: '#F5F5F9',
       height: 18,
       borderTop: '1px solid #ECECED',
       borderBottom: '1px solid #ECECED',
     }}
     />
   );

   const onEndReached=(event)=>{
    //  if(event==undefined||loadingMore){
    //    return;
    //  }else{
    //    dispatch({type:'xtProduct/fetchFillList',payload:{loadingMore:true}});
    //  }
   };
   return (
 		<ListView
         dataSource={ds.cloneWithRows(proDataList)}
         renderFooter={() => {
 					if(loadingMore)
 						return (<div style={{ padding: 30, textAlign: 'center' }}>
 	          '加载更多中...'
 						</div>);
 					else return <div />;
 				}}
         renderRow={row}
         renderSeparator={separator}
         className="am-list"
         pageSize={4}
         scrollRenderAheadDistance={20}
         scrollEventThrottle={20}
         useBodyScroll
         onEndReached={onEndReached}
         onEndReachedThreshold={10}
         style={{width:'100%'}}
       />
 	);
}


export default ProductData;
