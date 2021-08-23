import { fetchRedeemList, fetchRedeemHintList, tradeInfoSee, fetchFundChangeList, validProdInfo, redeemList} from '../services/tradeRedList';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';

export  default {
  namespace:'tradeRedList',

  state:{

    redeemList:[],
    keyWord:'',
    offset:1,
    model:{},
    mgrCode:'',
    loading:false,
    loadingMore:false,
    rejectFlag:'1',
    id:'',
    singleRedeemList:[],
    validProdInfo:''
  },
  subscriptions:{
    setup({ dispatch,history }){
      history.listen(location => {
        if(location.pathname === '/redeemList'){
        let payload = {...location.query,loadingMore:false, location };
        if(location.action=='PUSH')
        {
          payload = { ...location.query,loadingMore:false,keyWord:'', location}
        }
          dispatch({
            type:'fetchRemote',
            payload:payload
          })
        }
        else if(location.pathname=='/TradeInfoSee'){
          dispatch({
            type:'fetchFecInfo',
            payload:{...location.state.tradeRedeem,rejectFlag:'1',openShrId:location.state.openShrId}
          })
          if(!location.state.RedeemLists) return;
          dispatch({
            type:'fetchValidProdInfo',
            payload:{prodId:location.state.tradeRedeem.prodId,id:location.state.tradeRedeem.id}
          })
        }
        else if(location.pathname === '/fundChangeList'){
          let payload = {...location.query,loadingMore:false};
          if(location.action=='PUSH')
          {
            payload = { ...location.query,loadingMore:false,keyWord:'' }
          }
          dispatch({
            type:'fetchFundChange',
            payload:payload
          })
        }
        else if(location.pathname=='/FundChangeInfo'){
          dispatch({
            type:'fetchFecInfo',
            payload:{...location.state.tradeRedeem,rejectFlag:'1'}
          })
        }
      })
    }
  },
  effects:{
    *fetchRemote({ payload }, {call,put,select}) {
      yield put ({type:'showLoading'});
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let tradeRedList = yield select(state => state.tradeRedList);
      let offset = tradeRedList.offset;
      if(tradeRedList.loadingMore == false)
        offset = 1;
      let param = {sort:'createTime',order:'desc',keyWord:tradeRedList.keyWord,id:tradeRedList.id,offset:(offset-1)*10,limit:10};
      let myData = {}
      if (tradeRedList.location.state && tradeRedList.location.state.from === 'outHint') {
        myData = yield call(fetchRedeemHintList, param);
      } else {
        myData = yield call(fetchRedeemList, param);
      }
      let { data } = myData
      let dataSource = tradeRedList.redeemList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
          yield put({
            type:'fetch',
            payload:{
              redeemList:offset>1?dataSource.concat(data.list):data.list,
              id:data.id,
              loading:false,
              loadingMore:false,
              offset:offset+1
            }
          });
      }
      else yield put({
          type:'fetch',
          payload:{
            redeemList:offset>1?dataSource:[],
            loading:false,
            loadingMore:false
          }
       });
    },
    *fetchFecInfo({ payload }, {call,put,select}) {
      let param = {id:payload.id,rejectFlag:payload.rejectFlag,openShrId:payload.openShrId};
      let { data } = yield call(tradeInfoSee,param);
      console.log('===1===1===',data);
      yield put({
        type:'fetch',
        payload:{
          model:data&&data.model?data.model:{},
        }
      });
    },
    *fetchValidProdInfo({payload},{call,put,select}){
      let param = {prodId: payload.prodId};
      let {data} = yield call(validProdInfo,param);
      if(data.model== 'Y'){
        yield put({ type: 'getRedeemList', payload: { params:{custShrId:payload.id}} });
      }
      yield put({
        type:'fetch',
        payload:{
          validProdInfo:data&&data.model?data.model:'',
        }
      });

    },
    *fetchFundChange({ payload }, {call,put,select}) {
      yield put ({type:'showLoading'});
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let tradeRedList = yield select(state => state.tradeRedList);
      let offset = tradeRedList.offset;
      if(tradeRedList.loadingMore == false)
        offset = 1;
      let param = {sort:'createTime',order:'desc',keyWord:tradeRedList.keyWord,id:tradeRedList.id,offset:(offset-1)*10,limit:10};
      let { data } = yield call(fetchFundChangeList,param);
      let dataSource = tradeRedList.redeemList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            redeemList:offset>1?dataSource.concat(data.list):data.list,
            id:data.id,
            loading:false,
            loadingMore:false,
            offset:offset+1
          }
        });
      }
      else yield put({
        type:'fetch',
        payload:{
          redeemList:offset>1?dataSource:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    *getRedeemList({payload},{call,put,select}){
      let {params,backMethord} = payload
      let {data} = yield call(redeemList,params);
      if(data){
        yield put({
          type:'fetch',
          payload:{
            singleRedeemList:data.list
          }
        })
        if(!backMethord) return;
        backMethord(data.list)

      }
    }

  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
