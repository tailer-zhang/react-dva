import React from 'react';
import Title from '../../components/product/Title';
import CusSelectList from '../../components/customer/CusSelectList';
import { SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import modifyStyle from '../../styles/customer/cusModifyStyle.less';

class OpenBankModify extends React.Component{
  constructor(props){
    super(props)
  }
  searchEvent(value) {
    let {dispatch} = this.props;
    dispatch({ type: 'bank/fetchModifyList', payload: { keyWord: value, loadingMore: false, modifyList: [] } });
  }
  clear() {
    let {dispatch} = this.props;
    dispatch({ type: 'bank/fetchModifyList', payload: { keyWord: '', loadingMore: false, modifyList: [] } });
  }
  render(){
    let { dispatch,bank,location } = this.props;
    const TitleProp = {title:'选择客户',showBack: 'yes'};
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...TitleProp}></Title>
          <SearchBar style={{backgroundColor:'#f7f7f8'}}
                     placeholder="客户名称"
                     onSubmit={this.searchEvent.bind(this)}
                     onClear={this.clear.bind(this)}
          />
        </div>
        <div className={modifyStyle.secCustomer + " " + modifyStyle.bankCustomer1}>
          <CusSelectList
            dataSource={bank}
            dispatch={dispatch}
            location={location}
            from={'change'}
          />
        </div>
      </div>
    )
  }
}
function connectSec({bank}) {
  return {bank}
}

export default connect(connectSec)(OpenBankModify);
