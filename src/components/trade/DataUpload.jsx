import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Toast} from 'antd-mobile';
import * as commonUtil from '../../utils/commonUtil';
import PushImg from '../share/PushImg';//资料上传组件
import tradeStyles from '../../styles/trade/trade.less';//样式文件

class  DataUpload extends React.Component {
  constructor(props) {
     super(props);
  }

  componentDidMount() {
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }

  //移除监听
  componentWillUnmount(){
    let _this = this
    window.removeEventListener('message',_this.onMessage,false)
    global.receiveType = ''
    global.selectIndex = ''
  }

  dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  //监听的返回数据
  onMessage=(e)=> {
      if(!e.data ||!e.origin) return;
      try{
        let blobs,content,content1,receiveData=JSON.parse(e.data);
        if(receiveData&&receiveData.natvieBase){
          //android native imge infor
          content = 'data:image/png;base64,'+receiveData.natvieBase;
          blobs = this.dataURLtoFile(content, new Date().getTime()+ '.png')
        }else{
          content1 = receiveData;
          if(typeof content1 !='string') return;
          content = content1.replace(/\//g,"").replace(/\+/g,"").replace(/\,/g,"").replace(/\;/g,"").replace(/\:/g,"").replace(/\=/g,"");
          blobs = this.dataURLtoFile(content1, content.substring(content.length - 20, content.length) + '.png')
        }
        if(!blobs) return;
        let {dispatch,orderInfo,formStorage,attachList,rejectFlag} = this.props;
        var myType = global.receiveType
        var type = myType
        var selectIndex = global.selectIndex
        // let content1 = JSON.parse(e.data)
        // let content = content1.replace(/\//g,"").replace(/\+/g,"").replace(/\,/g,"").replace(/\;/g,"").replace(/\:/g,"").replace(/\=/g,"");
        // let blobs = this.dataURLtoFile(content1, content.substring(content.length - 20, content.length) + '.png')
        let params = {}
        if(myType === 'j' || myType === 'd'){
          params = {orderNo:orderInfo.orderNo,reqSeq:rejectFlag=='0'?orderInfo.reqSeq:'',type:type,custName: orderInfo.custName};
        }else {
          params = {orderNo:orderInfo.orderNo,reqSeq:rejectFlag=='0'?orderInfo.reqSeq:'',type:type};
        }
        if(blobs.size > 5000000){//5M 5000000
          Toast.fail('文件大小超出限制',3);
          return;
        }
        dispatch({
          type:'trade/uploadTradeFiles',
          payload:{
            params: params,
            images:[{file:blobs}],
            backMethord:(data)=>{
              if(data&&data.code=='00'&&data.model)
              {
                let resultFiles = data.model,tempFiles= [];
                for(let i=0;i<resultFiles.length;i++)
                {
                  let file = resultFiles[i];
                  tempFiles.push({url:commonUtil.ImageHostAddress+file.fileSvrPath,fileId:file.id,type:type,
                    srcFileName:file.srcFileName});
                }

                let modifyImgs = attachList[selectIndex];
                modifyImgs.list = modifyImgs.list.concat(tempFiles);
                attachList[selectIndex] = modifyImgs;
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    attachList:attachList
                  }
                });
              }
              else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
            }
          }
        });
      } catch (e) {

      }

  }

  imageChange(selectIndex,type,files, operType, operIndex, myType)
  {
    let {dispatch,orderInfo,formStorage,attachList,rejectFlag} = this.props;
    let params = {}
    if(myType === 'j' || myType === 'd'){
      params = {orderNo:orderInfo.orderNo,reqSeq:rejectFlag=='0'?orderInfo.reqSeq:'',type:type,custName: orderInfo.custName};
    }else {
      params = {orderNo:orderInfo.orderNo,reqSeq:rejectFlag=='0'?orderInfo.reqSeq:'',type:type};
    }
    if(operType=='add')//表示添加图片
    {
     let image = files[files.length-1];
     console.log('image4444',image)
     console.log('myType4444',myType)
     if(image.file.size > 5000000){//5M 5000000
       Toast.fail('文件大小超出限制',3);
       return;
     }
      if(myType === 'l'){
        console.log('image.file.type',image.file.type)
        if ((image.file.type).indexOf('image/jpeg') === -1) {
          Toast.fail('请上传正确格式的合同签署页资料,资料格式为jpg或者jpeg', 3);
          return
        }
      }

     dispatch({
       type:'trade/uploadTradeFiles',
       payload:{
         params:params,
         images:[{
           file:image.file
          }],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model,tempFiles= [];
              for(let i=0;i<resultFiles.length;i++)
              {
                 let file = resultFiles[i];
                 tempFiles.push({url:commonUtil.ImageHostAddress+file.fileSvrPath,fileId:file.id,type:type,
                   srcFileName:file.srcFileName});
              }

              let modifyImgs = attachList[selectIndex];
              modifyImgs.list = modifyImgs.list.concat(tempFiles);
              attachList[selectIndex] = modifyImgs;
              dispatch({
                type:'formStorage/fetch',
                payload:{
                  attachList:attachList
                }
              });
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
          }
        }
     });
    }
    else if(operType=='remove')//表示移除图片
    {
      let modifyImgs = attachList[selectIndex];
      let file = modifyImgs.list[operIndex];
       dispatch({
         type:'trade/delTradeFiles',
         payload:{
           delList:[{id:file.fileId}],
           backMethord:(data)=>{
             if(data&&data.code=='00')
             {
               if(operIndex<modifyImgs.list.length&&operIndex>=0)
               {
                 modifyImgs.list.splice(operIndex,1);
                 attachList[selectIndex] = modifyImgs;
                 dispatch({
                   type:'formStorage/fetch',
                   payload:{
                     attachList:attachList
                   }
                 });
               }
             }
             else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
           }
         }
       });
    }
  }

  render(){
    return(
      <div className={tradeStyles.remitWrap} style={{paddingBottom:'150px',height:'100%',backgroundColor:'#efeff4'}}>
        <PushImg  dataSource={this.props.attachList} onChange={this.imageChange.bind(this)} dispatch={this.props.dispatch}/>
      </div>
    );
  }
};
function connectTrade({trade,formStorage})
{
  return {trade,formStorage};
}
export default connect(connectTrade)(DataUpload);
