import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import CircleProgress from './CircleProgress';
import productStyle from '../../styles/product/ProductStyle.less';
let scale = window.dpr/2.0;
import {Tool} from '../../utils/tools';
import { routerRedux } from 'dva/router';

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
										<i>{data.prodName&&data.prodName.length>=17?data.prodName.substring(0,17):data.prodName}</i>
									</h2>
									<div>
										<p className={productStyle.recommend}>本月主推</p>
										<p className={productStyle.proType}>{data.shrType}</p>
									</div>
								</section>
								{
                  data.useableAmt==0 ?
                    <p className={productStyle.orderBtn}><span  style={{backgroundColor:'#cfcfcf'}}>售罄</span></p> :
                    <p className={productStyle.orderBtn}><span>预约</span></p>
                }	</div>
						<div className={productStyle.trendDet}>
							<p>
								<span className={productStyle.txt2}>{data.netVal?data.netVal:'--'}</span>
								<span className={productStyle.margin0}>7日年化(%)</span>
							</p>
							<p>
								<span className={productStyle.txt3}>{data.wfsy}</span>
								<span className={productStyle.margin0}>万份收益(元)</span>
							</p>
							<p>
								<span className={productStyle.txt3}>{parseFloat((data.useableAmt / 10000).toFixed(2))}</span>
								<span className={productStyle.margin0}>剩余额度(万)</span>
							</p>
						</div>
					</div>

			</div>
	);
};

// let this.itemInter;
class OtherList extends React.Component {

  constructor(props) {
    let {data,dispatch} = props;
    let extrSecStr = Tool.formatSeconds(data.extrSeconds);
    super(props);
    this.state={
      extrSeconds: data.extrSeconds,
      extrSecStr:extrSecStr,
    };
		this.itemInter = null;
  }

  componentWillUnmount(){
		if(this.itemInter){
			clearInterval(this.itemInter);
		}

  }

  componentWillReceiveProps(nextProps)  {
		if(this.props.data.extrSeconds != nextProps.data.extrSeconds){
			if(this.itemInter){
				clearInterval(this.itemInter);
			}
			this.timeoutProduct(nextProps.data.extrSeconds);
		}
  }

  componentDidMount(){
		this.timeoutProduct(this.state.extrSeconds);
  }

	timeoutProduct(needSeconds){
		let extrSeconds = parseInt(needSeconds );

    function timer() {

      extrSeconds--;
      let extrSecStr = Tool.formatSeconds(extrSeconds);
			console.log('timer',extrSeconds);
      if (extrSeconds === 0) {
        clearInterval(this.itemInter);
        this.setState({
          extrSeconds:extrSeconds,
          extrSecStr:extrSecStr,
        });
      } else {
        this.setState({
          extrSeconds:extrSeconds,
          extrSecStr:extrSecStr,
        });
      }
    }

    if(extrSeconds > 0) {
      // timer.bind(this)();
      this.itemInter = setInterval(timer.bind(this), 1000);
    }
	}

  render() {
    let {data,dispatch} = this.props;

    if (data.earnType == '1' && data.prodType == '9') {
      return <CashProductItem data={data}/>;
    } else {
      let angle1, colorStyle, progressStyle, showTitle, unFillStyle;
      if (data.isSaleFlag != '0') {
        angle1 = 360;
        colorStyle = '#929292';
        progressStyle = '#e4e4e4';
        showTitle = '停售';
        unFillStyle = colorStyle;
      }
      else {
        if (data.totAmt == 0 || data.totAmt == undefined || data.totAmt == null)
          data.totAmt = 1;
        angle1 = (data.totAmt - data.useableAmt) / data.totAmt * 360;
        colorStyle = data.useableAmt == 0 ? '#929292' : '#f22f33';
        unFillStyle = '#e4e4e4';
        // progressStyle = data.useableAmt==0?'#f22f33':'#e4e4e4';
        progressStyle = '#f22f33';
        showTitle = data.useableAmt == 0 ? '售罄' : '预约';
      }

      function touchCell(rowData,sec)
      {
				console.log('touchCell',sec);

        if (sec <= 0) {
          dispatch(routerRedux.push({pathname:'/productDetail',state:rowData}));
        }
      }

      return (
        <div className={productStyle.itemWrap}>
          <div className={productStyle.itemMainInfo}>
            <div className={productStyle.listHeader}>
              <section>
                <h2 className={productStyle.proTitle1}>
                  {data.hotFlg ? <span className={productStyle.hotImg}>Hot {data.hotFlg}</span> : ''}
                  <i>{data.prodName && data.prodName.length >= 17 ? data.prodName.substring(0, 17) : data.prodName}</i>
                </h2>
                <div>
                  {data.isBestProd === 'Y' ? <p className={productStyle.recommend}>本周主推</p> : ''}
                  <p className={productStyle.proType}>{data.shrType}</p>
                </div>
              </section>
              {
                data.useableAmt == 0 ?
                  <p className={productStyle.orderBtn}><span style={{backgroundColor: '#cfcfcf'}}>售罄</span></p> :
                  (this.state.extrSeconds <= 0 ?
                    <p className={productStyle.orderBtn + " " + productStyle.odrbtn}><span onClick={()=>touchCell(data,this.state.extrSeconds)}>预约</span></p> :
                    <p className={productStyle.orderBtn} style={{width:'31%',lineHeight:'0.1rem'}}><span style={{width:'100%'}}><br/>{this.state.extrSecStr}</span></p>)
              }
            </div>


            <div className={productStyle.trendDet}>
              <p>
                <span className={productStyle.txt2}>{data.reserveEndDate}</span>
                <span className={productStyle.margin0}>预约到期日</span>
              </p>
              <p>
                <span className={productStyle.txt3}>{parseFloat((data.totAmt / 10000).toFixed(2))}</span>
                <span className={productStyle.margin0}>总额度(万)</span>
              </p>
              <p>
                <span className={productStyle.txt3}>{parseFloat((data.useableAmt / 10000).toFixed(2))}</span>
                <span className={productStyle.margin0}>剩余额度(万)</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default OtherList;
