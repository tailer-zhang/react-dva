import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import rejectStyle from '../style/rejectStyle.less';
import Title from '../../../../../components/product/Title';
import RejectList from '../components/RejectList'

class RoleChangeRejectCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'ChangeRejectModel/fetchList', payload: { keyWord: value, loadingMore: false, changeList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'ChangeRejectModel/fetchList', payload: { keyWord: '', loadingMore: false, changeList: [] } });
  }

  render() {
    const titleProps = {
      title: '转换驳回列表',
      showBack: 'yes',
    };
    const { ChangeRejectModel } = this.props

    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps} />
          <SearchBar placeholder="客户名称" onSubmit={this.search} onClear={this.clear} />
        </div>
        <div className={rejectStyle.listStyle} >
          <RejectList ChangeRejectModel={ChangeRejectModel} />
        </div>
      </div>
    );
  }
}

function connectProps({ ChangeRejectModel }) {
  return { ChangeRejectModel }
}

export default connect(connectProps)(RoleChangeRejectCnt);
