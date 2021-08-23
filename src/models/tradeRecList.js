import { fetchRecallList,validRecall } from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';
import Dic from '../utils/dictionary';

export default {

  namespace: 'tradeRecList',

  state:{
    recList:[],
    keyWord:'',
    offset:1,
    loading:false,
    loadingMore:false,
    rejectFlag:'1',
    model:{},
    id:''
  },

  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname=='/recallList')
          {
            let payload = {...location.query,loadingMore:false};
            if(location.action=='PUSH')
            {
              payload = { ...location.query,loadingMore:false,keyWord:''};
            }
            dispatch({
               type:'fetchRemote',
               payload:payload
            });
          }
        });
      },
  },

  effects: {
    *fetchRemote({ payload }, { call,put,select }) {
      yield put({ type: 'showLoading' });
      // console.log('dddddddd',payload);
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });

      let tradeRecList = yield select(state=>state.tradeRecList);
      let offset = tradeRecList.offset;
      if(tradeRecList.loadingMore==false)
        offset = 1;
      let param = {sort:'createTime',order:'desc',keyWord:tradeRecList.keyWord,offset:(offset-1)*10,limit:10};
      let {data} = yield call(fetchRecallList,param);
      let dataSource = tradeRecList.recList;

      if(data&&data.list!=undefined&&data.list.length>0)
      {
         yield put({
           type:'fetch',
           payload:{
             recList:offset>1?dataSource.concat(data.list):data.list,
             loading:false,
             loadingMore:false,
             offset:offset + 1
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           recList:offset>1?dataSource:[],
           loading:false,
           loadingMore:false
         }
       });
    },
    *validRecall({ payload }, { call,put,select }){
      let param = payload.params;
      let {data} = yield call(validRecall,param)
      payload.backMethord(data)
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
