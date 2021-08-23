import React,{Component,PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import TextStyles from '../../styles/customer/bankCard.less';
import Dic from '../../utils/dictionary';
import {ListView,Button,WhiteSpace,Modal,Toast} from 'antd-mobile';

class SelectBankCardNoList extends React.Component{

  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
       ds:ds,
       isLoading:false,
       isSubmit:0,
    };
  }

  onEndReached(event) {
    let {dispatch,bank,location} = this.props;
    let {custId,filterArgs} = location.state;
    let {loadingMore} = bank;
    if(event==undefined||loadingMore)
       return;
    dispatch({type:'bank/bankCardInquire',payload:{...filterArgs,custId:custId,loadingMore:true}});
  }

  clickCell(rowData, sectionID, rowID,e)
  {
    // let {dispatch,location} = this.props;
    //   e.preventDefault();
        // let {dispatch,location} = this.props;
        let {location,dispatch} = this.props;
        let {mode} = location.state;
        if(mode=='selectCustomerAccount')
        {
          dispatch({
            type:'formStorage/fetchNewState',
            payload:{
              key:'remitFormValue',
              newValue:{
                lendCardNo:rowData.cardNo,
                bankName:rowData.bankName
              }
            }
          });
          dispatch(routerRedux.goBack());
        }
  }

  renderRow(rowData, sectionID, rowID)
  {
    const {dispatch,bank} = this.props;
    let {dataSource} = this.state;
    let data = bank.BankStart;
    if(data==undefined) data={};
      return (
        <div key={rowID}
          style={{
            backgroundColor: 'white',
          }}
          onClick={this.clickCell.bind(this,rowData, sectionID, rowID)}
        >
          <div className={TextStyles.selectedBankBox}>
            <div className={TextStyles.cardInfo}>
              <section className={TextStyles.cardInfoUp}>
                <div className={TextStyles.qyLift}>
                  <p className={TextStyles.cardName}>{rowData.bankName}</p>
                  <p className={TextStyles.cardNum}>{rowData.cardNo}</p>
                </div>
                <div>
                    <p className={TextStyles.qyRight}>{Dic.fetchDicValue('recStat',rowData.recStat)}</p>
                </div>
              </section>
              <section className={TextStyles.cardInfoDown}>
                <p>{rowData.acctName}</p>
                <p>{Dic.fetchDicValue('bankCertType',rowData.certType)}
                ({rowData.certNo})</p>
              </section>
            </div>
          </div>
          <p style={{height:'30px',backgroundColor:'#efeff4'}}></p>
        </div>
      );
  }

  render() {
    let {dispatch,location,bank,dataSource} = this.props;;
    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );


      // {this.state.isLoading ? '加载中...' : ''}
    let {loading, loadingMore} = bank;
    return (<div style={{ width: '100%' }}>
      <ListView
        dataSource={this.state.ds.cloneWithRows(dataSource)}
        renderFooter={() => {
          if(loadingMore)
            return (<div style={{}}></div>);
          else return <div />;
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
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={5}
      />
    </div>);
  }
};

function connectBankStart({bank}) {
  return {bank}
}

export default connect(connectBankStart)(SelectBankCardNoList);
