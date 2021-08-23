import  URLS from '../utils/Urls';
import {requestWithToken} from '../utils/commonRequestUtils';

/**
 * 获取vp共享产品额度列表
 */
export function fetchVpShareList(params){
    return requestWithToken(URLS.FETCH_VPSHARE_LIST_URL,params,'product');
}

/**
 * 获取vp共享产品额度详情
 */
export function fetchVpShareDetail(params){
    return requestWithToken(URLS.FETCH_VPSHARE_DETAIL_URL,params,'product');
}
