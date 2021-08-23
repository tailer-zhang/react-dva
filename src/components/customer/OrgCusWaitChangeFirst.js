import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import {List} from 'antd-mobile';
import Form from '../../utils/form';
import { createForm } from 'rc-form';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import proDetailStyles from '../../styles/product/ProductDetail.less';//样式文件

export default class OrgCusAddFirst extends React.Component{
  constructor() {
    super();
  }

  getOptions() {
    return({
      busiName: {
        required:false,
        type: 'text',
        desc:'机构名称',
        otherProps:{
            onBlur:(value)=>{
                if(value){
                    dispatch(
                        {
                            type:'formStorage/fetchFormValue',
                            payload:{
                                actualBenefit:value,
                            }
                        }
                    );
                }

            }
        }
      },
      linkName: {
        required:false,
        type: 'text',
        desc:'主联系人姓名'
      },
      linkSex: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('gender'),
        title:'主联系人性别',
        desc:'主联系人性别'
      },
      linkMobilePhone: {
        required:false,
        type: 'text',
        desc:'主联系人手机'
      }
    })
  }

  render() {
    let {dispatch,location,form,formValue,onChangeMethord,saveFormMethord} = this.props;
    return(
      <div className={PerCusDetailStyles.basicInfoWrap}>
        <div className={PerCusDetailStyles.infoWrap}>
          <List>
            <Form options={this.getOptions()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord} />
          </List>
        </div>
      </div>
    )
  }
}

// <ul>
//   <li className={proDetailStyles.infoItem}>
//     <p className={proDetailStyles.infoTitle1}>机构名称</p>
//     <p className={proDetailStyles.infoCon1}>海银金控</p>
//   </li>
//   <li className={proDetailStyles.infoItem}>
//     <p className={proDetailStyles.infoTitle1}>主联系人姓名</p>
//     <p className={proDetailStyles.infoCon1}>王佩佩</p>
//   </li>
//   <li className={proDetailStyles.infoItem}>
//     <p className={proDetailStyles.infoTitle1}>主联系人性别</p>
//     <p className={proDetailStyles.infoCon1} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}} onClick={() =>dispatch(routerRedux.push({
//       pathname: '/MarketMonth',
//       state: {
//         title: '性别',
//         dataSource:Dic.fetchDicList('gender'),
//         selectValue:'0',
//         onChange:()=>{
//
//        }}
//     }))}>
//       <img src={require("../../image/icon/male.png")} className={PerCusDetailStyles.s_icon} style={{marginRight:'15px'}}/>
//       男
//       <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
//     </p>
//   </li>
//   <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
//     <p className={proDetailStyles.infoTitle1}>主联系人手机</p>
//     <p className={proDetailStyles.infoCon1}>13626269898</p>
//   </li>
// </ul>
