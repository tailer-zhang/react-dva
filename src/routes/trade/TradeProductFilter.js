import React,{Component} from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker,InputItem,List, } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/TradeProductFilter.less';
import Form from '../../utils/form';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';
import * as Commons from '../../utils/commonUtil';

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

  renderList(list,selectValue) {
    return (
      <ul>
        {
          list.map((item,index)=>{
            console.log('item',item)
            let value = item.name;
            let className = '';
                if(selectValue === item) {
                  className = styles.li;
                }
                  return (
                    <li onClick={this.clickLi.bind(this,item)}
                        style={{ }}
                        className={className}
                        key={index}> { value }</li>
                  )
          }
          // Object.keys(dic).map((item,index) => {
          //     let value = dic[item];
          //     let className = '';
          //     if(selectValue === item) {
          //       className = styles.li;
          //     }
          //     return (
          //       <li onClick={this.clickLi.bind(this,item,key)}
          //       className={className} key={index}>{ value }</li>
          //     )
          //   }
          )
        }
      </ul>
    )
  }

  clickLi(item,key) {
      this.setState({
          insureStat : item==this.state.insureStat?'':item
        });
  }


  render () {

    let {dispatch,onCloseMethord,filterArgs,form,tradeProNameSelect} = this.props;
    console.log('this.props--22--',this.props);
    let list = tradeProNameSelect;
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
            <p>产品供应商</p>
            <div>
              { this.renderList(list,insureStat) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={()=>{
              this.setState({
                insureStat:'',
                confStat:'',
              });
              onCloseMethord({});
            }}>重置</div>
            <div className={styles.submit} onClick={()=>{
              let value = form.getFieldsValue();
              onCloseMethord({insureStat,confStat,...value});
            }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}

TradeSafeFilter = createForm()(TradeSafeFilter);
