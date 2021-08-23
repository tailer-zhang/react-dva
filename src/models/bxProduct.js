import {fetchBxProductList,fetchProductDetail,fetchKPIList} from '../services/bxProduct';
import {parse} from 'qs';

export default {

  namespace: 'bxProduct',

  state: {
    // showIndex:0,
    list:[],
    prodName: '',
    loading: false,
    offset: 1,
    loadingMore:false,

    touchItem:{},
    productDetail:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/productMain/bx') {
          let payload = {};
          if(location.action=='PUSH'){
              payload.prodName = '';
          }
          dispatch({
            type:'fetchRemote',
            payload: {...payload,...location.query}
          });
        }
        else if (location.pathname === '/otherProduct/bx') {
          let payload = {};
          if(location.action=='PUSH'){
              payload.prodName = '';
          }
          dispatch({
            type:'fetchRemote',
            payload: {...payload,...location.query}
          });
        }
        else if (location.pathname === '/todayProduct/bx') {
          let payload = {};
          if(location.action=='PUSH'){
              payload.prodName = '';
          }
          dispatch({
            type:'fetchRemote',
            payload: {...payload,...location.query}
          });
        }
        else if(location.pathname==='/safeGuard')
        {
          dispatch({
            type:'fetchProductDetail',
            payload: location.query,
            rowData:location.state
          });

          dispatch({
            type:'fetchKPIList',
            payload: location.query
          });

        }
      });
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let bxProduct = yield select(state => state.bxProduct);
      let offset = bxProduct.offset;
      if(bxProduct.loadingMore==false)
           offset = 1;
      let param = {offset:(offset-1)*10,limit:10,prodName:bxProduct.prodName};
      let {data} = yield call(fetchBxProductList,parse(param));
      console.log('---打印bx列表---',data);
      let list = bxProduct.list;
      if(data&&data.list!=undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            list:offset>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset:offset+1
          }
        });
      }
      else  yield put({
          type:'fetch',
          payload:{
            list:offset>1?list:[],
            loading:false,
            loadingMore:false
          }
        });
    },

    //获取产品详情
    *fetchProductDetail({ payload,rowData}, { call, put,select })
    {
      yield put({
          type:'fetch',
          payload:{
              touchItem:rowData
          }
      });
      let bxProduct = yield select(state => state.bxProduct);
      let {touchItem} = bxProduct;
      let param = {prodId:touchItem.id};
      const {data}  = yield call(fetchProductDetail, parse(param));
      console.log('----打印详情data------',data);
      // let productDetail = data.data.model;
       yield put({
         type:'fetch',
         payload:{
           productDetail:data&&data.code==='00'?data.model:{}
         }
       });
    },

    *fetchKPIList({ payload }, { call, put,select })
    {
      let bxProduct = yield select(state => state.bxProduct);
      let {touchItem} = bxProduct;
      // console.log('-----',touchItem);
      let param = {prodId:touchItem.id,offset:1};
      const {data}  = yield call(fetchKPIList, parse(param));
      //  yield put({
      //    type:'fetch',
      //    payload:{
      //      productDetail:data&&data.code==='00'?data.object:{}
      //    }
      //  });
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

//之前
//productDetail:data&&data.code==='00'?data.object:{}
