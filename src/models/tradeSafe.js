import {fetchTradeSafeInquire,fetchTradeSafeContract,fetchTradeSafeReInfo,fetchKPIList,
        fetchTradeSafeReModify,fetchTradeSafeReDelete,fetchTradeSafeEnter,fetchBxProductList,
  fetchScreProductList,
        fetchCustomerList,fetchBxProductSelect}
         from '../services/tradeSafe';
import { transformToCustomerFileListOther ,fetchSelectProdList,
  fetchSelectShrTypeList,

} from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import 'moment/locale/zh-cn';

const zhNow = moment().locale('zh-cn').utcOffset(8);

export default {
  namespace: 'tradeSafe',
  state:{
    offset: 0,
    pageNumber: 1,
    loadingMore:false,
    loading:false,
    custName: '',
    filterArgs:{},
    tradeSafeList: [],
    tradeReInquList: [],
    tradeCustomerList: [],
    tradeProTypeList: [],
    tradeProNameList: [],
    tradeProdList: [],
    tradeProdTypeList: [],
    tradeContractDetail:{},
  },
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname === '/tradeSafeInquire') {
            let payload =  {...location.query,loadingMore:false};
            if(location.action=='PUSH')
            {
              dispatch({
                type:'formStorage/fetchState',
                payload:{
                  formValue:{}
                },
                location:location,
              });
              payload =  {...location.query,custName:'',loadingMore:false,filterArgs:{}};
            }
            dispatch({
              type: 'tradeInquire',
              payload: payload
            });

          }
          else if (location.pathname === '/tradeSafeContract') {
            dispatch({
              type: 'tradeInquireContract',
              payload: location.state
            })
          }
          else if (location.pathname === '/tradeReject') {
            let state = location.state;
            let offset;
            // if(location.action=='PUSH') {
              offset={offset: 0};
            // }
            dispatch({
              type: 'tradeReInqu',
              payload: {...state,...offset}
            })
          }
          else if (location.pathname === '/tradeUnsubmitted') {
            let payload =  {...location.query,loadingMore:false,confStat:'0'};
            if(location.action=='PUSH')
            {
              dispatch({
                type:'formStorage/fetchState',
                payload:{
                  formValue:{}
                },
                location:location,
              });
              payload =  {...location.query,custName:'',loadingMore:false,filterArgs:{},confStat:'0'};
            }
            dispatch({
              type: 'tradeInquire',
              payload: payload
            });
          }
          else if (location.pathname === '/tradeSafeMain') {
            let state = location.state;
            console.log('state',state)
            let offset={
              offset:-1,
              confStat:'0'
            };
            dispatch({
              type: 'tradeReInqu',
              payload: {...state,...offset}
            })
            dispatch({
              type: 'tradeInquire',
              payload: {...state,...offset}
            })
          }
          else if (location.pathname === '/tradeRejectDetail') {
            let {rejectData} = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{
                      ...rejectData,
                      effectDate:rejectData.effectDate?moment(rejectData.effectDate,'YYYY-MM-DD'):zhNow,
                    },
                    list:[]
                  },
                  location:location,
                });
                dispatch({
                  type: 'tradeInquireContract',
                  payload:{
                    rejectFlag: 0,
                    id: rejectData.id,
                  }
                });
              }
            });
          }
          else if (location.pathname === '/tradeUnsubmittedDetail') {
            let {rejectData} = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{
                      ...rejectData,
                      effectDate:rejectData.effectDate?moment(rejectData.effectDate,'YYYY-MM-DD'):zhNow,
                    },
                    list:[]
                  },
                  location:location,
                });
                dispatch({
                  type: 'tradeInquireContract',
                  payload:{
                    id: rejectData.id,
                  }
                });
              }
            });
          }
          else if(location.pathname==='/tradePayRecord')
          {
            console.log('location ----------tradePayRecord',location)
            if(location.action=='PUSH')
            {
              let {mode,index,recordDetail,tradePayPic} = location.state;
              console.log('recordDetail',recordDetail)
              console.log('tradePayPic',tradePayPic)
              let recordFormValue ;
              if(mode=='modify')//修改
              {
                 recordFormValue = recordDetail;
              }
              else
              {
                recordFormValue = {};
              }

            console.log('recordFormValue',recordFormValue)
              dispatch({
                type:'formStorage/fetch',
                payload:{
                  recordFormValue:recordFormValue,
                  tradePayPic:transformToCustomerFileListOther(tradePayPic),
                }
              });
            }
          }
          else if(location.pathname==='/tradePayRecordSee')
          {
            console.log('location ----------tradePayRecord',location)
            if(location.action=='PUSH')
            {
              let {index,recordDetail,tradePayPic} = location.state;
              console.log('recordDetail',recordDetail)
              console.log('tradePayPic',tradePayPic)
              let recordFormValue ;
                recordFormValue = recordDetail;
              console.log('recordFormValue',recordFormValue)
              dispatch({
                type:'formStorage/fetch',
                payload:{
                  recordFormValue:recordFormValue,
                  tradePayPic:transformToCustomerFileListOther(tradePayPic),
                }
              });
            }
          }
          else if(location.pathname==='/tradeContractEnter')
          {
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{insureStat: '05',},
                    list:[]
                  },
                  location:location,
                });
              }
            });
          }
          else if(location.pathname==='/tradeProduct')
          {
            let {mode} = location.state;
            console.log('location.state',location.state)
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                if(mode=='productType') {
                  dispatch({
                    type:'fetchProductId',
                    payload: location.state.params,
                    location:location,
                  });
                }
                else if (mode=='people'|| mode=='assiPeople') {
                  dispatch({
                    type:'fetchCustomerList',
                    payload:  {...location.state.params,useStat:'1'},
                    location:location,
                  });
          }
                else if (mode=='manager') {
                  dispatch({
                    type:'fetchSelectProdList',
                    payload: location.state.params,
                    location:location,
                  });
                }
                else if (mode=='managerType') {
                  dispatch({
                    type:'fetchSelectShrTypeList',
                    payload: location.state.params,
                    location:location,
                  });
                }
                else {
                  dispatch({
                    type:'fetchProductName',
                    payload: {...location.state.params,useStat:'1'},
                    location:location,
                  });
                  dispatch({
                    type:'fetchProductSelect',
                    payload: {...location.state.params,useStat:'1'},
                    location:location,
                  });
                }
              }
            });
          }
          else if(location.pathname==='/tradeRejectProduct')
          {
            let {mode} = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                if(mode=='productType') {
                  dispatch({
                    type:'fetchProductId',
                    payload: location.state.params,
                    location:location,
                  });
                }
                else if (mode=='people') {
                  dispatch({
                    type:'fetchCustomerList',
                    payload: location.state.params,
                    location:location,
                  });
                }
                else {
                  dispatch({
                    type:'fetchProductName',
                    payload: {...location.state.params,useStat:'1'},
                    location:location,
                  });
                }
              }
            });
          }
        });
      },
    },
  effects: {
    *tradeInquire({ payload }, { call,put,select }) {
      yield put ({type: 'showLoading'})
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore == false) {
        offset = 0;
      }
      let param = {sort: "id", order: "desc",offset:offset,limit:10,custName:trade.custName,...filterArgs,...payload,filterArgs:undefined};
      console.log('参数',param);
      let {data} =  yield call(fetchTradeSafeInquire, parse(param));
      // console.log('---data---',data);
      let tradeSafeList = trade.tradeSafeList;
      if(data&&data.list !== undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeSafeList:offset>1?tradeSafeList.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            unsubTotal:data.total,
            offset: offset+10
          }
        });
      } else yield put({
          type:'fetch',
          payload:{
            tradeSafeList:offset>0?tradeSafeList:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *tradeInquireContract({ payload }, { call, put,select }) {
      let param = payload;
      let {data} =  yield call(fetchTradeSafeContract, parse(param));
      console.log('---data---',data);
      if(data.code=='00'&&data.model)
      {
        let model = data.model;
        yield put({
          type:'fetch',
          payload:{
            tradeContractDetail:model,
            loading:false,
          }
        });
        let insurModel = model.insurModel?model.insurModel:{};
        yield put({
          type:'formStorage/fetch',
          payload:{
            formValue:{...insurModel,effectDate:insurModel.effectDate?moment(insurModel.effectDate,'YYYY-MM-DD'):zhNow},
            list:model.list?model.list:[]
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeContractDetail:{},
            loading:false,
          }
        });
      }
    },
    *tradeReInqu({ payload }, { call, put,select }) {
      yield put({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let param = {sort: "id", order: "desc",limit: 10,offset,};
      let {data} =  yield call(fetchTradeSafeReInfo, parse(param));
      console.log('---data---',data);
      let tradeReInquList = trade.tradeReInquList;
      if(data&&data.list !== undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeReInquList:offset>1?tradeReInquList.concat(data.list):data.list,
            dataTotal: data.total,
            loading:false,
            loadingMore:false,
            offset:offset+10
          }
        });
      } else yield put({
          type:'fetch',
          payload:{
            tradeReInquList:offset>0?tradeReInquList:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *tradeSafeReModify({payload},{ call,put,select })
    {
      let params = payload.params;
      let {data} = yield call(fetchTradeSafeReModify,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *tradeSafeReDelete({payload},{ call,put,select })
    {
      let params = payload.params;
      let {data} = yield call(fetchTradeSafeReDelete,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *tradeSafeEnter({payload},{ call,put,select })
    {
      let params = payload.params;
      let {data} = yield call(fetchTradeSafeEnter,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *fetchProductSelect({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      if(trade.loadingMore==false) offset=0;
      let param = {...payload,offset:offset,limit: 15,};
      let {data} =  yield call(fetchBxProductSelect, parse(param));
      let tradeProNameSelect = trade.tradeProNameSelect;
      if(data&&data.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameSelect:offset>1?tradeProNameSelect.concat(data):data,
            loading:false,
            offset: offset+10,
            loadingMore:false
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameSelect:offset>0?tradeProNameSelect:[],
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *fetchCustomerList({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false) offset=0;
      let param = {sort: "id", order: "desc",offset:offset,limit:10,...filterArgs,...payload,filterArgs:undefined};
      console.log('参数222',param);
      let {data} =  yield call(fetchCustomerList, parse(param));
      let tradeCustomerList = trade.tradeCustomerList;
      if(data&&data.data!=undefined&&data.data.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeCustomerList:offset>1?tradeCustomerList.concat(data.data):data.data,
            loading:false,
            offset: offset+10,
            loadingMore:false
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeCustomerList:offset>0?tradeCustomerList:[],
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *fetchProductName({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false) offset=0;
      let param = {sort: "id", order: "desc",offset:offset,limit:10,custName:trade.custName,...filterArgs,...payload,filterArgs:undefined};
      console.log('参数222',param);
      let {data} =  yield call(fetchBxProductList, parse(param));
      let tradeProNameList = trade.tradeProNameList;
      if(data&&data.list!=undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameList:offset>1?tradeProNameList.concat(data.list):data.list,
            loading:false,
            offset: offset+10,
            loadingMore:false
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameList:offset>0?tradeProNameList:[],
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *fetchSelectProdList({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false) offset=0;
      let param = {sort: "id", order: "desc",offset:offset,limit:10,custName:trade.custName,...filterArgs,...payload,filterArgs:undefined};
      console.log('参数222',param);
      let {data} =  yield call(fetchSelectProdList, parse(param));
      let tradeProdList = trade.tradeProdList;
      if(data&&data!=undefined&&data.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProdList:offset>1?tradeProdList.concat(data):data,
            loading:false,
            offset: offset+10,
            loadingMore:false
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProdList:offset>0?tradeProdList:[],
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *fetchSelectShrTypeList({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      if(trade.loadingMore==false) offset=0;
      let param = {...payload,offset:offset,limit: 15,};
      let {data} =  yield call(fetchSelectShrTypeList, parse(param));
      let tradeProdTypeList = trade.tradeProdTypeList;
      if(data&&data!=undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProdTypeList:offset>1?tradeProdTypeList.concat(data):data,
            loading:false,
            loadingMore:false,
            offset: offset+10
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProdTypeList:offset>0?tradeProTypeList:[],
            loading:false,
            loadingMore:false,
          }
        });
      }
    },
    *fetchSereenProductName({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false) offset=0;
      let param = {sort: "id", order: "desc",offset:offset,limit:10,custName:trade.custName,...filterArgs,...payload,filterArgs:undefined};
      console.log('参数222',param);
      let {data} =  yield call(fetchScreProductList, parse(param));
      let tradeProNameList = trade.tradeProNameList;
      if(data&&data.list!=undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameList:offset>1?tradeProNameList.concat(data.list):data.list,
            loading:false,
            offset: offset+10,
            loadingMore:false
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProNameList:offset>0?tradeProNameList:[],
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *fetchProductId({payload},{ call,put,select }) {
      yield put ({type: 'showLoading'});
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.tradeSafe);
      let offset = trade.offset;
      if(trade.loadingMore==false) offset=0;
      let param = {...payload,offset:offset,limit: 15,};
      let {data} =  yield call(fetchKPIList, parse(param));
      let tradeProTypeList = trade.tradeProTypeList;
      if(data&&data.list!=undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            tradeProTypeList:offset>1?tradeProTypeList.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset: offset+10
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            tradeProTypeList:offset>0?tradeProTypeList:[],
            loading:false,
            loadingMore:false,
          }
        });
      }
    },

  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  },
}
