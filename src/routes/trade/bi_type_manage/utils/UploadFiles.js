import React from 'react';
import { connect } from 'dva'
import applyStyle from './apply.less';
import Files from './index';
import moment from 'moment';
import * as commonUtil from '../../../../utils/commonUtil';
import { Toast } from 'antd-mobile/lib/index';
import { Tool } from '../../../../utils/tools';
import MyVideo from './MyVideo'
import FileUploadPlayer from './FileUploadPlayer'
import { ActivityIndicator } from 'antd-mobile';
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
export default class UploadFiles extends React.Component {
  constructor() {
    super()
    this.state = { files: [], animating: false, content: '视频正在上传,请耐心等待...', changeText: '', clickIndex: '' }
  }

  onFilesChange = (files) => {
    if ((files[0].type).indexOf('image/') !== -1) {
      Toast.fail('请上传视频文件', 3);
      return
    }
    this.setState({ files })
    if (this._remove) return
    const { dispatch, dataSource, from } = this.props;
    const temArr = this.props.fileList;
    const tempFiles = []
    for (let index = 0; index < files.length; index ++) {
      const ifUpload = temArr.find((it) => { return it.srcFileName === files[index].name })
      if (!ifUpload) {
        tempFiles.push(files[index])
      }
      if (ifUpload) {
        Toast.fail('文件已经存在', 3);
      }
    }
    if (!tempFiles.length) return
    if (temArr.length > 4) { Toast.fail('上传视频数量不能超过5个!', 3); return }
    let arr = []
    let params;

    //私募双录录入
    if (from === 'privateApplyItem') {
      // params = { orderNo: dataSource.orderNo, reqSeq: dataSource.reqSeq, type: 'e' };
      params = { type: 'e' };
    }

    //公募双录录入
    if (from === 'publicApplyItem') {
      params = { type: 'e' };
    }

    //驳回修改公私募
    if (from === 'publicRejectItem' || from === 'privateRejectItem') {
      params = { type: 'e' };
    }

    //转换申请
    if (from === 'roleChange') {
      params = { type: 'e' };
    }

    //驳回修改列表修改过程中的上传
    if (from === 'rejectModify' || from === 'itemDetailChange') {
      params = { reqSeq: dataSource.reqNo, type: 'e' };
    }
    this.setState({
      animating: true
    })
    // --------- 公募双录录入 / 公私募驳回修改 / 转换申请 上传------
    if (from === 'publicApplyItem' || from === 'publicRejectItem' || from === 'privateRejectItem' || from === 'roleChange' || from === 'privateApplyItem') {
      dispatch({
        type: 'trade/uploadTradeCommonFiles',
        payload: {
          // params,
          images: tempFiles,
          backMethord: (data) => {
            if (data && data.code === '00') {
              let newarr = [];
              if(from === 'publicRejectItem' || from === 'privateRejectItem' || from === 'privateApplyItem') {
                for (let i = 0; i < data.model.length; i ++) {
                  let temp = { fileSvrPath: data.model[i].fileId, srcFileName: data.model[i].fileName, newFile: '1' }
                  newarr.push(temp)
                }
              } else {
                for (let i = 0; i < data.model.length; i ++) {
                  let temp = { fileSvrPath: data.model[i].fileId, srcFileName: data.model[i].fileName }
                  newarr.push(temp)
                }
              }

              arr = temArr.concat(newarr)
              // if (from === 'publicApplyItem') {
              //   this.props.onChange(files)
              // }
              this.props.dispatch({
                type: 'formStorage/fetchFormValue',
                payload: {
                  private: { attachList: arr },
                },
              });
              this.setState({
                animating: false,
              })
            } else{
              this.setState({
                animating: false,
              })
              Toast.fail(data && data.message ? data.message : '视频上传失败!', 2);
            }
          },
        },
      });
    } else if (from === 'rejectModify' || from === 'itemDetailChange') { //私募双录录入 / 转换驳回列表修改时 上传
      dispatch({
        type: 'trade/uploadTradeFiles',
        payload: {
          params,
          images: tempFiles,
          backMethord: (data) => {
            if (data && data.code === '00') {
              arr = temArr.concat(data.model)
              if (from === 'publicApplyItem' || from === 'publicRejectItem') {
                this.props.onChange(files)
              }
              this.props.dispatch({
                type: 'formStorage/fetchFormValue',
                payload: {
                  private: { attachList: arr },
                },
              });
              this.setState({
                animating: false,
              })
            } else{
              this.setState({
                animating: false,
              })
              Toast.fail(data && data.message ? data.message : '视频上传失败!', 2);
            }
          },
        },
      });
    }
  }

