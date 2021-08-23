import React from 'react';
import { ListView } from 'antd-mobile';
import styles from '../../styles/customer/customerInquireList.less';
import Dic from '../../utils/dictionary';
import {Link,routerRedux} from 'dva/router';
import EmptyResult from '../../components/share/EmptyResult';

export default class CustomerWaitList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
       ds:ds,
       isLoading:false
    };
  }

  onEndReached(event) {
    let {dispatch,data} = this.props;
    let {loadingMore} = data;
    if(event==undefined||loadingMore) return;
    else dispatch({
      type: 'customer/fetchWait',
      payload: {loadingMore:true}
    });
  }

  clickCell(rowData, sectionID, rowID, e)
  {
    // e.preventDefault();
    let {dispatch} = this.props;
    if(rowData.custClass == '01') {
      dispatch(routerRedux.push({
        pathname: '/removeChange',
        state: {
          perCust: rowData
        }
      }));
    } else{
      dispatch(routerRedux.push({
        pathname: '/orgCusWaitChange',
        state: {
          orgCust: rowData
            // custID: rowData.custID,
            // custClass: rowData.custClass,
            // undoType: rowData.undoType
        }
      }));
    }
  }
  renderRow(rowData, sectionID, rowID)
  {
      const titleProps = {title: '客户代办'};
      return (
        <div key={rowID}
          style={{
            padding: '0  0.4rem 0.6133333rem',
            backgroundColor: 'white',
          }}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
        >
          <div className={styles.left}>
            <h3>{rowData.custName}</h3>
            <img src={rowData.custClass==='01'?
            (rowData.sex==='01')?require('../../image/icon/male.png')
            :require('../../image/icon/female.png')
            :require('../../image/icon/blank.png')} />
          </div>
          <div  className={styles.right}>
            <p>
              {Dic.fetchDicValue('customerFilter4',rowData.custType)}
            </p>
            <p>
              {Dic.fetchDicValue('customerFilter3',rowData.curStat)}
            </p>
          </div>
        </div>
      );
  }

  render() {
    let {dispatch,data} = this.props;
    let {customerWaitList,loading,loadingMore} = data;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );

    if(customerWaitList&&customerWaitList.length>0) {
      return (<div style={{ width: '100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(customerWaitList?customerWaitList:[])}
          renderFooter={() => {
            if(loadingMore)
            return <div style={{ padding: 30, textAlign: 'center' }}></div>
            else return <div style={{height:'30px'}}/>
          }}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: document.body.clientHeight,
            overflow: 'auto',
          }}
          pageSize={10}
          scrollRenderAheadDistance={50}
          scrollEventThrottle={1000}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={1000}
        />
      </div>);
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    }
    else {
      return <div className={styles.empty}><EmptyResult /></div>
    }
  }
}
