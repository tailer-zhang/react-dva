import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, WhiteSpace,List} from 'antd-mobile';
import OrgBasicInfoAdd from './OrgBasicInfoAdd';//机构客户基本信息部分添加
import OrgContactAdd from './OrgContactAdd';//机构客户联系方式部分添加
import OrgServiceAdd from './OrgServiceAdd';//机构客户服务方式部分添加
import OrgCusAddFirst from './OrgCusAddFirst';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import styles from '../../styles/customer/personalCustAddMore.less';

//样式文件

const TabPane = Tabs.TabPane;
class OrgCusWaitTabs extends React.Component{
  constructor() {
    super();
  }

  render() {
    let {dispatch,form,formValue,formStorage,customer,onChangeMethord,saveFormMethord,defaultActiveKey,detail,isScrollPositioned,offsetYDic} = this.props;
    let activeKey = defaultActiveKey;
    if(activeKey==undefined)
     activeKey = '1';

    return (
      <div className={PerCusDetailStyles.addTabs}>
        <Tabs activeKey={activeKey} swipeable={false} animated={false}  className={isScrollPositioned?styles.tabFixed:undefined}
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
            <OrgCusAddFirst dispatch={dispatch} form={form}
                formValue={formValue}
                onChangeMethord={onChangeMethord}
                saveFormMethord={saveFormMethord}
                wrapStyle={{paddingLeft:0}}
                id="w1"
            />
            <OrgBasicInfoAdd dispatch={dispatch} form={form}
              formValue={formValue}
              formStorage={formStorage}
              customer={customer}
              onChangeMethord={onChangeMethord}
              saveFormMethord={saveFormMethord}
              detail={detail}
              id="w0"
            />
            <OrgContactAdd dispatch={dispatch} form={form}
              formValue={formValue}
              formStorage={formStorage}
              onChangeMethord={onChangeMethord}
              saveFormMethord={saveFormMethord}
              id="w2"
             />
            <OrgServiceAdd dispatch={dispatch} form={form}
                formValue={formValue}
                formStorage={formStorage}
                onChangeMethord={onChangeMethord}
                saveFormMethord={saveFormMethord}
                id="w3"
            />
        </List>
      </div>
    )
  }
};
export default OrgCusWaitTabs;
// <div  className={PerCusDetailStyles.tabCon}>
//   <OrgServiceAdd dispatch={dispatch} form={form}
//     formValue={formValue}
//     formStorage={formStorage}
//     onChangeMethord={onChangeMethord}
//     saveFormMethord={saveFormMethord} />
// </div>
