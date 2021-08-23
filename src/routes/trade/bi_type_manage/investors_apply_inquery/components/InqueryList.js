import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import inqueryListStyle from '../style/inqueryList.less';

class InqueryList extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      ds: ds,
      isLoading: false,
    };
  }

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.ChangeApplyModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'ChangeApplyModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: '/itemDetail', state: { from: 'inquiry_list', source: data, origin: 'inquiry_list', id: data.id, dataSource: { reqSeq: data.reqNo } } }))
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#efeff4', height: 1 }} />
    )
  }

  row=(rowData, sectionID, rowID) => {
    let genderImage
    if (rowData.sex === '女') {
      genderImage = require('../../../../../image/icon/female.png')
    } else if (rowData.sex === '男') {
      genderImage = require('../../../../../image/icon/male.png')
    }
    return (
      <div
        key={rowID}
        className={inqueryListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={inqueryListStyle.head}>
          <div>
            <p>{rowData.custName}</p><span><img src={genderImage} className={inqueryListStyle.image1} alt="" /></span>
          </div>
          <div>
            <p>{rowData.confStatName}</p>
            <img className={inqueryListStyle.image2} src={require('../../../../../image/icon/arrow_r.png')} alt="" />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={inqueryListStyle.last}>
          <div>
            <p>{rowData.tradCodeName}</p>
          </div>
          <div>
            <p>{rowData.saleOrgName}</p>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.ChangeApplyModel;
    if (reach_bottom) {
      return (
        <div>没有更多了</div>
      )
    }
    return (
      <div>上拉加载更多</div>
    )
  }


  render() {
    const { applyforChangeList } = this.props.ChangeApplyModel
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(applyforChangeList)}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', border: '1px solid #ddd', margin: '0.1rem 0' }}
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

export default connect()(InqueryList);
