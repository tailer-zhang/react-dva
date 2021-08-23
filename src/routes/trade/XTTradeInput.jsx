//私募交易录入页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux, } from 'dva/router';
import { List, Button ,ListView, SearchBar, Tabs, WhiteSpace,InputItem,Toast} from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import RemitInfo from '../../components/trade/RemitInfo';//汇款信息组件
import XTContractDetail from '../../components/trade/XTContractDetail';//合同详情组件
import DataUpload from '../../components/trade/DataUpload';//资料上传组件
import Dic from '../../utils/dictionary';
import {decryptStr} from '../../utils/createEncrypt';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import MarketMonth from '../productPages/MarketMonth';
import { createForm } from 'rc-form';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';

const TabPane = Tabs.TabPane;

let isRepeat = 0;
class  XTTradeInput extends React.Component {
  constructor(props) {
     super(props);
    isRepeat = 0;
     this.state={
      isFixed: false,
    //  focused:'false',
    //  deActiveKey:'1',
    //    stepNum:1,
    //    btnText:'下一步',
     }
  }
  componentWillMount() {
    let {dispatch,form,location} = this.props;
    let {rowData} = location.state;
    console.log('this.props  componentWillMount4',this.props)
    if(rowData.isNeedRegister ==='1' && rowData.registerFlag && rowData.registerFlag === '1'){
      dispatch({
        type: 'trade/fetchCustRegisterFile',
        payload:{
          id: rowData.custId,
        }
      });
    }

  }

  componentDidMount()
  {

  }

