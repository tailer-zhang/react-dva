import React,{PropTypes,Component} from 'react';
import {routerRedux} from 'dva/router';
import bankCardStyles from '../../styles/customer/bankCard.less';
import { List,ListView, Badge } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import EmptyResult from '../../components/share/EmptyResult';
import { SearchBar } from 'antd-mobile';

export default class SecCustomerList extends React.Component{

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

  onEndReached(event) {
    let {dataSource,dispatch} = this.props;
    let {loadingMore} = dataSource;
    if(event==undefined||loadingMore) return;
    dispatch({type:'bank/bankInquire',payload:{loadingMore:true}})
  }

  clickCell(rowData, sectionID, rowID)
  {
    let {dispatch,location} = this.props;
    if(location.query&&location.query.mode=='change') {
      dispatch(routerRedux.push({
        pathname: '/bankChange',
        state: {data: rowData}
      }));
    } else{
      dispatch(routerRedux.push({
        pathname: '/bankCardManage',
        state: {
          custId: rowData.id,
          filterArgs:{
            cardClass: 0,
          },
          data: rowData
        }
      }))
    }
  }

  // searchEvent(value) {
  //   let {dispatch} = this.props;
  //   dispatch({
  //     type: 'bank/bankInquire',
  //     payload: {custName: value}
  //   })
  // }
  //
  // clear() {
  //   let {dispatch} = this.props;
  //   dispatch({
  //     type: 'bank/bankInquire',
  //     payload: {custName: ''}
  //   })
  // }

  renderRow(rowData, sectionID, rowID)
  {
      const Item = List.Item;
      return (
        <div key={rowID} className={bankCardStyles.outContent}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
        >
          <div className="my-list">
           <div>
              <div className={bankCardStyles.userInfo}>
                <div className={bankCardStyles.arrow}>
                  <img src={require('../../image/icon/arrow_r.png')}/>
                </div>
                <div className={bankCardStyles.head_title}>
                  <p className={bankCardStyles.userName}>{rowData.custName}&nbsp;</p>
                  <img src={rowData.sex==1?require("../../image/icon/male.png")
                      :(rowData.sex==2?require("../../image/icon/female.png")
                        :require("../../image/icon/blank.png"))}/>
                </div>
                <p className={bankCardStyles.userId}>
                  {Dic.fetchDicValue('bankCertType',rowData.certType)}&nbsp;|&nbsp;{rowData.certNo}
                </p>
              </div>
           </div>
          </div>
        </div>
      );
  }

  render() {
    let {dispatch,location,dataSource} = this.props;
    // let BankInquList = dataSource.BankInquList;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loadingMore,loading,BankInquList} = dataSource;

    if(BankInquList&&BankInquList.length>0) {
      return (<div style={{ width: '100%',height:'100%',zIndex: '80' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(BankInquList?BankInquList:[])}
          renderFooter={() =>{
            if(loadingMore) {
              <div style={{padding:0}}></div>
            } else return <div />;
          }
          }
          renderRow={this.renderRow.bind(this)}
          renderSeparator={separator}
          className="fortest"
          style={{
            // height: document.body.clientHeight,
            height:'100%',
            overflow: 'auto',
          }}
          pageSize={10}
          scrollRenderAheadDistance={50}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={30}
        />
      </div>)
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    }
    else {
      return <div className={bankCardStyles.empty}><EmptyResult /></div>
    }
  }
};


// renderHeader={()=><div className={bankCardStyles.secSearch}>
//   <SearchBar style={{backgroundColor:'#f7f7f8'}}
//   placeholder="客户名称"
//   onSubmit={this.searchEvent.bind(this)}
//   onClear={this.clear.bind(this)}
//  />
// </div>}


// <List className="my-list">
//  <Item style={{height:'177px'}} arrow="horizontal" onClick={() =>{
//    if(location.query&&location.query.mode=='change') {
//      dispatch(routerRedux.push('/BankChange'));
//    } else{
//      dispatch(routerRedux.push('/BankCardManage'))
//    }
//  }}>
//     <div className={bankCardStyles.userInfo}>
//       <p className={bankCardStyles.userName}>海银<span><img src={require("../../image/icon/female.png")}/></span> </p>
//       <p className={bankCardStyles.userId}>身份证：4512624512231551</p>
//     </div>
//  </Item>
// </List>
