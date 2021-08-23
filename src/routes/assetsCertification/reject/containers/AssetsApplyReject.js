import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import Form from '../../../../utils/form';
import applyStyle from '../style/applyRejectStyle.less';
import { List, Button, WhiteSpace } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';
import {Toast} from "antd-mobile/lib/index";
import ItemDetailStyle from '../style/itemDetail.less';
import moment from "moment";
import 'moment/locale/zh-cn';
import {getTime} from '../../../../utils/getNowDate'

const maxDate = moment(getTime(), 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const Item = List.Item;
const titleProps = {
  title: '资产证明申请驳回修改',
};
function connectStateToprops({ formStorage, AssetsRejectModel }) {
  return { formStorage, AssetsRejectModel }
}

@connect(connectStateToprops)
@createForm()
export default class AssetsApplyReject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      ifClick: false,
    }
  }

  getOptions() {
    const { dispatch, form, location } = this.props;
    const data = location.state
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
              custId: data.custId,
              managerCode: formValue.key,
              mode: 'slelect',
              withOutGoBack: true,
              selectAcceptor: {
                productName,
              },
              select: (arr) => {
                console.log(arr,'数据==》')
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
        arrow: 'empty',
        // onClick: () => {
        //   dispatch({
        //     type: 'formStorage/fetchFormValue',
        //     payload: form.getFieldsValue(),
        //   });
        //   dispatch(routerRedux.push({
        //     pathname: '/selectManagers', state: {
        //       custId: data.custId,
        //       mode: 'selectManagers',
        //       withOutGoBack: true,
        //       selectManager: {
        //         key,
        //       },
        //       select: (rowData) => {
        //         if (rowData.key !== formValue.key) {
        //           this.props.dispatch({
        //             type: 'formStorage/fetchFormValue',
        //             payload: {
        //               checkArr: [],
        //             },
        //           });
        //         }
        //         dispatch({
        //           type: 'formStorage/fetchFormValue',
        //           payload: {
        //             value: rowData.value,
        //             key: rowData.key,
        //           },
        //         });
        //         dispatch(routerRedux.goBack());
        //       },
        //     },
        //   })
        // );
        // },
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
        countLimits: 200,
        placeholder: '用途 (最多输入200字)',
        extra: formValue.remark !== undefined ? formValue.remark : '',
      },
    })
  }
  //开据日期
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
  showAbolish= () => {
    this.setState({
      show: true,
    })
  }

  showAlert = () => {
    return (
      <div className={ItemDetailStyle.showAlert}>
        <div className={ItemDetailStyle.info}>
          <p>提示</p>
          <p>确定作废该记录？</p>
          <div>
            <Button onClick={this.abolish}>确定</Button>
            <Button onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

  apply= () => {
    const { dispatch, form, location, formStorage } = this.props;
    const { formValue } = formStorage;
    const data = location.state
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
          id: data.id,
          prodIds: upArr.join(','),
          managerCode: formValue.key,
          custId: data.custId,
          format: value.format,
          remark: value.remark ? value.remark : '',
          custName: data.custName,
          managerName: formValue.value,
          reqSeq: data.reqSeq,
          mgrSysCode: myarr[0].mgrSysCode,
          issueDate: value.issueDate.format("YYYY-MM-DD")
        };
        console.log("🌹", params.issueDate);
        this.setState({
          ifClick: true,
        })
        dispatch({
          type: 'AssetsApplyModel/assetsApplyReject',
          payload: {
            params,
            backMethod: (data) => {
              if (data && data.code === '00') {
                this._change = false
                dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '提交成功，请等待系统确认！', backTitle: '资产证明申请驳回列表',
                    backMethord: () => {
                      dispatch(routerRedux.push('/assetsRejectListCnt'));
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

  abolish= () => {
    this.setState({ show: false })
    const { dispatch, location } = this.props;
    const data = location.state
    const params = {
      id: data.id,
    }
    dispatch({
      type: 'AssetsRejectModel/abolish',
      payload: {
        params,
        backMethod: (data) => {
          if (data && data.code === '00') {
            dispatch(routerRedux.push({ pathname: '/optionSuccess', state: { successTitle: '废除成功，请等待系统确认！', backTitle: '资产证明申请驳回列表',
                backMethod: () => {
                  dispatch(routerRedux.push('/assetsRejectListCnt'));
                },
              } }));
          } else Toast.fail(data && data.message ? data.message : '提交错误!', 3);
        },
      },
    });
  }

  cancel= () => {
    this.setState({ show: false })
  }

  change= () => {
    console.log('change')
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
    const { form, dispatch, formStorage, location, AssetsRejectModel } = this.props;
    const { formValue } = formStorage
    const reason = AssetsRejectModel.reason
    const data = location.state;

    return (
      <div className={applyStyle.container} >
        <div className={applyStyle.box}>
          <Title {...titleProps} />
          <p className={applyStyle.section1}>驳回详情</p>
          <div className={applyStyle.head}>
            <p>驳回原因<span>{reason.reason}</span></p>
            <p>&nbsp;&nbsp;&nbsp;驳回人<span>{reason.rejector}</span></p>
            <p>驳回时间<span>{reason.rejectTime}</span></p>
          </div>
          <WhiteSpace />
          <p className={applyStyle.section1}>资产证明申请</p>
          <List className={applyStyle.list}>
            <Item extra={data.custName}>客户名称</Item>
            <Item extra={data.custTypeName}>客户类型</Item>
            <Item extra={data.certTypeName}>证件类型</Item>
            <Item extra={data.certNo}>证件号码</Item>
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
        <div className={applyStyle.butt}>
          <Button className={applyStyle.btn} activeStyle={false} onClick={this.showAbolish}>作废</Button>
          <Button className={applyStyle.btn1} activeStyle={false} onClick={this.apply} disabled={this.state.ifClick}>提交</Button>
        </div>
        {this.state.show ? this.showAlert() : null}
      </div>
    )
  }
}

