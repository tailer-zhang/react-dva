import { fetchDetail, getTimeLineList, fetchRoleChangeDetail, fetchRejectTimeline, fetchRoleRejectChangeDetail } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'ItemDetailModel',
  state: {
    show: false,
    searchDetail: {},
    timeLineList: [],
    rejectDetails: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/itemDetail' && location.action === 'PUSH') {
          dispatch({
            type: 'formStorage/initState',
            location,
            initMethord: () => {
              dispatch({
                type: 'formStorage/fetchState',
                payload: {
                  formValue: {},
                },
                location,
              });
            },
          });
          if (location.state.origin === 'multi_searchList') {
            dispatch({
              type: 'fetchDetail',
              payload: { params: { reqSeq: location.state.source.reqSeq } },
            })
            dispatch({
              type: 'fetchTimeline',
              payload: { params: { reqId: location.state.source.reqSeq } },
            })
          } else if (location.state.origin === 'multi_rejectList') {
            dispatch({
              type: 'fetchRoleRejectChangeDetail',
              payload: location.state,
            })
            dispatch({
              type: 'fetchRejectTimeline',
              payload: { params: { reqId: location.state.dataSource.reqSeq } },
            })
          } else if (location.state.origin === 'inquiry_list') {
            dispatch({
              type: 'fetchRoleChangeDetail',
              payload: location.state,
            })
            dispatch({
              type: 'fetchRejectTimeline',
              payload: { params: { reqId: location.state.dataSource.reqSeq } },
            })
          }
        }
      });
    },
  },

  effects: {
    * fetchDetail({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      const { data } = yield call(fetchDetail, parse(param));
      if (data.code === '00' && data.model) {
        yield put({
          type: 'fetch',
          payload: {
            searchDetail: data.model,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            searchDetail: {},
          },
        });
      }
    },
    *fetchRoleChangeDetail({ payload }, { call, put, select }) {
      const param = { id: payload.id }
      const { data } = yield call(fetchRoleChangeDetail, parse(param));
      if (data.code === '00' && data.model) {
        yield put({
          type: 'fetch',
          payload: {
            rejectDetails: data.model,
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            begDate: data.model.tradDate,
            videoTime: data.model.videoTime,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            rejectDetails: {},
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            begDate: '',
            videoTime: '',
          },
        });
      }
    },

    *fetchRoleRejectChangeDetail({ payload }, { call, put, select }) {
      const param = { id: payload.id }
      const { data } = yield call(fetchRoleRejectChangeDetail, parse(param));
      if (data.code === '00' && data.model) {
        yield put({
          type: 'fetch',
          payload: {
            rejectDetails: data.model,
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            begDate: data.model.tradDate,
            videoTime: data.model.videoTime,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            rejectDetails: {},
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            begDate: '',
            videoTime: '',
          },
        });
      }
    },

    *fetchTimeline({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      const { data } = yield call(getTimeLineList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        const timeLineList = data.list;
        yield put({
          type: 'fetch',
          payload: {
            timeLineList: data.list,
          },
        });
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            timeLineList: { timeLineList },
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            timeLineList: [],
          },
        });
      }
    },
    *fetchRejectTimeline({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      const { data } = yield call(fetchRejectTimeline, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        const timeLineList = data.list;
        yield put({
          type: 'fetch',
          payload: {
            timeLineList: data.list,
          },
        });
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            timeLineList: { timeLineList },
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            timeLineList: [],
          },
        });
      }
    },
    *clearCache({ payload }, { call, put, select }) {
      yield put({
        type: 'fetch',
        payload: {
          ...payload,
        },
      });
    },
  },
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
