import React from 'react';
import request from './utils/request';
import qs from 'qs';
import * as commons from './utils/commonUtil';
import {formatDate} from './utils/formatUtils';
import {Tool} from './utils/tools';

import { ImagePicker, Button } from 'antd-mobile';

let files1 = [];
export default class uploadFile extends React.Component {
  constructor() {
    super();
  }
  onChange1=(files, type, index)=>{
    let imageArr = files;
    console.log('requestWithUploadImage:' , files);
      let sendDate = new Date();
     let headers = {
        'Accept':'application/json',
        'app-v': commons.app_v,
        'interface-v': commons.interface_v,
        channel: commons.channel,
        'os-v': commons.os_v,
        device: commons.device,
        'app-idfa': commons.app_idfa,
        requestTime: formatDate(sendDate,'yyyyMMddhhmmss'),
        userId: Tool.getSessionUser().userId,
        Authorization:commons.token
       };
      let param = {type:'01',orderNo:'12321312',reqSeq:'33',mgrCode:'001717'};
       let requestUrl = 'http://10.130.38.31:8090/hytrans-controller/api/trade/upload';
       let formData = new FormData();
      //  formData.append('Content-Type','multipart/form-data');
      let key = 'files';
       if(imageArr)
       {
         for(let keyIndex in imageArr)
            {
              let data = imageArr[keyIndex];
              console.log('file key:' + key);
              // formData.append(key,{uri:data.url,type:data.type, name:data.name});
              // formData.append(key,data,'12321321.jpg');
              formData.append(key,data.file);

              console.log('-----文件---fsdfs----',key,{uri:data.uri,type:data.type, name:data.name});
            }
       }

       for(let key in param)
       {
         formData.append(key,param[key]);
         console.log('----value---',key,param[key]);
       }
      console.log(requestUrl,'-输入文件上传请求参数--',headers,qs.stringify(param));
      console.log('file',formData);
      return request(requestUrl,{
          method: 'post',
          headers:headers,
          body:formData
        });
  }
  render(){
    return (
    <div>
      <ImagePicker files={files1}
        onChange={(files, type, index)=>this.onChange1(files, type, index)}
        selectable={files1.length < 5}/>
    </div>
  );
  }

}
