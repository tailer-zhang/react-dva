import React from 'react';
import {routerRedux} from 'dva/router';
import getNameOfBank from '../../utils/Bank'
import positionStyle from '../../styles/customer/positionStyle.less';
import { ListView } from 'antd-mobile';

export default class SelectableList extends React.Component{
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

  separator=(sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{height: '20px',backgroundColor: '#F5F5F5'}} />
    )
  }

  clickCell(rowData, sectionID, rowID)
  {
     let {dispatch} = this.props
    dispatch({
      type:'formStorage/fetch',
      payload:{
        newBank:{
          bankName: rowData.bankName || rowData.value.split("(")[0],
          cardNo: rowData.cardNo || rowData.key
        }
      }
    });
     history.go(-1)
  }

  renderRow=(rowData, sectionID, rowID)=>{
    let where = rowData.bankName ||  rowData.value.split("(")[0]
    let bankName = rowData.bankName ||  rowData.value.split("(")[0]
    console.log('bankName',bankName)
    let {location} = this.props
    let {transInfo,addBank} = location.state;
    let checkName = location.state.newBankData&&location.state.newBankData.bankName ? location.state.newBankData.bankName : ''
    return (
      <div key={rowID} className={positionStyle.content1} onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}>
        <div className={positionStyle.firstContent}>
          <div className={positionStyle.contentHeader}>
            {rowData.bankAbbr ? <img src={require('../../bank/' + rowData.bankAbbr + '.png')}/> : null}
            <p style={{paddingLeft: rowData.bankAbbr ? '10px' : '' }}>{bankName}</p>
          </div>
          <p>{rowData.cardNo || rowData.key }</p>
          {
            transInfo == '0'?null: <p style={{paddingTop: '0.25333rem'}}>{where}</p>
          }
        </div>
        <div className={positionStyle.lastContent}>
          {checkName == bankName ? <img src={require('../../image/customer/checked.png')}/>: null}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{backgroundColor: '#F5F5F5'}}>
        <ListView
          ref="lv"
          dataSource={this.state.ds.cloneWithRows(this.props.dataSource.BankCustList)}
          renderRow={this.renderRow}
          renderSeparator={this.separator}
          className="am-list"
          style={{ height: document.body.clientHeight, overflow: 'auto'}}
          pageSize={4}
          scrollRenderAheadDistance={20}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReachedThreshold={10}
        />
      </div>);
  }
};
