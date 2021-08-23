import React from 'react';
import { connect } from 'dva';
import applyStyle from './apply.less';
import { List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from '../../../../utils/form';
import UploadFiles from './UploadFiles'
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';
import { Toast } from 'antd-mobile/lib/index';
import { routerRedux } from 'dva/router';

function connectStateToprops({ formStorage }) {
  return { formStorage }
}

@connect(connectStateToprops)
@createForm()
export default class PublicApplyItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  getOptions2() {
    const { dispatch, form, formValue, dataSource, data } = this.props;
    const videoPerson = formValue.videoPerson;
    const model = data.details ? data.details.model : undefined
    const saleType = model && model.saleType ? model.saleType : ''
    const acceptor = saleType === '2' ? {
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
        extra: '请选择录像时间',
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
    const { dispatch, form, data, formStorage, dataSource } = this.props;
    let uploadArr = [];
    let temp;
    const model = data.details ? data.details.model : undefined
    const saleType = model && model.saleType ? model.saleType : ''
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
        let params
        if (saleType === '2') {
          let videoTime1 = formValue.videoTime&&formValue.videoTime.format ? formValue.videoTime.format('YYYY-MM-DD' +
            ' HH:mm') : formValue.videoTime
          let videoTime2 = value.videoTime ? value.videoTime.format('YYYY-MM-DD HH:mm') : undefined
          params = { ...value, videoPerson: formValue.key, videoOperType: 'modify', videoTime: videoTime2 ? videoTime2 : videoTime1, reqSeq: data.details.model.reqSeq, fileInfo: uploadArr };
        } else {
          let videoTime1 = formValue.videoTime&&formValue.videoTime.format ? formValue.videoTime.format('YYYY-MM-DD' +
            ' HH:mm') : formValue.videoTime
          let videoTime2 = value.videoTime ? value.videoTime.format('YYYY-MM-DD HH:mm') : undefined
          params = { ...value, videoOperType: 'modify', videoTime: videoTime2 ? videoTime2 : videoTime1, reqSeq: data.details.model.reqSeq, fileInfo: uploadArr };
        }
        dispatch({
          type: 'uploadModel/upload',
          payload: {
            params,
            backMethord: (data) => {
              if (data && data.code === '00') {
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回双录列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/rejectListCnt'));
                    },
                  } }));
              } else Toast.fail(data && data.message ? data.message : '提交错误!', 3);
            },
          },
        });
      } else {
        if (!formValue.videoTime || !value.videoTime) Toast.fail('请选择录像时间!', 3);
        if (saleType === '2') {
          if (!formValue.videoPerson) Toast.fail('请选择受理人员!', 3);
        }
      }
    })
  }

  render() {
    const { form, data, fileList, dispatch, formStorage } = this.props;
    const details = data.details
    const { formValue } = formStorage
    return (
      <div className={applyStyle.container}>
        <div className={applyStyle.box}>
          <Title title={'双录驳回修改申请'}/>
          <div className={applyStyle.head}>
            <p>&nbsp;&nbsp;&nbsp;驳回原因<span>{details.remark}</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驳回人<span>{details.creator}</span></p>
            <p>&nbsp;&nbsp;&nbsp;驳回时间<span>{details.createTime}</span></p>
          </div>
          <div className={applyStyle.head} style={{marginTop: '22px', borderBottom: '1PX solid #dedede'}}>
            <p>申请单编号<span>{details.model ? details.model.reqSeq : '--'}</span></p>
            <p>&nbsp;&nbsp;&nbsp;产品名称<span>{details.model ? details.model.prodName : '--'}</span></p>
            <p>&nbsp;&nbsp;&nbsp;客户名称<span>{details.model ? details.model.custName : '--'}</span></p>
            <p>&nbsp;&nbsp;&nbsp;交易类型<span>{Dic.fetchDicValue('tradeCode', details.model ? details.model.tradCode : '')}</span>
            </p>
            <p>&nbsp;&nbsp;&nbsp;申请金额<span>{details.model ? details.model.reqAmt : '--'}</span></p>
            {/*<p>&nbsp;&nbsp;&nbsp;申请份额<span>{details.model ? details.model.reqShr : '--'}</span></p>*/}
          </div>
          <List>
            <Form
              options={this.getOptions2()} form={form} formValue={formValue} dispatch={dispatch}
            />
          </List>
          <UploadFiles playVideo={this.plays.bind(this)} onChage={this.upload} dataSource={details.model} onChange={this.onChange} fileList={fileList} dispatch={dispatch} from="privateRejectItem" />
          {fileList && fileList.length > 0 ? null :
            <p className={applyStyle.hint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>}
        </div>
        <Button className={applyStyle.btn} activeStyle={false} onClick={this.upload}>提交</Button>
      </div>
    )
  }
}
