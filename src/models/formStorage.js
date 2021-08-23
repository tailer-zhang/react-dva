export default {
  namespace: 'formStorage',
  state:{
    formValue:{},
    saveValue:{},
  },
  subscriptions:{
    setup({ dispatch, history }){
      history.listen(location => {

      });
    },
  },
  effects:{
    *fetchRemote({ payload }, { call, put,select })
    {

    },
    *initState(payloadParam, { call, put,select })
    {
      let { payload,location,initMethord,popMethord} = payloadParam;
      let state = yield select(state=>state.formStorage);
      let {pathname,action} = location;
      pathname = pathname+'_inital';
      if(state[pathname]==true&&action=='POP')
      {
        if(popMethord)
          popMethord(state);
        return;
      }
      if(initMethord)
        initMethord(state);
    },
  },
  reducers: {
    //对state进行直接赋值
    fetchState(state,action)
    {
      let {payload,location} = action;
      if(!location)
        return state;
      let pathname = location.pathname+'_inital';
      let initalState = {};
      initalState[pathname]  = true;
      // if(state.inital==true&&jumpAction=='POP')
      //   return state;
      return {...action.payload,...initalState};

    },
    fetch(state, action) {
      let location = action.location;
      let initalState = {};
      if(location)
      {
        let {pathname} = location;
        pathname = pathname+'_inital';
        initalState[pathname] = true;
      }
      return { ...state, ...action.payload,...initalState};
    },

    fetchFormValue(state,action)
    {
      //console.log('--fetchFormValue--',state.formValue,action.payload);
      return {...state,formValue:{...state.formValue,...action.payload}};
    },

    fetchNewState(state,action)
    {
      let {newValue,key} = action.payload;
      let newState = {};
      newState[key] = {...state[key],...newValue};
      return {...state,...newState};
    },
  },
}
