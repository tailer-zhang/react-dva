import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../../../styles/trade/vpShare/sliderTable.less';
import {routerRedux} from 'dva/router';

const Tbody = (props) => {
  let {data} = props;
  return (
    <div>
      <div>
        <p>上海分公司</p>
        <section>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </section>
      </div>
    </div>
  );
};


class SliderTable extends Component {
constructor(props) {
   super(props);

}
  render()
  {
      let {list} = this.props;

    return (
      <div className={styles.table}>
        <div className={styles.aside}>
          <p className={styles.branchComp}>分公司<span></span></p>
          <p className={styles.branchName}>上海分公司<span></span></p>
          <p className={styles.branchName}>上海分公司<span></span></p>
        </div>
        <div className={styles.tableData}>
          <div className={styles.tHeader}>
            <p>分公司总额度(万)</p>
            <p>使用VP额度(万)</p>
            <p>使用VP合同数(份)</p>
            <p>预约总额度(万)</p>
            <p>预约总合同数(份)</p>
            <p>产品总签单金额(万)</p>
            <p>产品签单合同数(份)</p>
          </div>
          <div className={styles.tBody}>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
          </div>
          <div className={styles.tBody}>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
            <p>100.00</p>
          </div>
        </div>
      </div>
    );
  }
};



export default SliderTable;
