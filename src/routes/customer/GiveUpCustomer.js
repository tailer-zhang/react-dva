//放弃原因
import React, { Component,PropTypes } from 'react';
import Titles from '../../components/product/Titles';
import { List,Toast} from 'antd-mobile';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import Form from '../../utils/form';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';

import proDetailStyles from '../../styles/product/ProductDetail.less';
import giveUpStyles from '../../styles/customer/giveUp.less';

const Item = List.Item;

class GiveUpCustomer extends React.Component{
    constructor() {
      super();
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

    getOptions(mode) {
      let ViewSetting = {
        reasonName:'放弃原因',
        placeholder:'放弃说明'
      };
      if(mode&&mode=='black')
          ViewSetting = {
            reasonName:'拉黑原因',
            placeholder:'拉黑说明'
          };
      return(
        mode=='black'?{
        blackReason: {
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('noPassReason'),
          title: ViewSetting.reasonName,
          desc:ViewSetting.reasonName
        },
        blackDesc: {
          required:false,
          type: 'text',
          desc:ViewSetting.placeholder
        }}
        :{reason: {
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('noPassReason'),
          title: ViewSetting.reasonName,
          desc:ViewSetting.reasonName
        },
        desc: {
          required:false,
          type: 'text',
          desc:ViewSetting.placeholder
        }}
      )
    }

    render() {

      let {dispatch,form,formStorage,location,instiCustInfo} = this.props;
      let {formValue,activeKey} = formStorage;
      let { getFieldProps,getFieldError} = form;

      let {customer} = location.state;
      let mode = location.state.mode;
      let ViewSetting = {
        title:'放弃客户',
      };
      if(mode&&mode=='black')
          ViewSetting = {
            title:'拉黑客户',
          };
      return (
        <div>
          <div className={giveUpStyles.giveUpheader}>
            <Titles {...ViewSetting}>
              <div className={giveUpStyles.cancel} onClick={()=>dispatch(routerRedux.goBack())}>取消</div>
              <div className={giveUpStyles.push} onClick={()=>{
                if(mode == 'black') { //拉黑
                  form.validateFields((error,value)=>{
                    console.log('----------error',error,value);
                    if(error==null||(!error.reason&&!error.desc))
                    {
                       let saveValue = {...value,
                                     custID:customer.custID,
                                     };

                       dispatch({
                         type:'customer/custBlackList',
                         payload:{
                           params:saveValue,
                           backMethord:(data)=>{
                             if(data&&data.code=='0') {
                               Toast.success('拉黑成功',2);
                               dispatch(routerRedux.go(-2));

                             }
                             else {
                               Toast.fail(data&&data.msg?data.msg:'提交数据错误!',2);
                             }
                           }
                         }
                       });

                    }
                    else {
                      Toast.fail('输入参数中存在错误!',2);
                    }
                  });
                } else{ //放弃
                  form.validateFields((error,value)=>{
                    console.log('----------error',error,value);
                    if(error==null||(!error.reason&&!error.desc))
                    {
                       let saveValue = {...value,
                                       custID:customer.custID,
                                       custClass: customer.custClass
                                     };
                       dispatch({
                         type:'customer/custGiveUp',
                         payload:{
                           params:saveValue,
                           backMethord:(data)=>{
                             if(data&&data.code=='0') {
                               dispatch(routerRedux.go(-2));
                               Toast.success('放弃成功',2);
                             }
                             else {
                               Toast.fail(data&&data.msg?data.msg:'提交数据错误!',2);
                             }
                           }
                         }
                       });
                    }
                    else {
                      Toast.fail('输入参数中存在错误!',2);
                    }
                  });
                }
              }}>提交</div>
            </Titles>
          </div>
          <p className={giveUpStyles.pFull}></p>
          <List>
            <Form options={this.getOptions(mode)} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}/>
          </List>
        </div>
      )
    }
};

function connectCustomerFunc({customer,formStorage})
{
  return {customer,formStorage};
}


export default connect(connectCustomerFunc)(createForm()(GiveUpCustomer));
