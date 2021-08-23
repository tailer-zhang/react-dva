//产品详情基本信息
import React, { PropTypes,Component } from 'react';
import ToBackBtn from '../../components/product/ToBackBtn';
import ProBasicInfo from '../../components/product/ProBasicInfo';
import ProductData from '../../components/product/ProductData';
import MarketType from '../../components/product/MarketType';
import { Tabs, WhiteSpace } from 'antd-mobile';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import {html_decode} from '../../utils/formatUtils';
import ReactHtmlParser from 'react-html-parser';
import { Link,routerRedux } from 'dva/router';
import { connect } from 'dva';



 class ProInfo extends  Component{
  constructor(props) {
     super(props);
  }

  render()
  {
     let {location} = this.props;
     let {type} = location.query;
     let detailInfo = location.state;
     if(type=='marketType')
        return (
            <div className={proDetailStyles.tabCon}>
               <MarketType categoryData={detailInfo}/>
            </div>
        );
    else if(type=='feeInfo')
        return (
            <div className={proDetailStyles.tabCon} style={{}}>
              <div className={proDetailStyles.tabCon_second} style={{fontFamily:'PingFangSC-Regular'}}>
                {
                  detailInfo.commDesc?ReactHtmlParser(html_decode((detailInfo.commDesc!=undefined?detailInfo.commDesc:'')))
                  :<div style={{width: '100%',height: '2rem',backgroundColor: '#fff'}}>暂无佣金信息</div>
                }
              </div>
            </div>
        );
    return (
           <div className={proDetailStyles.tabCon}>
              <ProBasicInfo basicInfoData={detailInfo}/>
           </div>
    );
  }
}

export default connect()(ProInfo);

// <CollectFlow data={productDetail.lineMapp} dispatch={dispatch}/>
