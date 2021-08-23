import { fetchAssetsApplyList, assetsApplyUpload, assetsApplyReject } from '../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'AssetsApplyModel',
  state: {
    status: false,
    assetsApplyList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/assetsApplyListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              assetsApplyList: [],
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
      const AssetsApplyModel = yield select(state => state.AssetsApplyModel);
      let pageNum = AssetsApplyModel.pageNum;
      if (AssetsApplyModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = AssetsApplyModel.filterArgs ? AssetsApplyModel.filterArgs : {};
      const keyword = AssetsApplyModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = AssetsApplyModel.assetsApplyList;
      const { data } = yield call(fetchAssetsApplyList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            assetsApplyList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 5,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // assetsApplyList: [],
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },

    *assetsApplyUpload({ payload }, { call, put, select }) {
      const params = payload.params
      const backMethod = payload.backMethod;
      const { data } = yield call(assetsApplyUpload, parse(params))
      backMethod(data)
    },
    *assetsApplyReject({ payload }, { call, put, select }) {
      const params = payload.params
      const backMethod = payload.backMethod;
      const { data } = yield call(assetsApplyReject, parse(params))
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
