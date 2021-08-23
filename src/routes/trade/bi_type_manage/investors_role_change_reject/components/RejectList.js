import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import rejectStyle from '../style/rejectStyle.less';

class RejectList extends React.Component {
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
    const { loadingMore, reach_bottom } = this.props.ChangeRejectModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return;
    dispatch({ type: 'ChangeRejectModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: '/itemDetail', state: { from: 'multi_rejectList', source: data, origin: 'multi_rejectList', id: data.id, dataSource: { reqSeq: data.reqNo } } }))

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
        className={rejectStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={rejectStyle.head}>
          <div>
            <p>{rowData.custName}</p><span><img className={rejectStyle.image1}  src={genderImage} alt="" /></span>
          </div>
          <div>
            <p>{rowData.confStatName}</p>
            <img className={rejectStyle.image2} src={require('../../../../../image/icon/arrow_r.png')} alt="" />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={rejectStyle.last}>
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
    const { reach_bottom } = this.props.ChangeRejectModel;
    if (reach_bottom) {
      return (
        <div style={{ textAlign: 'center' }}>没有更多了</div>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>上拉加载更多</div>
    )
  }

  render() {
    const { changeList } = this.props.ChangeRejectModel
    return (
      <ListView
        ref="lv"
        dataSource={this.state.ds.cloneWithRows(changeList)}
        renderRow={this.row}
        renderSeparator={this.separator}
        className="am-list"
        style={{
          height: document.body.clientHeight * 5/6,
          overflow: 'auto',
          // backgroundColor: 'pink',
        }}
        // contentContainerStyle={{ width: document.body.clientWidth }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => {
          console.log('scroll');
        }}
        onEndReachedThreshold={1000}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
      />);
  }
}

export default connect()(RejectList);
