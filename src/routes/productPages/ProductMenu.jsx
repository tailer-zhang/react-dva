import React,{Component, PropTypes} from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import TitleComp, { flushTitle } from 'react-title-component';
import styles from '../../styles/product/ProductMain.css';
import { pubuilcRaise} from '../../utils/commonUtil.js'

class ProductMenu extends React.Component{
       constructor(props) {
         super(props);
     }
    
    clickMenu(path){
        let {dispatch} = this.props;
        dispatch(routerRedux.push(path));
    }
  openFileFunc(data,linkHref){
    console.log('this333333333333333333333',this)
    let {dispatch,showHrefFunc,detail} = this.props;
    console.log('data---------------->',data)
/*    dispatch({ type: 'xtProduct/recordVisitTimes', payload: {  } });*/
    dispatch(routerRedux.push({pathname:'/ProductNotify', state:{
      }}));
  }
     getAppFun (type, params, listen) {
    let keys = Object.keys(params)  
    let values = Object.values(params)
    let info = "{\"callback\":\"" + listen + "\",\""

    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++) {
        if (i == keys.length - 1) {
          info = info + keys[i] + "\":\"" + values[i] + "\""
        } else {
          info = info + keys[i] + "\":\"" + values[i] + "\",\""
        }
      }
      info = info + "}"
    } else {
      info = "{\"callback\":\"" + listen + "\"}"
    }
    console.log('app callback:', info)
    const u = navigator.userAgent;
    const changeArr = []
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
    if (isiOS) {
      window.top.webkit.messageHandlers[type].postMessage(info);
    } 
    else{
    //   window.top.android_app[type](info); 无效 原生代码只允许 2层嵌套 原因
      window.location.href = params.url
    }
    return
  }
    goPubRaise(){
        let appUrl = pubuilcRaise+"pubRaiseFund?VNK=7bae912d&token="+localStorage.getItem("token")
            console.log(appUrl);
        this.getAppFun('skipUrl',{ title: '公募基金查询', url: appUrl, statusbar: '',  show:  true  }, 'oWeb')
    //     const u = navigator.userAgent;
    // const changeArr = []
    // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     if(isiOS){
    //         window.top.webkit.messageHandlers.openUrl.postMessage("{\"url\":\"" + appUrl + "\"}");
    //       }
    //     if(isAndroid){
    //         window.top.android_app.openUrl("{\"url\":\"" + appUrl+ "\"}");
    //     }
    }
  render()
  {
    return(
      <div className={styles.prodMenu}>
          <TitleComp render="产品"/>
        <div className={styles.whiteSpeace}></div>
        <p onClick={this.clickMenu.bind(this,'/productMain')}>
            <img src={require('../../image/product/menu_01.png')} />私募产品查询
            <span>
                <img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </span>
        </p>
        {/*<p onClick={this.clickMenu.bind(this,'/onlineProductList')}>*/}
            {/*<img src={require('../../image/product/menu_03.png')} />待上架私募产品*/}
            {/*<span>*/}
                {/*<img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>*/}
            {/*</span>*/}
        {/*</p>*/}
        <div className={styles.whiteSpeace}>
        </div>
        <p onClick={this.clickMenu.bind(this,'/productMain/bx')}>
            <img src={require('../../image/product/menu_02.png')} />B类产品查询
            <span>
                <img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </span>
        </p>
        <div className={styles.whiteSpeace}>
        </div>
        <p onClick={this.clickMenu.bind(this,'/otherProduct')}>
            <img src={require('../../image/trade/buy_icon.png')} />私募产品预约 
            <span>
                <img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </span>
        </p>
        <div className={styles.whiteSpeace}>
        </div>
        <p onClick={this.goPubRaise.bind(this)}> 
            <img src={require('../../image/trade/gongmuicon.png')} />公募基金查询
            <span>
                <img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </span>
        </p>
        <div className={styles.whiteSpeace}></div>
        <p onClick={this.openFileFunc.bind(this)}>
          <img src={require('../../image/trade/preview_icon.png')} />产品相关通知
          <span>
                <img src={require('../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </span>
        </p>
      </div>
    );
  }
}

export default  connect()(ProductMenu);

// <div>
//   <XtWaitList/>
// </div>
