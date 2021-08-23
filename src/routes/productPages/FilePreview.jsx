import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import * as commons from '../../utils/commonUtil';
import {Tool} from '../../utils/tools';
import AlertPrompt from '../../components/product/AlertPrompt';
import copy from 'copy-to-clipboard';
import {Toast} from 'antd-mobile';

class FilePreview extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            display:'none'
        };
    }

    closeMethord(isHidden){
        // this.setState({
        //     display:isHidden?'none':'inline'
        // });

    }

    toCopyMethord(){
        let {dispatch,location} = this.props;
        let {copyLinkText,shareParams} =  location.state;
        if(!copy(copyLinkText)){
            Toast.fail('复制到粘贴板失败!',2);
            return;
        }

        Toast.loading('产品文件路径复制中...',15,undefined,true);
        dispatch({
            type:'xtProduct/addShareLog',
            payload:{
                params:shareParams,
                backMethord:(data)=>{
                    Toast.hide();
                    if(data&&data.code=='00'){
                        this.closeMethord(true);
                        Toast.success('已成功复制到粘贴板',2);
                    }
                    else {
                        Toast.fail('复制到粘贴板失败!',2);
                    }
                }

            }
        });
    }

    render(){
        let {dispatch,location} = this.props;
          function handlerFileName(fileName) {
            let shortFileName = fileName.substr(0, fileName.lastIndexOf('.'));
            return shortFileName.substr(0,13)+'...';
          }
            //location.state.srcFileName
        	const TitleProps = {title:location.state.srcFileName.length > 16 ? handlerFileName(location.state.srcFileName):location.state.srcFileName,
                showBack:'no',backMethord:()=>dispatch(routerRedux.goBack())};
            // const viewPage='pdfjs/web/viewer.html?file=', ImageHostAddress=commons.ImageHostAddress;
            const viewPage=process.env.PUBLIC_URL+'/pdfjs/web/viewer.html?file=', TradeAPIHostAddress=commons.TradeAPIHostAddress;
        	// let fileSvrPath = viewPage + encodeURIComponent(Tool.getSecretFilePath(location.state.fileSvrPath));

        	// let fileSvrPath = viewPage + location.state.binary;
        	// let fileSvrPath = viewPage + TradeAPIHostAddress+'product/private/pdfView?requestParam={"mgrCode":"'+Tool.getSessionUser().userId+'","id":'+location.state.id+'} ';
          //pdfjs/web/viewer.html?file=http://10.11.102.31:8090/hytrans-controller/api/product/private/pdfView/1271/000042
          let  mgrCode =Tool.getSessionUser().userId ? Tool.getSessionUser().userId : commons.userId;
        let fileSvrPath = ''
          if(location.state.fileFlag){  //+'?mgrCode='+mgrCode
            fileSvrPath = viewPage + TradeAPIHostAddress+'assetProof/pdfView/'+location.state.id+'/'+mgrCode+'?mgrCode='+mgrCode;
          }else{
            fileSvrPath = viewPage + TradeAPIHostAddress+'product/private/pdfView/'+location.state.id+'/'+mgrCode;
          }

          console.log("fileSvrPath===============",process.env.PUBLIC_URL);
          // console.log("Tool.getSessionUser().userId===============",Tool.getSessionUser().userId ? Tool.getSessionUser().userId : commons.userId);
        	return (
        		<div className={proDetailStyles.mainContent} >
                    <AlertPrompt  defineStyle={{display:this.state.display}} closeMethord={()=>{
                            this.closeMethord(true);
                        }}
                        toCopyMethord={this.toCopyMethord.bind(this)} copyLinkText={location.state.copyLinkText}
                        />
                    <div style={{width:"100%",height:"1.33rem",position:"fixed",top:'0',left:'0'}}>
                        <Title {...TitleProps} ></Title>
                        {
                            // <p className={proDetailStyles.share_dian} onClick={()=>{
                            //     this.closeMethord(false);
                            // }}><img src={require("../../image/product/icon_share_02.png")} /></p>
                        }
                    </div>
        			<div className={proDetailStyles.margin21} style={{height:'100%',width: '100%'}}>
                        <iframe ref={(iframe)=>{
                            this.iframeRef = iframe
                        }} src={fileSvrPath} style={{height:'100%',marginTop:'13%',width: '100%',overflow:'auto'}}></iframe>
        			</div>
        		</div>
        	);

    }

    componentWillUnmount() {
        this.iframeRef.remove()
    }
}



//
// const FilePreview = ({dispatch,location}) => {
// };

function connectProductFunc({xtProduct})
{
	  return {xtProduct};
}

 export default connect(connectProductFunc)(FilePreview);
