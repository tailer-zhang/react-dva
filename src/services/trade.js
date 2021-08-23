// import request from '../utils/request';
// import qs from 'qs';
import  URLS from '../utils/Urls';
import * as commonUtil from '../utils/commonUtil';

import { requestWithToken, requestWithUploadImage, requestWithUploadFiles } from '../utils/commonRequestUtils';
export async function fetchBuyList(params) {
   return requestWithToken(URLS.FETCH_TRADEBUY_LIST_URL,params,'product');
}
export async function fetchvalidProdLevel(params) {
  return requestWithToken(URLS.FETCH_TRADEBUY_VALID_LEVEL,params,'product');
}
export async function fetchRecallList(params) {
   return requestWithToken(URLS.FETCH_TRADERECALL_LIST_URL,params,'product');
}
export async function validRecall(params) {
  return requestWithToken(URLS.VALID_RECALL,params,'product')
}
export async function fetchOriRecallList(params) {
  return requestWithToken(URLS.ORI_RECALL_LIST,params,'product')
}
export async function expireDeal(params) {
   return requestWithToken(URLS.FETCH_WILLEXPIRE_LIST_URL,params,'product');
}
export async function myOrder(params) {
   return requestWithToken(URLS.FETCH_MYORDER_LIST_URL,params,'product');
}
export async function fetchXttradeMain(params) {
   return requestWithToken(URLS.FETCH_XTTRADEMAIN_MEUN_URL,params,'product');
}
export async function fetchTradeTask(params) {
   return requestWithToken(URLS.FETCH_TRADEDTASK_LIST_URL,params,'product');
}
//交易 购买汇款信息添加
export async function fetchCapilist(params) {
   return requestWithToken(URLS.FETCH_CAPILIST_INPUT_URL,params,'product');
}

export async function fetchTempBuyInfo(params){
  return requestWithToken(URLS.FETCH_TRADE_BUY_TEMP_URL,params,'product');
}
//交易排队列表
export async function fetchList(params){
  return requestWithToken(URLS.FETCH_QUEUE_LIST_URL,params,'product');
}
//交易排队列表详情
export async function fetchListDetail(params){
  return requestWithToken(URLS.FETCH_QUEUE_LIST_DETAIL_URL,params,'product');
}
export async function uploadTradeFiles(params,images)
{
  // FETCH_TRADEUPLOAD_FILE_VIEW_URL
  let imageParam = {files:images};
  return requestWithUploadImage(URLS.FETCH_TRADEUPLOAD_FILE_VIEW_URL,params,imageParam,'product');
}
export async function uploadTradeFileName(params) {
  return requestWithToken(URLS.FETCH_TRADEUPLOAD_FILE_NAME_URL,params,'product');
}

export async function getFileName(params) {
  return requestWithToken(URLS.FETCH_TRADEUPLOAD_GET_FILE_NAME_URL,params,'product');
}
//上传图片
export async function uploadCommonFiles(params,images) {
   let imageParam = {files:images};
   return requestWithUploadImage(URLS.UPLOAD_COMMON_FILES_URL,params,imageParam,'product');
}
export async function submitTradeBuy(params){
  return requestWithToken(URLS.SUBMIT_TRADE_BUY_URL,params,'product');
}
//交易主页面  本月新增交易信息
export async function fetchThisMonth(params) {
   return requestWithToken(URLS.FETCH_THISMONTH_INFO_URL,params,'product');
}
//交易 购买  合同详情录入
export async function fetchBuyEnter(params) {
   return requestWithToken(URLS.FETCH_TRADEENTER_BUY_URL,params,'product');
}
//添加影音资料 交易购买 客户影音资料添加接口
export async function fetchUploadFiles(params) {
   return requestWithToken(URLS.FETCH_UPLOADPICTURE_FILES_URL,params,'product');
}
//交易购买 删除汇款信息接口
export async function fetchAmtDelete(params) {
   return requestWithToken(URLS.FETCH_CAPIDELETE_AEM_URL,params,'product');
}
//交易预约  取消预约接口
export async function fetchCancelOrder(params) {
   return requestWithToken(URLS.FETCH_CANCELORDER_BTN_URL,params,'product');
}
//交易撤单 撤单申请
export async function fetchRecallAsk(params) {
   return requestWithToken(URLS.FETCH_RECALLCREADE_ASK_URL,params,'product');
}
//交易赎回 赎回申请提交
export async function fetchRedeemAsk(params) {
   return requestWithToken(URLS.FETCH_REEDEEMCREADE_ASK_URL,params,'product');
}

