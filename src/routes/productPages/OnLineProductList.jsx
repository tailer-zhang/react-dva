import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import XtWaitList from '../../components/product/xtWaitList';
import { SegmentedControl,DatePicker, List, Button ,ListView, SearchBar, Icon, Drawer, NavBar } from 'antd-mobile';
import EmptyResult from '../../components/share/EmptyResult';

class  OnlineProductList extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       });
        this.state = {
            ds:ds
        };
    }

    renderRow(rowData, sectionID, rowID){
        return (
          <div key={rowID} style={{width:'100%'}}>
              <XtWaitList data={rowData}/>
          </div>
        );
    }

    onEndReached(event){
        let {dispatch,loadingTags} = this.props;
        let {loadingMore,loading} = loadingTags;
        if(event==undefined||loadingMore)
          return;
        dispatch({
            type:'xtProduct/fetchPreProductList',
            payload:{
                loadingTags:{
                    loadingMore:true
                }
            }
        });

    }

    renderSeparator(sectionID, rowID){
        return (
            <div key={`${sectionID}-${rowID}`} style={{
              backgroundColor: '#efeff4',
              height: 20,
              borderTop: '1px solid #efeff4',
              borderBottom: '1px solid #efeff4',
            }}
            />
        );
    }

    render(){
        let {ds}  =this.state;
        let {dispatch,onLineList,loadingTags} = this.props;
        let {loadingMore,loading} = loadingTags;
        if(onLineList&&onLineList.length>0){
            return (
                <div>
                     <ListView
                         style={{height:document.documentElement.clientHeight,overflow: 'auto',width:'100%'}}
                      dataSource={ds.cloneWithRows(onLineList)}
                      renderFooter={() => {
                        if(loadingMore)
                          return (<div style={{ padding: 30, textAlign: 'center'}}>
                           加载中...
                          </div>);
                        else return <div />;
                      }}
                      renderRow={this.renderRow.bind(this)}
                      renderSeparator={this.renderSeparator.bind(this)}
                      className="am-list"
                      pageSize={10}
                      scrollRenderAheadDistance={40}
                      scrollEventThrottle={20}
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={200}
                    />
                </div>
            );
        }
        else if(loading){
          return (<div style={{backgroundColor:'#f7f7f7'}}></div>);
        }
        else  return  (<EmptyResult style={{height:'100%'}} />);
    }
}


function connectProductFunc({xtProduct})
{
	  return {
          onLineList:xtProduct.onLineList,
          loadingTags:xtProduct.loadingTags
      };
}

export default connect(connectProductFunc)(OnlineProductList);
