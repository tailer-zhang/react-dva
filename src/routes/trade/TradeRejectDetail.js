//驳回修改详情 赵博文
import React from 'react';
import TradeRejectCause from '../../components/trade/TradeRejectCause';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Toast} from 'antd-mobile';
import Title from '../../components/product/Title';
import TradeRejectTabs from '../../components/trade/TradeRejectTabs';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/tradeRejectDetail.less';

class TradeRejectDetail extends React.Component{
  constructor() {
    super();
  }

  onChangeMethord(item,value,name)
  {
    let {dispatch,form,formStorage} = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord(payload)
  {
    let {dispatch,formStorage} = this.props;
    let formValue = formStorage.formValue;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }

  onSubmit(e) {
    // e.preventDefault();
    let {dispatch,form,formStorage,location,tradeSafe} = this.props;
    let {formValue,activeKey,list,paymentIdlist} = formStorage;
    form.validateFields((error,value)=>{
      console.log('----------error',error,value);
      if(error==null&&formValue.prodId&&formValue.kpiId)
      {
         let saveValue = {
                          ...formValue,
                          ...value,
                          // effectDate: value.effectDate.format('YYYY-MM-DD'),
                          list: list,
                          paymentIdlist:paymentIdlist?paymentIdlist:[],
                        };
                        console.log('saveValue.effectDate',saveValue.effectDate);
          let param = {
            custCode: 'haiyin',
             ...saveValue,
             effectDate: saveValue.effectDate.format('YYYY-MM-DD'),
          };

          // console.log('param----',param);  return;

         dispatch({
           type:'tradeSafe/tradeSafeReModify',
           payload:{
             params:param,
             backMethord:(data)=>{
               if(data&&data.code=='00')
                 dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                   successTitle:'B类产品修改成功!',
                   backTitle:'返回B类产品修改列表',
                 }}));
               else if(data&&data.code=='9999')
                 Toast.fail(data&&data.message?data.message :'驳回修改提交错误!',2);
               else Toast.fail(data&&data.msg?data.msg:'驳回修改提交错误!',2);
             }
           }
         });
      }
      else {
        Toast.fail('输入参数中存在错误!',2);
      }
    });
  }

  onCancel(e) {
    // e.preventDefault();
    let {dispatch,form,formStorage} = this.props;
    let {formValue} = formStorage;
    dispatch({
      type:'tradeSafe/tradeSafeReDelete',
      payload:{
        params:{
          id: formValue.id
        },
        backMethord:(data)=>{
          if(data&&data.code=='00')
          dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
            successTitle:'B类产品删除成功!',
            backTitle:'返回驳回修改列表',
          }}));
          else Toast.fail(data&&data.msg?data.msg:'驳回删除提交错误!',2);
        }
      }
    });
 }

  render() {
    let {dispatch,form,formStorage,location,tradeSafe} = this.props;
    let {formValue,activeKey,list} = formStorage;
    let { getFieldProps,getFieldError} = form;
    const titleProps = {title: '驳回修改'};

    // console.log('---------formValue',formValue);


    // let dataSource = tradeSafe.tradeContractDetail;
    // if(dataSource==undefined) dataSource = [];
    // let insurModel = dataSource.insurModel;
    // if (insurModel==undefined) insurModel={};
    // console.log('insurModel',insurModel);
    //
    // if(popValue==undefined) popValue={};
    // let popList = popValue.list;
    //
    // console.log('---popValue--',popValue);

    return (
      <div>
        <Title {...titleProps}/>
        <div className={styles.boxScroll}>
          <TradeRejectCause data = {tradeSafe.tradeContractDetail} />
          <TradeRejectTabs dispatch={dispatch}  location={location}
            form={form} formValue={formValue} recordList={list}
            defaultActiveKey={activeKey}
            onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)}
          />
          <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.cancel} onClick={this.onCancel.bind(this)}>
            <img src={require('../../image/customer/personalMore2_03.png')} />
            <p>删除</p>
          </div>
          <div className={styles.submit} onClick={this.onSubmit.bind(this)}>
          提交</div>
        </div>
      </div>
    )
  }
}

function connectTradeReject({tradeSafe,formStorage}) {
  return {tradeSafe,formStorage}
}

export default connect(connectTradeReject)(createForm()(TradeRejectDetail));