//基金转换申请提交
export async function fetchFundChangeAsk(params) {
  return requestWithToken(URLS.FETCH_FUND_CHANGE_SUBMIT,params,'product');
}

//交易 驳回修改 赎回驳回修改提交
export async function fetchRedmRebutUp(params) {
   return requestWithToken(URLS.FETCH_REDEEMUPDATE_REBUT_URL,params,'product');
}
//交易 驳回修改 撤单驳回修改提交
export async function fetchRecRebutUp(params) {
   return requestWithToken(URLS.FETCH_RECALLUPDATE_REBUT_URL,params,'product');
}
export async function fetchTradeCancel(params) {
   return requestWithToken(URLS.FETCH_TRADEREBUT_CANCEL_URL,params,'product');
}

//基金转换驳回修改提交
export async function fetchFundcRebutUp(params) {
  return requestWithToken(URLS.FETCH_FUND_CHANGE_UPDATE,params,'product');
}




//客户持仓列表查询
export async function fetchSharetransList(params) {
  return requestWithToken(URLS.FETCH_SHARETRANS_LIST_URL,params,'product');
}
//管理人客户转入，产品名称选择列表
export async function fetchSelectProdList(params) {
  return requestWithToken(URLS.FETCH_SELECT_PROD_LIST_URL,params,'product');
}
//管理人客户转入，产品类别选择列表
export async function fetchSelectShrTypeList(params) {
  return requestWithToken(URLS.FETCH_SELECT_SHRTYPE_LIST_URL,params,'product');
}
//受让方银行卡列表查询
export async function fetchSelectCustInfoList(params) {
  return requestWithToken(URLS.FETCH_SELECT_CUSTINFO_LIST_URL,params,'product');
}
//受让方客户信息是否存在
export async function fetchSelectCustIsExists(params) {
  return requestWithToken(URLS.FETCH_SELECT_CUSTISEXISTS_URL,params,'product');
}
//转给本人、理财师、管理人客户 转受让交易录入提交
export async function fetchCreate(params) {
  return requestWithToken(URLS.FETCH_CREATE_URL,params,'product');
}
//管理人客户转入 转受让交易录入提交
export async function fetchInputCreate(params) {
  return requestWithToken(URLS.FETCH_INPUT_CREATE_URL,params,'product');
}
//驳回修改 转受让交易修改页面提交
export async function fetchReject(params) {
  return requestWithToken(URLS.FETCH_REJECT_URL,params,'product');
}
//客户持仓列表查询
export async function fetchCustShrList(params) {
   return requestWithToken(URLS.FETCH_CUSTSHR_LIST_URL,params,'product');
}
//私募交易列表查询
export async function fetchSMTradeList(params) {
   return requestWithToken(URLS.FETCH_SM_TRADE_LIST_URL,params,'product');
}
//客户资金列表查询
export async function fetchCustamtList(params) {
   return requestWithToken(URLS.FETCH_CUSTAMT_LIST_URL,params,'product');
}
//客户分红列表查询
export async function fetchCustAmtDiviList(params) {
   return requestWithToken(URLS.FETCH_CUSTAMTDIVI_LIST_URL,params,'product');
}
//客户资金详情查询
export async function fetchCustamtView(params) {
   return requestWithToken(URLS.FETCH_CUSTAMT_VIEW_URL,params,'product');
}
//客户分红详情查询
export async function fetchCustamtDiviView(params) {
   return requestWithToken(URLS.FETCH_CUSTAMTDIVI_VIEW_URL,params,'product');
}
export async function redeemInfoView(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_REDEEMINFO_VIEW_URL,params,'product');
}
export async function orderView(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_ORDERVIEW_INFO_URL,params,'product');
}
export async function tradeUpload(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_TRADEUPLOAD_FILE_VIEW_URL,params,'product');
}
export async function fetchBuySubmit(params) {
  // let param = {sortOrder: '1', offset: '1', limit: '10' };
   return requestWithToken(URLS.FETCH_SUBMIT_BUY_URL,params,'product');
}

