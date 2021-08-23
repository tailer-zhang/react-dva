import React, { PropTypes,Component } from 'react';
import ToBackBtn from './ToBackBtn';
import productStyle from '../../styles/product/ProductStyle.less';
import Dic from '../../utils/dictionary';

export default class Filter extends Component  {
	constructor(props) {
		 super(props);

		 let {filterArgs} = props;
		 this.state = this.transformFilterToState(filterArgs);
	}

	transformFilterToState(filterArgs){
		let hotSearchValValue = {hotSearchVal:[]};
		if(!filterArgs)
			return hotSearchValValue;
		if(filterArgs.hotSearchVal){
			hotSearchValValue.hotSearchVal = filterArgs.hotSearchVal.split(',');
		}

		return {...filterArgs,...hotSearchValValue};
	}

	transformStateToFilter(state){
		let hotSearchValArr = state.hotSearchVal;
		let dic = state
    // delete dic['keyClass']
		return {...dic,hotSearchVal:hotSearchValArr.join(',')};
	}

	renderListMethord(key,selectValue,justifyMethord)
	{
		let dic = Dic.fetchDicList(key);
		if(!justifyMethord){
			justifyMethord = (value,item)=>{
				return value===item;
			};
		}
		return (
			<ul>
				 {
					 Object.keys(dic).map((item,index)=>{
						 let desc = dic[item];
						 let classname = '';
						 if(justifyMethord(selectValue,item))
  					 classname = productStyle.curFilter;

						 return (
							 <li className={classname}
								 onClick={this.clickFilterEvent.bind(this,key,item,desc)} key={index}>
								 {desc}
							 </li>
						 );
					 })
				 }
			 </ul>
		);
	}

	clickFilterEvent(key,item,desc)
	{
		if(key=='isSaleFlag')
		{
			this.setState({
				isSaleFlag:item==this.state.isSaleFlag?undefined:item
			});
		}
		else if(key=='deadline'){
			this.setState({
				deadline:item==this.state.deadline?undefined:item
			});
		}
    else if(key === 'onlineSign'){
      this.setState({
        onlineSign:item==this.state.onlineSign?undefined:item
      });
    }
		else if(key=='hotSearchVal'){//热门搜索，热门搜索可以进行多选
			let {hotSearchVal} = this.state;
			//表示已经包含这个热门筛选条件
			if(this.isContainHotSearch(hotSearchVal,item)){
				hotSearchVal.splice(hotSearchVal.indexOf(item),1);
			}
			else hotSearchVal.push(item);

			this.setState({
				hotSearchVal:hotSearchVal
			});
		}
		else if(key=='prodClass')
		{
			this.setState({
				earnType:item == this.state.earnType?undefined:item,
			});
			switch (item) {
				// console.log(item,this.state.secondClass)
        case '1':
					this.setState({
						keyClass: 'secondClassFir',
            prodType: undefined
					})
					break;
					case '2':
					this.setState({
						keyClass: 'secondClassSec',
            prodType: undefined
					})
				  break;
					case '5':
					this.setState({
						keyClass: 'secondClassThr',
            prodType: undefined
					})
					break;
			}
		}
		else if(key==this.state.keyClass)
		{
			this.setState({
				prodType:item == this.state.prodType?undefined:item,
			});
		}
	}

	isContainHotSearch(value,item){
		return value.indexOf(item)>=0;
	}

	render()
	{
			const {backEvent,filterArgs,filterEvent} = this.props;
			let {earnType,prodType,isSaleFlag,hotSearchVal,deadline,keyClass,onlineSign} = this.state;
			return (
				<div className={productStyle.filterWrap}>
					<div className={productStyle.mask} onClick={backEvent}></div>
					<div style={{height:'100%',width:'8.88rem'}}>
						<div className={productStyle.FilterCon} style={{height:document.body.clientHeight}}>
							<p className={productStyle.marginTopP}></p>
							<div className={productStyle.filterMenu}>
								<p className={productStyle.filterTitle}>热门搜索</p>
								<div className={productStyle.hotSearchTitle}>
										{this.renderListMethord('hotSearchVal',hotSearchVal,this.isContainHotSearch.bind(this))}
								</div>
							</div>
							<p className={productStyle.marginTopP}></p>
							<div className={productStyle.filterMenu}>
								<p className={productStyle.filterTitle}>在售状态</p>
								<div>
									{this.renderListMethord('isSaleFlag',isSaleFlag)}
								</div>
							</div>
							<p className={productStyle.marginTopP}></p>
							<div className={productStyle.filterMenu}>
								<p className={productStyle.filterTitle}>一级分类</p>
								<div>
									{this.renderListMethord('prodClass',earnType)}
								</div>
							</div>
							<p className={productStyle.marginTopP}></p>
							{keyClass==undefined || earnType==undefined?<div/>:<div className={productStyle.filterMenu}>
									<p className={productStyle.filterTitle}>二级分类</p>
									<div>
										{this.renderListMethord(keyClass,prodType)}
									</div>
								</div>
							}
							<p className={productStyle.marginTopP}></p>
							<div className={productStyle.filterMenu}>
								<p className={productStyle.filterTitle}>产品期限</p>
								<div>
									{this.renderListMethord('deadline',deadline)}
								</div>
							</div>
              <p className={productStyle.marginTopP}></p>
              <div className={productStyle.filterMenu}>
                <p className={productStyle.filterTitle}>支持线上签署</p>
                <div>
                  {this.renderListMethord('onlineSign',onlineSign)}
                </div>
              </div>
							<div><p style={{height:'2.3rem'}}></p></div>
						</div>
						<div className={productStyle.ctrBtns}>
							<p className={productStyle.ctrBtn} onClick={()=>{
										this.setState({
											earnType:undefined,
											prodType:undefined,
											isSaleFlag:undefined,
											deadline:undefined,
                      onlineSign:undefined,
											hotSearchVal:[]
										});
										filterEvent({},'reset');
								}} >重置</p>
							<p className={productStyle.okBtn} onClick={()=>{
									filterEvent(this.transformStateToFilter(this.state));
								}} >确定</p>
						</div>
					</div>
				</div>
			);
	}
}
