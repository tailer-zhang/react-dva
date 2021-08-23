import React from 'react';
import { Tool } from '../../../../utils/tools';
import * as commonUtil from '../../../../utils/commonUtil';
import applyStyle from './apply.less';
import { routerRedux } from "dva/router";
import { connect } from 'dva';

@connect()
export default class MyVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  playVideo= () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/playAndroidVideo', state: { path: this.props.fileSvrPath, name: this.props.name } }))
    this.props.playVideo(true)
  }

  render() {
    return (
      <div
        className={applyStyle.videoImage}
        onClick={this.playVideo} >
        <div className={applyStyle.firstDiv} id="image" >
          <img
            src={require('./palyer_video.jpg')}
            style={{ width: 75 }}
          />
        </div>
        <div className={applyStyle.videoBox} id="videoBox">
        </div>
      </div>

   )
  }
}
