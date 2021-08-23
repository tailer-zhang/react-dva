import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import OtherProList from '../../components/product/OtherProList';
import productMainStyles from '../../styles/product/ProductMain.css';
import {     Drawer } from 'antd-mobile';

import TitleComp, { flushTitle } from 'react-title-component';
import styles from '../../styles/product/ProductMain.css';
import {Tool} from '../../utils/tools';
import { SearchBar } from 'antd-mobile';
import Title from '../../components/product/Title';
import AssetsApplyStyle from '../assetsCertification/apply/style/AssetsApplyStyle.less';
import FilterPage2 from './FilterPage2';

let otherInter;
let st = 0;
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
class OtherProduct extends React.Component{
		constructor(props)
		{
			super(props);
			this.state={
        seconds:Tool.localItem("other_seconds"),
        tipText:'',
        searchValue:'',
				start:false,
        props:props,
				wait:false,
				open:false,

			};

      this.onStartChange = this.onStartChange.bind(this);
      this.clickDetail = this.clickDetail.bind(this);
		}
    // 开关 筛选
    onOpenChange(){
			this.setState({
				open:!this.state.open
			});
		}

    componentWillUnmount(){
      // clearInterval(otherInter);
      // if(st==0){
      //   let {dispatch} = this.props;
      //   dispatch({type:'xtProduct/emptyOtherList'});
      // }

      st = 0;
    }

    clickDetail(){
      st = 1;
    }

    // componentDidMount(){
    //   let seconds = this.state.seconds;
    //
    //   console.log('onStartChange',seconds);
    //
    //   if (seconds != 8) {
    //     if (seconds <= 0) {
    //       clearInterval(otherInter);
    //       seconds = 8;
    //       this.state.seconds=8;
    //       Tool.localItem("other_seconds", 8);
    //     }
    //
    //     function timer() {
    //       seconds--;
    //       console.log('onStartChange time',seconds);
    //       Tool.localItem("other_seconds", seconds);
    //       let tip = "请等待" + seconds + "秒";
    //
    //       if (seconds === 0) {
    //         clearInterval(otherInter);
    //         seconds = 8;
    //         this.state.seconds=8;
    //         Tool.localItem("other_seconds", 8);
    //         this.setState({
    //           tipText:'搜索',
    //           start:false,
    //         });
    //       } else {
    //         this.setState({
    //           seconds:seconds,
    //           tipText: tip,
    //           start:true,
    //         });
    //       }
    //     }
    //
    //     timer.bind(this)();
    //     otherInter = setInterval(timer.bind(this), 1000);
    //   } else {
    //     this.setState({
    //       tipText: '搜索',
    //     });
    //   }
    // }

		onBlur(){
			this.setState({
				start:false
			});
		}

  onStartChange(){
    let seconds = this.state.seconds;

    if (seconds != 8 && seconds > 0) {
      return;
    }

    // console.log('onStartChange',seconds);

    if (seconds == 8) {
      let {dispatch} = this.state.props;
      dispatch({type:'xtProduct/fetchOtherProdRemote',payload:{prodName:this.state.searchValue}});
    }

    function timer() {
      seconds--;
      // console.log('onStartChange time',seconds);
      Tool.localItem("other_seconds", seconds);
      let tip = "请等待" + seconds + "秒";

      if (seconds === 0) {
        this.state.seconds=8;
        Tool.localItem("other_seconds", 8);
        clearInterval(otherInter);
        this.setState({
          tipText:'搜索',
          start:false,
        });
      } else {
        this.setState({
          seconds:seconds,
          tipText: tip,
          start:true,
        });
      }
    }

    timer.bind(this)();
    otherInter = setInterval(timer.bind(this), 1000);
  }

    changeSearch(){
      this.setState({
        searchValue:this.refs.search.value,
      })
    }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'xtProduct/fetchOtherProdRemote', payload: { keyWord: value, loadingMore: false, otherList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'xtProduct/fetchOtherProdRemote', payload: { keyWord: '', loadingMore: false, otherList: [] } });
  }

		render()
		{
			let {xtProduct,dispatch,params} = this.props;
      let { start , searchValue, tipText , wait} = this.state;
			let showIndex = (params.type =='bx'?1:0);
      const titleProps = {
        title: '产品预约列表',
        showBack: 'yes',
      };

      // 查询 
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
        <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center',marginTop:'-2.53rem'}}>
          <Title {...titleProps}></Title>
            {/* <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}> */}
          {/* <div  style={{height: '100%',display: 'flex',flexDirection: 'column',position: 'relative'}}> */}
          <Drawer className={productMainStyles.normal}
					sidebar={<FilterPage2 backEvent={this.onOpenChange.bind(this)} open={this.state.open} dispatch={dispatch} filterArgs={xtProduct.filterArgs} />}
					dragHandleStyle={{ display: 'none' }}
		            contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
					open={this.state.open}
					position={'right'}
					onOpenChange={this.onOpenChange.bind(this)}
					>
            <SearchBar placeholder="产品名称" onSubmit={this.search} onClear={this.clear} />       
            
            <FilterToolbar sortOrder={xtProduct.sortOrder}
									isFilter={!isEmptyObject(xtProduct.filterArgs)}
									sortEvent={()=>{
										dispatch({type:'xtProduct/fetchOtherProdRemote2',payload:{sortOrder:xtProduct.sortOrder==2?1:2,loadingMore: false, otherList: []}});
									}} filterEvent={()=>{
                    // dispatch({type:'xtProduct/fetchOtherProdRemote2',payload:{loadingMore: false, otherList: []}});
										this.setState({
											open:true
										});
									}}  />
                  </Drawer>
          {/* </div> */}
          {/* </div> */}
          <div className={AssetsApplyStyle.content}>
            <OtherProList
              product = {showIndex==1?bxProduct:xtProduct}
              selectIndex = {showIndex}
              dispatch = {dispatch}
              clickDetail={this.clickDetail}
            />
          </div>
        </div>
		  );
		}
}

 export default connect(({xtProduct})=>{
  return {xtProduct}
  })(OtherProduct);
