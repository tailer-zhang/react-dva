// import request from '../utils/request';
// import qs from 'qs';
import  URLS from '../utils/Urls';
import {requestWithToken} from '../utils/commonRequestUtils';
export async function fetchBxProductList(params) {
  return requestWithToken(URLS.FETCH_BXPRODUCT_LIST_URL,params,'product');
}

export async function fetchProductDetail(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_BXPRODUCT_DETAIL_URL,params,'product');
}

export async function fetchKPIList(params)
{
  return requestWithToken(URLS.FETCH_BXPRODUCT_CATE_URL,params,'product');
}
