import React from 'react';
import { SearchBar} from 'antd-mobile';
import {connect} from 'dva';

//搜索框
export default class TradeSearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  searchEvent(custName) {
    let {dispatch} = this.props;
    // console.log('customer------',custName);
    dispatch({
      type: 'tradeSafe/tradeInquire',
      payload: {custName: custName,loadingMore:false}
    })
  }

  clearEvent(custName) {
    let {dispatch} = this.props;
    dispatch({
      type: 'tradeSafe/tradeInquire',
      payload: {custName:'',loadingMore:false}
    })
  }

  render() {
    let {custName,dispatch} = this.props;
    return (
      <div>
        <SearchBar
          placeholder="产品名称"
          onSubmit={this.searchEvent.bind(this)}
          onClear={this.clearEvent.bind(this)}
         />
      </div>
  );
  }
};
