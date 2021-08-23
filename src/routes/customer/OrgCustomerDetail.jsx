// 机构客户详情页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link ,routerRedux} from 'dva/router';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import OrgComplexInfo from '../../components/customer/OrgComplexInfo';//综合信息
import OrgBasicInfo from '../../components/customer/OrgBasicInfo';//基本信息
import OrgContact from '../../components/customer/OrgContact';//联系方式
import OrgService from '../../components/customer/OrgService';//服务方式
import Progress from '../../components/customer/Progress';//进度条
import {decryptStr} from '../../utils/createEncrypt';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件

const TabPane = Tabs.TabPane;
const OrgCustomerDetail = ({dispatch,instiCustInfo}) => {
  let dataObj = instiCustInfo.instiInfo;
  let dataHold = instiCustInfo.holdPropertyObj;

  console.log('dataObj------',dataObj);

  if(dataHold==undefined) dataHold = {};
  if(dataObj==undefined) dataObj = {};

  let data = {
              ...dataObj,
              linkMobilePhone:decryptStr(dataObj.linkMobilePhone),
              long:(dataObj.certEndDate=='9999-12-31'),
              linkPhone:decryptStr(dataObj.linkPhone),
              linkFax:decryptStr(dataObj.linkFax),
              linkEmail:decryptStr(dataObj.linkEmail),
              deciMobilePhone:decryptStr(dataObj.deciMobilePhone),
              deciPhone:decryptStr(dataObj.deciPhone),
              deciFax:decryptStr(dataObj.deciFax),
              deciEmail:decryptStr(dataObj.deciEmail),
              finaMobilePhone:decryptStr(dataObj.finaMobilePhone),
              finaPhone:decryptStr(dataObj.finaPhone),
              finaFax:decryptStr(dataObj.finaFax),
              finaEmail:decryptStr(dataObj.finaEmail)
              }

  const TitleProps = {
    title:'机构客户详情'
  };

  return (
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps}>
        {
          data.curStat=='01'?
          <div className={PerCusDetailStyles.touchArea} onClick={(e)=>{
            // e.preventDefault();
            let orgData = dataObj;
            orgData.custID = dataObj.busiID;
            if(orgData != undefined || orgData != null) {
              dispatch(routerRedux.push({
                pathname: '/orgCusAddMore',
                state: {orgCust: orgData,detail:'detail',
                  mode: 'edit'}
              }))
            }
          }}>
            <img src={require('../../image/icon/edit.png')} className={PerCusDetailStyles.editIcon}/>
          </div>
          :<div />
        }
      </Title>
      <div className={PerCusDetailStyles.infoTabs}>
        <Tabs defaultActiveKey="1" swipeable={false} animated={false}>
          <TabPane tab="综合信息" key="1">
            <div  className={PerCusDetailStyles.tabCon}>
              <OrgComplexInfo dispatch={dispatch} data={data} dataHold={dataHold} />
            </div>
          </TabPane>
          <TabPane tab="基本信息" key="2">
            <div  className={PerCusDetailStyles.tabCon}>
              <OrgBasicInfo dispatch={dispatch} data={data} />
            </div>
          </TabPane>
          <TabPane tab="联系方式" key="3">
            <div  className={PerCusDetailStyles.tabCon}>
              <OrgContact dispatch={dispatch} data={data} />
            </div>
          </TabPane>
          <TabPane tab="服务方式" key="4">
            <div  className={PerCusDetailStyles.tabCon}>
              <OrgService dispatch={dispatch} data={data} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

function connectCustomerFunc({instiCustInfo})
{
   return {instiCustInfo};
}

export default connect(connectCustomerFunc)(OrgCustomerDetail);
