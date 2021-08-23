'use strict';
import React, {Component} from 'react';
import {connect} from 'dva';
import {Link,routerRedux} from 'dva/router';
import {Tool} from '../utils/tools';
import Dic from "../utils/dictionary";
import {Toast} from "antd-mobile/lib/index";
import watermark from '../watermark'

class MainComponent extends Component {
  constructor() {
    super();
    this.state={
      info:''
    }
  }

  componentDidMount(){
      let {dispatch} = this.props;
      let userObj = JSON.parse(Tool.localItem('UserToken'));
      let params = Tool.GetRequest();
      let pathnameDetail = '/' + params.pathname;
       let hashLocation = window.location.hash;
      console.log('window.location',window.location)
      console.log('hashLocation',hashLocation)
      console.log('main.js line 20 --- params',params);
      console.log('main.js line 21 --- userObj',userObj);
        if(hashLocation.indexOf('version')>-1 ){
             Tool.localItem('productMenuContract', '3.0');
      }
      //1 判断是否有userId  token
      //2 判断来源 是产品 还是用户
      if(params.userId !== undefined && params.token !== undefined){
        //product_key 表示产品
        if (userObj && userObj.childToken && userObj.childToken == params.token) {
          if (params.originKey==='product_key') {
            params.prodAlia=decodeURI(params.prodAlia);
            params.shrType=decodeURI(params.shrType)
            dispatch(routerRedux.push({pathname:'/ProDetailNobtn', state: params}));
          }else if (params.originKey==='product_typeB_list'){
            dispatch(routerRedux.push({pathname:'/productMain/bx', query: {prodName:params.prodName?decodeURI(params.prodName):" "}}));
          }else if (params.originKey==='product_typeB_detail'){
            dispatch(routerRedux.push({pathname:'/safeGuard',state:{id: params.id}}));
          }else if (params.originKey==='customer_inquire_list'){
            dispatch(routerRedux.push({pathname:'/customerInquire',query:{custName: params.custName?decodeURI(params.custName):" ",loadingMore: false, outLink: true}}));
          } else if (params.originKey === 'type_reject_list') {
            dispatch(routerRedux.push({ pathname: '/rejectListCnt' }));
          } else if (params.originKey === 'investors_reject_list') {
            dispatch(routerRedux.push({ pathname: '/roleChangeRejectCnt' }));
          } else if (params.originKey === 'otherProduct') {
            dispatch(routerRedux.push({ pathname: '/otherProduct' }));
          }  else if (params.originKey === 'customerTradeSearch') {
            dispatch(routerRedux.push({ pathname: '/customerTradeSearch' }));
          }else if (params.originKey === 'tradeSafeInquire') {
            dispatch(routerRedux.push({ pathname: '/tradeSafeInquire' }));
          }else if (params.originKey==='productDetail'){
            params.prodAlia=decodeURI(params.prodAlia);
            params.shrType=decodeURI(params.shrType)
            params.qrnhsyl=decodeURI(params.qrnhsyl)
            params.netVal=decodeURI(params.netVal)
            params.wfsy=decodeURI(params.wfsy)
            params.prodId=decodeURI(params.prodId)
            params.useableAmt=decodeURI(params.useableAmt)
            params.earnType=decodeURI(params.earnType)
            params.prodType=decodeURI(params.prodType)
            params.onlineStat=decodeURI(params.onlineStat)
            params.isSaleFlag=decodeURI(params.isSaleFlag)
            params.useableAmt=decodeURI(params.useableAmt)
            params.shrTypeId=decodeURI(params.shrTypeId)
            params.resvPeriod=decodeURI(params.resvPeriod)
            params.tradCode=decodeURI(params.tradCode)
            dispatch(routerRedux.push({pathname:'/productDetail',state: params }));
          } else if (params.originKey === 'interest_detail') {
            params.custName=decodeURI(params.custName);
            params.prodName=decodeURI(params.prodName)
            params.shrType=decodeURI(params.shrType)
            params.reqAmt=decodeURI(params.reqAmt)

            params.currType=decodeURI(params.currType)
            params.contNo=decodeURI(params.contNo)
            params.dateType=decodeURI(params.dateType)
            params.realExpiDate=decodeURI(params.realExpiDate)

            params.interestDate=decodeURI(params.interestDate)
            params.startProfRule=decodeURI(params.startProfRule)
            params.tradCode=decodeURI(params.tradCode)
            params.reqSeq=decodeURI(params.reqSeq)

            dispatch(routerRedux.push({ pathname: '/interestDetail', state: { dataSource: params } }));
          }else if (params.originKey==='customer_inquire_detail'){
            //-----
            if(params.custType==='02'&&params.curStat==='01')    //潜在以及正常状态
            {
              if(params.custClass==='01')
                dispatch(routerRedux.push({pathname:'/personalLatentCustomerEdit',
                  state:{
                    customer:params,
                    mode:'edit'
                  }}));
              else dispatch(routerRedux.push({pathname:'/orgCusAddMore',
                state:{
                  orgCust:params,
                  mode:'edit'
                }}));
            }
            else if(params.custClass==='01')      //个人客户详情
            {
              let custType = params.custClass;
              if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
              dispatch(routerRedux.push({pathname:'/personalCusDetail',
                state:{
                  detail: {custID: params.custID,rejectFlag: '1'},
                  hold: {certType: params.certType,custType: custType==='1'?'1':'0',certNo: params.certCode},//custType:"1",certType:"01",certNo:"1234567TTT"
                  progress: 'perCustomer',
                  custSource: decodeURI(params.custSource)
                }}));
            }
            else if(params.custClass==='02')  //机构客户详情
            {
              let custType = params.custClass;
              if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
              dispatch(routerRedux.push({
                pathname: '/orgCusDetail',
                state: {
                  detail: {rejectFlag: '1',busiID: params.custID},
                  hold: {certType: params.certType,custType: custType==='1'?'1':'0',certNo: params.certCode}  //custType:"1",certType:"01",certNo:"1234567TTT"
                }
              }));
            }
            //--------------------------

          } else if (params.originKey === 'payment_of_interest'){
            dispatch(routerRedux.push({pathname:'/paymentOfInterestCnt'}));
          } else if (params.originKey === 'private_type_list'){
            dispatch(routerRedux.push({pathname:'/biTypeInputListCnt'}));
          } else if (params.originKey === 'redeem') {
            dispatch(routerRedux.push({ pathname: '/redeemList', state: { from: 'outHint' } }));
          } else {
            dispatch(routerRedux.push({
              pathname: pathnameDetail,
              state: params.prodName ? {prodName: decodeURI(params.prodName), mgrCode: params.userId} : {}
            }));
          }
        } else {
          userObj = {
            userId: params.userId,
            childToken: params.token,
            childRefreshToken: params.rtoken
          }
          Tool.localItem('UserToken', JSON.stringify(userObj));
            if (params.originKey==='product_key'){
              params.prodAlia=decodeURI(params.prodAlia);
              params.shrType=decodeURI(params.shrType)
              dispatch(routerRedux.push({pathname:'/ProDetailNobtn', state: params}));
            }else if (params.originKey==='product_typeB_list'){
              dispatch(routerRedux.push({pathname:'/productMain/bx',query: {prodName:params.prodName?decodeURI(params.prodName):" "}}));
            }else if (params.originKey==='product_typeB_detail'){
              dispatch(routerRedux.push({pathname:'/safeGuard',state:{id: params.id}}));
            }else if (params.originKey==='customer_inquire_list'){
              dispatch(routerRedux.push({pathname:'/customerInquire',query:{custName: params.custName?decodeURI(params.custName):" ",loadingMore: false, outLink: true}}));
            } else if (params.originKey === 'type_reject_list') {
              dispatch(routerRedux.push({ pathname: '/rejectListCnt' }));
            } else if (params.originKey === 'otherProduct') {
              dispatch(routerRedux.push({ pathname: '/otherProduct' }));
            }  else if (params.originKey === 'customerTradeSearch') {
            dispatch(routerRedux.push({ pathname: '/customerTradeSearch' }));
          }else if (params.originKey === 'tradeSafeInquire') {
            dispatch(routerRedux.push({ pathname: '/tradeSafeInquire' }));
          }else if (params.originKey === 'investors_reject_list') {
              dispatch(routerRedux.push({ pathname: '/roleChangeRejectCnt' }));
            } else if (params.originKey==='productDetail'){
              params.prodAlia=decodeURI(params.prodAlia);
              params.shrType=decodeURI(params.shrType)
              params.qrnhsyl=decodeURI(params.qrnhsyl)
              params.netVal=decodeURI(params.netVal)
              params.wfsy=decodeURI(params.wfsy)
              params.prodId=decodeURI(params.prodId)
              params.useableAmt=decodeURI(params.useableAmt)
              params.earnType=decodeURI(params.earnType)
              params.prodType=decodeURI(params.prodType)
              params.onlineStat=decodeURI(params.onlineStat)
              params.isSaleFlag=decodeURI(params.isSaleFlag)
              params.useableAmt=decodeURI(params.useableAmt)
              params.shrTypeId=decodeURI(params.shrTypeId)
              params.resvPeriod=decodeURI(params.resvPeriod)
              params.tradCode=decodeURI(params.tradCode)
              dispatch(routerRedux.push({pathname:'/productDetail',state: params}));
            } else if (params.originKey === 'interest_detail') {
              params.custName=decodeURI(params.custName);
              params.prodName=decodeURI(params.prodName)
              params.shrType=decodeURI(params.shrType)
              params.reqAmt=decodeURI(params.reqAmt)

              params.currType=decodeURI(params.currType)
              params.contNo=decodeURI(params.contNo)
              params.dateType=decodeURI(params.dateType)
              params.realExpiDate=decodeURI(params.realExpiDate)

              params.interestDate=decodeURI(params.interestDate)
              params.startProfRule=decodeURI(params.startProfRule)
              params.tradCode=decodeURI(params.tradCode)
              params.reqSeq=decodeURI(params.reqSeq)

              dispatch(routerRedux.push({ pathname: '/interestDetail', state: { dataSource: params } }));
            }else if (params.originKey==='customer_inquire_detail'){
              //-----
              if(params.custType==='02'&&params.curStat==='01')    //潜在以及正常状态
              {
                if(params.custClass==='01')
                  dispatch(routerRedux.push({pathname:'/personalLatentCustomerEdit',
                    state:{
                      customer:params,
                      mode:'edit'
                    }}));
                else dispatch(routerRedux.push({pathname:'/orgCusAddMore',
                  state:{
                    orgCust:params,
                    mode:'edit'
                  }}));
              }
              else if(params.custClass==='01')      //个人客户详情
              {
                let custType = params.custClass;
                if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
                dispatch(routerRedux.push({pathname:'/personalCusDetail',
                  state:{
                    detail: {custID: params.custID,rejectFlag: '1'},
                    hold: {certType: params.certType,custType: custType==='1'?'1':'0',certNo: params.certCode},//custType:"1",certType:"01",certNo:"1234567TTT"
                    progress: 'perCustomer',
                    custSource: decodeURI(params.custSource)
                  }}));
              }
              else if(params.custClass==='02')  //机构客户详情
              {
                let custType = params.custClass;
                if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
                dispatch(routerRedux.push({
                  pathname: '/orgCusDetail',
                  state: {
                    detail: {rejectFlag: '1',busiID: params.custID},
                    hold: {certType: params.certType,custType: custType==='1'?'1':'0',certNo: params.certCode}  //custType:"1",certType:"01",certNo:"1234567TTT"
                  }
                }));
              }
              //--------------------------

            }else if(params.originKey === 'payment_of_interest'){
              dispatch(routerRedux.push({pathname:'/paymentOfInterestCnt'}));
            } else if(params.originKey === 'private_type_list'){
              dispatch(routerRedux.push({pathname:'/biTypeInputListCnt'}));
            }else if (params.originKey === 'redeem') {
              dispatch(routerRedux.push({ pathname: '/redeemList', state: { from: 'outHint' } }));
            } else {
              dispatch(routerRedux.push({
                pathname: pathnameDetail,
                state: params.prodName ? {prodName: decodeURI(params.prodName), mgrCode: params.userId} : {}
              }));
            }
          }
      }else {
        Tool.removeLocalItem('UserToken');
        dispatch(routerRedux.push({pathname:'/ErrorPage'}));
      }
     dispatch({
      type: 'main/getUserName',
      payload: {
        backMethod: (data) => {
          let cnName = data
          watermark.initialize({
            watermark_txt0: cnName,
            watermark_txt1: userObj.userId || params.userId,
            watermark_txt : "海银财富",
            watermark_id: 'root'
          });
        },
      },
    });
    }

  render(){
    return (
      <div>
        <div>{this.state.info}</div>
      </div>
    );
  }
}
function connectMain({main})
{
  return {main};
}
export default connect(connectMain)(MainComponent);
