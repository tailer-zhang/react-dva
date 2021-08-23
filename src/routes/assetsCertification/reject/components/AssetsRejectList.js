import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile'
import style from '../style/rejectListStyle.less'
import {routerRedux} from "dva/router";
@connect()
export default class AssetsRejectList extends Component {
  constructor() {
    super()
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
    const { loadingMore, reach_bottom } = this.props.AssetsRejectModel;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'AssetsRejectModel/fetchList', payload: { loadingMore: true } });
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#efeff4', height: 20 }} />
    )
  }

  jumpToReject(data) {
    const { dispatch } = this.props;
    const arr = data.prodIds.split(',')
    const arr1 = data.prodNames.split(',')
    let myArr = []
    for (let i = 0; i < arr.length; i++) {
      let temp = {
        prodId: parseInt(arr[i]),
        prodName: arr1[i],
        mgrSysCode:data.mgrSysCode,
      }
      myArr.push(temp)
    }
    this.props.dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        checkArr: myArr,
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        value: data.managerName,
        key: data.mgrCode,
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        format: data.format,
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        remark: data.remark,
      },
    });
    dispatch({
      type: 'formStorage/fetchFormValue',
      payload: {
        issueDate: data.issueDate,
      },
    });
    dispatch(routerRedux.push({ pathname: '/assetsApplyReject', state: data }))
  }

  row = (data, sectionId, rowId) => {
    return (
      <div className={style.container} onClick={this.jumpToReject.bind(this, data)}>
        <div className={style.header}>
          <div>{data.custName}</div>
          <div><p>{data.chkStatName}</p></div>
          <div style={{ clear: 'both' }} />
        </div>
        <div className={style.separator} />
        <div className={style.title}>
          {data.prodNames}
        </div>
        <div className={style.mid}>
          {data.managerName}
        </div>
        <div style={{ clear: 'both' }} />
        <div className={style.last}>
          <div>{data.createTime}</div>
          <div>{data.formatName}</div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    )
  }

  renderFooter= () => {
    const { reach_bottom } = this.props.AssetsRejectModel;
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
    const { assetsRejectList } = this.props.AssetsRejectModel
    return (
      <ListView
        ref="lv"
        dataSource={this.state.ds.cloneWithRows(assetsRejectList)}
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
    )
  }
}
