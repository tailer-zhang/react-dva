import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import { List,InputItem,Toast } from 'antd-mobile';
import {fetchVpShareList,fetchVpShareDetail} from '../services/vpShare';

export default {
  namespace: 'vpShare',
  state:{
      shareList:[],
      keyword:'',
      page:1,
      loading:false,
      loadingMore:false,

      vpShareDetail:{},
      shareCompanyList:[]
  },
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
            if(location.pathname == '/vpShareList'){
                let queryKey={loadingMore:false,page:1,loading:false};
                if(location.action=='PUSH'){
                    //关键词清空
                    queryKey={...queryKey,shareList:[],keyword:'',loading:true};
                }
                dispatch({
                    type:'fetchVpShareList',
                    payload:queryKey
                });
            }
            else if(location.pathname == '/vpShareDetail'){
                if(location.state){
                    let {id} = location.state;
                    dispatch({
                        type:'fetchVpShareDetail',
                        payload:{
                            id:id
                        },
                        resetState:{
                            vpShareDetail:{},
                            shareCompanyList:[]
                        }
                    });
                }
            }
        });
      },
    },
  effects: {
      *fetchVpShareList({ payload }, { call, put,select }){
          yield put({
              type:'fetch',
              payload:payload
          });
          let {keyword,loadingMore,page,loading,shareList} = yield select(state=>state.vpShare);
          if(loadingMore==false){
              page = 1;
          }
          let  params = {keyword:keyword,offset:(page-1)*10,limit:10,sort:'id',order:'desc'};
          let {data}=yield call(fetchVpShareList,parse(params));
          let listData = shareList;
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
                  shareList:listData,
                  page:page,
                  loading:false,
                  loadingMore:false
              }
          });
      },
      *fetchVpShareDetail({ payload,resetState}, { call, put,select }){
          yield put({
              type:'fetch',
              payload:resetState
          });
          let params = {id:payload.id};
          let {data} = yield call(fetchVpShareDetail,parse(params));
          let vpShareDetail = {},shareCompanyList = [];
          if(data&&data.code=='00'){
              vpShareDetail = data.model;
              shareCompanyList = data.list?data.list:[];
          }
          else {
              vpShareDetail = {};
              shareCompanyList = [];
              Toast.fail(data&&data.msg?data.msg:'数据获取失败!',2);
          }
          yield put({
              type:'fetch',
              payload:{
                  vpShareDetail:vpShareDetail,
                  shareCompanyList:shareCompanyList
              }
          });
      },
  },
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  },
}
