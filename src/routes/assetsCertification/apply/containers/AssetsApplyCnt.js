import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import Form from '../../../../utils/form';
import applyStyle from '../style/ApplyStyle.less';
import { List, Button, WhiteSpace } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';
import { Toast } from 'antd-mobile/lib/index';
import {getTime} from '../../../../utils/getNowDate'
import moment from "moment";
import 'moment/locale/zh-cn';
const maxDate = moment(getTime(), 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
 
 
const Item = List.Item;
const titleProps = {
  title: '资产证明申请',
};
function connectStateToprops({ formStorage, AssetsApplyModel }) {
  return { formStorage, AssetsApplyModel }
}

@connect(connectStateToprops)
@createForm()
export default class AssetsApplyCnt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ifClick: false,
    }
  }

  componentWillMount() {
    const { formValue } = this.props.formStorage
    this.props.dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        format: formValue.format ? formValue.format : '0',
      },
    });
  }
 
   
  getOptions() {
    const { dispatch, form, location } = this.props;
    const { dataSource } = location.state
    const { formValue } = this.props.formStorage
    const myarr = formValue.checkArr ? formValue.checkArr : []
    const showArr = []
    for (let i = 0; i < myarr.length; i ++) {
      if (myarr[i].prodName) {
        showArr.push(myarr[i].prodName)
      }
    }
    const manager = formValue.value ? formValue.value : ''
    const key = formValue.key ? formValue.key : ''
    const productName = {
      productName: {
        required: false,
        valueType: 'selfSelect',
        title: '产品名称',
        desc: '产品名称',
        extra: showArr.join(','),
        onClick: () => {
          if (!formValue.key) {
            Toast.fail('请先选择管理人', 3)
            return
          }
          dispatch({
            type: 'formStorage/fetchFormValue',
            payload: form.getFieldsValue(),
          });
          dispatch(routerRedux.push({
            pathname: '/productListCnt', state: {
              custId: dataSource.custId,
              managerCode: formValue.key,
              mode: 'slelect',
              withOutGoBack: true,
              selectAcceptor: {
                productName,
              },
              select: (arr) => {
                this.props.dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    checkArr: arr,
                  },
                });
                dispatch(routerRedux.goBack());
              },
            },
          }));
        },
      },
    }
    return ({
      managerCode: {
        required: false,
        valueType: 'selfSelect',
        title: '管理人',
        desc: '管理人',
        extra: manager,
        onClick: () => {
          dispatch({
            type: 'formStorage/fetchFormValue',
            payload: form.getFieldsValue(),
          });
          dispatch(routerRedux.push({
            pathname: '/selectManagers', state: {
              custId: dataSource.custId,
              mode: 'selectManagers',
              withOutGoBack: true,
              selectManager: {
                key,
              },
              select: (rowData) => {
                console.log('11111', rowData.key)
                console.log('2222', formValue.key)
                if (rowData.key !== formValue.key) {
                  this.props.dispatch({
                    type: 'formStorage/fetchFormValue',
                    payload: {
                      checkArr: [],
                    },
                  });
                }
                dispatch({
                  type: 'formStorage/fetchFormValue',
                  payload: {
                    value: rowData.value,
                    key: rowData.key,
                  },
                });
                dispatch(routerRedux.goBack());
              },
            },
          })
          );
        },
      },
      ...productName,
    })
  }

  getOptions1() {
    const { formValue } = this.props.formStorage
    return ({
      format: {
        type: Dic.fetchDicList('certify'),
        required: true,
        valueType: 'select',
        desc: '资产证明格式',
        title: '资产证明格式',
        extra: formValue.format !== undefined ? Dic.fetchDicValue('certify', formValue.format) : '请选择',
      },
      remark: {
        required: false,
        type: 'text',
        numberOfLines: 5,
        title: '请输入用途',
        placeholder: '用途 (最多输入200字)',
        countLimits: 200,
      },
    })
  }
  getformIssue(){
    return ({
      issueDate:{
        valueType:'date',
        desc:'开据日期',
        title:'选择日期',
        mode:'date',
        extra:'请选择',
        defaultDate:maxDate,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
    })
  }
  apply= () => {
    const { dispatch, form, location, formStorage } = this.props;
    const { formValue } = formStorage;
    const { dataSource } = location.state;
    form.validateFields((error, value) => {
      console.log('formvalue', formValue)
      console.log('value', value)
      if (formValue.key === undefined) {
        Toast.fail('请选择管理人!', 3);
        return
      }
      if (!formValue.checkArr || formValue.checkArr.length === 0) {
        Toast.fail('请选择产品名称!', 3);
        return
      }
      if (!value.remark) {
        Toast.fail('请输入用途!', 3);
        return
      }
      const myarr = formValue.checkArr ? formValue.checkArr : []
      const upArr = []
      for (let i = 0; i < myarr.length; i ++) {
        if (myarr[i].prodId) {
          upArr.push(myarr[i].prodId)
        }
      }
      // if (!value.remark) {
      //   Toast.fail('请填写用途!', 3);
      //   return
      // }
      if (!error) {
        const params = {
          prodIds: upArr.join(','),
          managerCode: formValue.key,
          custId: dataSource.custId,
          format: value.format,
          remark: value.remark ? value.remark : '',
          custName: dataSource.custName,
          managerName: formValue.value,
          mgrSysCode: myarr[0].mgrSysCode,
          issueDate: value.issueDate.format("YYYY-MM-DD")
        };
        console.log("🌹", params)
        this.setState({
          ifClick: true,
         })
        dispatch({
          type: 'AssetsApplyModel/assetsApplyUpload',
          payload: {
            params,
            backMethod: (data) => {
              if (data && data.code === '00') {
                this._change = false
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '返回资产证明申请列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/assetsApplyListCnt'));
                    },
                  } }));
              } else {
                this.setState({
                  ifClick: false,
                })
                Toast.fail(data && data.message ? data.message : '提交错误!', 3);
              }
            },
          },
        });
      } else {
        if (!value.format) Toast.fail('请选择资产证明格式!', 3);
      }
    })
  }

  renderSeparator() {
    return (
      <p className={applyStyle.separate} />
    )
  }

  renderLastSeparator() {
    return (
      <p className={applyStyle.lastSeparate} />
    )
  }

  render() {
    const { form, dispatch, formStorage, location } = this.props;
    const { formValue } = formStorage
    const { dataSource } = location.state
    console.log('dat->',dataSource)


    return (
      <div className={applyStyle.container} >
        <div className={applyStyle.box}>
          <Title {...titleProps} />
          <WhiteSpace />
          <WhiteSpace />
          <List className={applyStyle.list}>
            <Item extra={dataSource.custName}>客户名称</Item>
            <Item extra={dataSource.custTypeName}>客户类型</Item>
            <Item extra={dataSource.certTypeName}>证件类型</Item>
            <Item extra={dataSource.certNo}>证件号码</Item>
          </List>
          <Form
            options={this.getformIssue()} form={form} formValue={formValue} dispatch={dispatch}
          />
          {this.renderSeparator()}
          <Form
            options={this.getOptions()} form={form} formValue={formValue} dispatch={dispatch}
          />
          {this.renderSeparator()}
          <Form
            options={this.getOptions1()} form={form} formValue={formValue} dispatch={dispatch}
          />
        </div>
        <Button className={applyStyle.btn} activeStyle={false} onClick={this.apply} disabled={this.state.ifClick}>提交</Button>
      </div>
    )
  }
}

