import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Progress from './Progress';//进度条
import Dic from '../../utils/dictionary';
import PieTempChart from '../../components/trade/PieTempChart';
import {processOrgScoreData} from '../../services/customer';
import RiskResult  from './RiskResult';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
//样式文件

class OrgComplexInfo extends React.Component{
  constructor() {
    super();
  }

  render() {
    let {dispatch,data,dataHold} = this.props;
    let busiID = data.busiID;
    let score = data.score;
    if (score==undefined) score = '';

    if(dataHold.xtAmount==undefined) dataHold.xtAmount=0;
    if(dataHold.insAmount==undefined) dataHold.insAmount=0;
    if(dataHold.swAmount==undefined) dataHold.swAmount=0;
    if(dataHold.fundAmount==undefined) dataHold.fundAmount=0;


    let dataChart = processOrgScoreData(score);

    //持有金额数据
    const getOccupyData = () => {
      let dataSource = {
        name: '持有金额',
        data: [
          {value: dataHold.xtAmount,name: '私募交易金额'},
          {value: dataHold.insAmount,name: 'B类产品金额'},
          {value: dataHold.swAmount,name: '财富通合同金额'},
          {value: dataHold.fundAmount,name: '公募交易金额'},
        ]
      }
      return dataSource;
    }
    let dataPortion = getOccupyData();

    return (
      <div className={PerCusDetailStyles.basicInfo} style={{paddingBottom:'0.667rem'}}>
        <div className={PerCusDetailStyles.userInfo}>
          <p className={PerCusDetailStyles.userName}>
            <span>{data != undefined?data.busiName:''}</span>
          </p>
          <div className={PerCusDetailStyles.userType}>
            <span className={PerCusDetailStyles.userState1}>
              {Dic.fetchDicValue('customerFilter4',data.custType)}
            </span>
            <span className={PerCusDetailStyles.userState2}>
              {Dic.fetchDicValue('customerFilter3',data.curStat)}
            </span>
          </div>
        </div>
        <div className={PerCusDetailStyles.title_01} style={{marginTop:'0.28rem'}}
          onClick={()=>dispatch(routerRedux.push({
            pathname: '/transaction',
            state: {
              custID:  busiID,
              custNo:  busiID,
            }
          }))}>
          <p className={PerCusDetailStyles.f_b}>
            <img src={require("../../image/icon/icon_03.png")} className={PerCusDetailStyles.a_icon}/>
            <span className={PerCusDetailStyles.txt_01}>交易记录</span>
          </p>
          <p className={PerCusDetailStyles.f_b}>
            <span className={PerCusDetailStyles.txt_02}></span>
            <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
          </p>
        </div>
        <div className={PerCusDetailStyles.title_01} onClick={()=>dispatch(routerRedux.push({
          pathname: '/backVisit',
          state: {
            custID: busiID
          }
        }))}>
          <p className={PerCusDetailStyles.f_b}>
            <img src={require("../../image/icon/icon_04.png")} className={PerCusDetailStyles.a_icon}/>
            <span className={PerCusDetailStyles.txt_01}>客户回访记录</span>
          </p>
          <p className={PerCusDetailStyles.f_b}>
            <span className={PerCusDetailStyles.txt_02}></span>
            <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
          </p>
        </div>
        <div className={PerCusDetailStyles.assetConfig}>
            <div className={PerCusDetailStyles.title_01} onClick={()=>dispatch(routerRedux.push({
              pathname: '/riskBearSec',
              state: {custID: data.busiID}
            }))}>
              <p className={PerCusDetailStyles.f_b}>
                <img src={require("../../image/icon/icon_01.png")} className={PerCusDetailStyles.a_icon}/>
                <span className={PerCusDetailStyles.txt_01}>推荐资产配置</span>
              </p>
              <p className={PerCusDetailStyles.f_b}>
                <span className={PerCusDetailStyles.txt_02}>重新评估</span>
                <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
              </p>
            </div>
            <RiskResult score={data.score} dataChart={dataChart} riskLevel={data.riskLevel}/>
        </div>
        <div className={PerCusDetailStyles.assetConfig} style={{paddingBottom:'60px'}}>
            <div className={PerCusDetailStyles.title_01}>
              <p className={PerCusDetailStyles.f_b}>
                <img src={require("../../image/icon/icon_02.png")} className={PerCusDetailStyles.a_icon}/>
                <span className={PerCusDetailStyles.txt_01}>持有金额结构</span>
              </p>
              <p className={PerCusDetailStyles.f_b}>
                <span className={PerCusDetailStyles.txt_02}></span>
              </p>
            </div>
            <div className={PerCusDetailStyles.assetCon} style={{paddingTop:'78px'}}>
              <div>
                {/* className={PerCusDetailStyles.flexBox} <img src={require("../../image/customer/trade.png")} className={PerCusDetailStyles.bingtu}/>*/}
                <PieTempChart data={dataPortion}/>
              </div>
              <div className={PerCusDetailStyles.pieChart}>
                <h3 className={PerCusDetailStyles.pieTitle}>
                  持有总额(万元／人民币)：
                  <span className={PerCusDetailStyles.txt_05}>
                    {((parseFloat(dataHold.xtAmount*100)+parseFloat(dataHold.swAmount*100)+parseFloat(dataHold.insAmount*100)+parseFloat(dataHold.fundAmount*100))/100).toFixed(2)}
                  </span>
                </h3>
                <div className={PerCusDetailStyles.pieDes}>
                  <div className={PerCusDetailStyles.pieDesEve}>
                    <span className={PerCusDetailStyles.color_02}></span>
                    <p className={PerCusDetailStyles.txt_04}>私募：{dataHold.xtAmount}</p>
                  </div>
                  <div className={PerCusDetailStyles.pieDesEve}>
                    <span></span>
                    <p className={PerCusDetailStyles.txt_04}>财富通：{dataHold.swAmount}</p>
                  </div>
                </div>
                <div className={PerCusDetailStyles.pieDes}>
                  <div className={PerCusDetailStyles.pieDesEve}>
                    <span className={PerCusDetailStyles.color_01}></span>
                    <p className={PerCusDetailStyles.txt_04}>B类产品：{dataHold.insAmount}</p>
                  </div>
                  <div className={PerCusDetailStyles.pieDesEve}>
                    <span className={PerCusDetailStyles.color_04}></span>
                    <p className={PerCusDetailStyles.txt_04}>公募交易：{dataHold.fundAmount}</p>
                  </div>
                  {
                    //   <div className={PerCusDetailStyles.pieDesEve} style={{marginBottom:'0px'}}>
                    //   </div>
                  }
                </div>
              </div>
            </div>
        </div>

      </div>
    )
  }
};
export default OrgComplexInfo;
