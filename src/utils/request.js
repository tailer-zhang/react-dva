import fetch from 'dva/fetch';
import * as common from './commonUtil';
import  URLS from './Urls';
import {Tool} from './tools';
import qs,{ parse } from 'qs';
import {Toast} from 'antd-mobile';

function parseJSON(response) {
  // console.log('--转换json-response请求结果-------',response);
  return response.json();
}

function checkStatus(response) {
  // console.log('--检查状态-response请求结果-------',response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  // console.log('----底层请求参数-----',url,options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
        // console.log('---正常输出结果------',url,data);
        if(data && data.code == 'expired_token'){
          return loadLoginUser(url, options);
        }else{
          return { data };
        }
      })
    .catch((err) =>{
      Toast.fail('服务调用失败，请返回重试',4);
      console.log('----错误输出结果-----',url,options,err);
      // return {err};
      return {
        data:{
          error:err,
          code:'404',
          msg:'服务调用失败，请返回重试',
          message:'服务调用失败，请返回重试'
        }
      };
    });
}

function loadLoginUser(url, options) {
  console.log('loadLoginUser');
  let userObj = JSON.parse(Tool.localItem('UserToken'));
  let args = {
    refreshToken: userObj.childRefreshToken,
    // refreshToken:common.token,
    client_id: common.APP_CLIENT_ID
  };
  let headers = {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Accept':'application/json;charset=utf-8',
     Authorization:userObj.childToken,
  };
  let requestUrl = common.PortalAPIHostAddress + URLS.REFRESH_LOGIN_USER;
  let param = {
    url:requestUrl,
    options:{
      method: 'post',
      headers:headers,
      body:qs.stringify({object:JSON.stringify(args)})
    }
  }
  // console.log('param-----', param);
  return new Promise((resolve, reject) => {
    fetch(param.url, param.options)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        // console.log('data---',data);
        if (data && data.code == '00') {
            userObj.childToken = data.model.accessToken;
            userObj.childRefreshToken = data.model.refreshToken;
            Tool.localItem('UserToken', JSON.stringify(userObj));
            options.headers.Authorization = userObj.childToken;
            resolve(refreshLoginUser(url, options));
        } else {
            console.log('刷新Token出错');
            // resolve({});
            resolve({data:{
              code:'404',
              msg:'刷新Token出错',
              message:'刷新Token出错'
            }});
        }

      })
      .catch((err) =>{
        Toast.fail('服务调用失败，请返回重试',4);
        console.log('----错误输出结果-----',url,options,err);
        // reject(err);
        reject({data:{
          error:err,
          code:'404',
          msg:'服务调用失败，请返回重试',
          message:'服务调用失败，请返回重试'
        }});
      });
  })
}
function refreshLoginUser(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('new data------', data);
        resolve({ data });
      })
      .catch((err) =>{
        Toast.fail('服务调用失败，请返回重试',4);
        console.log('----错误输出结果-----',url,options,err);
        // reject({err});
        reject({data:{
          error:err,
          code:'404',
          msg:'服务调用失败，请返回重试',
          message:'服务调用失败，请返回重试'
        }});
      });
  });

}
