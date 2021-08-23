//基金转换列表
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import FundCList from '../../components/share/FundCList';
import { List, Button ,ListView, SearchBar,WhiteSpace } from 'antd-mobile';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';


class FundChangeList extends Component {
constructor(props) {
   super(props);
}

searchEvent(keyWord) {
  let {dispatch} = this.props;
  dispatch({
    type: 'tradeRedList/fetchFundChange',
    payload: {pageSize: '10',pageNumber: '1',
    keyWord: keyWord}
  })
}

clear(keyWord){
  let { dispatch } = this.props;
  dispatch({
    type: 'tradeRedList/fetchFundChange',
    payload: {keyWord: ''}
  })
}

render()
  {
    let { dispatch,tradeRedList,} = this.props;
    const titleProps = {
      title:'基金转换列表',
      showBack:'no'
    };
    return (
      <div style={{backgroundColor:'#efeff4',height:'100%'}}>
          <Title {...titleProps}></Title>
          <p className={redeemList.pFull}></p>
            <SearchBar  placeholder="客户名称/产品名称"
                        onSubmit={this.searchEvent.bind(this)}
                        defaultValue={tradeRedList.keyWord}
                        onClear={this.clear.bind(this)}
                        />

              <FundCList dataSource={tradeRedList.redeemList} tradeRedList={tradeRedList}  dispatch={dispatch} />


        </div>
    );
  };
}

export default connect(({tradeRedList}) => {
  return {tradeRedList}
})(FundChangeList);
