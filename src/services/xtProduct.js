// import request from '../utils/request';
// import qs from 'qs';
import  URLS from '../utils/Urls';
import {requestWithToken,relativeChangedRequest} from '../utils/commonRequestUtils';
export async function fetchProductList(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_XTPRODUCT_LIST_URL,params,'product');
}

// 今日上线产品列表
export async function fetchTodayProductList(params) {
  return requestWithToken(URLS.FETCH_TODAY_XTPRODUCT_LIST_URL,params,'product');
}
//获取产品通知列表
export async function fetchNotifyProductList(params) {
    return requestWithToken(URLS.fetch_NOTIFYPRODUCT_LIST_URL,params,'product')
}

// 其他在线产品列表
export async function fetchOtherProductList(params) {
  return requestWithToken(URLS.FETCH_OTHER_XTPRODUCT_LIST_URL,params,'product');
}

export async function fetchProductDetail(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_XTPRODUCT_DETAIL_URL,params,'product');
}


export async function fetchNetWorthList(params)
{
  return requestWithToken(URLS.FETCH_XTPRODUCT_NAV_URL,params,'product');
}

//产品资料
export async function fetchFillList(params)
{
  return requestWithToken(URLS.FETCH_XTPRODUCT_PRODATA_URL,params,'product');
}

//份额类别
export async function fetchTypeList(params)
{
  return requestWithToken(URLS.FETCH_XTPRODUCT_CATEGORY_URL,params,'product');
}

//私募产品预约
export async function XTProductOrder(params)
{
  return requestWithToken(URLS.FETCH_XTPRODUCT_ORDER_URL,params,'product');
}
export async function fetchProductDetailFull(params) {
   return requestWithToken(URLS.FETCH_XTPRODUCT_DETAIL_FULL_URL,params,'product');
}


export async function getTimeLimits(params) {
  return requestWithToken(URLS.GET_TIME_LIMITS_URL,params,'product');
}

export async function fetchPreProductList(params)
{
    return requestWithToken(URLS.FETCH_XTPRODUCT_EXPRELIST_URL,params,'product');
}

export async function fetchMeetingDetail(params)
{
    return requestWithToken(URLS.FETCH_XTPRODUCT_MEETINGDETAIL_URL,params,'product');
}
//购买客户查询
export async function fetchBuyCustomerList(params){
    return requestWithToken(URLS.FETCH_XTPRODUCT_BUYCUSTOMER_URL,params,'product');
}

/**
 * 检查客户是否合规
 */
export async function checkCustomerIsCommon(params){
    return requestWithToken(URLS.FETCH_CHECKISCOMMON_URL,params,'product');
}

/**
 * 文件分享日志获取
 **/
 export async function addShareLog(params){
     return requestWithToken(URLS.ADD_SHAREFILE_LOG_URL,params,'product');
 }
//
export async function fetchPreprocessList(params) {
  return requestWithToken(URLS.FETCH_PREPROCESS_LIST_URL,params,'product');
}
//私募信托产品预约修改
export async function submitUpdate(params) {
  return requestWithToken(URLS.UPDATE_SUBMIT_CONTENT,params,'product');
}
export async function ifAlert(params) {
  return requestWithToken(URLS.BEFORE_CREATE_TO_ALERT,params,'product');
}
//访问足迹
export async function recordVisitTimes(params) {
  return requestWithToken(URLS.RECORDE_VISIT_TIMES, params,'product');
}
//获取预打款日期
export async function getWillOrderDate(params) {
     return relativeChangedRequest(URLS.GET_WILL_ORDDATE_URL, params)
}

//冒泡排序进行数字排序
export function sortBuyCustomerList(list,sortFlag,sortAttr){
    if(!sortAttr)
      sortAttr = 'id';
    //remitDate,reqAmt,confShr
    let sortFunc = (item1,item2)=>{

        let result = (item1[sortAttr]>item2[sortAttr]);
        if(!item1[sortAttr])
          result = false;
        else if(!item2[sortAttr])
          result = true;
        return sortFlag==0?!result:result;
    };

    // let resultList = [];
    let i = list.length-1;
    while (i>0) {
        let pos = 0;
        for(let j=0;j<i;j++){
            if(sortFunc(list[j],list[j+1])){
                pos = j;
                let tmp = list[j];
                list[j] = list[j+1];
                list[j+1] = tmp;
            }
        }
        i = pos;
    }
    // console.log('===result==list=',list);
    // list.map((item,index)=>{
    //     console.log('====xx=',item[sortAttr]);
    // });
    return list;
}
