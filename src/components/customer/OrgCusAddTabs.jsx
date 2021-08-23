import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, WhiteSpace,List} from 'antd-mobile';
import OrgBasicInfoAdd from './OrgBasicInfoAdd';//机构客户基本信息部分添加
import OrgContactAdd from './OrgContactAdd';//机构客户联系方式部分添加
import OrgServiceAdd from './OrgServiceAdd';//机构客户服务方式部分添加




//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import styles from '../../styles/customer/personalCustAddMore.less';

//样式文件

const TabPane = Tabs.TabPane;
const OrgCusAddTabs = (props) => {
let {dispatch,form,formValue,onChangeMethord,saveFormMethord,defaultActiveKey,
      formStorage,customer,formFocus,formBlur,detail,isScrollPositioned,offsetYDic} = props;
let activeKey = defaultActiveKey;
if(activeKey==undefined)
 activeKey = '1';

  return (
    <div className={PerCusDetailStyles.addTabs}>
      <Tabs activeKey={activeKey} swipeable={false} animated={false} className={isScrollPositioned?styles.tabFixed:undefined}
           onChange={(activeKey)=>{
               document.getElementById('boxScroll').scrollTo(0,offsetYDic[activeKey]);
               dispatch({type:'formStorage/fetch',payload:{activeKey:activeKey}});
        }}>
        <TabPane tab="基本信息" key="1">
        </TabPane>
        <TabPane tab="联系方式" key="2">
        </TabPane>
        <TabPane tab="服务方式" key="3">
        </TabPane>
      </Tabs>
      <List>
          <OrgBasicInfoAdd dispatch={dispatch} form={form}
            formValue={formValue}
            onChangeMethord={onChangeMethord}
            saveFormMethord={saveFormMethord}
            formStorage={formStorage}
            customer={customer}
            formFocus={formFocus}
            formBlur={formBlur}
            detail={detail}
            id="w1"
          />
          <OrgContactAdd dispatch={dispatch} form={form}
            formValue={formValue}
            onChangeMethord={onChangeMethord}
            saveFormMethord={saveFormMethord}
            formFocus={formFocus}
            formBlur={formBlur}
            id="w2"
         />
         <OrgServiceAdd dispatch={dispatch} form={form}
           formValue={formValue}
           onChangeMethord={onChangeMethord}
           saveFormMethord={saveFormMethord}
           formFocus={formFocus}
           formBlur={formBlur}
           id="w3"
         />
      </List>
    </div>
  );
};
export default OrgCusAddTabs;
