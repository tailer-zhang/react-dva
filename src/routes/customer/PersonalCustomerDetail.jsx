// 个人客户详情页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import DetailInfoTabs from '../../components/customer/DetailInfoTabs';//信息内容详情切换组件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import {Link,routerRedux} from 'dva/router';
import {decryptStr} from '../../utils/createEncrypt';

const PersonalCustomerDetail = ({props,perCustInfo,dispatch,location}) => {
  const TitleProps = {
    title:'个人客户详情',
    showBack:'no'
  };
  let data = perCustInfo.perInfoList;
  if(data==undefined) data = {};

  // console.log('data----',data);

  let {progress,custSource} = location.state;
  // console.log("客户信息",custSource);
  return (
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps}>
        {
          data.curStat=='01'?
          <div className={PerCusDetailStyles.touchArea} onClick={(e)=>{
            // e.preventDefault();
            if(data != undefined || data != null) {
                dispatch(routerRedux.push({
                  pathname: '/personalLatentCustomerEdit',
                  state: {customer: data,detail: 'detail',mode:'edit'}
                }));
            }
          }}>
            <img src={require('../../image/icon/edit.png')} className={PerCusDetailStyles.editIcon}/>
          </div>
          :<div />
        }
      </Title>
      <div className={PerCusDetailStyles.infoTabs}>
        <DetailInfoTabs dispatch={dispatch} perCustInfo={perCustInfo} progress={progress} custSource={custSource} />
      </div>
    </div>
  );
};

function connectCustomerFunc({perCustInfo})
{
   return {perCustInfo};
}

export default connect(connectCustomerFunc)(PersonalCustomerDetail);
