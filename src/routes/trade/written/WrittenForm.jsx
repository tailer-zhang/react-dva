import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List,InputItem,DatePicker,Toast } from 'antd-mobile';
import Title from '../../../components/product/Title';
import Dic from '../../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Form from '../../../utils/form';
import { createForm } from 'rc-form';
import {validateValue,exceptSpecialType} from '../../../utils/ValidateType';
import {routerRedux} from 'dva/router';
import {formatError} from '../../../utils/formatUtils';
import {fmoney,convertCurrency} from '../../../utils/formatUtils';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

import styles from '../../../styles/trade/written.less';

const Item = List.Item;

let isRepeat = 0;

class WrittenFrom extends React.Component {
  constructor(props) {
    super(props)
     isRepeat = 0;
  }

  onFocus(){
    this.setState({
      isFixed:true
    });
  }

  onBlur(){
    this.setState({
      isFixed:false
    })
  }

  submitAddPreTrad(){
      if(isRepeat>=1) return;
      let {form,onChangeMethord,dispatch,formStorage} = this.props;
      let {formValue} = formStorage;
      form.validateFields((error, value) => {
          if(!error)
          {
              let regex = /^[0-9]+(.[0-9]*)?$/;
              if(!formValue.custID){
                  Toast.fail('客户不能为空!',2);
                  return;
              }
              else if(!regex.test(value.origAmt)){
                  Toast.fail('预约金额请输入大于0的数字!',2);
                  return;
              }
              else if(value.origAmt<=0){
                  Toast.fail('预约金额必须大于0!',2);
                  return;
              }
              isRepeat = 1;
              Toast.loading('非私募预约申请提交中...',30,undefined,true);
              let saveValue = {
                  ...value,
                  reqDate:value.reqDate.format('YYYY-MM-DD'),
                  customer:{...formValue.selectCustomer,custNo:formValue.selectCustomer.custID,certNo:formValue.selectCustomer.certCode},
              };
              dispatch({
                  type:'intentionWritten/addPreTradReq',
                  payload:{
                      params:saveValue,
                      backMethord:(data)=>{
                          isRepeat = 0;
                          Toast.hide();
                          if(data&&data.code=='00')
                          {
                              dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                                successTitle:'非私募预约申请提交成功!',
                                backTitle:'返回',
                              }}));
                          }
                          else {
                              Toast.fail(data&&data.message?data.message:'非私募预约申请提交失败!',2);
                          }
                      }
                  }
              });
          }
          else {
              Toast.fail(formatError(error),2);
          }
      });
 }

  getOptions0()
  {
    let {form,onChangeMethord,dispatch,formStorage} = this.props;
    let {formValue} = formStorage;
    let prodType = formValue.prodType;
    let origAmtConvertOption={};
    if(formValue.currType=='156'){
        origAmtConvertOption = {
            origAmtConvertDesc:{
                valueType:'selfDiv',
                value:<List.Item key={'origAmtConvertDesc'} extra={convertCurrency(form.getFieldValue('origAmt'))}>大写金额</List.Item>
            },
        };
    }
    return ({
      space0:{valueType:'whiteSpace'},
      custName:{
        valueType:'selfSelect',
        title:'客户名称',
        desc:'客户名称',
        arrow:'horizontal',
        required:true,
        extra:formValue.custName,
        onClick:()=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:form.getFieldsValue()
          });
          dispatch(routerRedux.push({pathname:'/inputSelectCustomer',state:{
              mode:'selectCustomer',
              selectCustomer:{...formValue.selectCustomer},
              filter:{

              },
              selectResult:(rowData)=>{
                dispatch({
                  type:'formStorage/fetchFormValue',
                  payload:{
                    custName:rowData.custName,
                    custID:rowData.custID,
                    selectCustomer:rowData
                  }
                });
            }
        }}));
        }
      },
      space1:{valueType:'whiteSpace'},
      currType:{
          title:'币种',
          desc:'币种',
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('currType'),
      },
      origAmt:{
        title:'预约金额',
        desc:'预约金额',
        required:true,
        type:'money',
        trigger:'onBlur',
        errMsg:'预约金额非法!',
      },
      ...origAmtConvertOption,
      reqDate:{
        title:'预约产品日期',
        desc:'预约产品日期',
        valueType:'date',
        mode:'date',
        extra:'可选,小于结束日期',
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      space2:{valueType:'whiteSpace'},
      prodType:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('preProdType'),
        title:'预约产品',
        desc:'预约产品',
        errMsg:'预约产品非法!',
      },
    })
  }
  getOptions2()
  {
    return ({
      remark:{
        placeholder:'',
        desc:'',
        type:'text',
        numberOfLines:5,
        trigger:'onBlur'
      },
    })
  }


  render(){
    let {form,formStorage,dispatch} = this.props;
    let {formValue} = formStorage;
    return(
      <div className={styles.writtenFrom}>
        <div className={styles.scroll}>
          <List>
              <Form options={this.getOptions0()} form={form} formValue={formValue} dispatch={dispatch}/>
              <p className={styles.remark}>备注</p>
              <Form options={this.getOptions2()} form={form} formValue={formValue} dispatch={dispatch}/>
          </List>
        </div>
        <p className={styles.footerSpeace}></p>
        <p className={styles.newSetBtn} onClick={this.submitAddPreTrad.bind(this)}>提交</p>
      </div>
    );
  }
}


function connectStateFun({intentionWritten,formStorage}){
  return {intentionWritten,formStorage }
}

function onValuesChangeFunc(props,changedValues){
    let changedFields = Object.keys(changedValues);
    if(changedFields.indexOf('currType')>=0){
        props.dispatch({
            type:'formStorage/fetchFormValue',
            payload:changedValues
        });
    }
}


export default connect(connectStateFun)(createForm({onValuesChange:onValuesChangeFunc})(WrittenFrom));
//

// {
//     onValuesChange:(props,changedValues)=>{
        // console.log('=ddd==',changedValues);
        // let changedFields = Object.keys(changedValues);
        // if(changedFields.indexOf('currType')>=0){
        //     props.dispatch({
        //         type:'formStorage/fetchFormValue',
        //         payload:changedValues
        //     });
        // }
//     }
// }
