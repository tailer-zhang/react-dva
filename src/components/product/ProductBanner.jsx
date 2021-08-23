import React ,{  PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import styles from '../../styles/product/ProductBanner.less';
import Dic from '../../utils/dictionary';

const ProBanner = (props) => {
 let {mode,dispatch,selectShrType,bannerData,selShrType,touchItem,btnFlag} = props;

 const shrTypeData = selShrType.map((item,index) => {
   return(
     <div key={index} >{item.shrType}</div>
   );
 });
 let typeDic = {};
 if(selShrType){
   for(let t of selShrType){
     typeDic[t.id] =  t.shrType;
   }
 }
  return(
    <div className={styles.proBanner}>
    	<div className={styles.BannerIn}>
    		<section className={styles.up}>
	    		<p className={styles.bannerTitle}>{bannerData.prodAlia}</p>
	    		<div className={styles.prodMounth}>
                    <span className={styles.span1}>{bannerData.shrType}</span>
                    <p></p>
                    {/*<p onClick={(e)=>{*/}
                        {/*// e.preventDefault();*/}
                        {/*dispatch(routerRedux.push({pathname:'/MarketMonth',state:{*/}
                        {/*title:'份额类别类型',*/}
                        {/*dataSource:typeDic,*/}
                        {/*selectValue:selectShrType,*/}
                        {/*onChange:(value,name)=>{*/}
                          {/*console.log('-----value变化-----',value,name);*/}

                          {/*dispatch({*/}
                            {/*type:'xtProduct/fetchCheckType',*/}
                            {/*payload:{selectShrType:value, selShrName:name}*/}
                          {/*});*/}
                          {/*// dispatch(routerRedux.goBack());*/}
                          {/*console.log('-----touchItem',touchItem);*/}
                          {/*touchItem.shrTypeId=value;*/}
                          {/*touchItem.shrType = name;*/}

                          {/*btnFlag == '0' ? dispatch(routerRedux.push({pathname:'/ProDetailNobtn',state:touchItem})) : dispatch(routerRedux.push({pathname:'/productDetail',state:touchItem}));*/}

                          {/*// if(touchItem.earnType=='1'&& touchItem.prodType=='9'){//现金管理*/}
              						{/*// 	dispatch(routerRedux.push({pathname:'/productQrnh',state:touchItem}));*/}
              						{/*// }else{*/}
              						{/*// 	dispatch(routerRedux.push({pathname:'/productDetail',state:touchItem}));*/}
              						{/*// }*/}
                          {/*//(selectShrType !=undefined ? selectShrType.minDeadline:bannerData.minDeadline)+'+'+(selectShrType !=undefined ? selectShrType.maxDeadline:bannerData.maxDeadline)*/}
                        {/*}*/}
                      {/*}}))}}*/}
                      {/*style={{padding:'0.1rem 0',float:'right',boxSizing:'borderBox'}}>*/}
                      {/*<span className={styles.span2}>份额类别</span>*/}
                      {/*<span className={styles.span3}>*/}
                          {/*<img src={require("../../image/icon/right_03.png")}/>*/}
                      {/*</span>*/}
                    {/*</p>*/}
          </div>
    		</section>
    		<section className={styles.bannerData} style={{display: 'flex'}}>
                <div className={ styles.bannerLeft}>
                    <p>{mode=='wage'?(bannerData.qrnhsyl!=undefined?bannerData.qrnhsyl:''): mode==='normal' ? (bannerData.netVal == 'undefined' ? '' : bannerData.netVal) : ''}</p>
                    <span>{ mode=='wage'?'7日年化（%）': mode==='normal' ? '最新净值' : ''}</span>
                </div>
                <div className={ styles.bannerRight}>
                    <p>{mode=='wage'?bannerData.wfsy: mode==='normal' ? (selectShrType.sustain=='0'?`${selectShrType.minDeadline!=undefined?selectShrType.minDeadline:''}~${selectShrType.maxDeadline!=undefined?selectShrType.maxDeadline:''}`:'永续') : ''}</p>
                    <span>{mode=='wage'?'万份收益（元）':mode==='normal' ? `期限(${selectShrType.deadlineUnit})`: ''}</span>
                </div>
                <div className={ styles.bannerRight}>
                    <span className={styles.txt4}><i>可用合同数&nbsp;</i>{bannerData.useableCont !== undefined ? bannerData.useableCont : '--'}</span>
                    <span className={styles.txt4}><i>剩余额度(万)&nbsp;</i>{touchItem.useableAmt !== undefined ? parseFloat((touchItem.useableAmt / 10000).toFixed(2)): '--'}</span>
                </div>
    		</section>
    	</div>
      {
        touchItem.earnType != '1' ?
          <p className={styles.introducDate} style={{paddingTop: '0.2rem',fontSize:'.32rem'}}>净值公布日期：<span>{
            (selectShrType!=undefined&&selectShrType.netvList!=undefined&&selectShrType.netvList.length>0)? selectShrType.netvList[selectShrType.netvList.length-1].netvDate:''
          }</span></p> : ""
      }
    </div>
  );
};


export default ProBanner;
