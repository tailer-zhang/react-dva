import React from 'react';
import DefaultHeight from './DefaultHeight.jsx';
import FlowBlack from './FlowBlack.jsx';
import PromptSelect from './PromptSelect';
import {Toast} from 'antd-mobile';
import { Link,routerRedux } from 'dva/router';
import {Tool} from '../../utils/tools';
import copy from 'copy-to-clipboard';
import styles from '../../styles/product/collectFlow.less';
import AlertPrompt from './AlertPrompt';

class CollectFlow extends React.Component{
  constructor(props){
    super(props);
    let {currentState} = props;
    this.state={
      changeStyle:{
        backgroundColor:'#f22f33',
        color:'#fff',
      },
      selectIndex:currentState?currentState:0,
      alertDisplay:'none',
      copyLinkText:'',
      data:{},
      copying:false
    }
  }
componentDidMount(){
     let  productMenuContract = Tool.localItem('productMenuContract')
   if(productMenuContract === '3.0'){
         window['shareFn'] = function(data){
            console.log("微信分享----->",data);
         }

   }
}
  renderRow(item,index){
      let {data,dispatch,currentState,showHrefFunc} = this.props;
      let {selectIndex} = this.state;

    if(!data){
        data = {};
    }
      let childData = data[item.key];
    console.log('childData',childData)
      if(!childData){
          childData = [];
      }
      let secClass  = styles.collectTime;
      let dom = <DefaultHeight/>;
      if(selectIndex==index){
          secClass = styles.collectTime + " " + styles.duration;
          dom = <FlowBlack data={childData} dispatch={dispatch}  showHrefFunc={showHrefFunc}
              shareFileFunc={this.shareFileFunc.bind(this)} openFileFunc={this.openFileFunc.bind(this)}
               />;
      }
      else if(currentState==index){
          secClass = styles.collectTime + " " + styles.duration + " " + styles.duration2;
      }
      return (
          <section key={index} className={secClass} onClick={(e)=>{
          e.stopPropagation();
          //进行隐藏dom
          showHrefFunc('-1',true);}}>
            <p onClick={(e)=>{
                    e.stopPropagation();
                    //进行隐藏dom
                    showHrefFunc('-1',true);
                    this.setState({selectIndex:index});
            }}><span>{item.name}</span></p>
            {dom}
          </section>
      );
  }

  openFileFunc(data,linkHref){
        console.log('this333333333333333333333',this)
        // 过滤掉 大写的后缀名
        if(data.linkHref.split(".")[1]=="PDF"){
          console.log("CollectFlow---是大写");
          data.linkHref = data.linkHref+"".split(".")[0]+"."+"pdf"
        }

        let {dispatch,showHrefFunc,detail} = this.props;
        showHrefFunc('-1',true);
        console.log('data---------------->',data)
        let fileRef = data.linkHref;

        dispatch({ type: 'xtProduct/recordVisitTimes', payload: { fileId: data.linkFileId, operType: '1' } });
        if(fileRef&&fileRef.match(/.pdf$/g)!=null){
            let linkText = detail.prodName+' - 【'+data.lableText+'】'+linkHref;
            dispatch(routerRedux.push({pathname:'/filePreview', state:{
                srcFileName:data.lableText,
                fileSvrPath:fileRef,
                copyLinkText:linkText,
                id:data.linkFileId,
                shareParams:{
                    prodId:detail.id,
                    fileSvrPath:data.linkFileId,
                    fileName:data.lableText
                }
            }}));
        }
        else if(fileRef&&fileRef.match(/.mp4$/g)!=null){
            dispatch(routerRedux.push({pathname:'/productVideo', state:{
                srcFileName:data.lableText,
                fileSvrPath:fileRef
            }}));
        }
        else if(fileRef&&(fileRef.match(/.zip$/g)!=null||fileRef.match(/.rar$/g)!=null||fileRef.match(/.cab$/g)!=null)){
            Toast.fail('暂时不支持此文件格式的文件打开!',1);
        }
        else {
            window.location =Tool.getSecretFilePath(fileRef);
        }
  }

