import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import CircleProgress from './CircleProgress';
import productStyle from '../../styles/product/ProductStyle.less';
let scale = window.dpr/2.0;

const CashProductItem = ({data})=>{
	let angle1,colorStyle,progressStyle,showTitle,unFillStyle;
	if(data.isSaleFlag !='0')
	{
		angle1 = 360;
		colorStyle = '#929292';
		progressStyle = '#e4e4e4';
		showTitle = '停售';
		unFillStyle = colorStyle;
	}
	else
	{
		if(data.totAmt==0||data.totAmt==undefined||data.totAmt==null)
			data.totAmt = 1;
	  angle1 = (data.totAmt-data.useableAmt)/data.totAmt*360;
		colorStyle = data.useableAmt==0?'#929292':'#f22f33';
		// progressStyle = data.useableAmt==0?'#f22f33':'#e4e4e4';
		progressStyle ='#f22f33';
		unFillStyle = '#e4e4e4';
		showTitle = data.useableAmt==0?'售罄':'预约';
	}
	return (
			<div className={productStyle.itemWrap} style={{marginBottom:'0.24rem'}}>
					<div className={productStyle.itemMainInfo}>
							<div className={productStyle.listHeader}>
								<section>
                  <h2 className={productStyle.proTitle1}>
                    {data.hotFlg?<span className={productStyle.hotImg}>Hot {data.hotFlg}</span>:''}
                    <p>{data.isBestProd === 'Y' ?<img src={require('../../image/product/explosions.png')}/>: ''}<i>{data.prodName&&data.prodName.length>=17?data.prodName.substring(0,17):data.prodName}</i></p>
                  </h2>
                  <div>
                    {data.onlineSign?<p style={{marginRight:'.2rem'}} className={productStyle.proType}>支持线上签署</p>:''}
                    <p className={productStyle.proType}>{data.shrType}</p>
                    <span style={{color: '#848484'}}>&nbsp;&nbsp;{data.profRuleShortDesc || '--'}</span>
                    <span style={{color: '#848484'}}>&nbsp;&nbsp;{data.payType || '--'}</span>
                  </div>
                </section>
								{/*
                  data.useableAmt==0 ?
                    <p className={productStyle.orderBtn}><span  style={{backgroundColor:'#cfcfcf'}}>售罄</span></p> :
                    <p className={productStyle.orderBtn}><span>预约</span></p>
                */}	</div>
						<div className={productStyle.trendDet}>
							<p>
								<span className={productStyle.txt2}>{data.netVal?data.netVal:'--'}</span>
                <span className={productStyle.margin0}>&nbsp;</span>
                <span className={productStyle.margin0}>7日年化(%)</span>
							</p>
							<p>
								<span className={productStyle.txt3}>{data.wfsy}</span>
                <span className={productStyle.margin0}>&nbsp;</span>
                <span className={productStyle.margin0}>万份收益(元)</span>
							</p>
              <p>
                {data.isSaleFlag === '0' ?
                  <span className={productStyle.txt4}><i>可用合同数&nbsp;</i>{data.useableCont !== undefined ? data.useableCont : '--'}</span> :
                  <span className={productStyle.txt4}><i></i>--</span>
                }
                <span className={productStyle.margin0}>&nbsp;</span>
                {data.isSaleFlag === '0' ?
                  <span className={productStyle.txt4}><i>产品可用额度(万)&nbsp;</i>{data.useableAmt !== undefined ? parseFloat((data.useableAmt / 10000).toFixed(2)): '--'}</span> :
                  <span className={productStyle.txt4}><i></i>--</span>
                }
              </p>
						</div>
					</div>

			</div>
	);
};

