import React from 'react';
import {routerRedux} from 'dva/router';
import { ListView } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import modifyStyle from '../../styles/customer/cusModifyStyle.less';

export default class CusSelectList extends React.Component{
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
    const { loadingMore, reach_bottom } = this.props.dataSource;
    if (loadingMore) {
      return;
    }
    if (reach_bottom) return
    dispatch({ type: 'bank/fetchModifyList', payload: { loadingMore: true } });
  }

  clickCell(rowData, sectionID, rowID)
  {
    let {dispatch,location, from} = this.props;
      dispatch(routerRedux.push({
        pathname: from==='change' ? '/bankAccountCnt' :'/custPositionList',
        state: {data: rowData}
      }));
  }

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{ borderBottom: '1px solid #dcdcdc'}} />
    )
  }

  renderRow=(rowData, sectionID, rowID)=> {
    return (
      <div key={rowID}
           style={{
             padding: '0.38667rem 0.26667rem',
             backgroundColor: 'white',
           }}
           onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
      >
        <div className="my-list">
          <div>
            <div className={modifyStyle.userInfo}>
              <div className={modifyStyle.arrow}>
                <img src={require('../../image/icon/arrow_r.png')}/>
              </div>
              <div className={modifyStyle.head_title}>
                <p className={modifyStyle.userName}>{rowData.custName}&nbsp;</p>
                {rowData.sex=='1' ? <img src={require("../../image/icon/male.png")} /> : rowData.sex=='2' ? <img src={require("../../image/icon/female.png")} /> : null }
              </div>
              <p className={modifyStyle.userId}>
                {Dic.fetchDicValue('bankCertType',rowData.certType)}&nbsp;|&nbsp;{rowData.certNo}
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
        <div style={{display: 'flex', justifyContent: 'center'}}>没有更多了</div>
      )
    }
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>上拉加载更多</div>
    )
  }

  render() {
    return (
      <div >
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource.modifyList)}
          renderRow={this.renderRow}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight, overflow: 'auto'}}
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
};
