//初始化上传文件参数（传给Android原生参数）
import * as Commons from "./commonUtil";
import URLS from "./Urls";
import {Tool} from "./tools";

export function initUploadFileParams(userIdKey){
    let requestUrl = '';
    if(userIdKey==='product')
    {
        requestUrl = Commons.TradeAPIHostAddress+URLS.UPLOAD_COMMON_FILES_URL;
    }
    else if(userIdKey==='customer')
    {
        requestUrl = Commons.CustomerAPIHostAddress+URLS.UPLOAD_COMMON_FILES_URL;
    }else if (userIdKey === 'bi_type') {
        requestUrl = Commons.BiTypeHostAddress + URLS.UPLOAD_COMMON_FILES_URL;
    }
    let userObj = Tool.getSessionUser();
    let fileParams = {
        userId:userObj.userId,
        Authorization: userObj.childToken,
        mgrCode:userObj.userId,
        url: requestUrl
    }
    console.log(fileParams,'文件参数===')
    return fileParams

}