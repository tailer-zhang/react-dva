import React , { Component } from 'react';
import { routerRedux } from 'dva/router';
import { ListView , WhiteSpace } from 'antd-mobile';
import EmptyResult from '../../../components/share/EmptyResult';

import styles from '../../../styles/trade/productNotify.less';

/*
 *
 **/
class ProductNofyList extends Component {
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

  goPdfPreview(rowData,sectionID,rowID){
    let { dispatch } = this.props;
    dispatch(routerRedux.push({pathname:'/salePreview',state:{notifyRow:rowData}}))
  }

  onEndReached(event) {
    let { xtProductModel , dispatch } = this.props;
    let { loadingMore , loading } = xtProductModel.notifyProduct;
    if(event==undefined||loadingMore){
      return;
    }else {
      dispatch({type:'xtProduct/getNotifyProductList',payload:{loadingMore:true}});
    }
  }

  renderList(rowData,sectionID,rowID){
    return(
      <div className={styles.queuediv} onClick={this.goPdfPreview.bind(this,rowData,sectionID,rowID)}>
        <div className={styles.prod}>
          <div className={styles.prodTitles}>
            <div className={styles.Itemleft}>
              <span>【{rowData.notiTitle}】</span>
              <span>
                  {
                    rowData.notiType=='a1'||rowData.notiType=='a2'||rowData.notiType=='a3'||rowData.notiType=='a4'||rowData.notiType=='a5'||rowData.notiType=='b1'?
                      ''
                      :rowData.notiCont
                  }
              </span>
           </div>
            <div className={styles.Itemright}>
                <img src={require('../../../image/icon/arrow_r.png')} className={styles.arrowLeft}/>
            </div>
          </div>
          <div className={styles.orderInfo}>
            {
              rowData.noticeContSwitch =='1'&&(rowData.notiType=='a1'||rowData.notiType=='a2'||rowData.notiType=='a3'||rowData.notiType=='a4'||rowData.notiType=='a5'||rowData.notiType=='b1')?
                <div className={styles.noticeContent}>{rowData.notiCont}</div>
                :''
            }
          </div>
        </div>
        <p className={styles.queueTime}>{rowData.notiSendTime}</p>
      </div>
    )
  }

  render(){
    let { notifyList , xtProductModel } = this.props;
    let { loadingMore , loading } = xtProductModel.notifyProduct;

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#efeff4',
        height:20,
      }}
      />
    );
    if(notifyList.length>0){
      return (<div style={{width: '100%',height:'100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(notifyList)}
          renderFooter={() => {
            if(loadingMore)
              return (<div style={{padding: 30, textAlign: 'center' }}>正在加载...</div>);
            else return (<div style={{padding: 30, textAlign: 'center' }}>没有更多了</div>);
          }}
          renderRow={this.renderList.bind(this)}
          renderSeparator={separator}
          className="am-list"
          style={{
            height: '100%',
            overflow: 'auto',
            border: '1px solid #ddd',
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

export default ProductNofyList;

