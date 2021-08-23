import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button, ListView, Toast,Modal } from 'antd-mobile';
import XTListItem1 from './XTListItem1';//产品列表项
import EmptyResult from '../../components/share/EmptyResult';
import SignSetModal from './signSetModal/SignSetModal';

import proDetailStyles from '../../styles/product/ProductDetail.less';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';//样式文件

const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const XTProList = React.createClass({
  getInitialState() {

    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return {
      ds:ds,
      isLoading: false,
      show:false,
      modalMsg:''
    };
  },

  onEndReached(event) {
    let {trade,dispatch} = this.props;
    let { loadingMore,loading ,reach_bottom} = trade;
    if(event==undefined||loadingMore){
          return;
    }
    if (reach_bottom) return
      dispatch({
        type:'trade/fetchRemote',
        payload:{loadingMore:true}
      })

  },
  clickTradeInput(rowData,e){
    let Alert = Modal.alert;
    // console.log(rowData)
    let {dispatch} = this.props;
    // console.log('去请求',this.props)
    //股权类
    if(rowData.earnType ==='2'||!rowData.signType) {
      this.showModal(rowData);
      return
    }
    // if(!rowData.signType){
    //   Alert('友情提醒','请先设置合同签署方式',[{ text: '知道了', onPress: () => console.log('ok') }])
    //   return;
    // }
    this.goXTTradeInput(rowData)
    // dispatch({
    //   type:'trade/fetchvalidProdLevel',
    //   payload:{
    //     orderId:rowData.orderId+'',
    //     backMethord:(data)=>{
    //       console.log('请求后data',data)
    //       Toast.hide();
    //       if(data&&data.code === '00'){
    //         dispatch(routerRedux.push({
    //           pathname:'/XTTradeInput',
    //           state:{rowData:rowData}}))
    //       }else {
    //         Toast.fail(data&&data.message?data.message:'校验失败!',2);
    //       }
    //     }
    //   }
    // });
  },
  goXTTradeInput(rowData){
    let {dispatch} = this.props;
    Toast.loading('请求中...',30,undefined,true);
    dispatch({
      type:'trade/fetchvalidProdLevel',
      payload:{
        orderId:rowData.orderId+'',
        backMethord:(data)=>{
          console.log('请求后data',data)
          Toast.hide();
          if(data&&data.code === '00'){
            dispatch(routerRedux.push({
              pathname:'/XTTradeInput',
              state:{rowData:rowData}}))
          }else {
            Toast.fail(data&&data.message?data.message:'校验失败!',2);
          }
        }
      }
    });
  },
  closModal(){
    console.log(this)
    this.setState({
      show:false
    })
  },
  showModal(prod){
    this.setState({
      show:true,
      modalMsg:prod
    })
  },
  render() {
  let {dataSource,dispatch,trade} = this.props;
  // console.log('0001102020',dataSource);
  let { loadingMore,loading ,reach_bottom} = trade;
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height: 20,
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
       <div key={rowID}
            style={{
              width:'100%',
            }}
            onClick={this.clickTradeInput.bind(this,rowData)}>
          <XTListItem1 showsignmodal={this.showModal} data={rowData} />
        </div>
      );
    };
    const renderFooter = () => {
      if (reach_bottom) {
        return (
          <div style={{'textAlign':'center'}}>没有更多了</div>
        )
      }
      return (
        <div style={{'textAlign':'center'}}>上拉加载更多</div>
      )
    }
    if(dataSource.length>0){
    return (

      <div style={{ margin: '0 auto', width: '100%',height:'100%' }}>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderRow={row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: '100%', overflow: 'auto', border: '1px solid #ddd', margin: '0.1rem 0 0 0' }}
          // contentContainerStyle={{ width: document.body.clientWidth }}
          pageSize={4}
          scrollRenderAheadDistance={20}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
          onEndReached={this.onEndReached}
          renderFooter={renderFooter}
        />
        <SignSetModal dispatch={dispatch} goJump={this.goXTTradeInput} data={this.state.modalMsg} closemodal={this.closModal} isshow={this.state.show} />
    </div>

    );
    }else if(loading){
      return (<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(
      <div style={{height:'100%',backgroundColor:'#f7f7f7'}}>
        <EmptyResult />
      </div>
    );

  },
});
export default XTProList;
