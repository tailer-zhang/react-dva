import React , { Component , PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { ListView , WhiteSpace } from 'antd-mobile';
import EmptyResult from '../../../components/share/EmptyResult';

import styles from '../../../styles/trade/proofOrder.less';

/*
 *排队预约情况组件
 **/
class ProofList extends Component {
    constructor(props) {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state= {
            ds:ds,
            isLoading:false
        };
    }

    goListDetail(rowData,sectionID,rowID){
        let { dispatch } = this.props;
        dispatch(routerRedux.push({pathname:'/ProofDetail',state:{rowData:rowData}}))
    }

    onEndReached(event) {
        let { payProofModel , dispatch } = this.props;
        let { loadingMore , loading} = payProofModel;
        if(event==undefined||loadingMore){
            return;
        }else {
            dispatch({type:'payProofModel/fetchPayProofList',payload:{loadingMore:true}});
        }
    }

    renderList(rowData,sectionID,rowID){
        return(
            <div className={styles.queuediv} onClick={this.goListDetail.bind(this,rowData,sectionID,rowID)}>
                <div className={styles.prod}>
                    <div className={styles.prodTitles}>
                        <p className={styles.Itemleft}>{rowData.contNo}</p>
                        <div className={styles.Itemright}>{rowData.prodExpiName}</div>
                    </div>
                    <div className={styles.orderInfo}>
                        <section className={styles.textLeft}>
                            <p style={{fontSize:'.35rem'}}>{rowData.prodName}</p>
                            <span>产品名称</span>
                        </section>
                        <section className={styles.textRight}>
                            <p>{rowData.custName}</p>
                            <span>客户名称</span>
                        </section>
                    </div>
                </div>
                {/*<p className={styles.queueTime}>{`排队开始时间：${rowData.updateTime}`}</p>*/}
            </div>
        )
    }

    render(){
        let { dispatch , proofList , payProofModel } = this.props;
        let { loadingMore , loading } = payProofModel;

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{
                backgroundColor: '#efeff4',
                height:20,
            }}
            />
        );
        if(proofList.length>0){
            return (<div style={{width: '100%' }}>
                <ListView
                    dataSource={this.state.ds.cloneWithRows(proofList)}
                    renderFooter={() => {
                        if(loadingMore)
                            return (<div style={{padding: 30, textAlign: 'center' }}>正在加载...</div>);
                        else return (<div style={{padding: 30, textAlign: 'center' }}>没有更多了</div>);
                    }}
                    renderRow={this.renderList.bind(this)}
                    renderSeparator={separator}
                    className="am-list"
                    style={{
                        height: document.body.clientHeight * 5/6,
                        overflow: 'auto',
                        border: '1px solid #ddd',
                    }}
                    pageSize={10}
                    scrollRenderAheadDistance={1000}
                    scrollEventThrottle={50}
                    onScroll={() => { console.log('scroll'); }}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={500}
                />
            </div>);
        }else if (loading) {
            return(<div style={{backgroundColor:'#efeff4'}}></div>)
        }
        return(<div style={{height:'100%',backgroundColor:'#f7f7f7'}}><EmptyResult/></div>)

    }
}

export default ProofList;

