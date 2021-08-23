import {parse} from "qs";
import {fetchdeallist} from '../services/trade';


export default {
  namespace: 'dealModel',
  state: {
    dealList:[],
    custName:'',
    pageNumber:1,
    filterArgs:{},
    loadingMore:false,
    loading:false,
    reach_bottom: false,
  },
  subscriptions: {
    setup({dispatch, history}){
         history.listen((location)=>{
           if(location.pathname === '/dealList'){
             let state = location.state;
             let filter = state.filter;
             dispatch({
               type:'fetch',
               payload:{
                 dealList:[]
               }
             });
             dispatch({
               type:'fetchRemote',
               payload: {filterArgs1:filter?filter:{}, custNo: state.custNo, filterMode:'deallist'}
             });
           }
         })
    }
  },
  effects: {
    *fetchRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let deal = yield select(state => state.dealModel);
      let pageNumber = deal.pageNumber;
      let filterArgs = deal.filterArgs;
      if(deal.filterMode)
      {
        filterArgs  = deal.filterArgs1;
        // custName = customer.custName1;
      }
      if(deal.loadingMore==false)
        pageNumber = 1;
      let param = {custNo: payload.custNo}
      let {data}  = yield call(fetchdeallist, parse(param));
      let result = data
      let list = deal.dealList;
      if(result&&result.list&&result.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            dealList:pageNumber>1?list.concat(result.list):result.list,
            loading:false,
            loadingMore:false,
            pageNumber:pageNumber+1,
            reach_bottom: result.list.length < 10,
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          dealList:pageNumber>1?list:[],
          loading:false,
          loadingMore:false,
          reach_bottom: true
        }
      });
    },
  },
  reducers:{
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  }
}
