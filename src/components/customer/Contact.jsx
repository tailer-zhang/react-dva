import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import {decryptStr} from '../../utils/createEncrypt';
import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';


export default class Contact extends React.Component {
  constructor(props){
      super(props);
      this.state={
        show: false
      }
  }
  render() {
    const {perCustInfo} = this.props;
    const data = perCustInfo.perInfoList;
    const { getFieldProps } = this.props.form;
    return (
      <div className={PerCusDetailStyles.basicInfoWrap}>
        <div className={PerCusDetailStyles.infoWrap} style={{marginTop:'0',paddingLeft:'0'}}>
          <List>
            <List.Item
              extra={<Switch
                {...getFieldProps('Switch', {
                  initialValue: false,
                  valuePropName: 'checked',
                  onChange:()=>{this.setState({show: !this.state.show})}
                })}
              />}
            >查看联系方式</List.Item>
          </List>
        </div>
        {this.state.show==false?'':
        <div className={PerCusDetailStyles.contactInfo}>
          <div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>手机</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.mobilePhone)}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>电子邮箱</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.email)}</p>
              </li>
            </ul>
          </div>
          <div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>联络顺序</p>
                <p className={proDetailStyles.infoCon}>
                  { Dic.fetchDicValue('contactOrder',data.contactOrder) }
                </p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>通讯地址</p>
                <p className={proDetailStyles.infoCon}>
                  { Dic.fetchDicValue('postAddress',data.postAddress) }
                </p>
              </li>
            </ul>
          </div>
          <div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>家庭电话</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.familyPhone)}</p>
              </li>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>家庭地址</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.familyAddress)}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>家庭邮编</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.familyPostCode)}</p>
              </li>
            </ul>
          </div>
          <div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>单位电话</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.companyPhone)}</p>
              </li>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>单位地址</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.companyAddress)}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>单位邮编</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.companyPostCode)}</p>
              </li>
            </ul>
          </div>
          {/*<div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>其它地址</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.otherAddress)}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>其它邮编</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.otherPostCode)}</p>
              </li>
            </ul>
          </div>*/}
          <div className={PerCusDetailStyles.infoWrap}>
            <ul>
              <li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>紧急联系人</p>
                <p className={proDetailStyles.infoCon}>{data.linkMen}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>紧急联系人电话</p>
                <p className={proDetailStyles.infoCon}>{decryptStr(data.linkPhone)}</p>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    )
  }
};

Contact = createForm()(Contact);
