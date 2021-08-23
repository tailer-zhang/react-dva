import React from 'react';
import { SearchBar} from 'antd-mobile';
import {connect} from 'dva';

//搜索框
export default class TradeSearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  searchEvent(prodName) {
    let {dispatch} = this.props;
    console.log('prodName------',prodName);
    dispatch({
      type: 'tradeSafe/fetchSereenProductName',
      payload: {prodName: prodName,id:'',loadingMore:false}
    })
  }

  clearEvent(prodName) {
    let {dispatch} = this.props;
    dispatch({
      type: 'tradeSafe/fetchSereenProductName',
      payload: {prodName:'',id:'',loadingMore:false}
    })
  }

  render() {
    let {prodName,dispatch} = this.props;
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
