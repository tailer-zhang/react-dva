import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { ListView, List } from 'antd-mobile';

// const WinList = (props) =>{
//   return(
//     <div className={proDetailStyles.winList}>
//       <div className={proDetailStyles.winListUl}>
//           <div className={proDetailStyles.winListLi}>
//             <p className={proDetailStyles.WinPercent}><span>10</span>%</p>
//             <p>固定收益率</p>
//           </div>
//           <div className={proDetailStyles.winListLi}>
//             <p>10~12</p>
//             <p>期限（月）</p>
//           </div>
//           <div className={proDetailStyles.winListLi}>
//             <p>300~1000</p>
//             <p>认购金额（万元）</p>
//           </div>
//       </div>
//     </div>
//   );
// };

// ------------------分割线------------------
const WinList = ({profListData,loadingMore}) => {
  const ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
  });

  function checkProperty(args0, args1) {
    return args0!=undefined && args1!=undefined ? args1:'';
  }

  const row = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID} className={proDetailStyles.dataPadding}>
        <div className={proDetailStyles.winList}>
          <div className={proDetailStyles.winListUl}>
              <div className={proDetailStyles.winListLi}>
                <p className={proDetailStyles.WinPercent}><span>{checkProperty(rowData, rowData.rate)}</span>%</p>
                <p>固定收益率</p>
              </div>
              <div className={proDetailStyles.winListLi}>
                <p>{checkProperty(rowData, rowData.minDeadline)}~{checkProperty(rowData, rowData.maxDeadline)}</p>
                <p>期限（月）</p>
              </div>
              <div className={proDetailStyles.winListLi}>
                <p>{checkProperty(rowData, rowData.minAmt)}~{checkProperty(rowData, rowData.maxAmt)}</p>
                <p>认购金额（万元）</p>
              </div>
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

  };

  return (
   <ListView
        dataSource={ds.cloneWithRows(profListData?profListData:[])}
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
      />
 );
}






export default WinList;
