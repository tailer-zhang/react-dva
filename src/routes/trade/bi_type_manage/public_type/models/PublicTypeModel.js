import { fetchPublicInputList } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'PublicTypeModel',
  state: {
    status: false,
    publicInputList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/pubbiTypeInputListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              publicInputList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
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
      const PublicTypeModel = yield select(state => state.PublicTypeModel);
      let pageNum = PublicTypeModel.pageNum;
      if (PublicTypeModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = PublicTypeModel.filterArgs ? PublicTypeModel.filterArgs : {};
      const keyword = PublicTypeModel.keyWord;
      const param = { offset: (pageNum - 1) * 5, limit: 5, ...arg, keyWord: keyword };
      const list = PublicTypeModel.publicInputList;
      const { data } = yield call(fetchPublicInputList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            publicInputList: list.concat(data.list),
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
