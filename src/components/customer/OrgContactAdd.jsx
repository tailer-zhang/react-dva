import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Switch, InputItem, DatePicker,WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Form from '../../utils/form';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const Item = List.Item;
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

export default class OrgContactAdd extends React.Component{
  constructor() {
    super();
  }

  getOptions() {
    let {dispatch,formValue,form,formStorage,customer} = this.props;

    let certCodeValidType = undefined,certDescOption={};
    if(formValue.linkIDType=='01')
       certCodeValidType = 'idcard';
    else if(formValue.linkIDType=='03')
      certCodeValidType = 'VEEPIdent';
    else if(formValue.linkIDType=='04')
      certDescOption = {
          linkIDDesc:{
            required:true,
            trigger:'onBlur',
            errMsg:'请注明是必输项!',
            desc:'请注明'
          }
      };
    return({
      space0:{valueType:'whiteSpace'},
      linkIDType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('certTypes'),
        title:'主联系人证件类型',
        desc:'主联系人证件类型'
      },
      ...certDescOption,
      linkIDCard: {
        type:'text',
        required:true,
        trigger:'onBlur',
        validatorType:certCodeValidType,
        errMsg:'证件号码非法!',
        desc:'主联系人证件类型号码'
      },
      linkPhone: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'固话号码非法!',
        desc:'主联系人固话'
      },
      linkFax: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'fax',
        errMsg:'传真号码非法!',
        desc:'主联系人传真'
      },
      linkEmail: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'email',
        errMsg:'电子邮箱非法!',
        desc:'主联系人电子邮箱'
      },
      post: {
        required:true,
        type: 'text',
        desc:'邮编'
      },
      space1:{valueType:'whiteSpace'},
      deciName: {
        required:false,
        type: 'text',
        desc:'决策人姓名'
      },
      deciSex: {
        required:false,
        valueType:'select',
        type:Dic.fetchDicList('gender'),
        title:'决策人性别',
        desc:'决策人性别'
      },
      deciAge: {
        required:false,
        type: 'text',
        desc:'决策人年龄'
      },
      deciMobilePhone: {
        required:false,
        type: 'text',
        trigger:'onBlur',
        validatorType:'mobile',
        errMsg:'手机号码非法!',
        desc:'决策人手机'
      },
      deciPhone: {
        required:false,
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'固话号码非法!',
        desc:'决策人固话'
      },
      deciFax: {
        required:false,
        type: 'text',
        trigger:'onBlur',
        validatorType:'fax',
        errMsg:'传真号码非法!',
        desc:'决策人传真'
      },
      deciEmail: {
        required:false,
        type: 'text',
        trigger:'onBlur',
        validatorType:'email',
        errMsg:'电子邮箱非法!',
        desc:'决策人电子邮箱'
      },
      space2:{valueType:'whiteSpace'},
      finaName: {
        required:true,
        type: 'text',
        desc:'财务姓名'
      },
      finaSex: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('gender'),
        title:'财务性别',
        desc:'财务性别'
      },
      finaAge: {
        required:false,
        type: 'text',
        desc:'财务年龄'
      },
      finaMobilePhone: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'mobile',
        errMsg:'手机号码非法!',
        desc:'财务手机'
      },
      finaPhone: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'固话号码非法!',
        desc:'财务固话'
      },
      finaFax: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'fax',
        errMsg:'传真号码非法!',
        desc:'财务传真'
      },
      finaEmail: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'email',
        errMsg:'电子邮箱非法!',
        desc:'财务电子邮箱'
      },
    })
  }

  render() {
    const {dispatch,defaultActiveKey,formValue,onChangeMethord,saveFormMethord,form,formFocus,formBlur} = this.props;
    const { getFieldProps,getFieldError} = this.props.form;
    return (
        <Form options={this.getOptions()} dispatch={dispatch} formValue={formValue}
           form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}
           onFocus={formFocus} onBlur={formBlur} id={this.props.id}/>
    )
  }
}

// <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom: '1.334rem'}}>
//   <List>
//     <WhiteSpace style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
//     </List>
// </div>
