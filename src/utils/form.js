import React,{Component} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker,Toast,TextareaItem,Picker,Checkbox, Flex } from 'antd-mobile';
import Dic from './dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { routerRedux } from 'dva/router';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { createForm } from 'rc-form';
import {validateValue,exceptSpecialType} from './ValidateType';
import {getTime} from './getNowDate'

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const defaultDate = moment(getTime(), 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);
const CheckboxItem = Checkbox.CheckboxItem;

import styles from '../styles/form.less';
import SelfPicker from './SelfPicker';
import tradeInfo from '../styles/trade/redeem.less';

function transformData(data){
   if(!data){
       return [];
   }
   let transData = [];
   for(let prop in data){
     if (data[prop] === '理财师')
     {transData.splice(0, 0, {
       label:data[prop],
       value:prop,
     });
      continue;
     }
     transData.push({
       label:data[prop],
       value:prop,
     });
   }
   return transData;
}

export default class Form extends Component {
  constructor(props) {
     super(props);
     this.state = {
       ifChecked: false
     }
  }

  validInput(type,errMsg,rule, value, callback)
  {
    if(!rule.required)
    {
      callback();
      return;
    }
    else if(type==undefined)
    {
      if(!value)
        callback([new Error(errMsg?errMsg:'必输项错误!')]);
      else callback();
      return;
    }
    if(typeof(type)=='object')
    {
       if(value&&type[value])
          callback();
       else callback([new Error(errMsg?errMsg:'参数非法!')]);
    }
    else if(value&&typeof(value)=='string')
    {
      if(validateValue(type,value.replace(/(^\s*)|(\s*$)/g, "")))
        callback();
      else callback([new Error(errMsg?errMsg:'参数非法!')]);
    }
    else if(value&&validateValue(type,value))
    {
      callback();
    }
    else {
      callback([new Error(errMsg?errMsg:'参数非法!')]);
    }
  }


  errorClick(key)
  {
    const { getFieldProps,getFieldError} = this.props.form;
    let err = getFieldError(key);
    Toast.fail(err,1);
  }


