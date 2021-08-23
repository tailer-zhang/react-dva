//私募交易主页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link, routerRedux} from 'dva/router';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';

const XTTradeMain  = ({dispatch,trade, bank }) => {
  let dataNum = trade.model;
  let fuxiNum = trade.fuxiTotal
  return(
    <div className={PerCusDetailStyles.mainBox}>
      <div className={tradeStyles.tabInput}>
        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/otherProduct">
              <li>
                <img src={require('../../image/trade/buy_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>产品预约</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/buyXTproList">
              <li>
                <img src={require('../../image/trade/contract_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>合同录入</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/redeemList">
              <li>
                <img src={require('../../image/trade/redeem_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>赎回</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/transferMode">
              <li>
                <img src={require('../../image/trade/transfer_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>转受让</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/recallList">
              <li>
                <img src={require('../../image/trade/recall_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>撤单</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/applyPending">
              <li>
                <img src={require('../../image/trade/catch.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>延期申请</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/myOrder">
              <li>
                <img src={require('../../image/trade/order_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>我的预约</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/queueOrderList">
              <li>
                <img src={require('../../image/icon/queue.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>预约排队情况</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/PayProofList">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/icon/payProof_icon@2x.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>电子合同打款凭证上传</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/tradeRebut">
              <li>
                <img src={require('../../image/trade/rebut_icon.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>驳回修改</p>
                {dataNum.toDos==0||dataNum.toDos==undefined?<div />:<p className={tradeStyles.num_arr}>
                  <span>{dataNum.toDos}</span>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
                }
              </li>
            </Link>
          </ul>
        </div>

        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/regAuth">
              <li>
                <img src={require('../../image/trade/bi_reg_auth_search.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>需登记注册身份验证查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
        <div className={tradeStyles.ctlArea}>
          <ul>

            <Link to="/tradePositionInfo">
              <li>
                <img src={require('../../image/trade/customer_icon_01.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>客户持仓查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/customerTradeSearch">
              <li>
                <img src={require('../../image/trade/customer_icon_02.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>客户交易查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/fundInquire">
              <li>
                <img src={require('../../image/trade/customer_icon_03.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>客户购买资金查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/customerShareInquire">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/trade/customer_icon_04.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>客户分红清算资金查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/productMain">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/trade/look_product.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>产品查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>

        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/paymentOfInterestCnt">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/trade/payment_interest.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>付息/到期提醒</p>
                <p className={tradeStyles.num_arr}>
                  <span>{fuxiNum&&fuxiNum.total ? fuxiNum.total : 0}</span>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
          </ul>
        </div>

        <div className={tradeStyles.ctlArea}>
          <ul>
            <Link to="/secCustomer">
              <li>
                <img src={require('../../image/customer/bank_keep.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>银行卡维护</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
            <Link onClick={(e)=>{dispatch(routerRedux.push({pathname: '/customerModify'}))}}>
              <li>
                <img src={require('../../image/customer/bank_modify.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>受益账户变更</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
            <Link to="/openBankModify">
              <li>
                <img src={require('../../image/icon/customerMain_16.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>开户行变更</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
            <Link to="/applyRecordsList">
              <li>
                <img src={require('../../image/customer/bank_search.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>申请记录查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
            <Link to="/bankRebutCnt">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/customer/bank_rebut.png')} className={tradeStyles.x_m_icon} />
                <p className={tradeStyles.ctlTitle}>驳回修改</p>
                <p className={tradeStyles.num_arr}>
                  <span>{bank.rejectList && bank.rejectList.length > 0 ? bank.rejectList.length : 0}</span>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon} />
                </p>
              </li>
            </Link>
          </ul>
        </div>

        <p className={tradeStyles.headTitleStyle}>双录管理</p>
        <div className={tradeStyles.inputStyle}>
          <ul>
            <Link to="/biTypeInputListCnt">
              <li>
                <img src={require('../../image/trade/bi_private.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>私募双录录入</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/pubbiTypeInputListCnt">
              <li>
                <img src={require('../../image/trade/bi_public.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>公募双录录入</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/rejectListCnt">
              <li>
                <img src={require('../../image/trade/bi_reject.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>驳回修改</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/searchListCnt">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/trade/bi_search.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>双录查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
        <p className={tradeStyles.headTitleStyle}>投资者转换管理</p>
        <div className={tradeStyles.inputStyle}>
          <ul>
            <Link to="/applyforChangeCnt">
              <li>
                <img src={require('../../image/trade/bi_change.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>转换申请</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/roleChangeRejectCnt">
              <li>
                <img src={require('../../image/trade/bi_change_edit.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>转换修改</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/investorSearchListCnt">
              <li>
                <img src={require('../../image/trade/bi_investor_search.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>投资者查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
            <Link to="/investorApplyInqueryCnt">
              <li className={tradeStyles.borderB0}>
                <img src={require('../../image/trade/bi_change_search.png')} className={tradeStyles.x_m_icon}/>
                <p className={tradeStyles.ctlTitle}>转换申请查询</p>
                <p className={tradeStyles.num_arr}>
                  <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

function connectProdunctFunc({ trade, bank })
{
  return { trade, bank };
}
export default connect(connectProdunctFunc)(XTTradeMain);
