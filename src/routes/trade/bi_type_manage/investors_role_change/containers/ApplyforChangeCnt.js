import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import changeListStyle from '../style/changeListStyle.less';
import ApplyforChangeList from '../components/ApplyforChangeList'

class ApplyforChangeCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({ type: 'ApplyForChangeModel/clear', payload: { custName: '', loadingMore: false, applyforChangeList: [] } });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'ApplyForChangeModel/fetchList', payload: { custName: value, loadingMore: false, applyforChangeList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'ApplyForChangeModel/fetchList', payload: { custName: '', loadingMore: false, applyforChangeList: [] } });
  }

  render() {
    const titleProps = {
      title: '可以转换客户',
      showBack: 'yes',
    };
    const { ApplyForChangeModel } = this.props;
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps}></Title>
          <SearchBar placeholder="客户名称" onSubmit={this.search} onClear={this.clear} defaultValue={ApplyForChangeModel.custName} />
        </div>
        <div className={changeListStyle.content}>
          <ApplyforChangeList dataSource={ApplyForChangeModel.applyforChangeList} applyForChangeModel={ApplyForChangeModel} />
        </div>
      </div>
    );
  }
}

function connectProps({ ApplyForChangeModel }) {
  return { ApplyForChangeModel }
}

export default connect(connectProps)(ApplyforChangeCnt);
