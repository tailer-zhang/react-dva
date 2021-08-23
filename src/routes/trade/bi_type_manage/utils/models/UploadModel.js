import { uploadPrivate, uploadPublic } from '../../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'uploadModel',
  state: {
    show: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location)
      });
    },
  },

  effects: {
    * upload({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      const { data } = yield call(uploadPrivate, parse(param));
      payload.backMethord(data)
      yield put({
        type: 'fetch',
        payload,
      });
    },
    * uploadPublic({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const param = payload.params;
      // const { data } = yield call(uploadPublic, parse(param), payload.files);
      const { data } = yield call(uploadPublic, parse(param));
      payload.backMethord(data)
      yield put({
        type: 'fetch',
        payload,
      });
    },
    *remove({ payload }, { call, put, select }) {
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
