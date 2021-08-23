import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import tradeInfo from '../../styles/trade/redeem.less';
import TransferRejectItem from '../../components/customer/TransferRejectItem'

class TransferReject extends React.Component{
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
      title:'转让申请驳回详情',
      showback: 'yes'
    };
    let {formStorage,rebutSpace} = this.props
    let {state} = this.props.location
    // console.log('@@@@@@@this.props',this.props)
    // console.log('rebutSpace',rebutSpace)

    return (
      <div className={tradeInfo.tradeInfo + ' ' + tradeInfo.tradeTabBox }>
        <Title {...titleProps} from='redeem'></Title>
        <TransferRejectItem rejectFlag = {state.rejectFlag} rebutSpace = {rebutSpace}
          type={state.type} details={rebutSpace.model.tradeModel} originData={state.originData}  formStorage={formStorage}/>
      </div>);
  }
};
function connectTransferReject({rebutSpace,formStorage,trade}){
  return {rebutSpace,formStorage,trade }
}
export default connect(connectTransferReject)(TransferReject);

