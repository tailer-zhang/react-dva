//交易 驳回修改 认购驳回修改
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';
import { List,WhiteSpace,Tabs,InputItem,Toast } from 'antd-mobile';
import DataUpload from '../../components/trade/DataUpload';
import RemitInfo from '../../components/trade/RemitInfo';
import ContInfo from '../../components/share/ContInfo';
import Dic from '../../utils/dictionary';
import {decryptStr} from '../../utils/createEncrypt';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';


import redeemStyles from '../../styles/trade/redeem.less';
import rebutStyles from '../../styles/trade/rebut.less';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

const RejectCom = ({data,rejectFlag})=>{
  return(
      <div className={rebutStyles.rebutCause}>
          <section>
            <p>驳回原因</p>
            <p>驳回人/驳回时间</p>
          </section>
          <section>
            <p>{data.noPassReason}</p>
            <p><span >{data.appUserName}</span>/<span>{data.appTime}</span></p>
          </section>
        </div>
  );
}


class RebutBuyChange extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isFixed: false
    }
  }
  componentWillMount() {
    let {dispatch,form,location} = this.props;
    let tradeModel = location.state.data.tradeModel
    console.log('this.props  componentWillMount5555555555',this.props)
    if(tradeModel.isNeedRegister ==='1' && tradeModel.registerFlag && tradeModel.registerFlag === '1'){
      dispatch({
        type: 'trade/fetchCustRegisterFile',
        payload:{
          id: tradeModel.custId,
        }
      });
    }

  }

  onFocus(){
    this.setState({isFixed:true})
  }
  onBlur(){
    this.setState({isFixed:false})
  }

  onChange (e) {
    let { dispatch } = this.props;
    let payload = {bankName:e};
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }
  onChangeMethord(item,value,name)
  {
    let { dispatch } = this.props;
    let payload = { };
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
  sureSubmit(e)
  {
    // e.preventDefault();
    let { dispatch,location,formStorage,form} = this.props;
    const { getFieldProps,getFieldError } = form;
    let { formValue,capiList,attachList,defaultActiveKey } = formStorage;
    let { data } = location.state;
    let rowData = data.tradeModel;
    form.validateFields((error,value)=>{
      if(!error)
      {
         let saveValue = {
           remitDate:formValue.remitDate,
           currType:formValue.currType,
           reqAmt:formValue.reqAmt,
           fee:formValue.fee,
           bankName:formValue.bankName,
           reqStat:rowData.reqStat,
           contNo:rowData.contNo,//合同编号
           orderNo:rowData.orderNo,//订单编号
           oriBankName:rowData.bankName,
           operator:formValue.operator==undefined?'':formValue.operator ,
           operCertType:formValue.operCertType==undefined?'':formValue.operCertType,
           operCertNo:formValue.operCertNo==undefined?'':formValue.operCertNo,
         };

          let param = {
            ...saveValue,
            ...value,
            id:rowData.id,
            reqSeq:rowData.reqSeq,
            custId:rowData.custId,
            custType:rowData.custType,
            accId:rowData.accId,
            prodId:rowData.prodId,
            shrTypeId:rowData.shrTypeId,
            orderContNo:rowData.orderContNo,
            tradCode:rowData.tradCode,
            resvAmt:data.tradeModel.resvAmt,//申请金额
            expiDate:rowData.expiDate,
            orderNo:rowData.orderNo,
            version:rowData.version,
          }
          if(param.remitDate){
            param.remitDate = param.remitDate.format('YYYY-MM-DD');
          }
          // console.log('===0000000',param)
        dispatch({
            type:'rebutSpace/fetchSubmit',
            payload:{
              params:param,
              backMethord:(data)=>{
                if(data&&data.code=='00')
                {
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'认、申购驳回修改提交成功!',
                    backTitle:'返回驳回修改列表',
                    backMethord:()=>{
                      dispatch(routerRedux.push({pathname:'/tradeRebut'}))
                    }
                  }}));
                }
                else if(data&&data.message){
                    let cutStr = "<br/>";
                    if(data.message.indexOf(cutStr)>0){
                      let newMessage = data.message.replace(new RegExp(cutStr),"");
                      Toast.fail(<textarea rows='5' cols='40' style={{backgroundColor:'rgba(0,0,0,0)',color:'#ffffff',textAlign:'center' }} value={newMessage}>{newMessage}</textarea>,3);
                    }
                    else {
                      Toast.fail(data.message,3)
                    }
                  }
                  else {
                    Toast.fail('资料上传错误！',3)
                  }
              }
            }
          });
      }
      else {
        Toast.fail('输入参数中存在错误!',3);
      }
    })
  }


  render(){
    const { dispatch,location,formStorage,form,rebutSpace} = this.props;
    let custRegisterFileList = rebutSpace.custRegisterFileList || []
    console.log('custRegisterFileList',custRegisterFileList)
    const { formValue,capiList,attachList,defaultActiveKey } = formStorage;
    let { data,rejectFlag } = location.state;
    let isFixed = this.state.isFixed;
    let rowData = data.tradeModel;
    //新加用户防止刷新时报错
    let pathname = location.pathname+'_inital';
    if(!formStorage[pathname])
      return <div />;
    const titleProps = {
      title:'认购驳回修改',
    };
    const pushTitle= {
      fileTitle:'汇款资料'
    };
    return (
      <div className={rebutStyles.buyChange}>
        <Title {...titleProps}/>
        <div className={redeemStyles.box}>
        <RejectCom data={data}/>
        <Tabs defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'} swipeable={false} animated={false} onTabClick={this.tabClick.bind(this)}>
         <TabPane tab="汇款信息" key="1">
            <RemitInfo  dataSource={capiList} orderInfo={rowData}  form={form} dispatch={dispatch} rejectFlag={rejectFlag} onChangeMethord={this.onChangeMethord.bind(this)} disableEdit={rowData.reqStat=='2'|| rowData.reqStat=='4'} errMsg={'交易已上送或已确认不允许修改资金信息!'} />
            <p style={{height:'160px'}}></p>
         </TabPane>
         <TabPane tab="合同详情" key="2">
            <div>
              <ContInfo formValue={formValue} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}
                        onChange={this.onChange.bind(this)} form={form} dispatch={dispatch}
                        custRegisterFileList={custRegisterFileList}
                        formStorage={formStorage} onChangeMethord={this.onChangeMethord.bind(this)} orderInfo={rowData}/>
            </div>
            <p style={{height:'2rem'}}></p>
         </TabPane>
         <TabPane tab="资料上传" key="3">
           <DataUpload  dispatch={dispatch} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} attachList={attachList} orderInfo={rowData} rejectFlag={rejectFlag}/>
         </TabPane>
       </Tabs>
       </div>
        <p className={redeemStyles.shBtn} onClick={this.sureSubmit.bind(this)} style={{position:'fixed',zIndex:'99'}}>提交</p>
      </div>
    );
  }
}


function connectProdunctFunc({formStorage,rebutSpace})
{
 return { formStorage,rebutSpace }
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

export default connect(connectProdunctFunc)(createForm({onFieldsChange:onFieldsChange})(RebutBuyChange));


// {/*  ...value,
  // remitDate:value.remitDate.format('YYYY-MM-DD'),
  // id:rowData.id,
  // reqSeq:rowData.reqSeq,
  // custId:rowData.custId,
  // custType:rowData.custType,
  // accId:rowData.accId,
  // prodId:rowData.prodId,
  // shrTypeId:rowData.shrTypeId,
  // orderContNo:rowData.orderContNo,
  // tradCode:rowData.tradCode,
  // resvAmt:rowData.reqAmt,//申请金额
  // expiDate:rowData.expiDate,
  // orderNo:rowData.orderNo,
  // version:rowData.version,*/}
