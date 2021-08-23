import React from 'react';
import { ListView } from 'antd-mobile';
import styles from '../../styles/customer/customerInquireList.less';
import {Link,routerRedux} from 'dva/router';
import Dic from '../../utils/dictionary';
import EmptyResult from '../../components/share/EmptyResult';


class CustomerInquireList extends React.Component {
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
    let {customer,dispatch} = this.props;
    let {loadingMore} = customer;
    if(event==undefined||loadingMore)
       return;
    dispatch({type:'customer/fetchRemote',payload:{loadingMore:true}});
  }

  clickCell(rowData, sectionID, rowID,e)
  {
    // e.preventDefault();
    let {dispatch} = this.props;
    if(rowData.custType=='02'&&rowData.curStat=='01')    //潜在以及正常状态
    {
      if(rowData.custClass=='01')
         dispatch(routerRedux.push({pathname:'/personalLatentCustomerEdit',
         state:{
           customer:rowData,
           mode:'edit'
         }}));
      else dispatch(routerRedux.push({pathname:'/orgCusAddMore',
       state:{
         orgCust:rowData,
         mode:'edit'
       }}));
    }
    else if(rowData.custClass=='01')      //个人客户详情
    {
      let custType = rowData.custClass;
      console.log('rowData.custType',rowData.custType);
      if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
      console.log('custType',custType);
      dispatch(routerRedux.push({pathname:'/personalCusDetail',
      state:{
        detail: {custID: rowData.custID,rejectFlag: '1'},
        hold: {certType: rowData.certType,custType: custType=='1'?'1':'0',certNo: rowData.certCode},//custType:"1",certType:"01",certNo:"1234567TTT"
        progress: 'perCustomer',
        custSource: rowData.custSource
      }}));
    }
    else if(rowData.custClass=='02')  //机构客户详情
    {
      let custType = rowData.custClass;
      console.log('rowData.custType',rowData.custType);
      if(custType.charAt(0) === '0') custType = custType.replace(/^0/,'');
      console.log('custType',custType);
      dispatch(routerRedux.push({
        pathname: '/orgCusDetail',
        state: {
          detail: {rejectFlag: '1',busiID: rowData.custID},
          hold: {certType: rowData.certType,custType: custType=='1'?'1':'0',certNo: rowData.certCode}  //custType:"1",certType:"01",certNo:"1234567TTT"
        }
      }));
    }
  }

  renderRow(rowData, sectionID, rowID)
  {
      return (
        <div key={rowID}
          style={{
            paddingLeft:'0.4rem',
            backgroundColor: 'white',
          }}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
        >
          <div className={styles.custList}>
            <div className={styles.left}>
              <div>
                <h3>{rowData.custName}</h3>
                <img src={rowData.custClass==='01'?
                (rowData.sex==='01')?require('../../image/icon/male.png')
                :require('../../image/icon/female.png')
                :require('../../image/icon/blank.png')} />
              </div>
              <p>
                {
                  Dic.fetchDicValue('customerFilter3',rowData.curStat)
                }
              </p>
            </div>
            <div  className={styles.right}>
            <p>
              {
                Dic.fetchDicValue('customerFilter4',rowData.custType)
              }
            </p>
            <p>
              {rowData.custSource}
            </p>

            </div>
          </div>
        </div>
      );
  }

  render() {
    let {dispatch,customer} = this.props;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        // borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loading, loadingMore} = customer;
    let customerList = customer.customerList;

    if(customerList.length>0) {
      return (<div className={styles.listShow}>
          <ListView
            dataSource={this.state.ds.cloneWithRows(customerList)}
            renderFooter={() => {
              if(loadingMore)
                return (<div style={{}}></div>);
              else return <div />;
            }}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={separator}
            className="fortest"
            style={{height: document.body.clientHeight-10,paddingTop: '2.66rem'}}
            pageSize={10}
            scrollRenderAheadDistance={50}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={10}
          />
        </div>);
      } else if (loading) {
        return <div style={{backgroundColor:'#f7f7f7'}}></div>
      } else {
        return <div className={styles.empty}><EmptyResult /></div>
      }
  }
}


export default CustomerInquireList;
