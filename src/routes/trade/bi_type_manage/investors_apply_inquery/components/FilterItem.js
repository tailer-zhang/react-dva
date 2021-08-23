import React from 'react';
import Dic from '../../../../../utils/dictionary';
import { createForm } from 'rc-form';
import styles from '../../../../../styles/trade/TradeSafeFilter.less';

@createForm()
export default class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confStat: '',
    };
  }

  clickLi(item, key) {
    if (key === 'confStat1') {
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
    const { confStat } = this.state
    return (
      <div className={styles.total}>
        <div className={styles.right} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.padding}>
            <p>审核状态</p>
            <div className={styles.flex}>
              {this.renderList('confStat1', this.state.confStat)}
            </div>
          </div>
          <div></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={() => { this.setState({ confStat: '' }) }}>重置</div>
            <div className={styles.submit} onClick={() => { close({ confStat }); }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
