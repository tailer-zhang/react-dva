import { fetchInvestorsList } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'InvestorSearchModel',
  state: {
    status: false,
    investorList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
    details: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/investorSearchListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              investorList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
              details: {},
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
      const InvestorSearchModel = yield select(state => state.InvestorSearchModel);
      let pageNum = InvestorSearchModel.pageNum;
      if (InvestorSearchModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = InvestorSearchModel.filterArgs ? InvestorSearchModel.filterArgs : {};
      const keyword = InvestorSearchModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = InvestorSearchModel.investorList;
      const { data } = yield call(fetchInvestorsList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            investorList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // privateInputList: [],
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },

    *clear({ payload }, { call, put, select }) {
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
