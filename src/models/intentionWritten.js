import { fetchIntentionWrite } from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';
import moment from 'moment';
import { List,InputItem,Toast } from 'antd-mobile';
import {fetchPreTradReqList,fetchPreProductList,addPreTradReq,fetchPreTradReqDetail} from '../services/intentionWritten';

export default {

  namespace: 'intentionWritten',
  state:{
      list:[],
      keyword:'',
      page:1,
      loading:false,
      loadingMore:false,

      intentionWriteTradDetail:{},

      preProductList:[],
      preKeyword:''
  },

  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname=='/intentionWrite'){
              let queryKey={loadingMore:false,page:1,loading:false};
              if(location.action=='PUSH'){
                  //关键词清空
                  queryKey={...queryKey,list:[],keyword:'',loading:true};
              }
              dispatch({
                  type:'fetchPreTradReqList',
                  payload:queryKey
              });
          }
          else if(location.pathname=='/writtenDetail'){
              let {id} = location.state;
              dispatch({
                  type:'fetchPreTradReqDetail',
                  payload:{
                      id:id
                  }
              });
          }
          else if(location.pathname=='/selectProWritten'){//选择产品进行意向签单
              dispatch({
                  type:'fetchPreProductList'
              });
          }
          else if(location.pathname=='/writeenFrom'){
              dispatch({
                  type:'formStorage/initState',
                  location:location,
                  initMethord:()=>{
                      dispatch({
                          type:'formStorage/fetchState',
                          payload:{
                              formValue:{
                                  currType:'156'
                              }
                          },
                          location:location
                      });
                  }
              });
          }
        });
      },
  },
  effects: {
    *fetchPreTradReqList({ payload }, { call, put,select }) {
        yield put({
            type:'fetch',
            payload:payload
        });
        let {keyword,loadingMore,page,loading,list} = yield select(state=>state.intentionWritten);
        if(loadingMore==false){
            page = 1;
        }
        let  params = {keyword:keyword,offset:(page-1)*10,limit:10,sort:'id',order:'desc'};
        let {data}=yield call(fetchPreTradReqList,parse(params));
        let listData = list;
        if(data&&data.code=='00'&&data.list&&data.list.length>0){
            listData = page>1?listData.concat(data.list):data.list;
            page = page +1;
        }
        else {
            listData = page>1?listData:[];
            if(!data||data.code!='00'){
                Toast.fail(data&&data.msg?data.msg:'数据获取失败!',2);
            }
        }
        yield put({
            type:'fetch',
            payload:{
                list:listData,
                page:page,
                loading:false,
                loadingMore:false
            }
        });
    },
    *fetchPreProductList({ payload }, { call, put,select }) {
        yield put({
            type:'fetch',
            payload:payload
        });
        let {preKeyword} = yield select(state=>state.intentionWritten);
        let {data}  = yield call(fetchPreProductList,{keyword:preKeyword});
        let list = [];
        // list = data;
        if(data&&data.code=='00'&&data.list&&data.list.length>0){
            list = data.list;
        }
        else {
            list = [];
            if(!data||data.code!='00'){
                Toast.fail(data&&data.msg?data.msg:'数据获取失败!',2);
            }
        }

        yield put({
            type:'fetch',
            payload:{
                preProductList:list
            }
        });
    },
    *addPreTradReq({ payload }, { call, put,select }) {
        let {params,backMethord} = payload;
        let {data} = yield call(addPreTradReq,parse(params));
        backMethord(data);
    },
    *fetchPreTradReqDetail({ payload }, { call, put,select }) {
        let params = {id:payload.id};
        let {data} = yield call(fetchPreTradReqDetail,parse(params));
        let intentionWriteTradDetail = {};
        if(data&&data.code=='00'){
            intentionWriteTradDetail = data.model;
        }
        else {
            intentionWriteTradDetail = {};
            Toast.fail(data&&data.msg?data.msg:'数据获取失败!',2);
        }
        yield put({
            type:'fetch',
            payload:{
                intentionWriteTradDetail:intentionWriteTradDetail
            }
        });
    },
  },
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
