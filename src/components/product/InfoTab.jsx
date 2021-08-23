import React, { PropTypes,Component } from 'react';
import ToBackBtn from './ToBackBtn';
import ProBasicInfo from './ProBasicInfo';
import ProductData from './ProductData';
import MarketType from './MarketType';
import { Tabs, WhiteSpace } from 'antd-mobile';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import {html_decode} from '../../utils/formatUtils';
import ReactHtmlParser from 'react-html-parser';
import CollectFlow from './CollectFlow';//募集流程
import { Link,routerRedux } from 'dva/router';

const TabPane = Tabs.TabPane;


export  default class InfoTab extends  Component{
  constructor(props) {
     super(props);
  }

  render()
  {
    let {title,productDetail,fileList,typeDetail,dispatch,defaultActiveKey} = this.props;
    console.log('productDetail.commDesc---',productDetail.commDesc);
    return (
      <div>
            <Tabs defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'} swipeable={false} onChange={(activeKey)=>{
                    if(activeKey=='4'){
                        dispatch(routerRedux.push({
                            pathname:'/productOverView',
                            state:{
                                lineMapp:productDetail.lineMapp,
                                prdStage:productDetail.prdStage
                            }
                        }));
                        return;
                    }
                    dispatch({
                        type:'xtProduct/fetch',
                        payload:{
                            defaultActiveKey:activeKey
                        }
                    });
                }} activeUnderlineColor="#f22f33" activeTextColor="#f22f33">
              <TabPane tab="基本信息" key="1">
                <WhiteSpace style={{height: '0.267rem'}} />
                <div className={proDetailStyles.tabCon}>
                   <ProBasicInfo basicInfoData={productDetail}/>
                </div>
              </TabPane>
              <TabPane tab="份额类别" key="2">
                <WhiteSpace style={{height: '0.267rem'}} />
                <div className={proDetailStyles.tabCon}>
                   <MarketType categoryData={typeDetail}/>
                </div>
              </TabPane>
              <TabPane tab="佣金描述" key="3" style={{}}>
                <WhiteSpace style={{height: '0.267rem'}} />
                <div className={proDetailStyles.tabCon} style={{}}>
                  <div className={proDetailStyles.tabCon_second} style={{fontFamily:'PingFangSC-Regular'}}>
                    {
                      productDetail.commDesc?ReactHtmlParser(html_decode((productDetail.commDesc!=undefined?productDetail.commDesc:'')))
                      :<div style={{width: '100%',height: '2rem',backgroundColor: '#fff'}}></div>
                    }
                  </div>
                </div>
              </TabPane>
              <TabPane tab="产品概况" key="4">
                <WhiteSpace style={{height: '0.15rem'}} />
              </TabPane>
            </Tabs>
        </div>
    );
  }
}

// <CollectFlow data={productDetail.lineMapp} dispatch={dispatch}/>
