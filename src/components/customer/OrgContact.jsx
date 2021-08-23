import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Dic from '../../utils/dictionary';

import { List, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';


//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

let SwitchExample = React.createClass({
  onClick() {
    console.log(this.props.form.getFieldsValue());
  },
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List>
        <List.Item
          extra={<Switch
            {...getFieldProps('Switch', {
              initialValue: false,
              valuePropName: 'checked',
            })}
          />}
        >查看联系方式</List.Item>
      </List>
    );
  },
});

SwitchExample = createForm()(SwitchExample);


export default class OrgContact extends React.Component {
  constructor(props){
      super(props);
      this.state={
        show: false
      }
  }

  render() {
  let {data} = this.props;
  const { getFieldProps } = this.props.form;
    return (
      <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom:'120px'}}>
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
        {
          this.state.show==false?<div />:<div className={PerCusDetailStyles.contactInfo}>
            <div className={PerCusDetailStyles.infoWrap}>
              <ul>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人证件类型</p>
                  <p className={proDetailStyles.infoCon}>
                    {
                      Dic.fetchDicValue('certTypes',data.linkIDType)
                    }
                  </p>
                </li>
                {
                  data.linkIDType == '04'?<li className={proDetailStyles.infoItem}>
                    <p className={proDetailStyles.infoTitle}>说明</p>
                    <p className={proDetailStyles.infoCon}>{data.linkIDDesc}</p>
                  </li>:''
                }
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人证件号码</p>
                  <p className={proDetailStyles.infoCon}>{data.linkIDCard}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人手机</p>
                  <p className={proDetailStyles.infoCon}>{data.linkMobilePhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人固话</p>
                  <p className={proDetailStyles.infoCon}>{data.linkPhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人传真</p>
                  <p className={proDetailStyles.infoCon}>{data.linkFax}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>主联系人电子邮箱</p>
                  <p className={proDetailStyles.infoCon}>{data.linkEmail}</p>
                </li>
                <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                  <p className={proDetailStyles.infoTitle}>邮编</p>
                  <p className={proDetailStyles.infoCon}>{data.post}</p>
                </li>
              </ul>
            </div>
            <div className={PerCusDetailStyles.infoWrap}>
              <ul>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人姓名</p>
                  <p className={proDetailStyles.infoCon}>{data.deciName}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人性别</p>
                  <p className={proDetailStyles.infoCon} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <img className={PerCusDetailStyles.s_icon} style={{marginRight:'19px'}} src={data.deciSex=='02'?
                    require("../../image/icon/female.png")
                    :(data.deciSex=='01'?require("../../image/icon/male.png")
                    :require("../../image/icon/blank.png"))}/>
                    {
                      Dic.fetchDicValue('gender',data.deciSex)
                    }
                  </p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人年龄</p>
                  <p className={proDetailStyles.infoCon}>{data.deciAge}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人手机</p>
                  <p className={proDetailStyles.infoCon}>{data.deciMobilePhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人固话</p>
                  <p className={proDetailStyles.infoCon}>{data.deciPhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>决策人传真</p>
                  <p className={proDetailStyles.infoCon}>{data.deciFax}</p>
                </li>
                <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                  <p className={proDetailStyles.infoTitle}>决策人电子邮箱</p>
                  <p className={proDetailStyles.infoCon}>{data.deciEmail}</p>
                </li>
              </ul>
            </div>
            <div className={PerCusDetailStyles.infoWrap}>
              <ul>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务姓名</p>
                  <p className={proDetailStyles.infoCon}>{data.finaName}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务性别</p>
                  <p className={proDetailStyles.infoCon} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <img src={data.finaSex=='02'?
                    require("../../image/icon/female.png")
                    :(data.finaSex=='01'?require("../../image/icon/male.png")
                    :require("../../image/icon/blank.png"))}
                     className={PerCusDetailStyles.s_icon} style={{marginRight:'19px'}}/>
                      {
                        Dic.fetchDicValue('gender',data.finaSex)
                      }
                    </p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务年龄</p>
                  <p className={proDetailStyles.infoCon}>{data.finaAge}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务手机</p>
                  <p className={proDetailStyles.infoCon}>{data.finaMobilePhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务固话</p>
                  <p className={proDetailStyles.infoCon}>{data.finaPhone}</p>
                </li>
                <li className={proDetailStyles.infoItem}>
                  <p className={proDetailStyles.infoTitle}>财务传真</p>
                  <p className={proDetailStyles.infoCon}>{data.finaFax}</p>
                </li>
                <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                  <p className={proDetailStyles.infoTitle}>财务电子邮箱</p>
                  <p className={proDetailStyles.infoCon}>{data.finaEmail}</p>
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}
OrgContact = createForm()(OrgContact);