const  ListItem = ({data}) => {
	if(data.earnType=='1'&& data.prodType=='9'){
		return <CashProductItem data={data} />;
	}else{
		let angle1,colorStyle,progressStyle,showTitle,unFillStyle;
		if(data.isSaleFlag !='0')
		{
			angle1 = 360;
			colorStyle = '#929292';
			progressStyle = '#e4e4e4';
			showTitle = '停售';
			unFillStyle = colorStyle;
		}
		else
		{
			if(data.totAmt==0||data.totAmt==undefined||data.totAmt==null)
			  data.totAmt = 1;
			angle1 = (data.totAmt-data.useableAmt)/data.totAmt*360;
		 	colorStyle = data.useableAmt==0?'#929292':'#f22f33';
			unFillStyle = '#e4e4e4';
			// progressStyle = data.useableAmt==0?'#f22f33':'#e4e4e4';
			progressStyle ='#f22f33';
			showTitle = data.useableAmt==0?'售罄':'预约';
	  }
		return (
				<div className={productStyle.itemWrap}>
						<div className={productStyle.itemMainInfo}>
							<div className={productStyle.listHeader}>
                <section>
                  <h2 className={productStyle.proTitle1}>
                    {data.hotFlg?<span className={productStyle.hotImg}>Hot {data.hotFlg}</span>:''}
                    <p>{data.isBestProd === 'Y' ?<img src={require('../../image/product/explosions.png')}/>: ''}<i>{data.prodName&&data.prodName.length>=17?data.prodName.substring(0,17):data.prodName}</i></p>
                  </h2>
                  <div>
                    {data.onlineSign=='1'?<p style={{marginRight:'.2rem'}} className={productStyle.proType}>支持线上签署</p>:''}
                    <p className={productStyle.proType}>{data.shrType}</p>
                    <span style={{color: '#848484'}}>&nbsp;&nbsp;{data.profRuleShortDesc || '--'}</span>
                    <span style={{color: '#848484'}}>&nbsp;&nbsp;{data.payType || '--'}</span>
                  </div>
                </section>
                {/*
                  data.useableAmt==0 ?
                    <p className={productStyle.orderBtn}><span  style={{backgroundColor:'#cfcfcf'}}>售罄</span></p> :
                    <p className={productStyle.orderBtn}><span>预约</span></p>
                */}
							</div>


								<div className={productStyle.trendDet}>
									<p>
										<span className={productStyle.txt2}>{data.netVal?data.netVal:'--'}</span>
                    <span className={productStyle.margin0}>&nbsp;</span>
										<span className={productStyle.margin0}>{`净值(${data.netvDate!=undefined?data.netvDate:''})`}</span>
									</p>
									<p>
										<span className={productStyle.txt3}>{data.sustain=='0'?`${data.minDeadline!=undefined?data.minDeadline:''}~${data.maxDeadline!=undefined?data.maxDeadline:''}`:'永续'}</span>
                    <span className={productStyle.margin0}>&nbsp;</span>
										<span className={productStyle.margin0}>期限({data.deadlineUnit})</span>
									</p>
                  <p>
                    {data.isSaleFlag === '0' ?
                      <span className={productStyle.txt4}><i>可用合同数&nbsp;</i>{data.useableCont !== undefined ? data.useableCont : '--'}</span> :
                      <span className={productStyle.txt4}><i></i>--</span>
                    }
                    <span className={productStyle.margin0}>&nbsp;</span>
                    {data.isSaleFlag === '0' ?
                      <span className={productStyle.txt4}><i>产品可用额度(万)&nbsp;</i>{data.useableAmt !== undefined ? parseFloat((data.useableAmt / 10000).toFixed(2)): '--'}</span> :
                      <span className={productStyle.txt4}><i></i>--</span>
                    }
                  </p>
								</div>
						</div>

				</div>
		);
	}
};
export default ListItem;


//CashProductItem
// <div className={productStyle.circleImg}>
// 	<CircleProgress style={{padding:5*scale,width:140*scale,height:140*scale}} borderWidth={5*scale}
// 			titleStyle={{font:"normal normal "+32*scale+"px PingFang SC Light,serif",fontSize:32*scale,color:colorStyle,boldSize:0.1}}
// 			progressColor={progressStyle}
// 			unFillColor={unFillStyle}
// 			fillColor={"#ffffff"}
// 			title={showTitle}
// 			angle={angle1} />
// </div>

//ListItem
// <div className={productStyle.circleImg}>
// 	<CircleProgress style={{padding:3*scale,width:140*scale,height:140*scale}} borderWidth={5*scale}
// 			titleStyle={{font:"normal normal "+32*scale+"px PingFang SC Light,serif",fontSize:32*scale,color:colorStyle,boldSize:0.1}}
// 			progressColor={progressStyle}
// 			unFillColor={unFillStyle}
// 			fillColor={"#ffffff"}
// 			title={showTitle}
// 			angle={angle1} />
// </div>
