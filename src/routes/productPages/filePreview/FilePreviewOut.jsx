import React, { Component, PropTypes } from 'react';
import Title from '../../../components/product/Title';
import proDetailStyles from '../../../styles/product/ProductDetail.less';

class filePreviewOut extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let TitleProps = {title:'标题',showBack:'no'}
        let locationHref = window.location.href;
        let hrefSetting;
        if(locationHref.indexOf('index.html')!=-1){
            hrefSetting = locationHref.substring(0,locationHref.indexOf('index.html'));
        } else {
            hrefSetting = locationHref.substring(0,locationHref.indexOf(window.location.hash));
        }
        let fileSvrPath = hrefSetting+'pdfjs/web/viewer.html?file=';
        return (
            <div className={proDetailStyles.mainContent}>
                <div style={{width:"100%",height:"1.33rem",position:"fixed",top:'0',left:'0'}}>
                    <Title {...TitleProps} ></Title>
                </div>
                <div className={proDetailStyles.margin21} style={{height:'100%',width: '100%'}}>
                    <iframe src={fileSvrPath} style={{height:'100%',marginTop:'13%',width: '100%',overflow:'auto'}}></iframe>
                </div>
            </div>
        )
    }
}
export default filePreviewOut;
