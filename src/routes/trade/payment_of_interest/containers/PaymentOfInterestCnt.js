import React from 'react';
import { connect } from 'dva';
import { SearchBar, Drawer } from 'antd-mobile';
import interestStyle from '../style/interestStyle.less';
import Title from '../../../../components/product/Title';
import InterestList from '../components/InterestList'

class PaymentOfInterestCnt extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'InterestModel/fetchList', payload: { keyWord: value, loadingMore: false, interestList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'InterestModel/fetchList', payload: { keyWord: '', loadingMore: false, interestList: [] } });
  }

  render() {
    const titleProps = {
      title: '付息/到期提醒列表',
      showBack: 'yes',
    };
    const { InterestModel } = this.props

    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps} />
          <SearchBar placeholder="客户名称/产品名称" onSubmit={this.search} onClear={this.clear} />
        </div>
        <div style={{ height: '100%', backgroundColor: '#efeff4', paddingTop: '2.5333rem', width: document.body.clientWidth }} >
          <InterestList interestModel={InterestModel} />
        </div>
      </div>
    );
  }
}

function connectProps({ InterestModel }) {
  return { InterestModel }
}

export default connect(connectProps)(PaymentOfInterestCnt);
