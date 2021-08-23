import request from './request';
import qs from 'qs';
import * as commons from './commonUtil';
import {formatDate} from './formatUtils';
import {Tool} from './tools';
export  function requestWithToken(url,param,userIdKey,headerLimit)
{
  let userObj = {};
  if(process.env.NODE_ENV !== 'production')
  {
    userObj = {
      userId:commons.userId,
      childToken:commons.token,
    };
  }
  else
    userObj = Tool.getSessionUser();


   let sendDate = new Date();
   let sepHeader  = {};
   if(headerLimit)
   {
     sepHeader = {
       'appv': commons.app_v,
       'interfacev': commons.interface_v,
       'osv': commons.os_v,
       'appidfa': commons.app_idfa,
     };
   }
   else {
     sepHeader = {
       'app-v': commons.app_v,
       'interface-v': commons.interface_v,
       'os-v': commons.os_v,
       'app-idfa': commons.app_idfa,
     };
   }
  let headers = {
      ...sepHeader,
     'Content-Type': 'application/x-www-form-urlencoded',
     'Accept':'application/json;charset=utf-8',
     channel: commons.channel,
     device: commons.device,
     requestTime: formatDate(sendDate,'yyyyMMddhhmmss'),
     userId: userObj.userId,
     Authorization:userObj.childToken
    };
    if(param==undefined)
       param = {};
    let requestUrl = commons.CustomerAPIHostAddress+url;
    if(userIdKey==='product')
    {
      requestUrl = commons.TradeAPIHostAddress+url;
      param.mgrCode = userObj.userId  || localStorage.getItem("userId")||localStorage.getItem("loginId");
    }
    else if(userIdKey==='customer')
    {
      requestUrl = commons.CustomerAPIHostAddress+url;
      param.userId = userObj.userId;
    }
    else if(userIdKey==='hold')
    {
      requestUrl = commons.HoldPropertyAddress+url;
      param.userId = userObj.userId;
    }else if(userIdKey === 'portal'){
      requestUrl = commons.PortalAPIHostAddress+url;
      headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept':'application/json;charset=utf-8',
         Authorization:param.accessToken,
        };
    }else if(userIdKey === 'preprocess'){
      requestUrl = commons.TadePreprocessAddress+url;
      param.userId = userObj.userId;
    } else if (userIdKey === 'bi_type') {
      requestUrl = commons.BiTypeHostAddress + url;
      param.mgrCode = userObj.userId;
    }

    // console.log('----底部-请求参数-',requestUrl,param);
    delete param['keyClass']
    let ja=JSON.stringify(param);
    let sa=qs.stringify(JSON.stringify(param));
    return request(requestUrl,{
      method: 'post',
      headers:headers,
      body:qs.stringify({requestParam:JSON.stringify(param)})
    });
}

export  function requestWithUploadImage(url,param,imageParam,userIdKey)
{
  let userObj = {};
  if(process.env.NODE_ENV !== 'production')
  {
    userObj = {
      userId:commons.userId,
      childToken:commons.token,
    };
  }
  else
    userObj = Tool.getSessionUser();
    let sendDate = new Date();
    //'Content-Type':'multipart/form-data; boundary=' + Date.parse(new Date()),
   let headers = {
      'Accept':'application/json',
      'app-v': commons.app_v,
      'interface-v': commons.interface_v,
      channel: commons.channel,
      'os-v': commons.os_v,
      device: commons.device,
      'app-idfa': commons.app_idfa,
      requestTime: formatDate(sendDate,'yyyyMMddhhmmss'),
      userId: userObj.userId,
      Authorization:userObj.childToken
     };
    if(param==undefined)
       param = {};
     let requestUrl = commons.CustomerAPIHostAddress+url;
     if(userIdKey==='product')
     {
       requestUrl = commons.TradeAPIHostAddress+url;
       param.mgrCode = userObj.userId;
     }
     else if(userIdKey==='customer')
     {
       requestUrl = commons.CustomerAPIHostAddress+url;
       param.userId = userObj.userId;
     }else if (userIdKey === 'bi_type') {
       requestUrl = commons.BiTypeHostAddress + url;
       param.mgrCode = userObj.userId;
     }
     let formData = new FormData();
    //  formData.append('Content-Type','multipart/form-data');
     if(imageParam)
     {
       for(let key in imageParam)
       {
          let imageArr = imageParam[key];
         //  let imageAppend =[];
          for(let keyIndex in imageArr)
          {
            let data = imageArr[keyIndex];
            // formData.append(key,{uri:data.uri,type:data.type, name:data.name});
            // formData.append(key,data,'12321321.jpg');
            formData.append(key, data.file ? data.file : data);
          }
       }
     }

     for(let key in param)
     {
       formData.append(key,param[key]);
     }
    console.log(requestUrl,'-输入文件上传请求参数--',headers,qs.stringify(param),formData);
    return request(requestUrl,{
        method: 'post',
        headers:headers,
        body:formData
      });
}

export  function requestWithInitToken(url,param)
{
  let userObj = Tool.getSessionUser();
  let requestUrl = commons.PortalAPIHostAddress+url;
  let headers = {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Accept':'application/json;charset=utf-8',
     Authorization:param.accessToken,
    };

  // console.log('----底部-请求参数-',requestUrl,param);
  return request(requestUrl,{
    method: 'post',
    headers:headers,
    body:qs.stringify({object:JSON.stringify(param)})
  });
}

export function relativeChangedRequest(url,param) {
  let userObj = {};
  if(process.env.NODE_ENV !== 'production')
  {
    userObj = {
      userId:commons.userId,
      childToken:commons.token,
    };
  }
  else userObj = Tool.getSessionUser();
  let requestUrl = commons.NewSystemHostAddress+url;
  param.mgrCode = userObj.userId
  const params = []
  Object.keys(param).forEach((key) => {
    let value = param[key]
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, value].join('='))
  })

  let baseUrl = `${requestUrl}?${params.join('&')}`
  return request(baseUrl,{
    method:'GET',
    headers: {
      Authorization: userObj.childToken,
    }
  });

}
