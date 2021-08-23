//客户购买列表
import React from 'react';
import { SegmentedControl,DatePicker, List, Button ,ListView, SearchBar, Icon, Drawer, NavBar } from 'antd-mobile';
import buycustStyle from '../../styles/product/buyCustomer.less';
import EmptyResult from '../../components/share/EmptyResult';
import { Link,routerRedux } from 'dva/router';
import {fmoney} from '../../utils/formatUtils';

class BuyCustList extends React.Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
   });
    this.state = {
        ds:ds
    };
  }

  clickCell(rowData){
      let {dispatch} = this.props;
      dispatch(
        routerRedux.push({pathname:'/custBuyDetail',state:rowData})
      );
  }

  renderRow(rowData, sectionID, rowID){
      return (
          <div key={rowID} className={buycustStyle.listBlock} onClick={this.clickCell.bind(this,rowData)}>
            <p>{rowData.custName}</p>
            <ul>
              <li className={buycustStyle.moneyOnfo}>
                <p>{fmoney(rowData.reqAmt)}<i></i></p>
                <span>购买金额(人民币)</span>
              </li>
              <li className={buycustStyle.contMonInfo}>
                <p>{fmoney(rowData.confShr)}<i></i></p>
                <span>确认份额(份)</span>
              </li>
            </ul>
          </div>
      );
  }

  // <p><span>{rowData.custName}</span>{rowData.custType=='1'?<img src={ sex=='man'?require("../../image/icon/female.png"):require("../../image/icon/male.png") } />:''}</p>


  onEndReached(event){
      let {dispatch,loadingTags} = this.props;
      let {loadingMore,loading} = loadingTags;
      if(!event||loadingMore||loading)
        return;
     console.log('====loadingMore===',loadingMore,loading,event);
      dispatch({
          type:'xtProduct/fetchBuyCustomerList',
          payload:{
                loadingMore:true
          }
      });

  }

  renderSeparator(sectionID, rowID){
      return (
          <div key={`${sectionID}-${rowID}`} style={{
            backgroundColor: '#efeff4',
            height: 30,
            borderTop: '1px solid #efeff4',
            borderBottom: '1px solid #efeff4',
          }}
          />
      );
  }

  render(){
      let {ds}  =this.state;
      let {dispatch,list,loadingTags} = this.props;
      let {loadingMore,loading} = loadingTags;
      if(list&&list.length>0){
          return (
                   <ListView
                     useBodyScroll
                    dataSource={ds.cloneWithRows(list)}
                    renderFooter={() => {
                      if(loadingMore)
                        return (<div style={{ padding: 30, textAlign: 'center'}}>
                         加载中...
                        </div>);
                      else return <div />;
                    }}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderSeparator.bind(this)}
                    className="am-list"
                    pageSize={10}
                    scrollRenderAheadDistance={90}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={200}
                  />
          );
      }
      else if(loading){
        return (<div style={{backgroundColor:'#f7f7f7'}}></div>);
      }
      else  return  (<EmptyResult style={{height:'100%'}} />);
  }
}

// style={{height:document.documentElement.clientHeight,overflow: 'auto',width:'100%'}}




export default BuyCustList;
