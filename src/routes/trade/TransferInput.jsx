import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import tradeInfo from '../../styles/trade/redeem.less';
import TransferInputItem from '../../components/customer/TransferInputItem'

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
            formValue: {
              transferType: location.state.type === '3'?['01']:''
            },
            changeList:[],
            changeList1:[],
            changeList2:[],
            bankImageList:[]
          },
          location,
        });
      },
    });
  }

  render(){
    const titleProps = {
      title:'转受让交易录入',
      showback: 'yes'
    };
    let {formStorage} = this.props
    let {state} = this.props.location

    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <TransferInputItem type={state.type} details={state.data} originData={state.originData} newBankData={formStorage.newBank || ''} formStorage={formStorage}/>
      </div>);
  }
};
function connectTradeFun({formStorage,trade}){
  return {formStorage,trade }
}
export default connect(connectTradeFun)(AccountChange);