export async function fetchPayeeAccount(params){
  return requestWithToken(URLS.FETCH_PAYEE_ACCOUNT_LIST_URL,params,'product');
}

export async function delTradeFiles(params)
{
  return requestWithToken(URLS.DEL_TRADEUPLOAD_FILE_URL,params,'product');
}
//B类产品录入 缴费记录附件删除
export async function delTradeInsuFiles(params)
{
  return requestWithToken(URLS.DEL_TRADEUPLOAD_DELETE_URL,params,'product');
}
//B类产品录入 缴费记录删除
export async function delTradeInsuPayRecord(params)
{
  return requestWithToken(URLS.DEL_INSUPAY_DELETE_URL,params,'product');
}

export async function fetchFundCProdList(params)
{
  return requestWithToken(URLS.FETCH_FUND_CHANGE_PROD_LIST,params,'product');
}
// ------------------ 双录 ------------------
export async function fetchPrivateInputList(params)
{
  return requestWithToken(URLS.FETCH_BI_INPUT_LIST, params, 'bi_type');
}

export async function fetchPublicInputList(params)
{
  return requestWithToken(URLS.FETCH_BI_PUBLIC_INPUT_LIST, params, 'bi_type');
}

export async function uploadPrivate(params) {
  return requestWithToken(URLS.UPLOAD_PRIVATE, params, 'bi_type');
}

export async function uploadPublic(params) {
  // let imageParam = { files: myfiles };
  // console.log('---uploadCommonFiles---', imageParam, params);
  return requestWithToken(URLS.UPLOAD_PUBLIC, params, 'bi_type');
}

export async function fetchRejectList(params) {
  return requestWithToken(URLS.FETCH_REJECT_LIST, params, 'bi_type');
}

export async function fetchRebutPrivateList(params) {
  return requestWithToken(URLS.PRIVATE_FETCH_FILE_LIST, params, 'bi_type');
}

export async function fetchRebutPublicList(params) {
  return requestWithToken(URLS.PUBLIC_FETCH_FILE_LIST, params, 'bi_type');
}

export async function fetchSearchList(params) {
  return requestWithToken(URLS.FETCH_SEARCH_LIST, params, 'bi_type');
}

export async function fetchRejectItemDetail1(params) {
  return requestWithToken(URLS.FETCH_REJECT_DETAIL_PRIVATE, params, 'bi_type');
}

export async function fetchRejectItemDetail2(params) {
  return requestWithToken(URLS.FETCH_REJECT_DETAIL_PUBLIC, params, 'bi_type');
}

export async function upload(params) {
  return requestWithToken(URLS.REJECT_DETAIL_UPLOAD, params, 'bi_type');
}

export async function delPublicFiles(params) {
  return requestWithToken(URLS.DELETE_PUBLIC_FILES, params, 'bi_type');
}

export async function fetchDetail(params) {
  return requestWithToken(URLS.SEARCH_DETAILS, params, 'bi_type');
}

export async function getTimeLineList(params) {
  return requestWithToken(URLS.GET_TIMELINE_LIST, params, 'bi_type');
}

export async function deleteLocalFile(params) {
  return requestWithToken(URLS.DELETE_LOCAL_FILE, params, 'bi_type');
}
// ------------------ 转换 ------------------
export async function fetchapplyforChangeList(params) {
  return requestWithToken(URLS.APPLY_FOR_CHANGE_LIST, params, 'bi_type');
}

export async function fetchRoleChangeRejectList(params) {
  return requestWithToken(URLS.FETCH_ROLE_CHANGE_REJECT_LIST, params, 'bi_type');
}

export async function fetchInvestorsList(params) {
  return requestWithToken(URLS.INVESTOR_SEARCH_LIST, params, 'bi_type');
}

export async function applyForchangeUpload(params) {
  return requestWithToken(URLS.APPLY_FOR_CHANGE_UPLOAD, params, 'bi_type');
}

export async function fetchRoleChangeDetail(params) {
  return requestWithToken(URLS.FETCH_ROLE_CHANGE_DETAIL, params, 'bi_type');
}

