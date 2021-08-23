import React from 'react';
import Title from '../../components/product/Title';
import SelectableList from '../../components/customer/SelectableList';
import { connect } from 'dva';
import modifyStyle from '../../styles/customer/cusModifyStyle.less';
import {routerRedux} from "dva/router";

class SelectBankCus extends React.Component{
  constructor(props){
    super(props)
  }
  addBankFn=()=>{
    let { dispatch,bank,location } = this.props;
    let {transInfo,addBank} = location.state;
    if(transInfo === '0'){
      dispatch(routerRedux.push({
        pathname: '/newBankId',
        state: {data: addBank, mode: 'add',tradMode:undefined, from: 'selectBankCus',transInfo:'0'}
      }))
    }else{
      dispatch(routerRedux.push({
        pathname: '/newBankId',
        state: {data: location.state.originData.data || {}, mode: 'add',tradMode:undefined, from: 'selectBankCus'}
      }))
    }
  }
  render(){
    let { dispatch,bank,location } = this.props;
    console.log(' this.props1111', this.props)
    let {transInfo,addBank} = location.state;
    const TitleProp = {title:'选择银行账户',showBack: 'yes'};
    let getData = {};
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...TitleProp}>
            <div className={modifyStyle.titleImg}
                 onClick={this.addBankFn}>
              新增
            </div>
          </Title>
        </div>
        <div className={modifyStyle.secCustomer} style={{paddingTop: '1.47333rem'}}>
          <SelectableList
            dataSource={bank}
            dispatch={dispatch}
            location={location}
          />
        </div>
      </div>
    )
  }
}
function connectSec({bank}) {
  return {bank}
}

export default connect(connectSec)(SelectBankCus);
