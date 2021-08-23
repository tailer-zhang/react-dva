import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView,ImagePicker,Toast} from 'antd-mobile';
import ReactModal from 'react-modal';
import AddFileStyle from '../../styles/customer/personalCustAddMore.less'
import {Tool} from '../../utils/tools';
import * as commonUtil from "../../utils/commonUtil";
const data = [];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
var arr = []

const PushImg = React.createClass({
  getInitialState() {
    return {
      visible:false,
      imgurl:'',
      imgName:'',
      index: undefined,
      fileId:null,
      oriName:'',
      showType: '',
    };
  },
  onEndReached(event) {
  },

  //click file to show the details
  showImg(img,index, type){
    let splitArr = img.url.split('?')
    let unique= arr.find((it)=>{return it.url == splitArr[0]})
    let { dispatch } = this.props;
    dispatch({
      type:'trade/getFileName',
      payload:{
        params:{id:unique.fileId},
        backMethord:(data)=>{
          if (data.code === '00'){
            this.setState({
              oriName:data.model.srcFileName
            });
          }else {
            this.setState({
              oriName:unique.srcFileName
            });
          }
        }
      }
    });
    this.setState({
      visible: true,
      imgurl:img.url,
      index: index,
      fileId:unique.fileId,
      showType: type,
    });
  },

  //shut it then clear up
  onClose(e){
    this.setState({
      visible: false,
      imgName:'',
      oriName:'',
      showType: ''
    });
  },

  // change the input anytime
  changeImgName(e){
    this.setState({imgName:this.refs.imgName.value})
  },

  // be certainly to change success!!
  onChangeSumbit(){
    let { dispatch } = this.props;
    dispatch({
      type:'trade/uploadTradeFileName',
      payload:{
        params:{srcFileName:this.state.imgName,id:this.state.fileId,oldSrcFileName:this.state.oriName},
        backMethord:(data)=>{
          if (data.code==='00'){
            Toast.success('修改成功')
            this.setState({
              // visible: false,
              imgName:'',
              oriName:this.state.imgName
            });
          }else {
            Toast.fail(this.state.imgName === '' ? '修改文件名字不能为空' :  '修改失败')
            this.setState({
              // visible: false,
              imgName:'',
              oriName:this.state.oriName
            });
          }

        }
      }
    });
  },

  render() {
    let { dispatch,dataSource,onChange,fileUploadParams} = this.props;
    let { imgName } = this.state;
    return (<div >
      {
        dataSource.map((rowData,rowID)=>{
          let imgList = new Array(rowData.list.length);
          console.log('fileUploadParams======',fileUploadParams)
          for(let i = 0; i<rowData.list.length; i++){
            if (arr.indexOf(rowData.list[i]) === -1){
              arr.push(rowData.list[i])
            }
            imgList[i] = {url:Tool.getSecretFilePath(rowData.list[i].url)};
          }
          return (
              <div key={rowID} className={AddFileStyle.fileType}>
                <p>{ rowData.matrTypeName }<span>{imgList.length}/{rowData.fileNumber}</span></p>
                <ImagePicker
                    fileUploadParams={fileUploadParams?fileUploadParams:''}
                  files={imgList}
                  containsLength={imgList.length}
                  receiveType={rowData.matrType}
                  selectIndex={rowID}
                  onChange={(files, type, index)=>onChange(rowID,rowData.matrType,files, type, index, rowData.matrType)}
                  // onImageClick={(index,files)=>this.showImg(files[index],index, rowData.matrType)}
                  acceptLength={rowData.fileNumber}
                  maxNum={rowData.fileNumber}

                  selectable={imgList.length < rowData.fileNumber}
                />
                <ReactModal
                  handleOpenModal={this.onOpen}
                  isOpen={this.state.visible}
                  onRequestClose={this.onClose}
                  contentLabel="图片预览"
                  className={AddFileStyle.reactModal}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      zIndex:100,
                      overflow:'hidden'
                    },
                    content: {
                      color: 'lightsteelblue',
                      height:'100%',
                      textAlign: 'center'
                    }
                   }}
                >
                  <img src={this.state.imgurl} style={{marginBottom:'0.4rem',width:'100%'}} />
                  {
                    <p className={AddFileStyle.textName}>{this.state.oriName}</p>

                  }
                  {this.state.showType === 'j' || this.state.showType === 'd' ? null :
                    <div className={AddFileStyle.imgName}>
                      <input
                        ref="imgName"
                        type="text"
                        value={imgName}
                        placeholder="修改文件名"
                        onChange={this.changeImgName}
                      /> <p onClick={this.onChangeSumbit}>确定</p>
                    </div>
                  }
                    <Button className="btn"  type="primary" onClick={this.onClose}>关闭</Button>
                  <p style={{height:'7rem'}}></p>
                </ReactModal>
              </div>
          );
        })
      }
    </div>);
  },
});

export default PushImg;
