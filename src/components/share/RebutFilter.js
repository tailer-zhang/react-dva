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
export default class RebutFilter extends React.Component{
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
    if(key==='tradCode') {
      this.setState({
          tradCode : item == this.state.tradCode? '':item,
        });
    }
  }

  render () {
    const {dispatch,onCloseMethord,filterArgs,trade,dataSource} = this.props;
    const props = this.props;
    const { getFieldProps } = this.props.form;
    const { tradCode } = this.state;
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
            <p>交易类型</p>
            <div className={styles.flex}>
              { this.renderList('tradCode',tradCode) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={()=>{
              this.setState({tradCode:'' })
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

RebutFilter = createForm()(RebutFilter);
