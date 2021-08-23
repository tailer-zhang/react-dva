import React from 'react';
import { SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import SubList from './SubList';
import bankCardStyles from '../../../styles/customer/bankCard.less';

class TypeToSelectCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state=props;
  }
  searchEvent = (value) => {
    let {dispatch, location} = this.props;
    // //预约跳转选客户
    dispatch({
      type: 'relativeChangedModel/fetchRemote',
      payload: { loadingMore: false, custName: value, customerList: [] },
    });

  }
  clear = () => {
    let { dispatch, location } = this.props;
    //预约跳转选客户
    dispatch({
      type: 'relativeChangedModel/fetchRemote',
      payload: { loadingMore: false, custName: '', customerList: [] }
    });
  }
  render(){
    let {dispatch,relativeChangedModel,location} = this.props;
    return (
      <div className={bankCardStyles.secCustomer}>
        <SearchBar className={bankCardStyles.searchBar}
                   placeholder={relativeChangedModel.custName==''?"客户名称":relativeChangedModel.custName}
                   onSubmit={(value)=>this.searchEvent(value)}
                   onClear={()=>this.clear()}
        />
        <div className={bankCardStyles.listStyle}>
          <SubList dataSource={relativeChangedModel} dispatch={dispatch} location={this.state.location}/>
        </div>
      </div>
    )
  }
}
function connectCustomer({relativeChangedModel}){
  return {relativeChangedModel}
}
export default connect(connectCustomer)(TypeToSelectCustomer);
