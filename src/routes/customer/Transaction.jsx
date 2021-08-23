//个人客户详情 基本信息 交易记录
import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import TransList from '../../components/share/TransList';
import { Accordion, List } from 'antd-mobile';
import moment from 'moment';
import Dic from '../../utils/dictionary';

import styles from '../../styles/customer/customerAdd.less';

const Transaction = ({customer}) => {
  const TitleProp = {title:'交易记录'};
  console.log('hjoij',customer);
  let dataHis = customer.dealHisList;
  let {bxList,xtList} = customer;
  if(!bxList)
    bxList = [];
  if(!xtList)
    xtList = [];
  if(dataHis == undefined) dataHis = [];
  return (
    <div>
      <div>
        <Title {...TitleProp}/>
      </div>
      <p className={styles.pFull}></p>
      <div>
        <Accordion defaultActiveKey="0" className="my-accordion">
          <Accordion.Panel header="私募">
            <List>
              {
                xtList.map((item,index)=>{
                  return(
                  <List.Item key={index}>
                    <div>
                      <p className={styles.contractNum}>合同编号：<span>{item.contNo}</span></p>
                      <ul className={styles.transUl}>
                        <li>
                          <p className={styles.transMoney}>{item.amount}<span></span></p>
                          <section>交易金额（{Dic.fetchDicValue('dealPayCurType',item.currType)}）</section>
                        </li>
                        <li>
                        <p className={styles.transTime}>{moment(item.remitDate).format('YYYY-MM-DD')}</p>
                        <section>签单日期</section>
                        </li>
                      </ul>
                    </div>
                  </List.Item>
                  )
                })
              }
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion>
          <Accordion.Panel header="B类产品">
            <List>
            {
              bxList.map((item,index)=>{
                return(
                <List.Item key={index}>
                  <div>
                    <p className={styles.contractNum}>合同编号：<span>{item.contNo}</span></p>
                    <ul className={styles.transUl}>
                      <li>
                        <p className={styles.transMoney}>{item.amount}<span></span></p>
                        <section>交易金额（{Dic.fetchDicValue('dealPayCurType',item.currType)}）</section>
                      </li>
                      <li>
                      <p className={styles.transTime}>{moment(item.remitDate).format('YYYY-MM-DD')}</p>
                      <section>签单日期</section>
                      </li>
                    </ul>
                  </div>
                </List.Item>
                )
              })
            }
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion>
          <Accordion.Panel header="财富通">
            <List>
              {
                dataHis.map((item,index)=>{
                  return(
                  <List.Item key={index}>
                    <div>
                      <p className={styles.contractNum}>合同编号：<span>{item.contractCode}</span></p>
                      <ul className={styles.transUl}>
                        <li>
                          <p className={styles.transMoney}>{item.amount}<span></span></p>
                          <section>交易金额（人民币）</section>
                        </li>
                        <li>
                        <p className={styles.transTime}>{item.signDate}</p>
                        <section>签单日期</section>
                        </li>
                      </ul>
                    </div>
                  </List.Item>
                  )
                })
              }
            </List>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

function connectDealHis({customer}) {
  return {customer}
}

export default connect(connectDealHis)(Transaction);
