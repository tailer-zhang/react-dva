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

function connectStateToprops({ uploadModel, formStorage }) {
  return { uploadModel, formStorage }
}


@connect(connectStateToprops)
@createForm()
export default class PublicApplyItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { files: [] }
  }

  onChange= (files) => {
    this._change = true
    console.log('files changed', files)
    this.setState({ files })
  }

  getOptions1() {
    const { dispatch, form, formValue } = this.props;
    let tradeCode, custLvl, prodId, id, custId ;
    const videoPerson = formValue.videoPerson;
    return ({
      customer: {
        required: false,
        valueType: 'selfSelect',
        title: '客户名称',
        desc: '客户名称',
        extra: formValue.custName ? formValue.custName : '',
        onClick: () => {
          dispatch({
            type: 'formStorage/fetchFormValue',
            payload: form.getFieldsValue(),
          });
          dispatch(routerRedux.push({
            pathname: '/typeToSelectCustomer', state: {
              mode: 'selectCustomer',
              withOutGoBack: true,
              selectCustomer: {
                custID: custId,
              },
              filter: {
                reserveRank: custLvl,
              },
              selectResult: (rowData) => {
                dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    custName: rowData.custName,
                    custID: rowData.custID,
                    customer: rowData,
                    select: true,
                  },
                });
                Toast.loading('查询中', 30);
                dispatch({
                  type: 'xtProduct/checkCustomerIsCommon',
                  payload: {
                    params: {
                      custCode: rowData.custID,
                      prodId: prodId,
                    },
                    backMethord: (data) => {
                      Toast.hide();
                      if (data && data.code === '00' && data.model) {
                        dispatch({
                          type: 'formStorage/fetchFormValue',
                          payload: {
                            inveType: data.model,
                          },
                        });
                      } else {
                        dispatch({
                          type: 'formStorage/fetchFormValue',
                          payload: {
                            inveType: '',
                          },
                        });
                        dispatch(routerRedux.goBack());
                      }
                    },
                  },
                });
              },
            },
          }));
        },
      },
      cardNo: {
        required: true,
        type: 'number',
        trigger: 'onBlur',
        errMsg: '银行卡号非法!',
        desc: '银行卡号',
        extra: formValue.cardNo ? formValue.cardNo : '',
        placeholder: '6-28位银行卡号',
      },
      tradCode: {
        type: Dic.fetchDicList('tradeCode'),
        required: true,
        valueType: 'select',
        desc: '交易类型',
        title: '交易类型',
      },
      remitDate: {
        required: true,
        valueType: 'date',
        desc: '申请日期',
        mode: 'datetime',
        errMsg: '请选择申请日期!',
        extra: '请选择申请日期',
        format: 'YYYY-MM-DD',
      },
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
      videoTime: {
        required: true,
        valueType: 'date',
        desc: '录像时间',
        mode: 'datetime',
        errMsg: '请选择录像时间!',
        extra: '请选择录像时间',
        format: 'YYYY-MM-DD HH:mm',
      },
      reqAmt: {
        required: true,
        type: 'number',
        trigger: 'onBlur',
        errMsg: '申请金额非法!',
        desc: '申请金额',
        extra: formValue.reqAmt,
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
    const { formValue } = formStorage;
    let uploadArr = [];
    if (formValue.private && formValue.private.attachList) {
      for (let i = 0; i < formValue.private.attachList.length; i ++) {
        let temp = { path: formValue.private.attachList[i].fileSvrPath, fileName: formValue.private.attachList[i].srcFileName }
        uploadArr.push(temp)
      }
    }
    form.validateFields((error, value) => {
      if(value.cardNo.length < 6 || value.cardNo.length > 28){
        Toast.fail('银行卡号长度在6 ~ 28之间!', 3)
        return
      }
      if (!error) {
        const params = {
          ...value,
          customer: formValue.customer,
          videoPerson: formValue.key,
          remitDate: value.remitDate.format('YYYY-MM-DD'),
          videoTime: value.videoTime.format('YYYY-MM-DD HH:mm'),
          fileInfo: uploadArr,
          prodCode: dataSource.prodCode,
        };
        console.log("🌹", params)
        dispatch({
          type: 'uploadModel/uploadPublic',
          payload: {
            params,
            // files: this._change ? this.state.files : this.props.files,
            // files: uploadArr,
            backMethord: (data) => {
              if (data && data.code === '00') {
                this._change = false
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回公募双录列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/pubbiTypeInputListCnt'));
                    },
                  } }));
              } else Toast.fail(data && data.message ? data.message : '提交错误!', 3);
            },
          },
        });
      } else {
        if (!formValue.custName) Toast.fail('请选客户名称!', 3);
        if (!formValue.videoPerson) Toast.fail('请选择受理人员!', 3);
        if (!value.videoTime) Toast.fail('请选择录像时间!', 3);
        if (!value.remitDate) Toast.fail('请选择申请日期!', 3);
        if (!value.tradCode) Toast.fail('请选择交易类型!', 3);
      }
    })
  }

  render() {
    const { form, dataSource, fileList, dispatch, formStorage } = this.props;
    const { formValue } = formStorage
    return (
      <div className={applyStyle.container}>
        <div className={applyStyle.box}>
          <Title title={'公募双录申请'} />
          <div className={applyStyle.head}>
            <p>产品名称<span>{dataSource.prodName}</span></p>
            <p>产品类型<span>{dataSource.fundTypeName}</span></p>
            <p>产品代码<span>{dataSource.prodCode}</span></p>
            <p>风险等级<span>{dataSource.prodRiskLevelName}</span></p>
          </div>
          <List style={{ marginTop: '22px' }}>
            <Form
              options={this.getOptions1()} form={form} formValue={formValue} dispatch={dispatch}
            />
          </List>
          <UploadFiles
            playVideo={this.plays.bind(this)}
            onChange={this.onChange}
            dataSource={dataSource}
            fileList={fileList}
            dispatch={dispatch}
            from="publicApplyItem" />
          {fileList && fileList.length > 0 ? null :
            <p className={applyStyle.hint}>普转专视频资料（暂时仅支持mp4、mov格式，100M以内.）</p>}
        </div>
        <Button className={applyStyle.btn} activeStyle={false} onClick={this.upload}>提交</Button>
      </div>
    )
  }
}
