import {loadLoginUser,refreshLoginUser, getUserName} from '../services/main';
import * as common from '../utils/commonUtil';
import { parse } from 'qs';

export default {
  namespace: 'main',
  state:{
    userObject:{},
  },
  subscriptions: {
      setup({ dispatch, history }) {
        history.listen(location => {
          if(location.pathname === '/loadLoginUser') {
            dispatch({
              type: 'loadLoginUser',
              payload: location.state
            })
          }else if(location.pathname === '/refreshLoginUser') {
            dispatch({
              type: 'refreshLoginUser',
              payload: location.state
            })
          }
        });
      },
    },
  effects: {
    *loadLoginUser({ payload }, { call, put,select }) {
      let {accessToken, userObj} = payload;
      let param = {accessToken:accessToken,client_id:common.APP_CLIENT_ID};
      let {data} =  yield call(loadLoginUser, parse(param));
      console.log('res======', data);
      payload.backMethord(data);
    },
    *getUserName({ payload }, { call, put,select }) {
      let {data} =  yield call(getUserName, {});
      payload.backMethod(data);
      console.log('data---', data)
    },
  },
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    }
  },
}
