import {
  redeemInfoView,
  fetchBuySubmit,
  fetchRedmRebutUp,
  transformAttachlist,
  fetchRecRebutUp,
  fetchFundcRebutUp,
  fetchTradeCancel,
  AutoTransformAttachList,
  processTransformAttachList,
  transformToCustomerFileList,
  fetchRebutPrivateList,
  fetchRebutPublicList,
  fetchCustRegisterFile, custRegAuthList,
} from '../services/trade';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import * as formatDateAll from '../utils/formatUtils';
import moment from 'moment';
import * as Commons from "../utils/commonUtil";
export default {

  namespace: 'rebutSpace',

  state:{
    isFilter:0,

    rebutList:[],
    keyWord:'',
    offset:1,
    loading:false,
    mgrCode:'',
    tradCode:'',
    model:{},
    rejectFlag:'0',
    id:'',

    reqSeq:'',//申请单号
    custId:'',//客户ID
    accId:'',//银行账户ID
    prodId:'',//产品ID
    shrTypeId:'',//份额类别ID
    orderContNo:'',//合同标识码
    remitDate:'',//申请日期
    confAmt:'',//交易金额
    custType:'',//客户类型
    custRegisterFileList: [], //登记注册身份验证查询附件
  },

  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          // console.log('location=====================%%%',location)
          if(location.pathname === '/cusRecordsDetail' || (location.pathname === '/rebutDetail'&&location.action === 'PUSH')){
            dispatch({
              type: 'formStorage/initState',
              location,
              initMethord: () => {
                dispatch({
                  type: 'formStorage/fetchState',
                  payload: {
                    formValue: {},
                    changeList:[],
                    changeList1:[],
                    bankImageList:[],
                    bankImageList1:[]
                  },
                  location,
                });
              },
            });
            dispatch({
              type: 'fetchRebutPrivateList1',
              payload: location.state,
            })
          }
          else if(location.pathname=='/RebutBuy'){//购买驳回修改 延期申请驳回修改
            console.log('location66666666666',location)
            let tradeDetail =  location.state.tradeDetail
            console.log('tradeDetail66668887',tradeDetail)
            if(tradeDetail.isNeedRegister ==='1'&& tradeDetail.registerFlag && tradeDetail.registerFlag === '1'){
              console.log('zoulema?')
              dispatch({
                type: 'fetchCustRegisterFile',
                payload:{
                  id: tradeDetail.custId,
                }
              });
            }
            dispatch({
              type:'fetchInfView',
              payload:location.state,
            })
          }
         /* else if (location.pathname === '/Rebutpostpone' && location.action === 'PUSH') {
            dispatch({
              type: 'fetchInfView',
              payload: location.state,
            })
          }*/
          else if (location.pathname === '/applyCnt' || location.pathname === '/itemDetail') { //双录申请
            dispatch({
              type: 'formStorage/initState',
              location,
              initMethord: () => {
                dispatch({
                  type: 'formStorage/fetchState',
                  payload: {
                    formValue: {},
                  },
                  location,
                });
              },
            });
            if (location.state.from === '01' && location.action === 'PUSH') {
              dispatch({
                type: 'fetchRebutPrivateList',
                payload: location.state,
              })
            }else if (location.action === 'PUSH' && (location.state.from === 'multi_rejectList' || location.state.from === 'inquiry_list')) {
              dispatch({
                type: 'fetchRebutPrivateList',
                payload: location.state,
              })
              dispatch({
                type: 'fetchRebutImageList',
                payload: location.state,
              })
            } else if (location.state.from === '02' && location.action === 'PUSH') {
              dispatch({
                type: 'fetchRebutPublicList',
                payload: location.state,
              })
            } else if (location.state.from === 'role_change' && location.action === 'PUSH') {
              // nothing log
            } else if (location.state.from === 'public' && location.action === 'PUSH') {
              dispatch({
                type: 'fetchInfView',
                payload: location.state,
              })
            } else if (location.state.from === 'private' && location.action === 'PUSH') {
              // dispatch({
              //   type: 'fetchInfView',
              //   payload: location.state,
              // })
            } else {
            }
          }
          else if(location.pathname=='/RebutRecall'){//撤单驳回修改
            dispatch({
              type:'fetchInfView',
              payload:location.state
            })
          }
          else if(location.pathname=='/RebutRedeem' ){//赎回详情
            dispatch({
              type:'fetchInfView',
              payload:location.state
            })
          }
          else if(location.pathname == '/Rebutpostpone' ){//延期申请
            dispatch({
              type:'fetchInfView',
              payload:location.state
            })
          }
          else if(location.pathname == '/TransferReject' ){//转受让 驳回修改展示页面
            dispatch({
              type:'fetchInfView',
              payload:location.state
            })
          }
          else if(location.pathname=='/RebutFundChange'){//基金转换详情
            dispatch({
              type:'fetchInfView',
              payload:location.state
            })
          }
          else if(location.pathname=='/transferDetail'){//转让详情
              dispatch({
                type:'fetchInfView',
                payload:location.state
              })
          }
          else if(location.pathname=='/RebutBuyChange'){//申购驳回修改
              let { data,rejectFlag } = location.state;
              console.log('11111111111111',location.state)
              dispatch({
                type:'formStorage/initState',
                location:location,
                initMethord:()=>{
                  let tradeModel = data.tradeModel;
                  dispatch({
                    type: 'formStorage/fetchState',
                    payload: {
                      capiList:data.capiList?data.capiList:[],//汇款信息
                      formValue:{...tradeModel,remitDate:tradeModel.remitDate?moment(tradeModel.remitDate,'YYYY-MM-DD'):moment()},
                      attachList:data.attachList,
                    },
                    location:location
                  });
                }
              });
          }
          else if(location.pathname=='/TransferRejectModify'){//转让申请 驳回修改 修改页面
            let { data,type ,rejectFlag } = location.state;
            console.log('11111111111111',location.state)
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let tradeModel = data.tradeModel;
                if(!tradeModel)
                {
                  dispatch({
                    type:'formStorage/fetchState',
                    payload:{
                      formValue:{remitDate:moment(),customStartDate:moment(),customEndDate:moment()},
                      fileInfo:[], //转让资料
                      changeList1:[],//受让方经办人附件
                      changeList2:[]//转让方经办人附件
                    },
                    location:location
                  });
                  return;
                }
                let pics = {fileInfo:transformToCustomerFileList(data.attachList,'6'),
                  changeList1:[],changeList2:[]};
                if ((tradeModel.custType=='0')&&(tradeModel.targCustType=='0') ){
                  pics = {changeList1:transformToCustomerFileList(data.attachList,'c'),
                    changeList2:transformToCustomerFileList(data.attachList,'a'),
                    fileInfo:transformToCustomerFileList(data.attachList,'6'),
                  };
                }else if(tradeModel.custType=='0'){
                  pics = {changeList2:transformToCustomerFileList(data.attachList,'a'),
                    fileInfo:transformToCustomerFileList(data.attachList,'6'),
                  };
                }else if(tradeModel.targCustType=='0'){
                  pics = {changeList1:transformToCustomerFileList(data.attachList,'c'),
                    fileInfo:transformToCustomerFileList(data.attachList,'6'),
                  };
                }


                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...tradeModel,
                      remitDate:tradeModel.remitDate?moment(tradeModel.remitDate,'YYYY-MM-DD'):moment(),
                      customStartDate:tradeModel.customStartDate?moment(tradeModel.customStartDate,'YYYY-MM-DD'):moment(),
                      customEndDate:tradeModel.customEndDate?moment(tradeModel.customEndDate,'YYYY-MM-DD'):moment(),
                      transferType:tradeModel.transferType?tradeModel.transferType.split():[]
                    },
                    ...pics
                  },
                  location:location
                });
              }
            });
          }
          else if(location.pathname=='/TradeRedChange'){//赎回驳回修改
            let { data,rowData } = location.state;

            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let tradeModel = data.tradeModel;
                if(!tradeModel)
                {
                  dispatch({
                    type:'formStorage/fetchState',
                    payload:{
                      formValue:{remitDate:moment()},
                      operCertPic:[],
                      reqPic:[],
                    },
                    location:location
                  });
                  return;
                }

                let pics = {reqPic:transformToCustomerFileList(data.attachList,'5')};
                if(tradeModel.custType=='0')
                   pics = {operCertPic:transformToCustomerFileList(data.attachList,'a'),
                      reqPic:transformToCustomerFileList(data.attachList,'5')};
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...data.tradeModel,remitDate:rowData.remitDate?moment(rowData.remitDate,'YYYY-MM-DD'):moment()},
                    ...pics
                  },
                  location:location
                });
              }
            });
          }

          else if(location.pathname=='/rebutdelaymodify'){//赎回驳回修改
            let { data,rowData } = location.state;

            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let tradeModel = data.tradeModel;
                if(!tradeModel)
                {
                  dispatch({
                    type:'formStorage/fetchState',
                    payload:{
                      formValue:{remitDate:moment()},
                      operCertPic:[],
                      reqPic:[],
                    },
                    location:location
                  });
                  return;
                }

                let pics = {reqPic:transformToCustomerFileList(data.attachList)};
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...data.tradeModel,remitDate:rowData.remitDate?moment(rowData.remitDate,'YYYY-MM-DD'):moment()},
                    ...pics
                  },
                  location:location
                });
              }
            });
          }


          else if(location.pathname=='/TradeFundCChange'){//基金转换驳回修改
            let { data,rowData } = location.state;

            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let tradeModel = data.tradeModel;
                if(!tradeModel)
                {
                  dispatch({
                    type:'formStorage/fetchState',
                    payload:{
                      formValue:{remitDate:moment()},
                      operCertPic:[],
                      reqPic:[],
                    },
                    location:location
                  });
                  return;
                }

                let pics = {reqPic:transformToCustomerFileList(data.attachList,'g')};
                if(tradeModel.custType=='0')
                  pics = {operCertPic:transformToCustomerFileList(data.attachList,'a'),
                    reqPic:transformToCustomerFileList(data.attachList,'g')};
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{...data.tradeModel,remitDate:rowData.remitDate?moment(rowData.remitDate,'YYYY-MM-DD'):moment()},
                    ...pics
                  },
                  location:location
                });
              }
            });
          }
          else if(location.pathname=='/RecallChange'){//撤单驳回修改
            let { data,rowData } = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:data.tradeModel,
                    remiPic:transformToCustomerFileList(data.attachList),
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
    *fetchInfView({ payload }, { call, put, select }) {
      let param;
      console.log('2222222payload',payload)
      if (payload.dataSource) {
        param = { id: payload.dataSource.id, rejectFlag: payload.rejectFlag ? payload.rejectFlag : '' };
      }  else{
          param = { id: payload.tradeDetail.id, rejectFlag: payload.rejectFlag ? payload.rejectFlag : '' };
      }
      const { data } = yield call(redeemInfoView, param);
      const attachList = [];
      if (data && data.code === '00' && data.model) {
        console.log('zoulellllllll000000',data)
        console.log('payloadpayloadpayloadpayloadpayload',payload)
        const attachList = data.model.attachList;
        const tradeModel = data.model.tradeModel;
        const valid = data.model.valid;
        if (payload.dataSource) {
          yield put({
            type: 'fetch',
            payload: {
              private: { attachList },
            },
          })
          yield put({
            type: 'formStorage/fetchFormValue',
            payload: {
              private: { attachList },
            },
          })
        } else {
          yield put({
            type: 'fetch',
            payload: {
              model: { ...data.model, attachList: processTransformAttachList(tradeModel,valid, attachList, tradeModel.inveMatrFlag) },
            },
          })
        }
      } else {
        if (payload.dataSource) {
          yield put({
            type: 'fetch',
            payload: {
              private: { attachList: [] },
            },
          })
        } else {
          yield put({
            type: 'fetch',
            payload: {
              model: { attachList: [] },
            },
          })
        }
      }
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
    *fetchRebutPrivateList({ payload }, { call, put, select }) {
      const param = { reqSeq: payload.dataSource.reqSeq, matrType:'e' };
      const { data } = yield call(fetchRebutPrivateList, param);
      console.log('shenshihou huizou yayayyyayyayyyy',data)
      if (data && data.code === '00' && data.list) {
        const attachList = data.list;
        yield put({
          type: 'fetch',
          payload: {
            model: { attachList },
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            private: { attachList },
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            model: { attachList: [] },
          },
        })
      }
    },
    *fetchRebutPrivateList1({ payload }, { call, put, select }) {
      const param = { reqSeq: payload.reqNo, matrType: '8' };
      const param1 = { reqSeq: payload.reqNo, matrType: 'a' };
      const { data } = yield call(fetchRebutPrivateList, param);
      const result = yield call(fetchRebutPrivateList, param1);
      if (data && data.code === '00' && data.list) {
        const attachList = data.list;
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            bankImageList: attachList,
          },
        })
        let imageList = []
        for (let i = 0; i < attachList.length; i++) {
          let temp = {
            fileId: attachList[i].id,
            fileName: attachList[i].srcFileName,
            url: Commons.ImageHostAddress + attachList[i].fileSvrPath
          }
          imageList.push(temp)
        }
        yield put({
          type: 'formStorage/fetch',
          payload: {
            changeList: imageList
          }
        })
        yield put({
          type:'formStorage/fetch',
          payload:{
            newBank:{
              bankName: payload.bankName,
              cardNo: payload.cardNo
            }
          }
        });
        yield put({
          type:'formStorage/fetchFormValue',
          payload:{
            operName: payload.operName,
            operCertNo: payload.operCertNo,
            operCertType: payload.operCertType,
          },
        });
      } else {
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            bankImageList: [] ,
          },
        })
      }
      if (result.data && result.data.code === '00' && result.data.list) {
        const attachList1 = result.data.list;
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            bankImageList1: attachList1,
          },
        })
        let imageList1 = []
        for (let i = 0; i < attachList1.length; i++) {
          let temp = {
            fileId: attachList1[i].id,
            fileName: attachList1[i].srcFileName,
            url: Commons.ImageHostAddress + attachList1[i].fileSvrPath
          }
          imageList1.push(temp)
        }
        yield put({
          type: 'formStorage/fetch',
          payload: {
            changeList1: imageList1
          }
        })
      } else {
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            changeList1: [],
            bankImageList1: []
          },
        })
      }
    },
    *fetchRebutImageList({ payload }, { call, put, select }) {
      const params = { reqSeq: payload.dataSource.reqSeq, matrType: 'f' };
      const { data } = yield call(fetchRebutPrivateList, params);
      if (data && data.code === '00' && data.list) {
        const imageList = data.list;
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            imageUpload: { imageList },
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            imageUpload: { imageList: [] },
          },
        })
      }
    },
    *fetchRebutPublicList({ payload }, { call, put, select }) {
      const param = { reqSeq: payload.dataSource.reqSeq, matrType: 'e' };
      const { data } = yield call(fetchRebutPublicList, param);
      if (data && data.code === '00' && data.list) {
        const attachList = data.list;
        yield put({
          type: 'fetch',
          payload: {
            model: { attachList },
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            private: { attachList },
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            model: { attachList: [] },
          },
        })
      }
    },
    // *fetchRebutChange({payload},{call,put,select}) {
    //    yield put({
    //       type:'fetch',
    //       payload:payload,
    //       loading:false,
    //       loadingMore:false
    //     });
    //     let rebRevise = yield select(state=> state.rebRevise);
    //     let param = payload;
    //
    //     let {data} = yield call(fetchRedeemAsk,parse(param));
    //
    //     if(data&&data.capiList !== undefined&&data.capiList.length > 0)
    //     {
    //       yield put({
    //         type:'fetch',
    //         payload:{
    //           capiList:data.capiList,
    //           loading:false,
    //           loadingMore:false
    //         }
    //       });
    //     }else yield put({
    //         type:'fetch',
    //         payload:{
    //           capiList:[],
    //           loading:false,
    //           loadingMore:false
    //         }
    //       });
    // },
    *fetchSubmit({ payload },{ call,put,select })
    {
      let params = payload.params;
      console.log('----------------============',params);
      let { data } = yield call (fetchBuySubmit,params);
      payload.backMethord(data);
    },
    *fetchRedmRebutUp({ payload },{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchRedmRebutUp,params);
      payload.backMethord(data);
    },
    *fetchFundcRebutUp({ payload },{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchFundcRebutUp,params);
      payload.backMethord(data);
    },
    *fetchRecRebutUp({ payload },{ call,put,select })
    {
      let params = payload.params;
      let { data } = yield call (fetchRecRebutUp,params);
      payload.backMethord(data);
    },
    *fetchTradeCancel({payload},{call,select,put})
    {
      let params = payload;
      let { data } = yield call (fetchTradeCancel,params,);
      payload.backMethord(data)
    },

  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
