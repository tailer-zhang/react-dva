import React,{ Component,PropTypes } from 'react';
import { Modal, Button,WingBlank,Toast} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import cancelBtn from '../../styles/trade/rebut.less';

const alert = Modal.alert;

export default class CancelBtn2 extends React.Component{
  constructor(props){
    super(props);
      this.state = {
      visible: false
    };
  }
  showModal =(e) => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
    });
  }
  // onClose = ()=> {
  //
  // }

  render() {
    const { btnType,dispatch,tradeData } = this.props;
    let code = tradeData.tradCode;
    return (
      <div>
        {code == '0020'||code == '0022'?<div><Button onClick={this.showModal} style={{border:'0',color:'#f22f33',backgroundColor:'#fff'}}>{btnType}</Button>
             <Modal
               title="作废提示"
               transparent
               maskClosable={false}
               visible={this.state.visible}
               onClose={this.onClose}
               footer={[{ text: '确定', onPress: () => {  dispatch(routerRedux.push({pathname:'/tradeRebut'}))} }]}
               style={{width:'570px'}}
             >
               购买不支持直接作废，如需要更换合同，<br />
               请联系分公司客服处理！<br />
             </Modal></div>:<div>
               <Button onClick={() => {
                   if(!tradeData||tradeData.recStat!='1'){
                       Toast.fail('该交易状态已作废,无法进行驳回修改!');
                       return;
                   }
                       alert('作废提示', '确定作废该记录?', [
                       { text: '取消', onPress: () => {} },
                       { text: '确定', onPress: () => {
                         this.setState({
                           visible: false,
                         });
                         let { dispatch,tradeData,tradeForm} = this.props;
                         let code = tradeData.data;
                         dispatch({
                           type:'rebutSpace/fetchTradeCancel',
                           payload:{reqId:tradeData.id,mgrCode:tradeData.mgrCode,
                             backMethord:(data)=>{
                                 if(data&&data.code=='00'){
                                     dispatch(routerRedux.push({pathname:'/tradeRebut'}))
                                 }
                                 else Toast.fail(data.message?data.message:'作废交易失败!',2);
                             }
                           }
                         });
                     }, style: { fontWeight: 'bold' } },]);
                 }}
                       style={{height:'1.30rem',color:'#f22f33',border:'none'}}
               >{btnType}</Button>
             </div>
        }


      </div>);
    }
};
