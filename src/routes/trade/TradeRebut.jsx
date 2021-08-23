//交易 驳回修改 5-1
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import RebutList from '../../components/share/RebutList';
import RebutFilter from '../../components/share/RebutFilter';
import { SearchBar,WhiteSpace,DatePicker,InputItem,List,Drawer } from 'antd-mobile';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';

import rebutStyles from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';


const Item = List.Item;

class TradeRebut extends React.Component{
  constructor() {
     super();
     this.state = {
       open: false,
       position: 'right',
       isFilter:false
     };
  }

  searchEvent(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchTaskList',
      payload: {pageSize: '10',pageNumber: '1',
      keyWord: keyWord}
    })
  }

  clear(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchTaskList',
      payload: {keyWord: ''}
    })

  }

  onOpenChange(e) {
    this.setState({ open: !this.state.open });
    // if(!e){
    //   e=='';
    // }
    // else e.preventDefault();
  }

  onCloseMethord(filterArgs)
  {
    let {dispatch} = this.props;
    this.setState({
      open:false,
      isFilter:true
    });
    dispatch({
      type: 'trade/fetchTaskList',
      payload: filterArgs,
    })
  }

  render () {
    let {dispatch,trade,onOpenChange,props,keyWord} = this.props;
    let { isFilter } = this.state;
    const sidebar =(<RebutFilter dispatch={dispatch} style={{zIndex:'9999'}}  onCloseMethord={this.onCloseMethord.bind(this)}/>)

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange.bind(this),
    };
    const titleProps = {
      title:'驳回修改',
      showBack:'no',
    };

    return (
      <div style={{backgroundColor:'#efeff4',height:'100%',fontFamily:'PingFangSC-Regular'}}>
        <p className={rebutStyles.pFull}></p>
        <Drawer
          className={styles.myDrawer}
          sidebar={sidebar}
          dragHandleStyle={{height:'100%', display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          {...drawerProps}
        >
        <div style={{position:'fixed',top:'0',zIndex:'0',width:'100%'}}>
          <Title {...titleProps}>
            <div className={rebutStyles.orderImg} onTouchStart={this.onOpenChange.bind(this)}>
              <img src={isFilter==false?require('../../image/icon/orde_02.png'):require('../../image/icon/order.png')}/>
            </div>
          </Title>
          <SearchBar  placeholder="客户名称/产品名称"
                      onSubmit={this.searchEvent.bind(this)}
                      defaultValue={trade.keyWord}
                      onClear={this.clear.bind(this)}
                      />
        </div>
          <div className={rebutStyles.boxScroll}>
            <RebutList dispatch={dispatch} trade={trade} dataSource={trade.buyList}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

function connectProdunctFunc({ trade ,Rebutpostpone}){
 return { trade ,Rebutpostpone}
}
export default connect(connectProdunctFunc)(TradeRebut);
