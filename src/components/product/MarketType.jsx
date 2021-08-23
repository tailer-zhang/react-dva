import React, { PropTypes } from 'react';
import { Accordion, List } from 'antd-mobile';
import WinList from './WinList'
import proDetailStyles from '../../styles/product/ProductDetail.less';
import Dic from '../../utils/dictionary';

const MarketType = ({categoryData}) => {

  function checkProperty(args0, args1) {
     return args0&&args0[args1]?args0[args1]:'';
  }

  function checkProperty1(args0, args1, args2) {
      return args0&&args0[args1]&&args0[args1][args2]?args0[args1][args2]:'';
  }

  let {prodFixedProfRuleList} = categoryData;
  return(
    <div style={{ marginTop: 10, marginBottom: 10 }} className={proDetailStyles.whd}>
      <Accordion accordion openAnimation={{}} className="my-accordion" style={{width:"100%"}} >
        <Accordion.Panel header="份额类别信息" >
          <List>
            <List.Item>
              <p className={proDetailStyles.ListP}>份额类别名称<span>{checkProperty(categoryData,'shrType')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>收益方式<span>{checkProperty(categoryData, 'profCalcType')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>收益规则<span>{checkProperty(categoryData, 'profRuleName')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>是否永续<span>{checkProperty(categoryData, 'sustainName')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>期限单位<span>{checkProperty(categoryData, 'deadlineUnit')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>最小期限<span>{checkProperty(categoryData, 'minDeadline')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>最大期限<span>{checkProperty(categoryData,'maxDeadline')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>预计到期日<span>{checkProperty(categoryData, 'expeExpiDate')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>实际到期日<span>{checkProperty(categoryData, 'realExpiDate')}</span></p>
            </List.Item>
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="客户购买限额" className="pad">
          <List>
            <List.Item>
              <p className={proDetailStyles.ListP}>首次认购下限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minBegRg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>首次认购上限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'maxBegRg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>追加认购下限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minAddRg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>认购递增额（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'rgAddAmt')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>首次申购下限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minBegSg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>首次申购上限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'maxBegSg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>追加申购下限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minAddSg')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>申购递增额（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'sgAddAmt')}</span></p>
            </List.Item>
            <List.Item>
              <p className={proDetailStyles.ListP}>单笔赎回上限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'maxPerRede')}</span></p>
            </List.Item>
             <List.Item>
              <p className={proDetailStyles.ListP}>单笔赎回下限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minPerRede')}</span></p>
            </List.Item>
             <List.Item>
              <p className={proDetailStyles.ListP}>单日赎回上限（万）<span>{checkProperty1(categoryData, 'personBuyLimit', 'maxAdayRede')}</span></p>
            </List.Item>
             <List.Item>
              <p className={proDetailStyles.ListP}>最低持有份额（份）<span>{checkProperty1(categoryData, 'personBuyLimit', 'minResvShr')}</span></p>
            </List.Item>
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="固定收益率列表" className="pad">
         <List.Item>
          <WinList profListData={prodFixedProfRuleList} />
          <p className={ proDetailStyles.winP } >数字区间包含最小值，不包含最大值。</p>
         </List.Item>
       </Accordion.Panel>
      </Accordion>
      {/*<p className={proDetailStyles.ListFullp}></p>*/}
    </div>
  )
}

export default MarketType;
