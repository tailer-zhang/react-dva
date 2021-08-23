import React from 'react';
import {routerRedux} from 'dva/router';
import { Toast} from 'antd-mobile';
import getNameOfBank from '../../utils/Bank'
import positionStyle from '../../styles/customer/positionStyle.less';
import { ListView } from 'antd-mobile';

export default class PositionList extends React.Component{
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

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{height: '20px',backgroundColor: '#F5F5F5'}} />
    )
  }

  onEndReached= () => {
    const { dispatch, location } = this.props;
    const { loadingMore, reach_bottom } = this.props.dataSource;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'bank/fetchPositionList', payload: { loadingMore: true, source: location.state } });
  }

  clickCell(rowData, sectionID, rowID)
  {
    if (rowData.tradShr != 0 && rowData.tradShr != null) {
      Toast.fail('有交易冻结份额的持仓不可以换卡',3);
      return;
    }
    if (rowData.abnoShr != 0 && rowData.abnoShr != null) {
      Toast.fail('有异常冻结份额的持仓不可以换卡',3);
      return;
    }
    let {dispatch,location} = this.props;
      dispatch({
        type:'formStorage/fetch',
        payload:{
          newBank: ''
        }
      });
      dispatch(routerRedux.push({
        pathname: '/accountChange',
        state: {data: rowData, originData: location.state}
      }));
  }

  renderRow=(rowData, sectionID, rowID)=> {
    return (
      <div key={rowID} className={positionStyle.content} onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}>
        <p className={positionStyle.head}>{rowData.prodName}</p>
        <div className={positionStyle.tag}><i className={positionStyle.inner}>{rowData.prodExpiName || '1'}</i></div>
        <p className={positionStyle.name}>客户名称：{rowData.custName}</p>
        <p className={positionStyle.card}>受益账户：{rowData.bankName}|{rowData.cardNo}</p>
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
      <div style={{backgroundColor: '#F5F5F5'}}>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource.cusPositionList)}
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
