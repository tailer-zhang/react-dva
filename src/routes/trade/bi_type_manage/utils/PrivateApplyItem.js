import React from 'react';
import { connect } from 'dva';
import applyStyle from './apply.less';
import { List, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from '../../../../utils/form';
import UploadFiles from './UploadFiles'
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';
import { routerRedux } from 'dva/router';

function connectStateToprops({ uploadModel, formStorage }) {
  return { uploadModel, formStorage }
}

@connect(connectStateToprops)
@createForm()
export default class PrivateApplyItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ifshow: true,
      files: [],
    }
  }

  getOptions() {
    const { dataSource, dispatch, form, formValue } = this.props;
    const videoPerson = formValue.videoPerson ? formValue.videoPerson : '';
    const acceptor = dataSource.saleType === '2' ? {
      videoPerson: {
        required: false,
        valueType: 'selfSelect',
        title: '受理人员',
        desc: '受理人员',
        extra: formValue.videoPerson,
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
      ...acceptor,
      videoTime: {
        required: true,
        valueType: 'date',
        desc: '录像时间',
        mode: 'datetime',
        errMsg: '请选择录像时间!',
        extra: '选择日期',
        format: 'YYYY-MM-DD HH:mm',
      },
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

  upload = () => {
    const { dispatch, UploadModel, form, dataSource, fileList, formStorage } = this.props;
    let uploadArr = [];
    let temp;
    const { formValue } = formStorage;
    if (formValue.private && formValue.private.attachList) {
      for (let i = 0; i < formValue.private.attachList.length; i ++) {
        if (formValue.private.attachList[i].newFile) {
          temp = { path: formValue.private.attachList[i].fileSvrPath, fileName: formValue.private.attachList[i].srcFileName, newFile: '1' }
        } else {
          temp = { path: formValue.private.attachList[i].fileSvrPath, fileName: formValue.private.attachList[i].srcFileName }
        }
        uploadArr.push(temp)
      }
    }
    form.validateFields((error, value) => {
      if (!error) {
        const params = { videoPerson: formValue.key, videoOperType: 'upload', videoTime: value.videoTime.format('YYYY-MM-DD HH:mm'), reqSeq: dataSource.reqSeq, fileInfo: uploadArr };
        console.log("🌹", value)
        dispatch({
          type: 'uploadModel/upload',
          payload: {
            params,
            backMethord: (data) => {
              if (data && data.code === '00') {
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回双录列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/biTypeInputListCnt'));
                    },
                  } }));
              } else Toast.fail(data && data.message ? data.message : '提交错误!', 3);
            },
          },
        });
      } else {
        if (!formValue.videoTime) Toast.fail('请选择录像时间!', 3);
        if (dataSource.saleType === '2') {
          if (!formValue.videoPerson) Toast.fail('请选择受理人员!', 3);
        }
      }
    })
  }

  ifshow = (ifshow, files) => {
    console.log(ifshow)
    this.setState({ ifshow })
    this.setState({ files })
  }

  render() {
    const { form, dataSource, UploadModel, fileList, dispatch, formStorage } = this.props;
    const { formValue } = formStorage
    return (
      <div className={applyStyle.container}>
        <div className={applyStyle.box}>
          <Title title={'双录申请'} />
          <div className={applyStyle.head}>
            <p>产品名称<span>{dataSource.prodName}</span></p>
            <p>产品类别<span>{dataSource.prodExpiName}</span></p>
            <p>客户名称<span>{dataSource.custName}</span></p>
            <p>客户类型<span>{dataSource.custTypeName}</span></p>
            <p>证件类型<span>{dataSource.certTypeName}</span></p>
            <p>证件号码<span>{dataSource.certNo}</span></p>
            <p>申请单编号<span>{dataSource.reqSeq}</span></p>
          </div>
          <List style={{ marginTop: '22px' }}>
            <Form
              options={this.getOptions()} form={form} formValue={formValue} dispatch={dispatch}
            />
          </List>
          <UploadFiles
            playVideo={this.plays.bind(this)}
            ifshow={this.ifshow}
            dataSource={dataSource}
            fileList={fileList}
            dispatch={dispatch}
            from="privateApplyItem" />
          {fileList && fileList.length > 0 ? null :
            <p className={applyStyle.hint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>}
          <WhiteSpace />
        </div>
        <Button className={applyStyle.btn} activeStyle={false} onClick={this.upload}>提交</Button>
      </div>
    )
  }
}
