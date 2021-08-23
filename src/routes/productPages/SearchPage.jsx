import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { SearchBar } from 'antd-mobile';
import productStyle from '../../styles/product/ProductStyle.less';
import ProductList from '../../components/product/ProductList';//搜索结果页调用组件



const TopSearchBar = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },
  onChange(value) {
    this.setState({ value });
  },
  clear() {
    this.setState({ value: '' });
  },
  render() {
    return (
	    <div>
	      <SearchBar
	        value={this.state.value}
	        placeholder="产品名称/简称"
	        onSubmit={(value) => console.log(value, 'onSubmit')}
	        onClear={(value) => console.log(value, 'onClear')}
	        onFocus={() => console.log('onFocus')}
	        onBlur={() => console.log('onBlur')}
	        showCancelButton
	        onChange={this.onChange}
	        className={productStyle.searchBox}
	      />
	    </div>
    );
  },
});

const SearchPage = ({xtProduct,bxProduct,dispatch}) => {
	return (
		<div className={productStyle.searchWrap} style={{height: document.body.clientHeight}}>
			<div className={productStyle.topSearch}>
				<div>
					<TopSearchBar />
				</div>
			</div>
			<div className={productStyle.mainSearchTitle}>
				<div className={productStyle.padding25}>
					<h3 className={productStyle.searchTitle}>搜索排行</h3>
					<ul>
						<li onClick={()=>{
              }}>仟意恒丰3期</li>
						<li>海石季度风-尊牛系列05</li>
						<li>仟意恒丰3期</li>
						<li>海石季度风-尊牛系列05</li>
						<li>海石季度风-尊牛系列05</li>
						<li>海石季度风-尊牛系列05</li>
						<li>海石季度风-尊牛系列05</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

function connectProductFunc({xtProduct,bxProduct})
{
    return {xtProduct,bxProduct};
}


export default connect(connectProductFunc) (SearchPage);
