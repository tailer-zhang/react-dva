import React,{ Component,PropTypes } from 'react';
import { Modal, Button, WhiteSpace, WingBlank, Toast} from 'antd-mobile';

import cancelBtn from '../../styles/trade/rebut.less';

const alert = Modal.alert;

const CancelBtn = React.createClass({

  render() {
    const props = this.props;
    const { btnTxt } = props;
    return (
      <div style={{width:'100%' }}>
        <Button style={{height:'90px',border:'none',background:'#fff',color:'#f22f33'}}
         onClick={() => alert('取消预约', '确定执行该操作?', [
         { text: '取消', onPress: () => console.log('取消'), style: {color:'#f22f33'} },
         { text: '确定', onPress: () => console.log('确定'), style: { fontWeight: 'bold' ,color:'#f22f33'} },
       ])}
       >{btnTxt}</Button>
      </div>
    );
  },
});

export default CancelBtn;
