import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';

const Progress = (data) => {
  if(data==undefined) data={};
  let score = data.data;

  let isPercustomer = data.proCustomer;

  const W = document.body.clientWidth;
  let share = isPercustomer?105:35;
  const len = (W - 60) / share;
  console.log('len------',len);
    return (
      <div className={PerCusDetailStyles.progressWrap} style={{width:W,}}>{/*paddingRight:parseInt(W*0.0773)*/}
        {
          isPercustomer?<div className={PerCusDetailStyles.inProWrap}>
    				<div className={PerCusDetailStyles.pro1}>
    					<p className={PerCusDetailStyles.first}></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p className={PerCusDetailStyles.borderR0}></p>
    				</div>
            <div className={PerCusDetailStyles.scorBar}>
              <span>15</span>
              <span>30</span>
              <span>45</span>
              <span>60</span>
              <span>75</span>
              <span>90</span>
              <span>105</span>
              <p className={PerCusDetailStyles.scor16}>120</p>
            </div>
    				<div className={PerCusDetailStyles.pro2} style={{width:len*(score-15)+'px'}}></div>
    			</div>
          :<div className={PerCusDetailStyles.inProWrap}>
    				<div className={PerCusDetailStyles.pro1}>
    					<p className={PerCusDetailStyles.first}></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p></p>
    					<p className={PerCusDetailStyles.borderR0}></p>
    				</div>
            <div className={PerCusDetailStyles.scorBar}>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <p className={PerCusDetailStyles.scor16}>40</p>
            </div>
    				<div className={PerCusDetailStyles.pro2} style={{width:len*(score-5)+'px'}}></div>
    			</div>
        }
      </div>
    );
};
export default Progress;
