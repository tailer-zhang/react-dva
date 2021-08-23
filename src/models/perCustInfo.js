import {fetchPerCustomerInfo,fetchCustHoldProp} from '../services/customer';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import {decryptStr} from '../utils/createEncrypt';
import moment from 'moment';

export default {
  namespace: 'perCustInfo',
  state:{},
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname === '/personalCusDetail') {
            dispatch({
              type: 'perCustomerInfo',
              payload: location.state.detail
            });
            dispatch({
              type: 'fetchHoldProperty',
            //   payload:{certType: "01", custType: "1", certNo: "330225198310141601", userId: "001717"}
              payload: location.state.hold
            })
          }
          else if(location.pathname=='/personalCustomerIncrease')
          {
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                dispatch({
                  type:'formStorage/fetchState',
                  payload:{
                    formValue:{
                      sex:'01'
                    },
                  },
                  location:location,
                });
              }
            });
          }
          else if(location.pathname=='/personalLatentCustomerEdit')
          {
            let {customer,mode} = location.state;
            console.log('customer----',customer,mode);
            dispatch({
              type:'formStorage/initState',
              location:location,
              initMethord:()=>{
                let payload = {
                  formValue:customer,
                };
                if(mode!='addMore')
                {
                  payload = {
                    formValue:{
                      ...customer,
                      mobilePhone:decryptStr(customer.mobilePhone),
                      long:(customer.certEndDate=='9999-12-31'),
                      isfmanForMember:(customer.isfmanForMember=='01'),
                      badRecords:(customer.badRecords=='02'),
                      birthDay:customer.birthDay?moment(customer.birthDay,'x'):moment(),
                      certEndDate:customer.certEndDate?moment(customer.certEndDate,'YYYY-MM-DD'):moment(),
                      email:decryptStr(customer.email),
                      familyAddress:decryptStr(customer.familyAddress),
                      familyPostCode:decryptStr(customer.familyPostCode),
                      familyPhone:decryptStr(customer.familyPhone),
                      companyAddress:decryptStr(customer.companyAddress),
                      companyPostCode:decryptStr(customer.companyPostCode),
                      companyPhone:decryptStr(customer.companyPhone),
                      otherAddress:decryptStr(customer.otherAddress),
                      otherPostCode:decryptStr(customer.otherPostCode),
                      linkPhone:decryptStr(customer.linkPhone),
                      // actualControl:customer.actualControl?customer.actualControl:customer.custName,
                      // actualBenefit:customer.actualBenefit?customer.actualBenefit:customer.custName,
                    },
                    memPic:customer.memPic,
                    certPic:customer.certPic
                  };
                }
                dispatch({
                  type:'formStorage/fetchState',
                  payload:payload,
                  location:location,
                });
                if(mode=='addMore')
                {
                  dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      formValue:{
                        ...customer,
                        isSecret: '01'
                      }
                    }
                  });
                  return;
                }
                dispatch({
                  type: 'perCustomerInfo',
                  payload:{
                    custID:customer.custID,
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
    *perCustomerInfo({ payload }, { call, put,select }) {
      yield put({
        type: 'fetch',
        payload:payload,
        loading:false,
        loadingMore:false
      });
      let customer = yield select(state => state.customer);
      let param = payload;
      console.log('参数',param);
      let {data} =  yield call(fetchPerCustomerInfo, parse(param));
      if(data&&data.object !== undefined&&Object.keys(data.object).length > 0)
      {
        let perInfoList = data.object;
        yield put({
          type:'fetch',
          payload:{
            perInfoList:perInfoList,
            loading:false,
            loadingMore:false
          }
        });
        // if(param.rejectFlag==1)
        // {
          //获取客户详情，赋值到formStorage树上
            yield put({
              type:'formStorage/fetch',
              payload:{
                formValue:{
                  ...perInfoList,
                  mobilePhone:decryptStr(perInfoList.mobilePhone),
                  long:(perInfoList.certEndDate=='9999-12-31'),
                  isfmanForMember:(perInfoList.isfmanForMember=='01'),
                  badRecords:(perInfoList.badRecords=='02'),
                  birthDay:perInfoList.birthDay?moment(perInfoList.birthDay,'x'):moment(),
                  certEndDate:perInfoList.certEndDate?moment(perInfoList.certEndDate,'YYYY-MM-DD'):moment(),
                  email:decryptStr(perInfoList.email),
                  familyAddress:decryptStr(perInfoList.familyAddress),
                  familyPostCode:decryptStr(perInfoList.familyPostCode),
                  familyPhone:decryptStr(perInfoList.familyPhone),
                  companyAddress:decryptStr(perInfoList.companyAddress),
                  companyPostCode:decryptStr(perInfoList.companyPostCode),
                  companyPhone:decryptStr(perInfoList.companyPhone),
                  otherAddress:decryptStr(perInfoList.otherAddress),
                  otherPostCode:decryptStr(perInfoList.otherPostCode),
                  linkPhone:decryptStr(perInfoList.linkPhone),
                  isSecret: '01',
                  // actualControl:perInfoList.actualControl?perInfoList.actualControl:perInfoList.custName,
                  // actualBenefit:perInfoList.actualBenefit?perInfoList.actualBenefit:perInfoList.custName,
                },
                memPic:perInfoList.memPic,
                certPic:perInfoList.certPic
              }
            });
          // }
      } else yield put({
          type:'fetch',
          payload:{
            perInfoList:{},
            loading:false,
            loadingMore:false
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
