import React,{ Component,PropTypes } from 'react';
import { Modal, Button,WingBlank,Toast  } from 'antd-mobile';
import { connect } from 'dva';
import { Link,routerRedux, } from 'dva/router';
import cancelBtn from '../../styles/trade/rebut.less';

const alert = Modal.alert;

export default class CancelBtn1 extends React.Component{
  constructor(props){
    super(props);
      this.state = {
      visible: false
    };
  }
  showModal = (e) => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible: true,
    });
  }
  onClose = ()=> {

  }
  render() {
    const props = this.props;
    const { btnType,data } = props;
    return (
      <div >
        <Button onClick={() => alert('取消预约', '确定执行此操作?', [
                { text: '取消', onPress: () => {} },
                { text: '确定', onPress: () => {
                  this.setState({
                    visible: false,
                  });
                  let { dispatch,data,trade } = this.props;

                  dispatch({
                      type:'trade/fetchOrderCancel',
                      payload:{
                        id:data.model.id,
                        mgrCode:data.model.mgrCode,

                        backMethord:(data)=>{
                          console.log('0000====',data.code,data.message);
                          if(data&&data.code=='00')
                          {
                            Toast.success(data&&data.message?data.message:'取消成功！',2);
                            dispatch(routerRedux.goBack());
                          }
                          else{
                            Toast.fail(data&&data.message?data.message:data.message,2);
                          }
                        }
                      }

                  });
                },style: { fontWeight: 'bold' } },])}
                style={{border:'0',color:'#fff',backgroundColor:'#f22f33'}}
        >{btnType}</Button>

      </div>)
  }
};
