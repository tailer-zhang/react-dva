import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import tradeInfo from '../../styles/trade/redeem.less';
import BankAccountModifyItem from '../../components/customer/BankAccountModifyItem'

class BankAccountModifyCnt extends React.Component{
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
            bankImageList:[]
          },
          location,
        });
      },
    });
  }

  render(){
    const titleProps = {
      title:'开户行变更',
      showback: 'yes'
    };
    let {formStorage, bank, location} = this.props
    let fileList = bank.accountDetails && bank.accountDetails.privateProductList ? bank.accountDetails.privateProductList : []
    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <BankAccountModifyItem formStorage={formStorage} fileList = {fileList} details={bank.accountDetails} location={location}/>
      </div>);
  }
};
function connectTradeFun({formStorage, bank}){
  return {formStorage, bank}
}
export default connect(connectTradeFun)(BankAccountModifyCnt);

