import React, { Component, PropTypes } from 'react';
import Progress from './Progress';//进度条
import PieTempChart from '../../components/trade/PieTempChart';
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import Dic from '../../utils/dictionary';


// <p className={riskStyles.pFull}></p>
// <div className={riskStyles.assBanner}>
//   <AssessBanner/>
//   <p>4分 -7 分保守型，8分 -10分稳健性，11分 -13分平稳性，14分 -16分进取型</p>
// </div>
class riskResult extends Component{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let {score,dataChart,riskLevel,proCustomer,location} = this.props;
    return (
      <div className={PerCusDetailStyles.assetCon} ref='div' style={{color:'#fff'}}>
        <div className={PerCusDetailStyles.result}>
          <div>
            <span style={{paddingBottom:'10px'}}>风险等级</span>
            <p style={{height:'17px'}}></p>
            <span className={PerCusDetailStyles.txt_03}>
              {
                Dic.fetchDicValue('riskLevel',riskLevel)
              }
            </span>
          </div>
          <div>
            <span>资产配置得分</span>
            <p style={{height:'21px'}}></p>
            <span className={PerCusDetailStyles.txt_03}>{score}</span>
          </div>
        </div>
        <div className={PerCusDetailStyles.scorProgress}>
          {/*<img src={require("../../image/customer/progress.png")} className={PerCusDetailStyles.progress}/>*/}
          <Progress data={score} proCustomer={proCustomer}/>
        </div>
        {
          proCustomer?
          <p className={PerCusDetailStyles.scorTxt}>34分及以下保守型，35-66分稳健型，67分及以上进取型</p>
          :<p className={PerCusDetailStyles.scorTxt}>10分及以下保守型，11-20分稳健型，21分及以上进取型</p>
        }
        <div> {/*className={PerCusDetailStyles.flexBox}*/}
          <PieTempChart data={dataChart}/>
        </div>
        <div className={PerCusDetailStyles.pieChart}>
          <div className={PerCusDetailStyles.pieChartDes}>
            <span></span>
            <p className={PerCusDetailStyles.txt_04}>高风险：PE/VC,新三版块</p>
          </div>
          <div className={PerCusDetailStyles.pieChartDes}>
            <span className={PerCusDetailStyles.color_01}></span>
            <p className={PerCusDetailStyles.txt_04}>中风险：CTA基金,海外资产,并购基金,量化FOF,定增基金/二级市场</p>
          </div>
          <div className={PerCusDetailStyles.pieChartDes} style={{marginBottom:'0px'}}>
            <span className={PerCusDetailStyles.color_03}></span>
            <p className={PerCusDetailStyles.txt_04}>低风险：保险,债券基金,类固收产品,房地产基金</p>
          </div>
        </div>
      </div>
    );
  }
}

export default riskResult;
