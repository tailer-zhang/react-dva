//交易主页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import PieTempChart from '../../components/trade/PieTempChart';
import TitleComp, { flushTitle } from 'react-title-component';
import watermark from '../../watermark'
import {Tool} from "../../utils/tools";

class TradeMain extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    let {dispatch, main, location} = this.props;
    const params = Tool.GetRequest();

    const userObj = {
      userId: params.userId,
      childToken: params.token,
      childRefreshToken: params.rtoken,
    }
    console.log('main.js line 21 --- userObj',userObj);
    Tool.localItem('UserToken', JSON.stringify(userObj));
  }
  getCountDt(){
    let { trade } = this.props;
    let model = trade.model;
    let countdt = {
        name:'本月新增交易',
        data:[{value:model.btCount?model.btCount:0, name:'B类产品'},
              {value:model.xtCount?model.xtCount:0, name:'私募'},]
    };

    return countdt;
  }
  getAmountDt(){
    let { trade } = this.props;
    let model = trade.model;
    let amountDt = {
        name:'本月新增交易',
        data:[{value:model.bxAmount?model.bxAmount:0, name:'B类产品'},
              {value:model.xtAmount?model.xtAmount:0, name:'私募'},]
    };
    return amountDt;
  }

  jumptoregister=()=>{
    this.props.dispatch(routerRedux.push({pathname:'/operationManual'}));
  }

  render()
  {
    let { dispatch,trade } = this.props;
    let data = trade.model;
    console.log('========btCount',data)
    console.log("tradeMAIN",data);
    const TitleProps = {
      title:'交易',
      showBack:'no'
    };
    let countDt = this.getCountDt();
    let amountDt = this.getAmountDt();
    return(
      <div className={PerCusDetailStyles.mainContent}>
        <TitleComp render="合同"/>
        {//<Title {...TitleProps} />
      //<p className={tradeStyles.WhiteSpace}></p>
    }
        <div className={tradeStyles.controlMenu}>
          <div>
            <div className={tradeStyles.registerStyle} onClick={this.jumptoregister}>
              <p>产品预约操作手册&nbsp;&nbsp;&nbsp;>></p>
            </div>
            <div className={tradeStyles.btnGroup}>
                <div className={tradeStyles.eveBtn} style={{marginRight:'0.213rem'}} onClick={ (e)=> {
                    // e.preventDefault();
                    dispatch(routerRedux.push({pathname:'/xTTradeMain'}));}}>
                <img src={require('../../image/trade/xt_icon.png')} className={tradeStyles.eveBtnIcon} />
                私募
                </div>
                <div className={tradeStyles.eveBtn} onClick={ (e)=> {
                    // e.preventDefault();
                    dispatch(routerRedux.push({pathname:'/tradeSafeMain'}));}}>
                  <img src={require('../../image/trade/bz_icon.png')} className={tradeStyles.eveBtnIcon} />
                  B类产品
                </div>
            </div>
            <div className={tradeStyles.tabInput} style={{marginBottom:'0.26667rem'}}>
                <div className={tradeStyles.ctlArea}>
                  <ul>
                      <Link to='/intentionWrite'>
                      <li style={{border:'0'}}>
                        <img src={require('../../image/trade/writeen_icon.png')} className={tradeStyles.x_m_icon}/>
                        <p className={tradeStyles.ctlTitle}>非私募预约</p>
                        <p className={tradeStyles.num_arr}>
                          <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                        </p>
                      </li>
                      </Link>
                  </ul>
                </div>
            </div>

            <div className={tradeStyles.tradeDataWrap}>
              <h3 className={tradeStyles.curMonthTrade}>
                <img src={require('../../image/trade/curTrade.png')} className={tradeStyles.tradeIcon} />
                本月新增交易
              </h3>
              <div>
                <div className={tradeStyles.tradeNumData}>
                  <PieTempChart data={countDt} colorsArr={['#fbae34','#87abfd']}/>
                </div>
                <div className={tradeStyles.paddingLeft30}>
                  <h2 className={tradeStyles.tradeNumTitle}>
                    新增交易数(笔)：<strong>{data.totCount}</strong>
                  </h2>
                  <div className={tradeStyles.tradeBar}>
                    <div className={tradeStyles.tradeItem}>
                      <p className={tradeStyles.squre}></p>
                      私募：
                      <span>{data.xtCount==undefined?0:data.xtCount}</span>
                    </div>
                    <div className={tradeStyles.tradeItem}>
                      <p className={tradeStyles.squre} style={{backgroundColor:'#fbae34'}}></p>
                      B类产品：
                      <span>{data.btCount==undefined?0:data.btCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className={tradeStyles.line}></p>
              <div>
                <div className={tradeStyles.tradeNumData}>
                  <PieTempChart data={amountDt} colorsArr={['#fbae34','#87abfd']}/>
                </div>
                <div className={tradeStyles.paddingLeft30}>
                  <h2 className={tradeStyles.tradeNumTitle}>
                    新增交易金额(折合人民币)：<strong>{data.totAmount}</strong>
                  </h2>
                  <div className={tradeStyles.tradeBar} style={{paddingBottom:'0.866rem'}}>
                    <div className={tradeStyles.tradeItem}>
                      <p className={tradeStyles.squre}></p>
                      私募：
                      <span>{data.xtAmount==undefined?0:data.xtAmount}</span>
                    </div>
                    <div className={tradeStyles.tradeItem}>
                      <p className={tradeStyles.squre} style={{backgroundColor:'#fbae34'}}></p>
                      B类产品：
                      <span>{data.bxAmount==undefined?0:data.bxAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function connectTradeFun({ trade })
{
  return { trade };
}
export default connect(connectTradeFun)(TradeMain);
