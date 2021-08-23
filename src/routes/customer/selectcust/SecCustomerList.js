import React,{PropTypes,Component} from 'react';
import {routerRedux} from 'dva/router';
import bankCardStyles from '../../../styles/customer/bankCard.less';
import { List,ListView, Badge } from 'antd-mobile';
import Dic from '../../../utils/dictionary';

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
    let {dataSource,dispatch,location} = this.props;
    let {loadingMore} = dataSource, {mode,filter} = location.state;
    if(!event||loadingMore)
       return;
    // if(mode=='appointSelectCustomer'){
    dispatch({type:'relativeChangedModel/fetchRemote',payload:{loadingMore:true,...filter}});
    // } else {
    //   dispatch({type:'customer/fetchRemote',payload:{loadingMore:true}});
    // }
  }


  clickCell(rowData, sectionID, rowID,e)
  {
    // let {dispatch,location} = this.props;
    //   e.preventDefault();
        // let {dispatch,location} = this.props;
        let {location,dispatch} = this.props;
        let {mode,selectResult,withOutGoBack} = location.state;
        if(mode=='selectCustomer')
        {
          if(selectResult)
            selectResult(rowData);
          if(!withOutGoBack)
            dispatch(routerRedux.goBack());
        }
        //  else if(mode=='appointSelectCustomer'){
        //   if(selectResult)
        //     selectResult(rowData);
        //   dispatch(routerRedux.goBack());
        //   dispatch({type:'customer/fetch', payload:{custName:''}});
        // }
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
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
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
                  {rowData.custClass=='01'?Dic.fetchDicValue('certTypes',rowData.certType):Dic.fetchDicValue('orgCertType',rowData.certType)}{rowData.certType!=undefined?'：':''}{rowData.certNo}
                </p>
              </div>
           </div>
          </div>
        </div>
      );
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
    let {customerList,loading, loadingMore} = dataSource;
    return (<div style={{ width: '100%',position:'absolute',left:'0',right:'0',top:'1.333rem',bottom:'0'}}>
      <ListView
        dataSource={this.state.ds.cloneWithRows(customerList?customerList:[])}
        renderFooter={() => {
					if(loadingMore)
						return (<div style={{ padding: 0, textAlign: 'center' }}>

						</div>);
					else return <div />;
				}}
        style={{
          // height: document.body.clientHeight,
          height:'100%',
          overflow: 'auto',
        }}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={separator}
        className="fortest"
        pageSize={10}
        scrollRenderAheadDistance={30}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={30}
      />
    </div>);
  }



};
