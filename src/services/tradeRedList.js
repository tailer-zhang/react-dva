import  URLS from '../utils/Urls';
import {requestWithToken} from '../utils/commonRequestUtils';

// 赎回
export async function fetchRedeemList(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_TRADEREDEEM_LIST_URL,params,'product');
}
export async function fetchRedeemHintList(params) {
  return requestWithToken(URLS.FETCH_TRADEREDEEM_HINT_LIST_URL,params,'product');
}
export async function tradeInfoSee(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_TRADEDETAIL_VIEW_URL,params,'product');
}

// 基金转换
export async function fetchFundChangeList(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
  return requestWithToken(URLS.FETCH_FUND_CHANGE_LIST_URL,params,'product');
}

//赎回产品验证
export async function validProdInfo(params) {
  return requestWithToken(URLS.VALID_PROD_INFO,params,'product');
}
//赎回产品验证列表
export  async  function redeemList(params) {
  return requestWithToken(URLS.REDEEM_LIST,params,'product');
}

