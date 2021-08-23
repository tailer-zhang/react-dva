import { fetchAssetsSearchList, applyForchangeUpload } from '../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'AssetsSearchModel',
  state: {
    status: false,
    assetsSearchList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/assetsSearchListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              assetsSearchList: [],
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
      const AssetsSearchModel = yield select(state => state.AssetsSearchModel);
      let pageNum = AssetsSearchModel.pageNum;
      if (AssetsSearchModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = AssetsSearchModel.filterArgs ? AssetsSearchModel.filterArgs : {};
      const keyword = AssetsSearchModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = AssetsSearchModel.assetsSearchList;
      const { data } = yield call(fetchAssetsSearchList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            assetsSearchList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // assetsSearchList: [],
            pageNum: 1,
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
