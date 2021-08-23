import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Button ,ListView, SearchBar } from 'antd-mobile';
// import Title from '../../../components/product/Title';//顶部标题和返回按钮组件
import WrittenCompt from '../../../components/trade/written/WrittenCompt';//私募产品列表组件
import EmptyResult from '../../../components/share/EmptyResult';
import styles from '../../../styles/trade/written.less';
import {routerRedux} from 'dva/router';

let loadMoreTime = 0;
class IntentionWrite extends Component {
constructor(props) {
   super(props);
   this.renderList = this.renderList.bind(this);
   let ds = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });

   this.state = {
       ds:ds,
       keyword:props.intentionWritten.keyword
   };
}


/**
 * 点击单元格
 */
clickRow(rowData){
    let {dispatch} = this.props;
    dispatch(routerRedux.push({
        pathname:'/writtenDetail',
        state:rowData
    }));
}

/**
 * 页面渲染达到尾部
 * @return void
 * @author 李加强
 * @version v1.0.0
 */
onEndReached(event)
{
    let {intentionWritten,dispatch} = this.props;
    let { loadingMore } = intentionWritten;
    let time = Date.parse(new Date()) / 1000;
    if(event==undefined||loadingMore||time - loadMoreTime <=1){
          return;
    }
    else{
      dispatch({
        type:'intentionWritten/fetchPreTradReqList',
        payload:{loadingMore:true}
      });
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
}



/**
 * 渲染每行
 * @param     rowData   单元数据
 * @param     sectionID 分组id
 * @param     rowID    行id
 * @return    行渲染dom
 * @author    李加强
 * @version   v1.0.0
 */
renderRow(rowData, sectionID, rowID)
{
    return (
        <div key={`${sectionID}-${rowID}`} style={{width:'100%'}} onClick={this.clickRow.bind(this,rowData)}>
            <WrittenCompt data={rowData}/>
        </div>
    );
}

/**
 * 适用于分割section 之间
 * @param     sectionID
 * @param     rowID
 * @return
 * @author 李加强
 * @version v1.0.0
 */
renderSeparator(sectionID, rowID)
{
    return (<div key={`${sectionID}-${rowID}`} style={{height:20,backgroundColor:'#efeff4'}} />);
}

renderList(){
    let {list,loadingMore,loading} = this.props.intentionWritten;
    if(list&&list.length>0){
        return (
            <ListView
              dataSource={this.state.ds.cloneWithRows(list)}
              renderFooter={() => {
                 if(loadingMore)
                    return (<div style={{ height: 50, textAlign: 'center' }}>
                        加载中...
                    </div>);
                 else return <div style={{padding:0}} />;
              }}
              style={{
                height:'100%'
              }}
              renderSeparator={this.renderSeparator.bind(this)}
              renderRow={this.renderRow.bind(this)}
              className="am-list"
              pageSize={10}
              scrollRenderAheadDistance={50}
              scrollEventThrottle={20}
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={30}
            />
        );
    }
    else if(loading){
        return (<div style={{backgroundColor:'#efeff4'}}></div>);
    }
    else {
        return (
            <div style={{backgroundColor:'#f7f7f7',height:'100%'}}>
              <EmptyResult />
            </div>
        );
    }
}

searchKeyword(value){
    let {dispatch} = this.props;
    dispatch({
        type:'intentionWritten/fetchPreTradReqList',
        payload:{
            keyword:value,
        }
    });
}


  render()
  {
    // const TitleProps = {
    //   title:'意向签单列表',
    //   showBack:'no'
    // };
    let {dispatch} = this.props;
    return (
      <div className={styles.listPage}>
        {/*  <Title {...TitleProps}></Title>*/}
            <SearchBar placeholder="客户名称"
                value = {this.state.keyword} onChange={(value)=>this.setState({keyword:value})} onCancel={(value)=>{
                    this.setState({keyword:''});
                    this.searchKeyword('');
                }}
                onSubmit={(value)=>{
                    this.searchKeyword(this.state.keyword);
                }}
                />
        <div className={styles.boxScroll}>
        {this.renderList()}
        </div>
        <p className={styles.footerSpeace}></p>
        <p className={styles.newSetBtn} onClick={()=>dispatch(routerRedux.push('/writeenFrom'))}>新建预约</p>
      </div>
    );
  }
};

//


function connectTradeFunc({intentionWritten})
{
  return {intentionWritten};
}

export default connect(connectTradeFunc)(IntentionWrite);
