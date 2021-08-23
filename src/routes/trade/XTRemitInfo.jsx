//汇款信息页面（添加和修改）-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import { List,Toast, ActivityIndicator } from 'antd-mobile';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import {decryptStr} from '../../utils/createEncrypt';
import MarketMonth from '../productPages/MarketMonth';
import Titles from '../../components/product/Titles';//顶部标题和返回按钮组件
import XTRemitForm from '../../components/trade/XTRemitForm';//汇款信息表单组件

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
var i = 0
class  XTRemitInfo extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       content: '',
       animating: false,
     }
  }


  goBack()
  {
    // dispatch({
    //   type:'formStorage/fetchFormValue',
    //   payload:{
    //     formValue:{},
    //   }
    // });
    let {dispatch} = this.props;
    dispatch(routerRedux.goBack());
  }

  deleteCapiInfo(e)
  {
    // e.preventDefault();
    let { dispatch,formStorage,tradeForm,location,form,onChangeMethord,trade} = this.props;
    let { remitFormValue,capiList}  = formStorage;
    let { remitData,mode,orderInfo,index} = location.state;
    dispatch({
      type:'tradeForm/fetchCapiDelete',
      payload:{
        params:{
          id:remitData.id,
          reqSeq:remitData.reqSeq?remitData.reqSeq:undefined,
          orderNo:orderInfo.orderNo
        },
        backMethord:(data)=>{
          if(data.code=='00')
          {
            capiList.splice(index,1);
            dispatch({
              type:'formStorage/fetch',
              payload:{
                capiList:capiList
              }
            });
            dispatch(routerRedux.goBack());
          }
          else  Toast.fail(data&&data.message?data.message:'删除错误！',2);
        }
      },

    });
  }

  sureSubmit()
  {
    console.log('打印')
    let { dispatch,formStorage,tradeForm,location,form,onChangeMethord,trade} = this.props;
    let { remitFormValue,capiList,key}  = formStorage;
    let { remitData,mode,orderInfo,index} = location.state;
    form.validateFields((error,value)=>{
      if(!remitFormValue.lendCardNo)
      {
        Toast.fail('汇款账号不能为空!',2);
        return;
      }
      // else if(!remitFormValue.borrCardNo)
      // {
      //   Toast.fail('收款账号不能为空!',2);
      //   return;
      // }

      if(!error)
      {
        this.setState({
          animating: true,
        })
        console.log('---form结果---',value);
        let modifyValue = {};
        if(mode=='edit')
        {
          modifyValue = {
            id:remitData.id,
          };
        }
        let saveValue = {
        ...value,
        ...modifyValue,
        tradTime:value.tradTime.format('YYYY-MM-DD HH:mm:ss'),
        orderContNo:orderInfo.orderContNo,
        custId:orderInfo.custId,
        tradCode:orderInfo.tradCode,
        prodCode:orderInfo.prodCode,
        custName:remitFormValue.custName,
        // borrCardNo:remitFormValue.borrCardNo,
        lendCardNo:remitFormValue.lendCardNo,
        orderNo:orderInfo.orderNo,
        reqSeq:orderInfo.reqSeq?orderInfo.reqSeq:'',
        version:remitFormValue.version?remitFormValue.version:'',
        mgrCapiSeqId:remitFormValue.mgrCapiSeqId,
        };
        dispatch({
         type:'trade/editTradeCapi',
         payload:{
           params:saveValue,
           backMethord:(data)=>{
            if(data&&data.code=='00')
            {
              i ++
              this.setState({
                animating: false,
              })
              let newData = {
                ...saveValue,
                ...data.model,
                tradTime:saveValue.tradTime,
                bankName:remitFormValue.bankName
              };
              if(mode=='edit')
              {
                capiList.splice(index,1,newData);
              }
              else {
                capiList.push(newData);
              }
              if (i > 1) {
                this.setState({
                  animating: false,
                })
              }else {
                this.setState({
                  animating: false,
                })
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    capiList:capiList
                  }
                });
              }
              dispatch(routerRedux.goBack());
            }
            else {
              Toast.fail(data&&data.message?data.message:'提交错误！',3);
              this.setState({
                animating: false,
              })
            }
           }
         }
        });
      }
      else {
        if(value.tradTime === ''){
          this.setState({submitClickNum:0});
          Toast.fail('请选择预计打款日期!',1);
        }else {
          this.setState({submitClickNum:0});
          Toast.fail('输入参数存在错误！',1);
        }
      }
    })
  }

  render()
  {
    let { dispatch,formStorage,tradeForm,location,form,onChangeMethord,trade} = this.props;
    let { remitFormValue}  = formStorage;
    let {mode,remitDate} = location.state;
    const titleProps = {title: '汇款信息'};
    return(
      <div className={PerCusDetailStyles.mainContent}>
        <Titles {...titleProps}>
          <p style={{fontSize: '0.4533rem',color: '#f22f33',position: 'absolute',
          left: '0.2933rem',zIndex:'5',top:'0'}}
          onClick={this.goBack.bind(this)}
          >取消</p>
          <p style={{fontSize: '0.4533rem',color: '#f22f33',position: 'absolute',
          right: '0.2933rem',zIndex:'5',top:'0'}}
          onClick={this.sureSubmit.bind(this)}
          >完成</p>
        </Titles>
        <div className={tradeStyles.controlMenu}>
          <div className={tradeStyles.tabInput}>
            <XTRemitForm form={form}  dispatch={dispatch}  formValue={remitFormValue} {...location.state}
              showDelete={mode=='edit'}
              location={location}
              deleteRemitInfoMethord={this.deleteCapiInfo.bind(this)}  />
          </div>
        </div>
        <ActivityIndicator
          size='large'
          color='red'
          toast
          text={this.state.content}
          animating={this.state.animating}
        />
      </div>
    )
  }
}

function connectTradeFun({tradeForm,formStorage}){
  return { tradeForm,formStorage };
};

function onFieldsChange(props, changedFields)
{
	let {dispatch} = props;
	if(changedFields.amount)
	{
		let amountTF = changedFields.amount;
      dispatch({
        type:'formStorage/fetchNewState',
        payload:{
          newValue:{
            amount:amountTF.value
          },
          key:'remitFormValue'
        }
      });
	}
}

export default connect(connectTradeFun)(createForm({onFieldsChange:onFieldsChange})(XTRemitInfo));