export async function fetchRoleRejectChangeDetail(params) {
  return requestWithToken(URLS.FETCH_ROLE_REJECT_DETAIL, params, 'bi_type');
}

export async function abolish(params) {
  return requestWithToken(URLS.CHANGE_ABOLISH, params, 'bi_type');
}

export async function roleChangeUpload(params) {
  return requestWithToken(URLS.CHANGE_ABOLISH_UPLOAD, params, 'bi_type');
}

export async function changeApplyForSearch(params) {
  return requestWithToken(URLS.CHANGE_APPLY_FOR_LIST, params, 'bi_type');
}
export async function fetchRejectTimeline(params) {
  return requestWithToken(URLS.FETCH_REJECT_TIME_LINE, params, 'bi_type');
}
// ------------------ 付息/到期提醒 ------------------
export async function fetchinterestList(params) {
  return requestWithToken(URLS.FETCH_PAYMENT_OF_INTEREST_LIST, params, 'product');
}
// ------------------ 资产证明（资产证明申请列表） ------------------
export async function fetchAssetsApplyList(params) {
  return requestWithToken(URLS.FETCH_ASSETS_APPLY_LIST, params, 'product');
}
export async function assetsApplyUpload(params) {
  return requestWithToken(URLS.ASSETS_APPLY_UPLOAD, params, 'product');
}

export async function fetchAssetProofProdList(params) {
  return requestWithToken(URLS.ASSETS_PROOF_PRODLIST, params, 'product');
}

export async function fetchApplyRejectList(params) {
  return requestWithToken(URLS.ASSETS_APPLY_REJECT_LIST, params, 'product');
}

export async function assetsRejectAbolish(params) {
  return requestWithToken(URLS.ASSETS_REJECT_ABOLISH, params, 'product');
}

export async function fetchAssetsSearchList(params) {
  return requestWithToken(URLS.ASSETS_APPLY_SEARCH_LIST, params, 'product');
}

export async function fetchFileList(params) {
  return requestWithToken(URLS.ASSETS_FILE_LIST, params, 'product');
}

export async function fetchLogList(params) {
  return requestWithToken(URLS.ASSETS_LOG_LIST, params, 'product');
}

export async function fetchRejectReason(params) {
  return requestWithToken(URLS.ASSETS_REJECT_REASON, params, 'product');
}

export async function assetsApplyReject(params) {
  return requestWithToken(URLS.ASSETS_APPLY_REJECT, params, 'product');
}

//开户行变更驳回
export async function fetchDetails(params) {
  return requestWithToken(URLS.REJECT_MORE_DETAILS, params, 'product');
}

//到期交易
export async function fetchdeallist(params) {
  return requestWithToken(URLS.DEADLINE_DEAL_LIST, params, 'product');
}
//登记注册身份验证查询列表
export async function fetchCustRegisterList (params) {
  return requestWithToken(URLS.CUST_REGISTER_LIST, params, 'product');
}
//登记注册身份验证附件查询
export async function fetchCustRegisterFile (params) {
  return requestWithToken(URLS.CUST_REGISTER_FILE, params, 'product');
}

export async function fetchpostponelist (params) {
  return requestWithToken(URLS.POSTPONE_LIST, params, 'product');
}

export async function getDate (params) {
  return requestWithToken(URLS.GET_DATE, params, 'product');
}

export async function create (params) {
  return requestWithToken(URLS.POSTPONE_CREATE, params, 'product');
}
//作废
export async function abolishPostpone (params) {
  return requestWithToken(URLS.ABOLISH_POSTPONE, params, 'product');
}
//更新签署方式
export async function updateSignType(params) {
  return requestWithToken(URLS.UPDATE_SIGN_TYPE, params, 'product');
}
//获取打款凭证列表
export async function fetchPayProofList(params){
  return requestWithToken(URLS.PAY_PROOF_LIST,params,'product');
}
//打款凭证资料提交
export async function remitUploadSubmit(params) {
  return requestWithToken(URLS.REMIT_UPLOAD,params, 'product')
}

export function transformProdList(productList){
  if(!productList||productList.length<=0)
    return {};
  let productDic = {};
  productList.map((item,index)=>{
    if(item.key){
      productDic[item.key] = item.value;
    }
  });

  return productDic;
}