  onFilesError = (error, file) => {
    Toast.fail(error.message)
  }

  filesRemoveOne(file, index) {
    this._remove = true;
    const { dispatch, from, formStorage } = this.props;
    const tempList = this.props.fileList;
    // this.refs.files.removeFile(file)
    //公募双录录入 / 公私募驳回修改本地 / 转换申请 --删除
    if (!file.reqSeq && (from === 'publicApplyItem' || from === 'publicRejectItem' || from === 'roleChange' || from === 'privateApplyItem')) {
      const removeArr = formStorage.formValue.private.attachList
      const newArr = removeArr.filter((item) => {
        return item.fileSvrPath !== file.fileSvrPath
      })
      //________________服务器删除fileupload后的本地文件⤵️______
      dispatch({
        type: 'trade/deleteLocalFile',
        payload: {
          path: file.fileSvrPath,
          backMethord: (data) => {
            if (data && data.code === '00') {
              this._remove = false;
              console.log('本地删除成功！！！！！！！')
            } else Toast.fail(data && data.message ? data.message : '删除失败!', 2);
          },
        },
      });
      //________________服务器删除fileupload后的本地文件⤴️______
      dispatch({
        type: 'formStorage/fetchFormValue',
        payload: {
          private: { attachList: newArr },
        },
      });
    } else if (from === 'publicRejectItem') { //驳回修改公募服务器删除
      dispatch({
        type: 'trade/delPublicFiles',
        payload: {
          delList: [{ id: file.id }],
          backMethord: (data) => {
            if (data && data.code === '00') {
              this._remove = false;
              tempList.splice(index, 1)
              // if (from === 'publicApplyItem' || from === 'publicRejectItem') {
              //   this.props.onChange(this.state.files)
              // }
              dispatch({
                type: 'formStorage/fetchFormValue',
                payload: {
                  private: { attachList: tempList },
                },
              });
            } else Toast.fail(data && data.message ? data.message : '视频删除失败!', 2);
          },
        },
      });
    } else if (from === 'privateRejectItem' || from === 'rejectModify' || from === 'itemDetailChange') { //私募双录录入/驳回修改私募服务器删除/转换驳回列表修改时候
      dispatch({
        type: 'trade/delTradeFiles',
        payload: {
          delList: [{ id: file.id }],
          backMethord: (data) => {
            if (data && data.code === '00') {
              this._remove = false;
              tempList.splice(index, 1)
              // if (from === 'publicApplyItem' || from === 'publicRejectItem') {
              //   this.props.onChange(this.state.files)
              // }
              dispatch({
                type: 'formStorage/fetchFormValue',
                payload: {
                  private: { attachList: tempList },
                },
              });
            } else Toast.fail(data && data.message ? data.message : '视频删除失败!', 2);
          },
        },
      });
    }
  }

  textAreaAdjust(e) {
    this.refs.textArea.style.height = '1px';
    this.refs.textArea.style.height = (33 + this.refs.textArea.scrollHeight) + 'px';
  }

