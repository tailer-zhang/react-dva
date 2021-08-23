import { fetchPrivateInputList } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'PrivateTypeModel',
  state: {
    status: false,
    privateInputList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/biTypeInputListCnt' || location.pathname === '/applyPending') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              privateInputList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
            },
          })
        }
        if (location.pathname === '/biTypeInputItemDetailCnt') {
          dispatch({
            type: 'fetchDetail',
            payload: '',
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
      const PrivateTypeModel = yield select(state => state.PrivateTypeModel);
      let pageNum = PrivateTypeModel.pageNum;
      if (PrivateTypeModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = PrivateTypeModel.filterArgs ? PrivateTypeModel.filterArgs : {};
      const keyword = PrivateTypeModel.keyWord;
      const param = { offset: (pageNum - 1) * 5, limit: 5, ...arg, keyWord: keyword };
      const list = PrivateTypeModel.privateInputList;
      const { data } = yield call(fetchPrivateInputList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            privateInputList: list.concat(data.list),
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
