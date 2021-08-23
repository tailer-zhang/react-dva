import {fetchBankInquire,fetchBankInquirePer,fetchBankStartDisable,
        fetchBankChange,fetchBankModify,fetchBankCreate,fetchCusChangeList,fetchCusPositionList, applyRecordsList,
  rejectList,abolish,modifySubmit, getBankChangeList, getDetails, changeUpdate} from '../services/bank';
import { fetchRejectTimeline, fetchSelectCustInfoList } from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { List,InputItem,Toast } from 'antd-mobile';
import {decryptStr} from '../utils/createEncrypt';
import moment from 'moment';
import {fetchPrivateInputList} from "../services/trade";

export default {
  namespace: 'bank',
  state:{
    offset: 0,
    loading:false,
    loadingMore:false,
    BankInquList: [],
    BankCustList: [],
    modifyList: [],
    pageNum: 1,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
    cusPositionList: [],
    bankAccountList:[],
    recordsList:[],
    rejectList: [],
    progressList: [],
    accountDetails: {} //受益账户变更详情
  },
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname === '/secCustomer') {
            dispatch({
              type: 'bankInquire',
              payload: location.state
            })
          }else if (location.pathname === '/customerModify' || location.pathname === '/openBankModify'){
            dispatch({
              type: 'fetchModifyList',
              payload: {
                modifyList: [],
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                keyWord: '',
              },
            })
          }else if (location.pathname === '/custPositionList'){
            dispatch({
              type: 'fetchPositionList',
              payload: {
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                cusPositionList: [],
                source: location.state
              },
            })
          }else if (location.pathname === '/bankAccountCnt'){
            dispatch({
              type: 'fetchbankAccountList',
              payload: {
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                bankAccountList: [],
                source: location.state
              },
            })
          }else if (location.pathname === '/bankAccountModifyCnt'){
            dispatch({
              type: 'getDetails',
              payload: {
                source: location.state
              },
            })
            dispatch({
              type: 'formStorage/fetchState',
              payload: {
                changeList:[]
              }
            });
          } else if(location.pathname === '/selectBankCus'){
            console.log(' location.state33333', location.state)
            let {transInfo} = location.state;
            if(transInfo == '0'){
              dispatch({
                type: 'fetchSelectCustInfoList',
                payload: {
                  pageNum: 1,
                  loadingMore: false,
                  reach_bottom: false,
                  filterArgs: {},
                  cusPositionList: [],
                  source: location.state
                },
              })
            }else{
              dispatch({
                type: 'bankCardInquire',
                payload: {
                  pageNum: 1,
                  loadingMore: false,
                  reach_bottom: false,
                  filterArgs: {},
                  cusPositionList: [],
                  source: location.state
                },
              })
            }
          }else if(location.pathname === '/cusRecordsDetail' || location.pathname === '/rebutDetail'){
            dispatch({
              type: 'fetchRejectTimeline',
              payload: { params: { reqId: location.state.reqNo } },
            })
          }else if(location.pathname === '/accountChangeDetails' || location.pathname === '/rebutBankDetail'){
            dispatch({
              type: 'fetchRejectTimeline',
              payload: { params: { reqId: location.state.reqNo } },
            })
          }else if(location.pathname === '/applyRecordsList'){
            dispatch({
              type: 'getRecordsList',
              payload: {
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                recordsList: [],
                source: location.state,
                keyWord: ''
              },
            })
          }else if(location.pathname === '/bankRebutCnt' || location.pathname === '/xTTradeMain'){
            dispatch({
              type: 'getRejectList',
              payload: {
                pageNum: 1,
                loadingMore: false,
                reach_bottom: false,
                filterArgs: {},
                rejectList: [],
                keyWord: '',
                source: location.state
              },
            })
          }
          else if (location.pathname === '/bankCardManage') {//银行卡管理
            let {filterArgs,custId} = location.state;
            let payload = {...filterArgs,custId:custId,offset:0};
            dispatch({
              type:'fetch',
              payload:{
                BankCustList:[]
              }
            });
            dispatch({
              type: 'bankCardInquire',
              payload: payload,
              location:location,
            });
          }
          else if (location.pathname === '/bankChange') {
              dispatch({
                type:'formStorage/initState',
                location:location,
                initMethord:()=>{
                  dispatch({
                    type:'formStorage/fetchState',
                    payload:{
                      formValue:{},
                      chaCardPic:[],
                      operCertPic: [],
                      card: {},
                      card1: {}
                    },
                    location:location,
                  });
                }
              });
          }
          else if (location.pathname === '/oldBankUser') {
            dispatch({
              type: 'bankCardList',
              payload: location.state
            })
          }
          else if (location.pathname === '/newBankUser') {
            dispatch({
              type: 'bankCardList',
              payload: location.state.params
            })
          }
          else if(location.pathname === '/newBankId') {//新增银行客户&修改
            let mode = location.state.mode;
            let formValue = {};

            if(mode=='add') {
              formValue = {};
            } else{
              let {data} = location.state;
              formValue = data;
            }
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    bankFormValue:formValue
                  },
                  location:location,
                });
              }
            });
            // dispatch({
            //   type:'formStorage/fetchState',
            //   payload:{
            //     formValue:data,
            //   },
            //   jumpAction:location.action,
            // });

          }
        });
      },
    },
  effects: {
    *bankInquire({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let bank = yield select(state => state.bank);
      let offset = bank.offset;
      if(bank.loadingMore==false)
        offset = 0;
      let param = {offset,limit: 10,...payload};
      let {data} =  yield call(fetchBankInquire, parse(param));
      console.log('---data---',param);
      console.log("银行卡变更客户====",data.list);

      let list = bank.BankInquList;
      if(data&&data.list !== undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            BankInquList:offset>0?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset: offset+10
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            BankInquList:offset>0?list:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *bankCardInquire({ payload }, { call, put,select }) {
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let param = {custId: payload.custId || payload.source.originData.data.custId || payload.source.originData.data.id};
      let {data} =  yield call(fetchBankInquirePer, parse(param));
      if(data&&data.list !== undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            BankCustList: data.list,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            BankCustList:[]
          }
        });
    },
    *bankCardList({ payload }, { call, put,select }) {
      let param = {offset: -1,limit: 1000,...payload};
      console.log(param);
      let {data} =  yield call(fetchBankInquirePer, parse(param));
      console.log('---data---',data);
      if(data&&data.list !== undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            BankCustList:data.list,
            loading:false,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            BankCustList:[],
            loading:false,
          }
        });
    },
    *bankStartDisable({ payload }, { call, put,select }) {
      let param = payload.params;
      let {data} =  yield call(fetchBankStartDisable, parse(param));
      console.log('---data---',data);
      payload.backMethord(data);
      if(data&&data.model !== undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            BankStart:data.model,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            BankStart:'',
          }
        });
    },
    *bankCustChange({ payload }, { call, put,select }) {
      let params = payload.params;
      let {data} = yield call(fetchBankChange,params);
      console.log('----data----',data);
      payload.backMethord(data);
    },
    *bankModify({ payload },{ call, put,select }) {
      let params = payload.params;
      let {data} = yield call(fetchBankModify,params);
      console.log('----data----',data);
      payload.backMethord(data);
    },
    *bankCreate({ payload },{ call, put,select }) {
      let params = payload.params;
      let {data} = yield call(fetchBankCreate,params);
      console.log('----data----',data);
      payload.backMethord(data);
    },
    *fetchModifyList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const bank = yield select(state => state.bank);
      let pageNum = bank.pageNum;
      if (bank.loadingMore === false) {
        pageNum = 1;
      }
      const arg = bank.filterArgs ? bank.filterArgs : {};
      const keyword = bank.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, custName: keyword };
      const list = bank.modifyList;
      const { data } = yield call(fetchCusChangeList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            modifyList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },
    *fetchPositionList({payload}, {call, put, select}){
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const bank = yield select(state => state.bank);
      let pageNum = bank.pageNum;
      if (bank.loadingMore === false) {
        pageNum = 1;
      }
      const param = { offset: (pageNum - 1) * 10, limit: 10, custId:payload.source.data.id};
      const list = bank.cusPositionList;
      const { data } = yield call(fetchCusPositionList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            cusPositionList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },
    *fetchbankAccountList({payload}, {call, put, select}){
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const bank = yield select(state => state.bank);
      let pageNum = bank.pageNum;
      if (bank.loadingMore === false) {
        pageNum = 1;
      }
      const param = { offset: (pageNum - 1) * 10, limit: 10, custId:payload.source.data.id};
      const list = bank.bankAccountList;
      const { data } = yield call(getBankChangeList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            bankAccountList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },
    *getDetails({ payload },{ call, put,select }) {
      let {data} = yield call(getDetails,{id: payload.source.data.id});
      if(data.code === '00' && data.model && data.model.privateProductList){
         yield put({
           type: 'fetch',
           payload: {
             accountDetails: data.model
           }
         })
      }
    },
    *getRecordsList({payload}, {call, put, select}){
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const bank = yield select(state => state.bank);
      let pageNum = bank.pageNum;
      if (bank.loadingMore === false) {
        pageNum = 1;
      }
      const arg = bank.filterArgs ? bank.filterArgs : {};
      const keyword = bank.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = bank.recordsList;
      const { data } = yield call(applyRecordsList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            recordsList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },
    *getRejectList({payload}, {call, put, select}){
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const bank = yield select(state => state.bank);
      let pageNum = bank.pageNum;
      if (bank.loadingMore === false) {
        pageNum = 1;
      }
      const arg = bank.filterArgs ? bank.filterArgs : {};
      const keyword = bank.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = bank.rejectList;
      const { data } = yield call(rejectList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            rejectList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },
    *abolish({payload},{call, put, select}){
      let param = payload.params
      const { data } = yield call(abolish, parse(param));
      payload.backMethod(data)
    },

    *fetchSelectCustInfoList({ payload }, { call, put,select }) {
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let param = {
        targetName: payload.source.targetName ,
        targetCertType: payload.source.targetCertType ,
        targetCertNo: payload.source.targetCertNo
      };
      let {data} =  yield call(fetchSelectCustInfoList, parse(param));
      if(data&&data.list !== undefined&&data.list.length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            BankCustList: data.list,
          }
        });
      } else  yield put({
        type:'fetch',
        payload:{
          BankCustList:[]
        }
      });
    },
    *fetchRejectTimeline({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      const { data } = yield call(fetchRejectTimeline, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        const timeLineList = data.list;
        yield put({
          type: 'fetch',
          payload: {
            progressList: data.list,
          },
        });
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            progressList: timeLineList,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            progressList: [],
          },
        });
      }
    },
    *modifySubmit({ payload },{ call, put,select }) {
      let params = payload.params;
      let {data} = yield call(modifySubmit,params);
      payload.backMethod(data);
    },
    *changeUpdate({ payload },{ call, put,select }) {
      let params = payload.params;
      let {data} = yield call(changeUpdate,params);
      payload.backMethod(data);
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
