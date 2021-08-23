// 机构客户添加页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import { Tabs, WhiteSpace,Toast,DatePicker } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import OrgCusAddFirst from '../../components/customer/OrgCusAddFirst';
import OrgCusAddTabs from '../../components/customer/OrgCusAddTabs';//机构客户添加tabs

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import proDetailStyles from '../../styles/product/ProductDetail.less';//样式文件
import { createForm } from 'rc-form';

let isRepeat = 0;
const EditToolBar = ({dispatch,saveFormMethord,location,form,formStorage,isFixed})=>{
  let {orgCust} = location.state;
  return (
    <div style={{width: '100%',height: '1.306667rem',background: '#f22f33',color: '#fff',fontSize: '0.453333rem',lineHeight: '1.306667rem',textAlign: 'center',position: 'fixed',bottom: '0',zIndex: '1000'}}
      onClick={(e)=>{
        // e.preventDefault();
        if(isRepeat>=1) return;
        form.validateFields((error,value)=>{
          console.log('----------error',error,value);
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
            isRepeat = 1;
            Toast.loading('提交中...',30,undefined,true);
             let saveValue = {
                            ...formStorage.formValue,
                            ...value,
                           upLevelType:0,
                           busiID:orgCust.busiID==undefined?orgCust.custID:orgCust.busiID,
                           relationCust:formStorage.formValue.relationCust,
                           certPic:formStorage.certPic,
                           memPic:[],
                    };
            saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
            saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
            saveValue.badRecords=saveValue.badRecords?'02':'01';
            if(saveValue.certStartDate)
              saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
            if(saveValue.certEndDate)
              saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

             dispatch({
               type:'customer/InstiCustModify',
               payload:{
                 params:saveValue,
                 backMethord:(data)=>{
                   isRepeat = 0;
                   Toast.hide();
                   if(data&&data.code=='0')
                   dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                     successTitle:'机构客户修改成功!',
                     backTitle:'返回客户详情页面',
                   }}));
                   else Toast.fail(data&&data.msg?data.msg:'客户保存错误!',2);
                 }
               }
             });
          }
          else {
            Toast.fail('输入不能为空!',2);
          }
        });
      }}>
      <span style={{color: '#fff',fontSize: '0.453333rem'}}>提交修改</span>
    </div>
  );
};

