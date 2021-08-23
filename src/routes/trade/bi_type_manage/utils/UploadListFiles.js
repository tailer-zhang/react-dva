import React from 'react';
import { connect } from 'dva'
import listFileStyle from './listFile.less';
import ListFiles from './ListFiles';
import moment from 'moment';
import * as commonUtil from '../../../../utils/commonUtil';
import { Toast } from 'antd-mobile/lib/index';
import { Tool } from '../../../../utils/tools';
import ReactModal from 'react-modal';
import { ActivityIndicator, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
function getStrLeng(str){
  var realLength = 0;
  var len = str.length;
  var charCode = -1;
  for(var i = 0; i < len; i++){
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    }else{
      // 如果是中文则长度加2
      realLength += 2;
    }
  }
  return realLength;
}

function connectStateToprops({ trade, formStorage }) {
  return { trade, formStorage }
}
@connect(connectStateToprops)
export default class UploadListFiles extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      animating: false,
      content: '文件正在上传,请耐心等待...',
      visible: false,
      changeText: '',
      clickIndex: '',
    }
  }

  onClose = (e) => {
    this.setState({
      visible: false,
    });
  }

  onFilesChange = (files) => {
    if ((files[0].type).indexOf('image/') === -1 && (files[0].type).indexOf('pdf') === -1) {
      Toast.fail('请上传正确格式的表单资料', 3);
      return
    }

    this.setState({ files })
    if (this._remove) return
    const { dispatch, dataSource, from } = this.props;
    const temArr = this.props.imageList;
    const tempFiles = files
    // for (let index = 0; index < files.length; index ++) {
    //   const ifUpload = temArr.find((it) => { return it.srcFileName === files[index].name })
    //   if (!ifUpload) {
    //     tempFiles.push(files[index])
    //   }
    //   if (ifUpload) {
    //     Toast.fail('文件已经存在', 3);
    //   }
    // }
    if (!tempFiles.length) return
    const sumLength = files.length + temArr.length
    if (sumLength > 10) {
      Toast.fail('上传表单数量不能超过10个!', 3);
    } else {
      let arr = []
      let params;

      this.setState({
        animating: true,
      })
      // --------- 投资者转换申请 上传资料信息 ------
      if (from === 'applyForRoleChangeItem') {
        dispatch({
          type: 'trade/uploadTradeCommonFiles',
          payload: {
            images: tempFiles,
            backMethord: (data) => {
              if (data && data.code === '00') {
                let newarr = [];
                for (let i = 0; i < data.model.length; i++) {
                  let temp = {fileSvrPath: data.model[i].fileId, srcFileName: data.model[i].fileName}
                  newarr.push(temp)
                }
                arr = temArr.concat(newarr)
                this.props.dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    imageUpload: {imageList: arr},
                  },
                });
                this.setState({
                  animating: false,
                })
              } else {
                Toast.fail(data && data.message ? data.message : '文件上传失败!', 2);
                this.setState({
                  animating: false,
                })
              }
            },
          },
        });
      } else if (from === 'itemDetailChange') { //私募双录录入 / 转换驳回列表修改时 上传
        const params = {reqSeq: dataSource.reqNo, type: 'f'};
        dispatch({
          type: 'trade/uploadTradeFiles',
          payload: {
            params,
            images: tempFiles,
            backMethord: (data) => {
              if (data && data.code === '00') {
                arr = temArr.concat(data.model)
                this.props.dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    imageUpload: {imageList: arr},
                  },
                });
                this.setState({
                  animating: false,
                })
              } else {
                this.setState({
                  animating: false,
                })
                Toast.fail(data && data.message ? data.message : '文件上传失败!', 2);
              }
            },
          },
        });
      }
    }
  }

  onFilesError = (error, file) => {
    Toast.fail(error.message)
  }

  filesRemoveOne(file, index) {
    this._remove = true;
    const { dispatch, from, formStorage } = this.props;
    const { formValue } = formStorage
    const tempList = this.props.imageList;
    this.refs.files.removeFile(file)
    if (from === 'applyForRoleChangeItem' || from === 'itemDetailChange') {
      const removeArr = formValue.imageUpload.imageList
      if (!file.reqSeq) {
        const newArr = removeArr.filter((item) => {
          return item.fileSvrPath !== file.fileSvrPath
        })

        dispatch({
          type: 'trade/deleteLocalFile',
          payload: {
            path: file.fileSvrPath,
            backMethord: (data) => {
              if (data && data.code === '00') {
                console.log('本地删除成功！！！！！！！')
              } else Toast.fail(data && data.message ? data.message : '文件删除失败!', 2);
            },
          },
        });
        dispatch({
          type: 'formStorage/fetchFormValue',
          payload: {
            imageUpload: { imageList: newArr },
          },
        });
      } else {
        if (from === 'applyForRoleChangeItem') {
          dispatch({
            type: 'trade/delTradeFiles',
            payload: {
              delList: [{ id: file.id }],
              backMethord: (data) => {
                if (data && data.code === '00') {
                  this._remove = false;
                  removeArr.splice(index, 1)
                  dispatch({
                    type: 'formStorage/fetchFormValue',
                    payload: {
                      imageUpload: { imageList: removeArr },
                    },
                  });
                } else Toast.fail(data && data.message ? data.message : '文件删除失败!', 2);
              },
            },
          });
        } else if (from === 'itemDetailChange') {
          dispatch({
            type: 'trade/delTradeFiles',
            payload: {
              delList: [{ id: file.id }],
              backMethord: (data) => {
                if (data && data.code === '00') {
                  this._remove = false;
                  tempList.splice(index, 1)
                  dispatch({
                    type: 'formStorage/fetchFormValue',
                    payload: {
                      imageUpload: { imageList: removeArr },
                    },
                  });
                } else Toast.fail(data && data.message ? data.message : '文件删除失败!', 2);
              },
            },
          });
        }
      }
    }
  }

  showFiles(file) {
    this.props.touch(true)
    const { dispatch } = this.props;
    const fileRef = file.fileSvrPath;
    if (fileRef && fileRef.match(/.pdf$/g) !== null) {
      dispatch(routerRedux.push({ pathname: '/filePreview', state: {
        srcFileName: file.srcFileName,
        fileSvrPath: fileRef,
      } }));
    } else if (fileRef && fileRef.match(/.mp4$/g) !== null) {
      dispatch(routerRedux.push({ pathname: '/productVideo', state: {
        srcFileName: file.srcFileName,
        fileSvrPath: fileRef,
      } }));
    } else if (fileRef && (fileRef.match(/.zip$/g) !== null || fileRef.match(/.rar$/g) !== null || fileRef.match(/.cab$/g) !== null)) {
      Toast.fail('暂时不支持此文件格式的文件打开!', 1);
    } else if ((((file.fileSvrPath.split('.')).pop()).indexOf('jpg') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('png') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('jpeg') !== -1) || ((file.srcFileName.split('.')).pop()).indexOf('PNG') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('JPG') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('JPEG') !== -1) {
      this.setState({
        visible: true,
        imgurl: Tool.getSecretFilePath(file.fileSvrPath),
      });
    } else {
      window.location = Tool.getSecretFilePath(fileRef);
    }
  }

  textAreaAdjust(e) {
    this.refs.area.style.height = '1px';
    this.refs.area.style.height = (33 + this.refs.area.scrollHeight) + 'px';
  }

  render() {
    const { imageList, formStorage, from, dispatch } = this.props;
    const changeArr = []
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return (
      <div className={listFileStyle.upload}>
        {from === 'detail' ? <p>表单信息<span>{imageList.length}</span></p> : <p>其他表单<span>{imageList.length}/10</span></p> }
        {from === 'detail' ? null : <div className={listFileStyle.touchStyle}>
          <div className={listFileStyle.flexBox}>
            <ListFiles
              ref='files'
              className={listFileStyle.filesList}
              onChange={this.onFilesChange}
              onError={this.onFilesError}
              multiple={true}
              maxFileSize={100000000}
              minFileSize={0}
              clickable
            >
            </ListFiles>
          </div>
          {imageList && imageList.length > 0 ?
            <p className={listFileStyle.fileshint}>表单资料(只支持 "pdf, jpg, png, jpeg" 的文件扩展名.)</p>
            : null}
        </div>}
        {imageList && imageList.length > 0 ?
          <div>
            {imageList.map((file, index) =>
              <div className={listFileStyle.videoContainer} key={index}>
                <div className={listFileStyle.videoImage1} onClick={this.showFiles.bind(this, file)}>
                  {((file.fileSvrPath.split('.')).pop()).indexOf('pdf') !== -1 ?
                    <p className={listFileStyle.fileContent}>PDF</p>
                  :
                    ((file.fileSvrPath.split('.')).pop()).indexOf('docx') !== -1 ?
                      <p className={listFileStyle.fileContent}>DOCX</p>
                      :
                      ((file.fileSvrPath.split('.')).pop()).indexOf('doc') !== -1 ?
                        <p className={listFileStyle.fileContent}>DOC</p>
                        : (((file.fileSvrPath.split('.')).pop()).indexOf('jpg') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('png') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('jpeg') !== -1)|| ((file.fileSvrPath.split('.')).pop()).indexOf('PNG') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('JPG') !== -1 || ((file.fileSvrPath.split('.')).pop()).indexOf('JPEG') !== -1 ?
                        <img className={listFileStyle.imageContent} src={Tool.getSecretFilePath(file.fileSvrPath)} />
                        : null
                  }
               </div>
                {from === 'detail' ? null : <div className={listFileStyle.removeStyle} onClick={this.filesRemoveOne.bind(this, file, index)} />}
                  <div className={listFileStyle.firstLine}>
                    <span>文件名称</span>
                    <textarea
                      // style={{ height: getStrLeng(file.srcFileName) > 33 ? (getStrLeng(file.srcFileName) / 33) * 56 + 33 + 'px' : '61px', marginBottom: '33px'}}
                      rows={isiOS ? Math.ceil((getStrLeng(file.srcFileName) * 28) / (document.body.clientWidth * 0.78) + 1) : Math.ceil((getStrLeng(file.srcFileName) * 7) / (document.body.clientWidth * 0.78) + 1)}
                      ref="area"
                      readOnly={from === 'detail'}
                      disabled={from === 'detail'}
                      onKeyUp={this.textAreaAdjust.bind(this)}
                      onKeyDown={(e) => {
                        const et = e || window.event;
                        const keycode = et.charCode || et.keyCode;
                        if (keycode == 13) {
                          if (window.event) {
                            window.event.returnValue = false;
                            e.preventDefault()
                          } else {
                            e.preventDefault(); //for firefox
                          }
                        }
                      }}
                      type="text"
                      name="fileName"
                      // defaultValue={file.srcFileName}
                      value={index === this.state.clickIndex ? this.state.changeText : file.srcFileName}
                      onInput={(e)=>{
                        this.setState({
                          changeText: e.target.value,
                          clickIndex: index,
                        })
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          Toast.fail('文件名字不能为空', 3)
                          return
                        }
                        for (let i = 0; i < imageList.length; i++) {
                          let temp
                          let suffix=''
                          if (file.srcFileName === imageList[i].srcFileName) {
                            if(e.target.value.substring(e.target.value.length - 3) !== file.fileSvrPath.substring(file.fileSvrPath.length - 3)){
                              suffix = '.' + file.fileSvrPath.substring(file.fileSvrPath.length - 3)
                            }
                            temp = { fileSvrPath: imageList[i].fileSvrPath, srcFileName: e.target.value + suffix, creator: imageList[i].creator ? imageList[i].creator : '', createTime: imageList[i].createTime ? imageList[i].createTime : '' }
                          } else {
                            temp = { fileSvrPath: imageList[i].fileSvrPath, srcFileName: imageList[i].srcFileName, creator: imageList[i].creator ? imageList[i].creator : '', createTime: imageList[i].createTime ? imageList[i].createTime : '' }
                          }
                          changeArr.push(temp)
                        }
                        console.log('元素失去焦点')
                        dispatch({
                          type: 'formStorage/fetchFormValue',
                          payload: {
                            imageUpload: {imageList: changeArr},
                          },
                        });
                      }}/></div>
                <p>文件类型<span>{(file.fileSvrPath.split('.')).pop()}</span></p>
                {(from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' || from === 'applyForRoleChangeItem') && file.creator ? <p>&nbsp;&nbsp;&nbsp;上传人<span>{file.creator}</span></p> : null}
                {(from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' || from === 'applyForRoleChangeItem') && file.createTime ? <p>上传时间<span>{file.createTime}</span></p> : null}
                {from === 'privateApplyItem' || from === 'publicApplyItem' || from === 'roleChange' || from === 'itemDetailChange' ? null : (from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' || from === 'applyForRoleChangeItem') ? null : <p>&nbsp;&nbsp;&nbsp;上传人<span>{file.creator}</span></p>}
                {from === 'privateApplyItem' || from === 'publicApplyItem' || from === 'roleChange' || from === 'itemDetailChange' ? null : (from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' || from === 'applyForRoleChangeItem') ? null : <p>上传时间<span>{file.createTime}</span></p>}
              </div>
            )}
          </div>
          : null}
        <ActivityIndicator
          size='large'
          color='red'
          toast
          text={this.state.content}
          animating={this.state.animating}
        />
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