export function transformAttachlist(isBusi,isContract,attachList,flag){
  console.log('isContract====>',isContract,attachList)
  let matrList2 = [],matrList3 = [],matrList9 = [],matrList1 = [],matrListA = [],matrListj = [], matrListd = [],matrListH = [],matrListM = [];
  let tempAttachList = [{'matrType':'2',matrTypeName:'证件资料',list:[]},{'matrType':'3',matrTypeName:'汇款资料',list:[]}
  ,{'matrType':'9',matrTypeName:'银行卡凭证',list:[]},{'matrType':'1',matrTypeName:'交易资料',list:[]},{'matrType':'d',matrTypeName:'合同封面,风险揭示资料（风险揭示图、特别风险提示函[仅股权类产品],电子签约无需上传,纸质签约需上传）',list:[]},{'matrType':'m',matrTypeName:'证明资料(收入证明、资产证明、投资经历证明等)',list:[]}];
  if(flag == 1){
    tempAttachList.push({'matrType':'j',matrTypeName:'投资者信息',list:[]})
  }
  if(isContract == 1){
    tempAttachList.push({'matrType':'l',matrTypeName:'合同签署页资料',list:[]})
  }
  if(isBusi){
    tempAttachList.push({'matrType':'a',matrTypeName:'经办人资料',list:[]});
  }


  if(!attachList||attachList.length<=0)
    return tempAttachList;

  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.srcFileName};
    if(matrType=='2')
      matrList2.push(file);
    else if(matrType =='3')
     matrList3.push(file);
    else if(matrType=='9')
     matrList9.push(file);
    else if(matrType=='1')
     matrList1.push(file);
    else if(matrType=='a')
      matrListA.push(file);
    else if(matrType=='j')
      matrListj.push(file);
    else if(matrType=='d')
      matrListd.push(file);
    else if(matrType=='l')
      matrListH.push(file);
    else if(matrType=='m')
      matrListM.push(file);
  }

  if(isBusi){
    let busiArr = [{'matrType':'2',matrTypeName:'证件资料',list:matrList2},{'matrType':'3',matrTypeName:'汇款资料',list:matrList3}
      ,{'matrType':'9',matrTypeName:'银行卡凭证',list:matrList9},{'matrType':'1',matrTypeName:'交易资料',list:matrList1},
      {'matrType':'a',matrTypeName:'经办人资料',list:matrListA},{'matrType':'d',matrTypeName:'合同封面,风险揭示资料（风险揭示图、特别风险提示函[仅股权类产品],电子签约无需上传,纸质签约需上传）',list:matrListd},
      {'matrType':'m',matrTypeName:'证明资料(收入证明、资产证明、投资经历证明等)',list:matrListM}];
    if(flag == 1){
      busiArr.push({'matrType':'j',matrTypeName:'投资者信息',list:matrListj})
    }
    if(isContract == 1){
      busiArr.push({'matrType':'l',matrTypeName:'合同签署页资料',list:matrListH})
    }
    return busiArr
  }
  let Arr = [{'matrType':'2',matrTypeName:'证件资料',list:matrList2},{'matrType':'3',matrTypeName:'汇款资料',list:matrList3}
    ,{'matrType':'9',matrTypeName:'银行卡凭证',list:matrList9},{'matrType':'1',matrTypeName:'交易资料',list:matrList1},{'matrType':'d',matrTypeName:'合同封面,风险揭示资料（风险揭示图、特别风险提示函[仅股权类产品],电子签约无需上传,纸质签约需上传）',list:matrListd}
    ,{'matrType':'m',matrTypeName:'证明资料(收入证明、资产证明、投资经历证明等)',list:matrListM}]
  if(flag == 1){
    Arr.push({'matrType':'j',matrTypeName:'投资者信息',list:matrListj})
  }
  if(isContract == 1){
    Arr.push({'matrType':'l',matrTypeName:'合同签署页资料',list:matrListH})
  }
  return Arr;
}

//撤单
export function transformRecallAttachlist(attachList)
{
  let matrList7 = [];
  let tempAttachList = [{'matrType':'7',matrTypeName:'撤单资料',list:[]}];

  if(!attachList||attachList.length<=0)
    return tempAttachList;

  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.srcFileName};
    if(matrType=='7')
      matrList7.push(file);
  }

  return [{'matrType':'7',matrTypeName:'撤单资料',list:matrList7}];
}

