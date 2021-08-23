import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { ListView, Button } from 'antd-mobile';
import investorListStyle from '../style/investorListStyle.less';

class InvestorsList extends React.Component {
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

  componentDidMount() {
  }

  onEndReached= () => {
    const { dispatch } = this.props;
    const { loadingMore, reach_bottom } = this.props.investorModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return;
    dispatch({ type: 'InvestorSearchModel/fetchList', payload: { loadingMore: true } });
  }

  jumpToDetail(data) {
    this.props.dispatch(routerRedux.push({ pathname: 'investorItemDetail', state: { dataSource: data } }))
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
        className={investorListStyle.list}
        onClick={this.jumpToDetail.bind(this, rowData)}
      >
        <div className={investorListStyle.head}>
          <div>
            <p>{rowData.custName}</p><span><img className={investorListStyle.image1} src={genderImage} alt=""/></span>
          </div>
          <div>
            <img className={investorListStyle.image2} src={require('../../../../../image/icon/arrow_r.png')} alt="" />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={investorListStyle.mid}>
          <div>
            <p>{rowData.inveType}</p>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={investorListStyle.last}>
          <div>
            <p>{rowData.saleOrg}</p>
          </div>
          <div>
            {rowData.inveType === '专业投资者' ? <p>{rowData.begDate}至{rowData.expiDate}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.investorModel;
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
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.investorList)}
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

export default connect()(InvestorsList);
