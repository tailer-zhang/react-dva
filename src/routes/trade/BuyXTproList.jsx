//私募产品购买页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Button ,ListView, SearchBar } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import XTProList from '../../components/trade/XTProList';//私募产品列表组件

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';


class BuyXTproList extends Component {
constructor(props) {
   super(props);
}
searchEvent(keyWord) {
  let {dispatch} = this.props;
  dispatch({
    type: 'trade/fetchRemote',
    payload: {pageSize: '10',pageNumber: '1',
    keyWord: keyWord}
  })
}

clear(keyWord){
  let { dispatch } = this.props;
  dispatch({
    type: 'trade/fetchRemote',
    payload: {keyWord: ''}
  })
}

  render()
  {
    let { dispatch,trade,keyWord} = this.props;
    // console.log('11111111111-------------',trade);
    const TitleProps = {
      title:'私募产品购买',
      showBack:'no'
    };
    return (
      <div style={{backgroundColor: '#efeff4',height:'100%'}}>
          <Title {...TitleProps}></Title>
            <SearchBar placeholder="客户名称/产品名称"
                       onSubmit={this.searchEvent.bind(this)}
                       defaultValue={trade.keyWord}
                       onClear={this.clear.bind(this)}
                       />
        <div className={tradeStyles.boxScroll} >
          <XTProList dataSource={trade.buyList} trade={trade} dispatch={dispatch} />
        </div>
      </div>
    );
  }
};

function connectTradeFunc({trade})
{
  return {trade};
}

export default connect(connectTradeFunc)(BuyXTproList);
