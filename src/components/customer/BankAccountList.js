import React from 'react';
import {routerRedux} from 'dva/router';
import banckAccountStyle from '../../styles/customer/banckAccountStyle.less';
import { ListView } from 'antd-mobile';

export default class BankAccountList extends React.Component{
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
    const { dispatch, location} = this.props;
    const { loadingMore, reach_bottom } = this.props.dataSource;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'bank/fetchbankAccountList', payload: { loadingMore: true, source: location.state } });
  }

  clickCell(rowData, sectionID, rowID)
  {
    let {dispatch,location} = this.props;
    dispatch(routerRedux.push({
      pathname: '/bankAccountModifyCnt',
      state: {data: rowData}
    }));
  }

  renderRow=(rowData, sectionID, rowID)=> {
    return (
      <div key={rowID} className={banckAccountStyle.content} onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}>
        <div className={banckAccountStyle.header}>
          <div className={banckAccountStyle.headerFir}>
            {rowData.bankAbbr ? <img src={require('../../bank/' + rowData.bankAbbr + '.png')}/> : null}
            <p className={banckAccountStyle.headerTitle}>{rowData.bankName}</p>
          </div>
          <div className={banckAccountStyle.apply}>
            申请
          </div>
        </div>
        <p className={banckAccountStyle.mid}>{rowData.cardNo}</p>
        <p className={banckAccountStyle.last}>{rowData.bankName}</p>
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
      <div className={banckAccountStyle.listView}>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource.bankAccountList)}
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
