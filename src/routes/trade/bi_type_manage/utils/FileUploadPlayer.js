import React from 'react';
import { Tool } from '../../../../utils/tools';
import * as commonUtil from '../../../../utils/commonUtil';
import applyStyle from './apply.less';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

@connect()
export default class FileUploadPlayer extends React.Component {
  play = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/playAndroidVideo', state: { path: this.props.fileSvrPath, name: this.props.name } }))
    this.props.playVideo(true)
  }

  render() {
    return (
      <div
        className={applyStyle.videoImage}
        onClick={this.play} >
        <div id="image" >
          <img
            src={require('./palyer_video.jpg')}
            className={applyStyle.coverImage}
          />
        </div>
      </div>
    )
  }
}