//登记注册身份验证查询附件
export function custRegAuthList(attachList)
{
  console.log('验证查询附件  attachList',attachList)
  let matrList0 = [];
  let tempAttachList = [{'matrType':'0',matrTypeName:'证明资料(收入证明、资产证明、投资经历证明等)',list:[]}];

  if(!attachList||attachList.length<=0)
    return tempAttachList;

  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    console.log('tempFile',tempFile)
    let matrType = '0';
    let file ={url:tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.custName};
    if(matrType ==='0'){
      matrList0.push(file);
    }
    console.log('matrList555',matrList0)
  }

  return [{'matrType':'0',matrTypeName:'证明资料(收入证明、资产证明、投资经历证明等)',list:matrList0}];
}
//延期
export function transformDelayFuncttachList(attachList)
{
  let matrList0 = [];
  let tempAttachList = [{'matrType':'0',matrTypeName:'延期资料',list:[]}];

  if(!attachList||attachList.length<=0)
    return tempAttachList;

  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.srcFileName};
    if(matrType=='0')
      matrList0.push(file);
  }

  return [{'matrType':'0',matrTypeName:'延期资料',list:matrList0}];
}
export function transformRedeemAttachList(isBusi,attachList)
{
  let matrList5 = [],matrListA = [];
  let tempAttachList = [{'matrType':'5',matrTypeName:'赎回申请资料',list:[]}];
  if(isBusi)
    tempAttachList.push({'matrType':'a',matrTypeName:'经办人资料',list:[]});
  if(!attachList||attachList.length<=0)
    return tempAttachList;
  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.srcFileName};
    if(matrType=='5')
      matrList5.push(file);
    else if(matrType=='a')
      matrListA.push(file);
  }

  if(isBusi)
   return [{'matrType':'5',matrTypeName:'赎回申请资料',list:matrList5},{'matrType':'a',matrTypeName:'经办人资料',list:matrListA}];
  return [{'matrType':'5',matrTypeName:'赎回申请资料',list:matrList5}];
}

export function transformFuncttachList(isBusi,attachList)
{
  let matrListG = [],matrListA = [];
  let tempAttachList = [{'matrType':'g',matrTypeName:'转换申请资料',list:[]}];
  if(isBusi)
    tempAttachList.push({'matrType':'a',matrTypeName:'经办人资料',list:[]});
  if(!attachList||attachList.length<=0)
    return tempAttachList;
  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.srcFileName};
    if(matrType=='g')
      matrListG.push(file);
    else if(matrType=='a')
      matrListA.push(file);
  }

  if(isBusi)
    return [{'matrType':'g',matrTypeName:'转换申请资料',list:matrListG},{'matrType':'a',matrTypeName:'经办人资料',list:matrListA}];
  return [{'matrType':'g',matrTypeName:'转换申请资料',list:matrListG}];
}

export function processTransformAttachList(tradeDetail,valid,attachList, flag)
{
 /***

 console.info("processTransformAttachList",(!tradeDetail),valid,tradeDetail,attachList, flag)
  console.info("transformAttachlist",transformAttachlist(tradeDetail.custType=='0',valid,attachList, flag))
  console.info("transformRedeemAttachList",transformRedeemAttachList(tradeDetail.custType=='0',attachList))
  console.info("transformTransferAttachList",transformTransferAttachList(tradeDetail,attachList))
  console.info("transformRecallAttachlist",transformRecallAttachlist(attachList))
  console.info("transformDelayFuncttachList",transformDelayFuncttachList(attachList))
  console.info("transformFuncttachList",transformFuncttachList(tradeDetail.custType=='0',attachList))
  ****/
  if(!tradeDetail)
    return [];
  if(tradeDetail.tradCode=='0020'||tradeDetail.tradCode=='0022')//认申购
  {
    return transformAttachlist(tradeDetail.custType=='0',valid,attachList, flag);
  }
  else if(tradeDetail.tradCode=='0024'|| tradeDetail.tradCode=='0098')//赎回
  {
    return transformRedeemAttachList(tradeDetail.custType=='0',attachList);
  }
  else if(tradeDetail.tradCode=='0033')//转让
  {
    return transformTransferAttachList(tradeDetail,attachList);
  }
  else if(tradeDetail.tradCode=='0052')//撤单
  {
    return transformRecallAttachlist(attachList);
  }
  else if(tradeDetail.tradCode == '0036') // 基金转换
  {
    return transformFuncttachList(tradeDetail.custType=='0',attachList);
  }
  else if(tradeDetail.tradCode == '0071') // 延期申请
  {
    return transformDelayFuncttachList(attachList);
  }
  else return [];
}

