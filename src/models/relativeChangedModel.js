import {fetchCustomerList} from '../services/relativeChanged';
import { parse } from 'qs';
import * as common from '../utils/commonUtil'

export default {
  namespace: 'relativeChangedModel',
  state:{
    customerList:[],
    customerWaitList: [],
    custName:'',
    pageNumber:1,
    filterArgs:{},
    riskSubmitObject: {},
    loadingMore:false,
    loading:false,
    sortOrder:0,//默认排序
    reach_bottom: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/typeToSelectCustomer') {
          let state = location.state;
          let filter = state.filter;
          dispatch({
            type:'fetch',
            payload:{
              customerList:[]
            }
          });
          dispatch({
            type:'fetchRemote',
            payload: {...location.query, filterArgs1:filter?filter:{}, custName:'', filterMode:'selectCustomer'}
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
      let customer = yield select(state => state.relativeChangedModel);
      let pageNumber = customer.pageNumber;
      let filterArgs = customer.filterArgs;
      // let custName = customer.custName;
      // let ownerCode = '000042';//理财师工号
      //通过filterMode来进行区分选择客户和查询客户的筛选条件
      if(customer.filterMode)
      {
        console.log('拿到的过滤掉的列表', customer.filterArgs1)
        filterArgs  = customer.filterArgs1;
        // custName = customer.custName1;
      }
      if(customer.loadingMore==false)
        pageNumber = 1;


      let param = {pageNumber:pageNumber, pageSize:10, type:filterArgs.reserveRank?filterArgs.reserveRank:'', custName: payload.custName ? payload.custName : ''};
      // if(customer.reserveRank){
      //   param.custName=customer.searchWord;
      // }
      let {data}  = yield call(fetchCustomerList, parse(param));
      console.log('筛选~~~~~~~~', data)
      let result = data
      let list = customer.customerList;
      if(result&&result.data!=undefined&&result.data.length>0)
      {
        yield put({
          type:'fetch',
          payload:{
            customerList:pageNumber>1?list.concat(result.data):result.data,
            loading:false,
            loadingMore:false,
            pageNumber:pageNumber+1,
            reach_bottom: result.data.length < 10,
          }
        });
      }
      else  yield put({
        type:'fetch',
        payload:{
          customerList:pageNumber>1?list:[],
          loading:false,
          loadingMore:false,
          reach_bottom: true
        }
      });
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
