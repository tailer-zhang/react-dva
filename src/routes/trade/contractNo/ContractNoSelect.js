import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Title from '../../../components/product/Title';
import ContractNoList from './ContractNoList';
import proMarketStyles from '../../../styles/product/MarketMonth.less';

const ContractNoSelect = (props)=> {
	let {dispatch,trade,location} = props;
	const TitleProps = {title:'选择合同号'};
	return (
		<div className={proMarketStyles.container}>
			<Title {...TitleProps} />
			<ContractNoList dataSource={trade} location={location}
		 	dispatch={dispatch} />
		</div>
		)
}

function connectContractNo({trade}){
  return {trade}
}
export default connect(connectContractNo)(ContractNoSelect);
