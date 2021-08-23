import React from 'react';
import { Link,routerRedux } from 'dva/router';
import {connect} from 'dva';
import styles from '../styles/product/AppointSuccess.less';
import { Button, Flex } from 'antd-mobile';

class  SubmitSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state= props;
  }

  render()
  {
    let { dispatch } = this.props;
    let {location} = this.state;
    //console.log('weweweeewee',location.state.backMethord);
    let successTitle,backTitle,backMethord,back;
  	if(location.state)
  	{
        back = location.state.backMethord;
  			successTitle = location.state.successTitle;
  			backTitle = location.state.backTitle;
  			backMethord =  location.state.backMethord;
  	}

  	if(!successTitle)
  		successTitle = '提交成功!';
  	if(!backTitle)
  	  backTitle = '返回';
  	if(!backMethord)
  	  backMethord = ()=>{
  			 dispatch(routerRedux.goBack());
  		};
      //console.log('backMethord---',location.state.clickMethod);
  	return (
  			 <div className={styles.total}>
  			 	<section>
  			 		<div className={styles.appoint}>
  			 			<img className={styles.img} src={require("../image/product/appointsuccess.png")} />
  			 		</div>
  			 		<p className={styles.word}>{successTitle}</p>
  			 		<div className={styles.foot}>
  			 		 <Button  onClick={(e) => {
  					// 		 e.preventDefault();
  							 backMethord();
  					 }}
  						 inline style={{width: '90%', color: '#848484', fontSize: '0.453333rem'}}  data-seed="logId">{backTitle}</Button>
  					 {
  					 //  <Button onClick={() => {
  					// 	 dispatch(routerRedux.push('/safeGuard'))}} inline style={{width: '45.87%', color: '#848484',fontSize: '0.453333rem'}}  data-seed="logId">查看详情</Button>
  				 }

  			 		</div>
  			 	</section>
  			 </div>
  		)
  }
}

// const SubmitSuccess = () => {
//
// }

export default connect()(SubmitSuccess);
