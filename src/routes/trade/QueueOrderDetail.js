import React , { Component , PropTypes } from 'react';
import Title from '../../components/product/Title';
import { WhiteSpace } from 'antd-mobile';

import styles from '../../styles/trade/queueOrder.less';
import {connect} from 'dva'
/*
 *排队预约详情
 **/
class QueueOrderDetail extends Component {
  constructor(props){
    super(props)
  }

  componentWillUnmount()
  {
    let {dispatch} = this.props;
    dispatch({
      type:'queueModel/clearCache',
      params:{detail:{},loading: false}
    });
  }

  render(){
    const titleProps = {
      title:'排队详情'
    }
    let detail = this.props.queueModel.detail
    let limit;
    if (detail.resvAmt !== undefined){
      if (detail.resvAmt<10000){
        limit = detail.resvAmt
      }else {
        limit = detail.resvAmt/10000
      }
    }else {
      limit='--'
    }
    if(this.props.queueModel.loading){
    return(
      <div className={styles.detail}>
        <Title {...titleProps} />
        <WhiteSpace />
        <ul>
          <li>
            <p className={styles.title}>产品名称</p>
            <p className={styles.prodName}>{detail.prodName}</p>
          </li>
          <li>
            <p className={styles.title}>剩余额度</p>
            <p>{detail.prodUsableAmt !== undefined ?detail.prodUsableAmt:'--'}</p>
          </li>
        </ul>
        <WhiteSpace />
        <ul>
          <li>
            <p className={styles.title}>排队开始时间</p>
            <p className={styles.prodName}>{detail.updateTime}</p>
          </li>
          {/*<li>*/}
            {/*<p className={styles.title}>排队号</p>*/}
            {/*<p>{detail.ranking!==undefined?detail.ranking:'请等待'}</p>*/}
          {/*</li>*/}
          <li>
            <p className={styles.title}>前面排队人数</p>
            <p>{detail.ranking===undefined?'请等待': (detail.queueNum)}</p>
          </li>
        </ul>
        <WhiteSpace />
        <ul>
          <li>
            <p className={styles.title}>客户名称</p>
            <p className={styles.prodName}>{detail.custName}</p>
          </li>
          <li>
            <p className={styles.title}>预约金额(人民币)</p>
            <p>{detail.resvAmt}</p>
          </li>
          <li>
            <p className={styles.title}>预计打款日期</p>
            <p>{detail.ordDate}</p>
          </li>
          <li>
            <p className={styles.title}>vip标志</p>
            <p>
              {detail.topStat ==='1'?<img className={styles.vipImage} src={require('../../image/trade/vip_first.png')}/>:null}
              {(limit==='--'||limit<1000)?null:<img className={styles.vipImage} src={require('../../image/trade/vip_second.png')}/>}
              {detail.diamondStat === '1'?<img className={styles.vipImage} src={require('../../image/trade/vip_third.png')}/>:null}
              {detail.topStat === '1'||!(limit==='--'||limit<1000)||detail.diamondStat === '1'?null:"--"}
            </p>
          </li>
        </ul>
      </div>
    );} else {
      return(
        <div className={styles.detail}>
          <Title {...titleProps} />
          <WhiteSpace />
        </div>
      )
    }
  }
}
function getProps({queueModel}) {
  return {queueModel}
}
export default connect(getProps)(QueueOrderDetail);
