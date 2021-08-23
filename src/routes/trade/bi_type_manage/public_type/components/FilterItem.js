import React from 'react';
import Dic from '../../../../../utils/dictionary';
import { createForm } from 'rc-form';
import styles from '../../../../../styles/trade/TradeSafeFilter.less';

@createForm()
export default class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fundType: '',
      prodRiskLevel: '',
    };
  }

  clickLi(item, key) {
    if (key === 'fundType') {
      this.setState({
        fundType: item === this.state.fundType ? '' : item,
      });
    } else if (key === 'prodRiskLevel') {
      this.setState({
        prodRiskLevel: item === this.state.prodRiskLevel ? '' : item,
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
    const { fundType, prodRiskLevel } = this.state;
    return (
      <div className={styles.total}>
        <div className={styles.right} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.padding}>
            <p>基金类型</p>
            <div className={styles.flex}>
              {this.renderList('fundType', this.state.fundType)}
            </div>
          </div>
          <div className={styles.padding}>
            <p>风险等级</p>
            <div className={styles.flex}>
              {this.renderList('prodRiskLevel', this.state.prodRiskLevel)}
            </div>
          </div>
          <div></div>
          <div className={styles.foot}>
            <div className={styles.reset} onClick={() => { this.setState({ fundType: '', prodRiskLevel: '' }) }}>重置</div>
            <div className={styles.submit} onClick={() => { close({ fundType, prodRiskLevel }); }}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
