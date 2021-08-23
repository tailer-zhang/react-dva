/**
 * author li
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import {SegmentedControl,DatePicker, List, Button ,ListView,SearchBar,Icon,Progress} from 'antd-mobile';
import ProductListStyles from '../../styles/product/ProductList.less';
import styles from '../../styles/product/emptyResult.less';

import VectorWidget from './CircleProgress';
import OtherList from './OtherList';
import ListItem2 from './ListItem2';

const EmptyResult = (props) => {
  return (
      <div className={styles.wrap} style={props.style}>
        <div className={styles.imgWrap}>
          <img src={require("../../image/icon/cry.png")} className={styles.imgSize}/>
        </div>
        <p className={styles.title1}>请刷新按钮查询</p>
      </div>
  );
};

const TodayProList = ({product,selectIndex,dispatch,wait})=>{
	 const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

	  const row = (rowData, sectionID, rowID) => {
		      return (
		        <div key={rowID} className = {ProductListStyles.rowStyle}>
			        <div>
			        	{selectIndex==1?<ListItem2 data={rowData} />:<OtherList data={rowData} wait={wait} dispatch={dispatch}/>}
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

   let {todayList,loading,loadingMore} = product;

  console.log('=====了loadingMore',loadingMore);
  if(todayList.length>0){
    return (<ListView
      style={{height:'100%'}}
      dataSource={ds.cloneWithRows(todayList)}
      renderFooter={() => {
        if(loadingMore)
          return (<div style={{ padding: 30, textAlign: 'center'}}>
    加载中...
          </div>);
        else return <div />;
      }}
      renderRow={row}
      renderSeparator={separator}
      className="am-list"
      pageSize={10}
      scrollRenderAheadDistance={80}
      scrollEventThrottle={200}
      onEndReachedThreshold={200}
    />);
  } else if(loading){
    return (<div style={{backgroundColor:'#f7f7f7'}}></div>);
  }
  return  (<EmptyResult style={{height:'100%'}}/>);
};
export default TodayProList;
