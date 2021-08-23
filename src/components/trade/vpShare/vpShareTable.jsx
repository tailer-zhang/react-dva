import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../../../styles/trade/vpShare/vplist.less';
import {routerRedux} from 'dva/router';

const Tbody = (props) => {
  let {data} = props;
  return (
    <div>
      <div className={styles.tBody}>
        <p className={styles.branchComp}>{data.branchName}</p>
        <section>
          <p>{data.totAmt}</p>
          <p>{data.useVpAmt}</p>
          <p>{data.useVpCont}</p>
          <p>{data.reserveAmt}</p>
          <p>{data.reserveCont}</p>
          <p>{data.tradeAmt}</p>
          <p>{data.tradeCont}</p>
        </section>
      </div>
    </div>
  );
};


class VpShareTable extends Component {
constructor(props) {
   super(props);

}
  render()
  {
      let {list} = this.props;

    return (
      <div className={styles.vPtable}>
        <div className={styles.tHeader}>
          <p className={styles.branchComp}>分公司</p>
          <p>分公司总额度(万)</p>
          <p>使用VP额度(万)</p>
          <p>使用VP合同数(份)</p>
          <p>预约总额度(万)</p>
          <p>预约总合同数(份)</p>
          <p>产品总签单金额(万)</p>
          <p>产品签单合同数(份)</p>
        </div>
        {
          list.map((item,index)=>{
              return (
                  <Tbody key={index} data={item} />
              );
          })
        }
      </div>
    );
  }
};



export default VpShareTable;
