import { fetchApplyRejectList, assetsRejectAbolish, fetchRejectReason } from '../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'AssetsRejectModel',
  state: {
    status: false,
    assetsRejectList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
    reason: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/assetsRejectListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              assetsRejectList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
            },
          })
        } else if (location.pathname === '/assetsApplyReject' || location.pathname === '/searchRejectDetail') {
          dispatch({
            type: 'fetchRejectReason',
            payload: {
              id: location.state.id ? location.state.id : location.state.dataSource.id,
              reason: {},
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
      const AssetsRejectModel = yield select(state => state.AssetsRejectModel);
      let pageNum = AssetsRejectModel.pageNum;
      if (AssetsRejectModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = AssetsRejectModel.filterArgs ? AssetsRejectModel.filterArgs : {};
      const keyword = AssetsRejectModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = AssetsRejectModel.assetsRejectList;
      const { data } = yield call(fetchApplyRejectList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            assetsRejectList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // assetsRejectList: [],
            pageNum: 1,
            loadingMore: false,
            reach_bottom: true,
          },
        })
      }
    },

    *abolish({ payload }, { call, put, select }) {
      const params = payload.params
      const backMethod = payload.backMethod;
      const { data } = yield call(assetsRejectAbolish, parse(params))
      backMethod(data)
    },

    *fetchRejectReason({ payload }, { call, put, select }) {
      const params = {
        id: payload.id,
      }
      const { data } = yield call(fetchRejectReason, parse(params))
      if (data.code === '00') {
        yield put({
          type: 'fetch',
          payload: {
            reason: data.model,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            reason: {},
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
