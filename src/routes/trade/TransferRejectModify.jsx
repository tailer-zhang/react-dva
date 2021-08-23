import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import tradeInfo from '../../styles/trade/redeem.less';
import TransferInputItemModify from '../../components/customer/TransferInputItemModify'

class AccountChange extends React.Component{
  constructor(props) {
    super(props);
  }


  render(){
    const titleProps = {
      title:'转让申请驳回修改',
      showback: 'yes'
    };
    let {formStorage,dispatch,location,form,rebutSpace} = this.props
    console.log('this.propsMOOOOOOOOOOOOOOOOOOOO',this.props)
    let {state} = this.props.location

    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <TransferInputItemModify type={state.type}
                                 details={state.data} location = {location} dispatch = {dispatch} formStorage={formStorage}/>
      </div>);
  }
};
function connectTradeFun({formStorage,rebutSpace,trade}){
  return {formStorage,rebutSpace,trade }
}
export default connect(connectTradeFun)(AccountChange);

