import React , { Component , PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { ListView , WhiteSpace } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

import styles from '../../styles/trade/queueOrder.less';

/*
 *排队预约情况组件
 **/
class QueueList extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
       ds:ds,
       isLoading:false
    };
  }

  /*
   *排队列表详情
   **/
  goListDetail(rowData,sectionID,rowID){
    let { dispatch } = this.props;
    dispatch(routerRedux.push({pathname:'/queueOrderDetail',state:{'id': rowData.id}}))
  }

  onEndReached(event) {
    let { queueModel , dispatch } = this.props;
    let { loadingMore , loading} = queueModel;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'queueModel/fetchList',payload:{loadingMore:true}});
    }
  }

  renderList(rowData,sectionID,rowID){
    let limit;
    if (rowData.resvAmt !== undefined){
      if (rowData.resvAmt<10000){
        limit = rowData.resvAmt
      }else {
        limit = rowData.resvAmt/10000
      }
    }else {
      limit='--'
    }
    return(
      <div className={styles.queuediv} onClick={this.goListDetail.bind(this,rowData,sectionID,rowID)}>
        <div className={styles.prod}>
          <p>{rowData.prodName}</p>
          <div className={styles.showImage}>
            {rowData.topStat === '1'?<img className={styles.vipImage} src={require('../../image/trade/vip_first.png')}/>: null}
            {(limit==='--'||limit<1000)?null:<img className={styles.vipImage} src={require('../../image/trade/vip_second.png')}/>}
            {rowData.diamondStat === '1'?<img className={styles.vipImage} src={require('../../image/trade/vip_third.png')}/>: null}
          </div>
          <div className={styles.orderInfo}>
            <section className={styles.textLeft}>
              <p className={styles.resvAmt}>{limit}<i>{limit==='--'?'':'万'}</i></p>
             <span>剩余额度(人民币)</span>
            </section>
            <section>
              <p>{rowData.ranking===undefined?'请等待': (rowData.queueNum)}</p>
             <span>前面排队人数</span>
            </section>
            <section className={styles.textRight}>
              <p>{rowData.custName}</p>
             <span>客户名称</span>
            </section>
          </div>
        </div>
        <p className={styles.queueTime}>{`排队开始时间：${rowData.updateTime}`}</p>
      </div>
    )
  }

  render(){
    let { dispatch , queueOrderList , queueModel } = this.props;
    let { loadingMore , loading } = queueModel;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height:20,
      }}
      />
    );
    if(queueOrderList.length>0){
      return (<div style={{width: '100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(queueOrderList)}
          renderFooter={() => {
           if(loadingMore)
             return (<div style={{padding: 30, textAlign: 'center' }}> </div>);
           else return <div style={{display:'none'}} ></div>;
         }}
          renderRow={this.renderList.bind(this)}
          renderSeparator={separator}
          className="am-list"
          style={{
            height: document.body.clientHeight * 5/6,
            overflow: 'auto',
            border: '1px solid #ddd',
            //margin: '0.1rem 0',
          }}
          pageSize={10}
          scrollRenderAheadDistance={1000}
          scrollEventThrottle={50}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={500}
        />
      </div>);
    }else if (loading) {
      return(<div style={{backgroundColor:'#efeff4'}}></div>)
    }
    return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>)

  }
}

export default QueueList;
