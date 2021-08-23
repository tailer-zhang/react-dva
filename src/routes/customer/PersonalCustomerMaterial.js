//个人客户详情-基本信息-客户资料  赵博文
import React from 'react';
import {connect} from 'dva';
import Title from '../../components/product/Title';
import { Card, WingBlank, WhiteSpace ,Modal} from 'antd-mobile';
import styles from '../../styles/customer/personalCustomerMaterial.less';
import {ImageHostAddress} from '../../utils/commonUtil';
import ShowImg from '../../components/share/ShowImg';

class PersonalCustomerMaterial extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let {location} = this.props;
    const titleProps = {title: '客户资料'};
    let state = location.state;
    console.log('state------',state);
    if(state==undefined||state==null)
    state = {
      memPic:[],
      certPic:[]
    };
    return (
      <div className={styles.total}>
        <Title { ...titleProps }/>
        <div>
          <ShowImg title="证件扫描件" imgFiles={state.certPic} imgUseType={'customer'}/>
          <ShowImg title="会员扫描件" imgFiles={state.memPic} imgUseType={'customer'}/>
        </div>
      </div>
    )
  }
}

export default PersonalCustomerMaterial;