const OperBar = ({dispatch,saveFormMethord,location,form,formStorage,isFixed,customer})=>{
  let {orgCust,mode} = location.state;

      return (
          <div className={PerCusDetailStyles.footerBtn} style={{position:'absolute',bottom:'0',zIndex: '1000'}}>
            <div className={PerCusDetailStyles.userControl}>
              <div className={PerCusDetailStyles.abandon} onClick={()=>{
                let { getFieldProps,getFieldError} = form;
                saveFormMethord();
                dispatch(routerRedux.push({
                  pathname: '/giveUpCustomer',
                  state: {
                    customer: orgCust
                  }
                }));
              }}>
                <img src={require('../../image/customer/personalMore1.png')} className={PerCusDetailStyles.assIcon} />
                <p>放弃</p>
              </div>
              <div className={PerCusDetailStyles.assess} onClick={()=>{
                  saveFormMethord();
                  let formValue = formStorage.formValue;
                  if(formValue.riskLevel)
                  {
                    dispatch(routerRedux.push({
                      pathname: '/riskAssess',
                      state: {
                        custID:orgCust.custID==undefined?orgCust.busiID:orgCust.custID,
                        riskLevel:formValue.riskLevel,
                        score:formValue.score,
                        custClass:orgCust.custClass
                      }
                    }));
                  }
                  else dispatch(routerRedux.push({
                    pathname: '/riskBearSec',
                    state: {custID: orgCust.custID==undefined?orgCust.busiID:orgCust.custID}
                  }));
                }}>
                <img src={require("../../image/icon/assIcon.png")} className={PerCusDetailStyles.assIcon}/>
                <p>评估</p>
              </div>
              <div className={PerCusDetailStyles.keepBtn2} onClick={(e)=>{
                //   e.preventDefault();
                if(isRepeat>=1) return;
                form.validateFields((error,value)=>{
                  console.log('----------error',error,value);
                  //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
                  if(error==null||(!error.busiName&&!error.linkName&&!error.linkSex&&!error.linkMobilePhone))
                  {
                    // if(!value.isBenefitSelf&&!value.actualBenefit) {
                    //   Toast.fail('受益人说明不能为空!',2);
                    //   return;
                    // }

                    isRepeat = 1;
                    Toast.loading('保存中...',30,undefined,true);
                     let saveValue = {
                                    ...formStorage.formValue,
                                    ...value,
                                   upLevelType:0,
                                   busiID:orgCust.busiID==undefined?orgCust.custID:orgCust.busiID,
                                   relationCust:formStorage.formValue.relationCust,
                                   memPic:formStorage.memPic,
                                   certPic:formStorage.certPic,
                            };
                    saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
                    saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
                    saveValue.badRecords=saveValue.badRecords?'02':'01';
                    if(saveValue.certStartDate)
                      saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
                    if(saveValue.certEndDate)
                      saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

                      console.log('saveValue=========',saveValue);
                     dispatch({
                       type:'customer/InstiCustModify',
                       payload:{
                         params:saveValue,
                         backMethord:(data)=>{
                           isRepeat = 0;
                           Toast.hide();
                           if(data&&data.code=='0')
                           dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                           successTitle:mode=='edit'?'机构客户修改成功!':'机构客户添加成功!',
                           backTitle:mode=='edit'?'返回客户列表页':'返回客户主页',
                           }}));
                           else {
                             Toast.fail(data&&data.msg?data.msg:'客户保存错误!',1);
                           }
                         }
                       }
                     });
                  }
                  else {
                    Toast.fail('输入参数中存在错误!',1);
                  }
                });
              }}>保存</div>
              <div className={PerCusDetailStyles.subBtn} onClick={()=>{
                if(isRepeat>=1) return;
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
                    isRepeat = 1;
                    Toast.loading('提交中...',30,undefined,true);
                     let saveValue = {
                                     ...formStorage.formValue,
                                     ...value,
                                    upLevelType:1,
                                    busiID:orgCust.busiID==undefined?orgCust.custID:orgCust.busiID,
                                    relationCust:formStorage.formValue.relationCust,
                                    memPic:formStorage.memPic,
                                    certPic:formStorage.certPic,
                    };
                    saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
                    saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
                    saveValue.badRecords=saveValue.badRecords?'02':'01';
                     if(saveValue.certStartDate)
                       saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
                     if(saveValue.certEndDate)
                       saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

                     dispatch({
                       type:'customer/InstiCustModify',
                       payload:{
                         params:saveValue,
                         backMethord:(data)=>{
                           isRepeat = 0;
                         Toast.hide();
                         if(data&&data.code=='0')
                           dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                             successTitle:mode=='edit'?'机构客户提交转正成功!':'机构客户添加成功!',
                             backTitle:mode=='edit'?'返回客户列表页':'返回客户主页',
                           }}));
                         else Toast.fail(data&&data.msg?data.msg:'客户提交转正错误!',2);
                         }
                       }
                     });
                  }
                  else {
                    Toast.fail('输入参数中存在错误!',2);
                  }
                });
              }}>提交转正</div>
            </div>
          </div>
        );
}

let offsetYDic = {};
class OrgCusAddMore extends React.Component{
  constructor(props) {
    super(props);
    isRepeat = 0;
    this.state={
      isFixed: false,
      isScrollPositioned:false,
    }

    this.handleScroll = this.handleScroll.bind(this);

  }

