//撤单 撤单列表
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import TransList3 from '../../components/share/TransList3';
import { SearchBar,WhiteSpace } from 'antd-mobile';
import Dic from '../../utils/dictionary';

import redeemList from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

class RecallList extends Component {
constructor(props) {
   super(props);
}


searchEvent(keyWord) {
  let {dispatch} = this.props;
  dispatch({
    type: 'tradeRecList/fetchRemote',
    payload: {pageSize: '10',pageNumber: '1',
    keyWord: keyWord}
  })
}

clear(keyWord){
  let { dispatch } = this.props;
  dispatch({
    type: 'tradeRecList/fetchRemote',
    payload: {keyWord: ''}
  })
}


render()
{
  let { dispatch,tradeRecList,keyWord} = this.props;
  const titleProps = {
    title:'撤单列表',
    showBack:'no'
  }
  return (
    <div style={{height:'100%'}}>
      <Title {...titleProps}>
      </Title>
      <p className={redeemList.pFull}></p>
      <div>
      <SearchBar placeholder="客户名称/产品名称"
                 onSubmit={this.searchEvent.bind(this)}
                 defaultValue={tradeRecList.keyWord}
                 onClear={this.clear.bind(this)}
                 />
      </div>
      <div className={redeemList.boxScroll}>
        <TransList3 dataSource={tradeRecList.recList} tradeRecList={tradeRecList} dispatch={dispatch} />
      </div>
    </div>
  );
};
}
function connenctTradeFunc({tradeRecList})
{
  return { tradeRecList };
}


export default connect(connenctTradeFunc)(RecallList);
