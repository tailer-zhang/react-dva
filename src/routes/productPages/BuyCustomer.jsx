//购买客户列表
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import BuyCustFilter from '../../components/product/BuyCustFilter.jsx'
import BuyCustList from '../../components/product/BuyCustList.jsx';
import buycustStyle from '../../styles/product/buyCustomer.less';

class BuyCustomer extends React.Component{
  constructor(props){
    super(props)
  }

  sortEvent(sortAttr,sortFlag){
      let {dispatch} = this.props;
      dispatch({
          type:'xtProduct/fetchBuyCustomerList',
          payload:{
              sortAttr,
              sortFlag
          }
      });
  }

  render()
  {
    let {xtProduct,dispatch} = this.props;
    let {buyCustomerList,customerLoadingTags} = xtProduct;
    return(
      <div className={buycustStyle.filters}>
        <BuyCustFilter sortTags={customerLoadingTags} sortEvent={this.sortEvent.bind(this)} />
        <BuyCustList list={buyCustomerList} dispatch={dispatch} loadingTags={customerLoadingTags}/>
      </div>

    );
  }
}

//




function connectProductFunc({xtProduct})
{
	  return {xtProduct};
}

 export default connect(connectProductFunc)(BuyCustomer);
