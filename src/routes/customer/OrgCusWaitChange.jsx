// 机构客户添加页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import { Tabs, WhiteSpace,Toast } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import OrgCusWaitChangeFirst from '../../components/customer/OrgCusWaitChangeFirst';
import OrgCusWaitTabs from '../../components/customer/OrgCusWaitTabs';//机构客户添加tabs
import { createForm } from 'rc-form';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件

let offsetYDic = {};
class OrgCusWaitChange extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        isScrollPositioned:false,
    };
    this.handleScroll = this.handleScroll.bind(this);

  }

  componentDidMount () {
      let w1 = window.document.getElementById('w1');
      let w0 = window.document.getElementById('w0');
      let parentNode = w1.parentNode,offsetY=w1.parentNode.offsetTop+15*window.dpr;
      offsetYDic={'1':offsetY};
      offsetY = offsetY-1.667*75*window.dpr+w0.offsetHeight;
      for(let i=1;i<3;){
          let wNode = window.document.getElementById('w'+i);
          offsetY=offsetY+wNode.offsetHeight;
          i++;
          if(i==3)
            offsetY = offsetY - 2.93*75*window.dpr;
          offsetYDic[i.toString()]=offsetY;
      }


     console.log('=====',offsetYDic);
    document.getElementById('boxScroll').addEventListener("scroll", this.handleScroll);
// =======
//      // console.log('=====',offsetYDic);
//     window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
      let isEnableScroll = document.getElementById('boxScroll').scrollTop>96*window.dpr;
      if(isEnableScroll^this.state.isScrollPositioned)
      {
          this.setState({
            isScrollPositioned:isEnableScroll
          });
      }

      //滚动的时候滚动到正确的位置
      const {dispatch,form,formStorage,location} = this.props;
      const {formValue,activeKey} = formStorage;
      let newActivityKey = '3';
      for(let i=2;i<4;i++){
          let offsetY = offsetYDic[i.toString()];
          if(document.getElementById('boxScroll').scrollTop<offsetY-1){
              newActivityKey = (i-1).toString();
              break;
          }
      }
      if(newActivityKey!=activeKey){
         // console.log('===新的activityKey更新==',activeKey,newActivityKey);
        dispatch({type:'formStorage/fetch',payload:{activeKey:newActivityKey}});
      }

  }


  onChangeMethord(item,value,name)
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError } = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:form.getFieldsValue()
    });
  }

  render() {
    let {dispatch,form,formStorage,location,customer} = this.props;
    let {formValue,activeKey} = formStorage;
    let { getFieldProps,getFieldError} = form;

    let orgDate = customer.rejectObject;
    if(orgDate==undefined) orgDate={};

    let { orgCust } = location.state;

    const TitleProps = {
      title:'机构客户驳回修改'
    };
    return (
      <div  className={PerCusDetailStyles.mainContent}>
        {/*<Title {...TitleProps} />*/}
        <div className={PerCusDetailStyles.inMainContent + " " + PerCusDetailStyles.boxScorll} id="boxScroll">
          {/*<OrgCusWaitChangeFirst dispatch={dispatch} form={form}
            formValue={formValue}
            formStorage={formStorage}
            onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)}
          />*/}
          <ul className={PerCusDetailStyles.headChange}>
            <li>
              <section className={PerCusDetailStyles.headLeft}>审批不通过原因</section>
              <section className={PerCusDetailStyles.headRight} >{orgDate.noPassReason}</section>
            </li>
            <li>
              <section className={PerCusDetailStyles.headLeft}>审批时间</section>
              <section className={PerCusDetailStyles.headRight}>{orgDate.appTime}</section>
            </li>
            <li>
              <section className={PerCusDetailStyles.headLeft}>操作人</section>
              <section className={PerCusDetailStyles.headRight}>{orgDate.appUserName}</section>
            </li>
          </ul>
          <div className={PerCusDetailStyles.addMoreWrap}>
            <OrgCusWaitTabs dispatch={dispatch} form={form}
              formValue={formValue}
              defaultActiveKey={activeKey}
              formStorage={formStorage}
              customer={orgCust}
              onChangeMethord={this.onChangeMethord.bind(this)}
              saveFormMethord={this.saveFormMethord.bind(this)}
              detail={orgCust.custType=='03'||orgCust.custType=='01'?'edit':''}
              isScrollPositioned={this.state.isScrollPositioned}
              offsetYDic={offsetYDic}
            />
          </div>
        </div>
        <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
        <div className={PerCusDetailStyles.submit} onClick={()=>{
          form.validateFields((error,value)=>{
            console.log('----------error',error,value);
            //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
            if(error==null)
            {
              if(!value.isBenefitSelf&&!value.actualBenefit) {
                Toast.fail('受益人说明不能为空!',2);
                return;
              }
              if(!formStorage.certPic||formStorage.certPic.length<=0){
                Toast.fail('证件资料不能为空!',2);
                return;
              }

              Toast.loading('提交中...',30,undefined,true);
              //  console.log('----------结束日期-----',value,value.certEndDate);
               let saveValue = {
                                ...formValue,
                                ...value,
                                memPic: orgCust.custType=='03'||orgCust.custType=='01'?[]:formStorage.memPic,
                                certPic: formStorage.certPic,
                               custID:orgCust.custID,
                               undoType:orgCust.undoType,
                               processInstID:orgCust.processInstID,
                               workItemID:orgCust.workItemID,
                };

                saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';

                saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
                saveValue.badRecords=saveValue.badRecords?'02':'01';
                if(saveValue.certStartDate)
                  saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
                if(saveValue.certEndDate)
                  saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

               dispatch({
                 type:'customer/orgRemoveChange',
                 payload:{
                   params:saveValue,
                   backMethord:(data)=>{
                    Toast.hide();
                     if(data&&data.code=='0')
                     dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                       successTitle:'机构客户提交成功!',
                       backTitle:'返回客户代办列表',
                     }}));
                     else Toast.fail(data&&data.msg?data.msg:'驳回修改保存错误!',2);
                   }
                 }
               });
            }
            else {
              Toast.fail('输入参数中存在错误!',2);
            }
          });
        }}>
          <span>提交</span>
        </div>
      </div>
    )
  }
};

function connectCustomerFunc({customer,formStorage})
{
   return {customer,formStorage};
}

function onValuesChange(props,changedValues){
    let {dispatch} = props;
    dispatch({
        type:'formStorage/fetchFormValue',
        payload:changedValues
    });
}

export default connect(connectCustomerFunc)(createForm({onValuesChange:onValuesChange})(OrgCusWaitChange));
