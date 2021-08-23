import { fetchRoleChangeRejectList, abolish, roleChangeUpload } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'ChangeRejectModel',
  state: {
    status: false,
    changeList: [],
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
        if (location.pathname === '/roleChangeRejectCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              changeList: [],
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
      const ChangeRejectModel = yield select(state => state.ChangeRejectModel);
      let pageNum = ChangeRejectModel.pageNum;
      if (ChangeRejectModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = ChangeRejectModel.filterArgs ? ChangeRejectModel.filterArgs : {};
      const keyword = ChangeRejectModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword };
      const list = ChangeRejectModel.changeList;
      const { data } = yield call(fetchRoleChangeRejectList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            changeList: list.concat(data.list),
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

    *abolish({ payload }, { call, put, select }) {
      const param = payload.params
      const { data } = yield call(abolish, parse(param))
      payload.backMethod(data)
    },

    *roleChangeUpload({ payload }, { call, put, select }) {
      const param = payload.params
      const { data } = yield call(roleChangeUpload, parse(param))
      payload.backMethod(data)
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
