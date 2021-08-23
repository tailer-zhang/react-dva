import React,{Component} from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List, } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/TradeSafeFilter.less';
import Form from '../../utils/form';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';

const cn = location.search.indexOf('cn') !== -1;
const now = moment();
const maxDate = now; //moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const Item = List.Item;
export default class TradeSafeFilter extends React.Component{
  static defaultProps = {
    mode: 'date',
    locale: cn ? enUs : zhCn,
  };
  constructor(props) {
		 super(props);
     let {filterArgs} = props;
     this.state = filterArgs;
	}

  renderList(key,selectValue) {
    let dic = Dic.fetchDicList(key);
    return (
      <ul>
        {
          Object.keys(dic).map((item,index) => {
              let value = dic[item];
              let className = '';
              if(selectValue === item) {
                className = styles.li;
              }
              return (
                <li onClick={this.clickLi.bind(this,item,key)}
                className={className} key={index}>{ value }</li>
              )
            }
          )
        }
      </ul>
    )
  }

  clickLi(item,key) {
    if(key==='tradeSafeFilter1') {
      this.setState({
          insureStat : item==this.state.insureStat?'':item
        });
    } else if (key==='tradeSafeFilter2') {
        this.setState({
          confStat : item==this.state.confStat?'':item
        });
      }
  }

  // onChangeMethord(item,value,name)
  // {
  //   let {dispatch} = this.props;
  //   let payload = {};
  //   payload[item] = value;
  //   dispatch({
  //     type:'formStorage/fetchFormValue',
  //     payload:payload
  //   });
  //   dispatch(routerRedux.goBack());
  // }

  // getOption1() {
  //   return({
  //     minCreateTime: {
  //       valueType:'date',
  //       title:'选择日期',
  //       mode:'date',
  //       extra:'可选,小于结束日期',
  //       minDate:minDate,
  //       maxDate:maxDate,
  //     },
  //   })
  // }
  //
  // getOption2() {
  //   return({
  //     maxCreateTime: {
  //       valueType:'date',
  //       title:'选择日期',
  //       mode:'date',
  //       extra:'可选,小于结束日期',
  //       minDate:minDate,
  //       maxDate:maxDate,
  //     },
  //   })
  // }

  render () {
    let {dispatch,onCloseMethord,filterArgs,form} = this.props;
    // console.log('formValue----',formValue);
    const { getFieldProps } = this.props.form;
    let {insureStat,confStat} = this.state;
    const CustomChildren = (props) => {
      return(
        <div
          onClick={props.onClick}
          style={{backgroundColor: '#ededed',width: '3.7867rem',height: '0.773rem',float: 'left',
          paddingLeft: '0.33rem',lineHeight: '0.773rem',borderRadius: '0.13rem',color: '#929292'}}
        >
          {props.children}
          <span>{props.extra}</span>
        </div>
      )
    };
    return(
      <div className={styles.total}>
        <div className={styles.right}>
          <div className={styles.padding}>
            <p>保单状态</p>
            <div className={styles.flex}>
              { this.renderList('tradeSafeFilter1',insureStat) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>保单录入日期</p>
            <div className={styles.createDate}>

                <DatePicker
                  mode="date"
                  title="选择日期"
                  extra="可选,小于结束日期"
                  {...getFieldProps('minCreateTime', {
                    initialValue:undefined,
                  })}
                  minDate={minDate}
                  maxDate={maxDate}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>
                <div style={{width: '0.293rem',height: '1px',backgroundColor: '#bebebe',
                  float: 'left',margin: '0.4rem 0.08rem 0'}}></div>
                <DatePicker
                  mode="date"
                  title="选择日期"
                  extra="可选,小于结束日期"
                  {...getFieldProps('maxCreateTime', {
                    initialValue: undefined,
                  })}
                  minDate={minDate}
                  maxDate={maxDate}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>

              {/*
                <div className={styles.minCreateTime}>
                  <Form options={this.getOption1()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                </div>
                <span>—</span>
                <div className={styles.maxCreateTime}>
                  <Form options={this.getOption2()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
                </div>
                */}

            </div>
          </div>
          <div className={styles.padding}>
            <p>审批状态</p>
            <div className={styles.flex}>
              { this.renderList('tradeSafeFilter2',confStat) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={()=>{
              this.setState({
                insureStat:'',
                confStat:'',
                maxCreateTime:undefined,
                minCreateTime:undefined});
              onCloseMethord({});
            }}>重置</div>
            <div className={styles.submit} onClick={()=>{
              let value = form.getFieldsValue();
              if(value.maxCreateTime)
              value.maxCreateTime = value.maxCreateTime.format('YYYY-MM-DD');
              if(value.minCreateTime)
              value.minCreateTime = value.minCreateTime.format('YYYY-MM-DD');
              onCloseMethord({insureStat,confStat,...value});
            }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

TradeSafeFilter = createForm()(TradeSafeFilter);
