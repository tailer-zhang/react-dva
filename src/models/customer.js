import {fetchCustomerList,fetchCustomerWait,addCustomer,uploadPictures,editCustomer,
        fetchPerCustomerInfo,fetchCustomerReVisit,fetchInstiInfo,fetchPerCustWaitReject,
        fetchOrgCustWaitReject,fetchCustAbandon,fetchCustomerDealHistory,fetchCustRiskInquire,
        fetchCustRiskSubmit,fetchCustomerWaitInfo,fetchCustomerDealHisColl,fetchInstiModify,
        fetchCustBlack,seperatorTradeList, fetchAcceptorList, fetchManagersList } from '../services/customer';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { List,InputItem,Toast } from 'antd-mobile';
import {decryptStr} from '../utils/createEncrypt';
import moment from 'moment';

export default {
  namespace: 'customer',
  state:{
    customerList:[],
    acceptorList: [],
    customerWaitList: [],
    custName:'',
    pageNumber:1,
    filterArgs:{},
    riskSubmitObject: {},
    loadingMore:false,
    loading:false,
    sortOrder:0,
    roleId: '',
    reach_bottom: false,//默认排序
    custId: '',
    managerList: [],
    // rejectFlag: '',//驳回标识
    // custID: '',//客户ID
  },
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if (location.pathname === '/customerInquire') {
                  let payload =  {...location.query,loadingMore:false,filterMode:undefined};
                  if(location.action=='PUSH'&&!(location.query.outLink))
                  {
                    dispatch({
                      type:'formStorage/fetchState',
                      payload:{
                        formValue:{}
                      },
                      location:location,
                    });
                    payload =  {...location.query,loadingMore:false,
                      custName:'',filterArgs:{},filterMode:undefined};
                  }
                  dispatch({
                    type:'fetch',
                    payload:{
                      customerList:[]
                    }
                  });
                  dispatch({
                    type:'fetchRemote',
                    payload:payload
                  });
          }
          else if(location.pathname === '/customerMain') { //用于显示代办的数量
            let query = location.query;
            let offset={offset:-1};
            dispatch({
              type: 'fetchWait',
              payload: {...query,...offset}
            })
          }
          else if(location.pathname === '/customerWait') {
            dispatch({
              type: 'fetchWait',
              payload: location.query
            })
          }
          else if(location.pathname === '/backVisit') {
            dispatch({
              type: 'CustomerReVisit',
              payload: location.state
            })
          }
          else if(location.pathname === '/transaction') { //交易记录
            console.log('location.state.custID----',location.state.custID);
            let {custID} = location.state;
            if(location.action=='PUSH') {     //初始化页面，免受上次页面数据影响
              dispatch({
                type: 'fetch',
                payload: {...seperatorTradeList([])}
              });
            }
            dispatch({
              type: 'CustomerReTransaction',  //财付通
              payload: {custID: custID}
            });
            dispatch({
              type: 'CustReTransColl',  //信托、保险
              payload: {custNo: custID}
            })
          }
          else if(location.pathname === '/removeChange') {
            let {perCust} = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:perCust
                  },
                  location:location,
                });
                dispatch({
                  type: 'RemoveChangeInfo',
                  payload:{
                    custID:perCust.custID,
                    custClass: perCust.custClass,
                    undoType: perCust.undoType
                  }
                });
              }
            });

          }
          else if(location.pathname == '/orgCusWaitChange') {
            let {orgCust} = location.state;
            // if(location.action=='POP')
            //   return;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:orgCust,
                  },
                  location:location,
                });
                dispatch({
                  type: 'RemoveChangeInfo',
                  payload:{
                    custID:orgCust.custID,
                    custClass: orgCust.custClass,
                    undoType: orgCust.undoType
                  }
                })
              }
            });

          }
          else if(location.pathname === '/giveUpCustomer') {
            let total = {};
            dispatch({
              type: 'formStorage/fetchFormValue',
              payload: {formValue:{},}
            })
          }
          else if(location.pathname==='/riskBearSec')
          {
            dispatch({
              type: 'riskInquire',
              payload: location.state,
            })
          }
          else if(location.pathname=='/riskAssess')
          {
            let {custID,riskLevel,score} =  location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    riskResult:location.state,
                  },
                  location:location,
                });

              }
            });
          }
          else if(location.pathname === '/orgCusAdd') {
            let total = {};
            dispatch({
              type: 'formStorage/fetchFormValue',
              payload: {formValue:total,}
            })
          }
          // else if (location.pathname === '/inputSelectCustomer') {
          //   let state = location.state;
          //   let filter = state.filter;
          //     dispatch({
          //       type:'fetch',
          //       payload:{
          //         customerList:[]
          //       }
          //     });
          //     dispatch({
          //       type:'fetchRemote',
          //       payload: {...location.query,filterArgs1:filter?filter:{},custName1:'',filterMode:'selectCustomer'}
          //     });
          else if (location.pathname === '/pubAcceptorSelectCnt') {
            const state = location.state;
            const filter = state.filter;
            dispatch({
              type: 'fetch',
              payload: {
                acceptorList: [],
              },
            });
            dispatch({
              type: 'fetchAcceptorsList',
              payload: { roleId: location.state.roleId },
            });
          } else if (location.pathname === '/selectManagers') {
            const state = location.state;
            const filter = state.filter;
            dispatch({
              type: 'fetch',
              payload: {
                acceptorList: [],
              },
            });
            dispatch({
              type: 'fetchManagersList',
              payload: { custId: location.state.custId },
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
      let customer = yield select(state => state.customer);
      let pageNumber = customer.pageNumber;
      let filterArgs = customer.filterArgs;
      let custName = customer.custName;
      //通过filterMode来进行区分选择客户和查询客户的筛选条件
      if(customer.filterMode)
      {
          filterArgs  = customer.filterArgs1;
          custName = customer.custName1;
      }
      if(customer.loadingMore==false)
        pageNumber = 1;
      let param = {pageNumber:pageNumber,pageSize:10,custName:custName,sortOrder:customer.sortOrder,
        ...filterArgs,...payload,filterArgs:undefined};
      // console.log('param------',param);
      // if(customer.reserveRank){
      //   param.custName=customer.searchWord;
      // }
      let {data}  = yield call(fetchCustomerList, parse(param));
      let list = customer.customerList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            customerList:pageNumber>1?list.concat(data.list):data.list,
            loading:false,
            loadingMore:false,
            pageNumber:pageNumber+1
          }
        });
      }
      else  yield put({
          type:'fetch',
          payload:{
            customerList:pageNumber>1?list:[],
            loading:false,
            loadingMore:false
          }
        });
    },

    *fetchAcceptorsList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload,
      })
      const customer = yield select(state => state.customer);
      let pageNumber = customer.pageNumber;
      const roleId = customer.roleId
      if (customer.loadingMore === false) {
        pageNumber = 1;
      }
      // const params = { empName: payload.empName ? payload.empName : '', pageNumber : pageNumber, pageSize: 10 }
      const params = { empName: payload.empName ? payload.empName : '', roleId: roleId }
      const { data } = yield call(fetchAcceptorList, parse(params));
      if (data.code === '00' && data.list !== undefined && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            acceptorList: data.list,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
            pageNumber: pageNumber + 1,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            acceptorList: [],
            loadingMore: false,
            reach_bottom: true,
          },
        });
      }
    },

    *fetchManagersList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload,
      })
      const customer = yield select(state => state.customer);
      let pageNumber = customer.pageNumber;
      const custId = customer.custId
      if (customer.loadingMore === false) {
        pageNumber = 1;
      }
      const params = { offset: (pageNumber - 1) * 10, limit: 10, keyWord: payload.keyWord ? payload.keyWord : '', custId };
      const { data } = yield call(fetchManagersList, parse(params));
      if (data.code === '00' && data.list !== undefined && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            managerList: data.list,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
            pageNumber: pageNumber + 1,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            managerList: [],
            loadingMore: false,
            reach_bottom: true,
          },
        });
      }
    },

    *fetchWait({payload},{call,put,select}) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let customer = yield select(state => state.customer);
      let pageNumber = customer.pageNumber;
      if(customer.loadingMore==false){pageNumber = 1};
      let param = {pageNumber:pageNumber,pageSize:10,...payload};
      // let param = {...payload};
      let {data} =  yield call(fetchCustomerWait, parse(param));
      console.log('---data---',data);
      let list = customer.customerWaitList;
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            customerWaitList:pageNumber>1?list.concat(data.list):data.list,
            dataTotal: data.total,
            loading:false,
            loadingMore:false,
            pageNumber:pageNumber+1
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            customerWaitList:pageNumber>1?list:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *perPotentAdd({ payload }, { call, put,select }) {
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let param = {...payload};
      console.log('---param----',param);
      let {data} =  yield call(fetchPerCustomerAdd, parse(param));
      console.log('---data---',data);
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            perAddList:data.list,
            loading:false,
            loadingMore:false
          }
        });
      }
    },
    *CustomerReVisit({ payload }, { call, put,select }) {
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let param = payload;
      let {data} =  yield call(fetchCustomerReVisit, parse(param));
      console.log('---data---',data);
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            reVisitList:data.list,
            loading:false,
            loadingMore:false
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            reVisitList:[],
            loading:false,
            loadingMore:false
          }
        });
    },
    *CustomerReTransaction({ payload }, { call, put,select }) {
      let param = {pageNumber:-1,pageSize:10,...payload};
      let {data} =  yield call(fetchCustomerDealHistory, parse(param));
      console.log('---data---',data);
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            dealHisList:data.list,
            loading:false,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            dealHisList:[],
            loading:false,
          }
        });
    },
    *CustReTransColl({ payload }, { call, put,select }) {
      let param = payload;
      console.log('参数',param);
      let {data} =  yield call(fetchCustomerDealHisColl, parse(param));
      console.log('---data---',data);
      if(data&&data.list!=undefined&&data.list.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            ...seperatorTradeList(data.list),
            loading:false,
          }
        });
      } else yield put({
          type:'fetch',
          payload:{
            dealHisCollList:[],
            loading:false,
          }
        });
    },
    *addCustomer({ payload }, { call,put,select })
    {
      let params = payload.params;
      // if (params.isBenefitSelf&&params.isBenefitSelf!='02') {
      //   params.isBenefitSelf = '01';
      // } else {
      //   params.isBenefitSelf = '02';
      // }
      if (params.isControl) {
        params.isControl = '01';
      } else {
        params.isControl = '02';
      }
      console.log("addCustomer····················· ",params.isBenefitSelf);
      let {data} = yield call(addCustomer,params,payload.mode);
      payload.backMethord(data);
    },
    *uploadCustomerImage({payload},{call,put,select})
    {
      let {params,images,backMethord} = payload;
      console.log('---uploadCustomerImage---');
      let {data} = yield call(uploadPictures,params,images);
      backMethord(data);
    },
    *InstiCustModify({payload},{ call,put,select })
    {
      let params = payload.params;
      let {data} = yield call(fetchInstiModify,params,payload.mode);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *RemoveChangeInfo({ payload }, { call, put,select }) {
      let param = payload;
      let {data} =  yield call(fetchCustomerWaitInfo, parse(param));
      let rejectObject = data.object;
      console.log('---data---',data);
        yield put({
          type:'fetch',
          payload:{
            rejectObject:data&&data.code==='0'?data.object:{},
            loading:false,
          }
        });
        let resultData = data.object,descryptData={};
        if(resultData==undefined)
          resultData = {};

        //表示个人用户
        if(resultData.custClass=='01')
          descryptData = {
            mobilePhone:decryptStr(resultData.mobilePhone),
            long:(resultData.certEndDate=='9999-12-31'),
            isfmanForMember:(resultData.isfmanForMember=='01'),
            badRecords:(resultData.badRecords=='02'),
            birthDay:resultData.birthDay?moment(resultData.birthDay,'x'):moment(),
            certEndDate:resultData.certEndDate?moment(resultData.certEndDate,'YYYY-MM-DD'):moment(),
            email:decryptStr(resultData.email),
            familyAddress:decryptStr(resultData.familyAddress),
            familyPostCode:decryptStr(resultData.familyPostCode),
            familyPhone:decryptStr(resultData.familyPhone),
            companyAddress:decryptStr(resultData.companyAddress),
            companyPostCode:decryptStr(resultData.companyPostCode),
            companyPhone:decryptStr(resultData.companyPhone),
            otherAddress:decryptStr(resultData.otherAddress),
            otherPostCode:decryptStr(resultData.otherPostCode),
            linkPhone:decryptStr(resultData.linkPhone),
            actualControl:resultData.actualControl,
            actualBenefit:resultData.actualBenefit,
          };
        else descryptData = {
              email:decryptStr(resultData.email),
              mobilePhone:decryptStr(resultData.mobilePhone),
              companyPostCode:decryptStr(resultData.companyPostCode),
              companyPhone:decryptStr(resultData.companyPhone),
              companyAddress:decryptStr(resultData.companyAddress),
              linkMobilePhone:decryptStr(resultData.linkMobilePhone),
              linkPhone:decryptStr(resultData.linkPhone),
              linkFax:decryptStr(resultData.linkFax),
              linkEmail:decryptStr(resultData.linkEmail),
              deciMobilePhone:decryptStr(resultData.deciMobilePhone),
              deciPhone:decryptStr(resultData.deciPhone),
              deciFax:decryptStr(resultData.deciFax),
              deciEmail:decryptStr(resultData.deciEmail),
              finaMobilePhone:decryptStr(resultData.finaMobilePhone),
              finaPhone:decryptStr(resultData.finaPhone),
              finaFax:decryptStr(resultData.finaFax),
              finaEmail:decryptStr(resultData.finaEmail),
              long:(resultData.certEndDate=='9999-12-31'),
              isfmanForMember:(resultData.isfmanForMember=='01'),
              badRecords:(resultData.badRecords=='02'),
              certEndDate:resultData.certEndDate?moment(resultData.certEndDate,'YYYY-MM-DD'):moment(),
              certStartDate:resultData.certStartDate?moment(resultData.certStartDate,'YYYY-MM-DD'):moment(),
              officeAddress:resultData.officeAddress?resultData.officeAddress:resultData.messageAddress,
              actualControl:resultData.actualControl,
              actualBenefit:resultData.actualBenefit,
          };
        yield put({
          type:'formStorage/fetch',
          payload:{
            formValue:{
              ...resultData,
              ...descryptData,
              noPassReason:undefined,
              createDT:undefined,
              createUserID: undefined,
              createUserName:undefined,
              lastUpdateDT: undefined,
              lastUpdateUserID:undefined,
              lastUpdateUserName:undefined
            },
            memPic:resultData.memPic,
            certPic:resultData.certPic
          }
        });
    },
    *RemoveChange({payload},{ call,put,select })
    {
      let params = payload.params;
      let {data} = yield call(fetchPerCustWaitReject,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *editCustomer({payload},{ call,put,select })
    {
      let params = payload.params;
      // if (params.isBenefitSelf&&params.isBenefitSelf!='02') {
      //   params.isBenefitSelf = '01';
      // } else {
      //   params.isBenefitSelf = '02';
      // }
      // if (params.isControl) {
      //   params.isControl = '01';
      // } else {
      //   params.isControl = '02';
      // }
      console.log("editCustomer=======",params.isBenefitSelf);
      let {data} = yield call(editCustomer,params,payload.mode);
      payload.backMethord(data);
    },
    *orgRemoveChange({ payload }, { call, put,select }) {
      let params = payload.params;
      // if (params.isBenefitSelf&&params.isBenefitSelf!='02') {
      //   params.isBenefitSelf = '01';
      // } else {
      //   params.isBenefitSelf = '02';
      // }
      if (params.isControl) {
        params.isControl = '01';
      } else {
        params.isControl = '02';
      }
      console.log("orgRemoveChange--------",params.isBenefitSelf);
      let {data} =  yield call(fetchOrgCustWaitReject, parse(params));
      console.log('---data---',data);
        payload.backMethord(data);
    },
    *custGiveUp({ payload }, { call, put,select }) {
      let params = payload.params;
      let {data} = yield call(fetchCustAbandon,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *custBlackList({ payload }, { call, put,select }) {
      let params = payload.params;
      let {data} = yield call(fetchCustBlack,params);
      console.log('---data---',data);
      payload.backMethord(data);
    },
    *riskInquire({ payload }, { call, put,select }) {
      let param = payload;
      let {data} =  yield call(fetchCustRiskInquire, parse(param));
      console.log('---data---',data);
      if(data&&data.object !== undefined)
      {
        yield put({
          type:'fetch',
          payload:{
            riskInquireObj:data.object,
            loading:false,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            riskInquireObj:{},
            loading:false,
          }
        });
    },
    *riskSubmit({ payload }, { call, put,select }) {
      let param = payload.params;
      let {data} =  yield call(fetchCustRiskSubmit, parse(param));
      console.log('---data---',data);
      payload.backMethord(data);
      if(data&&data.object !== undefined)
      {
        yield put({
            type:'fetch',
            payload:{
              riskSubmitObject:data.object,
              loading:false,
            }
          });
        yield put({
          type:'formStorage/fetch',
          payload:{
            riskResult:{
              custID:param.custID,
              riskLevel:data.object.riskLevel,
              score:data.object.socre
            },
          }
        });
        yield put({
          type:'formStorage/fetchFormValue',
          payload:{
            riskLevel:data.object.riskLevel,
            score:data.object.socre,
            riskLevelName:''
          }
        });
      } else yield put({
          type:'fetch',
          payload:{
            riskSubmitObject:{},
          }
        });

    },
    // *fetchRemoteByName({ payload }, { call, put,select }) {
    //   yield put({
    //     type: 'fetch',
    //     payload:payload,
    //   });
    //   let customer = yield select(state => state.customer);
    //   let pageNumber = customer.pageNumber;
    //   if(customer.loadingMore==false)
    //     pageNumber = 1;
    //   let param = {
    //           pageNumber:pageNumber,
    //           pageSize:100,
    //           custName:customer.custName,
    //           ...payload};
    //   let {data}  = yield call(fetchCustomerList, parse(param));
    //   // console.log('---data----',param);
    //   let list = customer.list;
    //   // console.log('---customer.list----',customer.list);
    //   if(data&&data.list!=undefined&&data.list.length>0)
    //   {
    //     yield put({
    //       type:'fetch',
    //       payload:{
    //         customerList:pageNumber>1?list.concat(data.list):data.list,
    //         loading:false,
    //         loadingMore:false,
    //         pageNumber:pageNumber+1
    //       }
    //     });
    //   }
    //   else  yield put({
    //       type:'fetch',
    //       payload:{
    //         customerList:pageNumber>1?list:[],
    //         loading:false,
    //         loadingMore:false
    //       }
    //     });
    // },
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
