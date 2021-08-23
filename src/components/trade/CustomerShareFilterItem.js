import React from 'react';
import Dic from '../../utils/dictionary';
import { DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/TradeSafeFilter.less';
import filterItemStyle from '../../routes/trade/bi_type_manage/utils/filterItem.less'

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
export default class CustomerShareFilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tradCode: '',
    };
  }

  clickLi(item, key) {
    if (key === 'refundReson') {
      this.setState({
        tradCode: item === this.state.tradCode ? '' : item,
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
              if (selectValue === item) { className = styles.li; }
              return (
                <li onClick={this.clickLi.bind(this, item, key)} className={className} key={index}>{value}</li>
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
    const { tradCode, prodRiskLevel } = this.state;
    return (
      <div className={styles.total}>
        <div className={styles.right} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.padding}>
            <p>划款原因</p>
            <div className={styles.flex}>
              {this.renderList('refundReson', this.state.tradCode)}
            </div>
          </div>
          <div className={styles.padding}>
            <p></p>
            <div className={styles.flex}>
            </div>
          </div>
          <div></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={() => { this.setState({ tradCode: ''}) }}>重置</div>
            <div className={styles.submit} onClick={() => { close({ tradCode }); }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
