import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import Title from '../../../../components/product/Title';
import AssetsApplyStyle from '../style/AssetsApplyStyle.less';
import ProductList from '../components/ProductList'

class ProductListCnt extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'ProductCheckModel/clear', payload: { keyWord: '', loadingMore: false, productList: [] } });
  }

  search = (value) => {
    const { dispatch } = this.props;
    dispatch({ type: 'ProductCheckModel/fetchList', payload: { keyWord: value, loadingMore: false, productList: [] } });
  }

  clear = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'ProductCheckModel/fetchList', payload: { keyWord: '', loadingMore: false, productList: [] } });
  }

  render() {
    const titleProps = {
      title: '产品列表',
      showBack: 'yes',
    };
    const { ProductCheckModel, dispatch } = this.props;
    return (
      <div style={{ backgroundColor: '#efeff4', height: '100%', fontFamily: 'PingFangSC-Regular', textAlign: 'center'}}>
        <div style={{ position: 'fixed', top: '0', zIndex: '2', width: '100%' }}>
          <Title {...titleProps}></Title>
          <SearchBar placeholder="产品名称" onSubmit={this.search} onClear={this.clear} />
        </div>
        <div className={AssetsApplyStyle.content}>
          <ProductList dataSource={ProductCheckModel.productList} location={this.state.location} dispatch={dispatch} productCheckModel={ProductCheckModel} />
        </div>
      </div>
    );
  }
}

function connectProps({ ProductCheckModel }) {
  return { ProductCheckModel }
}

export default connect(connectProps)(ProductListCnt);
