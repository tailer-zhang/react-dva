//交易 驳回修改 撤单驳回详情
import React,{ Component,PropTypes } from 'react';
import Title from '../../components/product/Title';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import {Link,browserHistory,routerRedux} from 'dva/router';
import { List,WhiteSpace,Tabs,InputItem,Toast} from 'antd-mobile';
import DataImg from '../../components/share/DataImg';
import CancelBtn2 from '../../components/share/CancelBtn2';
import Dic from '../../utils/dictionary';


import rebutStyles from '../../styles/trade/redeem.less';
import redeemStyles from '../../styles/trade/rebut.less';

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;


import moment from 'moment';
import 'moment/locale/zh-cn';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

const RejectCom = ({data,rejectFlag})=>{
  return(
    rejectFlag=='1'?<div></div>:<div className={redeemStyles.rebutCause}>
    <section>
      <p>驳回原因</p>
      <p>驳回人/驳回时间</p>
    </section>
    <section>
      <p>{data.noPassReason}</p>
      <p><span >{data.appUserName}</span>/<span>{data.appTime}</span></p>
    </section>
    </div>
  );
}

class RebutRecall extends React.Component {
  constructor(props){
    super(props);
  }

  clickOrignReq(tradInfo,e)
  {
    // e.preventDefault();
    let {dispatch} = this.props;
    let origTradeCode = tradInfo.origTradCode;
      // let origTradeCode = '0024';

    let rowData = {id:tradInfo.origTradID};
    // let rowData = {id:'374'};
    //认、申购
    if(origTradeCode=="0020"||origTradeCode=="0022"){
      dispatch(routerRedux.push({pathname:'/RebutBuy',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//赎回
    else if(origTradeCode=="0024"){
      dispatch(routerRedux.push({pathname:'/RebutRedeem',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//撤单
    else if(origTradeCode=="0052"){
      dispatch(routerRedux.push({pathname:'/RebutRecall',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }//转让
    else if(origTradeCode=="0033"){
      dispatch(routerRedux.push({pathname:'/transferDetail',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }
    else if(origTradeCode=="0036"){
      dispatch(routerRedux.push({pathname:'/RebutFundChange',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    }
  }

  render(){
    let { dispatch,rebutSpace,location,formStorage } = this.props;
    let data = rebutSpace.model;
    let {rejectFlag} = location.state;
    let tradeData = location.state.tradeDetail;
    let tradInfo = rebutSpace.model.tradeModel;
    let tradAttach = data.attachList;
    if(tradInfo==undefined) tradInfo={};
    const titleProps = {
      title:'撤单驳回详情',
    };
    const cancleTitle = {
      btnType:'作废',
    };
    return (
    <div className={rebutStyles.tradeInfo} style={{position:'relative'}}>
      <Title {...titleProps}></Title>
       <div className={rebutStyles.box} style={{bottom:rejectFlag=='0'?'1.2rem':'0'}}>
       <RejectCom data={data} rejectFlag={rejectFlag}/>
          <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
           <TabPane tab="撤单信息" key="1">
           <WhiteSpace style={{backgroundColor:'#efeff4'}}/>
            <List>
              <div className={rebutStyles.remark}>
                <ul>
                  <li>交易单号</li>
                  <li style={{textAlign:'right',color:'#000'}}>{tradInfo.reqSeq}[{Dic.fetchDicValue('tradCode',tradInfo.tradCode)}]</li>
                </ul>
              </div>
            </List>
            <List>
            <div className={rebutStyles.remark} onClick={this.clickOrignReq.bind(this,tradInfo)}>
              <ul>
                <li>原交易单号</li>
                <li><span>{tradInfo.origReqSeq}[{Dic.fetchDicValue('tradCode',tradInfo.origTradCode)}]</span><img className={rebutStyles.ReqSeqImg} src={require('../../image/icon/arrowR.png')} /></li>
              </ul>
            </div>
            </List>

            <WhiteSpace style={{backgroundColor:'#efeff4'}}/>
             <List>
               <Item extra={tradInfo.creator}>撤单人</Item>
               <Item extra={tradInfo.createTime}>撤单时间</Item>
             </List>
              <List>
                <div className={redeemStyles.recallBacus}>
                  <p>撤单原因</p>
                  <p>{tradInfo.remark}</p>
                </div>
              </List>
           </TabPane>
           <TabPane tab="撤单资料" key="2">
           <WhiteSpace style={{backgroundColor:'#efeff4'}}/>
              <DataImg dataSource={tradAttach} />
           </TabPane>
         </Tabs>
        </div>

        {rejectFlag=='0'?( <div className={redeemStyles.footerSec}>
           <div className={redeemStyles.p}><CancelBtn2 {...cancleTitle} dispatch={dispatch} rebutSpace={rebutSpace} tradeData={tradeData}  /></div>
           <div className={redeemStyles.p} onClick = {()=>{
                   if(!tradInfo||tradInfo.recStat!='1'){
                       Toast.fail('该交易状态已作废,无法进行驳回修改!');
                       return;
                   }
                   dispatch(routerRedux.push({pathname:'/RecallChange',state:{
                       data:data,
                       rowData:data.tradeModel,
                       mode:'edit'
                  }}));
       }}>修改</div>
         </div>):<div />}
      </div>);
    }
  };

function connectProdunctFunc({rebutSpace,formStorage})
{
 return { rebutSpace,formStorage }
}

export default connect(connectProdunctFunc)(RebutRecall);
