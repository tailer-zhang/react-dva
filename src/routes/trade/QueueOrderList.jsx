import React , { Component , PropTypes } from 'react';
import Title from '../../components/product/Title';
import QueueList from '../../components/trade/QueueList';
import { SearchBar } from 'antd-mobile';
import {connect} from 'dva'
import styles from '../../styles/trade/queueOrder.less';

class QueueOrderList extends Component {
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
      type: 'queueModel/fetchList',
      payload: {
        loadingMore:false,
        keyWord: ''
      }
    })
  }

  searchEvent=(keyWord)=>{
    let {dispatch} = this.props;
    dispatch({
      type: 'queueModel/fetchList',
      payload: {
        loadingMore:false,
        keyWord: keyWord
      }
    })
  }

  render(){
    let { dispatch , queueModel } = this.props;
    const titleProps = {
      title:'排队情况查询',
      showBack:'no',
    };
    return(
      <div className={styles.queue}>
          <Title {...titleProps}/>
          <SearchBar
            placeholder="客户名称/产品名称"
            onClear={this.clear}
            onSubmit={this.searchEvent}
            defaultValue={queueModel.keyWord}
          />
        <div className={styles.listDiv}>
          <QueueList
            queueOrderList={this.props.queueModel.queueOrderList}
            dispatch={dispatch}
            queueModel={queueModel}
          />
        </div>
      </div>
  )}
}

function getprops({queueModel}) {
  return {queueModel}
}

export default connect(getprops)(QueueOrderList);