  shareFileFunc(data,linkHref){
      let {showHrefFunc,detail} = this.props;
      showHrefFunc('-1',true);
       let productText = detail.prodName+' - 【'+data.lableText+'】';
      let linkText = detail.prodName+' - 【'+data.lableText+'】'+linkHref;
       let u = navigator.userAgent;
     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let  productMenuContract = Tool.localItem('productMenuContract')
    console.log('productMenuContract',productMenuContract)
      let imgUrl = 'https://fdfs.haiwm.com/hybase/M00/02/29/CgCMDWEKEEqAZVT-AAB7PijtWMs8215258'
    // let imgUrl = 'https://fdfs.haiwm.com/hybase/M00/00/CD/CgCMDl7nTOOAFdUcAAlZVchMW-w2018587'
       this.setState({
           // alertDisplay:'inline',
           copyLinkText:linkText,
           data:data
        });
    let urlTem = linkHref+"&&fileName="+detail.prodName
    console.log('urlTemurlTem',urlTem)
      if(productMenuContract === '3.0'){
         if(isAndroid){
             window.top.android_app.shareWeixin("{\"callback\":\"shareFn\",\"title\":\""+detail.prodName+"\",\"content\":\""+productText+"\",\"thumb\":\""+imgUrl+"\",\"targetUrl\":\""+linkHref+"\",\"noFriends\":\"1\"}");
         }
         if(isiOS){
            window.top.webkit.messageHandlers.shareWeixin.postMessage("{\"callback\":\"shareFn\",\"title\":\""+detail.prodName+"\",\"content\":\""+productText+"\",\"thumb\":\""+imgUrl+"\",\"targetUrl\":\""+linkHref+"\",\"noFriends\":\"1\"}");
         }
      }else{
              let shareInfo = {
                type:'privateWxShare',
                title:detail.prodName,
                desc:productText,
                url:linkHref+"&&fileName="+detail.prodName
              }
              console.log('分享==》',shareInfo)
              window.parent.postMessage(shareInfo,"*")
      }
  }

  closeMethord(){
      this.setState({
         alertDisplay:'none',
         copyLinkText:'',
         data:{}
      });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('==ddssdfd update=',nextState);
  //     if(nextState.copying){
  //         if(copy(nextState.copyLinkText))
  //         {
  //             Toast.success('已成功复制到粘贴板',2);
  //             this.setState({
  //                 copyLinkText:'',
  //                 data:{},
  //                 copying:false
  //             });
  //         }
  //     }
  //     return !nextState.copying;
  // }

  // async copyMethord(copyLinkText){
  //     if(copy(copyLinkText)){
  //         Toast.success('已成功复制到粘贴板',2);
  //     }
  // }

  toCopyMethord(){
      let {detail,dispatch,showHrefFunc,key} = this.props;
      let {copyLinkText,data} =  this.state;
      console.log('this.props',this.props)
      console.log('this.state',this.state)
      if(!copy(copyLinkText)){
          Toast.fail('复制到粘贴板失败!',2);
          return;
      }

      Toast.loading('产品文件路径复制中...',15,undefined,true);
      dispatch({
          type:'xtProduct/addShareLog',
          payload:{
              params:{
                  prodId:detail.id,
                  fileSvrPath:data.linkFileId,
                  fileName:data.lableText
              },
              backMethord:(data)=>{
                  Toast.hide();
                  if(data&&data.code=='00'){
                      this.closeMethord();
                      Toast.success('已成功复制到粘贴板',2);
                  }
                  else {
                      Toast.fail('复制到粘贴板失败!',2);
                  }
              }

          }
      });

  }


  render()
  {
    let changeStyle = this.state.changeStyle.backgroundColor;
    // let open = this.state.open;
    const orderList = [{key:'raise',name:'募集期'},{key:'subsist',name:'存续期'},{key:'end',name:'到期'}];
    return(
      <div className={styles.headerCnt}>
         <AlertPrompt defineStyle={{display:this.state.alertDisplay}} closeMethord={this.closeMethord.bind(this)}
             toCopyMethord={this.toCopyMethord.bind(this)} copyLinkText={this.state.copyLinkText}
             />
        <div className={styles.collectFlow}>
          {
              orderList.map(this.renderRow.bind(this))
          }
          <section className={styles.collectTime}>
            <p><span>结束</span></p>
          </section>
        </div>
      </div>
    );
  }
}

// <section className={styles.collectTime }>
//   <p><span>募集期</span></p>
//   <DefaultHeight/>
// </section>
// <section className={styles.collectTime + " " + styles.duration}>
//   <p><span>存续期</span></p>
//   <FlowBlack />
// </section>
// <section className={styles.collectTime + " " + styles.duration}>
//   <p><span>到期</span></p>
//   <FlowBlack/>
// </section>

export default CollectFlow;
