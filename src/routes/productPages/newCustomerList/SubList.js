import React from 'react';
import {routerRedux} from 'dva/router';
import bankCardStyles from '../../../styles/customer/bankCard.less';
import { List,ListView } from 'antd-mobile';
import Dic from '../../../utils/dictionary';

export default class SubList extends React.Component{

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
    // const { filter } = location.state;
    const { loadingMore, reach_bottom } = this.props.dataSource;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'relativeChangedModel/fetchRemote', payload: { loadingMore: true } });
  }


  clickCell(rowData)
  {
    let {location,dispatch} = this.props;
    let {mode,selectResult,withOutGoBack} = location.state;
    if(mode === 'selectCustomer')
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
    let {selectCustomer} = location.state;
    const Item = List.Item;
    return (
      <div key={rowID}
           style={{
             padding: '0  0.4rem 0.6133333rem',
             backgroundColor: selectCustomer.custID==rowData.custNo?'#cccccc':'white',
           }}
           onClick={this.clickCell.bind(this, rowData)}
      >
        <div className="my-list">
          <div style={{paddingTop: '40px'}}>
            <div className={bankCardStyles.userInfo}>
              <div className={bankCardStyles.arrow}>
                <img src={require('../../../image/icon/arrow_r.png')}/>
              </div>
              <p className={bankCardStyles.userName}>{rowData.custName}<span>
                <img src={rowData.sex==1?require("../../../image/icon/male.png")
                  :(rowData.sex==2?require("../../../image/icon/female.png")
                    :require("../../../image/icon/blank.png"))}/>
                </span></p>
              <p className={bankCardStyles.userId}>
                {rowData.certTypeText}{rowData.certType!=undefined?'：':''}{rowData.certNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.dataSource;
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
    let {dispatch,location,dataSource} = this.props;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let { customerList } = dataSource;
    return (
      <div>
      <ListView
        ref="lv"
        dataSource={this.state.ds.cloneWithRows(customerList?customerList:[])}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={separator}
        className="am-list"
        style={{ height: document.body.clientHeight, overflow: 'auto', border: '1px solid #ddd', margin: '0.1rem 0' }}
        // contentContainerStyle={{ width: document.body.clientWidth }}
        pageSize={4}
        scrollRenderAheadDistance={20}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReachedThreshold={10}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
      />
    </div>);
  }
}
