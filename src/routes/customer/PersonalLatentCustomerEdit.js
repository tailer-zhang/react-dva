//个人潜在页面编辑  赵博文
import React from 'react';
import { List,Toast} from 'antd-mobile';
import Title from '../../components/product/Title';
import PersonalCustAddMoreTabs from '../../components/customer/PersonalCustAddMoreTabs';
import PersonalCustomerCommon from '../../components/customer/PersonalCustomerCommon';
import styles from '../../styles/customer/personalCustAddMore.less';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
// import { createForm } from 'rc-form';
import createDOMForm from 'rc-form/lib/createDOMForm';
import moment from 'moment';
import {formatError} from '../../utils/formatUtils';

const Item = List.Item;
import MarketMonth from '../productPages/MarketMonth';
// import
import {decryptStr} from '../../utils/createEncrypt';
let isRepeat = 0;
const EditToolBar = ({dispatch,saveFormMethord,location,form,formStorage,isFixed})=>{
  let {customer} = location.state;
  // console.log('isFixed------',isFixed);
  return (
    <div style={{width: '100%',height: '1.306667rem',background: '#f22f33',color: '#fff',fontSize: '0.453333rem',lineHeight: '1.306667rem',textAlign: 'center',position:'fixed',bottom: '0',zIndex: '10000'}}
      onClick={(e)=>{
        // e.preventDefault();
        if(isRepeat>=1) return;
        form.validateFields((error,value)=>{
          if(!error)
          {
            isRepeat = 1;
            console.log('formStorage.formValue----',formStorage.formValue);
            Toast.loading('提交中...',30,undefined,true);
             let saveValue = {
               ...formStorage.formValue,
               ...value,
               memPic:[],
               certPic:formStorage.certPic,
               custID:customer.custID,
               upLevelType:0
             };
             saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
             saveValue.badRecords=saveValue.badRecords?'02':'01';

             if(saveValue.birthDay)
               saveValue.birthDay = saveValue.birthDay.format('YYYY-MM-DD');
             if(saveValue.certEndDate)
               saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

             dispatch({
               type:'customer/editCustomer',
               payload:{
                 params:saveValue,
                 mode:'personal',
                 backMethord:(data)=>{
                   isRepeat = 0;
                   Toast.hide();
                   if(data&&data.code=='0')
                      //dispatch(routerRedux.goBack());
                      dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                        successTitle:'个人客户修改成功!',
                        backTitle:'返回客户详情页',
                      }}));
                   else Toast.fail(data&&data.msg?data.msg:'客户保存错误!',2);
                 }
               }
             });
          }
          else {
            Toast.fail(formatError(error),2);
          }
      });
    }}>
      <span style={{color: '#fff',fontSize: '0.453333rem'}}>提交修改</span>
    </div>
  );
};

