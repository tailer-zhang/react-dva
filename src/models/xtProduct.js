import {fetchProductList,fetchTodayProductList, fetchOtherProductList, fetchProductDetail,fetchNetWorthList,fetchFillList,fetchTypeList,XTProductOrder,
    fetchProductDetailFull,fetchPreProductList,fetchMeetingDetail,fetchBuyCustomerList,
    sortBuyCustomerList,checkCustomerIsCommon,addShareLog,fetchPreprocessList,submitUpdate,ifAlert,getTimeLimits,
    recordVisitTimes,fetchNotifyProductList, getWillOrderDate
} from '../services/xtProduct';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';
import {fetchPayProofList} from "../services/trade";

let productRegex = pathToRegexp('/productMain/:type',[]);

export default {

  namespace: 'xtProduct',

  state: {
    list:[],
    processList:[],
    showData: false,
    fileList:[],
    typeList:[],
    todayList:[],
    otherList:[],
    prodName: '',
    loading: false,
    page: 1,
    loadingMore:false,
    sortOrder:1,
    rate:'',
    filterArgs:{},

    touchItem:{},
    productDetail:{},
    navList:[], //净值趋势
    selectShrType:undefined,
    typeDetail:{},//份额类别

    onLineList:[],
    defaultActiveKey:undefined,
    loadingTags:{
        loading: false,
        page: 1,
        loadingMore:false,
    },
    meetingDetail:{},

    buyCustomerList:[],
    customerLoadingTags:{
        loading:false,
        page:1,
        loadingMore:false,
        prodId:undefined,//产品id
        sortFlag:0,//0表示降序，1表示升序
        sortAttr:undefined//排序的属性
    },
    todayProductStatus:0,
    judgeStartDate: '',
    judgeEndDate: '',
    pageNum: 1,
    reach_bottom: false,
    keyWord: '',
    detailMode: '',
    notifyProduct:{
      notifyList:[],
      pageNum: 1,
      loadingMore: false,
      loading: false,
    },
    notifyRow:{},
      willOrderData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/productMain'||(productRegex.exec(location.pathname)&&location.pathname!=='/productMain/bx')) {
            let payload = {};

            if(location.action=='PUSH'){
                payload.filterArgs={};
                payload.prodName = '';
            }

            if (location.state != null && location.state.prodName) {
              payload.prodName = location.state.prodName;
            }

            dispatch({
              type:'fetchRemote',
              payload: {...payload,...location.query}
            });
        }
        else if (productRegex.exec(location.pathname)&&location.pathname!=='/otherProduct/bx') {
            let payload = {};
            if(location.action=='PUSH'){
                payload.filterArgs={};
                payload.prodName = '';
            }

            if (location.state != null && location.state.prodName) {
              payload.prodName = location.state.prodName;
            }


            // dispatch({
            //   type:'fetchRemote',
            //   payload: {...payload,...location.query}
            // });

        }else if(location.pathname === '/otherProduct'){
          dispatch({
            type: 'fetchOtherProdRemote',
            payload: {
              otherList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
            },
          })
        }
        else if (location.pathname === '/todayProduct'||(productRegex.exec(location.pathname)&&location.pathname!=='/todayProduct/bx')) {
            let payload = {};
            if(location.action=='PUSH'){
                payload.filterArgs={};
                payload.prodName = '';
            }

            if (location.state != null && location.state.prodName) {
              payload.prodName = location.state.prodName;
            }

            // dispatch({
            //   type:'fetchTodayProdRemote',
            //   payload: {...payload,...location.query}
            // });
        }
        else if(location.pathname === '/onlineProductList'){
            dispatch({
                type:'fetchPreProductList',
                payload:{
                    loadingTags:{
                        loading:true
                    }
                }
            });
        }
        else if(location.pathname==='/productDetail')
        {
          // console.log('xtProduct line 120',location.state);
          dispatch({
            type:'fetchProductFullDetail',
            payload:location.query,
            fetchData:{
                touchItem:location.state,
                defaultActiveKey:location.action=='PUSH'?'1':undefined
            }
          });
        }
        else if(location.pathname==='/ProDetailNobtn')
        {
          dispatch({
            type:'fetchProductFullDetail',
            payload:location.query,
            fetchData:{
                touchItem:location.state,
                defaultActiveKey:location.action=='PUSH'?'1':undefined
            }
          });
        }
        else if(location.pathname==='/productQrnh')
        {
          dispatch({
            type:'fetchProductFullDetail',
            payload:location.query,
            fetchData:{
                touchItem:location.state,
            }
          });
        }
        else if(location.pathname==='/appoint')
        {
            // dispatch({
            //     type: 'getWillOrderDate',
            //     payload: location.state.data.productDetail
            // })
          // if(location.action=='PUSH'){
          dispatch({
            type: 'getTimeLimits',
            payload:location.state
          })
          dispatch({
            type:'formStorage/initState',
            location:location,
            initMethord:()=>{
              dispatch({
                type:'formStorage/fetchState',
                payload:{
                  formValue:{}
                },
                location:location,
              });

            }
          });
        }
        else if(location.pathname==='/holdMeeting'){
            dispatch({
                type:'fetchMeetingDetail',
                payload:location.state?location.state:{},
                meetingDetail:{}
            });
        }
        else if(location.pathname==='/buyCustomer'){
            let pushParams = {};
            if(location.action=='PUSH'){
                pushParams = {
                    sortFlag:0,
                    sortAttr:'',
                    loading:true,
                    };
            }
            dispatch({
                type:'fetchBuyCustomerList',
                payload:{
                    prodId:location.state.id,
                    loadingMore:false,
                    page:1,
                    ...pushParams
                },
                initalBuyCustomerList:location.action=='PUSH'?[]:undefined
            });
        }else if (location.pathname === '/proHoldSpeed'){
            dispatch ({
              type: 'fetchPreprocessList',
              payload: location.state ? location.state : {}
            })
        }else if(location.pathname === '/ProductNotify'){
            dispatch({
              type:'getNotifyProductList'
            })
        } else if(location.pathname ==='/salePreview'){
          console.log(location.state)
            dispatch({
              type:'fetch',
              payload:location.state?location.state:{}
            })
        }
      });
    },
  },

  effects: {
    //你把你的筛选功能改成出发这个函数试试 怪了  应该出发这个函数
    *fetchRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let xtProduct = yield select(state => state.xtProduct);

      let page = xtProduct.page;
      if(xtProduct.loadingMore==false)
           page = 1;
      let param = {offset:(page-1)*10,limit:10,prodName:xtProduct.prodName,sortOrder:xtProduct.sortOrder,...xtProduct.filterArgs};
      const {data}  = yield call(fetchProductList, parse(param));
      let list = xtProduct.list;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            list:page>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            page:page+1
          }
        });
      }
      else  yield put({
          type:'fetch',
          payload:{
            list:page>1?list:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *fetchOtherProdRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });


      let xtProduct = yield select(state => state.xtProduct);
      let pageNum = xtProduct.pageNum;
      if (xtProduct.loadingMore === false) {
        pageNum = 1;
      }
      const keyword = xtProduct.keyWord;
      let param = {sortOrder:xtProduct.sortOrder,...xtProduct.filterArgs,offset: (pageNum - 1) * 10, limit: 10, prodName: keyword};
      const {data}  = yield call(fetchOtherProductList, parse(param));
      let list = xtProduct.otherList;
      console.log('1111111', list, data)
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            otherList:list.concat(data.list),
            loadingMore:false,
            pageNum: pageNum + 1,
            reach_bottom: data.list.length < 10,
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            otherList:[],
             loading:false,
            loadingMore:false,
            pageNum: 1,
            reach_bottom: true,
          }
        });
      }
    },
    // 排序专用
    *fetchOtherProdRemote2({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });


      let xtProduct = yield select(state => state.xtProduct);
      let pageNum = xtProduct.pageNum;
      if (xtProduct.loadingMore === false) {
        pageNum = 1;
      }
      const keyword = xtProduct.keyWord;
      let param = {sortOrder:xtProduct.sortOrder,...xtProduct.filterArgs,offset: (pageNum - 1) * 10, limit: 10, prodName: keyword};
      const {data}  = yield call(fetchOtherProductList, parse(param));
      let list = xtProduct.otherList;
      console.log('1111111', list, data)
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            otherList:data.list,
            loadingMore:false,
            pageNum: pageNum + 1,
            reach_bottom: data.list.length < 10,
          }
        });
      }
      else {
        yield put({
          type:'fetch',
          payload:{
            otherList:[],
             loading:false,
            loadingMore:false,
            pageNum: 1,
            reach_bottom: true,
          }
        });
      }
    },
    *fetchTodayProdRemote({ payload }, { call, put,select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
      });
      let xtProduct = yield select(state => state.xtProduct);

      let page = xtProduct.page;
      if(xtProduct.loadingMore==false)
        page = 1;
      let param = {offset:0,limit:50,prodName:xtProduct.prodName};
      const {data}  = yield call(fetchTodayProductList, parse(param));
      let list = xtProduct.list;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            todayList:page>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            page:page+1
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          todayList:page>1?list:[],
          loading:false,
          loadingMore:false
        }
      });
    },
    //获取待上线产品
    *fetchPreProductList({ payload }, { call, put,select }){
        if(payload&&payload.loadingTags){
            yield put({
                type:'fetchLoadingTags',
                payload:payload.loadingTags
            });
        }
        let xtProduct = yield select(state => state.xtProduct);
        let {page,loading,loadingMore} = xtProduct.loadingTags;
        if(!loadingMore)
          page = 1;
        let param = {offset:(page-1)*10,limit:10};
        let {data} = yield call(fetchPreProductList,parse(param));
        let onLineList = xtProduct.onLineList;
        if(data&&data.list&&data.list.length>0){
            if(page>1){
                onLineList = onLineList.concat(data.list);
                page = page +1;
            }
            else {
                onLineList = data.list;
                page = page+1;
            }
        }
        else {
            if(page==1){
                onLineList = [];
            }
        }
        yield put({
            type:'fetch',
            payload:{
                onLineList:onLineList,
                loadingTags:{
                    ...xtProduct.loadingTags,
                    page:page,
                    loadingMore:false,
                    loading:false
                }
            }
        });

    },
    //产品详情
    *fetchProductDetail({ payload }, { call, put,select })
    {
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem} = xtProduct;
      console.log('---------',touchItem);
      let param = {prodId:touchItem.prodId};
      const {data}  = yield call(fetchProductDetail, parse(param));
      console.log('---------fetchProductDetail',data);
      yield put({
        type:'fetch',
        payload:{
          productDetail:data&&data.code==='00'?data.model:{},
        }
      });

    },
    *fetchProductFullDetail({ payload,fetchData}, { call, put,select })
    {
     yield put({
         type:'fetch',
         payload:fetchData
     });
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem} = xtProduct;
      let param = {prodId:touchItem.prodId};
      const {data}  = yield call(fetchProductDetailFull, parse(param));
      if (payload.callback){
        payload.callback(data)
      }

      if(data&&data.code==='00'){
          yield put({
          type:'fetch',
          payload:{
            productDetail:data.model,
            fileList:data.model.fileList?data.model.fileList:[],
            typeList:data.model.privateProductTypeList?data.model.privateProductTypeList:[],
            touchItem: {
              ...touchItem,
              ...data.model,
            },
            detailMode: data.model.threeClass=='502' ? 'wage' : 'normal',
            // detailMode: 'normal'
          }
        });
        if(data.model.privateProductTypeList&&touchItem&&touchItem.shrType){
          for(let tp of data.model.privateProductTypeList){
            if(tp.shrType == touchItem.shrType)
              yield put({
                type:'fetch',
                payload:{
                  typeDetail:tp,
                  navList:tp.netvList?tp.netvList:[],
                }});
          }
        }
      }else{
        yield put({
          type:'fetch',
          payload:{
            productDetail:{},
            navList:[],
            fileList:[],
            typeList:[],
            typeDetail:{},
            detailMode: ''
          }
        });
      }

    },
    *getTimeLimits({ payload,fetchData}, { call, put,select }){
      if(payload.data.touchItem){
        let param = {prodId:payload.data.touchItem.prodId,resvPeriod:payload.data.touchItem.resvPeriod}
        let {data} = yield call(getTimeLimits,param)
        if (data.code === "00"&&data.model.judgeStartDate){
          yield put({
            type:'fetch',
            payload:{
              judgeStartDate:data.model.judgeStartDate,
              judgeEndDate:data.model.judgeEndDate,
            }});
        }else {
          yield put({
            type:'fetch',
            payload:{
              judgeStartDate:'',
              judgeEndDate:'',
            }});
        }
      }else if(payload.data.basicData){
        let param = {prodId:payload.basicData.prodId,resvPeriod:payload.basicData.resvPeriod}
        let {data} = yield call(getTimeLimits,param)
        if (data.code === "00"&&data.model.judgeStartDate){
          yield put({
            type:'fetch',
            payload:{
              judgeStartDate:data.model.judgeStartDate,
              judgeEndDate:data.model.judgeEndDate,
            }});
        }else {
          yield put({
            type:'fetch',
            payload:{
              judgeStartDate:'',
              judgeEndDate:'',
            }});
        }
      }else {
        yield put({
          type:'fetch',
          payload:{
            judgeStartDate:'',
            judgeEndDate:'',
          }});
      }

    },
    *emptyTodayList({ payload }, { call, put,select }){
      yield put({type:'fetch',payload:{todayList:{}}});
    },
    *emptyOtherList({ payload }, { call, put,select }){
      yield put({type:'fetch',payload:{otherList:{}}});
    },
    //净值走势
    *fetchNetWorthList({ payload }, { call, put,select })
    {
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem} = xtProduct;
      let {navType} = payload;
      // console.log('-----打印navType-----',payload);
      let durationDate = formatDateAll.formatDuringDate(payload);
      let param = {prodId:touchItem.prodId,shrTypeId:touchItem.shrTypeId,
        startNetvDate:durationDate.startDate,
        endNetvDate:durationDate.endDate};
      const {data}  = yield call(fetchNetWorthList, parse(param));
       yield put({
         type:'fetch',
         payload:{
           navList:data&&data.list?data.list:[]
         }
       });
    },

    //产品资料
    *fetchFillList({ payload }, { call, put, select })
    {
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem} = xtProduct;
      let param = {prodId:touchItem.prodId};
      const {data}  = yield call(fetchFillList, parse(param));
      yield put({
        type:'fetch',
        payload:{
          fileList:data&&data.list?data.list:[]
        }
      });
    },
    //份额类别
    *fetchTypeList({ payload }, { call, put, select })
    {
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem} = xtProduct;
      let param = {prodId:touchItem.prodId};
      const {data}  = yield call(fetchTypeList, parse(param));
      console.log('---份额类别列表数据----',data);
      if(data&&data.list&&touchItem&&touchItem.shrType){
        for(let tp of data.list){
          if(tp.shrType == touchItem.shrType) yield put({type:'fetch',payload:{typeDetail:tp}});
        }
      }
      yield put({
        type:'fetch',
        payload:{
          typeList:data&&data.list?data.list:[]
        }
      });
    },
    //私募产品预约
    *XTProductOrder({ payload }, { call,put,select })
    {
      let params = payload.params;
      let xtProduct = yield select(state => state.xtProduct);
      params.shrTypeId=xtProduct.typeDetail.id;
      params.prodId = xtProduct.typeDetail.prodId;
      params.tradCode=xtProduct.touchItem.tradCode;
      params.addiOrd=params.addiOrd?params.addiOrd:'N';
      let {data} = yield call(XTProductOrder,params);
      payload.backMethord(data);
    },
    *checkCustomerIsCommon({ payload }, { call,put,select }){
        let params  = payload.params;
        let xtProduct = yield select(state => state.xtProduct);
        // params.prodId = xtProduct.typeDetail.prodId;
        let {data} = yield call(checkCustomerIsCommon,params);
        payload.backMethord(data);
    },
    *fetchCheckType({ payload }, { call,put,select }){
      let selectShrType = payload.selectShrType;
      let name = payload.selShrName;
      let xtProduct = yield select(state => state.xtProduct);
      let {touchItem,typeList,typeDetail} = xtProduct;
      touchItem.shrTypeId = selectShrType;
      touchItem.shrType=name;
      console.log('fetchCheckType',touchItem);
      yield put({type:'fetch',payload:{touchItem:touchItem}});
      // let {typeList,typeDetail} = xtProduct;
      // for(let t of typeList){
      //   if(t.id=selectShrType) typeDetail = t;
      // }
      // let durationDate = formatDateAll.formatDuringDate(1);
      // let param = {prodId:typeDetail.prodId,
      //             shrTypeId:typeDetail.id,
      //             startNetvDate:durationDate.startDate,
      //             endNetvDate:durationDate.endDate};
      // const {data}  = yield call(fetchNetWorthList, parse(param));
      // console.log('----解决---',typeDetail);
      //  yield put({
      //    type:'fetch',
      //    payload:{
      //      navList:data&&data.list?data.list:[],
      //      typeDetail:typeDetail
      //    }
      //  });
  },
    *fetchMeetingDetail({payload,meetingDetail},{call,put,select}){
      yield put({
          type:'fetch',
          payload:{
              meetingDetail:meetingDetail
          }
      });
      let {linkId} = payload;
      let params = {meetingId:linkId};
      let {data} = yield call(fetchMeetingDetail,parse(params));
      yield put({
          type:'fetch',
          payload:{
              meetingDetail:data.model?data.model:{}
          }
      });
  },
    *fetchBuyCustomerList({payload,initalBuyCustomerList},{call,put,select}){
      yield put({
          type:'fetchBuyCustomerLoadingTags',
          payload:payload,
          statePayload:initalBuyCustomerList?{
              buyCustomerList:initalBuyCustomerList
          }:{}
      });
      let {customerLoadingTags,buyCustomerList} = yield select(state=>state.xtProduct);
      let {prodId,loading,page,loadingMore,sortFlag,sortAttr} = customerLoadingTags;
      if(!loadingMore)
        page = 1;
      let param = {prodId:customerLoadingTags.prodId,offset:(page-1)*10,limit:10};
      let {data} = yield call(fetchBuyCustomerList,param);
      if(data&&data.code=='00'&&data.list){
          let resultList = sortBuyCustomerList(data.list,sortFlag,sortAttr);
          yield put({
              type:'fetchBuyCustomerLoadingTags',
              payload:{
                  loadingMore:false,
                  page:page+1,
                  loading:false
              },
              statePayload:{
                  buyCustomerList:page>1? sortBuyCustomerList(buyCustomerList.concat(data.list),sortFlag,sortAttr): sortBuyCustomerList(data.list,sortFlag,sortAttr)
              }
          });
      }
      else  {

        yield put({
           type:'fetchBuyCustomerLoadingTags',
           payload:{
               loadingMore:false,
               loading:false
           },
           statePayload:{
               buyCustomerList:page>1?buyCustomerList:[]
           }
       });
    }
  },
      /**
      * 文件分享日志添加
      **/
      *addShareLog({payload},{call,put,select})
      {
              let params = payload.params;
              let {data} = yield call(addShareLog,params);
              payload.backMethord(data);
     },
    //get preprocess list
    *fetchPreprocessList({payload},{call,put,select})
    {
      let data = yield call(fetchPreprocessList,payload)
      let result = data
      if(result.data&&result.data.code==='00'){
        yield put({
          type: 'fetch',
          payload:{
            processList:result.data.list?result.data.list:[],
            showData: !(result.data.list&&result.data.list.length>0)
          }
        })
      }else {
        yield put({
          type: 'fetch',
          payload:{
            processList:[],
            showData:true
          }
        })
      }
    },
    *submitUpdate({payload},{call,put,select}){
      let params = payload.params;
      let {data} = yield call(submitUpdate,params)
      payload.backMethord(data);
    },
    *beforeCreateAlert({payload},{call,put,select}){
      let {data} = yield call(ifAlert,payload.params)
      payload.callback(data);
    },
    //足迹
    *recordVisitTimes({payload},{call,put,select}){
      let {data} = yield call(recordVisitTimes, payload)
    },
    *clearCache({params},{call,put,select}){
       yield put({
        type: 'fetch',
        payload:
          params
      })
    },
    *getNotifyProductList({ payload }, { call, put,select }){
      yield put({
        type:'updateNotifyState',
        payload:payload
      })
      let xtProductModel = yield select(state=>state.xtProduct);
      let pageNum = xtProductModel.notifyProduct.pageNum;
      if(xtProductModel.notifyProduct.loadingMore==false){
        pageNum = 1;
      }
      let param = {offset:(pageNum-1)*10,limit:10};
      const {data}  = yield call(fetchNotifyProductList, parse(param));
      let list = xtProductModel.notifyProduct.notifyList;
      if(data&&data.list!==undefined&&data.list.length>0)
      {
        yield put({
          type:'updateNotifyState',
          payload:{
            notifyList:pageNum>1?list.concat(data.list):data.list,
            loadingMore:false,
            pageNum:pageNum+1
          }
        });
      }
      else  yield put({
        type:'updateNotifyState',
        payload:{
          notifyList:pageNum>1?list:[],
          loadingMore:false
        }
      });
    },
      *getWillOrderDate({payload},{ call, put,select }) {
          let params = payload.params;
          let requestParams = {
              addSelect:false,
              scope: params.id,
          }
          let {data} =  yield call(getWillOrderDate,requestParams);
          yield put({
              type: "fetch",
              payload: {
                  willOrderData: data
              }
          })
         let xtProduct =  yield select(state=>state.xtProduct)
          if(payload.backMethord) {
              payload.backMethord(xtProduct.willOrderData);
          }
      }
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    updateState(state){
      return {...state};
    },
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    fetchLoadingTags(state, action){
      return {
           ...state, loadingTags:{
                   ...state.loadingTags,
                   ...action.payload
               }
        };
    },
    fetchBuyCustomerLoadingTags(state,action){
        return {
             ...state, customerLoadingTags:{
                     ...state.customerLoadingTags,
                     ...action.payload
                 },...action.statePayload
          };
    },
    updateNotifyState(state,action){
      return {
        ...state,notifyProduct:{
          ...state.notifyProduct,
         ...action.payload
        }
      }
    },


  },

}
