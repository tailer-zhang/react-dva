import {
    deleteLocalFile,
    fetchPayProofList,
    remitUploadSubmit,
    uploadCommonFiles
} from '../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'payProofModel',
  state:{
    proofList:[],
    offset: 1,
    detail:{},
    loading:false,
    filterArgs:{},
    keyWord:'',
    loadingMore: false,
    pageNum:1,
    rowData:{

    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/PayProofList') {
          dispatch({
            type: 'fetchPayProofList',
            payload: location.state
          })
        } else if(location.pathname === '/ProofDetail'){
          dispatch({
            type:'updatePayProof',
            payload:location.state
          })
        }
      });
    },
  },

  effects: {
    *fetchPayProofList({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let payProofModel = yield select(state=>state.payProofModel);
      let pageNum = payProofModel.pageNum;
      if(payProofModel.loadingMore==false){
        pageNum = 1;
      }
      let param = {keyWord:payProofModel.keyWord,offset:(pageNum-1)*10,limit:10,sort:"id"};
      const {data}  = yield call(fetchPayProofList, parse(param));
      let list = payProofModel.proofList;
      if(data&&data.list!==undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            proofList:pageNum>1?list.concat(data.list):data.list,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          proofList:pageNum>1?list:[],
          loadingMore:false
        }
      });
    },
    *remitUploadSubmit({ payload }, { call, put,select }) {
      let rowData = yield select(state=>state.payProofModel.rowData);
      let payProofParam = {
        reqSeq:rowData.reqSeq,
        orderNo:rowData.orderNo
      }
      let param = {
        ...payProofParam,
        files:payload.files,
      };
      let {data} =  yield call(remitUploadSubmit, parse(param));
      if(data&&data.model!==undefined) {
        payload.backMethord(data)
      }
    },
    *clearCache({params},{call,put,select}){
      yield put({
        type: 'fetch',
        payload:
        params
      })
    },
    *uploadTradeCommonFiles({payload},{call,put,select})
    {
      let {params,images,backMethord} = payload;
      let {data} = yield call(uploadCommonFiles,params,images);
      backMethord(data);
    },
    *deleteLocalFile({ payload }, { call, put, select }) {
      const { backMethord } = payload
      const params = { path: payload.path }
      const { data } = yield call(deleteLocalFile, parse(params));
      backMethord(data);
    },
    *updatePayProof({payload},{call,put,select}){
      yield put({
        type:'fetch',
        payload:payload
      })
    }
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