export function transformTransferAttachList(tradeDetail,attachList)
{
  let matrList6 = [],matrListA = [],matrListC = [];

  if(!attachList||attachList.length<=0)

//转让
  {
    attachList = [];
  }
  for(let i =0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let file ={url:commonUtil.ImageHostAddress+tempFile.fileSvrPath,fileId:tempFile.id,type:matrType,
      srcFileName:tempFile.fileSvrPath,fileName:tempFile.srcFileName};
    if(matrType=='6')
      matrList6.push(file);
    else if(matrType=='a')
      matrListA.push(file);
    else if(matrType=='c')
      matrListC.push(file);
  }

  let tempAttachList = [{'matrType':'6',matrTypeName:'转让申请资料',list:matrList6}];
  if(tradeDetail&&tradeDetail.custType=='0')
    tempAttachList.push({'matrType':'a',matrTypeName:'转让方经办人资料',list:matrListA});
  if(tradeDetail&&tradeDetail.targCustType=='0')
    tempAttachList.push({'matrType':'c',matrTypeName:'受让方经办人资料',list:matrListC});
  return tempAttachList;
}

//对获取的资料列表进行自动分组处理
export function AutoTransformAttachList(attachList)
{
  if(!attachList||attachList.length<=0)
    return [];
  let resultList  = [];
  let keysList = {};
  let keyIndex = 0;
  for(let i=0;i<attachList.length;i++)
  {
    let tempFile = attachList[i];
    let matrType = tempFile.matrType;
    let matrTypeData = {};
    if(keysList[matrType]===undefined)
    {
       matrTypeData.matrType = matrType;
       matrTypeData.list = [];
       matrTypeData.list.push(tempFile);
       keysList[matrType] = keyIndex;
       keyIndex = keyIndex+1;
       resultList.push(matrTypeData);
    }
    else {
        let valueIndex = keysList[matrType];
        matrTypeData = resultList[valueIndex];
        matrTypeData.list.push(tempFile);
    }
  }
  return resultList;
}

export async function fetchContractNoList(params){
  return requestWithToken(URLS.FETCH_CONTRACT_NO_LIST,params,'product');
}

export function caculatorCapiTotal(capiList)
{
  if(!capiList||capiList.length<=0)
    return '';
  let total = 0;
  for(let i = 0;i<capiList.length;i++)
  {
    let data = capiList[i];
    total = total + parseInt(data.amount);
  }
  return total;
}

//图片转换
export function transformToCustomerFileList(attachList,type)
{
  let fileList = [];
  if(!attachList)
    return [];
  for(let i=0;i<attachList.length;i++)
  {
    let matrTypeFiles = attachList[i];
    if(!matrTypeFiles.list)
      continue;
    if(type&&matrTypeFiles.matrType!=type)
      continue;
    for(let j=0;j<matrTypeFiles.list.length;j++)
    {
      let file = matrTypeFiles.list[j];
      fileList.push({
        fileId:file.srcFileName,
        fileName:file.fileName
      });
    }
  }

  return fileList;
}
//图片转换 改传参的名字
export function transformToCustomerFileListOther(attachList,type)
{
  let fileList = [];
  if(!attachList)
    return [];
  for(let i=0;i<attachList.length;i++)
  {
    let matrTypeFiles = attachList[i];
    if(!matrTypeFiles.list)
      continue;
    if(type&&matrTypeFiles.matrType!=type)
      continue;
    for(let j=0;j<matrTypeFiles.list.length;j++)
    {
      let file = matrTypeFiles.list[j];
      fileList.push({
        fileSvrPath:file.srcFileName,
        srcFileName:file.fileName
      });
    }
  }

  return fileList;
}
