/**
 * author li
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import {SegmentedControl,DatePicker, List, Button ,ListView,SearchBar,Icon,Progress} from 'antd-mobile';
import ProductListStyles from '../../styles/product/ProductList.less';
import VectorWidget from './CircleProgress';
import CashProductList from './CashProductList';
import ListItem2 from './ListItem2';
import styles from '../../styles/product/emptyResult.less';

const EmptyResult = (props) => {
  return (
      <div className={styles.wrap} style={props.style}>
        <div className={styles.imgWrap}>
          <img src={require("../../image/icon/cry.png")} className={styles.imgSize}/>
        </div>
        <p className={styles.title1}>请点击搜索按钮查询</p>
      </div>
  );
};

const OtherProList = ({product,selectIndex,dispatch,wait, clickDetail})=>{
	 const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

  const renderFooter = () => {
    const { reach_bottom } = product;
    if (reach_bottom) {
      return (
        <div>没有更多了</div>
      )
    }
    return (
      <div>上拉加载更多</div>
    )
  }

  const onEndReached = () => {
    const { loadingMore, reach_bottom } = product;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'xtProduct/fetchOtherProdRemote', payload: { loadingMore: true } });
  }


  function touchCell(rowData, sectionID, rowID, clickDetail)
		{
					let order = true;
					// console.log("其他预约",rowData);
					if(selectIndex==0)
					{
            clickDetail();
            dispatch(routerRedux.push({pathname:'/productDetail',state:rowData}));
					}
					else 	{
						dispatch(routerRedux.push({pathname:'/safeGuard',state:rowData}));
					}
		}

	  const row = (rowData, sectionID, rowID) => {
		      return (
		        <div key={rowID} className = {ProductListStyles.rowStyle} onClick={()=>touchCell(rowData, sectionID, rowID, clickDetail)}>
			        <div>
			        	{selectIndex==1?<ListItem2 data={rowData} />:<CashProductList data={rowData}/>}
			        </div>
		        </div>
		      );
    };

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 20,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    );

   let {otherList,loading} = product;

    if(otherList.length>0){
      return (<ListView
        style={{height:'100%'}}
        dataSource={ds.cloneWithRows(otherList)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={10}
        scrollRenderAheadDistance={80}
        scrollEventThrottle={200}
        onEndReachedThreshold={200}
        onEndReached={onEndReached}
        renderFooter={renderFooter}
      />);
    } else if(loading){
      return (<div style={{backgroundColor:'#f7f7f7'}}></div>);
    }
    return  (<EmptyResult style={{height:'90%'}}/>);
};
export default OtherProList;
