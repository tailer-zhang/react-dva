import { fetchRejectList, fetchRejectItemDetail1, fetchRejectItemDetail2, upload } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'RejectModel',
  state: {
    status: false,
    rejectList: [],
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
        if (location.pathname === '/rejectListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              rejectList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
              details: {},
            },
          })
        } else if (location.pathname === '/applyCnt') {
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
          if (location.state.from === '01' && location.action === 'PUSH') {
            dispatch({
              type: 'fetchRejectItemDetail1',
              payload: { reqSeq: location.state.dataSource.reqSeq, details: {}, },
            })
          } else if (location.state.from === '02' && location.action === 'PUSH') {
            dispatch({
              type: 'fetchRejectItemDetail2',
              payload: { reqSeq: location.state.dataSource.reqSeq },
            })
          }
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
      const RejectModel = yield select(state => state.RejectModel);
      let pageNum = RejectModel.pageNum;
      if (RejectModel.loadingMore === false) {
        pageNum = 1;
      }
      const arg = RejectModel.filterArgs ? RejectModel.filterArgs : {};
      const keyword = RejectModel.keyWord;
      const param = { offset: (pageNum - 1) * 5, limit: 5, ...arg, keyWord: keyword };
      const list = RejectModel.rejectList;
      const { data } = yield call(fetchRejectList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            rejectList: list.concat(data.list),
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
    *fetchRejectItemDetail1({ payload }, { call, put, select }) {
      const { data } = yield call(fetchRejectItemDetail1, payload);
      if (data.code === '00') {
        yield put({
          type: 'fetch',
          payload: {
            details: data,
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            key: data.model.videoPerson ? data.model.videoPerson : '',
            videoTime: data.model.videoTime,
            videoPerson: data.model.videoPersonName ? data.model.videoPersonName : '',
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            details: {},
          },
        });
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            videoPerson: '',
            videoTime: '',
          },
        });
      }
    },

    *fetchRejectItemDetail2({ payload }, { call, put, select }) {
      const { data } = yield call(fetchRejectItemDetail2, payload);
      if (data.code === '00') {
        yield put({
          type: 'fetch',
          payload: {
            details: data,
          },
        })
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            custName: data.model.custName,
            cardNo: data.model.cardNo,
            tradCode: data.model.tradCode,
            remitDate: data.model.remitDate,
            videoPerson: data.model.videoPersonName,
            videoTime: data.model.videoTime,
            reqAmt: data.model.reqAmt,
            key: data.model.videoPerson,
          },
        });
      } else {
        yield put({
          type: 'fetch',
          payload: {
            details: {},
          },
        });
        yield put({
          type: 'formStorage/fetchFormValue',
          payload: {
            custName: '',
            cardNo: '',
            tradCode: '',
            remitDate: '',
            videoPerson: '',
            videoTime: '',
            reqAmt: '',
          },
        });
      }
    },

    *upload({ payload }, { call, put, select }) {
      const param = payload.params;
      const { data } = yield call(upload, parse(param));
      payload.backMethord(data)
      yield put({
        type: 'fetch',
        payload,
      });
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
