import  URLS from '../utils/Urls';
import {requestWithToken,requestWithUploadImage} from '../utils/commonRequestUtils';

export async function fetchPreTradReqList(params) {
   return requestWithToken(URLS.FETCH_PRETRADREQ_URL,params,'product');
}

export async function fetchPreProductList(params) {
   return requestWithToken(URLS.FETCH_PREPRODUCT_LIST_URL,params,'product');
}

export async function addPreTradReq(params) {
   return requestWithToken(URLS.ADD_PRETRADREQ_URL,params,'product');
}

export async function fetchPreTradReqDetail(params) {
   return requestWithToken(URLS.FETCH_PRETRADREQ_DETAIL_URL,params,'product');
}
