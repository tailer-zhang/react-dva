//产品相关通知主页
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../../components/product/Title';
import proDetailStyles from '../../../styles/product/ProductDetail.less';
import ProductNotifyList from './ProductNofyList';

class ProductNotify extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            display:'none'
        };
    }

    render(){
        let {dispatch,location,xtProduct} = this.props;
        const TitleProps = {title:'产品相关通知',
            showBack:'no',
            backMethord:()=>dispatch(routerRedux.goBack())
          };

        	return (
        		<div className={proDetailStyles.mainContent} >
                    <div style={{width:"100%",height:"1.33rem",position:"fixed",top:'0',left:'0'}}>
                        <Title {...TitleProps} ></Title>
                    </div>
        			<div style={{height:'100%',width: '100%',paddingTop:'1.53rem'}}>
                <ProductNotifyList
                  notifyList={xtProduct.notifyProduct.notifyList}
                  dispatch={dispatch}
                  xtProductModel={xtProduct}
                />
        			</div>
        		</div>
        	);

    }
}

function connectProductFunc({xtProduct})
{
	  return {xtProduct};
}

 export default connect(connectProductFunc)(ProductNotify);
