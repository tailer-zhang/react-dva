export default {
    LOAD_LOGIN_USER:'jwt/wrap',//获取用户登陆Token
    REFRESH_LOGIN_USER:'jwt/webapp/refresh',//刷新Token
    // 产品
    FETCH_XTPRODUCT_LIST_URL:'product/private/list',//私募产品列表
    FETCH_TODAY_XTPRODUCT_LIST_URL:'product/private/todayProdlist',//私募今日上线产品列表
    FETCH_OTHER_XTPRODUCT_LIST_URL:'product/private/otherProdList',//私募其他上线产品列表
    FETCH_XTPRODUCT_DETAIL_URL:'product/private/view',//私募产品详情
    FETCH_XTPRODUCT_NAV_URL:'product/private/netWorthList',//净值走势
    FETCH_XTPRODUCT_CATEGORY_URL:'product/private/typeList',//份额类别
    FETCH_XTPRODUCT_PRODATA_URL:'product/private/fileList',//产品资料
    FETCH_XTPRODUCT_DETAIL_FULL_URL:'product/private/fullDetail',//私募产品详情全部信息包含近三个月的净值、产品资料列表、份额列表
    FETCH_XTPRODUCT_EXPRELIST_URL:'product/private/expePrdList',//获取待上线产品列表
    FETCH_XTPRODUCT_MEETINGDETAIL_URL:'product/private/viewMeeting',//获取产品会议详情
    FETCH_XTPRODUCT_BUYCUSTOMER_URL:'product/private/prodCustList ',//购买客户产品查询
    fetch_NOTIFYPRODUCT_LIST_URL:'prd/notice/list', //产品通知列表



    FETCH_BXPRODUCT_LIST_URL:'product/safe/list',//B类产品列表查询
    FETCH_BXPRODUCT_SCREEN_URL:'product/safe/selectPrd',//B类产品筛选
    FETCH_BXPRODUCT_SELECT_URL:'product/safe/proList',//B类产品筛选
    FETCH_BXPRODUCT_CATE_URL:'product/safe/kpiList',
    FETCH_BXPRODUCT_DETAIL_URL:'product/safe/view',//B类产品详情查询
    FETCH_XTPRODUCT_ORDER_URL:'product/private/reserve/create',//私募产品预约
    FETCH_CHECKISCOMMON_URL:'trade/checkIsCommon',//合规检查客户提示
    ADD_SHAREFILE_LOG_URL:'commom/shareFileLog',//文件分享日志


    //客户
    FETCH_CUSTOMER_LIST_URL:'customer/queryCustomer',//客户查询
    FETCH_CUSTOMER_WAIT_URL:'customer/queryUndoCustomer',//客户代办查询
    FETCH_CUSTOMER_WAIT_INFO_URL:'customer/getUndoCustomerDetail',//客户代办详情
    FETCH_PER_CUST_WAIT_MODIFY_URL:'perCustomer/updateUndoPerscustomerInfo',//个人客户代办修改
    FETCH_ORG_CUST_WAIT_MODIFY_URL:'bziCustomer/updateUndoBizCustomer',//机构客户代办修改
    FETCH_CUSTOMER_ABANDON_URL:'customer/giveupCustomer',//潜在客户放弃
    FETCH_CUSTOMER_BLACK_URL:'perCustomer/blackCustomer',//潜在客户拉黑
    FETCH_CUSTOMER_PER_ADD_URL:'perCustomer/addPerscustomerInfo',//潜在个人客户添加
    FETCH_CUSTOMER_PER_EDIT_URL:'perCustomer/updatePerscustomerInfo',//潜在个人客户编辑/或提交转正
    FETCH_CUSTOMER_ORG_ADD_URL:'bziCustomer/addBizCustomer',//潜在机构客户添加
    FETCH_CUSTOMER_ORG_EDIT_URL:'bziCustomer/updateBizCustomer',//潜在机构客户编辑/提交转正
    FETCH_CUSTOMER_PERINFO_URL:'perCustomer/getPersCustomerById',//个人客户详情
    FETCH_CUSTOMER_REVISIT_URL:'customer/getCustomerVist',//客户回访记录
    FETCH_CUSTOMER_DEALHISTORY_URL:'contract/querySignHistory',//客户交易(财付通)记录
    FETCH_CUSTOMER_DEAL_COLL_HIS_URL:'trade/tradeCollection',//客户交易(私募、B类产品)记录
    FETCH_CUSTOMER_HOLD_PROPERTY_URL:'custbalancequery',//持有金额结构查询
    FETCH_CUSTOMER_INSTICUSTINFO_URL:'bziCustomer/getBusiCustomerById',//机构客户详情
    FETCH_CUSTOMER_INSTI_MODIFY_URL:'bziCustomer/updateBizCustomer',//机构客户修改
    FETCH_CUSTOMER_RISK_INQUEIR_URL:'risk/querySubject',//风险测评查询列表
    FETCH_CUSTOMER_RISK_SUBMIT_URL:'risk/submitRiskEval',//风险测评题目提交

    FETCH_CUSTOMER_CUSTBANKCARD_URL:'backAcct/ownerCustList',//客户银行卡查询（从交易系统）
    FETCH_BANK_CUSTBANK_INQUIRE_URL:'backAcct/list',//客户银行卡管理（查询）
    FETCH_BANK_START_DISABLE_URL:'backAcct/used',//客户银行卡停用或者启用
    FETCH_BANK_CHANGE_URL:'cardchg/create',//客户银行卡变更
    FETCH_BANK_MODIFY_URL:'backAcct/update',//客户银行卡修改
    FETCH_BANK_CREATE_URL:'backAcct/create',//客户银行卡新增
    FETCH_CUSTOMER_POSITION_LIST_URL: 'cardchg/list', //持仓列表
    APPLY_RECORDS_LIST: 'cardchg/chgList', //申请记录查询
    REJECT_LIST: 'cardchg/rejectList', //驳回列表
    ABOLISH_URL: 'cardchg/cancel', // 作废
    REJECT_SUBMIT_URL: 'cardchg/reject', //驳回修改提交

    FETCH_TRADESAFEINQUIRE_URL:'insurance/list',//B类产品查询
    FETCH_TRADESAFECONTRACT_URL: 'insurance/view',//B类产品查询详情
    FETCH_TRADESAFEREINFO_URL: 'insurance/taskList',//B类产品驳回修改查询
    FETCH_TRADESAFERE_REJECT_MODIFY_URL: 'insurance/update',//B类产品驳回修改编辑
    FETCH_TRADESAFERE_REJECT_DELETE_URL: 'insurance/delete',//B类产品驳回修改删除
    FETCH_TRADESAFERE_ENTER_URL: 'insurance/create',//B类产品录入

    UPLOAD_CUSTOMER_FILE_URL:'upLoadPicture',//上传图片


    //交易
    FETCH_CUSTSHR_LIST_URL:'custShr/list',//客户持仓列表查询
    FETCH_SM_TRADE_LIST_URL:'trade/tradeList',//私募交易列表查询
    FETCH_CUSTAMT_LIST_URL:'custAmt/list',//客户资金列表查询
    FETCH_CUSTAMTDIVI_LIST_URL:'buy/capitalPayList',//客户分红列表查询
    FETCH_CUSTAMT_VIEW_URL:'custAmt/view',//客户资金详情查询
    FETCH_CUSTAMTDIVI_VIEW_URL:'custAmt/diviview',//客户分红详情查询

    //转受让
    FETCH_SHARETRANS_LIST_URL:'sharetrans/list.json',//客户持仓列表查询
    FETCH_SELECT_CUSTINFO_LIST_URL:'select/custInfo',//受让方银行卡列表查询
    FETCH_SELECT_PROD_LIST_URL:'select/prodList',//管理人客户转入，产品名称选择列表
    FETCH_SELECT_SHRTYPE_LIST_URL:'select/shrTypeList',//管理人客户转入，产品类别选择列表
    FETCH_SELECT_CUSTISEXISTS_URL:'select/custIsExists',//受让方客户信息是否存在
    FETCH_CREATE_URL:'sharetrans/create',//转给本人、理财师、管理人客户 转受让交易录入提交
    FETCH_INPUT_CREATE_URL:'sharetrans/input_create',//管理人客户转入 转受让交易录入提交
    FETCH_REJECT_URL:'sharetrans/reject',//驳回修改 转受让交易修改页面提交


    FETCH_TRADEBUY_LIST_URL:'buy/resvList',//私募 交易 私募产品购买
    FETCH_TRADEBUY_VALID_LEVEL:'buy/validProdLevel ',//私募 交易 私募产品购买前的校验
    FETCH_TRADEREDEEM_LIST_URL:'redm/list',//私募 交易 赎回列表
    FETCH_TRADEREDEEM_HINT_LIST_URL: 'remind/openRedmList', //开放期赎回
    FETCH_TRADERECALL_LIST_URL:'recall/list',//私募 交易 撤单列表
    FETCH_TRADEDETAIL_VIEW_URL:'custShr/view',//私募 交易
    FETCH_TRADEDTASK_LIST_URL:'trade/taskList',
    FETCH_REDEEMINFO_VIEW_URL:'trade/view',//私募交易详情查询接口
    FETCH_TRADE_BUY_TEMP_URL:'trade/tempView',//私募交易购买暂存信息

    FETCH_ORDERVIEW_INFO_URL:'product/private/reserve/view',//产品预约详情
    FETCH_THISMONTH_INFO_URL:'trade/presentMonthTrade',//交易主页面
    FETCH_XTTRADEMAIN_MEUN_URL:'trade/countExpireAndReject',
    FETCH_WILLEXPIRE_LIST_URL:'trade/willExpireList',
    FETCH_MYORDER_LIST_URL:'product/private/reserve/sellerReserveList',//我的预约

    FETCH_QUEUE_LIST_URL:"product/private/reserve/lineUpList",//排队列表
    FETCH_QUEUE_LIST_DETAIL_URL: "product/private/reserve/lineUpView",//排队列表详情
    UPDATE_SUBMIT_CONTENT:"product/private/reserve/update",//私募信托产品预约修改
    BEFORE_CREATE_TO_ALERT:"product/private/reserve/checkWaitAmt",//预约创建的时候是否有提示
    GET_TIME_LIMITS_URL:"product/private/reserve/getJudgeDate",//获取预约打款日期时间区间
    GET_WILL_ORDDATE_URL: "select/ordDate",

    //交易Form
    FETCH_CAPILIST_INPUT_URL:'buy/amt/addOrEdit',//私募交易汇款信息添加/修改
    FETCH_TRADEENTER_BUY_URL:'buy/enter',//购买提交（私募交易信息录入 合同详情）
    FETCH_UPLOADPICTURE_FILES_URL:'upLoadPicture',//购买提交（添加影音資料）
    FETCH_CAPIDELETE_AEM_URL:'buy/amt/delete',//购买提交（删除汇款信息）
    FETCH_TRADEREBUT_CANCEL_URL:'trade/cancel',//交易作废 （赎回，撤单）
    FETCH_CANCELORDER_BTN_URL:'product/private/reserve/cancel',//交易 我的预约  取消预约
    FETCH_RECALLCREADE_ASK_URL:'recall/create',//交易   撤单 撤单申请
    FETCH_REEDEEMCREADE_ASK_URL:'redm/create',//交易   赎回 赎回申请
    FETCH_RECALLUPDATE_REBUT_URL:'recall/update',//交易 驳回修改 撤单驳回修改提交
    FETCH_REDEEMUPDATE_REBUT_URL:'redm/update',//交易 驳回修改 赎回驳回修改提交
    FETCH_SUBMIT_BUY_URL:'buy/submit',// 认、申购驳回修改
    FETCH_TRADEUPLOAD_FILE_VIEW_URL:'trade/upload',//认申购影印资料上传,
    DEL_TRADEUPLOAD_FILE_URL:'trade/fileDelete',//影印资料删除
    DEL_TRADEUPLOAD_DELETE_URL:'insupay/deleteInsu',//缴费记录附件资料删除
    DEL_INSUPAY_DELETE_URL:'insupay/delete',//缴费记录删除
    FETCH_PAYEE_ACCOUNT_LIST_URL:'select/prodAcctList',//收款人账号列表获取
    SUBMIT_TRADE_BUY_URL:'buy/enter',//交易购买操作
    FETCH_CONTRACT_NO_LIST:'product/private/reserve/addOrderContList',//查询合同号

    UPLOAD_COMMON_FILES_URL:'trade/fileupload',//交易通用文件上传
    FETCH_TRADEUPLOAD_FILE_NAME_URL: 'trade/fileNameChange',//上传文件名字
    FETCH_TRADEUPLOAD_GET_FILE_NAME_URL: 'trade/singleFileView',//得到文件的名字

  /**
   *  双录
   */
  FETCH_BI_INPUT_LIST: 'investorChg/videoCust', //双录列表
  UPLOAD_PRIVATE: 'investorChg/videoLoad', //私募双录录入提交
  UPLOAD_PUBLIC: 'investorChg/createPubVideo', //公募双录录入提交
  FETCH_BI_PUBLIC_INPUT_LIST: 'investorChg/prodList', //公募产品列表
  FETCH_BI_ACCEPTOR_LIST: 'investorChg/querySpecialPerson', //获得受理人员列表
  FETCH_REJECT_LIST: 'investorChg/pubRejectList', //驳回修改列表
  FETCH_SEARCH_LIST: 'investorChg/videoList', //双录查询列表
  FETCH_REJECT_DETAIL_PRIVATE: 'investorChg/rejectView', //驳回列表详情
  FETCH_REJECT_DETAIL_PUBLIC: 'investorChg/pubRejectView', //驳回列表详情
  REJECT_DETAIL_UPLOAD: 'investorChg/updatePubVideo', //驳回列表详情提交
  PRIVATE_FETCH_FILE_LIST: 'trade/listTradeFile', // 私募查询交易附件
  PUBLIC_FETCH_FILE_LIST: 'trade/listPubTradeFile', // 公募查询交易附件
  DELETE_PUBLIC_FILES: 'trade/pubFileDelete', //删除公募附件
  SEARCH_DETAILS: 'investorChg/videoView', //双录入查询详情
  GET_TIMELINE_LIST: 'trade/applyLogList', //操作流水
  DELETE_LOCAL_FILE: 'trade/localFileDelete', //删除本地上传的文件
/**
   *  转换
   */
  APPLY_FOR_CHANGE_LIST: 'investorChg/investorChglist', //转换申请列表
  FETCH_ROLE_CHANGE_REJECT_LIST: 'investorChg/rejectList', //转换修改页面
  INVESTOR_SEARCH_LIST: 'investorChg/investorList', //投资者查询列表
  APPLY_FOR_CHANGE_UPLOAD: 'investorChg/createInvestorChg', //转换申请提交
  FETCH_ROLE_CHANGE_DETAIL: 'investorChg/invelistView', //转换申请详情
  FETCH_ROLE_REJECT_DETAIL: 'investorChg/inveRejectView', //转换驳回详情
  CHANGE_ABOLISH: 'investorChg/cancel', //转换废除
  CHANGE_ABOLISH_UPLOAD: 'investorChg/investorChgReject', //转换驳回修改提交
  CHANGE_APPLY_FOR_LIST: 'investorChg/invelist', //转换申请查询列表
  FETCH_REJECT_TIME_LINE: 'trade/logList', //驳回列表的timeline

  FETCH_PAYMENT_OF_INTEREST_LIST: 'remind/remidPayxiList', //付息/到期提醒

  FETCH_ASSETS_APPLY_LIST: 'assetProof/assetProofList', //资产证明申请列表
  ASSETS_APPLY_UPLOAD: 'assetProof/createAssetProof', //资产证明申请提交
  ASSETS_APPLY_REJECT: 'assetProof/reject', //驳回提交
  ASSETS_PROOF_PRODLIST: 'assetProof/assetProofProdList', //资产证明申请产品列表
  FETCH_MANAGER_LIST: 'assetProof/queryManagerList', //资产证明管理人列表
  ASSETS_APPLY_SEARCH_LIST: 'assetProof/searchList', //资产证明申请查询数据
  ASSETS_APPLY_REJECT_LIST: 'assetProof/rejectList', //资产证明驳回修改数据
  ASSETS_REJECT_UPLOAD: 'assetProof/reject', //资产证明驳回修改提交
  ASSETS_REJECT_ABOLISH: 'assetProof/delete', //资产证明申请废除
  ASSETS_LOG_LIST: 'assetProof/printLogList', //资产证明打印日志
  ASSETS_FILE_LIST: 'assetProof/fileList ', //资产证明文件列表
  ASSETS_REJECT_REASON: 'assetProof/view', //驳回原因

  /**
     * 新增意向签单
     */
    FETCH_PRETRADREQ_URL:'preTradReq/list',//意向签单分页列表查询
    FETCH_PREPRODUCT_LIST_URL:'preTradReq/prodList',//意向产品查询
    ADD_PRETRADREQ_URL:'preTradReq/create',//意向签单调查创建
    FETCH_PRETRADREQ_DETAIL_URL:'preTradReq/view',//意向签单调查详情

    /**
     * 新增vp共享额度
     */
    FETCH_VPSHARE_LIST_URL:'product/private/amount/vpAmountList',//VP共享额度查询
    FETCH_VPSHARE_DETAIL_URL:'product/private/amount/view',//vp共享额度详情查看
    FETCH_PREPROCESS_LIST_URL:'product/private/progressList',//存续进度

    FETCH_FUND_CHANGE_LIST_URL:'fundtrans/list',                  // 基金转换查询
    FETCH_FUND_CHANGE_PROD_LIST:'fundtrans/getTargProdInfo',     // 基金转入产品查询
    FETCH_FUND_CHANGE_SUBMIT:'fundtrans/create',                   // 基金转换提交
    FETCH_FUND_CHANGE_UPDATE:'fundtrans/update',                  // 基金转换驳回修改

    /**
     * 更改的api
     */
    FETCH_RELATIVE_CHANGED_CUSTOMER_LIST_URL:'select/custList',

    // 访问足迹
    RECORDE_VISIT_TIMES: '/product/private/viewMarkLog ',

    //根据用户id访问用户名
    GET_USER_NAME: 'cache/user',

    //开户行变更
    BANK_CARD_CHANGELIST: 'backAcct/cardBankChangeList', //开户行变更列表
    CHANGE_UPDATE: 'backAcct/cardChangeUpdate', //变更提交
    CHANGE_REJECT: 'backAcct/reject', //驳回修改提交
    ACCOUNT_DETAILS: 'backAcct/invelistView', //开户行变更详情
    REJECT_MORE_DETAILS: 'backAcct/rejectView', //驳回修改详情
    APPLY_MORE_DETAILES: 'investorChg/invelistView', //申请详情

    //到期交易
    DEADLINE_DEAL_LIST: 'product/private/reserve/tradeRenewList',

    POSTPONE_LIST: 'postpone/list', //延期申请列表
    POSTPONE_CREATE: 'postpone/create', //提交创建
    POSTPONE_UPDATE: 'postpone/update', //驳回修改提交
    GET_DATE: 'postpone/endDate', // 合同到期日
    // ABOLISH_POSTPONE: 'trade/cancel', // 作废

      CUST_REGISTER_LIST: 'custRegister/custRegisterlist', //登记注册身份验证查询列表
      CUST_REGISTER_FILE: 'custRegister/custRegisterFile', //登记注册身份验证附件查询

      UPDATE_SIGN_TYPE: 'buy/updateSignType', //更新签署方式
    PAY_PROOF_LIST:'trade/proofUploadList', //打款凭证列表
    REMIT_UPLOAD:'trade/remitUpload',//打款凭证提交
    VALID_RECALL:'recall/validRecall',//撤单验证
    ORI_RECALL_LIST:'recall/recallList',//原撤单列表
    VALID_PROD_INFO:'redm/validProdInfo',//赎回验证
    REDEEM_LIST:'redm/redeemList.json',//列表
};
