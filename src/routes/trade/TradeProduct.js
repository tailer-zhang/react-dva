import React,{Component} from 'react';
import Title from '../../components/product/Title';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
import { List, Radio, Flex, ListView, Drawer, Toast } from 'antd-mobile';
import {Tool} from '../../utils/tools';
import EmptyResult from '../../components/share/EmptyResult';
import proMarketStyles from '../../styles/product/MarketMonth.less';
import styles from '../../styles/customer/customerInquireList.less';
import * as commons from "../../utils/commonUtil";
import TradeProductFilter from './TradeProductFilter';
import TradeProdSelectBar from '../../components/trade/TradeProductSearchBar';
import TradeProduManaSearchBar from '../../components/trade/TradeProduManaSearchBar';
import TradeProduAssiSearchBar from '../../components/trade/TradeProduAssiSearchBar';

const TradeProduct = (props) => {

  return (
    <div className={proMarketStyles.wrap}>
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
      isLoading:false,
      open: false,
      position: 'right',
    };
  }
  onOpenChange(isOpen) {
    this.setState({ open: !this.state.open });
  }

  onCloseMethord(filterArgs)
  {
    console.log('filterArgs',filterArgs)
    let {dispatch} = this.props;
    console.log('guanbi ---',this.props)
    this.setState({open:!this.state.open})
    // this.setState({open: Object.keys(filterArgs).length!==0?!this.state.open:true})
    let arr = Object.keys(filterArgs.insureStat);
    if(arr.length > 0){
      dispatch({
        type: 'tradeSafe/fetchSereenProductName',
        payload: {
          id:filterArgs.insureStat.id,
          prodName:'',
          loadingMore:false,
          useStat:'1'
        }
      })
    }else{
      dispatch({
        type: 'tradeSafe/fetchProductName',
        payload: {
          loadingMore:false,
          useStat:'1'
        }
      })
    }

  }

  onEndReached(event) {
    let {dispatch,tradeSafe,location} = this.props;
    let {loadingMore} = tradeSafe;
    let {mode} = location.state;
    if(event == undefined||loadingMore) return;
    else dispatch({
      type: mode=='productType'?'tradeSafe/fetchProductId':(mode=='people' ||mode=='assiPeople' ?'tradeSafe/fetchCustomerList':(mode=='manager'?'tradeSafe/fetchSelectProdList':'tradeSafe/fetchProductName')),
      payload: {reserveRank:2,loadingMore: true,useStat:'1'}
    })
  }

  onChangeEvent(i,e) {
    // e.preventDefault();
    let {tradeForm,dispatch,location} = this.props;
    let {formValue,mode,modify,defaultActiveKey} = location.state;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        custChangeFlag: 'Y',
        prodId: mode?formValue.prodId:i.id,  //i.id?i.id:formValue.prodId,
        prodIdDesc:i.prodName?i.prodName:formValue.prodIdDesc,
        prodNameDesc:i.name?i.name:formValue.prodNameDesc,
        prodNameValue:i.value?i.value:formValue.prodNameValue,
        prodTypeText:mode=='managerType'?i.text:formValue.prodTypeText,
        prodTypeId:mode=='managerType'?i.id:formValue.prodTypeId,
        kpiId: mode=='productType'?i.id:formValue.kpiId,   //?i.id:formValue.kpiId,
        producIdDesc: mode=='manager'?i.id:formValue.producIdDesc,   //
        kpiIdDesc: i.prodTypeName?i.prodTypeName:formValue.kpiIdDesc,
        // custIdDesc: i.custName?i.custName:formValue.custIdDesc,
        custNameDesc: i.custName?i.custName:formValue.custNameDesc,
        custCertNo: i.certNo?i.certNo:formValue.custCertNo,
        custCertType: i.certTypeText?i.certTypeText:formValue.custCertType,
        custCertTy: i.certType?i.certType:formValue.custCertTy,
        custTypeDesc: i.custType?i.custType:formValue.custTypeDesc,
        custId: (mode=='people'&& modify== 'true')?i.id:formValue.custId,
        mgrCodeName: i.mgrCodeText?i.mgrCodeText:formValue.mgrCodeName,
        custCode: {
          mgrCode: Tool.getSessionUser().userId ? Tool.getSessionUser().userId : commons.userId,
          // custNo: i.custID?i.custID:(formValue.custCode==undefined?'':formValue.custCode.custNo),
          custNo: i.custNo?i.custNo:(formValue.custCode==undefined?'':formValue.custCode.custNo),
          custType: i.custType?i.custType:(formValue.custCode==undefined?'':formValue.custCode.custType),
          custName: i.custName?i.custName:formValue.custNameDesc,
          certType: i.certType?i.certType:(formValue.custCode==undefined?'':formValue.custCode.certType),
          certNo: i.certNo?i.certNo:(formValue.custCode==undefined?'':formValue.custCode.certNo),
          sex: i.sex?i.sex:(formValue.custCode==undefined?'':formValue.custCode.sex),
          qualifiedFlg: i.qualifiedFlg?i.qualifiedFlg:(formValue.custCode==undefined?'':formValue.custCode.qualifiedFlg),
          qualBegDate: i.qualBegDate?i.qualBegDate:(formValue.custCode==undefined?'':formValue.custCode.qualBegDate),
          qualEndDate: i.qualEndDate?i.qualEndDate:(formValue.custCode==undefined?'':formValue.custCode.qualEndDate),
        }
      }
    });
    if (mode=='assiPeople'){
      let saveValue = {
        targetName: i.custName ,
        targetCertType: i.certType ,
        targetCertNo: i.certNo
      };
      dispatch({
        type:'trade/fetchSelectCustIsExists',
        payload:{
          params:saveValue,
          backMethord:(data)=>{
            console.log('data',data)
            Toast.hide();
            if(data&&data.code=='00')
            {
              dispatch({
                type:'formStorage/fetchFormValue',
                payload:{
                  assi:data.model,
                }
              });
              dispatch(routerRedux.goBack());
            }
            else {
              Toast.fail(data&&data.msg?data.msg:'受让人信息不存在，请选择正确的受让人信息',2);
            }
          }
        }
      });
    }else{
      dispatch(routerRedux.goBack());
    }


  }

  renderRow(rowData, sectionID, rowID)
  {
    let {location} = this.props;
    let {mode,formValue} = location.state;
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
            mode=='productType'?rowData.prodTypeName:(mode=='people' ||mode=='assiPeople' ?rowData.custName:(mode=='manager'?rowData.name:(mode=='managerType'&& rowData.text ?rowData.text:rowData.prodName)))
          }
        </div>
      </div>
    );
  }

  render() {
    // 中间间隔
    let {dispatch,location,tradeSafe,filterArgs} = this.props;
    console.log('this.props---',this.props)
    let {mode,formValue,defaultActiveKey} = location.state;
    let list = tradeSafe.tradeProNameList;
    const sidebar = (<TradeProductFilter dispatch={dispatch} tradeProNameSelect = {tradeSafe.tradeProNameSelect} filterArgs={tradeSafe.filterArgs} onCloseMethord={this.onCloseMethord.bind(this)} />);
    // console.log('tradeSafe-----------',tradeSafe);
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange.bind(this),
    };
    let titleProps = {title: '产品名称'};
    if (mode=='productType' || mode == 'managerType') titleProps = {title: '产品类别',showBack: 'yes'};
    if (mode=='people') titleProps = {title: '投保人',showBack: 'yes'};
    if (mode=='assiPeople') titleProps = {title: '受让人姓名',showBack: 'yes'};
    // const titleProps = {title: 'B类产品交易查询',showBack: 'no'};
    if(mode == 'productType') list = tradeSafe.tradeProTypeList;
    if(mode == 'people' || mode == 'assiPeople') list = tradeSafe.tradeCustomerList;
    if(mode == 'manager') list = tradeSafe.tradeProdList;
    if(mode == 'managerType') list = tradeSafe.tradeProdTypeList;
    if(list == undefined) list = [];

    console.log('list=========',list);

    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        borderBottom: '1px solid #dcdcdc',
      }}
      />
    );
    let {loadingMore,loading} = tradeSafe;
    if(list&&list.length>0) {
      if(!mode){
        console.log('zou1')
        return (<div style={{ width: '100%' }}>
          <Drawer
            className={styles.myDrawer}
            sidebar={sidebar}
            // style={{ minHeight: document.documentElement.clientHeight}}
            dragHandleStyle={{ display: 'none', }}
            contentStyle={{ color: '#A6A6A6', textAlign: 'center',}}
            {...drawerProps}
          >
            <div style={{position: 'absolute',zIndex: '80',width: '100%',top:0,left:0,right:0}}>
              <Title {...titleProps}>
                <div style={{position: 'absolute',top: '0',right:'0.32rem',width: '1.067rem',height: '1.333rem',paddingTop: '0.1rem'}} onTouchStart={this.onOpenChange.bind(this)}>
                  <img style={{width: '0.533rem',height: '0.533rem'}}
                       src={require('../../image/product/filter.png')} />
                </div>
              </Title>
              <div style={{borderBottom: 'solid 1px #d2d2d6'}}>
                <TradeProdSelectBar dispatch={dispatch} />
              </div>
            </div>
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
                paddingTop: '2.43rem',
              }}
              pageSize={15}
              scrollRenderAheadDistance={50}
              scrollEventThrottle={20}
              onScroll={() => { console.log('scroll') }}
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={10}
            />
          </Drawer>
        </div>)
        return <div style={{backgroundColor: '#f7f7f7'}}></div>
      } else if(mode=='assiPeople'){
        console.log('zou1')
        return (<div style={{ width: '100%' }}>
          <div style={{position: 'absolute',zIndex: '80',width: '100%',top:0,left:0,right:0}}>
            <Title {...titleProps}></Title>
            <div style={{borderBottom: 'solid 1px #d2d2d6'}}>
              <TradeProduAssiSearchBar dispatch={dispatch} />
            </div>
          </div>
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
              paddingTop: '2.43rem',
            }}
            pageSize={15}
            scrollRenderAheadDistance={50}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll') }}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={10}
          />
        </div>)
        return <div style={{backgroundColor: '#f7f7f7'}}></div>
      }else if(mode == 'manager'){
        console.log('zou1')
        return (<div style={{ width: '100%' }}>
            <div style={{position: 'absolute',zIndex: '80',width: '100%',top:0,left:0,right:0}}>
              <Title {...titleProps}></Title>
              <div style={{borderBottom: 'solid 1px #d2d2d6'}}>
                <TradeProduManaSearchBar dispatch={dispatch} />
              </div>
            </div>
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
                paddingTop: '2.43rem',
              }}
              pageSize={15}
              scrollRenderAheadDistance={50}
              scrollEventThrottle={20}
              onScroll={() => { console.log('scroll') }}
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={10}
            />
        </div>)
        return <div style={{backgroundColor: '#f7f7f7'}}></div>
      } else{
        console.log('zou2')
        return (<div style={{ width: '100%' }}>
          <div className={proMarketStyles.title}>
            <Title {...titleProps}/>
          </div>
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
        return <div style={{backgroundColor: '#f7f7f7'}}></div>
      }
    } else {
      return <div className={styles.empty}><EmptyResult /></div>
    }
  }

  // render() {
  //   let {dispatch,location,tradeSafe} = this.props;
  //   let {selectValue,mode,formValue} = location.state;
  //   let list = tradeSafe.tradeProNameList;
  //   if(mode == 'productType') list = tradeSafe.tradeProTypeList;
  //   if(mode == 'people') list = tradeSafe.tradeCustomerList;
  //   console.log('list',list);
  //   if(list == undefined) list = [];
  //
  //   return (<div>
  //     <List>
  //       {list.map((item,index) => (
  //         <div key={index} checked={selectValue === item.id?item.id:item.custId}
  //           className={proMarketStyles.trade}
  //           onClick={(e)=>this.onChangeEvent(item,e)}>
  //          {
  //            mode=='productType'?item.prodTypeName:(mode=='people'?item.custName:item.prodAlia)
  //          }
  //         </div>
  //       ))}
  //     </List>
  //   </div>);
  // }
};

function connectProduct({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectProduct)(TradeProduct);
