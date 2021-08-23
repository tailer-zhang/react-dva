import React from 'react';
import Dic from '../../../../../utils/dictionary';
import { DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../../../../styles/trade/TradeSafeFilter.less';
import filterItemStyle from '../../utils/filterItem.less'

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
@createForm()
export default class FilterItem extends React.Component {
  static defaultProps = {
    mode: 'date',
    locale: cn ? enUs : zhCn,
  };
  constructor(props) {
    super(props);
    this.state = {
      tradCode: '',
      tradPubPriType: '',
      confStat: '',
    };
  }

  clickLi(item, key) {
    if (key === 'tradeCode') {
      this.setState({
        tradCode: item === this.state.tradCode ? '' : item,
      });
    }
    if (key === 'pubPriType') {
      this.setState({
        tradPubPriType: item === this.state.tradPubPriType ? '' : item,
      });
    }
    if (key === 'confStat2') {
      this.setState({
        confStat: item === this.state.confStat ? '' : item,
      });
    }
  }

  renderList(key, selectValue) {
    const dic = Dic.fetchDicList(key);
    return (
      <ul>
        {
          Object.keys(dic).map((item, index) => {
              let value = dic[item];
              let className = '';
              if (selectValue === item) {
                className = styles.li;
              }
              return (
                <li onClick={this.clickLi.bind(this, item, key)} className={className} key={index}> {value} </li>
              )
            }
          )
        }
      </ul>
    )
  }

  render() {
    const { close, form } = this.props;
    const { getFieldProps } = form;
    const { tradCode, tradPubPriType, confStat } = this.state;
    const CustomChildren = ({ extra, onClick, children }) => (
      <div
        onClick={onClick}
        className={filterItemStyle.datePicker}
      >
        {children}
        <span>{extra}</span>
      </div>
    );
    return (
      <div className={styles.total}>
        <div className={styles.right} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.padding}>
            <p>交易类型</p>
            <div className={styles.flex}>
              {this.renderList('tradeCode', this.state.tradCode)}
            </div>
          </div>
          <div className={styles.padding}>
            <p>公私募标识</p>
            <div className={styles.flex}>
              {this.renderList('pubPriType', this.state.tradPubPriType)}
            </div>
          </div>
          <div className={styles.padding}>
            <p>复核状态</p>
            <div className={styles.flex}>
              {this.renderList('confStat2', this.state.confStat)}
            </div>
          </div>
          <div className={filterItemStyle.durationStyle}>
            <p>申请日期范围</p>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="大于起始日期"
              {...getFieldProps('remitStartDate', {
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
              {...getFieldProps('remitEndDate', {
                initialValue: undefined,
              })}
              minDate={minDate}
              maxDate={maxDate}
            >
              <CustomChildren />
            </DatePicker>
          </div>
          <div className={styles.foot}>
            <div
              className={styles.reset}
              onClick={(e) => {
                e.preventDefault();
                this.props.form.resetFields();
                this.setState({ tradCode: '', tradPubPriType: '', confStat: '' })
              }}>重置</div>
            <div
              className={styles.submit}
              onClick={() => {
                const value = form.getFieldsValue();
                if (value.remitStartDate) {
                  value.remitStartDate = value.remitStartDate.format('YYYY-MM-DD')
                }
                if (value.remitEndDate) {
                  value.remitEndDate = value.remitEndDate.format('YYYY-MM-DD')
                }
                close({ ...value, tradCode, tradPubPriType, confStat });
              }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
