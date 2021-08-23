//废弃（临时） 即将到期的交易 赵博文
import React, { Component,PropTypes }from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ListView } from 'antd-mobile';
import Title from '../../components/product/Title';
import styles from '../../styles/trade/tradeExpireDeal.less';
import Dic from '../../utils/dictionary';


  const titleProps = {
    title: '即将到期的交易',
    showBack:'no'
  };


  const TradeExpireDeal = ({dispatch,trade}) =>{
    return (
      <div>
        <div style={{position:'fixed',top:'0',zIndex:'2',width:'100%'}}>
          <Title {...titleProps} />
        </div>
        <p style={{height:'1.466rem'}}></p>
        <ExpireDeal dispatch={dispatch}  trade={trade}/>
      </div>

    )
  }

  class ExpireDeal extends React.Component{
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state= {
         ds:ds,
         isLoading:false
      };
    }

    onEndReached(event) {
      let {trade,dispatch} = this.props;
      let { loadingMore } = trade;
      if(event==undefined||loadingMore){
            return;
      }else {
        dispatch({
          type:'trade/fetchExpire',
          payload:{loadingMore:true}
        })
       }
    }

    // touchCell(rowData, sectionID, rowID)
    // {
    //   let { dispatch } = this.props;
    //  //认、申购
    //  if(rowData.tradCode=="0020"||rowData.tradCode=="0022"){
    //    dispatch(routerRedux.push({pathname:'/RebutBuy',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    //  }//赎回
    //  else if(rowData.tradCode=="0024"){
    //    dispatch(routerRedux.push({pathname:'/RebutRedeem',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    //  }//撤单
    //  else if(rowData.tradCode=="0052"){
    //    dispatch(routerRedux.push({pathname:'/RebutRecall',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    //  }//转让
    //  else if(rowData.tradCode=="0033"){
    //    dispatch(routerRedux.push({pathname:'/transferDetail',state:{tradeDetail:rowData,rejectFlag:'1'}}))
    //  }
    // }



    render() {
      let { dispatch,trade } = this.props;
      let { loadingMore } = trade;
      let dataSource = trade.buyList;
      const separator = (sectionID, rowID) => (
        <div key={`${sectionID}-${rowID}`} style={{
          backgroundColor: '#F5F5F9',
          height: 20,
        }}
        />
      );
      const row = (rowData, sectionID, rowID) => {
        return (
          <div key={rowID}
              style={{
                backgroundColor: 'white',
                width:'100%',
                height:'3.333rem',
              }}
              //onClick={this.touchCell.bind(this,rowData, sectionID, rowID)}
            >
              <div className={styles.total}>
                <p className={styles.name}>{rowData.prodName}</p>
                <div className={styles.wrap}>
                  <div className={styles.num}>
                    <p>{rowData.totShr==undefined?0:rowData.totShr}</p>
                    <p>持有份额(份)</p>
                  </div>
                  <div className={styles.customer}>
                    <p>{rowData.custName}</p>
                    <p>客户名称</p>
                  </div>
                  <div className={styles.days}>
                    <p>{rowData.willExpireNum} 天</p>
                    <p>{rowData.willExpireDate}</p>
                  </div>
                </div>
              </div>
          </div>
        );
      };
      return (<div style={{ margin: '0 auto', width: '100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(dataSource)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{ padding: 30, textAlign: 'center' }}>

             </div>);
           else return <div />;
         }}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          style={{
            height: document.body.clientHeight-90,
            overflow: 'auto',
            margin: '0.1rem 0',
            border:'none',
          }}
          pageSize={10}
          scrollRenderAheadDistance={20}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          //useBodyScroll
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={20}
        />
      </div>);
    }
  }

function connectProdunctFunc({trade})
{
  return {trade};
}

export default connect(connectProdunctFunc)(TradeExpireDeal);
