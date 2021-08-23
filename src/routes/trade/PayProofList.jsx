//打款凭证 列
import React , { Component , PropTypes } from 'react';
import Title from '../../components/product/Title';
import ProofList from '../../components/trade/payProof/ProofList';
import { SearchBar } from 'antd-mobile';
import {connect} from 'dva'
import styles from '../../styles/trade/proofOrder.less';

class PayProofList extends Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  componentWillUnmount(){
    this.clear()
  }

  clear(){
    let {dispatch} = this.props;
    dispatch({
      type: 'payProofModel/fetchPayProofList',
      payload: {
        loadingMore:false,
        keyWord: ''
      }
    })
  }

  searchEvent=(keyWord)=>{
    // console.log(keyWord)
    let {dispatch} = this.props;
    dispatch({
      type: 'payProofModel/fetchPayProofList',
      payload: {
        loadingMore:false,
        keyWord: keyWord
      }
    })
  }

  render(){
    let { dispatch , payProofModel } = this.props;
    const titleProps = {
      title:'打款凭证列表',
      showBack:'no',
    };
    return(
      <div className={styles.queue}>
        <Title {...titleProps}/>
        <SearchBar
          placeholder="客户名称/产品名称"
          onClear={this.clear}
          onSubmit={this.searchEvent}
          defaultValue={payProofModel.keyWord}
        />
        <div className={styles.listDiv}>
          <ProofList
            proofList={payProofModel.proofList}
            dispatch={dispatch}
            payProofModel={payProofModel}
          />
        </div>
      </div>
    )}
}

function getprops({payProofModel}) {
  return {payProofModel}
}

export default connect(getprops)(PayProofList);
