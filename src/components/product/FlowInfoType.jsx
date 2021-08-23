import React from 'react';
import { Link,routerRedux } from 'dva/router';
import style from '../../styles/product/collectFlow.less';
import {Tool} from '../../utils/tools';
import * as commons from '../../utils/commonUtil';
import {Toast} from 'antd-mobile';
import copy from 'copy-to-clipboard';
import PromptSelect from './PromptSelect';

class FlowInfoType extends React.Component{
  constructor(props){
    super(props);

  }

  clickItem(e){
      e.stopPropagation();
      let {data,dispatch,showHrefFunc} = this.props;
      if(data.linkHref){//文件或者视频打开
          if(showHrefFunc){
              showHrefFunc(data.linkHref,true);
          }
      }
      else if(data.linkId){
          showHrefFunc('-1',true);
         dispatch(
             routerRedux.push({
                 pathname:'/holdMeeting',
                 state:{
                     linkId:data.linkId
                 }
             })
         );
      }
      else {
          showHrefFunc('-1',true);
      }
    //   else  dispatch(routerRedux.push({pathname:'/productVideo', state:{
    //        srcFileName:data.lableText,
    //        fileSvrPath:'ff'
    //    }}));
    //


  }

  openFile(linkHref){
      let {data,dispatch,openFileFunc} = this.props;
       if(linkHref&&linkHref.match(/.pdf$/g)!=null){
           let locationHref = window.location.href;
           let hrefSetting;
           if(locationHref.indexOf('index.html')!=-1)
              hrefSetting = locationHref.substring(0,locationHref.indexOf('index.html'));
           else   hrefSetting = locationHref.substring(0,locationHref.indexOf(window.location.hash));
           openFileFunc(data,hrefSetting+'pdfjs/web/viewer.html?file='+encodeURIComponent(Tool.getSecretFilePath(linkHref)));
       }
       else  openFileFunc(data,Tool.getSecretFilePath(linkHref));
  }

  shareLink(linkHref,e){
      e.stopPropagation();
      let {data,dispatch,shareFileFunc} = this.props;
      console.log('文件地址=====',Tool.getSecretFilePath(linkHref))
      if(linkHref&&linkHref.match(/.pdf$/g)!=null){
          let locationHref = window.location.href;
          let hrefSetting;
          if(locationHref.indexOf('index.html')!=-1)
             hrefSetting = locationHref.substring(0,locationHref.indexOf('index.html'));
          else   hrefSetting = locationHref.substring(0,locationHref.indexOf(window.location.hash));
          shareFileFunc(data,hrefSetting+'pdfjs/web/viewer.html?file='+encodeURIComponent(Tool.getSecretFilePath(linkHref)));
      }
      else  shareFileFunc(data,Tool.getSecretFilePath(linkHref));
    //   window.location = 'wechat://';
    //   window.open('wechat://');
  }



  render()
  {
      let {data,dispatch,showHrefFunc,sunLable, myIndex} = this.props;
      let showImgIcon  = '';
      if(data.linkHref){
          showImgIcon = <img src={require('../../image/product/icon_dian.png')}/>;
      }
      else if(data.linkId){
          showImgIcon = <img src={require('../../image/product/collect_02.png')}/>;
      }
       return(
             <div onClick={this.clickItem.bind(this)} className={style.btn}>
               <div className={style.first}><span style={{
                   'wordBreak':'break-all'
               }}>{data.lableText}</span>{showImgIcon}</div>
               {sunLable.length > 0 && myIndex == 0 ? sunLable.map((item,index)=>{
                 return(
                   <p className={style.fontStyle}><span>{item.lineDate}</span>&nbsp;{item.lableText}</p>
                 )
               }) : ''}
               {data.linkHref&&showHrefFunc(data.linkHref)?<PromptSelect openFileFunc={this.openFile.bind(this,data.linkHref)} shareLinkFunc={this.shareLink.bind(this,data.linkHref)} labelText={data.lableText} />: <div />}
             </div>
       );
  }
}

// <PromptSelect/>
//



export default FlowInfoType;


//            <p>会议纪要 <img src={require('../../image/product/collect_02.png')}/></p>
