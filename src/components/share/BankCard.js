//客户 银行卡管理
import React,{ Component,PropTypes } from 'react';
import { Modal, Button,WhiteSpace, WingBlank  } from 'antd-mobile';
import {routerRedux} from 'dva/router';

import TextStyles from '../../styles/customer/bankCard.less';

const alert = Modal.alert;

const BankCard = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal(e) {
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
    });
  },
  onClose() {
    this.setState({
      visible: false,
    });
  },

  render() {
    let {dispatch} = this.props;
    return (
      <div className={TextStyles.bankBox}>
        <div className={TextStyles.cardInfo}>
          <section className={TextStyles.cardInfoUp}>
            <div className={TextStyles.qyLift}>
              <p className={TextStyles.cardName}>中国民生银行</p>
              <p className={TextStyles.cardNum}>6222 0213 0300 0849 230</p>
            </div>
            <div>
                <p className={TextStyles.qyRight}>已启用</p>
            </div>
          </section>
          <section className={TextStyles.cardInfoDown}>
            <p>派其网络传媒有限公司</p>
            <p>营业执照（6253665136623563626655）</p>
          </section>
        </div>
        <div className={TextStyles.bankBtn}>
          <ul>
            <li onClick={()=>{dispatch(routerRedux.push('/NewBankId'))}}>
              <span className={TextStyles.spanBtn}><img className={TextStyles.img} src={require("../../image/icon/icon_05.png")} /></span><span className={TextStyles.second}>修改</span>
            </li>
            <li>
              <span className={TextStyles.spanBtn}><img className={TextStyles.img} src={require("../../image/icon/icon_06.png")} /></span><span className={TextStyles.second}>启用</span>
            </li>
            <li>
              <Button style={{height:'90px',border:'none'}} onClick={() => alert('停用', '确定停用吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
              ])}
              ><span className={TextStyles.spanBtn}><img src={require("../../image/icon/icon_07.png")} /></span><span>停用</span></Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});


export default BankCard;
