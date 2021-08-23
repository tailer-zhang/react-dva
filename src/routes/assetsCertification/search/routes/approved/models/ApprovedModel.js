import { fetchFileList, fetchLogList } from '../../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'ApprovedModel',
  state: {
    status: false,
    fileList: [],
    logList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/approvedCnt') {
          dispatch({
            type: 'fetchFileList',
            payload: {
              fileList: [],
              reqSeq: location.state.dataSource.reqSeq,
            },
          })
          dispatch({
            type: 'fetchLogList',
            payload: {
              logList: [],
              reqSeq: location.state.dataSource.reqSeq,
            },
          })
        }
      });
    },
  },

  effects: {
    *fetchFileList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const param = { reqSeq: payload.reqSeq }
      const { data } = yield call(fetchFileList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            fileList: data.list,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            fileList: [],
          },
        })
      }
    },

    *fetchLogList({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload: { ...payload },
      });
      const param = { reqSeq: payload.reqSeq }
      const { data } = yield call(fetchLogList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            logList: data.list,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            logList: [],
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
