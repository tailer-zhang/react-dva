import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Button } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import { createForm } from 'rc-form';
import UploadFiles from '../../utils/UploadFiles'
import Form from '../../../../../utils/form';
import ItemDetailStyle from './itemDetail.less';
import UploadImage from '../UploadImage';
import Dic from '../../../../../utils/dictionary';
import {routerRedux} from "dva/router";
import {Toast} from "antd-mobile/lib/index";
import UploadListFiles from '../UploadListFiles'

function connectProps({ ItemDetailModel, rebutSpace, formStorage, ChangeRejectModel }) {
  return { ItemDetailModel, rebutSpace, formStorage, ChangeRejectModel }
}

@connect(connectProps)
@createForm()
export default class ItemDetailChange extends React.Component {
  constructor() {
    super();
    this.state = {
      ifFixed: false,
      activeKey: '1',
      show: false,
      makeChange: false,
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'ItemDetailModel/clearCache',
      payload: {
        searchDetail: {},
        rejectDetails: {},
        timeLineList: [],
      },
    });
  }

  getOptions2() {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const { details } = this.props.location.state
    const videoPerson = formValue.videoPerson ? formValue.videoPerson : details.videoPersonName ? details.videoPersonName : '--';
    const acceptor = details.saleOrg === '001' ? {
      videoPerson: {
        required: false,
        valueType: 'selfSelect',
        title: '受理人员',
        desc: '受理人员',
        extra: videoPerson,
        onClick: () => {
          dispatch({
            type: 'formStorage/fetchFormValue',
            payload: form.getFieldsValue(),
          });
          dispatch(routerRedux.push({
            pathname: '/pubAcceptorSelectCnt', state: {
              roleId: '216,17,18,19,20,21,173,235',
              mode: 'slelectAcceptor',
              withOutGoBack: true,
              selectAcceptor: {
                videoPerson,
              },
              select: (rowData) => {
                dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    videoPerson: rowData.value,
                    key: rowData.key,
                    // customer: rowData,
                    // select: true,
                  },
                });
                dispatch(routerRedux.goBack());
              },
            },
          }));
        },
      },
    } : null
    return ({
      begDate: {
        required: true,
        valueType: 'date',
        desc: '申请日期',
        mode: 'date',
        errMsg: '请选择申请日期!',
        extra: '选择日期',
      },
      videoTime: {
        required: false,
        valueType: 'date',
        desc: '录像时间',
        mode: 'datetime',
        errMsg: '请选择录像时间!',
        extra: '选择日期',
        format: 'YYYY-MM-DD HH:mm',
      },
      ...acceptor,
    })
  }

  plays(state) {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : [];
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : [];
    const timeLineList = formValue.timeLineList && formValue.timeLineList.timeLineList ? formValue.timeLineList.timeLineList : [];
    const myData = formValue.itemDetailData && formValue.itemDetailData.myData ? formValue.itemDetailData.myData : this.props.ItemDetailModel.searchDetail;
    const rejectData = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails;
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    const myTimeLineList = formValue.timeLineList && formValue.timeLineList.myTimeLineList ? formValue.timeLineList.myTimeLineList : timeLineList;
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: form.getFieldsValue(),
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        itemDetailData: { myData },
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        rejectData: { rejectData },
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        imageUpload: { myImageList },
      },
    })
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        private: { myFileList },
      },
    })
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        timeLineList: { myTimeLineList },
      },
    })
  }

  abolish = () => {
    this.setState({ show: true })
  }

  change = () => {
    const { dispatch, form, formStorage, location } = this.props
    const { formValue } = formStorage;
    const { data } = location.state
    // console.log('_____哈哈哈哈哈哈或或', data)
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : []
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : []
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    const details = formValue.rejectData && formValue.rejectData.rejectData ? formValue.rejectData.rejectData : this.props.ItemDetailModel.rejectDetails
      let uploadArr = [];
      let imagesArr = []
      for (let i = 0; i < myFileList.length; i ++) {
        let temp = { path: myFileList[i].fileSvrPath, fileName: myFileList[i].srcFileName }
        uploadArr.push(temp)
      }

      for (let i = 0; i < myImageList.length; i ++) {
        let temp = { path: myImageList[i].fileSvrPath, fileName: myImageList[i].srcFileName }
        imagesArr.push(temp)
      }

      form.validateFields((error, value) => {
        if (!error) {
          let key = {
            videoPerson: formValue.key ? formValue.key : details.videoPerson ? details.videoPerson : {}
          }
          const params = {
            begDate: value.begDate.format('YYYY-MM-DD'),
            // videoTime: value.videoTime.format('YYYY-MM-DD HH:mm'),
            fileInfo: uploadArr,
            otherFileInfo: imagesArr,
            id: data.id,
            reqNo: data.reqNo,
            tradCode: data.tradCode,
            ...key,
          };
          console.log('params--check', params)
          dispatch({
            type: 'ChangeRejectModel/roleChangeUpload',
            payload: {
              params,
              backMethod: (data) => {
                if (data && data.code === '00') {
                  dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回转换驳回列表',
                      backMethord: () => {
                        dispatch(routerRedux.push('/roleChangeRejectCnt'));
                      },
                    } }));
                } else Toast.fail(data && data.message ? data.message : '提交错误!', 3);
              },
            },
          });
        } else {
          if (!value.saleOrg) Toast.fail('请选销售机构!', 3);
          if (!value.tradCode) Toast.fail('请选择转换类型!', 3);
          if (!value.begDate) Toast.fail('请选择申请日期!', 3);
          // if (!value.videoTime) Toast.fail('请选择录像时间!', 3);
        }
      })
  }

  showAlert = () => {
    return (
      <div className={ItemDetailStyle.showAlert}>
        <div className={ItemDetailStyle.info}>
          <p>提示</p>
          <p>确定作废该记录？</p>
          <div>
            <Button onClick={this.confirm}>确定</Button>
            <Button onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

  confirm = () => {
    this.setState({ show: false })
    const { dispatch, location } = this.props
    const { data } = location.state
    dispatch({
      type: 'ChangeRejectModel/abolish',
      payload: {
        params: { id: data.id },
        backMethod: (data) => {
          if (data && data.code === '00') {
            dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '废除成功，请等待系统确认！', backTitle: '返回转换驳回列表',
                backMethord: () => {
                  dispatch(routerRedux.push('/roleChangeRejectCnt'));
                },
              } }));
          } else Toast.fail(data && data.message ? data.message : '废除失败!', 3);
        },
      },
    });
  }

  cancel = () => {
    this.setState({ show: false })
  }

  imageChange(files, operType, operIndex) {
    console.log('----图片变化--', files, operType, operIndex);
    const { dispatch, formStorage, location } = this.props;
    const { formValue } = formStorage
    const { data } = location.state
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : [];
    const tempFiles = []
    let arr = []
    const temArr = imageList;
    if (operType === 'add') {
      const addfile = files[files.length - 1]
      if (addfile.file.size > 5000000) {
        Toast.fail('文件大小超出限制', 3);
        return;
      }
        const params = { reqSeq: data.reqNo, type: 'f' };
        dispatch({
          type: 'trade/uploadTradeFiles',
          payload: {
            params,
            images: files,
            backMethord: (data) => {
              if (data && data.code === '00') {
                arr = temArr.concat(data.model)
                this.props.dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    imageUpload: { imageList: arr },
                  },
                });
              } else Toast.fail(data && data.message ? data.message : '视频上传失败!', 2);
            },
          },
        });

    } else if (operType === 'remove') {
      const removeArr = formValue.imageUpload.imageList
      if (!removeArr[operIndex].reqSeq) {
        const newArr = removeArr.filter((item) => {
          return item.fileSvrPath !== removeArr[operIndex].fileSvrPath
        })
        console.log('ApplyForRoleChangeItem.js line 99__', newArr, removeArr, files)
        dispatch({
          type: 'trade/deleteLocalFile',
          payload: {
            path: removeArr[operIndex].fileSvrPath,
            backMethord: (data) => {
              if (data && data.code === '00') {
                console.log('本地删除成功！！！！！！！')
              } else Toast.fail(data && data.message ? data.message : '图片删除失败!', 2);
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
        dispatch({
          type: 'trade/delTradeFiles',
          payload: {
            delList: [{ id: removeArr[operIndex].id }],
            backMethord: (data) => {
              if (data && data.code === '00') {
                this._remove = false;
                removeArr.splice(operIndex, 1)
                dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    imageUpload: { imageList: removeArr },
                  },
                });
              } else Toast.fail(data && data.message ? data.message : '图片删除失败!', 2);
            },
          },
        });
      }
    }
  }

  showFixContent() {
    const { details, data } = this.props.location.state
    const custName = details.custName ? details.custName : '--';
    const certType = details.certType ? Dic.fetchDicValue('operCertType', details.certType) : '--';
    const certNo = details.certNo ? details.certNo : '--';
    const saleOrg = details.saleOrgName ? details.saleOrgName : '--';
    const tradCode = details.tradCode ? Dic.fetchDicValue('convertType', details.tradCode) : '--';
    const updator = data.updator ? data.updator : '--';
    const updateTime = details.updateTime ? details.updateTime : '--';
    const remark = details.remark ? details.remark : '--';
    return (
      <div>
        <div className={ItemDetailStyle.head}>
          <p>驳回原因<span>{remark}</span></p>
          <p>&nbsp;&nbsp;&nbsp;驳回人<span>{updator}</span></p>
          <p>驳回时间<span>{updateTime}</span></p>
        </div>
        <div className={ItemDetailStyle.head} style={{ marginTop: '22px', borderBottom: '1PX solid #dedede' }}>
          <p>客户名称<span>{custName}</span></p>
          <p>证件类型<span>{certType}</span></p>
          <p>证件号码<span>{certNo}</span></p>
          <p>销售机构<span>{saleOrg}</span></p>
          <p>转换类型<span>{tradCode}</span></p>
        </div>
      </div>
    )
  }

  render() {
    const { form, location, ItemDetailModel, rebutSpace, formStorage, dispatch } = this.props;
    const { formValue } = formStorage
    const { data } = location.state
    const fileList = formValue.private && formValue.private.attachList ? formValue.private.attachList : [];
    const imageList = formValue.imageUpload && formValue.imageUpload.imageList ? formValue.imageUpload.imageList : [];
    // const timeLineList = formValue.timeLineList && formValue.timeLineList.timeLineList ? formValue.timeLineList.timeLineList : [];
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    // const myTimeLineList = formValue.timeLineList && formValue.timeLineList.myTimeLineList ? formValue.timeLineList.myTimeLineList : timeLineList;
    console.log('ItemDetailModel是什么', fileList, imageList)
    return (
      <div className={ItemDetailStyle.changeBox}>
        <div className={ItemDetailStyle.boxScorll} ref="boxScroll">
          <Title title={'转换驳回修改'} showBack={'yes'} />
          <div id="container">
            <WhiteSpace />
            <div id="scrollPart" ref="scrollPart" style={{ backgroundColor: '#efeff4' }}>
              {this.showFixContent()}
              <Form
                style={{ paddingTop: this.state.ifFixed ? 84 : 0 }}
                options={this.getOptions2()} form={form} formValue={formValue} dispatch={dispatch}
              />
              <div>
                <UploadFiles
                  playVideo={this.plays.bind(this)}
                  fileList={myFileList}
                  dispatch={dispatch}
                  from="itemDetailChange" dataSource={data} />
                {myFileList && myFileList.length > 0 ? null : <p className={ItemDetailStyle.hint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>}
                  <div style={{ height: '100%', backgroundColor: '#efeff4' }}>
                    <UploadListFiles imageList={myImageList} from="itemDetailChange" touch={this.plays.bind(this)} dataSource={data}/>
                  </div>
                {myImageList && myImageList.length > 0 ? null :
                  <p className={ItemDetailStyle.hint}>表单资料(只支持 "pdf, jpg, png, jpeg" 的文件扩展名.)</p>
                }
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 126, backgroundColor: '#efeff4' }}></div>
        {this.state.show ? this.showAlert() : null}
        <div className={ItemDetailStyle.butt}>
         <Button className={ItemDetailStyle.btn} activeStyle={false} onClick={this.abolish}>作废</Button>
         <Button className={ItemDetailStyle.btn1} activeStyle={false} onClick={this.change}>提交</Button>
        </div>
      </div>
    )
  }
}

