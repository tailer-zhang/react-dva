import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../../styles/product/emptyResult.less';

const EmptyResult = (props) => {
  return (
      <div className={styles.wrap} style={props.style}>
        <div className={styles.imgWrap}>
          <img src={require("../../image/icon/cry.png")} className={styles.imgSize}/>
        </div>
        <h2 className={styles.title0}>抱歉！</h2>
        <p className={styles.title1}>无符合条件的数据！</p>
      </div>
  );
};

export default EmptyResult;
