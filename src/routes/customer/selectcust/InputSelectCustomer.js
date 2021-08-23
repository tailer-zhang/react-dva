import React from 'react';
import Title from '../../../components/product/Title';
import { SearchBar, Badge } from 'antd-mobile';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import SecCustomerList from './SecCustomerList';
import bankCardStyles from '../../../styles/customer/bankCard.less';

class InputSelectCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state=props;
  }
  searchEvent = (value) => {
    console.log('search',value);
    let {dispatch,location} = this.props;
    // //预约跳转选客户
      dispatch({
        type: 'relativeChangedModel/fetchRemote',
        payload: {loadingMore:false,custName1:value},
      });

  }
  clear = () => {
    let {dispatch,location} = this.props;
    //预约跳转选客户
      dispatch({
        type: 'relativeChangedModel/fetchRemote',
        payload: {loadingMore:false,custName1:''}
      });
  }
  render(){
    let {dispatch,relativeChangedModel,location} = this.props;
    return (
      <div className={bankCardStyles.secCustomer}>
        <div className={bankCardStyles.bankSearchs}>
          <SearchBar style={{backgroundColor:'#f7f7f8'}}
          placeholder={relativeChangedModel.custName==''?"客户名称":relativeChangedModel.custName}
          onSubmit={(value)=>this.searchEvent(value)}
          onClear={()=>this.clear()}
         />
        </div>
          <SecCustomerList dataSource={relativeChangedModel}
           dispatch={dispatch} location={this.state.location}/>
      </div>
      )
  }
}
function connectCustomer({relativeChangedModel}){
  return {relativeChangedModel}
}
export default connect(connectCustomer)(InputSelectCustomer);
