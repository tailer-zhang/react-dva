//转受让模式
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import {  Drawer } from 'antd-mobile';
import Title from '../../components/product/Title';
import transferMode from '../../styles/trade/transferMode.less';
import tradeStyles from '../../styles/trade/trade.less';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import { Link, routerRedux } from 'dva/router';

class RegAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      isFilter: false
    };
  }
  render() {
    const { trade, dispatch } = this.props
    const titleProps = {
      title: '转受让模式',
      showBack: 'yes',
    };
    function  touchCell(type)
    {
      if(type==='3'){
        dispatch(routerRedux.push({pathname:'/TransferInput',state:{type:type}}));
      }else{
        dispatch(routerRedux.push({pathname:'/customerPositionInfo',state:{type:type}}));
      }
    }
    return (
      <div style={{backgroundColor:'#efeff4',height:'100%'}}>
        <Title {...titleProps} />
        <div className={transferMode.ctlArea}>
          <ul>
            <Link  onClick={()=>touchCell('0')}>
              <li>
                <p className={transferMode.ctlTitle}>转给本人客户</p>
                <p className={transferMode.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={transferMode.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link onClick={()=>touchCell('1')}>
              <li>
                <p className={transferMode.ctlTitle}>转给其他理财师客户</p>
                <p className={transferMode.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={transferMode.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link  onClick={()=>touchCell('2')}>
              <li>
                <p className={transferMode.ctlTitle}>转给管理人客户</p>
                <p className={transferMode.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={transferMode.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link  onClick={()=>touchCell('3')}>
              <li>
                <p className={transferMode.ctlTitle}>管理人客户转入</p>
                <p className={transferMode.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={transferMode.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
    </div>

    );
  }
}

function connectPrivateModel({ trade }) {
  return { trade };
}

export default connect(connectPrivateModel)(RegAuth);
