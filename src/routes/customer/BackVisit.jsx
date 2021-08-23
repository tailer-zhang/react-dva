//个人客户详情 基本信息 回访记录
import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import Dic from '../../utils/dictionary';

import visitStyles from '../../styles/customer/customerAdd.less';

const BackVisit = ({customer,props,dispatch}) => {

  const TitleProp = {title:'回访记录'};
  const data = customer.reVisitList;

  return (
    <div className={visitStyles.BackVisitBox}>
      <div><Title {...TitleProp}/> </div>
      <p className={visitStyles.pFull}></p>
      <div className={visitStyles.BackNodes}>
        {
          data != undefined?
          data.map((item,index) => {
            return(
            <div className={visitStyles.visitContent} key={index}>
              <div>
                <section className={visitStyles.section_01}>
                  <span className={visitStyles.visitLine}></span>
                  <span className={visitStyles.visitCircle}><span></span></span>
                </section>
                <section className={visitStyles.section_02}>
                  <span className={visitStyles.visitIcon}></span>
                    <ul className={visitStyles.visitUl}>
                      <li className={visitStyles.visitLiTime}><span>{item.visitTime}</span></li>
                      <li className={visitStyles.visitLiName}>{item.vistName}</li>
                    </ul>
                    <div>
                      <p>回访结果：<span>{item.visitRs}</span></p>
                      {
                        item.visitRs=='通过'?<div />:<p>
                          回访不通过原因：
                          <span>
                            {
                               Dic.fetchDicValue('noPassReason',item.noPassReason)
                            }
                          </span>
                        </p>
                      }
                    </div>
                </section>
              </div>
            </div>
          )
        }): ''
        }
      </div>
    </div>
  )
}

function connectBack({customer}){
  return {customer}
}

export default connect(connectBack)(BackVisit);
