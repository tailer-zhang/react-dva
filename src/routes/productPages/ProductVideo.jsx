import React ,{ Component } from 'react';
import {Toast} from 'antd-mobile';
import ReactPlayer from 'react-player';

import videoStyle from '../../styles/product/ProductVideo.less';
import * as commons from '../../utils/commonUtil';
import {Tool} from '../../utils/tools';

export default class ProductVideo extends React.Component{
  constructor(props){
    super(props);
  }

  render()
  {
     let {location} = this.props;
     let fileSvrPath=Tool.getSecretFilePath(location.state.fileSvrPath);
    //  fileSvrPath = 'http://www.chyjr.com/photo/style/video/ad/ad02.mp4';
    return(
        <ReactPlayer url={fileSvrPath}
         playing
         width='100%'
         height='100%'
         controls={true}
         />
    );
  }
}
// 'http://www.chyjr.com/photo/style/video/ad/ad02.mp4'
// <div className={videoStyle.videoDiv}>
// </div>
