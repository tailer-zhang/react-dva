import React from 'react';
import { SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import DealSublist from './DealSublist';
import Title from '../../components/product/Title';
import bankCardStyles from '../../styles/customer/bankCard.less';

class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state=props;
  }
  searchEvent = (value) => {
    let {dispatch, location} = this.props;
    // //预约跳转选客户
    dispatch({
      type: 'dealModel/fetchRemote',
      payload: { loadingMore: false, custName: value, dealList: [] },
    });

  }
  clear = () => {
    let { dispatch, location } = this.props;
    //预约跳转选客户
    dispatch({
      type: 'dealModel/fetchRemote',
      payload: { loadingMore: false, custName: '', dealList: [] }
    });
  }
  render(){
    let {dispatch,dealModel,location} = this.props;
    const titleProps = {
      title: '到期交易产品列表',
      showBack: 'yes',
    };
    return (
      <div className={bankCardStyles.secCustomer} >
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps}></Title>
        </div>
        <div className={bankCardStyles.listStyle} style={{paddingTop: '1.3rem'}}>
          <DealSublist dealModel={dealModel} dispatch={dispatch} location={this.state.location}/>
        </div>
      </div>
    )
  }
}
function connectCustomer({dealModel}){
  return {dealModel}
}
export default connect(connectCustomer)(DealList);
