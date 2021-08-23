import  URLS from '../utils/Urls';
import {requestWithToken} from '../utils/commonRequestUtils';

//客户银行卡查询(从交易系统查询)
export async function fetchBankInquire(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_CUSTBANKCARD_URL,params,'product');
}
//客户银行卡查询
export async function fetchBankInquirePer(params) {
   return requestWithToken(URLS.FETCH_BANK_CUSTBANK_INQUIRE_URL,params,'product');
}
//客户银行卡启用或者停用
export async function fetchBankStartDisable(params) {
   return requestWithToken(URLS.FETCH_BANK_START_DISABLE_URL,params,'product');
}
//客户银行卡变更
/**
 * 客户银行卡变更
 * @param         params 请求参数
 * @return,@back promise
 * @author
 * @version 1.0.0
 */
export async function fetchBankChange(params) {
   return requestWithToken(URLS.FETCH_BANK_CHANGE_URL,params,'product');
}
//客户银行卡修改
export async function fetchBankModify(params) {
   return requestWithToken(URLS.FETCH_BANK_MODIFY_URL,params,'product');
}
//客户银行卡新增
export async function fetchBankCreate(params) {
   return requestWithToken(URLS.FETCH_BANK_CREATE_URL,params,'product');
}
//受益账户变更列表
export async function fetchCusChangeList(params) {
  return requestWithToken(URLS.FETCH_CUSTOMER_CUSTBANKCARD_URL,params,'product');
}
//受益账户持仓列表
export async function fetchCusPositionList(params) {
  return requestWithToken(URLS.FETCH_CUSTOMER_POSITION_LIST_URL,params,'product');
}
//申请记录查询
export async function applyRecordsList(params) {
  return requestWithToken(URLS.APPLY_RECORDS_LIST,params,'product');
}
//驳回列表
export async function rejectList(params) {
  return requestWithToken(URLS.REJECT_LIST,params,'product');
}
//作废
export async function abolish(params) {
  return requestWithToken(URLS.ABOLISH_URL,params,'product');
}
//修改提交
export async function modifySubmit(params) {
  return requestWithToken(URLS.REJECT_SUBMIT_URL,params,'product');
}

//开户行变更列表
export async function getBankChangeList(params) {
  return requestWithToken(URLS.BANK_CARD_CHANGELIST,params,'product');
}

//开户行变更提交
export async function changeUpdate(params) {
  return requestWithToken(URLS.CHANGE_UPDATE,params,'product');
}
//开户行变更驳回
export async function changeReject(params) {
  return requestWithToken(URLS.CHANGE_REJECT,params,'product');
}

//开户行变更驳回
export async function getDetails(params) {
  return requestWithToken(URLS.ACCOUNT_DETAILS,params,'product');
}

