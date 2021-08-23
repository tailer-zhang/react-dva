//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List , ListView , Icon } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/customer/customerAdd.less';
import redeemList from '../../styles/trade/redeem.less';


class TransList4 extends React.Component{
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
       ds:ds,
       isLoading:false
    };
  }

  onEndReached(event) {
    let { trade,dispatch } = this.props;
    let {loadingMore,loading} = trade;
    console.log('======ppp',loadingMore,event);
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'trade/fetchMyOrder',payload:{loadingMore:true}});
    }
  }

  touchCell(rowData,sectionID,rowID,e){
    console.log('单个数据---',rowData)
    let { dispatch } = this.props;
    dispatch(routerRedux.push({pathname:'/OrderDetail',state:rowData}));
  }

  /*
   *进入预约编辑页面
   **/
  goOrderEdit(rowData,sectionID,rowID,e){
    let evt = e ? e : window.event;
    if (evt.stopPropagation) {        //W3C
        evt.stopPropagation();
    }else {       //IE
       evt.cancelBubble = true;
    }
    let { dispatch } = this.props;
    dispatch(routerRedux.push({pathname:'/appoint',state:{'basicData': rowData}}))
  }

   rowRender(rowData,sectionID,rowID){
     return (
       <div key={rowID}
         style={{
           padding: '0.4rem 0.4rem',
           backgroundColor: 'white',
           width:'100%',
           height:'3.3335rem'
         }}
         className={redeemList.list} onClick={this.touchCell.bind(this,rowData,sectionID,rowID)}
       >
           <section className={redeemList.listTitle2}>
             <div className={redeemList.prodName} style={{maxWidth:'48%'}}>{rowData.prodName}</div>
             {rowData.confStat&&rowData.confStat==0&&rowData.recStatValue==='1'?<div className={redeemList.editIcon} onClick={this.goOrderEdit.bind(this,rowData,sectionID,rowID)}><img src={require('../../image/icon/edit.png')}/></div>:null}
             <div className={redeemList.auditCust} style={{width:'43%',paddingTop:' 0.133rem'}}>
               {
                 rowData.confStat == 1 ? <p className={redeemList.tradeType} style={{width:'46%',borderRadius:'0.4667rem',color:'#ffffff',backgroundColor:'#008000',paddingTop:'0.04rem' ,float:'left',height:'0.48rem',lineHeight:'0.45rem'}}>{rowData.confStatName}</p> :
                   (rowData.confStat == 0 ? <p className={redeemList.tradeType} style={{width:'46%',borderRadius:'0.4667rem',color:'white',backgroundColor:'#f22f33',paddingTop:'0.04rem' ,float:'left',height:'0.48rem',lineHeight:'0.45rem'}}>{rowData.confStatName}</p> :
                     <p className={redeemList.tradeType} style={{width:'46%',borderRadius:'0.4667rem',color:'#ffffff',backgroundColor:'#f22f33',paddingTop:'0.04rem' ,float:'left',height:'0.48rem',lineHeight:'0.45rem'}}>{rowData.confStatName}</p>)
               }

              <p className={redeemList.auditType} style={{float:'left',width:'46%',margin:'0',lineHeight:'0.45rem'}}>{rowData.chkStat}</p>
             </div>
           </section>
           <ul className={styles.redeemUl} >
              <li>
                <p className={styles.transMoney}>{rowData.resvAmt}<span></span></p>
                <section>预约金额(人民币)</section>
              </li>
              <li>
              <p className={styles.listUname}>{rowData.custName}</p>
              <section>客户名称</section>
              </li>
           </ul>
         {rowData.recStat === '有效'?<img className={styles.usefulImg} src={require('../../image/trade/useful.png')}/>:<img className={styles.usefulImg} src={require('../../image/trade/unuseful.png')}/>}
       </div>
     );
   }

  render() {
    let { dispatch,dataSource,trade } = this.props;
    let { loadingMore,loading } = trade;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height:20
      }}
      />
    );
    if(dataSource.length>0){
      return (<div style={{width: '100%',height:'100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{padding: 20, textAlign: 'center' }}> </div>);
           else return <div />;
         }}
          renderRow={this.rowRender.bind(this)}
          renderSeparator={separator}
          className="am-list"
          style={{
            height: '100%',
          }}
          pageSize={10}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={50}
          onScroll={() => { console.log('scroll'); }}
          //useBodyScroll
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={1000}
        />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>)

    };
};


export default TransList4;
