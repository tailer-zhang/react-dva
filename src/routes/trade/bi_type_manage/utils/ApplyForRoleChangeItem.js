import React from 'react';
import { connect } from 'dva';
import applyStyle from './apply.less';
import { List, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from '../../../../utils/form';
import UploadImage from './UploadImage';
import UploadFiles from './UploadFiles'
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';
import { Toast } from 'antd-mobile/lib/index';
import * as commonUtil from '../../../../utils/commonUtil';
import { routerRedux } from 'dva/router';
import UploadListFiles from './UploadListFiles'

function connectStateToprops({ formStorage }) {
  return { formStorage }
}
@connect(connectStateToprops)
@createForm()
export default class ApplyForRoleChangeItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tradeCode: '1004',
      saleOrg: '002',
    }
  }
  componentWillMount() {
    const { formStorage } = this.props
    const { formValue } = formStorage
    if (formValue.saleOrg) {
      this.setState({
        saleOrg: formValue.saleOrg,
      })
    } else {
      this.setState({
        saleOrg: '002',
      })
    }

    if (formValue.tradCode) {
      this.setState({
        tradeCode: formValue.tradCode,
      })
    } else {
      this.setState({
        tradeCode: '1004',
      })
    }
  }

  onChange() {

  }

  getOptions() {
    const { dispatch, form, formStorage } = this.props
    const { formValue } = formStorage
 /*   const videoPerson = formValue.videoPerson ? formValue.videoPerson : '';*/
    /*const acceptor = this.state.saleOrg === '001' ? {
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
                  },
                });
                dispatch(routerRedux.goBack());
              },
            },
          }));
        },
      },
    } : null*/
    return ({
      saleOrg: {
        type: Dic.fetchDicList('saleOrg'),
        required: true,
        valueType: 'select',
        desc: '销售机构',
        title: '销售机构',
        backMethod: (value) => {
          this.setState({
            saleOrg: value,
          })
        },
      },
      tradCode: {
        type: Dic.fetchDicList('convertType'),
        required: true,
        valueType: 'select',
        desc: '转换类型',
        title: '转换类型',
        backMethod: (value) => {
          this.setState({
            tradeCode: value,
          })
        },
      },
      begDate: {
        required: true,
        valueType: 'date',
        desc: '申请日期',
        mode: 'date',
        errMsg: '请选择申请日期!',
        extra: '选择日期',
      },
      videoTime: {
        valueType: 'date',
        desc: '录像时间',
        mode: 'datetime',
        errMsg: '请选择录像时间!',
        extra: '选择日期',
        format: 'YYYY-MM-DD HH:mm',
      },
    /*  ...acceptor,*/
    })
  }

  plays(state) {
    console.log('state-----', state)
    const { dispatch, form } = this.props;
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: form.getFieldsValue(),
    });
  }

  imageChange(files, operType, operIndex) {
    console.log('----图片变化--', files, operType, operIndex);
    const { dispatch, formStorage } = this.props;
    const tempFiles = []
    let arr = []
    const temArr = this.props.imageList;
    if (operType === 'add') {
      const addfile = files[files.length - 1]
      if (addfile.file.size > 5000000) {
        Toast.fail('文件大小超出限制', 3);
        return;
      }
      dispatch({
        type: 'trade/uploadTradeCommonFiles',
        payload: {
          // params,
          images: files,
          backMethord: (data) => {
            if (data && data.code === '00') {
              let newarr = [];
              for (let i = 0; i < data.model.length; i ++) {
                let temp = { fileSvrPath: data.model[i].fileId, srcFileName: data.model[i].fileName }
                newarr.push(temp)
              }
              arr = temArr.concat(newarr)
              this.props.dispatch({
                type: 'formStorage/fetchFormValue',
                payload: {
                  imageUpload: { imageList: arr },
                },
              });
            } else Toast.fail(data && data.message ? data.message : '图片上传失败!', 2);
          },
        },
      });
    } else if (operType === 'remove') {
      const removeArr = formStorage.formValue.imageUpload.imageList
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
            } else Toast.fail(data && data.message ? data.message : '删除失败!', 2);
          },
        },
      });
      dispatch({
        type: 'formStorage/fetchFormValue',
        payload: {
          imageUpload: { imageList: newArr },
        },
      });
    }
  }

  touch= () => {
    const { dispatch, form, formStorage, data, imageList, fileList } = this.props
    const { formValue } = formStorage;
    const myData = formValue.roleChangeData && formValue.roleChangeData.myData ? formValue.roleChangeData.myData : data;
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
    const tradeCode = formValue.tradeCode ? formValue.tradeCode : this.state.tradeCode;
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: form.getFieldsValue(),
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        roleChangeData: { myData },
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
        tradeCode,
      },
    })
  }

  upload = () => {
    const { dispatch, form, formStorage, data, fileList, imageList } = this.props
    const { formValue } = formStorage;
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;
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
        let fileInfo = {}
       /* let videoPerson = {}*/
        if (this.state.tradeCode === '1004') {
          fileInfo = {
            fileInfo: uploadArr,
          }
        } else if (this.state.tradeCode === '1005') {
          fileInfo = {}
        }

       /* if (this.state.saleOrg === '002') {
          videoPerson = {}
        } else if (this.state.saleOrg === '001') {
          videoPerson = { videoPerson: formValue.key }
        }*/

        const params = {
          ...value,
          ...fileInfo,
        /*  ...videoPerson,*/
          otherFileInfo: imagesArr,
          custId: data.id,
          begDate: value.begDate.format('YYYY-MM-DD'),
          videoTime: value.videoTime ? value.videoTime.format('YYYY-MM-DD HH:mm') : '',
          custCode: data,
        };
        console.log('parmas', params)
        dispatch({
          type: 'ApplyForChangeModel/applyForchangeUpload',
          payload: {
            params,
            backMethod: (data) => {
              if (data && data.code === '00') {
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回可以转换客户列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/applyforChangeCnt'));
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
        // if (this.state.saleOrg === '001' && !formValue.videoPerson) Toast.fail('请选择受理人员!', 3);
      }
    })
  }

  render() {
    const { form, data, fileList, dispatch, imageList, formStorage } = this.props;
    const { formValue } = formStorage
    const myData = formValue.roleChangeData && formValue.roleChangeData.myData ? formValue.roleChangeData.myData : data;
    const myImageList = formValue.imageUpload && formValue.imageUpload.myImageList ? formValue.imageUpload.myImageList : imageList;
    const myFileList = formValue.private && formValue.private.myFileList ? formValue.private.myFileList : fileList;

    return (
      <div className={applyStyle.container}>
        <div className={applyStyle.box}>
          <Title title={'转换申请'} />
          <div className={applyStyle.head}>
            <p>客户名称<span>{myData.custName}</span></p>
            <p>证件类型<span>{myData.certTypeText}</span></p>
            <p>证件号码<span>{myData.certNo}</span></p>
          </div>
          <List style={{ marginTop: '22px' }}>
            <Form
              options={this.getOptions()} form={form} formValue={formValue} dispatch={dispatch}
            />
          </List>
          {this.state.tradeCode === '1004' ? <UploadFiles playVideo={this.plays.bind(this)} onChange={this.onChange} fileList={myFileList} dispatch={dispatch} from="roleChange" /> : null }
          {myFileList && myFileList.length > 0 ? null :
            this.state.tradeCode === '1005' ? null : <p className={applyStyle.hint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>}
          <WhiteSpace />
          <div style={{backgroundColor: '#efeff4' }}>
            <UploadListFiles from='applyForRoleChangeItem' imageList={myImageList} touch={this.touch} />
          </div>
          {imageList && imageList.length > 0 ? null :
            <p className={applyStyle.hint}>表单资料(只支持 "pdf, jpg, png, jpeg" 的文件扩展名.)</p>
          }
          <div className={applyStyle.bottom}>
            <p>
              专业投资者认定:普转专申请书、合格投资人确认函、金融资产及投资经历证明文件，专业投资者告知及确认书(代销)
            </p>
            <p>
              普转专转换申请:需提供专业投资者认定的资料、另附加普转专投资知识测试
            </p>
          </div>
        </div>
        <Button className={applyStyle.btn} activeStyle={false} onClick={this.upload}>提交</Button>
      </div>
    )
  }
}
