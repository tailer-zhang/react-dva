import React, { Component,PropTypes } from 'react';
import { Button } from 'antd-mobile';
import * as Commons from '../../../../utils/commonUtil';
import Dic from '../../../../utils/dictionary';
import AddFileStyle from '../../../../styles/customer/personalCustAddMore.less'
import styles from '../../../../styles/customer/personalCustomerMaterial.less';
import ReactModal from 'react-modal';
import { Tool } from '../../../../utils/tools';

export default class ShowImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imgurl: '',
    }
  }
  onClose = (e) => {
    this.setState({
      visible: false,
    });
  }

  showImg = (img) => {
    console.log('img', img);
    this.setState({
      visible: true,
      imgurl: img,
    });
  }

  render() {
    const { imageList } = this.props;
    return (
      <div>
        <div className={AddFileStyle.fileType}>
          <p>其他表单<span>{imageList.length}</span></p>
          <div className={AddFileStyle.dataImg}>
            {
              imageList.map((value, idx) => {
                let src = Tool.getSecretFilePath(value.fileSvrPath);
                return (
                  <span key={idx}>
                    <img src={src} onClick={() => this.showImg(src)}/>
                  </span>
                )
              })
            }
          </div>
        </div>
        <ReactModal
          isOpen={this.state.visible}
          onRequestClose={this.onClose}
          contentLabel="图片预览"
          style={{
            overlay: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
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
