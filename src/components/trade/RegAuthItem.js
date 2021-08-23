import React  from 'react';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import newUserStyles from '../../styles/customer/bankCard.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Toast} from "antd-mobile/lib/index";
import DataImg from '../../components/share/DataImg';
import * as Commons from "../../utils/commonUtil";

const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

class UpdateItem extends React.Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { dispatch,location } = this.props
    console.log('this.props  componentWillMount1',this.props)
    let data = location.state.dataSource
    if(data.registerFlag && data.registerFlag === '1'){
      dispatch({
        type: 'trade/fetchCustRegisterFile',
        payload:{
          id: data.id,
        }
      });
    }

  }
  onChangeMethord(item,value,name)
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'bankFormValue',
        newValue:payload
      }
    });
    dispatch(routerRedux.goBack());
  }
  getOption1() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: data.custName,
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: data.certType,
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: data.certNo,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption2() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: data.prodName,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption3() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      isRegAuth: {
        valueType: 'selfSelect',
        desc: '是否已完成登记注册身份验证',
        extra: '是',
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '系统操作时间',
        extra: data.registerTime,
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  getOption4() {
    const { location } = this.props
    let data = location.state.dataSource
    return({
      isRegAuth: {
        valueType: 'selfSelect',
        desc: '是否已完成登记注册身份验证',
        extra: '否',
        arrow: 'empty'
      },
      space1:{valueType:'whiteSpace'},
    })
  }
  render() {
    let {dispatch,form,trade,location} = this.props;
    console.log('this.props render',this.props)
    let data = location.state.dataSource
    let ffff = {}
    let custRegisterFileList = trade.custRegisterFileList
    console.log('custRegisterFileList',custRegisterFileList)
    return (
      <div className={newUserStyles.newBankIdBox} style={{marginBottom: '100px'}}>
        <p className={newUserStyles.pFull}></p>
        <div className={newUserStyles.card}>
          <List>

            <Form dispatch={dispatch} options={this.getOption1()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
            <Form dispatch={dispatch} options={this.getOption2()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>
            {data.registerFlag && data.registerFlag === '1' ? <Form dispatch={dispatch} options={this.getOption3()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>  :   <Form dispatch={dispatch} options={this.getOption4()}form={form} formValue={ffff} onChangeMethord={this.onChangeMethord.bind(this)}/>}
            {data.registerFlag && data.registerFlag === '1' ?  <DataImg dataSource={custRegisterFileList} />:
              <div/>
            }
          </List>
        </div>
      </div>
    );
  }
};
function onFieldsChange(props, changedFields)
{
  let {dispatch, formStorage} = props;
  const { location } = props
  let data = location.state.dataSource
  let myObject = formStorage.formValue || {}
  if(changedFields.delay)
  {
    let temp = changedFields.delay;
    myObject.delay = temp.value
    dispatch({
      type:'trade/getDate',
      payload:{
        params: {endDate: data.endDate, days: myObject.delay},
        backMethod:(data)=>{
          myObject.diedline = data
          dispatch({
            type:'formStorage/fetch',
            payload:{
              formValue:myObject
            }
          });
        }
      }
    });

  }
}
function connectProps({trade,formStorage}) {
  return {trade,formStorage}
}

export default connect(connectProps)(createForm({onFieldsChange:onFieldsChange})(UpdateItem));
