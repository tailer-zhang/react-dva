import React,{Component,PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import TextStyles from '../../styles/customer/bankCard.less';
import maintainStyle from '../../styles/customer/bankCardMaintain.less';
import Dic from '../../utils/dictionary';
import {ListView,Modal,Toast} from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

class BankCardManageList extends React.Component{
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state= {
       ds:ds,
       isLoading:false,
       isSubmit:0,
       dataSource:[]
    };
  }

  componentWillReceiveProps(nextProps)
  {
    let {dataSource} = nextProps;
    this.setState({
      dataSource:dataSource?dataSource:[]
    });
  }

  onEndReached(event) {
    let {dispatch,bank,location} = this.props;
    let {loadingMore} = bank;
    let {custId,filterArgs} = location.state;
    if(event==undefined||loadingMore)
       return;
    dispatch({type:'bank/bankCardInquire',payload:{...filterArgs,custId:custId,loadingMore:true}});
  }

  clickCell(rowData, sectionID, rowID,e)
  {
    // let {dispatch,location} = this.props;
      // e.preventDefault();
        // let {dispatch,location} = this.props;
        // let {location,dispatch} = this.props;
        // let {mode} = location.state;
        // if(mode=='selectCustomerAccount')
        // {
        //   dispatch({
        //     type:'formStorage/fetchNewState',
        //     payload:{
        //       key:'remitFormValue',
        //       newValue:{
        //         lendCardNo:rowData.cardNo,
        //         bankName:rowData.bankName
        //       }
        //     }
        //   });
        //   dispatch(routerRedux.goBack());
        // }
  }

  clickBtn1(getData){
    let {rowData, rowID} = getData
    let { dispatch,bank } = this.props;
    let data = bank.BankStart;
    let {dataSource} = this.state;
    if(data==undefined) data={};
    console.log('bank是什么', bank)
    console.log('rowData是什么', rowData)
    if(rowData.recStat == '2'){
        Modal.alert('启用', '确定启用吗?',
          [
            { text: '取消', onPress: () => {
              }},
            { text: '确定', onPress: () => {
                if(rowData.recStat =='1') {
                  Toast.info('账户已启用!', 2);
                  return;
                }
                else {
                  Toast.loading('提交中...',2,undefined,true);
                  dispatch({
                    type: 'bank/bankStartDisable',
                    payload: {
                      params: {
                        custId: rowData.custId,
                        id: rowData.id,
                        recStat: 1,
                        version: data.id!==rowData.id?rowData.version:data.version,
                      },
                      backMethord:(data)=>{
                        let changedRowData = dataSource[rowID];
                        Toast.hide();
                        if(data&&data.code=='00') {
                          rowData.recStat='1';
                          changedRowData.version = data.model.version;
                          dataSource[rowID] = changedRowData;
                          this.setState({
                            dataSource:dataSource
                          });
                        }
                      }
                    }
                  });
                }
              },
              style: { fontWeight: 'bold' }
            },
          ])
    }else if(rowData.recStat == '1'){
      Modal.alert('停用', '确定停用吗?',[
        { text: '取消', onPress: () => {
            //Toast.loading('取消中...',2,undefined,true);
          }},
        { text: '确定', onPress: () => {
            if(rowData.recStat=='2') {
              Toast.info('账户已停用!', 2);
              return;
            }
            else {
              Toast.loading('提交中...',2,undefined,true);
              dispatch({
                type: 'bank/bankStartDisable',
                payload: {
                  params: {
                    custId: rowData.custId,
                    id: rowData.id,
                    recStat: 2,
                    version: data.id!==rowData.id?rowData.version:data.version
                  },
                  backMethord:(data)=>{
                    Toast.hide();
                    let changedRowData = dataSource[rowID];
                    if(data&&data.code=='00')
                    {
                      rowData.recStat='2';
                      changedRowData.version = data.model.version;
                      dataSource[rowID] = changedRowData;
                      this.setState({
                        dataSource:dataSource
                      });
                    }
                  }
                }
              });
            }

          },
          style: { fontWeight: 'bold' }
        },
      ])
    }else {

    }
  }

  clickBtn2(rowData){
    let { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/newBankId',
      state: {
        data: rowData,
        mode: 'change'
      }
    }))
  }

  renderRow(rowData, sectionID, rowID)
  {
    const {dispatch,bank, location} = this.props;
    let gender = location.state&&location.state.data ? location.state.data.sex : ''
    let {dataSource} = this.state;
    let data = bank.BankStart;
    if(data==undefined) data={};
    return (
      <div key={rowID} className={maintainStyle.content}>
        <div className={maintainStyle.contentHeader}>
          <div className={maintainStyle.headerFirst}>
            <p className={maintainStyle.firstP}>{rowData.acctName}</p>
            <img src={gender==1?require("../../image/icon/male.png")
              :(gender==2?require("../../image/icon/female.png")
                :require("../../image/icon/blank.png"))}/>
          </div>
          <p className={maintainStyle.headerNormal}>开户证件：{Dic.fetchDicValue('bankCertType',rowData.certType)}&nbsp;|&nbsp;({rowData.certNo})</p>
          <p className={maintainStyle.headerNormal}>银行卡号：{rowData.cardNo}</p>
          <p className={maintainStyle.headerNormal}>开&nbsp;户&nbsp;行&nbsp;：{rowData.bankName}</p>
        </div>
        <div className={maintainStyle.contentFooter}>
          <p style={{color: '#999999'}}>{rowData.recStat == '2' ? '已停用' : '已启用'}</p>
          <div className={maintainStyle.footerBtn}>
            <div onClick={this.clickBtn1.bind(this,{rowData, rowID})} className={maintainStyle.btn1} style={{color: rowData.recStat == '2' ? 'rgba(81,164,75,1)' : 'rgba(232,25,27,1)', borderColor: rowData.recStat == '2' ? 'rgba(81,164,75,1)' : 'rgba(232,25,27,1)' }}>{rowData.recStat == '2' ? '启用' : '停用'}</div>
            <div className={maintainStyle.btn2} onClick={this.clickBtn2.bind(this,rowData)}>修改</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let {bank} = this.props;
    let {dataSource} = this.state;

    // 中间间隔
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{height: '0.26667rem',backgroundColor: '#F5F5F5'}}
      />
    );

    let {loading, loadingMore} = bank;
    if(dataSource&&dataSource.length>0) {
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
      </div>)
    } else if (loading) {
      return <div style={{backgroundColor: '#f7f7f7'}}></div>
    } else{
      return <div className={TextStyles.empty}><EmptyResult /></div>
    }
  }
};

function connectBankStart({bank}) {
  return {bank}
}

export default connect(connectBankStart)(BankCardManageList);
