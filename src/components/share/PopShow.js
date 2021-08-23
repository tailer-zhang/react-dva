import React, { Component,PropTypes } from 'react';
import redeemList from "../../styles/trade/redeem.less";
import {Button, List, Radio} from "antd-mobile";

const RadioItem = Radio.RadioItem;
class PopShow extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }

  }
  render() {
    let {popShow,radioData,slideUp,value,openShrId} = this.props;
    return(
      <div>
        {popShow&&
        <div>
          <div onClick={()=>this.props.closeModal()} className={`${redeemList.modalbg} ${slideUp&&redeemList.opacity}`}></div>
          <div className={`${redeemList.ampopup} ${slideUp&&redeemList.slideUp}`}>
            <List renderHeader={() => '可赎回列表'} style={{maxHeight:'11rem',overflowY:'auto'}}>
              {
                radioData.map(i=>(
                  <RadioItem key={i.value} checked={value === i.value} onChange={()=>this.props.onChange(i)}>
                    <div className={redeemList.SingleWrapper}>
                      <div>
                        <span>份额类别：</span>
                        <span>{i.shrType}</span>
                      </div>
                      <div>
                        <span>总份额：</span>
                        <span className={redeemList.redLabel}>{i.totShr}</span>
                      </div>
                      <div>
                        <span>开放期：</span>
                        <span>{i.openDate}</span>
                      </div>
                      <div>
                        <span>可用份额：</span>
                        <span>{i.avlShr}</span>
                      </div>
                      <div>
                        <span>冻结份额：</span>
                        <span className={redeemList.redLabel}>{i.tradShr}</span>
                      </div>
                      <div>
                        <span>可赎回预约开始日期：</span>
                        <span>{i.reserveBegDate}</span>
                      </div>
                      <div>
                        <span>可赎回预约结束日期：</span>
                        <span>{i.reserveEndDate}</span>
                      </div>
                    </div>
                  </RadioItem>
                ))
              }
            </List>
            <Button disabled={!openShrId?true:false}  type="primary" onClick={()=>this.props.onConfirm()}>确定</Button>
          </div>
        </div>
        }
      </div>
    )

  }
}

export default PopShow;
