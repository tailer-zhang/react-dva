import {fetchList, fetchListDetail} from '../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'queueModel',
  state:{
    queueOrderList:[],
    offset: 1,
    detail:{},
    loading:false,
    filterArgs:{},
    keyWord:'',
    loadingMore: false,
    pageNum:1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/queueOrderList') {
          dispatch({
            type: 'fetchList',
            payload: location.state
          })
        }else if(location.pathname === '/queueOrderDetail') {
          dispatch({
            type: 'fetchListDetail',
            payload: location.state,
            loading: false
          })
        }
      });
    },
  },

  effects: {
    *fetchList({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let queueModel = yield select(state=>state.queueModel);
      let pageNum = queueModel.pageNum;
      if(queueModel.loadingMore==false){
        pageNum = 1;
      }
      let param = {keyWord:queueModel.keyWord,offset:(pageNum-1)*10,limit:10,sort:"id",order:"DESC"};
      const {data}  = yield call(fetchList, parse(param));
      let list = queueModel.queueOrderList;
      if(data&&data.list!==undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            queueOrderList:pageNum>1?list.concat(data.list):data.list,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          queueOrderList:pageNum>1?list:[],
          loadingMore:false
        }
      });
    },
    *fetchListDetail({ payload }, { call, put,select }) {
      let param = {id:payload.id};
      let {data} =  yield call(fetchListDetail, parse(param));
      if(data&&data.model!==undefined)
      {
         yield put({
           type:'fetch',
           payload:{
             detail: data.model,
             loading:true,
           }
         });
      } else  yield put({
           type:'fetch',
             payload:{
             detail: {},
             loading:true,
           }
         });
        },
    *clearCache({params},{call,put,select}){
       yield put({
          type: 'fetch',
          payload:
          params
        })
       },
      },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  },
}
