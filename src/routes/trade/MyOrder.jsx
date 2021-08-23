//我的预约
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux,browserHistory,} from 'dva/router';
import Title from '../../components/product/Title';
import TransList4 from '../../components/share/TransList4';
import OrderFilter from '../../components/share/orderFilter';
import { SearchBar,WhiteSpace,DatePicker,InputItem,List,Drawer } from 'antd-mobile';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const Item = List.Item;


 class MyOrder extends React.Component{
  constructor() {
		 super();
     this.state = {
       open: false,
       position: 'right',
       isFilter:false
     };
     this.onOpenChange=this.onOpenChange.bind(this);
	}

  onOpenChange(e) {
    this.setState({ open: !this.state.open });

    // if(e){
    //   e.preventDefault();
    // }
  }

  searchEvent(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchMyOrder',
      payload: {
        loadingMore:false,
        keyWord: keyWord
      }
    })
  }

  clear(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchMyOrder',
      payload: {keyWord: '',loadingMore:false}
    })
  }

  onCloseMethord(filterArgs)
  {
    let {dispatch} = this.props;
    this.setState({
      open:false,
      isFilter:true
    });
    dispatch({
      type: 'trade/fetchMyOrder',
      payload: {
        filterArgs:filterArgs,
        loadingMore:false
      },
    })
  }


  render () {
    let { dispatch,trade,keyWord,onOpenChange } = this.props;
    let { isFilter } = this.state;
    let dataSource = trade.orderList;
    const sidebar =(<OrderFilter
        dispatch={dispatch}  dataSource={dataSource}
        filterArgs={trade.filterArgs}
        onCloseMethord={this.onCloseMethord.bind(this)}/>)
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    const titleProps = {
      title:'我的预约',
      showBack:'no',
    };
    return (
      <div style={{ height: '100%',position: 'relative',display: 'flex',flexDirection:'column' }}>
          <Drawer
            className={styles.myDrawer}
            sidebar={sidebar}
          style={{height:document.body.clientHeight}}
            dragHandleStyle={{ display: 'none'}}
            contentStyle={{ color: '#A6A6A6', textAlign: 'center',height:'100%'}}
            {...drawerProps}
            >
              <div style={{position:'fixed',top:'0',zIndex:'0',width:'100%'}}>
                <Title {...titleProps}>
                <p className={redeemList.orderImg} onClick={(e)=>{
                    // e.preventDefault();
                    this.onOpenChange();
                  }}>
                    <img src={isFilter==false?require('../../image/icon/orde_02.png'):require('../../image/icon/order.png')}/></p>
                </Title>
                <SearchBar  placeholder="客户名称/产品名称"
                            onSubmit={this.searchEvent.bind(this)}
                            defaultValue={trade.keyWord}
                            onClear={this.clear.bind(this)}
                            />
              </div>
              <div className={redeemList.boxScroll}>
                <TransList4 dispatch={dispatch} trade={trade} dataSource={trade.orderList}/>
              </div>
          </Drawer>
      </div>
    );
  }
}

function connectProdunctFunc({trade,formStorage})
{
  return {trade,formStorage};
}
export default connect(connectProdunctFunc)(MyOrder);
