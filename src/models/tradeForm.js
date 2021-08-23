import { fetchCapilist,fetchAmtDelete,fetchBuyList,fetchRecallAsk,
         redeemInfoView,fetchRedeemAsk,fetchFundChangeAsk, fetchRecRebutUp,fetchRedmRebutUp,
         fetchPayeeAccount,transformAttachlist, fetchFundCProdList, transformProdList,fetchOriRecallList} from '../services/trade';
import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';

export default {
  namespace:'tradeForm',
  state:{
    fundProdList:[]
  },

  subscriptions: {
    setup({ dispatch,history }){
      history.listen(location => {
        if(location.pathname == '/XTRemitInfo')
        {
          let { remitData,mode,orderInfo} = location.state;
            let remitFormValue={
              custName:orderInfo.custName,
              currType:'156'
            };
            if(mode=='edit')
            {
              remitFormValue = remitData;
            }

            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    remitFormValue:remitFormValue
                  },
                  location:location,
                });
              }
            });
        }
        else if(location.pathname === '/RecallAsk')
        {
          let tradeData = location.state;
          dispatch({
            type:'formStorage/initState',
            location:location,
            initMethord:()=>{
              let custType = tradeData.custType;
              let formValue = {};
              if(custType=='0')
              {
                formValue = {
                  operator:tradeData.operator,
                  operCertNo:tradeData.operCertNo,
                  operCertType:tradeData.operCertType,
                  operCertTypeName:tradeData.operCertTypeName,
                };
              }
              dispatch({
                type: 'formStorage/fetchState',
                payload: {
                  formValue:formValue,
                  operCertPic:[],
                  remiPic:[],
                  reqPic: []
                },
                location:location
              });
            }
          });
        }
        else if(location.pathname == '/RedeemAsk')
        {
          let { postModel } = location.state;
          dispatch({
            type:'formStorage/initState',
            location:location,
            initMethord:()=>{
              dispatch({
                type: 'formStorage/fetchState',
                payload: {
                  formValue:postModel,
                  operCertPic:[],
                  reqPic:[],
                  inputInfo:{},
                },
                location:location
              });
            }
          });
        }
        else if(location.pathname == '/FundChangeAsk')
        {
          let { postModel } = location.state;
          dispatch({
            type:'formStorage/initState',
            location:location,
            initMethord:()=>{
              dispatch({
                type: 'formStorage/fetchState',
                payload: {
                  formValue:postModel,
                  operCertPic:[],
                  reqPic:[],
                  inputInfo:{},
                },
                location:location
              });
              dispatch({
                type:'fetchFundCProdList',
                payload: {
                  prodId:postModel.prodId,
                  shrTypeId:postModel.shrTypeId
                }
              });
            }
          });
        }
        else if(location.pathname==='/fundProdList')
        {
          dispatch({
            type:'formStorage/initState',
            location:location,
            initMethord:()=>{
                dispatch({
                  type:'fetchFundCProdList',
                  payload: location.state.params,
                  location:location,
                });
            }
          });
        }
        else if(location.pathname=='/PayeeAccount')
        {
          let {prodId} = location.state;
          dispatch({
            type:'fetchPayeeAccount',
            payload:prodId
          });
        }
      });
    },
  },


  effects:{
    *fetchCapiInfo({ payload },{ call,put,select }){
        yield put({
          type:'fetch',
          payload:payload,
          loading:false,
          loadingMore:false
        });
        let trade = yield select(state => state.trade);
        let param = payload;

        let {data} = yield call(fetchBuyList,parse(param));

        if(data&&data.object !== undefined&&Object.keys(data.object).length > 0)
        {
          let capiInfo = data.object;
          yield put({
            type:'fetch',
            payload:{
              capiInfo:capiInfo?capiInfo:{},
              loading:false,
              loadingMore:false
            }
          });
          // if(data.id !== undefined)//如果ID不会空  则有汇款信息 获取录入信息  赋值到formStorage树上
          // {
            yield put({
              type:'formStorage/fetch',
              payload:{
                formValue:{
                  ...capiInfo,
                  long:(perInfoList.certEndDate=='9999-12-31'),
                },
              }
            });
          // }
        } else yield put({
          type:'fetch',
          payload:{
            capiInfo:{},
            loading:false,
            loadingMore:false
          }
        });
    },
    *fetchAskView({ payload },{ call,put,select }){
      yield put({
        type:'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.trade);
      let param = payload;

      let {data} = yield call(redeemInfoView,parse(param));

      if(data&&data.object !== undefined&&Object.keys(data.object).length > 0)
      {
        let AskInfo = data.object;
        yield put({
          type:'fetch',
          payload:{
            AskInfo:AskInfo?AskInfo:{},
            loading:false,
            loadingMore:false
          }
        });
        // if(data.id !== undefined)//如果ID不会空  则有汇款信息 获取录入信息  赋值到formStorage树上
        // {
          yield put({
            type:'formStorage/fetch',
            payload:{
              formValue:{
                ...AskInfo,
                long:(perInfoList.certEndDate=='9999-12-31'),
              },
            }
          });
        // }
      } else yield put({
        type:'fetch',
        payload:{
          AskInfo:{},
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchAskRedmView({ payload },{ call,put,select }){
      yield put({
        type:'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let trade = yield select(state => state.trade);
      let param = payload;

      let {data} = yield call(fetchRedeemAsk,parse(param));

      if(data&&data.object !== undefined&&Object.keys(data.object).length > 0)
      {
        let AskInfo = data.object;
        yield put({
          type:'fetch',
          payload:{
            AskInfo:AskInfo?AskInfo:{},
            loading:false,
            loadingMore:false
          }
        });
        // if(data.id !== undefined)//如果ID不会空  则有汇款信息 获取录入信息  赋值到formStorage树上
        // {
          yield put({
            type:'formStorage/fetch',
            payload:{
              formValue:{
                ...AskInfo,
                long:(perInfoList.certEndDate=='9999-12-31'),
              },
            }
          });
        // }
      } else yield put({
        type:'fetch',
        payload:{
          AskInfo:{},
          loading:false,
          loadingMore:false
        }
      });
    },
    *fetchCapiDelete({payload},{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchAmtDelete,params,payload.mode);
      payload.backMethord(data);
    },

    *fetchRecAsk({payload},{ call,put,select }){
      let {params,images,backMethord} = payload;
      let { data } = yield call (fetchRecallAsk,params);
      backMethord(data);
    },
    *fetchRedmAsk({payload},{ call,put,select }) {
      let {params,images,backMethord} = payload;
      let { data } = yield call (fetchRedeemAsk,params,images);
      backMethord(data);
    },
    *fetchFundChangeAsk({payload},{ call,put,select }) {
      let {params,images,backMethord} = payload;
      let { data } = yield call (fetchFundChangeAsk,params,images);
      backMethord(data);
    },
    *fetchRecRebut(){
      let params = payload.params;
      let { data } = yield call (fetchRecRebutUp,params,payload.mode);
      payload.backMethord(data);
    },
    *fetchRedmRebut(){
      let params = payload.params;
      let { data } = yield call (fetchRedmRebutUp,params,payload.mode);
      payload.backMethord(data);
    },
    *fetchTradeCan(){
      let params = payload;
      let { data } = yield call (fetchRedmRebutUp,params);
      payload.backMethord(data);
    },
    *fetchPayeeAccount({payload},{put,call})
    {
       let {data} = yield call(fetchPayeeAccount,{prodId:payload});
       if(data&&data.code=='00')
       {
          yield put({
            type:'fetch',
            payload:{
              payeeAccountList:data.list?data.list:[]
            }
          });
       }
       else  yield put({
           type:'fetch',
           payload:{
             payeeAccountList:[]
           }
         });
    },
    *fetchFundCProdList({payload},{call,put,select}){
      let {data}  = yield call(fetchFundCProdList,{prodId:payload.prodId, shrTypeId:payload.shrTypeId});
      let list = [];
      if(data&&data.code=='00'&&data.list&&data.list.length>0){
        list = data.list;
      }
      else {
        list = [];
        if(!data||data.code!='00'){
          Toast.fail(data&&data.message?data.message:'数据获取失败!',2);
        }
      }

      yield put({
        type:'fetch',
        payload:{
          targProdInfoDesc:list,
        }
      });
    },
    *getOriRecallList({payload},{call,put,select}){
      let params = payload.params;
      let {data} = yield call(fetchOriRecallList,params);
      payload.backMethod(data)
    }


    // *fetchTempBuyInfo({ payload },{ call,put,select } ){
    //   let orderId = data.capiList.id
    // }
  },
  reducers:{
    fetch(state,action){
      return { ...state,...action.payload}
    }
  },
}

// [{ key:'6333999999999999', value: '工商银行 | 6333999999999999' },
//       { key:'6333111111111111', value: '民生银行 | 6333111111111111' }]
