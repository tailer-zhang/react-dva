import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import XTListItem2 from './XTListItem2';//列表项
import tradeStyles from '../../styles/trade/trade.less';//样式文件
import { List,WhiteSpace,Tabs,InputItem,Toast } from 'antd-mobile';


const RemitInfo = ({dispatch,dataSource,formStorage,orderInfo,rejectFlag,disableEdit,errMsg}) => {
  function clickRemitInfo(remitData,index)
  {
  	if(disableEdit){
  		Toast.fail(errMsg,2);
  		return;
  	}
    dispatch(routerRedux.push({pathname:'/XTRemitInfo',state:{
        remitData:remitData,
        mode:'edit',
        orderInfo:orderInfo,
        index:index
      }}));
  }
  return(
    <div className={tradeStyles.remitWrap}>
     {dataSource.map((item,index)=>{
         return (
           <div key={index} className={tradeStyles.menuArea} onClick={()=>clickRemitInfo(item,index)}>
             <XTListItem2 item={item} index={index}/>
           </div>
         );
      })}

      <p className={tradeStyles.remitAddBtn} onClick = { ()=> {
      		if(disableEdit){
  				Toast.fail(errMsg,2);
  				return;
  			}
      	dispatch(routerRedux.push({pathname:'/XTRemitInfo',state:{
          remitData:{},
          orderInfo:orderInfo,
          mode:'change'
        }}));
      }}>添加汇款信息</p>
    </div>
  );
};
export default connect()(RemitInfo);
