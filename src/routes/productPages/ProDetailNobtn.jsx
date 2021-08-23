import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import ProBanner from '../../components/product/ProductBanner';
import EquityTrend from '../../components/product/EquityTrend';
// import InfoTab from '../../components/product/InfoTab';
import OrderBtn from '../../components/product/OrderBtn';
import ProOpenShade from '../../components/product/ProOpenShade.jsx';//产品概况遮罩
import {formatDate} from '../../utils/formatUtils';
import moment from 'moment';
import proDetailStyles from '../../styles/product/ProductDetail.less';
// import * as commons from '../../utils/commonUtil';
import {Tool} from '../../utils/tools';
import * as commons from "../../utils/commonUtil";
import EquityTrendYear from "../../components/product/EquityTrendYear";
var userObj={}
if(process.env.NODE_ENV !== 'production')
{
  userObj = {
    userId:commons.userId,
    childToken:commons.token,
  };
}
else userObj = Tool.getSessionUser();

const ProDetailNobtn = ({dispatch,xtProduct,location}) => {

	const TitleProps = {title:'产品详情'};
	let { productDetail, fileList, typeList, navList,typeDetail,touchItem } = xtProduct;
	let {isSaleFlag,useableAmt,earnType,prodType,threeClass} = touchItem;
	let orderView = <div></div>;
	// console.log("ro======",isSaleFlag);
	if(isSaleFlag && isSaleFlag == '0' && (Number(useableAmt)>0)){//在售标示
      orderView = <OrderBtn topData={xtProduct} dispatch={dispatch}/>;
	}
	let monetaryStatue = '0';//非现金管理产品
	// if(earnType=='5'&& prodType=='51'){   //现金管理
	// 	monetaryStatue = '1';
	// }
  if(threeClass == '502'){
    monetaryStatue = '1' //非净值类
  }
	const clickProductInfo = (type,detail)=>{
		dispatch(routerRedux.push({
			pathname:'/productInfoTab',
			query:{
				type:type
			},
			state:detail
		}));
	}

	const processNavList = (navList, monetaryStatue, type) => {
	  console.log(navList,'navList===>')
		if (!navList||navList.length<=0) {
			return {
					startDate:new Date(),
					data:[],
					sevenAge:[],
					milProfit:[],
					navdt:[],
					dayLength:0,
			};
		}
		let dataArr = [],navdtArr = [], startDate=undefined,dayLength=0, sevenAge = [], milProfit = [];

		navList.map((item,index)=>{
			let date = new Date(item.netvDate.replace(/-/g,'/'));
			if(index==0) startDate = date;
			if(monetaryStatue === '1'){//现金管理
				sevenAge.push(parseFloat(item.sevenIncome));//七日年化
				milProfit.push(parseFloat(item.fundIncome));//万份收益
			}else if(type == 'annual'){
				dataArr.push(parseFloat(item.sevenIncome)) //年华收益率
			} else{
				dataArr.push(parseFloat(item.netVal));//单位净值
			}
			navdtArr.push(formatDate(date,'yyyy-MM-dd'));
		});
		return {
			data:dataArr,
			sevenAge:sevenAge,
			milProfit:milProfit,
			navdt:navdtArr,
			startDate:startDate,
			dayLength:dayLength,
		};
	};
	let processNav = processNavList(navList,monetaryStatue);
	let yearProcessNav = processNavList(navList,'','annual')
	// console.log('location.state    '+location.state);
	// 			<Title {...TitleProps}/>

	return (
		<div className={proDetailStyles.mainContent}>
			<div className={proDetailStyles.bannerArea}>
				<ProBanner mode={monetaryStatue==='1'?'wage':'normal'} dispatch={dispatch} selectShrType={typeDetail} bannerData={location.state} selShrType={typeList} touchItem={touchItem} btnFlag={'0'}/>
			</div>
			<div className={proDetailStyles.margin21}>
				{
					earnType == '5' ? <EquityTrendYear prodType={prodType} monetaryStatue={monetaryStatue} dispatch={dispatch} processNavList={processNav} yearProcessNav={yearProcessNav} />
							: <EquityTrend monetaryStatue={monetaryStatue} dispatch={dispatch} processNavList={processNav}/>
				}
				{/*<EquityTrend monetaryStatue={monetaryStatue} dispatch={dispatch} processNavList={processNav}/>*/}
			</div>
			<div className={proDetailStyles.detailNav}>
				<p onClick={()=>clickProductInfo('index',productDetail)}>产品基本详情  <img src={require('../../image/icon/arrow_r.png')} /></p>
				<p onClick={()=>clickProductInfo('marketType',typeDetail)}>份额类别  <img src={require('../../image/icon/arrow_r.png')} /></p>
				<p onClick={()=>{
					dispatch(routerRedux.push({
						pathname:'/productOverView',
						state:{
							lineMapp:productDetail.lineMapp,
							prdStage:productDetail.prdStage,
							detail:{
								...productDetail,
								prdStage:undefined,
								lineMapp:undefined
							}
						}
					}));
					}}>产品概况  <img src={require('../../image/icon/arrow_r.png')} /></p>
				<p onClick={()=>{dispatch(routerRedux.push({
					pathname:'/buyCustomer',
					state:productDetail
				}));}}>购买客户  <img src={require('../../image/icon/arrow_r.png')} /></p>
				<p onClick={()=>clickProductInfo('feeInfo',productDetail)}>佣金信息  <img src={require('../../image/icon/arrow_r.png')} /></p>
				<p onClick={()=>{dispatch(routerRedux.push({pathname:'/proHoldSpeed',state: {"mgrCode":userObj.userId,"prodId":touchItem.prodId}}))}}>产品存续进度  <img src={require('../../image/icon/arrow_r.png')} /></p>
			</div>
			<div style={{width: '100%',height: '1.44rem',backgroundColor: '#efeff4'}}></div>
		</div>
	);
};

// <div>
// 	<InfoTab className={proDetailStyles.margin21} productDetail={productDetail} fileList={fileList} typeDetail={typeDetail} dispatch={dispatch} defaultActiveKey={xtProduct.defaultActiveKey}/>
// </div>

function connectProductFunc({xtProduct})
{
	  return {xtProduct};
}

 export default connect(connectProductFunc)(ProDetailNobtn);
