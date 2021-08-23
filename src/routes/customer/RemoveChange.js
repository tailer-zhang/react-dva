import React,{  Components, PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import { List,Tabs,WhiteSpace,Toast } from 'antd-mobile';
import OneselfTabs from '../../components/customer/OneselfTabs';
import { createForm } from 'rc-form';
import styles from '../../styles/customer/removeChange.less';

const TabPane = Tabs.TabPane;
const Item = List.Item;

let offsetYDic = {};
class RemoveChange extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isScrollPositioned:false,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
      let w1 = window.document.getElementById('w1');

      let parentNode = w1.parentNode,offsetY=w1.parentNode.offsetTop;
      offsetYDic={'1':offsetY-1.2*75*window.dpr};
      offsetY = offsetY-1.6*75*window.dpr;
      for(let i=1;i<5;){
          let wNode = window.document.getElementById('w'+i);
          offsetY=offsetY+wNode.offsetHeight;
          i++;
          if(i==4)
             offsetY = offsetY - 2.93*75*window.dpr;
          offsetYDic[i.toString()]=offsetY;
      }

     // console.log('=====',offsetYDic);
    //  offsetYDic = {'1':588,'2':2160,'3':2507,'4':3604};
    document.getElementById('boxScorll').addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
      let isEnableScroll = document.getElementById('boxScorll').scrollTop>77*window.dpr;
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
          if(document.getElementById('boxScorll').scrollTop<offsetY-1){
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

  render() {
    let {dispatch,form,formStorage,location,instiCustInfo,customer} = this.props;
    let {formValue,activeKey} = formStorage;
    let { getFieldProps,getFieldError} = form;
    console.log("customer================",customer);
    let data = customer.rejectObject;
    if(data==undefined) data = {};

    let {perCust} = location.state;
    console.log('perCust',perCust);

    const titleProps = {
      title:'驳回修改',
    };
    return (
      <div className={styles.total}>
        {/*<div> <Title {...titleProps}/> </div>*/}
        <div className={styles.boxScorll} id="boxScorll" >
          <ul className={styles.headChange}>
            <li>
              <section className={styles.headLeft}>审批不通过原因</section>
              <section className={styles.headRight} >{data.noPassReason}</section>
            </li>
            <li>
              <section className={styles.headLeft}>审批时间</section>
              <section className={styles.headRight}>{data.appTime}</section>
            </li>
            <li>
              <section className={styles.headLeft}>操作人</section>
              <section className={styles.headRight}>{data.appUserName}</section>
            </li>
          </ul>
          <div className={styles.changeTabs}>
            <OneselfTabs dispatch={dispatch} form={form}
              formValue={formValue}
              formStorage={formStorage}
              customer={perCust}
              defaultActiveKey={activeKey}
              onChangeMethord={this.onChangeMethord.bind(this)}
              saveFormMethord={this.saveFormMethord.bind(this)}
              detail={perCust.custType=='03'||perCust.custType=='01'?'edit':undefined}
              isScrollPositioned={this.state.isScrollPositioned}
              offsetYDic={offsetYDic}
              />
          </div>
          <div style={{height: '2rem',backgroundColor: '#efeff4'}}></div>
        </div>
        <div className={styles.changeBtn} onClick={()=>{
          form.validateFields((error,value)=>{
            console.log('----------error',error,value);
            //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
            if(error==null)
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
              if(formValue.postAddress=='1'&&(!formValue.familyAddress || !formValue.familyPostCode || !formValue.familyPhone)) {
                Toast.fail('家庭地址、家庭邮编、家庭电话不能为空!',2);
                return;
              } else if(formValue.postAddress=='2'&&(!formValue.companyAddress || !formValue.companyPostCode || !formValue.companyPhone)) {
                Toast.fail('单位地址、单位邮编、单位电话不能为空!',2);
                return;
              }

              Toast.loading('提交中...',30,undefined,true);
               let saveValue = {
                  ...formStorage.formValue,
                  ...value,
                 custID:perCust.custID,
                 undoType:perCust.undoType,
                 processInstID:perCust.processInstID,
                 workItemID:perCust.workItemID,
                 memPic:perCust.custType=='03'||perCust.custType=='01'?[]:formStorage.memPic,
                 certPic:formStorage.certPic,
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
                 type:'customer/RemoveChange',
                 payload:{
                   params:saveValue,
                   backMethord:(data)=>{
                     Toast.hide();
                     if(data&&data.code=='0')
                        //dispatch(routerRedux.goBack());
                        dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                          successTitle:'个人客户提交成功!',
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
          <p className={styles.changePush}>提交</p>
        </div>
      </div>
    )
  }
};

function modify({customer,formStorage}) {
  return {customer,formStorage}
}

function onValuesChange(props,changedValues){
    let {dispatch} = props;
    dispatch({
        type:'formStorage/fetchFormValue',
        payload:changedValues
    });
}

export default connect(modify)(createForm({onValuesChange:onValuesChange})(RemoveChange));
