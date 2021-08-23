import React, { Component } from 'react';
import { connect } from 'dva';
import ReactModal from 'react-modal';
import style from '../style/approveStyle.less'
import { Tool } from '../../../../../../utils/tools';
import { routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import { Toast } from 'antd-mobile/lib/index';

@connect()
export default class ApprovedFile extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }

  onClose = (e) => {
    this.setState({
      visible: false,
    });
  }

  showFile(file) {
    const { dispatch } = this.props;
    const fileRef = file.fileSvrPath;
    if (fileRef && fileRef.match(/.pdf$/g) !== null) {
      dispatch(routerRedux.push({ pathname: '/filePreview', state: {
        srcFileName: file.srcFileName,
        fileSvrPath: fileRef,
          fileFlag:'1',
          id:file.id
      } }));
    } else if ((((file.srcFileName.split('.')).pop()).indexOf('jpg') !== -1 || ((file.srcFileName.split('.')).pop()).indexOf('png') !== -1 || ((file.srcFileName.split('.')).pop()).indexOf('jpeg') !== -1)) {
      this.setState({
        visible: true,
        imgurl: Tool.getSecretFilePath(file.fileSvrPath),
      });
    } else {
      window.location = Tool.getSecretFilePath(fileRef);
    }
  }

  render() {
    return (
      <div>
        {
          this.props.fileList.map((item, index) => {
            return (
              <div className={style.content} key={index} onClick={this.showFile.bind(this, item)}>
                <div className={style.left}>
                  <div>{(item.fileSvrPath.substring(item.fileSvrPath.length - 3)).toUpperCase()}</div>
                  <div>{item.srcFileName}</div>
                </div>
                <div className={style.right}>
                  <div>{item.formatName}</div>
                  <div>预览</div>
                </div>
                <div style={{ clear: 'both' }} />
              </div>
            )
          })
        }
        <ReactModal
          isOpen={this.state.visible}
          onRequestClose={this.onClose}
          contentLabel="图片预览"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 100,
              overflow: 'hidden',
            },
            content: {
              color: 'lightsteelblue',
              height: '100%',
            },
          }}
        >
          <img src={this.state.imgurl} />
          <Button className="btn" type="primary" onClick={this.onClose}>关闭</Button>
        </ReactModal>
      </div>
    )
  }
}
