import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, ImagePicker } from 'antd-mobile';
import ReactModal from 'react-modal';
import AddFileStyle from '../../../../styles/customer/personalCustAddMore.less'
import { Tool } from '../../../../utils/tools';

function connectProps({ formStorage }) {
  return { formStorage }
}

@connect(connectProps)
export default class UploadImage extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      imgurl: '',
      files: [],
    }
  }

  onEndReached = (event) => {
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  showImg(img) {
    console.log('img', img);
    this.setState({
      visible: true,
      imgurl: img.url,
    });
  }

  render() {
    const { dispatch, imageList, onChange, formSorage } = this.props;
    // console.log('UploadImage.js line 42🌺', imageList)
    let imgList = []
    for (let i = 0; i < imageList.length; i++) {
      imgList[i] = { url: Tool.getSecretFilePath(imageList[i].fileSvrPath) };
    }
    // console.log('UploadImage.js line 47🌺', imgList)
    return (
      <div className={AddFileStyle.fileType}>
        <p>上传表单<span>{imgList.length}/5</span></p>
        <ImagePicker
          files={imgList}
          onChange={(files, type, index) => onChange(files, type, index)}
          onImageClick={(index, files) => this.showImg(files[index])}
          selectable={imgList.length < 5} />

        <ReactModal
          handleOpenModal={this.onOpen}
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
              textAlign: 'center',
            },
          }}
        >
          <img src={this.state.imgurl} style={{ marginBottom: '0.4rem', width: '100%' }} alt="#" />
          <Button className="btn" type="primary" onClick={this.onClose}>关闭</Button>
        </ReactModal>
      </div>
    );
  }
}

