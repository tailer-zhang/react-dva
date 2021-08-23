import React,{ Component, PropTypes } from 'react';
import { Tabs, List,WhiteSpace } from 'antd-mobile';
import styles from '../../styles/product/SafeTabs.less';
import Dic from '../../utils/dictionary';
import ReactHtmlParser from 'react-html-parser';
import {html_decode} from '../../utils/formatUtils';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const SafeTabs = ({productDetail}) =>{
	 return (
      <div>
        <Tabs defaultActiveKey="1" swipeable={false}>
          <TabPane tab="产品信息" key="1">
						<WhiteSpace style={{height: '0.267rem'}} />
            <div >
              <List>
                <Item>
                  <span className={styles.span}>产品供应商</span><em className={styles.em}>{productDetail.mgrName}</em>
                </Item>
                <Item>
                 <span className={styles.span}>折标计算方式</span><em className={styles.em}>{Dic.fetchDicValue('kpiType',productDetail.kpiType)}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品全称</span><em className={styles.em}>{productDetail.prodName}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品简称</span><em className={styles.em}>{productDetail.prodAlia}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品发行日期</span><em className={styles.em}>{productDetail.pubBegDate}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品结束日期</span><em className={styles.em}>{productDetail.pubEndDate}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品总额度(元)</span><em className={styles.em}>{productDetail.maxAmt}</em>
                </Item>
	                <Item>
	                <span className={styles.span}>可售合同数(份)</span><em className={styles.em}>{productDetail.maxSaleNum}</em>
                </Item>
                <Item>
                  <span className={styles.last}>产品收益描述</span><em className={styles.em}>{ReactHtmlParser(html_decode(productDetail.infoDesc!=undefined?productDetail.infoDesc:''))}</em>
                </Item>
              </List>
            </div>
          </TabPane>
          <TabPane tab="基本信息" key="2">
						<WhiteSpace style={{height: '0.267rem'}} />
            <div >
             <List>
                <Item>
                  <span className={styles.span}>产品规模(元)</span><em className={styles.em}>{productDetail.prodScale}</em>
                </Item>
                <Item>
                 <span className={styles.span}>期限类型</span><em className={styles.em}>{Dic.fetchDicValue('deadlineType',productDetail.deadlineType)}</em>
                </Item>
                <Item>
                  <span className={styles.span}>最小期限(月)</span><em className={styles.em}>{productDetail.minDeadline}</em>
                </Item>
                <Item>
                  <span className={styles.span}>最大期限(月)</span><em className={styles.em}>{productDetail.minDeadline}</em>
                </Item>
                <Item>
                  <span className={styles.span}>起点金额(元)</span><em className={styles.em}>{productDetail.minAmt}</em>
                </Item>
                <Item>
                  <span className={styles.span}>递增金额(元)</span><em className={styles.em}>{productDetail.addAmt}</em>
                </Item>
                <Item>
                  <span className={styles.span}>收益类型</span><em className={styles.em}>{Dic.fetchDicValue('incomeType',productDetail.incomeType)}</em>
                </Item>
                <Item>
                  <span className={styles.span}>预期最小收益</span><em className={styles.em}>{productDetail.minIncome}</em>
                </Item>
								<Item>
                  <span className={styles.span}>预期最大收益</span><em className={styles.em}>{productDetail.maxIncome}</em>
                </Item>
                <Item>
                  <span className={styles.span}>产品风险等级</span><em className={styles.em}>{Dic.fetchDicValue('riskLvl',productDetail.riskLvl)}</em>
                </Item>
                <Item>
                  <span className={styles.span}>付息方式</span><em className={styles.em}>{Dic.fetchDicValue('paymentType',productDetail.paymentType)}</em>
                </Item>
                <Item>
                  <span className={styles.span}>投资方向</span><em className={styles.em}>{productDetail.invDir}</em>
                </Item>
                <Item>
                  <span className={styles.span}>风控方式</span><em className={styles.em}>{productDetail.riskCtrlMode}</em>
                </Item>
              </List>
            </div>
          </TabPane>
          <TabPane tab="佣金描述" key="3">
						<WhiteSpace style={{height: '0.267rem'}} />
						<div className={styles.dsecript}>
							{
								productDetail.commission==undefined?<div style={{width: '100%',height: '2rem',backgroundColor: '#fff'}}></div>
								:<div style={{fontFamily:'PingFangSC-Regular'}}>{ReactHtmlParser(html_decode(productDetail.commission!=undefined?productDetail.commission:''))}</div>
							}
						</div>
          </TabPane>
        </Tabs>
      </div>
    );
}

export default SafeTabs;
