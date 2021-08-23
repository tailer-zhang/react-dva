import React,{Component} from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List, } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/tradeSafeFilter.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';

const cn = location.search.indexOf('cn') !== -1;
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const now = moment();

if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const Item = List.Item;
export default class TradePositionInfoFilter extends React.Component{
  static defaultProps = {
    mode: 'date',
    locale: cn ? enUs : zhCn,
  };
  constructor(props) {
		 super(props);
     let filterArgs = props;
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
    if(key==='approveState') {
      this.setState({
          numberType0 : item == this.state.numberType0?'':item
        });
    } else if (key==='orderTypes') {
        this.setState({
          numberType1 : item == this.state.numberType1?'':item
        });
      } else if (key==='reviewState') {
          this.setState({
            numberType2 : item == this.state.numberType2?'':item
          });
        }
  }

  render () {
    const {dispatch,onCloseMethord,filterArgs} = this.props;
    const props = this.props;
    const {numberType0,numberType1,numberType2} = this.state;
    // let filterArgs = this.state;
    const { getFieldProps } = this.props.form;
    const CustomChildren = (props) => {
      return(
        <div
          onClick={props.onClick}
          style={{backgroundColor: '#ededed',width: '284px',height: '58px',float: 'left',
          paddingLeft: '25px',lineHeight: '58px',borderRadius: '10px',color: '#929292'}}
        >
          {props.children}
          <span style={{}}>{props.extra}</span>
        </div>
      )
    };
    return(
      <div className={styles.total}>
        <div className={styles.right} style={{display: 'flex',flexDirection: 'column'}}>
          <div className={styles.padding}>
            <p>保单录入日期</p>
            <div>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="可选,小于结束日期"
              {...getFieldProps('date1', {
                initialValue: now,
              })}
              minDate={minDate}
              maxDate={maxDate}
            >
              <CustomChildren></CustomChildren>
            </DatePicker>
            <div style={{width: '22px',height: '1px',backgroundColor: '#bebebe',
              float: 'left',margin: '30px 6px 0'}}></div>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="可选,小于结束日期"
              {...getFieldProps('date2', {
                initialValue: now,
              })}
              minDate={minDate}
              maxDate={maxDate}
            >
              <CustomChildren></CustomChildren>
            </DatePicker>
            </div>
          </div>
          <div className={styles.padding}>
            <p>审批状态</p>
            <div className={styles.flex}>
              { this.renderList('approveState',numberType0) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>预约类型</p>
            <div className={styles.flex}>
              { this.renderList('orderTypes',numberType1) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={()=>{
              this.setState({numberType0:'',numberType1:'',numberType2:''});
              onCloseMethord({});
            }}>重置</div>
            <div className={styles.submit} onClick={()=>{
              onCloseMethord(this.state);
            }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

TradePositionInfoFilter = createForm()(TradePositionInfoFilter);
