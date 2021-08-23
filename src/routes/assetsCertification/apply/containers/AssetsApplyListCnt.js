import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import AssetsApplyStyle from '../style/AssetsApplyStyle.less';
import AssetsApplyList from '../components/AssetsApplyList'


class AssetsApplyListCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        checkArr: [],
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        value: '',
        key: '',
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        format: '',
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        remark: '',
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsApplyModel/clear', payload: { keyWord: '', loadingMore: false, assetsApplyList: [] } });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsApplyModel/fetchList', payload: { keyWord: value, loadingMore: false, assetsApplyList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'AssetsApplyModel/fetchList', payload: { keyWord: '', loadingMore: false, assetsApplyList: [] } });
  }

  render() {
    const titleProps = {
      title: '资产证明申请',
      showBack: 'yes',
    };
    const { AssetsApplyModel } = this.props;
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps}></Title>
          <SearchBar placeholder="客户名称/证件号码" onSubmit={this.search} onClear={this.clear} />
        </div>
        <div className={AssetsApplyStyle.content}>
          <AssetsApplyList dataSource={AssetsApplyModel.assetsApplyList} assetsApplyModel={AssetsApplyModel} />
        </div>
      </div>
    );
  }
}

function connectProps({ AssetsApplyModel }) {
  return { AssetsApplyModel }
}

export default connect(connectProps)(AssetsApplyListCnt);