const OperBar = ({dispatch,saveFormMethord,location,form,formStorage,isFixed})=>{
  let {customer,mode} = location.state;
  // console.log('isFixed------',isFixed);
  return (
    <div className={styles.wrap} style={{position:'fixed',bottom:'0',left:'0',zIndex: '1000'}}>
      <div className={styles.abandon} onClick={()=>{
          saveFormMethord();
        dispatch(routerRedux.push({
          pathname: '/giveUpCustomer',
          state: {
            customer: customer,
            custID: customer.custID,
            custClass: customer.custClass
          }
        }));
      }}>
        <img src={require('../../image/customer/personalMore1.png')} />
        <p>放弃</p>
      </div>
      <div className={styles.blacklist} onClick={()=>{
        saveFormMethord();
        dispatch(routerRedux.push({
          pathname: '/GiveUpCustomer',
          state:{
            mode: 'black',
            customer: customer,
            custID: customer.custID,
            custClass: customer.custClass
          }
        }));
      }}>
        <img src={require('../../image/customer/personalMore2_03.png')} />
        <p>拉黑</p>
      </div>
      <div className={styles.assess} onClick={()=>{
        saveFormMethord();
        let formValue = formStorage.formValue;
        if(formValue.riskLevel)
        {
          dispatch(routerRedux.push({
            pathname: '/riskAssess',
            state: {
              custID:customer.custID,
              riskLevel:formValue.riskLevel,
              score:formValue.score,
              custClass:customer.custClass
            },
            query: {proCustomer: 'proCustomer'}
          }));
        }
        else dispatch(routerRedux.push({
          pathname: '/riskBearSec',
          state: {custID: customer.custID}
        }));
      }}>
        <img src={require('../../image/customer/personalMore2_05.png')} />
        <p>评估</p>
      </div>
      <div className={styles.save} onClick={()=>{
        if(isRepeat>=1) return;
        form.validateFieldsAndScroll((error,value)=>{
          console.log('----------error',error,value);
          //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
          if(!error||(!error.custName&&!error.sex&&!error.mobilePhone))
          {
            // if(value.isControl&&!value.actualControl) {
            //   Toast.fail('控制关系说明不能为空!',2);
            //   return;
            // }
            // if(!value.isBenefitSelf&&!value.actualBenefit) {
            //   Toast.fail('受益人说明不能为空!',2);
            //   return;
            // }
            isRepeat = 1;
            Toast.loading('保存中...',30,undefined,true);
             let saveValue = {
               ...formStorage.formValue,
               ...value,
               memPic:formStorage.memPic,
               certPic:formStorage.certPic,
               custID:customer.custID,
               upLevelType:0
             };

             saveValue.isControl=saveValue.isControl?'01':'02';
             saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';

             saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
             saveValue.badRecords=saveValue.badRecords?'02':'01';
             if(saveValue.birthDay)
               saveValue.birthDay = saveValue.birthDay.format('YYYY-MM-DD');
             if(saveValue.certEndDate)
               saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

             dispatch({
               type:'customer/editCustomer',
               payload:{
                 params:saveValue,
                 mode:'personal',
                 backMethord:(data)=>{
                   isRepeat = 0;
                   Toast.hide();
                   if(data&&data.code=='0')
                      //dispatch(routerRedux.goBack());
                      dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                        successTitle:mode=='edit'?'个人客户修改成功!':'个人客户添加成功!',
                        backTitle:mode=='edit'?'返回客户列表页':'返回客户主页',
                      }}));
                   else Toast.fail(data&&data.msg?data.msg:'客户保存错误!',2);
                 }
               }
             });
          }
          else {
              Toast.fail(formatError(error),2);
          }
        });
      }}>
        <em>保存</em>
      </div>
      <div className={styles.submit} onClick={()=>{
        // dispatch(routerRedux.push('/customerMain'));
         if(isRepeat>=1) return;
        form.validateFieldsAndScroll({force:true},(error,value)=>{
          if(!error)
          {
            if(value.isControl&&!value.actualControl) {
              Toast.fail('控制关系说明不能为空!',2);
              return;
            }
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
              memPic:formStorage.memPic,
              certPic:formStorage.certPic,
              custID:customer.custID,
              upLevelType:1
            };
            console.log("isBenefitSelf====提交",saveValue.isBenefitSelf);
            saveValue.isControl=saveValue.isControl?'01':'02';
            saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
            saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
            saveValue.badRecords=saveValue.badRecords?'02':'01';
            if(saveValue.birthDay)
              saveValue.birthDay = saveValue.birthDay.format('YYYY-MM-DD');
            if(saveValue.certEndDate)
              saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');
            console.log("saveValue.isBenefitSelf  ====shi 零几",saveValue.isBenefitSelf);
            dispatch({
              type:'customer/editCustomer',
              payload:{
                params:saveValue,
                mode:'personal',
                backMethord:(data)=>{
                  isRepeat = 0;
                  Toast.hide();
                  if(data&&data.code=='0')
                    //  dispatch(routerRedux.goBack());
                    dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:mode=='edit'?'个人客户提交转正成功!':'个人客户添加成功!',
                      backTitle:mode=='edit'?'返回客户列表页':'返回客户主页',
                    }}));
                  else Toast.fail(data&&data.msg?data.msg:'客户提交转正错误!',2);
                }
              }
            });
          }
          else {
              Toast.fail(formatError(error),2);
          }
        });
      }}>
        <em>提交转正</em>
      </div>
    </div>
  );
};

let  scrollOffset = 0;
let offsetYDic = {'1':588,'2':2160,'3':2507,'4':3604};
class  PersonalLatentCustomerEdit extends React.Component {
  constructor(props) {
     super(props);
     isRepeat = 0;
     this.state={
       isFixed: false,
       isScrollPositioned:false,
     }
     this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
      let w1 = window.document.getElementById('w1');

      let parentNode = w1.parentNode,offsetY=w1.parentNode.offsetTop;
      offsetYDic={'1':offsetY-1.667*75*window.dpr};
      offsetY = offsetY-1.667*75*window.dpr;
      for(let i=1;i<4;){
          let wNode = window.document.getElementById('w'+i);
          offsetY=offsetY+wNode.offsetHeight;
          i++;
          offsetYDic[i.toString()]=offsetY;
      }

     console.log('=====',offsetYDic);
    //  offsetYDic = {'1':588,'2':2160,'3':2507,'4':3604};
    this.refs.boxScroll.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }



