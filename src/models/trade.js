import {
  fetchBuyList,
  fetchvalidProdLevel,
  expireDeal,
  myOrder,
  fetchXttradeMain,
  fetchTradeTask,
  fetchCustShrList,
  fetchSharetransList,
  fetchSMTradeList,
  fetchCustamtList,
  fetchCustAmtDiviList,
  redeemInfoView,
  fetchCustamtView,
  fetchCustamtDiviView,
  orderView,
  fetchCapilist,
  fetchThisMonth,
  fetchBuyEnter,
  fetchAmtDelete,
  fetchCancelOrder,
  fetchSelectCustIsExists,
  fetchCreate,
  fetchInputCreate,
  fetchReject,
  uploadTradeFiles,
  delTradeFiles,
  delTradeInsuFiles,
  delTradeInsuPayRecord,
  fetchTempBuyInfo,
  transformAttachlist,
  submitTradeBuy,
  fetchContractNoList,
  AutoTransformAttachList,
  caculatorCapiTotal,
  processTransformAttachList,
  custRegAuthList,
  uploadCommonFiles,
  delPublicFiles,
  deleteLocalFile,
  uploadTradeFileName,
  getFileName,
  fetchinterestList,
  fetchpostponelist,
  fetchCustRegisterList,
  fetchCustRegisterFile,
  getDate,
  create,
  abolishPostpone,
  updateSignType,
  transformToCustomerFileList,
} from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';
import moment from 'moment';
export default {

  namespace: 'trade',
  state:{
    filterArgs:{},
    buyList:[],
    orderList:[],
    rebutList:[],
    custShrList:[],
    SMTradeList:[],
    custamtList:[],
    custAmtDiviList:[],
    tradCode:'',
    custAmtDetail:{},
    custAmtDiviDetail:{},
    keyWord:'',
    offset:1,
    custName:'',
    loading:false,
    mgrCode:'',
    model:{},
    pageNum:1,
    loadingMore:false,
    rejectFlag:'1',
    id:'',
    reach_bottom: false,
    contractNoList:[],
    fuxiTotal: null,
    postponelist: [], //延期申请列表
    custRegisterList: [], //登记注册身份验证查询列表
    custRegisterFileList: [], //登记注册身份验证查询附件
  },

  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname=='/buyXTproList'){
            let payload = {...location.query,loadingMore:false};
            if(location.action=='PUSH')
            {
                payload = {...location.query,loadingMore:false,keyWord:''};
            }
            dispatch({
               type:'fetchRemote',
               payload:payload
            });
          }
          else if(location.pathname=='/tradeMain'){
            dispatch({
               type:'fetchTradeMonth',
               payload:location.query
            });
          }
          else if(location.pathname=='/tradeExpireDeal'){
            dispatch({
               type:'fetchExpire',
               payload:location.query
            });
          }
          else if(location.pathname=='/myOrder'){
            let payload = {...location.query,loadingMore:false};
            if(location.action=='PUSH')
            {
                payload = {...location.query,loadingMore:false,keyWord:'',filterArgs:{}};
            }
            dispatch({
               type:'fetchMyOrder',
               payload:payload
            });
          }
          else if(location.pathname=='/xTTradeMain'){
            dispatch({
               type:'fetchTradeMain',
               payload:location.query
            });
          }
          else if(location.pathname=='/tradeRebut'){
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'' }
            }
            dispatch({
               type:'fetchTaskList',
               payload:payload
            });
          }
          else if(location.pathname=='/customerPositionInfo'){ //客户持仓信息列表页面
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'' }
            }
            dispatch({
              type:'fetchSharetransList',
              payload:payload
              //  payload:{...location.query,loadingMore:false}
            });
          }
          else if(location.pathname=='/tradePositionInfo'){
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'' }
            }
            dispatch({
               type:'fetchCustShrList',
               payload:payload
              //  payload:{...location.query,loadingMore:false}
            });
          }
          else if(location.pathname=='/customerTradeSearch'){
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'',filterArgs:{}}
            }
            dispatch({
               type:'fetchSMTradeList',
               payload:payload
            });
          }
          else if(location.pathname=='/fundInquire'){
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'',filterArgs:{}}
            }
            dispatch({
               type:'fetchCustamtList',
               payload:payload
            });
          }
          else if(location.pathname=='/customerShareInquire'){
            // let payload ={ ...location.query,loadingMore:false};
            // if(location.action == 'PUSH'){
             let payload = { ...location.query,loadingMore:false,keyWord:'',filterArgs:{},custAmtDiviList:[],reach_bottom: false}
            // }
            dispatch({
               type:'fetchCustAmtDiviList',
               payload:payload
            });
          }
          else if(location.pathname=='/RecallDetail'){
            let id  = location.state.id
            dispatch({
              type:'fetchInfoView',
              payload:{rejectFlag:'1',id:id}
            });
          }
          else if(location.pathname=='/BuyokInfo'){
            let id  = location.state.id
            dispatch({
              type:'fetchInfoView',
              payload:{rejectFlag:'1',id:id}
            });
          }
          else if(location.pathname=='/fundDetail'){
            dispatch({
               type:'fetchCustamtDetail',
               payload:location.query
            });
          }
          else if(location.pathname=='/customerShareDetail'){
            dispatch({
               type:'fetchCustamtDiviDetail',
               payload:location.query
            });
          }
          else if(location.pathname=='/OrderDetail'){
            dispatch({
              type:'fetchOrderView',
              payload:{...location.state,rejectFlag:'1'}
            })
          }
          else if(location.pathname=='/XTTradeInput')
          {
            let {rowData} = location.state;
            console.log('===1======',rowData);
            //来进行判断相加汇款金额为交易金额
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...rowData},//合同详情
                    capiList:[],
                    attachList:transformAttachlist(rowData.custType=='0',)
                  },
                  location:location,
                });

                dispatch({
                  type:'fetchTempBuyInfo',
                  payload:rowData
                });
              },
              popMethord:(formStorage)=>{
                console.log('==form===',formStorage);
                dispatch({
                  type:'formStorage/fetchFormValue',
                  payload:{
                    reqAmt:caculatorCapiTotal(formStorage.capiList)
                  }
                });
              }
            });
          }
          else if(location.pathname=='/contractNoSelect'){
            let {param} = location.state;
            // console.log(param,'参数====')
            dispatch({
               type:'fetchContractNoList',
               payload:param
            });
          }
          else if(location.pathname === '/regAuth'){ //登记注册身份验证查询列表
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'',filterArgs:{}}
            }
            dispatch({
              type:'fetchCustRegisterList',
              payload: payload
            });
          }
          else if(location.pathname === '/applyPending'){
            let payload ={ ...location.query,loadingMore:false};
            if(location.action == 'PUSH'){
              payload = { ...location.query,loadingMore:false,keyWord:'',filterArgs:{}}
            }
            dispatch({
              type:'fetchpostponelist',
              payload: payload
            });
          }
          else if(location.pathname === '/applyPendingupdate'){
            dispatch({
              type:'formStorage/fetch',
              payload:{
                postponePic:[]
              }
            });
          }
         /* else if(location.pathname === '/rebutdelaymodify'){
            let { data,rowData } = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...data.tradeModel,remitDate:rowData.remitDate?moment(rowData.remitDate,'YYYY-MM-DD'):moment()},
                    remiPic:transformToCustomerFileList(data.attachList),
                  },
                  location:location
                });
              }
            });
          }*/

        });
      },
  },

  effects: {
    *fetchRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {sort:'ord.createTime',order:'desc',keyWord:trade.keyWord,offset:(offset-1)*10,limit:10};
      let {data} = yield call(fetchBuyList,param);
      //console.log('1111111111111111',data);
      let dataSource = trade.buyList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
         yield put({
           type:'fetch',
           payload:{
             buyList:offset>1?dataSource.concat(data.list):data.list,
             loading:false,
             loadingMore:false,
             offset:offset + 1,
             reach_bottom:data.list.length<10
           }
         });
    }
      else  yield put({
         type:'fetch',
         payload:{
           buyList:offset>1?dataSource:[],
           loading:false,
           loadingMore:false,
           reach_bottom:true
         }
       });
    },
    *fetchvalidProdLevel({payload},{call,select,put})
    {
      let params = payload;
      let { data } = yield call (fetchvalidProdLevel,params,);
      payload.backMethord(data)
    },
    *fetchTradeMonth({ payload }, { call, put,select }) {
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let param = {};
      let {data} = yield call(fetchThisMonth,param);
      //console.log('1111111111111111',data);
      if(data&&data.code=='00')
      {
         yield put({
           type:'fetch',
           payload:{
             model:data.model?data.model:{},
             loading:false
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           model:{},
           loading:false
         }
       });
    },
    *fetchExpire({ payload }, { call, put,select }) {
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {keyWord:trade.keyWord,offset:(offset-1)*10,limit:10};
      let {data} = yield call(expireDeal,parse(param));
      //console.log('即将到期',data);
      // let dataSource = data.list;
      // console.log(dataSource[0].prodName);
      let dataSource = trade.buyList;
      if(data&&data.code=='00'&&data.list!=undefined)
      {
         yield put({
           type:'fetch',
           payload:{
             buyList:offset>1?dataSource.concat(data.list):data.list,
             loading:false,
             loadingMore:false,
             offset:offset+1
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           buyList:offset>1?dataSource:[],
           loading:false,
           loadingMore:false
         }
       });
    },
    *fetchTempBuyInfo({ payload }, { call, put,select })
    {
      let orderId = payload.orderId;
      let {data} = yield call(fetchTempBuyInfo,{orderId:orderId});
      if(data&&data.code=='00'&&data.model)
      {
        let tradeModel = data.model.tradeModel;
        let capiList = data.model.capiList;
        yield put({
          type:'formStorage/fetch',
          payload:{
            formValue:{...tradeModel,
              inveType:data.model.inveType,
              valid:data.model.valid,
              reqAmt:tradeModel&&tradeModel.reqAmt?tradeModel.reqAmt:caculatorCapiTotal(capiList),
              remitDate:tradeModel&&tradeModel.remitDate?moment(tradeModel.remitDate,'YYYY-MM-DD'):moment()
            },
            capiList:capiList?capiList:[],
            // attachList:transformAttachlist(tradeModel.custType=='0',data.model.attachList),
            attachList:transformAttachlist(tradeModel.custType=='0',data.model.valid,data.model.attachList, tradeModel.inveMatrFlag),
          }
        });
      }
    },
    *uploadTradeFiles({ payload }, { call, put,select })
    {
      let {params,images,backMethord} = payload;
      let {data} = yield call(uploadTradeFiles,params,images);
      backMethord(data);
      // uploadTradeFiles
    },
    //uploadTradeFileName
    *uploadTradeFileName({ payload }, { call, put,select }){
      let {params,backMethord} = payload;
      // console.log('uploadTradeFileName line 342',params)
      let {data} = yield call(uploadTradeFileName,params);
      backMethord(data);
    },
 *deleteLocalFile({ payload }, { call, put, select }) {
      const { backMethord } = payload
      const params = { path: payload.path }
      const { data } = yield call(deleteLocalFile, parse(params));
      backMethord(data);
    },
    *getFileName({ payload }, { call, put,select }){
      let {params,backMethord} = payload;
      // console.log('getFileName line 349',params)
      let {data} = yield call(getFileName,params);
      backMethord(data);
    },

    *uploadTradeCommonFiles({payload},{call,put,select})
    {
      let {params,images,backMethord} = payload;
      console.log('---uploadTradeCommonFiles---');
      let {data} = yield call(uploadCommonFiles,params,images);
      backMethord(data);
    },
    *delTradeFiles({ payload }, { call, put,select })
    {
      let {delList,backMethord} = payload;
      let {data} = yield call(delTradeFiles,{delist:delList});
      backMethord(data);
    },
    //缴费记录附件删除
    *delTradeInsuFiles({ payload }, { call, put, select }) {
      let {delList,backMethord} = payload;
      const params = payload.delList
      let {data} = yield call(delTradeInsuFiles,parse(params));
      backMethord(data);
    },
    //缴费记录删除
    *delTradeInsuPayRecord({ payload }, { call, put, select }) {
      let {delList,backMethord} = payload;
      const params = payload.delList
      let {data} = yield call(delTradeInsuPayRecord,parse(params));
      backMethord(data);
    },
    *delPublicFiles({ payload }, { call, put, select }) {
      const { delList, backMethord } = payload;
      const { data } = yield call(delPublicFiles, { delist: delList });
      backMethord(data);
    },
    *submitTradeBuy({ payload }, { call, put,select })
    {
      let {params,backMethord} = payload;
      let {data} = yield call(submitTradeBuy,params);
      backMethord(data);
    },
    *fetchMyOrder({ payload }, { call, put,select })
    {
      yield put({type:'showLoading'});
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      let filterArgs  = trade.filterArgs;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {
            sort:'createTime',
            order:'desc',
            keyWord:trade.keyWord,
            custName:trade.custName,
            offset:(offset-1)*10,
            limit:10,
            ...filterArgs,
            ...payload,
            filterArgs:undefined
          };
      let {data} = yield call(myOrder,param);

      let dataSource = trade.orderList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
         yield put({
           type:'fetch',
           payload:{
             orderList:offset>1?dataSource.concat(data.list):data.list,
             loading:false,
             loadingMore:false,
             offset:offset + 1
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           orderList:offset>1?dataSource:[],
           loading:false,
           loadingMore:false
         }
       });
    },
    *fetchTaskList({ payload }, { call, put,select }) {
      yield put({type:'showLoading'});
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(offset-1)*10,limit:10,...payload,...trade.filterArgs};
      let {data} = yield call(fetchTradeTask,param);
      let dataSource=trade.buyList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
         yield put({
           type:'fetch',
           payload:{
             buyList:offset>1?dataSource.concat(data.list):data.list,
             tradCode:data.tradCode,
             loading:false,
             loadingMore:false,
             offset:offset+1
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           buyList:offset>1?dataSource:[],
           tradCode:'',
           loading:false,
           loadingMore:false
         }
       });
    },
    *fetchSharetransList({ payload }, { call, put,select }){
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let trade = yield select(state=>state.trade);
      let pageNum = trade.pageNum;
      if(trade.loadingMore==false){
        pageNum = 1;
      }
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(pageNum-1)*10,limit:10};
      const {data}  = yield call(fetchSharetransList, parse(param));
      let list = trade.custShrList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            custShrList:pageNum>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custShrList:pageNum>1?list:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchCustShrList({ payload }, { call, put,select }){
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let trade = yield select(state=>state.trade);
      let pageNum = trade.pageNum;
      if(trade.loadingMore==false){
        pageNum = 1;
      }
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(pageNum-1)*10,limit:10};
      const {data}  = yield call(fetchCustShrList, parse(param));
      let list = trade.custShrList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            custShrList:pageNum>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custShrList:pageNum>1?list:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchSMTradeList({ payload }, { call, put,select }){
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let trade = yield select(state=>state.trade);
      let pageNum = trade.pageNum;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false){
        pageNum = 1;
      }
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(pageNum-1)*10,limit:10,...filterArgs,...payload,filterArgs:undefined};
      let {data}  = yield call(fetchSMTradeList, param);
      let list = trade.SMTradeList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            SMTradeList:pageNum>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          SMTradeList:pageNum>1?list:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchCustamtList({ payload }, { call, put,select }){
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false){
        offset = 1;
      }
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(offset-1)*10,limit:10,...filterArgs,...payload,filterArgs:undefined};
      let {data}  = yield call(fetchCustamtList, param);
      let list = trade.custamtList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            custamtList:offset>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset:offset+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custamtList:offset>1?list:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchCustAmtDiviList({ payload }, { call, put,select }){
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let trade = yield select(state=>state.trade);
      let pageNum = trade.pageNum;
      let filterArgs = trade.filterArgs;
      if(trade.loadingMore==false){
        pageNum = 1;
      }
      let param = {sort:'createTime',order:'desc',keyWord:trade.keyWord,offset:(pageNum-1)*10,limit:10,...filterArgs,...payload,filterArgs:undefined};
      let {data}  = yield call(fetchCustAmtDiviList, param);
      let list = trade.custAmtDiviList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            custAmtDiviList:pageNum>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            pageNum:pageNum+1,
            reach_bottom: data.list.length < 10,
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custAmtDiviList:pageNum>1?list:[],
          loading:false,
          loadingMore:false,
          reach_bottom: true,
        }
      });
    },
    *fetchTradeMain({ payload }, { call, put,select }) {
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let param = {};
      const params = { offset: 0, limit: 5, keyWord: '' };
      let {data} = yield call(fetchXttradeMain,param);
      let result =  yield call(fetchinterestList, parse(params));
      if(data&&data.code=='00')
      {
        yield put({
           type:'fetch',
           payload:{model:data&&data.model?data.model:{}, fuxiTotal: result.data ? result.data : null,
         }
         });
      }
      else  yield put({
           type:'fetch',
           payload:{model:{}, fuxiTotal: null}
         });
    },
    *fetchInfoView({ payload }, {call,put,select}) {
      let param = {id:payload.id,rejectFlag:payload.rejectFlag};
      let { data } = yield call(redeemInfoView,param);
      console.log('++++++++++++',data);

      let attachList = [];
      if(data&&data.code=='00'&&data.model)
      {
        let resultModel = data.model;
        let attachList = resultModel.attachList;
        let tradeModel = resultModel.tradeModel;
        if(attachList&&attachList.length>0)
        {
          attachList = processTransformAttachList(tradeModel,resultModel.valid,attachList);
          //  console.log('---转换后结果是--',AutoTransformAttachList(attachList));
        }
        else attachList = [];
        resultModel.attachList = attachList;
        yield put({
          type:'fetch',
          payload:{
            model:resultModel,
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            model:{
              attachList:[]
            },
          }
        });
      }

    },
    *fetchCustamtDetail({ payload }, { call, put,select }){
      let trade = yield select(state=>state.trade);
      let {touchItem} = trade;
      let param = {id:touchItem.id};
      const {data}  = yield call(fetchCustamtView, parse(param));
      yield put({
        type:'fetch',
        payload:{
          custAmtDetail:data&&data.code==='00'?data.model:{}
        }
      });
    },
    *fetchCustamtDiviDetail({ payload }, { call, put,select }){
      let trade = yield select(state=>state.trade);
      let {touchItem} = trade;
      let param = {id:touchItem.id};
      const {data}  = yield call(fetchCustamtDiviView, parse(param));
      yield put({
        type:'fetch',
        payload:{
          custAmtDiviDetail:data&&data.code==='00'?data.model:{}
        }
      });
    },
    *fetchOrderView({ payload }, {call,put,select}) {
      let param = {id:payload.id,rejectFlag:payload.rejectFlag};
      let { data } = yield call(orderView,param);
      // console.log('kbgkbgjkbgkjbgkjbjkb',data );
      yield put({
        type:'fetch',
        payload:{
          model:data&&data.model?data.model:{},
        }
      });
    },
    *editTradeCapi({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchCapilist,params,payload.mode);
      payload.backMethord(data);
    },
    *fetchBuyInput({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchBuyEnter,params,payload.mode);
      payload.backMethord(data);
    },
    *fetchOrderCancel({payload},{ call,put,select })
    {
      let params = payload;
      let { data } = yield call (fetchCancelOrder,params);
      payload.backMethord(data);
    },
    *fetchSelectCustIsExists({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchSelectCustIsExists,params);
      payload.backMethord(data);
    },
    *fetchInputCreate({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchInputCreate,params);
      payload.backMethord(data);
    },
    *fetchReject({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchReject,params);
      payload.backMethord(data);
    },
    *fetchCreate({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchCreate,params);
      payload.backMethord(data);
    },
    *fetchContractNoList({ payload }, { call, put,select }) {
      let {data} = yield call(fetchContractNoList,payload);
      if(data&&data.code=='00')
      {
         yield put({
           type:'fetch',
           payload:{
             contractNoList:data.list?data.list:[],
           }
         });
      }
      else  yield put({
         type:'fetch',
         payload:{
           contractNoList:[],
         }
       });
    },
    //登记注册身份验证附件查询
    *fetchCustRegisterFile({ payload }, {call,put,select}) {
      let trade = yield select(state=>state.trade);
      let param = {custId:payload.id};
      console.log('param',param)
      let { data } = yield call(fetchCustRegisterFile,param);
      let dataSource = trade.custRegisterFileList;
      if(data&&data.code=='00'&&data.list!=undefined)
      {
        let custRegisterFileList = data.list
        if(custRegisterFileList && custRegisterFileList.length>0){
          custRegisterFileList = custRegAuthList(custRegisterFileList)
        }else{
          custRegisterFileList = []
        }
        data.list = custRegisterFileList
        yield put({
          type:'fetch',
          payload:{
            custRegisterFileList:custRegisterFileList,
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custRegisterFileList:[],
        }
      });

    },
    //登记注册身份验证查询列表
    *fetchCustRegisterList ({ payload }, { call, put,select }){
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {keyWord:trade.keyWord,offset:(offset-1)*10,limit:10};
      let { data } = yield call (fetchCustRegisterList, param);
      let dataSource = trade.custRegisterList;
      if(data&&data.code=='00'&&data.list!=undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            custRegisterList:offset>1?dataSource.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset:offset+1,
            reach_bottom: data.list.length < 10
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          custRegisterList:offset>1?dataSource:[],
          loading:false,
          loadingMore:false,
          reach_bottom: true,

        }
      });
    },
    *fetchpostponelist ({ payload }, { call, put,select }){
      yield put({
        type:'fetch',
        payload:{...payload,loading:true}
      });
      let trade = yield select(state=>state.trade);
      let offset = trade.offset;
      if(trade.loadingMore==false)
        offset = 1;
      let param = {keyWord:trade.keyWord,offset:(offset-1)*10,limit:10};
      let { data } = yield call (fetchpostponelist, param);
      let dataSource = trade.postponelist;
      if(data&&data.code=='00'&&data.list!=undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            postponelist:offset>1?dataSource.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            offset:offset+1,
            reach_bottom: data.list.length < 10
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          postponelist:offset>1?dataSource:[],
          loading:false,
          loadingMore:false,
          reach_bottom: true,

        }
      });
    },
    *getDate ({ payload }, { call, put,select }){
      yield put({
        type:'fetch',
        payload:{...payload}
      });
      let param = {endDate: payload.params.endDate,postponeCount:payload.params.days};
      let {data} = yield call (getDate, parse(param));
      if(data.code === '00'){
        payload.backMethod(data.endDate)
      }
    },
    *create ({ payload }, { call, put,select }){
      yield put({
        type:'fetch',
        payload:{...payload}
      });
      let result = yield call (create, payload.params);
      console.log('@@@@@@@@@---', result)
      if(result.data.code == '00'){
         payload.backMethod(result.data)
      }
    },
    //以下不是作废的请求
    *abolishPostpone ({ payload }, { call, put,select }){
      yield put({
        type:'fetch',
        payload:{...payload}
      });
      let result = yield call (abolishPostpone, payload.params);
      console.log('zuofei', result)
      if(result.data.code == '00'){
      payload.backMethod(result.data)
      }
    },
    *updateSignType({payload},{call,select,put}){
      let params = payload;
      let { data } = yield call (updateSignType,params,);
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
