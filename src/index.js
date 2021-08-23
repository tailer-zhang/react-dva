import './js/flexible_css.debug.js';
import './js/flexible.debug.js';
// import FastClick from 'fastclick'
// import './index.html';
import './index.less';
import dva from 'dva';
import {hashHistory} from 'dva/router';
import createLoading from 'dva-loading';
// import  VConsole  from  'vconsole';
// let vConsole = new VConsole();
// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/main').default);
app.model(require('./models/bxProduct').default);
app.model(require('./models/xtProduct').default);
app.model(require('./models/customer').default);
app.model(require('./models/perCustInfo').default);//个人客户详情
app.model(require('./models/instiCustInfo').default);//个人客户详情
app.model(require('./models/trade').default);
app.model(require('./models/tradeRedList').default);//赎回列表
app.model(require('./models/tradeRecList').default);//撤单列表
app.model(require('./models/bank').default);//银行卡列表
app.model(require('./models/tradeSafe').default);//交易B类产品
app.model(require('./models/tradeRebut').default);//交易 驳回修改
app.model(require('./models/formStorage').default);//交易 驳回修改
app.model(require('./models/tradeForm').default);//交易 驳回修改
app.model(require('./models/intentionWritten').default);//交易 意向签单
app.model(require('./models/vpShare').default);//交易 vp共享额度
app.model(require('./models/queueModel').default);//交易 vp共享额度
app.model(require('./models/relativeChangedModel').default);//更改的api
app.model(require('./routes/trade/bi_type_manage/private_type/models/PrivateTypeModel').default);//私募录入model
app.model(require('./routes/trade/bi_type_manage/utils/models/UploadModel').default);//上传文件的model
app.model(require('./routes/trade/bi_type_manage/public_type/models/PublicTypeModel').default);//公募录入的model
app.model(require('./routes/trade/bi_type_manage/reject/models/RejectModel').default);//驳回修改的model
app.model(require('./routes/trade/bi_type_manage/search/models/SearchModel').default);//查询列表的model
app.model(require('./routes/trade/bi_type_manage/investors_role_change/models/ApplyForChangeModel').default);//转换申请列表
app.model(require('./routes/trade/bi_type_manage/utils/models/ItemDetailModel').default);//含有多个tab的详情
app.model(require('./routes/trade/bi_type_manage/investors_search/models/InvestorSearchModel').default);//含有多个tab的详情
app.model(require('./routes/trade/bi_type_manage/investors_role_change_reject/models/ChangeRejectModel').default);//含有多个tab的详情
app.model(require('./routes/trade/bi_type_manage/investors_apply_inquery/models/ChangeApplyModel').default);//转换申请查询
app.model(require('./routes/trade/payment_of_interest/models/InterestModel').default);//付息/到期提醒
app.model(require('./routes/assetsCertification/apply/models/AssetsApplyModel').default);//资产证明
app.model(require('./routes/assetsCertification/apply/models/ProductCheckModel').default);//资产证明申请页面产品列表
app.model(require('./routes/assetsCertification/reject/models/AssetsRejectModel').default);//资产证明申请驳回列表
app.model(require('./routes/assetsCertification/search/models/AssetsSearchModel').default);//资产证明申请查询列表
app.model(require('./routes/assetsCertification/search/routes/approved/models/ApprovedModel').default);//打印列表 pdf列表
app.model(require('./models/openBank').default);//开户行 变更驳回以及详情部分
app.model(require('./models/dealModel').default)
app.model(require('./models/payProofModel').default); //打款凭证model
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


if (module.hot) {
    module.hot.accept();
}