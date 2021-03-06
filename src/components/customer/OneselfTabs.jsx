import React,{Component} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import Form from '../../utils/form';
import styles from '../../styles/customer/personalCustAddMore.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const TabPane = Tabs.TabPane;
const Item = List.Item;
var arr = [];

class OneselfTabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: zhNow,
      dpValue: null,
      visible: false,
    }
    this._ifIn = false
  }

  switchOnChange(key,value)
  {
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
    console.log("click each checkbox to log the value ",newArr.join(''));/*?????????????????????*/
  }

  getOption1() {
    let recommendOptions = {};
    let {formValue,form,onChangeMethord,dispatch,customer,formStorage,detail} = this.props;
    if(formValue.isfmanForMember)
      recommendOptions = {
        relationCust:{
          valueType:'selfSelect',
          title:'????????????',
          desc:'????????????',
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
            }}));
          }
        },
        relationMobile: {
          required: true,
          trigger:'onBlur',
          validatorType:'phone',
          errMsg:'????????????????????????!',
          desc:'????????????'
        },
        relation:{
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('relation'),
          title:'??????????????????',
          desc:'??????????????????'
        }
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
              errMsg:'??????????????????!',
              desc:'?????????'
            }
        };

        let certEndDateStruct = {
          required:true,
          valueType:'date',
          desc:'???????????????',
          title:'????????????',
          mode:'date',
          extra:'??????,??????????????????',
          minDate:minDate,
          maxDate:maxDate,
        };
        if(formValue.long)
          certEndDateStruct = {
            valueType:'selfSelect',
            title:'???????????????',
            desc:'???????????????',
            extra:'????????????',
            arrow:'empty'
          };

      let recordOptions = {};
      if(formValue.badRecords){
              recordOptions = {
                  recordDesc:{
                    required:true,
                    trigger:'onBlur',
                    numberOfLines:0,
                    validatorType:'length300',
                    errMsg:'????????????????????????????????????1~300!',
                    desc:'????????????????????????'
                  },
              };
        }

      return({
          custName: {
            required:true,
            type:'text',
            trigger:'onBlur',
            validatorType:'name',
            errMsg:'??????????????????!',
            initialValue:formValue.custName,
            desc:'??????',
            /*otherProps:{
                onBlur:(value)=>{
                    if(value){
                        form.setFieldsValue({
                            actualControl:value,
                            actualBenefit:value,
                        });
                        dispatch(
                            {
                                type:'formStorage/fetchFormValue',
                                payload:{
                                    actualControl:value,
                                    actualBenefit:value,
                                }
                            }
                        );

                    }

                }
            }*/
          },
        isControl:{
          required: true,
          valueType:'switch',
          desc:'??????????????????????????????',
          onChangeMethord:(value)=>this.switchOnChange('isControl',value)
        },
        actualControl:{
          // required: formValue.isControl,
          trigger: 'onBlur',
          numberOfLines: 0,
          validatorType: 'length300',
          errMsg:'??????????????????????????????!',
          desc:'?????????'
        },
        isBenefitSelf:{
          required: true,
          valueType:'switch',
          desc:'??????????????????',
          onChangeMethord:(value)=>this.switchOnChange('isBenefitSelf',value)
        },
        actualBenefit:{
          // required: formValue.isBenefitSelf,
          trigger: 'onBlur',
          numberOfLines: 0,
          validatorType: 'length300',
          errMsg:'???????????????????????????!',
          desc:'?????????'
        },
        sex: {
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('gender'),
          title:'??????',
          desc:'??????'
        },
        remark1: {
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('custSource'),
          title:'????????????',
          desc:'????????????'
        },
          mobilePhone: {
            required:true,
            type: 'text',
            trigger:'onBlur',
            validatorType:'phone',
            errMsg:'??????????????????!',
            desc:'????????????'
          },
          custNameE: {
            required:false,
            type: 'text',
            desc:'?????????'
          },
          nationalityType: {
            required:true,
            valueType:'select',
            type:Dic.fetchDicList('nationality'),
            title:'????????????',
            desc:'????????????'
          },
          space1:{valueType:'whiteSpace'},
          certType: {
            required:true,
            valueType:'select',
            type:certType,
            title:'????????????',
            desc:'????????????'
          },
          certCode: {
            type:'text',
            required:true,
            trigger:'onBlur',
            validatorType:certCodeValidType,
            errMsg:'??????????????????!',
            desc:'????????????'
          },
          ...certDescOption,
          long:{
            valueType:'switch',
            desc:'??????????????????',
            justifyTrueValue:true,
            onChangeMethord:(value)=>this.longValueChange(value),
          },
          certEndDate:certEndDateStruct,
          space2:{valueType:'whiteSpace'},
          birthDay: {
            required:true,
            valueType:'date',
            desc:'????????????',
            title:'????????????',
            mode:'date',
            extra:'??????,??????????????????',
            minDate:minDate,
            maxDate:maxDate,
          },
          space3:{valueType:'whiteSpace'},
          marriage: {
            required:true,
            valueType:'select',
            type:Dic.fetchDicList('isMerry'),
            title:'????????????',
            desc:'????????????'
          },
          space4:{valueType:'whiteSpace'},
          residentCity: {
            required:true,
            type: 'text',
            desc:'????????????'
          },
          space5:{valueType:'whiteSpace'},
          nation: {
            required:true,
            type: 'text',
            desc:'??????'
          },
          space6:{valueType:'whiteSpace'},
          isfmanForMember: {
            required:true,
            valueType:'switch',
            desc:'????????????????????????',
            onChangeMethord:(value)=>this.switchOnChange('isfmanForMember',value)
          },
          ...recommendOptions,
          space10:{valueType:'whiteSpace'},
          badRecords:{
            required:true,
            valueType:'switch',
            desc:'????????????????????????',
            onChangeMethord:(value)=>this.switchOnChange('badRecords',value)
          },
          ...recordOptions,
          space7:{valueType:'whiteSpace'},
          isSecret: {
            required:true,
            valueType:'select',
            type:Dic.fetchDicList('isPrivary'),
            title:'?????????????????????????????????',
            desc:'?????????????????????????????????'
          },
          space8:{valueType:'whiteSpace'},
          list:{
              required:true,
              valueType:'selfSelect',
              title:'????????????',
              desc:'????????????',
              extra:(!formStorage.certPic||formStorage.certPic.length<=0)?'?????????????????????':'?????????',
              onClick:()=>{

                dispatch({
                  type:'formStorage/fetchFormValue',
                  payload:form.getFieldsValue()
                });
                dispatch(routerRedux.push({pathname:'/imageAdd',state:{edit:detail?'edit':'',memMaterial: formStorage.memPic,custID:customer.custID,custClass:customer.custClass}}));
              }
          },
          space9:{valueType:'whiteSpace'},
          remark: {
            required:false,
            type: 'text',
            desc:'??????'
          },
          space15:{valueType:'whiteSpace'},

    })
  }

  getOption2() {
      let {formValue,form,onChangeMethord,dispatch,customer,formStorage,detail} = this.props;
      let vocationOptions = {};
      if(formValue.vocation == '05'){
          vocationOptions = {
              vocationDesc:{
                required:true,
                trigger:'onBlur',
                errMsg:'',
                desc:'????????????'
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
                desc:'??????????????????'
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
                desc:'??????????????????'
              },
          };
      }


    return ({
      vocation:{
        valueType:'select',
        type:Dic.fetchDicList('vocation'),
        title:'??????',
        desc:'??????'
      },
      ...vocationOptions,
      space10:{valueType:'whiteSpace'},
      profession:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('profession'),
        title:'????????????',
        desc:'????????????'
      },
      ...professionOptions,
      space11:{valueType:'whiteSpace'},
      companyType:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('companyType'),
        title:'????????????',
        desc:'????????????'
      },
      ...companyOptions,
      space12:{valueType:'whiteSpace'},
    });
  }

  getOption3() {
    let {formValue,form,onChangeMethord,dispatch,customer,formStorage} = this.props;
    /*let familyAddressRequired = (formValue.postAddress=='1');
    let companyAddressRequired = (formValue.postAddress=='2');
    let otherAddressRequired = (formValue.postAddress=='3');*/
    return({
      email:{
        required:true,
        trigger:'onBlur',
        validatorType:'email',
        errMsg:'????????????!',
        desc:'????????????'
      },
      contactOrder: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('contactOrder'),
        title:'????????????',
        desc:'????????????'
      },
      postAddress: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('postAddress'),
        title:'????????????',
        desc:'????????????'
      },
      space1:{valueType:'whiteSpace'},
      familyAddress: {
        type: 'text',
        desc:'????????????'
      },
      familyPostCode: {
        type: 'text',
        desc:'????????????'
      },
      familyPhone: {
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'??????????????????!',
        desc:'????????????'
      },
      space1:{valueType:'whiteSpace'},
      companyAddress: {
        type: 'text',
        desc:'????????????'
      },
      companyPostCode: {
        type: 'text',
        desc:'????????????'
      },
      companyPhone: {
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'??????????????????!',
        desc:'????????????'
      },
      /*space2:{valueType:'whiteSpace'},
      otherAddress: {
        required:otherAddressRequired,
        type: 'text',
        desc:'????????????'
      },
      otherPostCode: {
        required:otherAddressRequired,
        type: 'text',
        desc:'????????????'
      },*/
      space3:{valueType:'whiteSpace'},
      linkMen: {
        required:true,
        type: 'text',
        desc:'???????????????'
      },
      linkPhone: {
        required:true,
        type: 'text',
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'??????????????????!',
        desc:'?????????????????????'
      },
      space4:{valueType:'whiteSpace'},
    })
  }

  getOption4() {
    return({
      mbrCertifyType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('mbrCertifyType'),
        title:'??????????????????',
        desc:'??????????????????'
      },
      ctCertifyType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('ctCertifyType'),
        title:'??????????????????',
        desc:'??????????????????'
      },
      importantReceive: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('importantReceive'),
        title:'????????????',
        desc:'????????????'
      },
    })
  }

  getOption5() {
    const dataSource = [
      {
        value: '01',
        label: '??????'
      },
      {
        value: '02',
        label: '????????????'
      },
      {
        value: '03',
        label: '????????????'
      },
      {
        value: '04',
        label: '????????????'
      },
      {
        value: '05',
        label: '??????'
      }
    ]
    return ({
      canInvestAsset:{
        valueType:'select',
        type:Dic.fetchDicList('canInvestAsset'),
        title:'????????????',
        desc:'????????????'
      },
      space26:{valueType:'whiteSpace'},
      sourceOfFunds:{
        valueType:'checkbox',
        title:'????????????',
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
    const {dispatch,defaultActiveKey,form,onChangeMethord,saveFormMethord,isScrollPositioned,offsetYDic} = this.props;
    let { formValue } = this.props, activeKey = defaultActiveKey;
    if(activeKey==undefined)
     activeKey = '1';
    if(formValue==undefined) {
      formValue = {};
    }
    if(formValue.sourceOfFunds&&(formValue.sourceOfFunds.indexOf(',') !== -1)&&!this._ifIn){
      // console.log('y????????????y????????????y????????????y????????????y????????????y????????????')
      this._ifIn = true
      arr = formValue.sourceOfFunds.split(',')

    }else if (formValue.sourceOfFunds&&!this._ifIn){
      // console.log('2222222222222222222222222222')
      this._ifIn = true
      arr = new Array(formValue.sourceOfFunds)
    }

    if(formValue.isControl===undefined ||formValue.isControl==='' || formValue.isControl ==='02'){
      formValue.isControl=false;
    }
    if(formValue.isBenefitSelf===undefined || formValue.isBenefitSelf==='' || formValue.isBenefitSelf ==='01'){
      formValue.isBenefitSelf=true;
    }
    console.log("formValue.isControl======",formValue.isControl);
    return (
      <div style={{marginTop: '0.26667rem'}}>
        <Tabs activeKey={activeKey} swipeable={false} className={isScrollPositioned?styles.tabFixed:undefined}
            onChange={(activeKey)=>{
                document.getElementById('boxScorll').scrollTo(0,offsetYDic[activeKey]);
                dispatch({type:'formStorage/fetch',payload:{activeKey:activeKey}});
        }}>
          <TabPane tab="????????????" key='1'>
          </TabPane>
          <TabPane tab="????????????" key='2'>
          </TabPane>
          <TabPane tab="????????????" key='3'>
          </TabPane>
          <TabPane tab="????????????" key='4'>
          </TabPane>
        </Tabs>
        <List>
            <Form id="w1" options={this.getOption1()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
            <Form id="w2" options={this.getOption2()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
            <Form id="w3" options={this.getOption3()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
            <Form id="w4" options={this.getOption4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
            <div style={{height: '1.067rem',fontSize: '0.3467rem',backgroundColor: '#efeff4',
                  color: '#848484',lineHeight: '1.067rem',paddingLeft: '0.4rem'}}>????????????</div>
            <Form  options={this.getOption5()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
        </List>
      </div>
    )
  }
}

export default connect()(createForm()(OneselfTabs));
