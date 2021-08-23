//B类产品查询 赵博文
import React,{Component} from 'react';
import Title from '../../components/product/Title';
import {connect} from 'dva';
import TradeSafeInquirelist from '../../components/trade/TradeSafeInquirelist';
import TradeSearchBar from '../../components/trade/TradeSearchBar';
import TradeSafeFilter from '../../routes/trade/TradeSafeFilter';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List,Drawer } from 'antd-mobile';
import styles from '../../styles/trade/TradeSafeFilter.less';

const Item = List.Item;
class TradeSafeInquire extends React.Component{
  constructor() {
		 super();
     this.state = {
       open: false,
       position: 'right',
     };
	}
  // onDateChange = (date) => {
  //   console.log('onChange', date);
  //   this.setState({
  //     date,
  //   });
  // }

  onOpenChange(isOpen) {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord(filterArgs)
  {
    let {dispatch} = this.props;
    this.setState({open:!this.state.open})
    // this.setState({open: Object.keys(filterArgs).length!==0?!this.state.open:true})
    dispatch({
      type: 'tradeSafe/tradeInquire',
      payload: {
        filterArgs:filterArgs,
        loadingMore:false
      }
    })
  }

  render () {
    const {dispatch,tradeSafe,filterArgs} = this.props;
    // const {formValue} = formStorage;
    const sidebar = (<TradeSafeFilter dispatch={dispatch} filterArgs={tradeSafe.filterArgs} onCloseMethord={this.onCloseMethord.bind(this)} />);
    // console.log('tradeSafe-----------',tradeSafe);
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange.bind(this),
    };
    const titleProps = {title: 'B类产品交易查询',showBack: 'no'};
    return (<div style={{ height: '100%',position: 'relative',display: 'flex',flexDirection:'column' }}>

      <Drawer
        className={styles.myDrawer}
        sidebar={sidebar}
        // style={{ minHeight: document.documentElement.clientHeight}}
        dragHandleStyle={{ display: 'none', }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center',}}
        {...drawerProps}
      >
        <div style={{position: 'absolute',zIndex: '80',width: '100%',top:0,left:0,right:0}}>
          <Title {...titleProps}>
            <div style={{position: 'absolute',top: '0',right:'0.32rem',width: '1.067rem',height: '1.333rem',paddingTop: '0.1rem'}} onTouchStart={this.onOpenChange.bind(this)}>
              <img style={{width: '0.533rem',height: '0.533rem'}}
               src={require('../../image/product/filter.png')} />
            </div>
           </Title>
          <div style={{borderBottom: 'solid 1px #d2d2d6'}}>
            <TradeSearchBar dispatch={dispatch} />
          </div>
        </div>
        <div className={styles.boxScorll}>
          <TradeSafeInquirelist dispatch={dispatch} dataSource = {tradeSafe} />
        </div>
      </Drawer>
    </div>);
  }
}

function connectSafeInquire({tradeSafe,formStorage}) {
  return {tradeSafe,formStorage}
}

export default connect(connectSafeInquire)(TradeSafeInquire);
