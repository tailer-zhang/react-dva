import  URLS from '../utils/Urls';
import {requestWithToken,relativeChangedRequest} from '../utils/commonRequestUtils';
  //B类产品查询
export async function fetchTradeSafeInquire(params) {
   return requestWithToken(URLS.FETCH_TRADESAFEINQUIRE_URL,params,'product');
}
//B类产品查询详情
export async function fetchTradeSafeContract(params) {
 return requestWithToken(URLS.FETCH_TRADESAFECONTRACT_URL,params,'product');
}
//B类产品驳回修改查询
export async function fetchTradeSafeReInfo(params) {
 return requestWithToken(URLS.FETCH_TRADESAFEREINFO_URL,params,'product');
}
//B类产品驳回修改编辑
export async function fetchTradeSafeReModify(params) {
 return requestWithToken(URLS.FETCH_TRADESAFERE_REJECT_MODIFY_URL,params,'product');
}
//B类产品驳回修改删除
export async function fetchTradeSafeReDelete(params) {
 return requestWithToken(URLS.FETCH_TRADESAFERE_REJECT_DELETE_URL,params,'product');
}
//B类产品合同录入
export async function fetchTradeSafeEnter(params) {
 return requestWithToken(URLS.FETCH_TRADESAFERE_ENTER_URL,params,'product');
}
//产品名称
export async function fetchBxProductList(params) {
  return requestWithToken(URLS.FETCH_BXPRODUCT_LIST_URL,params,'product');
}
//产品名称
export async function fetchScreProductList(params) {
  return requestWithToken(URLS.FETCH_BXPRODUCT_SCREEN_URL,params,'product');
}
//产品名称 筛选
export async function fetchBxProductSelect(params) {
  return requestWithToken(URLS.FETCH_BXPRODUCT_SELECT_URL,params,'product');
}
//B类产品产品Id
export async function fetchKPIList(params)
{
  return requestWithToken(URLS.FETCH_BXPRODUCT_CATE_URL,params,'product');
}
//客户查询
export async function fetchCustomerList(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return relativeChangedRequest(URLS.FETCH_RELATIVE_CHANGED_CUSTOMER_LIST_URL,params,'customer');
}
