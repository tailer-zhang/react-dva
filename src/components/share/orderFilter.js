import React,{Component} from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from '../../utils/form';

import styles from '../../styles/trade/TradeSafeFilter.less';

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
class OrderFilter extends React.Component{
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
    if(key==='approveState') {
      this.setState({
          chkStat : item == this.state.chkStat? '':item,
        });
    } else if (key==='orderTypes') {
        this.setState({
          orderType :item==this.state.orderType ? '':item,
        });
      }
  }
  // onchange1(value){
  //   this.setState({
  //     reserveStartDateStr:value,
  //   })
  // }
  // onchange2(value){
  //   this.setState({
  //     reserveEndDateStr:value,
  //   })
  // }

  render () {
    const {dispatch,onCloseMethord,filterArgs,dataSource,form} = this.props;
    const { getFieldProps } = form;
    const { orderType,chkStat } = this.state;
    const CustomChildren = (props) => {
      return(
        <div
          onClick={props.onClick}
          style={{backgroundColor: '#ededed',width: '3.786rem',height: '0.773rem',float: 'left',
          paddingLeft: '0.333rem',lineHeight: '0.773rem',borderRadius: '0.133rem',color: '#929292'}}
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
            <p>预约时间范围</p>
                <DatePicker
                  mode="date"
                  title="选择日期"
                  extra="小于结束日期"
                  {...getFieldProps('reserveStartDateStr', {
                    initialValue: undefined,
                  })}
                  style={{textAlign:'center'}}
                  minDate={minDate}
                  maxDate={maxDate}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>
                <span style={{display:'inline-block',width:'0.4rem',float:'left',height:'1px',margin:'0.36rem 2px',backgroundColor:'#929292'}}></span>
                <DatePicker
                  mode="date"
                  title="选择日期"
                  extra="大于起始日期"
                  {...getFieldProps('reserveEndDateStr', {
                    initialValue: undefined,
                  })}
                  minDate={minDate}
                  maxDate={maxDate}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>

          </div>
          <div className={styles.padding}>
            <p>审批状态</p>
            <div className={styles.flex}>
              { this.renderList('approveState',chkStat) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>预约类型</p>
            <div className={styles.flex}>
              { this.renderList('orderTypes',orderType) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={(e)=>{
              e.preventDefault();
              this.props.form.resetFields();
              this.setState({ orderType:'',chkStat:'',reserveStartDateStr:'',reserveEndDateStr:''});
              onCloseMethord({});
            }}>重置</div>
          <div className={styles.submit} onClick={(e)=>{
                // e.preventDefault();
                let value = form.getFieldsValue();
                if(value.reserveStartDateStr)
                value.reserveStartDateStr = value.reserveStartDateStr.format('YYYY-MM-DD')
                if(value.reserveEndDateStr)
                value.reserveEndDateStr = value.reserveEndDateStr.format('YYYY-MM-DD')
              onCloseMethord({orderType,chkStat,...value});
            }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

OrderFilter = createForm()(OrderFilter);

export default OrderFilter;