  onFocus(){
    this.setState({isFixed:true})
  }
  onBlur(){
    this.setState({isFixed:false})
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

  tabClick(key)
  {
    let {dispatch} = this.props;
    dispatch({
      type:'formStorage/fetch',
      payload:{
        defaultActiveKey:key
      }
    });
    this.saveFormMethord();
  }

  sureSubmit(isSubmit,e)
  {
    // e.preventDefault();
    let {dispatch,location,formStorage,form} = this.props;
    const { getFieldProps,getFieldError } = form;
    let {formValue,capiList,attachList,defaultActiveKey} = formStorage;
    let {rowData} = location.state;
    //进行数据提交
    form.validateFields((error,value)=>{
      if(isRepeat>=1)  return;
      if(isSubmit==0||(isSubmit==1&&!error))
      {
        isRepeat = 1;
        let appendFormInfo = {
          remitDate:formValue.remitDate,
          currType:formValue.currType,
          reqAmt:formValue.reqAmt,
          fee:formValue.fee?formValue.fee:'',
          operCertNo:formValue.operCertNo,
          operCertType:formValue.operCertType,
          operator:formValue.operator
        };

        let param  = {
           ...appendFormInfo,
           ...value,
           custType:rowData.custType,
           contNo:rowData.contNo, //合同编号
           confStat:isSubmit,
           orderNo:rowData.orderNo,
           orderId:rowData.orderId,
           orderContNo:rowData.orderContNo,
           custId:rowData.custId,
           resvAmt:rowData.resvAmt,
           prodId:rowData.prodId,
           shrTypeId:rowData.shrTypeId,
           version:rowData.version==undefined?'':rowData.version,
        };
        if(param.remitDate)
        {
          param.remitDate = param.remitDate.format('YYYY-MM-DD');
        }


        dispatch({
          type:'trade/submitTradeBuy',
          payload:{
            params:param,
            backMethord:(data)=>{
              isRepeat = 0;
              if(data&&data.code=='00')
              {
                 if(isSubmit=='1')
                  {
                    // Toast.success('交易购买提交成功!!!', 3,()=>{
                      dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                        successTitle:'交易购买提交成功!',
                        backTitle:'返回可购买列表',
                      }}));
                    // });
                  }
                  else {
                    dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:'暂存成功!',
                      backTitle:'返回可购买列表',
                    }}));
                  }
              }
              else Toast.fail(data&&data.message?data.message:'交易提交错误!',3);

            }
          }
        });
      }
      else Toast.fail('输入参数中存在错误!',3);

    });
  }

  render(){
  let {dispatch,location,formStorage,form,trade} = this.props;
    let custRegisterFileList = trade.custRegisterFileList
    console.log('custRegisterFileList',custRegisterFileList)
  const { getFieldProps,getFieldError } = this.props.form;
  // let {stepNum,btnText,deActiveKey} = this.state;
  let {formValue,capiList,attachList,defaultActiveKey} = formStorage;
  let {rowData} = location.state;
  let isFixed = this.state.isFixed;
  //新加用户防止刷新时报错
  let pathname = location.pathname+'_inital';
  if(!formStorage[pathname])
    return <div />;
  // console.log('fsdfdsfdsgkl;k;kg;glkdksfsdkffk;kfskfskklsfl;ksfksld',location);
  const TitleProps = {
    title:'私募交易录入',
    showBack:'no'
  };
  let inveType = Dic.fetchDicValue('inveType',formValue.inveType);
  return (
    <div className={PerCusDetailStyles.mainContent} >
      <Title {...TitleProps} />
      <div className={tradeStyles.box}>
      {inveType?<p className={PerCusDetailStyles.prompText}>{inveType}</p>:<div/>}
      <div style={{backgroundColor:'#efeff4'}}>
          <p className={tradeStyles.WhiteSpace}></p>
          <div className={tradeStyles.contractInfo}>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>合同编号</p>
              <p className={tradeStyles.text_02}>{formValue.contNo}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>产品名称</p>
              <p className={tradeStyles.text_02}>{formValue.prodName}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>产品类别</p>
              <p className={tradeStyles.text_02}>{formValue.prodExpiName}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>客户名称</p>
              <p className={tradeStyles.text_02}>{formValue.custName}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>证件类型</p>
              <p className={tradeStyles.text_02}>{Dic.fetchDicValue('operCertType',formValue.certType)}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>证件号码</p>
              <p className={tradeStyles.text_02}>{formValue.certNo}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>交易类型</p>
              <p className={tradeStyles.text_02}>{Dic.fetchDicValue('tradCode',formValue.tradCode)}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01} style={{paddingLeft:0}}>预约金额(人民币)</p>
              <p className={tradeStyles.text_02}>{formValue.resvAmt}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>预约到期</p>
              <p className={tradeStyles.text_02}>{formValue.expiDate}</p>
            </div>
            <div className={tradeStyles.info00}>
              <p className={tradeStyles.text_01}>销售方式</p>
              <p className={tradeStyles.text_02}>{formValue.saleTypeName}</p>
            </div>
          </div>
        </div>
        <WhiteSpace/>
        <div style={{height:'100%',backgroundColor:'#efeff4'}}>
            <Tabs defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'} swipeable={false} animated={false} onChange={this.tabClick.bind(this)}>
              <TabPane tab="汇款信息" key="1">
                <div>
                  <RemitInfo dataSource={capiList}  dispatch={dispatch} orderInfo={rowData} />
                </div>
                <p style={{height:'120px'}}></p>
              </TabPane>
              <TabPane tab="合同详情" key="2">
                <div>
                  <XTContractDetail form={form} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}   formValue={formValue} dispatch={dispatch} formStorage={formStorage} custRegisterFileList={custRegisterFileList} orderInfo={rowData}/>
                  <p style={{height:'8rem',backgroundColor:'#efeff4'}}></p>
                </div>
              </TabPane>
              <TabPane tab="资料上传" key="3">
                <div>
                  <DataUpload  form={form} onFocus={this.onFocus.bind(this)}  onBlur={this.onBlur.bind(this)}   dispatch={dispatch} attachList={attachList} orderInfo={rowData} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className={tradeStyles.nextbtn} style={{position:'absolute',bottom:'0',left:'0', zIndex:'99',cursor:'pointer'}}>
            <p className={tradeStyles.nextStep0} style={{zIndex:'99'}}  onClick={this.sureSubmit.bind(this,0)}>暂存</p>
          <p className={tradeStyles.nextStep} style={{zIndex:'99'}} onClick={this.sureSubmit.bind(this,1)}>提交</p>
        </div>
    </div>);
  }
};

function connectTrade({trade,formStorage})
{
  return {trade,formStorage};
}

function onFieldsChange(props, changedFields)
{
	let {dispatch} = props;
	if(changedFields.reqAmt)
	{
		let reqAmtTF = changedFields.reqAmt;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        reqAmt:reqAmtTF.value
      }
    });
	}
}

export default connect(connectTrade)(createForm({onFieldsChange:onFieldsChange})(XTTradeInput));
