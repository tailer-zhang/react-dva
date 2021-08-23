import { fetchAssetProofProdList, applyForchangeUpload } from '../../../../services/trade';
import { parse } from 'qs';

export default {
  namespace: 'ProductCheckModel',
  state: {
    status: false,
    productList: [],
    pageNum: 1,
    loadingMore: false,
    reach_bottom: false,
    filterArgs: {},
    keyWord: '',
    custId: '',
    managerCode: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/productListCnt') {
          dispatch({
            type: 'fetchList',
            payload: {
              status: false,
              productList: [],
              pageNum: 1,
              loadingMore: false,
              reach_bottom: false,
              filterArgs: {},
              keyWord: '',
              custId: location.state.custId,
              managerCode: location.state.managerCode,
            },
          })
        } else if (location.pathname === '/assetsApplyCnt' && location.action === 'PUSH') {
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
      const ProductCheckModel = yield select(state => state.ProductCheckModel);
      let pageNum = ProductCheckModel.pageNum;
      if (ProductCheckModel.loadingMore === false) {
        pageNum = 1;
      }
      const custId = ProductCheckModel.custId
      const managerCode = ProductCheckModel.managerCode
      const arg = ProductCheckModel.filterArgs ? ProductCheckModel.filterArgs : {};
      const keyword = ProductCheckModel.keyWord;
      const param = { offset: (pageNum - 1) * 10, limit: 10, ...arg, keyWord: keyword, custId, managerCode };
      const list = ProductCheckModel.productList;
      const { data } = yield call(fetchAssetProofProdList, parse(param));
      if (data.code === '00' && data.list && data.list.length > 0) {
        yield put({
          type: 'fetch',
          payload: {
            productList: list.concat(data.list),
            pageNum: pageNum + 1,
            loadingMore: false,
            reach_bottom: data.list.length < 10,
          },
        })
      } else {
        yield put({
          type: 'fetch',
          payload: {
            // productList: [],
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
