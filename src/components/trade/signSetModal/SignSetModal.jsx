import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Modal, Toast, Checkbox,List} from 'antd-mobile';
import modalstyles from './modal.less'
const CheckboxItem = Checkbox.CheckboxItem;
class SignSetModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal1: false,
      radioValue:'02',
      notify:[],
      notifyInfo:[
        { value: '00', label: '本人确认并已知晓本产品为中高风险/高风险的股权类产品；' },
        { value: '01', label: '本人已告知客户本产品的风险等级、产品类型以及本产品可能亏损本金的风险，客户已签署《特别风险提示函》。' },
      ],
      showDialog:false,
      signWay: false
    };
  }
  componentWillReceiveProps(nextProps){
    nextProps.isshow !==this.props.nextProps&&this.setState({
      showDialog:nextProps.isshow
    })
  }
  componentDidMount() {
    // notify =[]
  }
  closeAlert(){
    this.setState({
      modal1: false
    })
  }
  onClose(){
    this.props.closemodal()
  }
  cancle() {
    this.setState({
      signWay:false,
      notify :[]
    })
    this.onClose();
  }
  confirm() {
    const alert = Modal.alert;
    this.onClose();
    this.setState({
      modal1:true
    })
  }
  validate() {
    if(this.state.notify.length>1){
      //合同签署方式
      if(!this.props.data.signType){
        this.setState({
          signWay:true
        })
      }else {
        this.props.goJump(this.props.data)
      }

    } else {
      Toast.fail('请先勾选',2);
    }
  }
  submitModify(){
    Toast.loading('请求中...',30,undefined,true);
    this.props.dispatch({
      type:'trade/updateSignType',
      payload:{
        id:this.props.data.contId,
        contNo:this.props.data.contNo,
        signType:this.state.radioValue,
        prodId:this.props.data.prodId,
        backMethord:(data)=>{
          Toast.hide();
          if(data&&data.code === '00'){
            this.props.goJump(this.props.data)
          }else{
            Toast.fail(data&&data.message?data.message:'校验失败!',3);
            setTimeout(()=>{
              Toast.hide()
            },3500)
          }
        }
      }

    })
  }
  cancelModify(){
    this.closeAlert()
  }
  handleChange(e){
    this.setState({
      radioValue:e.target.value
    })
  }
  onChange(value) {
    let notifyArray = this.state.notify ;
    if(this.state.notify.includes(value)){
      notifyArray.splice(notifyArray.indexOf(value),1)
      this.setState({
        notify : notifyArray
      })
    }else{
      notifyArray.push(value)
      this.setState({
        notify : notifyArray
      })
    }
  }
  render() {
    // console.log('弹款===',this.props)
    let {radioValue} = this.state;
    return (
      <div>
        {this.props.isshow?
          <div>
            <div className={modalstyles.modalBg}></div>
            {
              this.props.data.earnType ==='2'&&!this.state.signWay?
                <div className={modalstyles.contentWrapper}>
                  <div className={modalstyles.modaltitles}>股权类产品风险揭示</div>
                  <div className={modalstyles.contents}>
                    <List>
                      {this.state.notifyInfo.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                          {i.label}
                        </CheckboxItem>
                      ))}
                    </List>
                  </div>
                  <div className={modalstyles.footers}>
                    <button onClick={this.cancle.bind(this)} className={modalstyles.normalBtn}>取消</button>
                    <button onClick={this.validate.bind(this)} className={[modalstyles.normalBtn,modalstyles.lightBtn].join(" ")}>确认</button>
                  </div>
                </div> :
                <div className={modalstyles.contentWrapper}>
                  <div className={modalstyles.modaltitles}>签署方式设置</div>
                  <div className={modalstyles.contents}>
                    <div className={modalstyles.contractCode}>合同编号</div>
                    <div className={modalstyles.contractDes}>{this.props.data.prodName}</div>
                    <div className={modalstyles.contractWay}>签署方式</div>
                    <div className={modalstyles.signMethods}>
                      <div className={modalstyles.leftItem}>
                        <label>
                          <input name="contract" value="02" className={radioValue=='02'?modalstyles.radioSelected:''} onChange={this.handleChange.bind(this)} type="radio"/>
                          电子合同
                        </label>
                      </div>
                      <div>
                        <label>
                          <input name="contract" value="01" className={radioValue=='01'?modalstyles.radioSelected:''} onChange={this.handleChange.bind(this)} type="radio"/>
                          纸质合同
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={modalstyles.footers}>
                    <button onClick={this.cancle.bind(this)} className={modalstyles.normalBtn}>取消</button>
                    <button onClick={this.confirm.bind(this)} className={[modalstyles.normalBtn,modalstyles.lightBtn].join(" ")}>提交</button>
                  </div>
                </div>
            }
          </div>:''}
        <Modal
          title="提示"
          transparent
          maskClosable={false}
          visible={this.state.modal1}
          footer={[
              { text: '取消', onPress: this.cancelModify.bind(this)},
              { text: '确定', onPress: this.submitModify.bind(this)},
            ]}
        >
          确定设置吗？
        </Modal>
      </div>

    )
  }

}


export default SignSetModal
