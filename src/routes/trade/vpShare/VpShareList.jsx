import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Button ,ListView, SearchBar } from 'antd-mobile';
import Title from '../../../components/product/Title';//顶部标题和返回按钮组件
import VplistCompt from '../../../components/trade/vpShare/VplistCompt';//私募产品列表组件
import EmptyResult from '../../../components/share/EmptyResult';
import styles from '../../../styles/trade/vpShare/vplist.less';
import {routerRedux} from 'dva/router';
import TitleComp, { flushTitle } from 'react-title-component';

let loadMoreTime = 0;
class VpShareList extends Component {
    constructor(props) {
       super(props);
       this.renderList = this.renderList.bind(this);
       let ds = new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       });

       this.state = {
           ds:ds,
           keyword:props.vpShare.keyword
       };
    }


    /**
     * 点击单元格
     */
    clickRow(rowData){
        let {dispatch} = this.props;
        dispatch(routerRedux.push({
            pathname:'/vpShareDetail',
            state:rowData
        }));
    }

    /**
     * 页面渲染达到尾部
     * @return void
     * @version v1.0.0
     */
    onEndReached(event)
    {
        let {vpShare,dispatch} = this.props;
        let { loadingMore } = vpShare;
        let time = Date.parse(new Date()) / 1000;
        if(event==undefined||loadingMore||time - loadMoreTime <=1){
              return;
        }
        else{
          dispatch({
            type:'vpShare/fetchVpShareList',
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
            * @version   v1.0.0
        */
        renderRow(rowData, sectionID, rowID)
        {
            return (
                <div key={`${sectionID}-${rowID}`} style={{width:'100%'}} onClick={this.clickRow.bind(this,rowData)}>
                    <VplistCompt data={rowData}/>
                </div>
            );
        }

        /**
         * 适用于分割section 之间
         * @param     sectionID
         * @param     rowID
         * @return
         * @version v1.0.0
         */
        renderSeparator(sectionID, rowID)
        {
            return (<div key={`${sectionID}-${rowID}`} style={{height:20,backgroundColor:'#efeff4'}} />);
        }

        renderList(){
            let {shareList,loadingMore,loading} = this.props.vpShare;
            if(shareList&&shareList.length>0){
                return (
                    <ListView
                      dataSource={this.state.ds.cloneWithRows(shareList)}
                      renderFooter={() => {
                         if(loadingMore)
                            return (<div style={{ padding:0, textAlign: 'center' }}>
                                加载中...
                            </div>);
                         else return <div/>;
                      }}
                      renderSeparator={this.renderSeparator.bind(this)}
                      renderRow={this.renderRow.bind(this)}
                      className="am-list"
                      pageSize={10}
                      scrollRenderAheadDistance={50}
                      scrollEventThrottle={20}
                      style={{height:'100%'}}

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
                      <EmptyResult style={{height:'100%'}}/>
                    </div>
                );
            }
        }

        searchKeyword(value){
            let {dispatch} = this.props;
            dispatch({
                type:'vpShare/fetchVpShareList',
                payload:{
                    keyword:value,
                }
            });
        }

      render()
      {
        const TitleProps = {
          title:'VP共享额度使用情况',
          showBack:'no'
        };
        let {dispatch} = this.props;
        return (
          <div className={styles.vPlist}>
            {/*<Title {...TitleProps}></Title>*/}
            <TitleComp render="额度查询"/>
            <SearchBar placeholder="产品名称"
                value = {this.state.keyword}
                showCancelButton={true}
                cancelText = {'搜索'}
                className={styles.searchBar}
                onChange={(value)=>this.setState({keyword:value})}
                onCancel={(value)=>{
                    // this.setState({keyword:''});
                    // this.searchKeyword('');
                    this.searchKeyword(value);
                }}
                onSubmit={(value)=>{
                    this.searchKeyword(this.state.keyword);
                }}
                />
            <div className={styles.listBox}>
             {this.renderList()}
            </div>
          </div>
        );
      }
};

// <VplistCompt/>



function connectVpShareFun({vpShare}){
    return {vpShare};
}


export default connect(connectVpShareFun)(VpShareList);
