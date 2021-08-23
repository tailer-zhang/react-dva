import React,{Component} from 'react';
import {routerRedux} from 'dva/router';
import recordsStyle from '../../styles/customer/recordsStyle.less';
import { ListView } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

export default class RecordsList extends Component{
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
    const { loadingMore, reach_bottom } = this.props.dataSource;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'bank/getRecordsList', payload: { loadingMore: true } });
  }

  clickCell(rowData, sectionID, rowID)
  {
    let {dispatch} = this.props
    if(rowData.tradCode === '1006'){
      dispatch(routerRedux.push({pathname: '/rebutBankDetail', state: rowData}))
    }else {
      dispatch(routerRedux.push({pathname: '/cusRecordsDetail', state: rowData}))
    }
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{height: '20px',backgroundColor: '#F5F5F5'}} />
    )
  }

  renderRow=(rowData, sectionID, rowID)=>{
    return (
      <div key={rowID} className={recordsStyle.outContent} onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}>
        <div className={recordsStyle.first}>
          <div className={recordsStyle.head_title}>
            <p className={recordsStyle.userName}>{rowData.custName&&rowData.custName.length > 4 ? rowData.custName.substring(0, 4) + '...' : rowData.custName}&nbsp;</p>
            {rowData.sex=='男' ? <img src={require("../../image/icon/male.png")} /> : rowData.sex=='女' ? <img src={require("../../image/icon/female.png")} /> : null }
          </div>
          <p className={recordsStyle.rightText}>{rowData.tradCodeName}  {rowData.confStatName}</p>
        </div>
        <p>产品名称：{rowData.prodName}</p>
        <p className={recordsStyle.topStyle}>原受益账户：{rowData.origBankName} | {rowData.origCardNo}</p>
        <p className={recordsStyle.topStyle}>新受益账户：{rowData.bankName} | {rowData.cardNo}</p>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.dataSource;
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
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource.recordsList)}
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
