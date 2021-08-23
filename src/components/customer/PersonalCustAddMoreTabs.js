import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker,Toast,Icon} from 'antd-mobile';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import styles from '../../styles/customer/personalCustAddMore.less';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { createForm } from 'rc-form';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import Form from '../../utils/form';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const TabPane = Tabs.TabPane;
const Item = List.Item;
var arr = [];

export default class PersonalCustAddMoreTabs extends React.Component {
  constructor(props){
    super(props);
    // this.getOptions0=this.getOptions0.bind(this)
    this.state={
      isFixed: false,
    };
    this._ifIn = false
  }


  switchOnChange(key,value)
  {
    console.log("=======value",value,key)
    let {dispatch,formValue} = this.props;
    let payload  = {};
    payload[key] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }

  longValueChange(value)
  {
    console.log('value===========',value);
    let {dispatch,formValue} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        certEndDate:value?moment('9999-12-31','YYYY-MM-DD'):zhNow
      }
    });
  }
  remove(value){
     for (let i = 0; i < arr.length ; i ++){
          if (value === arr[i]){
              arr.splice(i,1)
          }
       }
  }

  onChangeSource(value){
    if (arr.indexOf(value) !== -1){
       this.remove(value)
    }else {arr.push(value)}
      let  newArr = arr.map((item,index)=>{
         return index === (arr.length - 1) ? item : item + ','
    })
    let {dispatch,formValue} = this.props;
    let sourceOfFunds = newArr.join('')
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        sourceOfFunds
      }
    });
    console.log("click each checkbox to log the value ",newArr.join(''));/*打印的最终结果*/
  }

  getOptions0()
  {
    let recommendOptions = {};
    let {formValue,form,onChangeMethord,dispatch,customer,formStorage,location,detail} = this.props;
    if(formValue.isfmanForMember)
      recommendOptions = {
        relationCust:{
          valueType:'selfSelect',
          title:'会员姓名',
          desc:'会员姓名',
          extra:formValue.relationCustName,
          onClick:()=>{
            dispatch({
              type:'formStorage/fetchFormValue',
              payload:form.getFieldsValue()
            });
            dispatch(routerRedux.push({pathname:'/inputSelectCustomer',state:{
                mode:'selectCustomer',
                selectCustomer:{
                  custID:formValue.relationCust
                },
                filter:{
                  custClass:'01',
                  custID: customer.custID,
                  isMemRec: 0
                },
                selectResult:(rowData)=>{
                  dispatch({
                    type:'formStorage/fetchFormValue',
                    payload:{
                      relationCustName:rowData.custName,
                      relationCust:rowData.custID
                    }
                  });
              }
            },query: {custID: customer.custID,isMemRec: 0}}));
          }
        },
        relationMobile: {
          required: true,
          trigger:'onBlur',
          validatorType:'phone',
          errMsg:'联系电话格式非法!',
          desc:'联系电话'
        },
        relation:{
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('relation'),
          title:'与推荐人关系',
          desc:'推荐人关系'
        }
      };
    let certEndDateStruct = {
      valueType:'date',
      desc:'证件到期日',
      title:'选择日期',
      mode:'date',
      extra:'可选,小于结束日期',
      disabled:formValue.long,
      minDate:minDate,
      maxDate:maxDate,
    };
    if(formValue.long)
      certEndDateStruct = {
        valueType:'selfSelect',
        title:'证件到期日',
        desc:'证件到期日',
        extra:'长期有效',
        arrow:'empty'
      };
    let certType = Dic.fetchDicList('certTypes');
    if(formValue.nationalityType=='01')
      certType = Dic.fetchDicList('certTypes01');
    else if(formValue.nationalityType!=undefined)
      certType = Dic.fetchDicList('certTypes02');

    let certCodeValidType = undefined,certDescOption={};
    if(formValue.certType=='01')
       certCodeValidType = 'idcard';
    else if(formValue.certType=='03')
      certCodeValidType = 'VEEPIdent';
    else if(formValue.certType=='04')
      certDescOption = {
          certDesc:{
            required:true,
            trigger:'onBlur',
            errMsg:'请注明是必输!',
            desc:'请注明'
          }
      };

    let recordOptions = {};
    if(formValue.badRecords){
        recordOptions = {
            recordDesc:{
              required:true,
              trigger:'onBlur',
              numberOfLines:0,
              validatorType:'length300',
              errMsg:'不良诚信记录不能为空！',
              desc:'不良诚信记录描述'
            },
        };
    }

    return ({
      custNameE:{
        required:false,
        trigger:'onBlur',
        validatorType:'english',
        errMsg:'外文名非法!',
        desc:'外文名'
      },
      nationalityType:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('nationality'),
        title:'国籍类型',
        desc:'国籍类型',
        errMsg:'国籍类型非法!',
      },
      space0:{valueType:'whiteSpace'},

      isControl:{
        required:true,
        valueType: 'switch',
        desc:'是否存在实际控制关系',
        onChangeMethord: (value)=>this.switchOnChange('isControl',value)
      },
      actualControl:{
        // required: true,
        // required:formValue.isControl,
        trigger:'onBlur',
        numberOfLines:0,
        validatorType:'length300',
        errMsg:'控制关系说明不能为空!',
        desc:'请说明',
      },
      isBenefitSelf:{
        required: true,
        valueType: 'switch',
        desc:'是否本人受益',
        onChangeMethord: (value) => this.switchOnChange('isBenefitSelf',value)
      },
      actualBenefit:{
        // required: formValue.isBenefitSelf,
        trigger:'onBlur',
        numberOfLines:0,
        validatorType:'length300',
        errMsg:'受益人说明不能为空!',
        desc:'请说明',
      },
      certType:{
        required:true,
        valueType:'select',
        type:certType,
        title:'证件类型',
        desc:'证件类型',
        errMsg:'证件类型非法!',
      },
      certCode:{
        type:'text',
        required:true,
        trigger:'onBlur',
        validatorType:certCodeValidType,
        errMsg:'证件号码非法!',
        desc:'证件号码'
      },
      ...certDescOption,
      long:{
        valueType:'switch',
        desc:'证件长期有效',
        justifyTrueValue:true,
        onChangeMethord:(value)=>this.longValueChange(value),
      },
      certEndDate:certEndDateStruct,
      space1:{valueType:'whiteSpace'},
      birthDay:{
        valueType:'date',
        desc:'出生日期',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        minDate:birthDayMinDate,
        maxDate:zhNow,
      },
      space2:{valueType:'whiteSpace'},
      marriage:{
        valueType:'select',
        type:Dic.fetchDicList('isMerry'),
        title:'婚姻状况',
        desc:'婚姻状况'
      },
      space3:{valueType:'whiteSpace'},
      residentCity:{
        required:true,
        trigger:'onBlur',
        errMsg:'常住城市非法!',
        desc:'常住城市'
      },
      space4:{valueType:'whiteSpace'},
      nation:{
        required:true,
        trigger:'onBlur',
        errMsg:'民族非法!',
        desc:'民族'
      },
      space5:{valueType:'whiteSpace'},
      isfmanForMember:{
        required:true,
        valueType:'switch',
        desc:'是否海银会员推荐',
        onChangeMethord:(value)=>this.switchOnChange('isfmanForMember',value)
      },
      ...recommendOptions,
      space10:{valueType:'whiteSpace'},
      badRecords:{
        required:true,
        valueType:'switch',
        desc:'有无不良诚信记录',
        onChangeMethord:(value)=>this.switchOnChange('badRecords',value)
      },
      ...recordOptions,
      space6:{valueType:'whiteSpace'},
      isSecret:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('isPrivary'),
        title:'是否对家庭保密',
        desc:'您的财务是否对家庭保密'
      },
      space7:{valueType:'whiteSpace'},
      memPic:{
        valueType:'selfSelect',
        title:'上传附件',
        desc:'上传附件',
        extra:(!formStorage.certPic||formStorage.certPic.length<=0)?'证件资料未上传':'已上传',
        onClick:()=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:form.getFieldsValue()
          });
          dispatch(routerRedux.push({pathname:'/imageAdd',state:{edit:detail?'edit':'',memMaterial: formStorage.memPic}}));
        }
      },
      space8:{valueType:'whiteSpace'},
      remark:{
        required:false,
        trigger:'onBlur',
        errMsg:'',
        desc:'备注'
      },
      space9:{valueType:'whiteSpace'},
    });
  }

  getOptions1()
  {
      let {formValue,form,onChangeMethord,dispatch,customer,formStorage,location} = this.props;
      let vocationOptions = {};
      if(formValue.vocation == '05'){
          vocationOptions = {
              vocationDesc:{
                required:true,
                trigger:'onBlur',
                errMsg:'',
                desc:'职位描述'
              },
          };
      }

      let professionOptions = {};
      if(formValue.profession == '16'){
          professionOptions = {
              professionDesc:{
                required:true,
                trigger:'onBlur',
                errMsg:'',
                desc:'行业性质描述'
              },
          };
      }

      let companyOptions = {};
      if(formValue.companyType == '07'){
          companyOptions = {
              companyDesc:{
                required:true,
                trigger:'onBlur',
                errMsg:'',
                desc:'公司类型描述'
              },
          };
      }


    return ({
      vocation:{
        valueType:'select',
        type:Dic.fetchDicList('vocation'),
        title:'职位',
        desc:'职位'
      },
      ...vocationOptions,
      space10:{valueType:'whiteSpace'},
      profession:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('profession'),
        title:'行业性质',
        desc:'行业性质'
      },
      ...professionOptions,
      space11:{valueType:'whiteSpace'},
      companyType:{
        valueType:'select',
        type:Dic.fetchDicList('companyType'),
        title:'公司类型',
        desc:'公司类型'
      },
      ...companyOptions,
      space12:{valueType:'whiteSpace'},
    });
  }

  getOptions2()
  {
    let {formValue,form,onChangeMethord,dispatch,customer,formStorage} = this.props;
    let familyAddressRequired = (formValue.postAddress=='1');
    let companyAddressRequired = (formValue.postAddress=='2');
    let otherAddressRequired = (formValue.postAddress=='3');

    return ({
      email:{
        required:true,
        trigger:'onBlur',
        validatorType:'email',
        errMsg:'邮箱格式非法!',
        desc:'邮箱'
      },
      contactOrder:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('contactOrder'),
        title:'联络顺序',
        desc:'联络顺序'
      },
      postAddress:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('postAddress'),
        title:'通讯地址',
        desc:'通讯地址'
      },
      space20:{valueType:'whiteSpace'},
      familyAddress:{
        required:familyAddressRequired,
        trigger:'onBlur',
        errMsg:'',
        desc:'家庭地址'
      },
      familyPostCode:{
        required:familyAddressRequired,
        trigger:'onBlur',
        validatorType:'zip',
        errMsg:'邮编格式非法!',
        desc:'家庭邮编'
      },
      familyPhone:{
        // required:familyAddressRequired,
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'家庭电话格式非法!',
        desc:'家庭电话'
      },
      space21:{valueType:'whiteSpace'},
      companyAddress:{
        required:companyAddressRequired,
        trigger:'onBlur',
        errMsg:'',
        desc:'单位地址'
      },
      companyPostCode:{
        required:companyAddressRequired,
        trigger:'onBlur',
        validatorType:'zip',
        errMsg:'邮编格式非法!',
        desc:'单位邮编'
      },
      companyPhone:{
        // required:companyAddressRequired,
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'单位电话格式非法!',
        desc:'单位电话'
      },
      space22:{valueType:'whiteSpace'},
      // otherPostCode:{
      //   required:otherAddressRequired,
      //   trigger:'onBlur',
      //   validatorType:'zip',
      //   errMsg:'邮编格式非法!',
      //   desc:'其他邮编'
      // },
      // space23:{valueType:'whiteSpace'},
      linkMen:{
        required:true,
        trigger:'onBlur',
        errMsg:'紧急联系人不能为空!',
        desc:'紧急联系人'
      },
      linkPhone:{
        required:true,
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'电话格式非法!',
        desc:'紧急联系人电话'
      },
      space24:{valueType:'whiteSpace'},
      space25:{valueType:'whiteSpace'},
      // space6:{valueType:'whiteSpace'},
      // space7:{valueType:'whiteSpace'},
      // space8:{valueType:'whiteSpace'},
    });
  }

  getOptions3()
  {
    return ({
      mbrCertifyType:{
        valueType:'select',
        type:Dic.fetchDicList('mbrCertifyType'),
        title:'会员认证方式',
        desc:'会员认证方式'
      },
      ctCertifyType:{
        valueType:'select',
        type:Dic.fetchDicList('ctCertifyType'),
        title:'合同认证方式',
        desc:'合同认证方式'
      },
      importantReceive:{
        valueType:'select',
        type:Dic.fetchDicList('importantReceive'),
        title:'资料接收',
        desc:'资料接收'
      },
    });
  }

  getOptions4()
  {
    const dataSource = [
      {
        value: '01',
        label: '薪金'
      },
      {
        value: '02',
        label: '投资收入'
      },
      {
        value: '03',
        label: '公司福利'
      },
      {
        value: '04',
        label: '家族财产'
      },
      {
        value: '05',
        label: '其他'
      }
    ]
    return ({
      // sourceOfFunds:{
      //   valueType:'select',
      //   type:Dic.fetchDicList('sourceOfFunds'),
      //   title:'资金来源',
      //   desc:'资金来源'
      // },
      canInvestAsset:{
        valueType:'select',
        type:Dic.fetchDicList('canInvestAsset'),
        title:'可投资产',
        desc:'可投资产'
      },
      space26:{valueType:'whiteSpace'},
      sourceOfFunds:{
        valueType:'checkbox',
        title:'资金来源',
        data:dataSource,
        onChangeMethord:(value)=>this.onChangeSource(value),
        itemStyles:{
          width:'50%',
          float:'left',
        }
      },

    });
  }

  render() {
    let {dispatch,defaultActiveKey,formStorage,formValue,onChangeMethord,form,formFocus,formBlur,isScrollPositioned,offsetYDic} = this.props;
   if(formValue.sourceOfFunds&&(formValue.sourceOfFunds.indexOf(',') !== -1)&&!this._ifIn){
     // console.log('y一次创意y一次创意y一次创意y一次创意y一次创意y一次创意')
     this._ifIn = true
      arr = formValue.sourceOfFunds.split(',')

   }else if (formValue.sourceOfFunds&&!this._ifIn){
     // console.log('2222222222222222222222222222')
     this._ifIn = true
      arr = new Array(formValue.sourceOfFunds)
   }
    console.log("formValue.isControl=======",formValue.isControl);

    const { getFieldProps,getFieldError} = this.props.form;
    let activeKey = defaultActiveKey;
    if(activeKey==undefined)
     activeKey = '1';
     console.log(typeof formValue);
    if(formValue==undefined) {
      formValue = {};
    }
    if(formValue.isControl===undefined ||formValue.isControl==='' || formValue.isControl ==='02'){
      formValue.isControl=false;
    }
    console.log("个人 tabs --isBenefitSelf",formValue.isBenefitSelf);
    if(formValue.isBenefitSelf===undefined || formValue.isBenefitSelf==='' || formValue.isBenefitSelf ==='01'){
      formValue.isBenefitSelf=true;
    }

    return (
      <div style={{marginTop: '0.26667rem'}}>
        <Tabs activeKey={activeKey} swipeable={false} animated={false} className={isScrollPositioned?styles.tabFixed:undefined}
            onChange={(activeKey)=>{
                console.log('=====被点击=',activeKey);
                // const offsetWidthDic = {'1':588,'2':2160,'3':2507,'4':3604};
                document.getElementById('boxScroll').scrollTo(0,offsetYDic[activeKey]);
                dispatch({type:'formStorage/fetch',payload:{activeKey:activeKey}});
            }}>
            <TabPane tab="基本信息" key="1">
            </TabPane>
            <TabPane tab="职业信息" key="2">
            </TabPane>
            <TabPane tab="联系方式" key="3">
            </TabPane>
            <TabPane tab="服务方式" key="4">
            </TabPane>
        </Tabs>
        <List>
          <WhiteSpace  style={{backgroundColor: '#efeff4',height: isScrollPositioned?'1.467rem':'0.267rem'}} />
          <Form id='w1' options={this.getOptions0()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} onFocus={formFocus} onBlur={formBlur}  />
          <WhiteSpace   style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
          <Form id='w2' options={this.getOptions1()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} onFocus={formFocus} onBlur={formBlur} />
          <WhiteSpace  style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
          <Form id='w3' options={this.getOptions2()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} onFocus={formFocus} onBlur={formBlur} />
          <WhiteSpace  style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
          <Form id='w4' options={this.getOptions3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} onFocus={formFocus} onBlur={formBlur}  />
          <div style={{height: '1.04rem',lineHeight: '1.04rem',color: '#848484',fontSize: '0.34667rem',paddingLeft: '0.4rem',background: '#efeff4'}}><span>投资信息</span></div>
          <Form options={this.getOptions4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} onFocus={formFocus} onBlur={formBlur}  />
        </List>
      </div>
    )
  }
}
