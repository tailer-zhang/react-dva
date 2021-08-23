import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

const ErrorPage = () => {
  return (
      <div style={styles.wrap}>
        <div style={styles.imgWrap}>
          <img src={require("../image/icon/cry.png")} style={styles.imgSize}/>
        </div>
        <h2 style={styles.title0}>出错啦！</h2>
        <p style={styles.title1}>非常抱歉，页面加载失败！</p>
      </div>
  );
};
const styles = {
  wrap:{
    height:'100%',
    backgroundColor:'#f7f7f7'
  },
  imgWrap:{
    paddingTop:'309px',
    textAlign:'center',
    paddingBottom:'45px'
  },
  imgSize:{
    width:'224px',
    height:'290px'
  },
  title0:{
    fontSize:'64px',
    color:'#5c5c5c',
    textAlign:'center',
    marginBottom:'36px',
    fontFamily:'PingFang SC Medium'
  },
  title1:{
    fontSize:'36px',
    color:'#5c5c5c',
    textAlign:'center',
    fontFamily:'PingFang SC Regular'
  },
};

export default ErrorPage;
