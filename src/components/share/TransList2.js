//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
import { List, Button ,ListView, Popup,Radio, Modal} from 'antd-mobile';
import CompListTitle2 from '../../components/share/CompListTitle2';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/customer/customerAdd.less';
import redeemList from '../../styles/trade/redeem.less';
import {validProdInfo} from '../../services/tradeRedList';
import PopShow from './PopShow';
const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
const RedList = (props)=>{
  let { rowData } = props;
  return (
    <div>
      <div>
          <section className={redeemList.listTitle2}>
            <div className={redeemList.prodName} style={{width:'85%'}}>{ rowData.prodName}</div>
            <div className={redeemList.redeemBtn} style={{width:'14%',backgroundColor:'#f22f33',borderRadius:'0.13333rem'}}>赎回</div>
          </section>
      </div>
      <ul className={styles.redeemUl} >
           <li>
             <p className={styles.transMoney}>{ rowData.totShr }<span></span></p>
             <section>持有份额(份)</section>
           </li>
           <li>
             <p className={styles.listUname}>{ rowData.custName }</p>
             <section>客户名称</section>
           </li>
      </ul>
    </div>
  )
}

class TransList2 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
       ds:ds,
       isLoading:false,
        value:'',
      popShow:false,
      radioData:[],
      rowData:'',
      slideUp:false,
      openShrId:''
    };
  }

  onEndReached(event) {
    console.log("000000000000000000000000000");
    let { tradeRedList,dispatch } = this.props;
    let {loadingMore} = tradeRedList;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'tradeRedList/fetchRemote',payload:{loadingMore:true}});
    }

  }
  redeem(rowData){
    let {dispatch}  = this.props;
    this.setState({
      rowData
    })
    validProdInfo({prodId:rowData.prodId}).then(res=>{
     let {data} = res;
      if(data.code=='00'){
        if(data.model== 'Y') {
          dispatch({
            type:'tradeRedList/getRedeemList',
            payload:{
                params:{custShrId:rowData.id,flag:'Y'},
                backMethord: (datas)=>{
                  this.showPop(datas)
                }
              }
          });
          return;
        }
        dispatch(routerRedux.push({pathname:'/TradeInfoSee',state:{tradeRedeem:rowData,mode:'show',openShrId:''}}))
      }else{
        // showPop(data.message)
        alert('提示', `${data.message}`, [
          { text: '确定' },
      ])
      }
    })

  }
  onChange (val) {
    this.setState({
      value: val.value,
      openShrId: val.id
    });
  }
  //关闭弹框
  closeModal(){
    this.setState({
      slideUp:false,
      openShrId:'',
      value:''
    })
    setTimeout(()=>{
      this.setState({
        popShow:false
      })
    },20)

  }
  //展示弹框
  showPop(data){
    if(!data) {
        alert('提示', '没有可赎回的份额信息', [
            { text: '确定' },
        ])
        return;
    };
    let radioData = data.map((item,index)=>{
      return {...item,value:index}
    })
    this.setState({
      popShow:true,
      radioData:radioData
    })
    setTimeout(()=>{
      this.setState({
        slideUp:true
      })
    },20)

  }
  onConfirm = () => {
    let {rowData,openShrId} = this.state;
    this.setState({
      popShow:false
    })
    let {dispatch} = this.props;
    dispatch(routerRedux.push({pathname:'/TradeInfoSee',state:{tradeRedeem:rowData,mode:'show',openShrId:openShrId}}))
  }
  render() {
    let { dispatch,dataSource,tradeRedList } = this.props;
    let { loadingMore,loading} = tradeRedList;
    let {popShow,radioData,value,slideUp,openShrId} = this.state;
    // function touchCell(rowData,sectionID,rowID){
    //   dispatch(routerRedux.push({pathname:'/TradeInfoSee',state:{tradeRedeem:rowData,mode:'show'}}));
    // }
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
            padding: '0.4rem 0.4rem',
            width:'100%',
            height:'3.3335rem'
          }}
          onClick={this.redeem.bind(this,rowData)}
        >
          <RedList rowData={rowData}/>
        </div>
      );
    };
    if(dataSource.length>0){
      return (<div style={{ width: '100%',height:'100%' }}>
        <ListView ref="lv"
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{ padding: 0, textAlign: 'center' }}>
             </div>);
           else return <div />;
         }}
          style={{
            height:'100%'
          }}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={10}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={50}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={1000}
        />
        <PopShow popShow={popShow} value={value} openShrId={openShrId} slideUp={slideUp} onChange={this.onChange.bind(this)}  onConfirm={()=>this.onConfirm()} closeModal={this.closeModal.bind(this)} radioData={radioData} />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/> </div>);
  }
}

export default TransList2;
