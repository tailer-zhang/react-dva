import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Button ,ListView, SearchBar } from 'antd-mobile';
// import Title from '../../../components/product/Title';//顶部标题和返回按钮组件

// import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import styles from '../../../styles/trade/written.less';


class SelectProWritten extends Component {
constructor(props) {
   super(props);
   this.state={
       ...props,preKeyword:props.intentionWritten.preKeyword
   };
}

selectProduct(item){
    let {selectResult} = this.state.location.state;
    if(selectResult){
        selectResult(item);
    }
}

searchKeyword(value){
    let {dispatch} = this.props;
    dispatch({
        type:'intentionWritten/fetchPreProductList',
        payload:{
            preKeyword:value,
        }
    });
}


  render()
  {
    let { dispatch,intentionWritten} = this.props;
    let {preProductList} = intentionWritten;
    // const TitleProps = {
    //   title:'产品选择',
    //   showBack:'no'
    // };

    let {selectProd} = this.state.location.state;

    return (
      <div className={styles.selectProd}>
          {/*<Title {...TitleProps}></Title>*/}
          <SearchBar placeholder="产品名称" value = {this.state.preKeyword} onChange={(value)=>this.setState({preKeyword:value})} onCancel={(value)=>{
              this.setState({preKeyword:''});
              this.searchKeyword('');
          }}
          onSubmit={(value)=>{
              this.searchKeyword(this.state.preKeyword);
          }}
              />
        <div>
        {
          preProductList.map((item,index)=>{
              let sign = false;
            if(selectProd&&selectProd.id==item.id)
              sign = true;
            return(
              <p className={styles.custBtn} onClick = {this.selectProduct.bind(this,item)}  key={index}> <span>{item.text}</span> {sign?<img src={require("../../../image/icon/choiced.png")}/>:<i/>}</p>
            );
          })
        }
        </div>
      </div>
    );
  }
};

function connectTradeFunc({intentionWritten})
{
  return {intentionWritten};
}

export default connect(connectTradeFunc)(SelectProWritten);
