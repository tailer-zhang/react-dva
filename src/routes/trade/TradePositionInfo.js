//客户持仓查询 赵博文

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Title from '../../components/product/Title';
import TradePositionInfoTabs from '../../components/trade/TradePositionInfoTabs';
import { SearchBar, Drawer, DatePicker } from 'antd-mobile';
//import TradePositionInfoFilter from './TradePositionInfoFilter';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import styles from '../../styles/trade/fundInquireFilter.less';

class TradePositionInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      open: false,
      position: 'right',
    };
  }

  onCloseMethord(filterArgs)
  {
    let {dispatch} = this.props;
    this.setState({
      open:false
    });
    dispatch({
      type: 'trade/fetchCustShrList',
      payload: filterArgs,
    })
  }


  searchEvent(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchCustShrList',
      payload: {pageSize: '10',pageNumber: '1',
      keyWord: keyWord}
    })
  }

  clear(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchCustShrList',
      payload: {keyWord: ''}
    })
  }

  render(){
    const {dispatch,trade,filterArgs} = this.props;
    const TitleProps = {
      title: '客户持仓查询',
      showBack:'no'
};
    let confAmtCode = '1';

    return(
      <div style={{height:'100%',backgroundColor:'#efeff4'}}>
        <div style={{position:'fixed',top:'0',zIndex:'2',width:'100%'}}>
          <Title {...TitleProps}>
          </Title>
          <SearchBar  placeholder="客户名称/产品名称"
                      onSubmit={this.searchEvent.bind(this)}
                      defaultValue={trade.keyWord}
                      onClear={this.clear.bind(this)}
                      />
        </div>
          <div className={tradeStyles.boxScrollTra}>
            <TradePositionInfoTabs custShrListData={trade} dispatch={dispatch} confAmtCode={confAmtCode}/>
        </div>
      </div>
    );
  }
}


function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(TradePositionInfo);
