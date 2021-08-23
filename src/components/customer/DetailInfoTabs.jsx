import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import ComplexInfo from '../../components/customer/ComplexInfo';//综合信息组件
import PersonalBasicInfo from '../../components/customer/PersonalBasicInfo';//个人信息组件
import PersonalCareerInfo from '../../components/customer/PersonalCareerInfo';//职业信息组件
import Contact from '../../components/customer/Contact';//联系方式组件
import PersonalService from '../../components/customer/PersonalService';//服务方式组件

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
//样式文件

const tabMenu = [{tabname:'综合信息',navType:'1'},{tabname:'基本信息',navType:'2'},{tabname:'职业信息',navType:'3'},{tabname:'联系方式',navType:'4'},{tabname:'服务方式',navType:'5'}];

export default class DetailInfoTabs extends Component {
  constructor(props) {
		 super(props);
     this.state={
     navType:'1'
     };
	}
  currentTab(item,index)
  {
    this.setState({
      navType:item.navType,
    });
  }
  render(){
    let {dispatch,perCustInfo,progress,custSource} = this.props;
    return(
      <div className={PerCusDetailStyles.tabCom}>
        <div className={PerCusDetailStyles.tabListMenu}>
          <ul className={PerCusDetailStyles.tabList}>
            {
              tabMenu.map((item,index) => {
  						let classNameValue = undefined;
              if(item.navType==this.state.navType){
                classNameValue = PerCusDetailStyles.curTabItem;
              }
  						return (
  							<li key={index} onClick={this.currentTab.bind(this,item,index)} className={classNameValue}>{item.tabname}</li>
  						);
  					})
            }
          </ul>
        </div>
        <div className={PerCusDetailStyles.tabConMenu}>
          <div className={PerCusDetailStyles.tabCon}>
            {(()=>{
                if(this.state.navType==1) {
                  return(
                    <ComplexInfo dispatch={dispatch} perCustInfo={perCustInfo} progress={progress} custSource={custSource}/>
                  );
                } else if(this.state.navType==2) {
                  return(
                    <PersonalBasicInfo dispatch={dispatch} perCustInfo={perCustInfo} />
                  );
                } else if(this.state.navType==3) {
                  return(
                    <PersonalCareerInfo dispatch={dispatch} perCustInfo={perCustInfo} />
                  );
                } else if(this.state.navType==4){
                  return(
                    <Contact dispatch={dispatch} perCustInfo={perCustInfo} />
                  );
                } else if(this.state.navType==5){
                  return(
                    <PersonalService dispatch={dispatch} perCustInfo={perCustInfo} />
                  );
                }
            })()}
          </div>
        </div>
      </div>
    );
  }
}
