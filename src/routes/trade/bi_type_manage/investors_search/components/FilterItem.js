import React from 'react';
import Dic from '../../../../../utils/dictionary';
import { createForm } from 'rc-form';
import styles from '../../../../../styles/trade/TradeSafeFilter.less';

@createForm()
export default class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleOrg: '',
    };
  }

  clickLi(item, key) {
    if (key === 'saleOrg') {
      this.setState({
        saleOrg: item === this.state.saleOrg ? '' : item,
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
              <li onClick={this.clickLi.bind(this, item, key)} className={className} key={index}>{value}</li>) }
          )
        }
      </ul>
    )
  }

  render() {
    const { close, form } = this.props;
    const { getFieldProps } = form;
    const { saleOrg } = this.state
    return (
      <div className={styles.total}>
        <div className={styles.right} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.padding}>
            <p>销售机构</p>
            <div className={styles.flex}>
              {this.renderList('saleOrg', this.state.saleOrg)}
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={() => { this.setState({ saleOrg: '' }) }}>重置</div>
            <div className={styles.submit} onClick={() => { close({ saleOrg }); }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
