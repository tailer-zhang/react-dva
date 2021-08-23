//客户持仓信息  2019.9.3 刘燕芝
//赎回 赎回列表
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import CustomerPositionInfoTabs from '../../components/trade/CustomerPositionInfoTabs';
import { List, Button ,ListView, SearchBar,WhiteSpace } from 'antd-mobile';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';


class CustomerPositionList extends Component {
  constructor(props) {
    super(props);
  }

  searchEvent(keyWord) {
    let {dispatch} = this.props;
    dispatch({
      type: 'trade/fetchSharetransList',
      payload: {pageSize: '10',pageNumber: '1',
        keyWord: keyWord}
    })
  }

  clear(keyWord){
    let { dispatch } = this.props;
    dispatch({
      type: 'trade/fetchSharetransList',
      payload: {keyWord: ''}
    })
  }

  render()
  {
    let { dispatch,trade,location} = this.props;
    let type = location.state.type
    console.log('this.props3333',this.props)
    console.log('type',type)
    const titleProps = {
      title:'客户持仓信息',
      showBack:'no'
    };
    return (
      <div style={{backgroundColor:'#efeff4',height:'100%'}}>
        <Title {...titleProps}></Title>
        <p className={redeemList.pFull}></p>
        <SearchBar  placeholder="客户名称/产品名称"
                    onSubmit={this.searchEvent.bind(this)}
                    defaultValue={trade.keyWord}
                    onClear={this.clear.bind(this)}
        />
        <div className={redeemList.boxScroll}>
          <CustomerPositionInfoTabs tradeRedList={trade} type={type} dispatch={dispatch} dataSource={trade.custShrList}/>
        </div>
      </div>
    );
  };
}



function connectProductFunc({trade})
{
  return {trade};
}

export default connect(connectProductFunc)(CustomerPositionList);
