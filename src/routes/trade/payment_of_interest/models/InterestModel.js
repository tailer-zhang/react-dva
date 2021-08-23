import { fetchinterestList } from '../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'InterestModel',
  state: {
    status: false,
    interestList: [],
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
        if (location.pathname === '/paymentOfInterestCnt' && location.action === 'PUSH') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              interestList: [],
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
      const InterestModel = yield select(state => state.InterestModel);
      let pageNum = InterestModel.pageNum;
      if (InterestModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = InterestModel.filterArgs ? InterestModel.filterArgs : {};
      const keyword = InterestModel.keyWord;
      const param = { offset: (pageNum - 1) * 5, limit: 5, ...arg, keyWord: keyword };
      const list = InterestModel.interestList;
      const { data } = yield call(fetchinterestList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            interestList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 5,
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
