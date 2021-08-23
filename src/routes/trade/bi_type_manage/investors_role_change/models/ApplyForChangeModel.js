import { fetchapplyforChangeList, applyForchangeUpload } from '../../../../../services/trade';
import { fetchCustomerList } from '../../../../../services/relativeChanged';
import { parse } from 'qs';

export default {
  namespace: 'ApplyForChangeModel',
  state: {
    status: false,
    applyforChangeList: [],
    pageNumber: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
    custName: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/applyforChangeCnt' && location.action === 'PUSH') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              applyforChangeList: [],
              pageNumber: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
              custName: '',
            },
          })
        }
      });
    },
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const ApplyForChangeModel = yield select(state => state.ApplyForChangeModel);
      let pageNumber = ApplyForChangeModel.pageNumber;
      if (ApplyForChangeModel.loadingMore === false) {
        pageNumber = 1;
      }
      const custName = ApplyForChangeModel.custName;
      const param = {
        pageNumber,
        pageSize: 10,
        type: '2',
        custName,
      };
      const list = ApplyForChangeModel.applyforChangeList;
      const { data } = yield call(fetchCustomerList, parse(param));
      const result = data

      if (result && result.data !== undefined && result.data.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            applyforChangeList: list.concat(result.data),
            pageNumber: pageNumber + 1,
            loadingMore: false,
            reach_bottom: result.data.length < 5,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            pageNumber: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },

    *applyForchangeUpload({ payload }, { call, put, select }) {
      const params = payload.params
      const backMethod = payload.backMethod;
      const { data } = yield call(applyForchangeUpload, parse(params))
      backMethod(data)
    },

    *clear({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload,
      });
    },

    * fetchDetail({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'fetch',
        payload,
      });
    },

  },
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
