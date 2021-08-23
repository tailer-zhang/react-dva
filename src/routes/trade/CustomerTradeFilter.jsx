import React,{Component} from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List, } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/TradeSafeFilter.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';
import filterItemStyle from './bi_type_manage/utils/filterItem.less';

const cn = location.search.indexOf('cn') !== -1;
const maxDate = moment('2030-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const now = moment();

if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const Item = List.Item;
@createForm()
export default class CustomerTradeFilter extends React.Component{
  static defaultProps = {
    mode: 'date',
    locale: cn ? enUs : zhCn,
  };
  constructor(props) {
    super(props);
    this.state = {
      tradCode:'',
      confStat:'',
      signType:'',
      signFlag:''
    };
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
    if(key==='tradCode') {
      this.setState({
        tradCode :this.state.tradCode?'':item
      });
    } else if (key==='confStat') {
      this.setState({
        confStat : this.state.confStat?'':item
      })
    }else if(key === 'signType'){
      this.setState({
        signType : this.state.signType?'':item
      })
    } else if(key === 'signFlag'){
      this.setState({
        signFlag:this.state.signFlag?'':item
      })
    }
  }

  render () {
    const {onCloseMethord,isFilter,form} = this.props;
    // console.log('this.props==?',this.props)
    const { getFieldProps } = form;
    const props = this.props;
    const {tradCode,confStat,signType,signFlag} = this.state;
    // console.log('90=======',isFilter);
    const CustomChildren = (props) => {
      return(
        <div
          onClick={props.onClick}
          className={styles.datePicker}
        >
          {props.children}
          <span style={{}}>{props.extra}</span>
        </div>
      )
    };
    return(
      <div className={styles.total}>
        <div className={styles.right} style={{display: 'flex',flexDirection: 'column'}}>
          <div style={{flex:1,overflowY:'auto'}}>
            <div className={styles.durationStyle}>
              <p>到期日</p>
              <DatePicker
                mode="date"
                title="选择日期"
                extra="大于起始日期 "
                {...getFieldProps('productEndStartDate', {
                  initialValue: undefined,
                })}
                minDate={minDate}
                maxDate={maxDate}
              >
                <CustomChildren />
              </DatePicker>
              <span
                style={{ display: 'inline-block', width: '0.4rem', float: 'left', height: '1px', margin: '0.36rem' +
                    ' 2px', backgroundColor: '#929292' }}></span>
              <DatePicker
                mode="date"
                title="选择日期"
                extra="小于结束日期"
                {...getFieldProps('productEndEndDate', {
                  initialValue: undefined,
                })}
                minDate={minDate}
                maxDate={maxDate}
              >
                <CustomChildren />
              </DatePicker>
            </div>
            <div className={styles.padding}>
              <p>交易类型</p>
              <div className={styles.flex}>
                { this.renderList('tradCode',tradCode) }
              </div>
            </div>
            <div className={styles.padding}>
              <p>复核状态</p>
              <div className={styles.flex}>
                { this.renderList('confStat',confStat) }
              </div>
            </div>
            <div className={styles.padding}>
              <p>签署方式</p>
              <div className={styles.flex}>
                { this.renderList('signType',signType) }
              </div>
            </div>
            <div className={styles.padding}>
              <p>电子合同签署状态</p>
              <div className={styles.flex}>
                { this.renderList('signFlag',signFlag) }
              </div>
            </div>
            <div style={{height: '1.6rem'}}></div>
         </div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={()=>{
              // e.preventDefault();
              this.props.form.resetFields();
              this.setState({tradCode:'',confStat:'',signType:''});
            }}>重置</div>
            <div className={styles.submit}
                 onClick={()=>{
                   const value = form.getFieldsValue();
                   if (value.productEndStartDate) {
                     value.productEndStartDate = value.productEndStartDate.format('YYYY-MM-DD')
                   }
                   if (value.productEndEndDate) {
                     value.productEndEndDate = value.productEndEndDate.format('YYYY-MM-DD')
                   }
                   onCloseMethord({...value,tradCode,confStat,signType,signFlag});
                 }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

// CustomerTradeFilter = createForm()(CustomerTradeFilter);
