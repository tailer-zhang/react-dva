import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory, } from 'dva/router';
import {fmoney} from '../../../utils/formatUtils';
import styles from '../../../styles/trade/vpShare/vplist.less';

const SearchBarT = (props) => {
  let {data} = props;
  return (
    <div className={styles.searchBar}>
      <input type="search"  placeholde="产品名称"/>
		</div>
  );
};
export default SearchBarT;
