import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import productMainStyles from '../../styles/product/ProductMain.css';
import { SegmentedControl,DatePicker, List, Button ,ListView, SearchBar, Icon, Drawer, NavBar } from 'antd-mobile';
import ProductList from '../../components/product/ProductList';
import Spinner from '../../components/share/Spinner';
import Header from '../../components/product/ProductHeader';
import TitleComp, { flushTitle } from 'react-title-component';
import FilterPage from './FilterPage';

// 私募 B类产品tab页筛选
const FilterToolbar = ({sortOrder,isFilter,sortEvent,filterEvent})=>{
	return (
		<div className={productMainStyles.toolbar}>
			<div className={productMainStyles.timeFil} onClick={sortEvent}>
				<p className={productMainStyles.txtStyle}>上架时间</p>
				<img className={productMainStyles.imgStyle} src={sortOrder==2?require('../../image/product/sortUp.png'):require('../../image/product/sortDown.png') } />
			</div>
			<div className={productMainStyles.timeFil} onClick={filterEvent}>
				<p className={isFilter?productMainStyles.txtSelectedStyle:productMainStyles.txtNormalStyle}>筛选</p>
				<img className={productMainStyles.imgStyle} src={isFilter?require('../../image/product/filterSelected.png'):require('../../image/product/filter.png')} />
			</div>
		</div>
	);
};

class ProductMain extends React.Component{
		constructor(props)
		{
			super(props);
			// document.setTitle('产品');
			this.state={
				open:false,
			};
		}

		onOpenChange(){
			this.setState({
				open:!this.state.open
			});
		}



		render()
		{
			let {xtProduct,bxProduct,dispatch,location,globalLoading,params} = this.props;
			let showIndex = (params.type =='bx'?1:0);
			// const segValueChange= (eve)=>{
			// 	 let selectedSegmentIndex = eve.nativeEvent.selectedSegmentIndex;
			// 	 dispatch({
			// 		 type:'bxProduct/fetch',
			// 		 payload:{showIndex:selectedSegmentIndex}
			// 	 });
			// 	 if(selectedSegmentIndex==1&&bxProduct.list.length<=0)
			// 	 {
			// 		 dispatch({
			// 			 type:'bxProduct/fetchRemote',
			// 			 payload:location.query
			// 		 });
			// 	 }
			// 	 else if(selectedSegmentIndex==0&&xtProduct.list.length<=0)
			// 	 {
			// 		 dispatch({
			// 			 type:'xtProduct/fetchRemote',
			// 			 payload:location.query
			// 		 });
			//  	}
			// };

			const searchEvent = (value)=>{
				// dispatch(routerRedux.push('/searchPage'));
				// 			dispatch(routerRedux.push({pathname:'/productMain',query:{prodName:value}}));
				if(showIndex==1)
				{
					dispatch({type:'bxProduct/fetchRemote',payload:{prodName:value}});
				}
				else {
					dispatch({type:'xtProduct/fetchRemote',payload:{prodName:value}});
				}
			};

			function isEmptyObject(emptyObject){
				if(!emptyObject)
				 	return true;
				for(let index in emptyObject) {//不使用过滤
					if(emptyObject[index])
					  return false;
   				}
					return true;
			}




		  return (
			  <div  style={{height: '100%',display: 'flex',flexDirection: 'column',position: 'relative'}}>
		    	<Drawer className={productMainStyles.normal}
					sidebar={<FilterPage backEvent={this.onOpenChange.bind(this)} open={this.state.open} dispatch={dispatch} filterArgs={xtProduct.filterArgs} />}
					dragHandleStyle={{ display: 'none' }}
		            contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
					open={this.state.open}
					position={'right'}
					onOpenChange={this.onOpenChange.bind(this)}
					>
					<div style={{position:'fixed',top:'0',left:'0',right:'0',zIndex:'9'}}>
						<TitleComp render="产品"/>
								<Header selectIndex = {showIndex}
								searchValue={showIndex==1?bxProduct.prodName:xtProduct.prodName}
								 searchEvent={searchEvent}
								showIndex ={showIndex}
								/>
							{
										showIndex==1?<div />:(<FilterToolbar sortOrder={xtProduct.sortOrder}
									isFilter={!isEmptyObject(xtProduct.filterArgs)}
									sortEvent={()=>{
										dispatch({type:'xtProduct/fetchRemote',payload:{sortOrder:xtProduct.sortOrder==2?1:2}});
									}} filterEvent={()=>{
										this.setState({
											open:true
										});
									}}  />)
							}
					</div>
						<div className={productMainStyles.boxScroll} style={{top:showIndex==1?'1.45rem':'2.5rem'}}>
		      		 	<ProductList product={showIndex==1?bxProduct:xtProduct}
								selectIndex = {showIndex} dispatch={dispatch} />
						</div>
		    	 </Drawer>
			 </div>
		  );
		}
}


function connectProductFunc({xtProduct,bxProduct,loading})
{
	  let globalLoading = loading.models;
	  return {xtProduct,bxProduct,globalLoading};
}

 export default connect(connectProductFunc)(ProductMain);
