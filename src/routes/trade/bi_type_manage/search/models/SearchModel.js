import { fetchSearchList } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'SearchModel',
  state: {
    status: false,
    searchList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/searchListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              searchList: [],
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
      const SearchModel = yield select(state => state.SearchModel);
      let pageNum = SearchModel.pageNum;
      if (SearchModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = SearchModel.filterArgs ? SearchModel.filterArgs : {};
      const keyword = SearchModel.keyWord;
      const param = { offset: (pageNum - 1) * 5, limit: 5, ...arg, keyWord: keyword };
      const list = SearchModel.searchList;
      const { data } = yield call(fetchSearchList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            searchList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 5,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
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