  renderForm(formOptions,infoValues)
  {

    let {formValue,form,onChangeMethord,dispatch,saveFormMethord,onFocus,onBlur,onChange,ifcheck} = this.props;
    if(infoValues==undefined){
      infoValues = formValue;
    }

    const { getFieldProps,getFieldError,setFieldsValue} = form;
    return (
          Object.keys(formOptions).map((item,index)=>{
            let option = formOptions[item];
             if(option.valueType=='select')
             {

                 const data = transformData(option.type);
                 return (
                     <SelfPicker key={item} data={data} cols={1}
                          title={option.title}
                          disabled={option.disabled}
                          {...getFieldProps(item,{
                           rules: [{
                             required:option.required,
                             validator: this.validInput.bind(this,option.type,option.errMsg?option.errMsg:option.desc+'非法!'),
                             }],
                             initialValue:infoValues[item],
                             getValueFromEvent:(value)=>{
                                console.log(data, value)
                                 let returnValue = value.join(',');
                                 if(option.backMethod){
                                   option.backMethod(returnValue||data.length<1?returnValue:data[0].value)
                                 }
                                 return returnValue||data.length<1?returnValue:data[0].value;
                             }
                            })}
                            // onChange={option.onChange()}
                            {...option.otherProps}
                            >
                            <List.Item
                                  style={{borderBottom:'1PX solid #dedede'}}
                                  error={getFieldError(item)}
                                  extra={getFieldError(item)?'*':option.type[infoValues[item]]}
                                  arrow={option.disabled?"empty":"horizontal"}
                            >{option.desc}</List.Item>
                    </SelfPicker>
                 );
            //   return (<List.Item
                    // {...getFieldProps(item,{
                    //   rules: [{
                    //     required:option.required,
                    //     validator: this.validInput.bind(this,option.type,option.errMsg),
                    //     }],
                    //   initialValue:infoValues[item]
                    // })}
            //       key={index}
            //       type="text"
            //       error={getFieldError(item)}
            //       extra={getFieldError(item)?'*':option.type[infoValues[item]]}
            //       arrow={option.disabled?"empty":"horizontal"}
            //       {...option.otherProps}
            //       onClick={option.disabled?undefined:(e) =>{
            //         // e.preventDefault();
              //
            //         if(saveFormMethord)
            //           saveFormMethord(form.getFieldsValue());
            //         else dispatch({
            //           type:'formStorage/fetchFormValue',
            //           payload:form.getFieldsValue()
            //         });
            //         dispatch(routerRedux.push({pathname:'/MarketMonth',state:{
            //             title:option.title,
            //             dataSource:option.type,
            //             selectValue:infoValues[item],
            //             onChange:(value,name)=>{
            //               onChangeMethord(item,value,name);
            //             }
            //           }}));
            //       }}
            //     >{option.desc}</List.Item>);
             }
             else if(option.valueType=='whiteSpace')
             {
               return <WhiteSpace key={item} size="md" style={{background: '#efeff4'}}
                 {...option.otherProps}/>;
             }
             else if(option.valueType=='switch')
             {
               let justifyTrueValue = option.justifyTrueValue;
               if(justifyTrueValue==undefined)
                  justifyTrueValue = true;
              //  infoValues[item] = infoValues[item]=='02'?true:infoValues[item];
              //  console.log("infoValues.isControl=====",infoValues.isControl);
               return (

                 <List.Item
                   key={item}
                   extra={<Switch
                   {...getFieldProps(item, {
                          initialValue:infoValues[item],
                          valuePropName: 'checked',
                        })}
                    onChange={option.onChangeMethord}
                    {...option.otherProps}
                   />}>{option.desc}</List.Item>

               );
             }
             else if(option.valueType=='selfSelect')
             {
               let arrow = 'horizontal';
               if(option.arrow=='empty')
                  arrow = undefined;

               let onClick = undefined;
               if(option.onClick)
                 onClick = (e)=>{
                //  e.preventDefault();
                 if(saveFormMethord)
                   saveFormMethord(form.getFieldsValue());
                 else   dispatch({
                   type:'formStorage/fetchFormValue',
                   payload:form.getFieldsValue()
                 });
                 option.onClick();
               };
               return (<List.Item
                   className={option.changeType == 'modify' ? styles.moveLeft : null}
                   key={item}
                   type="text"
                   arrow={arrow}
                   onClick={onClick}
                   extra={option.extra!=undefined?option.extra:infoValues[item]}
                   {...option.otherProps}
                 >{option.desc}</List.Item>);
             }
             else if(option.valueType=='date')
             {
               let dateValue = infoValues[item];
               let format = option.format;
               if(!format)
                  format= 'YYYY-MM-DD';
               let momentDate;
               if(!dateValue)
                  momentDate = '';
               else if(typeof(dateValue)=='string')
               {
                 momentDate = moment(dateValue, format);
                 momentDate = momentDate.isValid()?momentDate.utcOffset(8):zhNow;
               }
               else momentDate = dateValue;
               return (
                 <DatePicker key={item}
                   mode={option.mode}
                   title={option.title}
                   extra={option.extra}
                   {...getFieldProps(item,{
                     rules: [{
                         required:option.required,
                         validator: this.validInput.bind(this,option.type,option.errMsg?option.errMsg:option.desc+'非法!'),
                     }],
                     initialValue:momentDate,
                   })}
                   minDate={option.minDate}
                   maxDate={option.maxDate}
                   disabled={option.disabled}
                   {...option.otherProps}
                   format={(value)=>{
                     return value.format(format);
                   }}
                 >
                  <List.Item  error={getFieldError(item)} extra={getFieldError(item)?'*':dateValue}>{option.desc}</List.Item>
                 </DatePicker>
               );
             }
             else if(option.valueType=='selfDiv')
             {
               return option.value;
             }
             else if(option.numberOfLines===0||option.numberOfLines>1)
             {
               let heightParam = {};
               if(option.numberOfLines==0)
                 heightParam={autoHeight:true};
               else  heightParam={rows:option.numberOfLines};
                 return (
                   <TextareaItem
                     {...getFieldProps(item,{
                       validateTrigger:option.trigger?option.trigger:'onBlur',
                       rules: [
                         {
                           validator: this.validInput.bind(this,option.validatorType,option.errMsg),
                           trigger: option.trigger?option.trigger:'onBlur',
                           required: option.required
                         },
                       ],
                       initialValue:infoValues[item]
                     })}
                     key={item}
                     count={option.countLimits ? option.countLimits : null}
                     onBlur={onBlur}
                     onFocus={onFocus}
                     {...option.otherProps}
                     title={option.desc}
                     {...heightParam}
                     type={option.type?option.type:'text'}
                     error={getFieldError(item)}
                     placeholder={option.placeholder}
                     onErrorClick={this.errorClick.bind(this,item)}
                   />
                 );
              }
             else if(option.valueType=='checkbox')
             {
                let data = option.data;
                let arr = infoValues.sourceOfFunds ? infoValues.sourceOfFunds.split(',') : []
                 return (<div key={item} className={styles.checkbox} style={option.styles}>
                    <List renderHeader={option.title}>
                      {data.map(i => (
                        <div key={i.value} style={option.itemStyles}>
                          <CheckboxItem checked = {arr.length > 0&&arr.find((it)=>{return it === i.value}) ? true : false}
                            {...getFieldProps(item, {
                              initialValue:infoValues[item],
                              // valuePropName:'checked',
                             })}
                            onChange={()=>{
                             option.onChangeMethord(i.value)
                            }}
                          >
                            {i.label}
                          </CheckboxItem>
                        </div>
                      ))}
                    </List>
                  </div>
                 );
              }
              else if(option.valueType=='none') {return null}
              else if(option.valueType=='bankToChange'){
               return (
                 <InputItem
                   {...getFieldProps(item,{
                     validateTrigger:option.trigger?option.trigger:'onBlur',
                     rules: [
                       {
                         validator: this.validInput.bind(this,option.validatorType,option.errMsg),
                         trigger:option.trigger?option.trigger:'onBlur',
                         required: option.required
                       },
                     ],
                     initialValue:infoValues[item]
                   })}
                   key={item}
                   {...option.otherProps}
                   onBlur={onBlur}
                   onChange={onChange}
                   value={option.changeValue}
                   type={option.type?option.type:'text'}
                   error={getFieldError(item)}
                   onErrorClick={this.errorClick.bind(this,item)}
                 >{option.desc}</InputItem>
               );
              }else if(option.valueType==='checked'){
                  return (
                    <div className={tradeInfo.alertMsg} key={'s'}>
                      <p>亲爱的海银家人，根据合同约定，快速赎回T日（赎回有效申请日）到账，管理人收取赎回份额万五比例的手续费</p>
                      <div className={tradeInfo.checkboxItem} onClick={()=>{
                      this.setState({ifChecked: !this.state.ifChecked})
                        ifcheck(!this.state.ifChecked)
                    }}>
                     <img src={this.state.ifChecked?require('../image/trade/redeem1.png'):require('../image/trade/redeem0.png')}/><span>我已阅读并且同意</span>
                    </div>
                   </div>
                  )
             }
              else
              {
               return (
               <InputItem disabled={option.disabled?option.disabled:false}
                 {...getFieldProps(item,{
                   validateTrigger:option.trigger?option.trigger:'onBlur',
                   rules: [
                     {
                       validator: this.validInput.bind(this,option.validatorType,option.errMsg),
                       trigger:option.trigger?option.trigger:'onBlur',
                       required: option.required
                     },
                   ],
                   initialValue:option.extra!=undefined?option.extra:infoValues[item]
                 })}
                 className={option.changeType == 'modify' ? styles.itemToLeft : null}
                 key={item}
                 onBlur={onBlur}
                 onFocus={onFocus}
                 {...option.otherProps}
                 placeholder={option.placeholder}
                 type={option.type?option.type:'text'}
                 error={getFieldError(item)}
                 onErrorClick={this.errorClick.bind(this,item)}
               >{option.desc}</InputItem>
             );
           }
          })

    );
  }
  componentDidMount() {
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
      // console.log("键盘收起");
      let isClose = {
        type: "keyBoardClose"
      }
      // console.log("55555",isClose)
      window.parent.postMessage(isClose,'*');
    });

  }

  render()
  {
    let {options,infoValues,id} = this.props;
    // console.log("infoValues========",infoValues);
     return (<div id={id}>
       {this.renderForm(options,infoValues)}
       </div>);
  }
}
