import React from 'react';
import {routerRedux} from 'dva/router';
import bankCardStyles from '../../styles/customer/bankCard.less';
import { List,ListView } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import styles from '../../styles/product/emptyResult.less';

const EmptyResult = (props) => {
  return (
    <div className={styles.wrap} style={props.style}>
      <div className={styles.imgWrap}>
        <img src={require("../../image/icon/cry.png")} className={styles.imgSize}/>
      </div>
      <p className={styles.title1}>暂无数据</p>
    </div>
  );
};


export default class DealSublist extends React.Component{

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

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.dealModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'dealModel/fetchRemote', payload: { loadingMore: true } });
  }


  clickCell(rowData)
  {
    let {location,dispatch} = this.props;
    let {mode,selectResult,withOutGoBack} = location.state;
    if(mode === 'deallist')
    {
      if(selectResult)
        selectResult(rowData);
      if(!withOutGoBack)
        dispatch(routerRedux.goBack());
    }
  }

  renderRow(rowData, sectionID, rowID)
  {
    let {location} = this.props;
    let {selected} = location.state;
    let ratio = rowData.renewRatio?rowData.renewRatio: '0'
    return (
      <div key={rowID}
           style={{
             padding: '0.1rem  0.4rem 0.2rem',
             fontSize: '0.35rem',
             color: rowData.renewRatio > 100 ? '#cccccc' :'#000000',
             pointerEvents: rowData.renewRatio > 100 ? 'none' : 'auto'
           }}
           onClick={this.clickCell.bind(this, rowData)}
      >
        <div>
          <div style={{paddingTop: '40px'}}>
            <div className={bankCardStyles.userInfo}>
              {rowData.prodName + '|' + rowData.endDate  + '|' + rowData.reqAmt + '|' + ratio  + '%'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.dealModel;
    if (reach_bottom) {
      return (
        <div style={{textAlign: 'center'}}>没有更多了</div>
      )
    }
    return (
      <div style={{textAlign: 'center'}}>上拉加载更多</div>
    )
  }

  render() {
    let {dispatch,location,dealModel} = this.props;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let { dealList } = dealModel;
    if(dealList&&dealList.length > 0){
      return (
        <div>
          <ListView
            ref="lv"
            dataSource={this.state.ds.cloneWithRows(dealList?dealList:[])}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={separator}
            className="am-list"
            style={{ height: document.body.clientHeight, overflow: 'auto', margin: '0.1rem 0' }}
            pageSize={4}
            scrollRenderAheadDistance={20}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            onEndReachedThreshold={10}
            // onEndReached={this.onEndReached}
            // renderFooter={this.renderFooter}
          />
        </div>);
    }else {
      return  (<EmptyResult style={{height:'90%'}}/>);
    }

  }
}
