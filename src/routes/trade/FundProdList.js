import React,{Component} from 'react';
import Title from '../../components/product/Title';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
import { List, Radio, Flex,ListView } from 'antd-mobile';
import * as Commons from '../../utils/commonUtil';
import EmptyResult from '../../components/share/EmptyResult';

import proMarketStyles from '../../styles/product/MarketMonth.less';
import styles from '../../styles/customer/customerInquireList.less';

const FundProdList = (props) => {
  let titleProps = {title: '产品名称-产品类别'};

  return (
    <div className={proMarketStyles.wrap}>
      <div className={proMarketStyles.title}>
        <Title {...titleProps}/>
      </div>
			<SelectName {...props}/>
    </div>
  )
};

class SelectName extends React.Component{
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
    let {dispatch,tradeForm} = this.props;
    let {loadingMore} = tradeForm;
    if(event == undefined||loadingMore) return;
    else dispatch({
      type: 'tradeForm/fundCProdList',
      payload: {loadingMore: true}
    })
  }

  onChangeEvent(i,e) {
    let {dispatch,location} = this.props;
    let {formValue} = location.state;

    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
          targProdInfo: i.key,
          targProdInfoDesc:i.value
      }
    });

    dispatch(routerRedux.goBack());

  }

  renderRow(rowData, sectionID, rowID)
  {
    console.log(JSON.stringify(rowData) + "+++++++++++rowData++++++++++++++");
    let {location} = this.props;
    let {formValue} = location.state;
      return (
        <div key={rowID}
          style={{
            height: '100%',
            padding: '0 0.4rem',
            backgroundColor: 'white',
          }}>
          <div
            className={proMarketStyles.trade}
            onClick={this.onChangeEvent.bind(this,rowData)}
          >
           {
             rowData.value
           }
          </div>
        </div>
      );
  }

  render() {
    // 中间间隔
    let {tradeForm} = this.props;
    let list = tradeForm.targProdInfoDesc;

    console.log('list=========',list);

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loadingMore,loading} = tradeForm;
    if(list&&list.length>0) {
      return (<div style={{ width: '100%' }}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(list)}
          renderFooter={() =>
            {
              if(loadingMore) {
                <div style={{}}></div>
              } else{
                return <div />
              }
            }
          }
          renderRow={this.renderRow.bind(this)}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: document.body.clientHeight-10,
            paddingTop: '1.43rem',
          }}
          pageSize={15}
          scrollRenderAheadDistance={50}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll') }}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={10}
        />
      </div>)
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    } else {
      return <div className={styles.empty}><EmptyResult /></div>
    }
  }
};

function connectProduct({tradeForm}) {
  return {tradeForm}
}

export default connect(connectProduct)(FundProdList);
