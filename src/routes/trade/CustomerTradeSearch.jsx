//客户交易查询页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Dic from '../../utils/dictionary';
import { List, Button ,ListView, SearchBar, Drawer, DatePicker } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import CusTradeList from '../../components/trade/CusTradeList';//客户交易列表组件
import CustomerTradeFilter from './CustomerTradeFilter';


import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import styles from '../../styles/trade/fundInquireFilter.less';
// <p className={tradeStyles.WhiteSpace} style={{height:'64px'}}></p>样式不起作用了，高度没有，影响搜索框的显示

class CustomerTradeSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      open: false,
      position: 'right',
      isFilter:false,
    };
  }

  onOpenChange(isOpen) {
    this.setState({
      open: !this.state.open,
    });
  }

  onCloseMethord(filterArgs)
  {
    let {dispatch} = this.props;
    console.log('shuaixuanvthis.props ',this.props)
    console.log('filterArgs ',filterArgs)
    this.setState({
      open:false,
      isFilter:true
    });
    dispatch({
      type: 'trade/fetchSMTradeList',
      payload: {
        filterArgs:filterArgs,
        loadingMore:false
      },
    })
  }

  searchEvent(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchSMTradeList',
      payload: {loadingMore:false,
        keyWord: keyWord}
    })
  }

  clear(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchSMTradeList',
      payload: {
        loadingMore:false,keyWord: ''}
    })
  }

  render(){
    const TitleProps = {
      title: '客户交易查询',
      showBack:'no'
    };
    const {dispatch,trade,location} = this.props;
    const { isFilter } = this.state;
    const sidebar = (<CustomerTradeFilter filterArgs={trade.filterArgs} isFilter={isFilter} dispatch={dispatch} trade={trade} onCloseMethord={this.onCloseMethord.bind(this)}/>);

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange.bind(this),
    };

    return(
      <div style={{ height: '100%',position: 'relative',display: 'flex',flexDirection:'column',width:'100%' }}>
        <Drawer
          className={styles.myDrawer}
          sidebar={sidebar}
          dragHandleStyle={{ display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          {...drawerProps}
        >
          <div style={{position:'fixed',top:'0',zIndex:'2',width:'100%'}}>
            <Title {...TitleProps}>
              <div style={{position:'absolute',top:'0px',right:'0.4rem',width:'0.6rem',height:'1.28rem',paddingTop:'10px'}} onTouchStart={this.onOpenChange.bind(this)}>
                <img src={isFilter==false?require('../../image/icon/orde_02.png'):require('../../image/icon/order.png')} style={{width:'85%'}}/>
              </div>
            </Title>
            <div className={tradeStyles.searchWrap}>
              <SearchBar  placeholder="客户名称/产品名称"
                          onSubmit={this.searchEvent.bind(this)}
                          defaultValue={trade.keyWord}
                          onClear={this.clear.bind(this)}
              />
            </div>
          </div>
          <div className={tradeStyles.tabInput+ " " + tradeStyles.boxScrollTra}>
            <CusTradeList trade={trade} dispatch={dispatch} rejectFlag={'1'}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(CustomerTradeSearch);
