import React from 'react';
import { List,InputItem,Toast,Tabs,SearchBar} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import Dic from './utils/dictionary';
import {validateValue,exceptSpecialType} from './utils/ValidateType';
import Form from './utils/form';
import {connect} from 'dva';
import { createForm } from 'rc-form';
const TabPane = Tabs.TabPane;

class TestForm extends React.Component {
  constructor() {
    super();
    this.state={
      isFixed:true
    }
  }
  onChangeMethord =(item,value,name)=>
  {
    console.log('------onChangeMethord');
    let {dispatch} = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }
  formFocus(){
    console.log('-----formFocus');
    this.setState({isFixed: true})
  }

  formBlur(){
    console.log('-----formBlur');
    this.setState({isFixed: false})
  }
  render(){
    let {formStorage,form,dispatch} = this.props;
    let formValue = formStorage.formValue;
    if(formValue==undefined)
      formValue = {};
    const { getFieldProps,getFieldError} = form;
    let formOptions = {
      custName:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName,
        desc:'姓名1'
      },
      custName1:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName1,
        desc:'姓名2'
      },
      custName2:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName2,
        desc:'姓名3'
      },
      custName3:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName3,
        desc:'姓名4'
      },
      custName4:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName4,
        desc:'姓名5'
      },
      custName5:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName5,
        desc:'姓名5'
      },
      sex:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('gender'),
        title:'性别',
        initialValue:formValue.sex,
        desc:'性别'
      },
      mobilePhone:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'手机号非法!',
        desc:'联系电话',
        initialValue:formValue.mobilePhone,
      },
      custName6:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName6,
        desc:'姓名6'
      },
      custName7:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName7,
        desc:'姓名7'
      },
      custName8:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName8,
        desc:'姓名8'
      },
      custName9:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName9,
        desc:'姓名9'
      },
      custName10:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName10,
        desc:'姓名10'
      },
      custName11:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName11,
        desc:'姓名11'
      },
    };
    return (
    <div>
      <Tabs defaultActiveKey={'1'} swipeable={false} onChange={(activeKey)=>{
        dispatch({type: 'formStorage/fetch',payload: {activeKey: activeKey}})
      }}>
      <TabPane tab="合同详情" key="1" >

      <Form options={formOptions} dispatch={dispatch} formValue={formValue} form={form}
          onChangeMethord={this.onChangeMethord}/>
        </TabPane>
        <TabPane tab="缴费记录" key="2">
          <div>1111111</div>
          <SearchBar placeholder="搜索" />
        </TabPane>
      </Tabs>
    </div>
  );
  }
}

function connectPerCustAdd({customer,formStorage}) {
  return {customer,formStorage}
}


export default connect(connectPerCustAdd)(createForm()(TestForm));
