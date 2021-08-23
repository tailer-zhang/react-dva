//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import {List, Button, ListView, Toast} from 'antd-mobile';
import CompListTitle2 from '../../components/share/CompListTitle2';
import EmptyResult from '../../components/share/EmptyResult';
import Dic from '../../utils/dictionary';

import styles from '../../styles/customer/customerAdd.less';
import redeemList from '../../styles/trade/redeem.less';

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const TransList3 = React.createClass({
  getInitialState() {
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    return {
      ds:ds,
      isLoading: false,
    };
  },

  onEndReached(event) {
    let { tradeRecList,dispatch } = this.props;
    let {loadingMore,loading} = tradeRecList;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'tradeRecList/fetchRemote',payload:{loadingMore:true}});
    }
  },

  // touchCell(rowData,sectionID,rowID){
  //   dispatch(routerRedux.push({pathname:'/RecallDetail',state:rowData}));
  //   console.log("顶顶顶顶",rowData);
  // },

  render() {
    let { dispatch,dataSource,tradeRecList } = this.props;
    let { loadingMore,loading } = tradeRecList;
    function selectPage(rowData, sectionID, rowID){
      if(rowData.tradCode=="0020"||rowData.tradCode=="0022"){

        if(rowData.addiOrd=='N'&&rowData.signType == "02"){
          Toast.loading('请求中...',30,undefined,true);
          dispatch({
            type:'tradeRecList/validRecall',
            payload:{
              params:{
                id:rowData.id,
                orderContNo:rowData.orderContNo
              },
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code === '00'){
                  dispatch(routerRedux.push({pathname:'/RecallDetail',state:{id:rowData.id}}))
                }else{
                  Toast.fail(data&&data.message?data.message:'校验失败!',3);
                  setTimeout(()=>{
                    Toast.hide()
                  },3500)
                }
              }
            }
          })
        }else if(rowData.addiOrd == "Y" && rowData.signType == "02" && rowData.signFlag != "1") {
          Toast.fail('此笔追加交易虽已打款，但还未签署电子合同，暂不可直接撤销操作。请联系总部运营，先进行资金处理，再进行交易作废!',3);
          setTimeout(()=>{
            //防止误点造成toast关闭不掉
            Toast.hide()
          },3000)
        }else{
          dispatch(routerRedux.push({pathname:'/RecallDetail',state:{id:rowData.id}}))
        }

      }
      else if(rowData.tradCode=="0024" || rowData.tradCode=="0036"){
        dispatch(routerRedux.push({pathname:'/BuyokInfo',state:{id:rowData.id}}))
      }
    };

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height: 20,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      let tradCode = rowData.tradCode,desc='',value='';
      if(tradCode=='0024'||tradCode=='0033')//赎回或转让
      {
        desc = '申请份额(份)';
        value = rowData.reqShr;
      }
      else if(tradCode=='0052'&&data.reqShr)
      {
        desc = '申请份额(份)';
        value = data.reqShr;
      }
      else if(tradCode == '0036') {
        desc = '转换份额(份)';
        value = rowData.reqShr;
      }
      else {
        desc = '申请金额(元)';
        value = rowData.reqAmt;
      }

      return (
        <div key={rowID}
          style={{
            padding: '0.4rem 0.4rem',
            backgroundColor: 'white',
            width:'100%',
            height:'3.3335rem',
            overflowY:'hidden'
          }}
            onClick={()=>selectPage(rowData, sectionID, rowID)}
        >

        <div>
            <section className={redeemList.listTitle2}>
              <div className={redeemList.prodName} style={{width:'84%'}}><span className={redeemList.tradeType} style={{display:'inline-block',width:'0.86667rem',marginTop:'0'}}>{Dic.fetchDicValue('tradCode',rowData.tradCode)}</span>{rowData.prodName}</div>
              <div className={redeemList.redeemBtn} style={{width:'16%'}}> <p className={redeemList.p2}>撤单</p></div>
            </section>
        </div>
        <ul className={styles.redeemUl}>
             <li>
               <p className={styles.transMoney}>{value}<span></span></p>
               <section>{desc}</section>
             </li>
             <li>
             <p className={styles.listUname}>{rowData.custName}</p>
             <section>客户名称</section>
             </li>
           </ul>
        </div>
      );
    };
    if(dataSource.length>0){
      return (<div style={{height:'100%',width: '100%' }}>
        <ListView ref="lv"
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{ padding: 30, textAlign: 'center' }}>
             </div>);
           else return <div />;
         }}
          style={{height:'100%'}}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={50}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={1000}
        />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>)
  },
});


export default TransList3;
