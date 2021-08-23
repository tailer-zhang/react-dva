import React from 'react';
import Title from '../../components/product/Title';
import RegAuthItem from '../../components/trade/RegAuthItem';
import { connect } from 'dva';
import modifyStyle from '../../styles/customer/cusModifyStyle.less';
import { Toast } from 'antd-mobile';

class ApplyPendingupdate extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let { dispatch,bank,location } = this.props;
    const TitleProp = {title:'登记注册身份验证查看',showBack: 'yes'};
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...TitleProp}></Title>
        </div>
        <div className={modifyStyle.secCustomer} style={{paddingTop: '1.47333rem'}}>
          <RegAuthItem
            dataSource={bank}
            dispatch={dispatch}
            location={location}
          />
        </div>
      </div>
    )
  }
}
function connectSec({trade,rebutSpace,formStorage}) {
  return {trade,rebutSpace,formStorage}
}

export default connect(connectSec)(ApplyPendingupdate);
