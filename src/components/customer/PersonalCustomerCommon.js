import React,{Component} from 'react';
import { List,InputItem,Toast} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import Form from '../../utils/form';

export default class PersonalCustomerCommon extends React.Component{
  constructor() {
    super();
    this.state = {};
    this.renderList =this.renderList.bind(this);
  }

  switchOnChange(key,value)
  {
    let {dispatch,formValue} = this.props;
    console.log("switch========formValue",formValue);
    let payload  = {};
    payload[key] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }
  // validInput(type,errMsg,rule, value, callback)
  // {
  //   const { getFieldProps,getFieldError} = this.props.form;
  //   if(validateValue(type,value))
  //   {
  //     callback();
  //   }
  //   else {
  //     callback([new Error(errMsg?errMsg:'参数非法!')]);
  //   }
  // }
  //
  // errorClick(key)
  // {
  //   const { getFieldProps,getFieldError} = this.props.form;
  //   let err = getFieldError(key);
  //   Toast.fail(err,1);
  // }



  renderList()
  {
    let {formValue,form,dispatch,onChangeMethord,isOnlyAdd} = this.props;
    if(formValue==undefined)
      formValue = {};
    const { getFieldProps,getFieldError} = form;

    //控制关系说明文案
    let relationOptions = {};
    if (formValue.actualControl) {
      relationOptions = {
        relationDesc:{
          required:true,
          trigger:'onBlur',
          numberOfLines:0,
          validatorType:'length300',
          errMsg:'控制关系说明不能为空！',
          desc:'请说明'
        },
      };
    }

    //实际受益人说明文案
    let benefitOptions = {};
    if (formValue.actualBenefit) {
      benefitOptions= {
        benefitDesc:{
          required:true,
          trigger:'onBlur',
          numberOfLines:0,
          validatorType:'length300',
          errMsg:'受益人说明不能为空！',
          desc:'请说明'
        },
      };
    }

    let formOptions = {
      custName:{
        required:true,
        type:'text',
        trigger:'onBlur',
        validatorType:'name',
        errMsg:'客户姓名非法!',
        initialValue:formValue.custName,
        desc:'姓名',
        // otherProps:{
        //     onBlur:(value)=>{
        //         if(value){
        //             form.setFieldsValue({
        //                 actualControl:value,
        //                 actualBenefit:value,
        //             });
        //             dispatch(
        //                 {
        //                     type:'formStorage/fetchFormValue',
        //                     payload:{
        //                         actualControl:value,
        //                         actualBenefit:value,
        //                     }
        //                 }
        //             );
        //
        //
        //         }
        //
        //     }
        // }
      },
      // actualControl:{
      //   required:true,
      //   valueType: 'switch',
      //   desc:'是否存在实际控制关系',
      //   onChangeMethord: (value)=>this.switchOnChange('actualControl',value)
      // },
      //
      // actualBenefit:{
      //   required:true,
      //   valueType: 'switch',
      //   desc:'实际受益人',
      //   onChangeMethord: (value) => this.switchOnChange('actualBenefit',value)
      // },
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
      remark1:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('custSource'),
        title:'客户来源',
        initialValue:formValue.remark1,
        desc:'客户来源'
      },
    };
    return (
      <Form options={formOptions} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} />
    );
  }

  render() {
    let {formValue,form,changeStateMethord} = this.props;
    const { getFieldProps,getFieldError} = form;
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
};

// <List>
//   <InputItem
//     {...getFieldProps('custName',{
//       // validateTrigger: 'onBlur',
//       rules: [{
//         required: true
//       },
//       {
//         validator: this.validInput.bind(this,'name','客户姓名非法!'),
//         trigger: 'onBlur',
//       },
//     ],
//       initialValue:formValue.custName
//     })}
//     error={getFieldError('custName')}
//     onErrorClick={this.errorClick.bind(this,'custName')}
//  >姓名</InputItem>
 // <List.Item
 //    type="text"
 //    extra={Dic.fetchDicValue('gender',formValue.sex)}
 //    arrow="horizontal"
 //    onClick={() =>{
 //      this.setState({
 //      showMar:true,
 //      formValue:form.getFieldsValue(),
 //      marProps:{
 //                  title:'性别',
 //                  backMethord:()=>{
 //                    changeStateMethord({
 //                      showMar:false
 //                    });
 //                  },
 //                  mode:'subView',
 //                  dataSource:Dic.fetchDicList('gender'),
 //                  selectValue:formValue.sex,
 //                  onChange:(value,name)=>{
 //                    changeStateMethord({
 //                      showMar:false,
 //                      formValue:{
 //                        ...formValue,
 //                        sex:value
 //                      }
 //                    });
 //                  },
 //       }
 //    })}}
 //  >性别</List.Item>
  // <InputItem
  //   {...getFieldProps('mobilePhone',{
  //     validateTrigger: 'onBlur',
  //     rules: [{
  //       required: true
  //       },
  //       {
  //         validator: this.validInput.bind(this,'mobile','手机号非法!'),
  //         trigger: 'onBlur',
  //       },
  //     ],
  //     initialValue:formValue.mobilePhone
  //   })}
  //   type="integer"
  //   error={getFieldError('mobilePhone')}
  //   onErrorClick={this.errorClick.bind(this,'mobilePhone')}
  // >联系电话</InputItem>
// </List>
