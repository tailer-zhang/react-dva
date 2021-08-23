import {fetchInstiInfo,fetchCustHoldProp} from '../services/customer';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import {decryptStr} from '../utils/createEncrypt';
import moment from 'moment';

export default {
  namespace: 'instiCustInfo',
  state:{},
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname == '/orgCusDetail') {
            dispatch({
              type: 'fetchInstiCustInfo',
              payload: location.state.detail
            });
            dispatch({
              type: 'fetchHoldProperty',
              payload: location.state.hold
            //   payload:{certType: "01", custType: "1", certNo: "330225198310141601", userId: "001717"}
            })
          }
          else if(location.pathname=='/orgCusAdd')
          {
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{
                      linkSex:'01'
                    },
                  },
                  location:location,
                });
              }
            });
          }
          else if(location.pathname == '/orgCusAddMore') {
            let {orgCust,mode} = location.state;
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let payload = {
                  formValue:orgCust,
                };
                if(mode!='addMore')
                {
                  payload = {
                    formValue:{
                      ...orgCust,
                      linkMobilePhone:decryptStr(orgCust.linkMobilePhone),
                      long:(orgCust.certEndDate=='9999-12-31'),
                      isfmanForMember:(orgCust.isfmanForMember=='01'),
                      badRecords:(orgCust.badRecords=='01'),
                      certStartDate:orgCust.certStartDate?moment(orgCust.certStartDate,'YYYY-MM-DD'):moment(),
                      certEndDate:orgCust.certEndDate?moment(orgCust.certEndDate,'YYYY-MM-DD'):moment(),
                      linkPhone:decryptStr(orgCust.linkPhone),
                      linkFax:decryptStr(orgCust.linkFax),
                      linkEmail:decryptStr(orgCust.linkEmail),
                      deciMobilePhone:decryptStr(orgCust.deciMobilePhone),
                      deciPhone:decryptStr(orgCust.deciPhone),
                      deciFax:decryptStr(orgCust.deciFax),
                      deciEmail:decryptStr(orgCust.deciEmail),
                      finaMobilePhone:decryptStr(orgCust.finaMobilePhone),
                      finaPhone:decryptStr(orgCust.finaPhone),
                      finaFax:decryptStr(orgCust.finaFax),
                      finaEmail:decryptStr(orgCust.finaEmail),
                      officeAddress:orgCust.officeAddress?orgCust.officeAddress:orgCust.messageAddress,
                      // actualControl:orgCust.actualControl?orgCust.actualControl:orgCust.legalMen,
                      // actualBenefit:orgCust.actualBenefit?orgCust.actualBenefit:orgCust.busiName,
                    },
                    memPic:orgCust.memPic,
                    certPic:orgCust.certPic,
                  };
                }
                dispatch({
                  type:'formStorage/fetchState',
                  payload:payload,
                  location:location,
                });

                if(mode=='addMore')
                {
                  return;
                }

                dispatch({
                  type: 'fetchInstiCustInfo',
                  payload:{
                    busiID:orgCust.custID,
                    rejectFlag:1
                  }
                });
              }
            });

          }
        });
      },
    },
  effects: {
    *fetchInstiCustInfo({ payload }, { call, put,select }) {
      let param = payload;
      let {data} =  yield call(fetchInstiInfo, parse(param));
      // console.log('---data---',data);
      if(data&&data.object&&Object.keys(data.object).length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            instiInfo:data.object,
            loading:false,
          }
        });
        yield put({
          type:'formStorage/fetch',
          payload:{
            formValue:{
              ...data.object,
              linkMobilePhone:decryptStr(data.object.linkMobilePhone),
              long:(data.object.certEndDate=='9999-12-31'),
              isfmanForMember:(data.object.isfmanForMember=='01'),
              certStartDate:data.object.certStartDate?moment(data.object.certStartDate,'YYYY-MM-DD'):moment(),
              certEndDate:data.object.certEndDate?moment(data.object.certEndDate,'YYYY-MM-DD'):moment(),
              linkPhone:decryptStr(data.object.linkPhone),
              linkFax:decryptStr(data.object.linkFax),
              linkEmail:decryptStr(data.object.linkEmail),
              deciMobilePhone:decryptStr(data.object.deciMobilePhone),
              deciPhone:decryptStr(data.object.deciPhone),
              deciFax:decryptStr(data.object.deciFax),
              deciEmail:decryptStr(data.object.deciEmail),
              finaMobilePhone:decryptStr(data.object.finaMobilePhone),
              finaPhone:decryptStr(data.object.finaPhone),
              finaFax:decryptStr(data.object.finaFax),
              finaEmail:decryptStr(data.object.finaEmail),
              badRecords:(data.object.badRecords=='02'),
              officeAddress:data.object.officeAddress?data.object.officeAddress:data.object.messageAddress,
              // actualControl:data.object.actualControl?data.object.actualControl:data.object.legalMen,
              // actualBenefit:data.object.actualBenefit?data.object.actualBenefit:data.object.busiName,
            },
            memPic:data.object.memPic,
            certPic:data.object.certPic,
          }
        });
      } else  yield put({
          type:'fetch',
          payload:{
            instiInfo:{result: '空'},
            loading:false,
          }
        });
    },
    *fetchHoldProperty({ payload }, { call, put,select }) {
      let param = payload;
      let {data} =  yield call(fetchCustHoldProp, parse(param));
      console.log('---data---',data);
      if(data&&data.objects!=undefined&&Object.keys(data.objects).length > 0)
      {
        yield put({
          type:'fetch',
          payload:{
            holdPropertyObj:data.objects,
            loading:false,
          }
        });
    } else  yield put({
        type:'fetch',
        payload:{
          holdPropertyObj:{},
          loading:false,
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
