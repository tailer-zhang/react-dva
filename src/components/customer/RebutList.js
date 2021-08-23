import React,{Component} from 'react';
import {routerRedux} from 'dva/router';
import recordsStyle from '../../styles/customer/recordsStyle.less';
import rebutStyle from '../../styles/customer/rebutStyle.less';
import { ListView } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';
import {Toast} from "antd-mobile/lib/index";
import { connect } from 'dva';

function connectSec({bank}) {
  return {bank}
}
@connect(connectSec)
export default class RebutList extends Component{
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

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.bank;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'bank/getRejectList', payload: { loadingMore: true } });
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{height: '20px',backgroundColor: '#F5F5F5'}} />
    )
  }

  clickCell(rowData, sectionID, rowID)
  {
   this.props.dispatch({
      type:'formStorage/fetch',
      payload:{
        newBank: ''
      }
    });
    let {dispatch} = this.props
    if(rowData.tradCode === '1006'){
      dispatch(routerRedux.push({pathname: '/accountChangeDetails', state: rowData}))
    }else {
      dispatch(routerRedux.push({pathname: '/rebutDetail', state: rowData}))
    }
  }

  modify(rowData){
    let {dispatch} = this.props;
    dispatch(routerRedux.push({pathname: '/rebutDetail',state: rowData}))
  }

  abolish(data){
    let {dispatch} = this.props
    let evt = e ? e : window.event;
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }else {
      evt.cancelBubble = true;
    }
    let saveValue = {
      origCardNo: data.origCardNo,
      cardNo: data.cardNo,
      custId: data.custId
    }
    dispatch({
      type:'bank/abolish',
      payload:{
        params:saveValue,
        backMethord:(data)=>{
          if(data&&data.code=='00'){
            Toast.fail('作废!',2);
          }else {
            Toast.fail(data&&data.message?data.message:'银行卡保存错误!',2);
          }
        }
      }
    });
    console.log('废除')
  }

  renderRow=(rowData, sectionID, rowID)=>{
    return (
      <div key={rowID} className={recordsStyle.outContent1} onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}>
        <div className={recordsStyle.first}>
          <div className={recordsStyle.head_title}>
            <p className={recordsStyle.userName}>{rowData.custName.length > 4 ? rowData.custName.substring(0, 4) + '...' : rowData.custName}&nbsp;</p>
            {rowData.sex=='男' ? <img src={require("../../image/icon/male.png")} /> : rowData.sex=='女' ? <img src={require("../../image/icon/female.png")} /> : null }
          </div>
          <p className={recordsStyle.rightText}>{rowData.tradCodeName}&nbsp;<span style={{color: '#E8191B'}}>{rowData.confStatName}&nbsp;&nbsp;</span></p>
        </div>
        <p>产品名称：{rowData.prodName}</p>
        <p className={recordsStyle.topStyle}>原受益账户：{rowData.origBankName} | {rowData.origCardNo}</p>
        <p className={recordsStyle.topStyle}>新受益账户：{rowData.bankName} | {rowData.cardNo}</p>
        <div className={rebutStyle.bottom}>
          <button type="button" onClick={this.modify.bind(this, rowData)}>修改</button>
          <button type="button" onClick={(e)=>{
            let {dispatch} = this.props
            let evt = e ? e : window.event;
            if (evt.stopPropagation) {
              evt.stopPropagation();
            }else {
              evt.cancelBubble = true;
            }
            let saveValue = {
              id: rowData.id
            }
            dispatch({
              type:'bank/abolish',
              payload:{
                params:saveValue,
                backMethod:(data)=>{
                  if(data&&data.code=='00'){
                    Toast.success('作废成功！')
                    dispatch({
                      type: 'bank/getRejectList',
                      payload: {
                        pageNum: 1,
                        loadingMore: false,
                        reach_bottom: false,
                        filterArgs: {},
                        rejectList: [],
                        source: location.state
                      },
                    })
                  }else {
                    Toast.fail(data&&data.message?data.message:'废除失败!',2);
                  }
                }
              }
            });
          }}>作废</button>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.bank;
    if (reach_bottom) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>没有更多了</div>
      )
    }
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>上拉加载更多</div>
    )
  }

  render() {
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.bank.rejectList)}
          renderRow={this.renderRow}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight, overflow: 'auto'}}
          pageSize={4}
          scrollRenderAheadDistance={20}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
      </div>);
  }
};
