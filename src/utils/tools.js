import * as commons from './commonUtil';
import md5 from "react-native-md5";
const Tool = {};
/**
 * 格式化时间
 *
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
    var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}

Tool.GetRequest = function() {
  var url = location.href; //获取url中"?"符后的字串
  var theRequest = new Object();
  let urlpam = url.indexOf("?");
  if (urlpam != -1) {
    var str = url.substr(urlpam+1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


Tool.formatSeconds = function(value) {
  let theTime = parseInt(value);    // 秒
  let theTime1 = 0;                 // 分
  let theTime2 = 0;                 // 小时
  if(theTime > 60) {
    theTime1 = parseInt(theTime/60);
    theTime = parseInt(theTime%60);
    if(theTime1 > 60) {
      theTime2 = parseInt(theTime1/60);
      theTime1 = parseInt(theTime1%60);
    }
  }
  let result = ""+parseInt(theTime)+"秒";
  if(theTime1 > 0) {
    result = ""+parseInt(theTime1)+"分"+result;
  }
  if(theTime2 > 0) {
    result = ""+parseInt(theTime2)+"小时"+result;
  }

  return result;
}

Tool.getSessionUser = function() {
  let userObj = JSON.parse(Tool.localItem('UserToken'));
  if(userObj == undefined) userObj = {};
  return userObj;
}

Tool.getSecretFilePath= function(filepath){
  if(filepath == undefined || filepath == '') return '';
  let ts = Date.parse(new Date());
  ts = ts / 1000;
  filepath = filepath.indexOf('?')>0?filepath.substring(0,filepath.indexOf('?')):filepath;
  let exfp = filepath;
  console.log('exfp----',exfp);
  let host = "";
  if(filepath.indexOf('http://') == 0){
    exfp = exfp.substring(7);
    exfp = exfp.substring(exfp.indexOf('/')+1);
  }else if(filepath.indexOf('https://') == 0){
    exfp = exfp.substring(8);
    exfp = exfp.substring(exfp.indexOf('/')+1);
  }else{
    host = commons.ImageHostAddress;
  }
  exfp = exfp.substring(exfp.indexOf('/')+1);
  let secret = md5.hex_md5(exfp + commons.file_secret_key + ts);
  let result = host + filepath + '?token=' + secret + '&ts=' + ts;
  console.log('getSecretFilePath----', result);
  return result;
}

/*
*
*判断浏览器版本给予返回值
*
*/
Tool.browserVersion= function(){
    let theUA = navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        let ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if(ieVersion < 9 ) {
          return false;
        }
        else {
          return true;
        }
    }
    else{
      return true;
    }
    console.log("theUA=====",theUA);
}

export {Tool}