  componentDidMount () {
      let w1 = window.document.getElementById('w1');

      let parentNode = w1.parentNode,offsetY=w1.parentNode.offsetTop+15*window.dpr;
      offsetYDic={'1':offsetY};
      offsetY = offsetY-1.667*75*window.dpr;
      for(let i=1;i<3;){
          let wNode = window.document.getElementById('w'+i);
          offsetY=offsetY+wNode.offsetHeight;
          i++;
          if(i==3)
            offsetY = offsetY - 1.93*75*window.dpr;
          offsetYDic[i.toString()]=offsetY;
      }

     console.log('=====',offsetYDic);
    this.refs.boxScroll.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
      let isEnableScroll = this.refs.boxScroll.scrollTop>384*window.dpr;
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
          if(this.refs.boxScroll.scrollTop<offsetY-1){
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
    let { getFieldProps,getFieldError} = form;
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

  formFocus() {
    this.setState({isFixed: true})
  }

  formBlur() {
    this.setState({isFixed: false})
  }

  // repeatAdd() {
  //   let isRepeat = this.state.isRepeat + 1;
  //   this.setState({isRepeat: isRepeat})
  // }
  //
  // repeatDecrease() {
  //   this.setState({isRepeat: 0})
  // }

  render() {
    let {dispatch,form,formStorage,location,instiCustInfo,customer} = this.props;
    let {formValue,activeKey} = formStorage;
    let { getFieldProps,getFieldError} = form;
    // console.log('customer----------',customer);

    let TitleProps = {
      title:'机构客户编辑'
    };

    let {orgCust,detail} = location.state;
    console.log('orgCust',orgCust.custID);

    let isFixed = this.state.isFixed;

    return (
      <div  className={PerCusDetailStyles.mainContent}>
          <div className={PerCusDetailStyles.boxScroll} ref="boxScroll" id="boxScroll">
            <Title {...TitleProps} />
            <div className={PerCusDetailStyles.inMainContent}>
              <OrgCusAddFirst dispatch={dispatch} form={form}
                formValue={formValue}
                onChangeMethord={this.onChangeMethord.bind(this)}
                saveFormMethord={this.saveFormMethord.bind(this)}
                formFocus={this.formFocus.bind(this)}
                formBlur={this.formBlur.bind(this)}
                wrapStyle={{paddingLeft:0}}
              />
              <div className={PerCusDetailStyles.addMoreWrap}>
                <OrgCusAddTabs dispatch={dispatch} form={form}
                  formValue={formValue}
                  defaultActiveKey={activeKey}
                  onChangeMethord={this.onChangeMethord.bind(this)}
                  saveFormMethord={this.saveFormMethord.bind(this)}
                  formStorage={formStorage}
                  customer={orgCust}
                  formFocus={this.formFocus.bind(this)}
                  formBlur={this.formBlur.bind(this)}
                  detail={detail}
                  isScrollPositioned={this.state.isScrollPositioned}
                  offsetYDic={offsetYDic}
                  />
              </div>
            </div>
            <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
          </div>
          <div>
          {
            orgCust.custType=='02'||!orgCust.custType?(<OperBar dispatch={dispatch} saveFormMethord={this.saveFormMethord.bind(this)}
            location={location} form={form} formStorage={formStorage}  isFixed={isFixed}
            />):(
              <EditToolBar  dispatch={dispatch} saveFormMethord={this.saveFormMethord.bind(this)}
                location={location} form={form} formStorage={formStorage}  isFixed={isFixed}
                />
            )
          }
          </div>
      </div>
    )
  }
}

function connectCustomerFunc({instiCustInfo,formStorage,customer})
{
   return {instiCustInfo,formStorage,customer};
}

function onValuesChange(props,changedValues){
    let {dispatch} = props;
    dispatch({
        type:'formStorage/fetchFormValue',
        payload:changedValues
    });
}

export default connect(connectCustomerFunc)(createForm({onValuesChange:onValuesChange})(OrgCusAddMore));
