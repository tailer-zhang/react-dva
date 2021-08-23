import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import changeListStyle from '../style/changeListStyle.less';

class ApplyforChangeList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.applyForChangeModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'ApplyForChangeModel/fetchList', payload: { loadingMore: true } });
  }


  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: 'role_change', dataSource: data } }))
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
        className={changeListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={changeListStyle.head}>
          <div>
            <p>{rowData.custName}</p><span><img className={changeListStyle.image1} src={genderImage} alt="" /></span>
          </div>
          <div>
            <img className={changeListStyle.image2} src={require('../../../../../image/icon/arrow_r.png')} alt="" />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={changeListStyle.last}>
          <div>
            <p>{rowData.certTypeText}:</p>
          </div>
          <div>
            <p>&nbsp;{rowData.certNo}</p>
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.applyForChangeModel;
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
    return (
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource)}
          renderRow={this.row}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight * 5 / 6, overflow: 'auto', width: '100%', overflowX: 'hidden' }}
          pageSize={10}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={1000}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
      );
  }
}

export default connect()(ApplyforChangeList);