  // componentWillUpdate(nextProps,nextState){
  //         if(nextState.isFixed!=this.state.isFixed)
  //           return;
  //           scrollOffset = document.getElementById('root').scrollTop;
  //         console.log('=com 更新==',scrollOffset);
  // }
  //
  //
  // componentDidUpdate(prevProps,prevState){
  //     if(prevState.isFixed!=this.state.isFixed)
  //       return;
  //     console.log('=com 滚动==',scrollOffset);
  //   //   if(prevState.isScrollPositioned==this.state.isScrollPositioned&&(!prevProps.formStorage.activeKey||prevProps.formStorage.activeKey==this.props.formStorage.activeKey))
  //     if(prevProps.formStorage.activeKey!=this.props.formStorage.activeKey||!prevProps.formStorage.activeKey)
  //     {
  //         console.log('===进行滚动==',scrollOffset);
  //         document.getElementById('root').scrollTo(0,scrollOffset);
  //     }
  // }

  handleScroll(e) {
      // let isEnableScroll = document.getElementById('root').scrollTop>250*window.dpr;
      let isEnableScroll = this.refs.boxScroll.scrollTop>250*window.dpr;

      if(isEnableScroll^this.state.isScrollPositioned)
      {
          this.setState({
            isScrollPositioned:isEnableScroll
          });
      }

      //滚动的时候滚动到正确的位置
      const {dispatch,form,formStorage,location} = this.props;
      const {formValue,activeKey} = formStorage;
      let newActivityKey = '4';
      for(let i=2;i<5;i++){
          let offsetY = offsetYDic[i.toString()];
          if(this.refs.boxScroll.scrollTop<offsetY-1){
              newActivityKey = (i-1).toString();
              break;
          }
      }
      if(newActivityKey!=activeKey){
         console.log('===新的activityKey更新==',activeKey,newActivityKey);
        dispatch({type:'formStorage/fetch',payload:{activeKey:newActivityKey}});
      }

  }

  onChangeMethord(item,value,name)
  {
    let {dispatch} = this.props;
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



  render()
  {
    let {dispatch,form,formStorage,location} = this.props;
    let {formValue,activeKey} = formStorage;
    let {customer,detail} = location.state;
    const titleProps = {title: '客户信息编辑'};
    let isFixed = this.state.isFixed;

    return (
      <div className={styles.editTotal} ref="root">
        <div className={styles.boxScroll} ref="boxScroll" id="boxScroll">
            <Title {...titleProps}/>
            <PersonalCustomerCommon form={form} formValue={formValue} dispatch={dispatch}
            onChangeMethord={this.onChangeMethord.bind(this)} customer={location.customer}
            formFocus={this.formFocus.bind(this)} formBlur={this.formBlur.bind(this)}
             />
            <PersonalCustAddMoreTabs form={form} defaultActiveKey={activeKey} formValue={formValue} location={location}
              formStorage={formStorage} formFocus={this.formFocus.bind(this)} formBlur={this.formBlur.bind(this)}
              dispatch={dispatch} customer={customer} onChangeMethord={this.onChangeMethord.bind(this)} detail={detail}
              isScrollPositioned={this.state.isScrollPositioned} offsetYDic={offsetYDic}
            />
            <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
          </div>
          {
            customer.custType=='02'||!customer.custType?(<OperBar dispatch={dispatch} saveFormMethord={this.saveFormMethord.bind(this)}
            location={location} form={form} formStorage={formStorage} isFixed={isFixed} />):(
              <EditToolBar dispatch={dispatch} saveFormMethord={this.saveFormMethord.bind(this)}
                location={location} form={form} formStorage={formStorage} isFixed={isFixed} />
            )
          }
      </div>
    )
  }
}

function connectCustomerFunc({perCustInfo,formStorage})
{
  return {perCustInfo,formStorage};
}


function onValuesChange(props,changedValues){
    let {dispatch} = props;
    dispatch({
        type:'formStorage/fetchFormValue',
        payload:changedValues
    });
}



export default connect(connectCustomerFunc)(createDOMForm({onValuesChange:onValuesChange})(PersonalLatentCustomerEdit));
