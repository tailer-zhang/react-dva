import { changeApplyForSearch } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'ChangeApplyModel',
  state: {
    status: false,
    applyforChangeList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/investorApplyInqueryCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              applyforChangeList: [],
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
      const ChangeApplyModel = yield select(state => state.ChangeApplyModel);
      let pageNum = ChangeApplyModel.pageNum;
      if (ChangeApplyModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = ChangeApplyModel.filterArgs ? ChangeApplyModel.filterArgs : {};
      const keyword = ChangeApplyModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = ChangeApplyModel.applyforChangeList;
      const { data } = yield call(changeApplyForSearch, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            applyforChangeList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 5,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // applyforChangeList: [],
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
