//客户资金查询 赵博文
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import { Drawer, List,InputItem,SearchBar } from 'antd-mobile';
import FoundInquireTabs from '../../components/trade/FundInquireTabs';
import Title from '../../components/product/Title';

import styles from '../../styles/trade/fundInquireFilter.less';
import tradeStyles from '../../styles/trade/trade.less';

class FundInquire extends React.Component{
  constructor(props) {
    super(props);
    let {trade} = props;
    this.state={
      open: false,
      position: 'right',
      isFilter:false,
      ...trade.filterArgs
    };

  }

  onOpenChange(isOpen) {
    this.setState({ open: !this.state.open });
  }

  renderList(key,selectValue) {
    let dic = Dic.fetchDicList(key);
    return (
      <ul>
        {
          Object.keys(dic).map((item,index) => {
            // console.log('selectValue',selectValue);
            // console.log('item',item)
              let value = dic[item];
              let className = '';
              if(selectValue === item) {
                className = styles.li;
              }
              return (
                <li onClick={this.clickLi.bind(this,item,key)}  className={className} key={index}>{ value }</li>
              )
            }
          )
        }
      </ul>
    )
  }

  clickLi(item,key) {
    if(key==='tradCode') {
      this.setState({
          tradCode : this.state.tradCode?'':item
        });
    } else if (key==='fundInquire1') {
        this.setState({
          chkBalStat :this.state.chkBalStat?'':item
        });
      }
  }

  render() {
    const {tradCode,chkBalStat,isFilter} = this.state;
    const onCloseMethord = (filterArgs) => {
      let {dispatch} = this.props;
      this.setState({
        open:false,
        isFilter:true
      });
      dispatch({
        type: 'trade/fetchCustamtList',
        payload: {
          filterArgs:filterArgs,
          loadingMore:false
        },
      })
    };
    const sidebar = (<div className={styles.total}>
      <div className={styles.right} style={{display: 'felx',flexDirection: 'column'}}>
        <div className={styles.padding}>
          <p>交易类型</p>
          <div className={styles.flex}>
            { this.renderList('tradCode',tradCode) }
          </div>
        </div>
        <div className={styles.padding}>
          <p>核对状态</p>
          <div className={styles.flex}>
            { this.renderList('fundInquire1',chkBalStat) }
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.reset} onClick={()=>{
            this.setState({tradCode:'',chkBalStat:''});
            onCloseMethord({});
          }}>重置</div>
          <div className={styles.submit} onClick={()=>{
            onCloseMethord({
              tradCode : this.state.tradCode,
              chkBalStat :this.state.chkBalStat
            });
          }}>确定</div>
        </div>
      </div>
    </div>);

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange.bind(this),
    };
    const titleProps = {
      title: '客户购买资金查询',
      showBack:'no'
};
    const {dispatch,trade} = this.props;
    const searchEvent = (value)=>{
      dispatch({type:'trade/fetchCustamtList',payload:{keyWord:value,loadingMore:false}});
    };
    const clear = ()=>{
      dispatch({type:'trade/fetchCustamtList',payload:{keyWord:'',loadingMore:false}});
    };
    return (
      <div style={{ height: '100%',position: 'relative',display: 'flex',flexDirection:'column' }}>
      <Drawer
        className={styles.myDrawer}
        sidebar={sidebar}
        dragHandleStyle={{ display: 'none' }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center',}}
        {...drawerProps}
      >
      <div style={{position:'fixed',top:'0',zIndex:'2',width:'100%'}}>
        <Title {...titleProps}>
          <div style={{position:'absolute',top:'0px',right:'0.4rem',width:'0.6rem',height:'1.28rem',paddingTop:'0.133rem'}} onTouchStart={this.onOpenChange.bind(this)}>
            <img src={isFilter==false?require('../../image/icon/orde_02.png'):require('../../image/icon/order.png')} style={{width:'85%'}}/>
          </div>
        </Title>
        <div>
          <FundSearch searchValue={trade.keyWord} searchEvent={searchEvent} clear={clear}/>
        </div>
      </div>
        <div className={tradeStyles.boxScrollTra}>
          <FoundInquireTabs custAmtListData={trade} dispatch={dispatch}/>
        </div>
      </Drawer>
    </div>);
  }
}


const FundSearch = ({searchValue,searchEvent,clear}) => {
  return (
    <div>
      <SearchBar placeholder="客户名称/产品名称" defaultValue={searchValue} onSubmit={(value)=>{searchEvent(value);}} onClear={clear}/>
    </div>
  )
}

function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(FundInquire);