  render() {
    const { fileList, formStorage, from, dispatch } = this.props;
    const u = navigator.userAgent;
    const changeArr = []
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return (
      <div className={applyStyle.upload}>
        {from === 'detail' ? <p>资料信息<span>{fileList.length}</span></p> : <p>上传视频<span>{fileList.length}/5</span></p> }
        {from === 'detail' ? null : <div className={applyStyle.touchStyle}>
          <div className={applyStyle.flexBox}>
            <Files
              ref='files'
              className={applyStyle.filesList+' needsclick'}
              onChange={this.onFilesChange}
              onError={this.onFilesError}
              multiple={false}
              maxFiles={5}
              maxFileSize={100000000}
              minFileSize={0}
              accepts={['video/mp4', 'video/mov', 'video/MOV']}
              clickable
            >
            </Files>
          </div>
          {fileList && fileList.length > 0 ?
            <p className={applyStyle.fileshint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>
            : null}
        </div>}
        {fileList && fileList.length > 0 ?
          <div>
            {fileList.map((file, index) =>
              <div className={applyStyle.videoContainer} key={index}>
                <FileUploadPlayer fileSvrPath={file.fileSvrPath} name={file.srcFileName} playVideo={this.props.playVideo} />
                {from === 'detail' ? null : <div className={applyStyle.removeStyle} onClick={this.filesRemoveOne.bind(this, file, index)} />}
                  <div className={applyStyle.firstLine}>
                    <span>文件名称</span>
                    <textarea
                      // style={{ height: getStrLeng(file.srcFileName) > 33 ? (getStrLeng(file.srcFileName) / 33) * 56 + 33 + 'px' : '61px', marginBottom: '33px'}}
                      // style={{ height: Math.ceil((getStrLeng(file.srcFileName) * 28) / (document.body.clientWidth * 0.78) + 1) * 28 + 33 + 'px', marginBottom: '33px'}}
                      rows={isiOS ? Math.ceil((getStrLeng(file.srcFileName) * 28) / (document.body.clientWidth * 0.78) + 1) : Math.ceil((getStrLeng(file.srcFileName) * 7) / (document.body.clientWidth * 0.78) + 1)}
                      type="text"
                      ref="textArea"
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

                        this.setState({
                          changeText: '',
                          clickIndex: '',
                        })
                        // let handleValue = e.target.value.replaceAll(' ','').replaceAll("\r","<br/>");
                        for (let i = 0; i < fileList.length; i++) {
                          let temp
                          let suffix=''
                          if (file.srcFileName === fileList[i].srcFileName) {
                            if(e.target.value.substring(e.target.value.length - 3) !== file.fileSvrPath.substring(file.fileSvrPath.length - 3)){
                              suffix = '.' + file.fileSvrPath.substring(file.fileSvrPath.length - 3)
                            }
                            temp = {fileSvrPath: fileList[i].fileSvrPath, srcFileName: e.target.value + suffix, creator: fileList[i].creator ? fileList[i].creator : '', createTime: fileList[i].createTime ? fileList[i].createTime : '', newFile: fileList[i].newFile ? fileList[i].newFile : null }
                          } else {
                            temp = {fileSvrPath: fileList[i].fileSvrPath, srcFileName: fileList[i].srcFileName, creator: fileList[i].creator ? fileList[i].creator : '',createTime: fileList[i].createTime ? fileList[i].createTime : '', newFile: fileList[i].newFile ? fileList[i].newFile : null }
                          }
                          changeArr.push(temp)
                        }
                        console.log('元素失去焦点')
                        dispatch({
                          type: 'formStorage/fetchFormValue',
                          payload: {
                            private: {attachList: changeArr},
                          },
                        });
                      }} />
                  </div>
                <p>文件类型<span>{file.fileSvrPath.substring(file.fileSvrPath.length - 3)}</span></p>
                {(from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' ) && file.creator ? <p>&nbsp;&nbsp;&nbsp;上传人<span>{file.creator}</span></p> : null}
                {(from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem' ) && file.createTime ? <p>上传时间<span>{file.createTime}</span></p> : null}
                {from === 'privateApplyItem' || from === 'publicApplyItem' || from === 'roleChange' || from === 'itemDetailChange' ? null : (from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem') ? null : <p>&nbsp;&nbsp;&nbsp;上传人<span>{file.creator}</span></p>}
                {from === 'privateApplyItem' || from === 'publicApplyItem' || from === 'roleChange' || from === 'itemDetailChange' ? null : (from === 'rejectModify' || from === 'privateRejectItem' || from === 'publicRejectItem') ? null :<p>上传时间<span>{file.createTime}</span></p>}
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
      </div>
    )
  }
}

