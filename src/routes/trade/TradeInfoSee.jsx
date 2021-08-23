//客户持仓详情
import React,{ Component,PropTypes } from 'react';
import {connect} from 'dva';
import {Link,routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';
import { SearchBar,WhiteSpace,List,Tabs,InputItem, DatePicker} from 'antd-mobile';
import TradeCard from '../../components/share/TradeInfoCard';
import FreezeCard from '../../components/share/FreezeCard';
import PositionInfo from '../../components/share/PositionInfo';
import RedeemLists from '../../components/share/RedeemLists';

import moment from 'moment';
import 'moment/locale/zh-cn';
import Dic from '../../utils/dictionary';

import tradeInfo from '../../styles/trade/redeem.less';
// import styles from '../../styles/customer/customerAdd.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);


const TradeInfoSee =createForm()((props) => {
  const { getFieldProps } = props.form;
  let { dispatch,tradeRedList,location} = props;
  let postInfo = tradeRedList.model;
  let validProdInfo = tradeRedList.validProdInfo;
  let singleRedeemList = tradeRedList.singleRedeemList;
  let tradShrinfo = postInfo.tradShrList;
  let confShrinfo = postInfo.confShrList;
  if(tradShrinfo==undefined) tradShrinfo=[];
  if(confShrinfo==undefined) confShrinfo=[];
  let postModel = postInfo.custShrModel
  if(postModel==undefined)postModel={};
  let {mode,confAmtCode} = location.state;
  let type = location.state.type
  const titleProps = {
    title:mode=='hide'?'持仓信息详情':(mode=='transfer'?'客户持仓信息详情':'交易信息详情'),
  };

  return (
    <div className={tradeInfo.tradeInfo}>
      <Title {...titleProps}></Title>
      <div className={tradeInfo.box} style={{bottom:mode=='hide'?'0':'1.2rem'}}>
       <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
         <TabPane tab="持仓信息" key="1">
         <PositionInfo postModel={postModel}/>
         </TabPane>
         <TabPane tab="交易确认份额" key="2">
           <TradeCard dataSource={confShrinfo} dispatch={dispatch}  confAmtCode={confAmtCode}/>
         </TabPane>
         <TabPane tab="交易冻结份额" key="3">
           <FreezeCard dataSource={tradShrinfo}/>
         </TabPane>
         {
           validProdInfo=='Y'&&<TabPane tab="可持仓份额" key="4">
             <RedeemLists dataSource={singleRedeemList}/>
           </TabPane>
         }
       </Tabs>
     </div>
      {mode=='show'?<p className={tradeInfo.shBtn0}  onClick={() =>dispatch(routerRedux.push({pathname:'/RedeemAsk',state:{postModel}}))}>赎回</p>:
        (mode=='transfer'?<p className={tradeInfo.shBtn0}  onClick={() =>dispatch(routerRedux.push({pathname:'/TransferInput',state:{data: postModel, originData: location.state,type:type}}))}>转让</p>:<div />)
      }
    </div>
  );
  });

  function connectProdunctFunc({tradeRedList})
  {
    return { tradeRedList }
  }


export default connect(connectProdunctFunc)(TradeInfoSee);
