import  URLS from '../utils/Urls';
import {requestWithToken,requestWithUploadImage} from '../utils/commonRequestUtils';

//客户查询
export async function fetchCustomerList(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_CUSTOMER_LIST_URL,params,'customer');
}
//客户代办
export async function fetchCustomerWait(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_WAIT_URL,params,'customer');
}
//客户代办个人驳回修改
export async function fetchPerCustWaitReject(params) {
   return requestWithToken(URLS.FETCH_PER_CUST_WAIT_MODIFY_URL,params,'customer');
}
//客户代办机构驳回修改
export async function fetchOrgCustWaitReject(params) {
   return requestWithToken(URLS.FETCH_ORG_CUST_WAIT_MODIFY_URL,params,'customer');
}
//个人客户添加
export async function addCustomer(params,mode) {
  console.log('参数',params,mode);
  if(mode=='personal')
    //url address=> bziCustomer/addBizCustomer
    return requestWithToken(URLS.FETCH_CUSTOMER_PER_ADD_URL,params,'customer');
  else   return requestWithToken(URLS.FETCH_CUSTOMER_ORG_ADD_URL,params,'customer');
}

//上传图片
export async function uploadPictures(params,images) {
   let imageParam = {files:images};
   console.log('---uploadPictures---',imageParam,params);
   return requestWithUploadImage(URLS.UPLOAD_CUSTOMER_FILE_URL,params,imageParam,'customer');
}

//客户代办详情
export async function fetchCustomerWaitInfo(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_WAIT_INFO_URL,params,'customer');
}

//个人客户编辑或提交转正
export async function editCustomer(params,mode) {
  console.log('参数',params,mode);
  if(mode=='personal')
    return requestWithToken(URLS.FETCH_CUSTOMER_PER_EDIT_URL,params,'customer');
  else   return requestWithToken(URLS.FETCH_CUSTOMER_ORG_EDIT_URL,params,'customer');
}
//个人客户详情
export async function fetchPerCustomerInfo(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_PERINFO_URL,params,'customer');
}
//机构客户详情
export async function fetchInstiInfo(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_INSTICUSTINFO_URL,params,'customer');
}
//机构客户修改||编辑
export async function fetchInstiModify(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_INSTI_MODIFY_URL,params,'customer');
}
//客户回访记录
export async function fetchCustomerReVisit(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_REVISIT_URL,params,'customer');
}
//客户（财付通）交易记录
export async function fetchCustomerDealHistory(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_DEALHISTORY_URL,params,'customer');
}
//客户（私募、B类产品）交易记录
export async function fetchCustomerDealHisColl(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_DEAL_COLL_HIS_URL,params,'product');
}
//潜在客户放弃
export async function fetchCustAbandon(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_ABANDON_URL,params,'customer');
}
//潜在客户拉黑
export async function fetchCustBlack(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_BLACK_URL,params,'customer');
}
//风险测评列表
export async function fetchCustRiskInquire(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_RISK_INQUEIR_URL,params,'customer');
}
//风险测评题目提交
export async function fetchCustRiskSubmit(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_RISK_SUBMIT_URL,params,'customer');
}
//持有金额结构查询
export async function fetchCustHoldProp(params) {
   return requestWithToken(URLS.FETCH_CUSTOMER_HOLD_PROPERTY_URL,params,'hold',true);
}
//获得受理人员列表
export async function fetchAcceptorList(params) {
  return requestWithToken(URLS.FETCH_BI_ACCEPTOR_LIST, params, 'bi_type');
}

export async function fetchManagersList(params) {
  return requestWithToken(URLS.FETCH_MANAGER_LIST, params, 'product');
}

export function seperatorTradeList(list){
  let xtList = [],bxList = [];
  if(!list||list.length<=0)
    return {
      xtList:xtList,
      bxList:bxList
    };
  for(let i = 0;i<list.length;i++)
  {
    let tradeData = list[i];
    if(tradeData.tradClass=='02')
    {
       xtList.push(tradeData);
    }
    else if(tradeData.tradClass=='03')
    {
        bxList.push(tradeData);
    }
  }
  return {
    xtList:xtList,
    bxList:bxList
  };
}

export function processScoreData(score)
{
  //风险测评数据
    let dataSource;
    if(score!=undefined&&score!=='') {
      if(score <= 34) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 100,name: '低风险'},
          ]
        }
      }
      else if(score <= 45) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 85,name: '低风险'},
            {value: 15,name: '中风险'},
          ]
        }
      }
      else if(score <= 55) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 70,name: '低风险'},
            {value: 30,name: '中风险'},
          ]
        }
      }
      else if(score <= 66) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 55,name: '低风险'},
            {value: 45,name: '中风险'},
          ]
        }
      }
      else if(score <= 76) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 35,name: '低风险'},
            {value: 60,name: '中风险'},
            {value: 5,name: '高风险'}
          ]
        }
      }
      else if(score <= 86) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 30,name: '低风险'},
            {value: 55,name: '中风险'},
            {value: 15,name: '高风险'}
          ]
        }
      }
      else if(score <= 96) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 25,name: '低风险'},
            {value: 50,name: '中风险'},
            {value: 25,name: '高风险'}
          ]
        }
      }
      else{
        dataSource={
          name: '风险测评',
          data: [
            {value: 20,name: '低风险'},
            {value: 45,name: '中风险'},
            {value: 35,name: '高风险'}
          ]
        }
      }
    } else{
      dataSource={
        name: '风险测评',
        data: [
          {value: 0,name: '低风险'},
          {value: 0,name: '中风险'},
          {value: 0,name: '高风险'}
        ]
      };
    };
    return dataSource;
}

export function processOrgScoreData(score)
{
  //风险测评数据
    let dataSource;
    if(score!=undefined&&score!=='') {
      if(score <= 10) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 100,name: '低风险'},
          ]
        }
      }
      else if(score <= 13) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 85,name: '低风险'},
            {value: 15,name: '中风险'},
          ]
        }
      }
      else if(score <= 16) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 70,name: '低风险'},
            {value: 30,name: '中风险'},
          ]
        }
      }
      else if(score <= 20) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 55,name: '低风险'},
            {value: 45,name: '中风险'},
          ]
        }
      }
      else if(score <= 23) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 35,name: '低风险'},
            {value: 60,name: '中风险'},
            {value: 5,name: '高风险'}
          ]
        }
      }
      else if(score <= 26) {
        dataSource={
          name: '风险测评',
          data: [
            {value: 30,name: '低风险'},
            {value: 55,name: '中风险'},
            {value: 15,name: '高风险'}
          ]
        }
      }
      else{
        dataSource={
          name: '风险测评',
          data: [
            {value: 25,name: '低风险'},
            {value: 50,name: '中风险'},
            {value: 25,name: '高风险'}
          ]
        }
      }
    } else{
      dataSource={
        name: '风险测评',
        data: [
          {value: 0,name: '低风险'},
          {value: 0,name: '中风险'},
          {value: 0,name: '高风险'}
        ]
      };
    };
    return dataSource;
}
