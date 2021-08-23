import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory, } from 'dva/router';

//import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';//样式文件
import productStyle from '../../styles/product/ProductStyle.less';
import {Toast,Modal } from 'antd-mobile';
class XTListItem1 extends Component{
  constructor(props) {
    super(props);
  }
  signWaySet(prod,e){
    e.stopPropagation();
    if(prod.signType){
      let Alert = Modal.alert;
      Alert('友情提醒','亲爱的理财师，您已经设置签署合同方式了...',[{ text: '知道了', onPress: () => console.log('ok') }])
      return;
    }
    this.props.showsignmodal(prod)
  }

  render() {
    let {dispatch,data} = this.props;
    let prodId = data.id;
    return (
      <div className={productStyle.itemWrap3} style={{marginBottom:'0px',borderBottom:'1px solid #dcdcdc'}}>
        <div className={productStyle.itemMainInfo +' '+productStyle.itemMainInfo2} >
          <h2 className={[productStyle.proTitle1,productStyle.listTitles].join(" ")} style={{marginBottom:'0.4rem'}}>
            <span>{data.prodName}</span>
            {prodId?<img src={require("../../image/trade/edit_icon.png")} style={{width:'0.44rem',height:'0.44rem',marginLeft:'10px',marginRight:'10px'}}/>:''}
            <button onClick={this.signWaySet.bind(this,data)} className={productStyle.signBtn} type="button">签署方式设置</button>
          </h2>
          <div className={productStyle.trendDet}>
            <p>
              <span className={productStyle.txt2} style={{color:'#f22f33'}}>{data.resvAmt}</span><br/>
              <span className={productStyle.margin0}>预约金额(人民币)</span>
            </p>
            <p>
              <span className={productStyle.txt3}>{data.custName}</span><br/>
              <span className={productStyle.margin0}>客户名称</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
// const XTListItem1 = ({dispatch,data}) => {
//   let prodId = data.id;
//   return (
//     <div className={productStyle.itemWrap3} style={{marginBottom:'0px',borderBottom:'1px solid #dcdcdc'}}>
// 			<div className={productStyle.itemMainInfo +' '+productStyle.itemMainInfo2} >
// 				<h2 className={[productStyle.proTitle1,productStyle.listTitles].join(" ")} style={{marginBottom:'0.4rem'}}>
//           <span>{data.prodName}</span>
//           {prodId?<img src={require("../../image/trade/edit_icon.png")} style={{width:'0.44rem',height:'0.44rem',marginLeft:'10px',marginRight:'10px'}}/>:''}
//           <button className={productStyle.signBtn} type="button">签署方式设置</button>
//         </h2>
// 				<div className={productStyle.trendDet}>
// 					<p>
// 						<span className={productStyle.txt2} style={{color:'#f22f33'}}>{data.resvAmt}</span><br/>
// 						<span className={productStyle.margin0}>预约金额(人民币)</span>
// 					</p>
// 					<p>
// 						<span className={productStyle.txt3}>{data.custName}</span><br/>
// 						<span className={productStyle.margin0}>客户名称</span>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
//   );
// };
export default connect()(XTListItem1);
