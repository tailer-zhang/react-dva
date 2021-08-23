import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import tradeInfo from '../../styles/trade/redeem.less';
import AccountChangeItem from '../../components/customer/AccountChangeItem'

class AccountChange extends React.Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let {dispatch, location} = this.props
    dispatch({
      type: 'formStorage/initState',
      location,
      initMethord: () => {
        dispatch({
          type: 'formStorage/fetchState',
          payload: {
            formValue: {},
            changeList:[],
            changeList1:[],
            bankImageList:[]
          },
          location,
        });
      },
    });
  }

  render(){
    const titleProps = {
      title:'受益账户变更',
      showback: 'yes'
    };
    let {formStorage} = this.props
    let {state} = this.props.location

    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <AccountChangeItem details={state.data} originData={state.originData} newBankData={formStorage.newBank || ''} formStorage={formStorage}/>
      </div>);
  }
};
function connectTradeFun({formStorage}){
  return {formStorage }
}
export default connect(connectTradeFun)(AccountChange);

