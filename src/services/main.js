import  URLS from '../utils/Urls';
import {requestWithInitToken, requestWithToken} from '../utils/commonRequestUtils';

//获取Token
export async function loadLoginUser(params) {
   return requestWithInitToken(URLS.LOAD_LOGIN_USER,params);
}
//刷新Token
export async function refreshLoginUser(params) {
   return requestWithInitToken(URLS.REFRESH_LOGIN_USER,params);
}
//获取用户名字
export async function getUserName(params) {
  return requestWithToken(URLS.GET_USER_NAME,params,'product');
}
