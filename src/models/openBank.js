import {fetchDetails, fetchRebutPrivateList} from '../services/trade';
import {changeReject} from '../services/bank';
import { parse } from 'qs';
import * as Commons from "../utils/commonUtil";

export default {
  namespace: 'openBank',
  state:{
    loading:false,
    fileList: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/accountChangeDetails' || location.pathname === '/rebutBankDetail') {
          dispatch({
            type: 'formStorage/initState',
            location,
            initMethord: () => {
              dispatch({
                type: 'formStorage/fetchState',
                payload: {
                  formValue: {},
                  fileList:[],
                  changeList: []
                },
                location,
              });
            },
          });
          dispatch({
            type: 'fetchDetails',
            payload: location.state,
          })
        }
      });
    }
  },
  effects: {
    *fetchDetails({ payload }, { call, put,select }) {
      let param = {id: payload.id };
      console.log(param);
      let {data} =  yield call(fetchDetails, parse(param));
      if(data.code === '00'){
        let param = {reqSeq: data.model.reqNo, matrType: 'k' };
        const result = yield call(fetchRebutPrivateList, param);
        if(result.data.code === '00'&&result.data.list&&result.data.list.length > 0){
          let arr = []
          let list = result.data.list
          for (let i = 0; i < list.length; i++) {
            let temp = {
              fileId: list[i].id,
              fileName: list[i].srcFileName,
              url: Commons.ImageHostAddress + list[i].fileSvrPath
            }
            arr.push(temp)
          }
          yield put({
            type: 'formStorage/fetch',
            payload: {
              changeList: arr
            }
          })
        }else {
          yield put({
            type: 'formStorage/fetch',
            payload: {
              changeList: []
            }
          })
        }
        //产品名称循环获取
        if(data.model&&data.model.childList&&data.model.childList.length > 0){
          let childlist = data.model.childList
          let fileList = []
          let myFileArr = []
          for(let i = 0; i < childlist.length; i++){
             let temp = {
               prodName: childlist[i].prodName
             }
            let subarr = []
            let param = {reqSeq: childlist[i].reqNo, matrType: 'k' };
            const result = yield call(fetchRebutPrivateList, param);
            if(result.data&&result.data.code==='00'&&result.data.list&&result.data.list.length > 0){
              let sublist = result.data.list
              for(let j = 0; j < sublist.length; j++){
                let temp1 = {
                  fileId: sublist[j].fileSvrPath,
                  id: sublist[j].id
                }
                subarr.push(temp1)
              }
            }
            myFileArr[i] = subarr
            yield put({
              type: 'formStorage/fetch',
              payload: {
                myFileArr: myFileArr,
                childlist: childlist
              }
            })
             fileList.push(temp)
          }
          yield put({
            type: 'formStorage/fetch',
            payload: {
              fileList: fileList
            }
          })
        }
      } else  yield put({
        type:'fetch',
        payload:{
          fileList:[],
        }
      });
    },
    *changeReject({ payload },{ call, put,select }) {
      let params = payload.params;
      let {data} = yield call(changeReject,params);
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
