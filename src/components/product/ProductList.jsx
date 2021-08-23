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
import ListItem from './ListItem';
import ListItem2 from './ListItem2';
import EmptyResult from '../../components/share/EmptyResult';


const ProductList = ({product,selectIndex,dispatch})=>{
	 const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

		function touchCell(rowData, sectionID, rowID)
		{
					let order = false;
					if(selectIndex==0)
					{
						dispatch(routerRedux.push({pathname:'/ProDetailNobtn',state:rowData}));
					}
					else 	{
						dispatch(routerRedux.push({pathname:'/safeGuard',state:rowData}));
					}
		}

	  const row = (rowData, sectionID, rowID) => {
		      return (
		        <div key={rowID} className = {ProductListStyles.rowStyle} onClick={()=>touchCell(rowData, sectionID, rowID)}>
			        <div>
			        	{selectIndex==1?<ListItem2 data={rowData} />:<ListItem data={rowData} />}
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

   let {list,loading,loadingMore} = product;

   // console.log('=====loading',loading);
    const onEndReached=(event)=>{
      console.log('触发了onEndReached');
			 if(event==undefined||loadingMore)
			 		return;
			 if(selectIndex==1)
			 {
				 	dispatch({type:'bxProduct/fetchRemote',payload:{loadingMore:true}});
			 }
			 else {
				  dispatch({type:'xtProduct/fetchRemote',payload:{loadingMore:true}});
			 }
    };

    console.log('=====了loadingMore',loadingMore);
    if(list.length>0){
      return (<ListView
        style={{height:'100%'}}
        dataSource={ds.cloneWithRows(list)}
        renderFooter={() => {
          if(loadingMore)
            return (<div style={{ padding: 0, textAlign: 'center'}}>
            </div>);
          else return <div />;
        }}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={10}
        scrollRenderAheadDistance={50}
        scrollEventThrottle={20}
        onEndReached={onEndReached}
        onEndReachedThreshold={30}
      />);
    } else if(loading){
      return (<div style={{backgroundColor:'#f7f7f7'}}></div>);
    }
    return  (<EmptyResult style={{height:'100%'}}/>);
};
export default ProductList;
