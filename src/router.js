import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link,IndexRedirect,Redirect } from 'dva/router';
import TestSVG from './routes/testSVG';
import TestDemo from './routes/TestDemo';//测试页面
import ErrorPage from './routes/404page';//测试页面
import TestForm from './testForm';
import App from './app';
import {Tool} from "./utils/tools";

// const App = (props)=><div style={{height:'100%'}}>{props.children}</div>;

function pageOnUpdate()
{
  let hashLocation = window.location.hash;
  console.log('window.location',window.location)
  console.log('hashLocation',hashLocation)
  if(hashLocation.indexOf('tradeMain')>-1 && hashLocation.indexOf('version')>-1 ){
         Tool.localItem('tradeMainContract', '3.0');
  }
  let filterPageUrls  = ['/orgCusAddMore','/personalLatentCustomerEdit','/removeChange','/orgCusWaitChange'];
  for(let i=0;i<filterPageUrls.length;i++)
  {
    let url = filterPageUrls[i];
    if(hashLocation.indexOf(url)!=-1)
      return;
  }
  var root = document.getElementById('root');
    if (!root.scrollTo) {
      root.scrollTo = function(left, top) {
        console.log('scroll left=', left, ',top=', top);
        this.scrollLeft = left;
        this.scrollTop = top;
      }
    }
  root.scrollTo(0, 0);
}
// --------------------- load on demand ---------------------⤵️
//MainComponent
const MainComponent = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/main').default);
  }, 'MainComponent');
}
//productMain   私募产品查询
const ProductMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductMain').default);
  }, 'ProductMain');
}
//TodayProduct
const TodayProduct = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/TodayProduct').default);
  }, 'todayProduct');
}

const OtherProduct = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/OtherProduct').default);
  }, 'otherProduct');
}
//产品页
const ProductMenu = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductMenu').default);
  }, 'productMenu');
}
//ProductNotify
const ProductNotify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/productNotify/ProductNotify').default)
  },'ProductNotify')
}
//OnlineProList
const OnlineProList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/OnLineProductList').default);
  }, 'onlineProList');
}
//FilterPage
const FilterPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/FilterPage').default);
  }, 'filterPage');
}

//SafeGuard
const SafeGuard = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/SafeGuard').default);
  }, 'safeGuard');
}

//ProductDetail
const ProductDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductDetail').default);
  }, 'productDetail');
}

//ProDetailNobtn
const ProDetailNobtn = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProDetailNobtn').default);
  }, 'proDetailNobtn');
}

//FilePreview
const FilePreview = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/FilePreview').default);
  }, 'FilePreview');
}
//文件外放预览
const FilePreviewOut = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/filePreview/FilePreviewOut').default);
  }, 'FilePreviewOut')
};
//SalePreview
const SalePreview = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/SalePreview').default);
  }, 'SalePreview');
}
//Appoint
const Appoint = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/appoint/Appoint').default);
  }, 'Appoint');
}
//ProductQrnh
const ProductQrnh = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductQrnh').default);
  }, 'ProductQrnh');
}
//MarketMonth
const MarketMonth = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/MarketMonth').default);
  }, 'MarketMonth');
}
//SearchPage
const SearchPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/SearchPage').default);
  }, 'SearchPage');
}
//AddContractNumber
const AddContractNumber = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/AddContractNumber').default);
  }, 'AddContractNumber');
}
//HoldMeeting
const HoldMeeting = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/HoldMeeting').default);
  }, 'HoldMeeting');
}

//ProductVideo
const ProductVideo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductVideo').default);
  }, 'ProductVideo');
}
//ProductOverView
const ProductOverView = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductOverView').default);
  }, 'ProductOverView');
}
//CustBuyDetail
const CustBuyDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/CustBuyDetail').default);
  }, 'CustBuyDetail');
}
//ProductInfo
const ProductInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProductInfo').default);
  }, 'ProductInfo');
}
//BuyCustomer
const BuyCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/BuyCustomer').default);
  }, 'BuyCustomer');
}
//ProHoldSpeed
const ProHoldSpeed = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/ProHoldSpeed').default);
  }, 'ProHoldSpeed');
}
//TypeToSelectCustomer
const TypeToSelectCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/newCustomerList/TypeToSelectCustomer').default);
  }, 'TypeToSelectCustomer');
}
//CustomerMain
const CustomerMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustomerMain').default);
  }, 'CustomerMain');
}
//RiskBearSec
const RiskBearSec = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/RiskBearSec').default);
  }, 'RiskBearSec');
}
//RiskAssess
const RiskAssess = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/RiskAssess').default);
  }, 'RiskAssess');
}
//CustomerInquire
const CustomerInquire = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustomerInquire').default);
  }, 'CustomerInquire');
}
//BankCardManage
const BankCardManage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BankCardManage').default);
  }, 'BankCardManage');
}
//SecCustomer
const SecCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/SecCustomer').default);
  }, 'SecCustomer');
}
//GiveUpCustomer
const GiveUpCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/GiveUpCustomer').default);
  }, 'GiveUpCustomer');
}
//Transaction
const Transaction = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/Transaction').default);
  }, 'Transaction');
}
//GiveUp
const GiveUp = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/GiveupCause').default);
  }, 'GiveUp');
}
//BackVisit
const BackVisit = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BackVisit').default);
  }, 'BackVisit');
}
//NewBankId
const NewBankId = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/NewBankId').default);
  }, 'NewBankId');
}
//ImageAdd
const ImageAdd = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/ImageAdd').default);
  }, 'ImageAdd');
}
//BankChange
const BankChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BankChange').default);
  }, 'BankChange');
}
//OldBankUser
const OldBankUser = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/OldBankUser').default);
  }, 'OldBankUser');
}
//NewBankUser
const NewBankUser = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/NewBankUser').default);
  }, 'NewBankUser');
}
//RemoveChange
const RemoveChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/RemoveChange').default);
  }, 'RemoveChange');
}
//OrgCusWaitChange
const OrgCusWaitChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/OrgCusWaitChange').default);
  }, 'OrgCusWaitChange');
}
//CustomerFilter
const CustomerFilter = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustomerFilter').default);
  }, 'CustomerFilter');
}
//PersonalCustomerMaterial
const PersonalCustomerMaterial = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/PersonalCustomerMaterial').default);
  }, 'PersonalCustomerMaterial');
}
//PersonalCustomerIncrease
const PersonalCustomerIncrease = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/PersonalCustomerIncrease').default);
  }, 'PersonalCustomerIncrease');
}

//PersonalLatentCustomerEdit
const PersonalLatentCustomerEdit = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/PersonalLatentCustomerEdit').default);
  }, 'PersonalLatentCustomerEdit');
}
//PersonalCustMaterialInfo
const PersonalCustMaterialInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/PersonalCustMaterialInfo').default);
  }, 'PersonalCustMaterialInfo');
}
//CustomerWait
const CustomerWait = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustomerWait').default);
  }, 'CustomerWait');
}
//PersonalCustomerDetail
const PersonalCustomerDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/newCustomerList/TypeToSelectCustomer').default);
  }, 'PersonalCustomerDetail');
}
//OrgCustomerDetail
const OrgCustomerDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/PersonalCustomerDetail').default);
  }, 'OrgCustomerDetail');
}
//OrgCusAdd
const OrgCusAdd = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/OrgCusAdd').default);
  }, 'OrgCusAdd');
}
//OrgCusAddMore
const OrgCusAddMore = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/OrgCusAddMore').default);
  }, 'OrgCusAddMore');
}
//InputSelectCustomer
const InputSelectCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/selectcust/InputSelectCustomer').default);
  }, 'InputSelectCustomer');
}
//TradeSafeMain
const TradeSafeMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeSafeMain').default);
  }, 'TradeSafeMain');
}

//TradeSafeInquire
const TradeSafeInquire = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeSafeInquire').default);
  }, 'TradeSafeInquire');
}
//TradeSafeContract
const TradeSafeContract = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeSafeContract').default);
  }, 'TradeSafeContract');
}
//TradeContractEnter
const TradeContractEnter = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeContractEnter').default);
  }, 'TradeContractEnter');
}
//TradePayRecord
const TradePayRecord = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradePayRecord').default);
  }, 'TradePayRecord');
}
//TradePayRecordSee
const TradePayRecordSee = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradePayRecordSee').default);
  }, 'TradePayRecordSee');
}

//AddPayRecord
const AddPayRecord = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/AddPayRecord').default);
  }, 'AddPayRecord');
}
//TradeReject
const TradeReject = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeReject').default);
  }, 'TradeReject');
}
//TradeUnsubmitted
const TradeUnsubmitted = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeUnsubmitted').default);
  }, 'TradeUnsubmitted');
}
//TradeRejectDetail
const TradeRejectDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeRejectDetail').default);
  }, 'TradeRejectDetail');
}
//TradeUnsubmittedDetail
const TradeUnsubmittedDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeUnsubmittedDetail').default);
  }, 'TradeUnsubmittedDetail');
}
//TradeExpireDeal
const TradeExpireDeal = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeExpireDeal').default);
  }, 'TradeExpireDeal');
}

//TradePositionInfo
const TradePositionInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradePositionInfo').default);
  }, 'TradePositionInfo');
}
//TradePositionDetail
const TradePositionDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradePositionDetail').default);
  }, 'TradePositionDetail');
}

//TradeAffirmPortion
const TradeAffirmPortion = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeAffirmPortion').default);
  }, 'TradeAffirmPortion');
}
//FundInquire
const FundInquire = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundInquire').default);
  }, 'FundInquire');
}

//FundDetail
const FundDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundDetail').default);
  }, 'FundDetail');
}
//CustomerShareDetail
const CustomerShareDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerShareDetail').default);
  }, 'CustomerShareDetail');
}
//CustomerShareInquire
const CustomerShareInquire = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerShareInquire').default);
  }, 'CustomerShareInquire');
}
//CustomerConfAmt
const CustomerConfAmt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerConfAmt').default);
  }, 'CustomerConfAmt');
}

//QueueOrderList
const QueueOrderList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/QueueOrderList').default);
  }, 'QueueOrderList');
}
//QueueOrderDetail
const QueueOrderDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/QueueOrderDetail').default);
  }, 'QueueOrderDetail');
}
//OperationManual
const OperationManual = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/OperationManual').default);
  }, 'OperationManual');
}
//BiTypeInputListCnt
const BiTypeInputListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/private_type/containers/BiTypeInputListCnt').default);
  }, 'BiTypeInputListCnt');
}

//BiTypeInputItemDetailCnt
const BiTypeInputItemDetailCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/private_type/containers/BiTypeInputItemDetailCnt').default);
  }, 'BiTypeInputItemDetailCnt');
}
//ApplyCnt
const ApplyCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/utils/ApplyCnt').default);
  }, 'ApplyCnt');
}
//PubbiTypeInputListCnt
const PubbiTypeInputListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/public_type/containers/PubbiTypeInputListCnt').default);
  }, 'PubbiTypeInputListCnt');
}
//RejectListCnt
const RejectListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/reject/containers/RejectListCnt').default);
  }, 'RejectListCnt');
}
//SearchListCnt
const SearchListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/search/containers/SearchListCnt').default);
  }, 'SearchListCnt');
}
//SearchItemDetailCnt
const SearchItemDetailCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/search/containers/SearchItemDetailCnt').default);
  }, 'SearchItemDetailCnt');
}
//ApplyforChangeCnt
const ApplyforChangeCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/investors_role_change/containers/ApplyforChangeCnt').default);
  }, 'ApplyforChangeCnt');
}
//RoleChangeRejectCnt
const RoleChangeRejectCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/investors_role_change_reject/containers/RoleChangeRejectCnt').default);
  }, 'RoleChangeRejectCnt');
}
//ItemDetail
const ItemDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/utils/more_tabs_detail/ItemDetail').default);
  }, 'ItemDetail');
}
//InvestorSearchListCnt
const InvestorSearchListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/investors_search/containers/InvestorSearchListCnt').default);
  }, 'InvestorSearchListCnt');
}
//InvestorItemDetail
const InvestorItemDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/investors_search/components/InvestorItemDetail').default);
  }, 'InvestorItemDetail');
}

//InvestorApplyInqueryCnt
const InvestorApplyInqueryCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/investors_apply_inquery/containers/InvestorApplyInqueryCnt').default);
  }, 'InvestorApplyInqueryCnt');
}
//PubAcceptorSelectCnt
const PubAcceptorSelectCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/public_type/containers/PubAcceptorSelectCnt').default);
  }, 'PubAcceptorSelectCnt');
}
//PlayAndroidVideo
const PlayAndroidVideo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/utils/PlayAndroidVideo').default);
  }, 'PlayAndroidVideo');
}
//ItemDetailChange
const ItemDetailChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/bi_type_manage/utils/more_tabs_detail/ItemDetailChange').default);
  }, 'ItemDetailChange');
}
//PaymentOfInterestCnt
const PaymentOfInterestCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/payment_of_interest/containers/PaymentOfInterestCnt').default);
  }, 'PaymentOfInterestCnt');
}
//InterestDetail
const InterestDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/payment_of_interest/components/InterestDetail').default);
  }, 'InterestDetail');
}
//TradeProduct
const TradeProduct = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeProduct').default);
  }, 'TradeProduct');
}
//TradeRejectProduct
const TradeRejectProduct = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeRejectProduct').default);
  }, 'TradeRejectProduct');
}

//RedeemList
const RedeemList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RedeemList').default);
  }, 'RedeemList');
}

//RedeemAsk
const RedeemAsk = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RedeemAsk').default);
  }, 'RedeemAsk');
}
//FundChangeList
const FundChangeList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundChangeList').default);
  }, 'FundChangeList');
}

//FundChangeInfo
const FundChangeInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundChangeInfo').default);
  }, 'FundChangeInfo');
}

//FundChangeAsk
const FundChangeAsk = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundChangeAsk').default);
  }, 'FundChangeAsk');
}

//FundProdList
const FundProdList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/FundProdList').default);
  }, 'FundProdList');
}

//RecallAsk
const RecallAsk = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RecallAsk').default);
  }, 'RecallAsk');
}

//BuyokInfo
const BuyokInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/BuyokInfo').default);
  }, 'BuyokInfo');
}
//RecallDetail
const RecallDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RecallDetail').default);
  }, 'RecallDetail');
}

//OrderDetail
const OrderDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/OrderDetail').default);
  }, 'OrderDetail');
}

//MyOrder
const MyOrder = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/MyOrder').default);
  }, 'MyOrder');
}

//RebutBuy
const RebutBuy = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RebutBuy').default);
  }, 'RebutBuy');
}

//TradeRebut
const TradeRebut = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeRebut').default);
  }, 'TradeRebut');
}
//TransferMode
const TransferMode = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TransferMode').default);
  }, 'TransferMode');
}
//CustomerPositionInfo  客户持仓信息列表
const CustomerPositionInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerPositionInfo').default);
  }, 'CustomerPositionInfo');
}
//TransferInput  转受让交易录入
const TransferInput = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TransferInput').default);
  }, 'TransferInput');
}
///TransferReject  转受让驳回修改展示页面
const TransferReject = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TransferReject').default);
  }, 'TransferReject');
}
//TransferRejectModify  转受让驳回修改 修改页面
const TransferRejectModify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TransferRejectModify').default);
  }, 'TransferRejectModify');
}
//RegAuth
const RegAuth = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RegAuth').default);
  }, 'RegAuth');
}
//RegAuthDetail
const RegAuthDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RegAuthDetail').default);
  }, 'RegAuthDetail');
}

//RecallList
const RecallList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RecallList').default);
  }, 'RecallList');
}
//RebutRecall
const RebutRecall = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RebutRecall').default);
  }, 'RebutRecall');
}

//RebutRedeem
const RebutRedeem = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RebutRedeem').default);
  }, 'RebutRedeem');
}

//RebutFundChange
const RebutFundChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RebutFundChange').default);
  }, 'RebutFundChange');
}

//RecallChange
const RecallChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RecallChange').default);
  }, 'RecallChange');
}

//TradeInfoSee
const TradeInfoSee = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeInfoSee').default);
  }, 'TradeInfoSee');
}

//TradeRedChange
const TradeRedChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeRedChange').default);
  }, 'TradeRedChange');
}
//TradeFundCChange
const TradeFundCChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeFundCChange').default);
  }, 'TradeFundCChange');
}

//RebutBuyChange
const RebutBuyChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RebutBuyChange').default);
  }, 'RebutBuyChange');
}

//UserGainFind
const UserGainFind = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/UserGainFind').default);
  }, 'UserGainFind');
}

//CustomerCapiDetail
const CustomerCapiDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerCapiDetail').default);
  }, 'CustomerCapiDetail');
}

//IntentionWrite
const IntentionWrite = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/written/IntentionWrite').default);
  }, 'IntentionWrite');
}

//WrittenDetail
const WrittenDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/written/WrittenDetail').default);
  }, 'WrittenDetail');
}
//SelectProWritten
const SelectProWritten = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/written/SelectProWritten').default);
  }, 'SelectProWritten');
}

//WrittenForm
const WrittenForm = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/written/WrittenForm').default);
  }, 'WrittenForm');
}

//VpShareList
const VpShareList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/vpShare/VpShareList').default);
  }, 'VpShareList');
}

//VpShareDetail
const VpShareDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/vpShare/VpShareDetail').default);
  }, 'VpShareDetail');
}

//XTTradeMain
const XTTradeMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/XTTradeMain').default);
  }, 'XTTradeMain');
}

//BuyXTproList
const BuyXTproList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/BuyXTproList').default);
  }, 'BuyXTproList');
}
//XTTradeInput
const XTTradeInput = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/XTTradeInput').default);
  }, 'XTTradeInput');
}

//XTRemitInfo
const XTRemitInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/XTRemitInfo').default);
  }, 'XTRemitInfo');
}

//RemittorAccount
const RemittorAccount = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RemittorAccount').default);
  }, 'RemittorAccount');
}

//PayeeAccount
const PayeeAccount = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/PayeeAccount').default);
  }, 'PayeeAccount');
}

//RemitAccountAdd
const RemitAccountAdd = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RemitAccountAdd').default);
  }, 'RemitAccountAdd');
}

//RemitDetail
const RemitDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RemitDetail').default);
  }, 'RemitDetail');
}
//RedeemDetail
const RedeemDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RedeemDetail').default);
  }, 'RedeemDetail');
}

//RecallRejectDetail
const RecallRejectDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/RecallRejectDetail').default);
  }, 'RecallRejectDetail');
}

//SubscriptionDetail
const SubscriptionDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/SubscriptionDetail').default);
  }, 'SubscriptionDetail');
}

//CustomerTradeSearch
const CustomerTradeSearch = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/CustomerTradeSearch').default);
  }, 'CustomerTradeSearch');
}

//TransferDetail
const TransferDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TransferDetail').default);
  }, 'TransferDetail');
}

//ContractNoSelect
const ContractNoSelect = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/contractNo/ContractNoSelect').default);
  }, 'ContractNoSelect');
}
//OptionSuccess
const OptionSuccess = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/OptionSuccess').default);
  }, 'OptionSuccess');
}


//AssetsApplyListCnt 资产证明申请
const AssetsApplyListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/apply/containers/AssetsApplyListCnt').default);
  }, 'AssetsApplyListCnt');
}

//AssetsApplyCnt
const AssetsApplyCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/apply/containers/AssetsApplyCnt').default);
  }, 'AssetsApplyCnt');
}

//ProductListCnt
const ProductListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/apply/containers/ProductListCnt').default);
  }, 'ProductListCnt');
}
//AssetsRejectListCnt
const AssetsRejectListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/reject/containers/AssetsRejectListCnt').default);
  }, 'AssetsRejectListCnt');
}

//AssetsApplyReject
const AssetsApplyReject = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/reject/containers/AssetsApplyReject').default);
  }, 'AssetsApplyReject');
}

//AssetsSearchListCnt
const AssetsSearchListCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/search/containers/AssetsSearchListCnt').default);
  }, 'AssetsSearchListCnt');
}

//ApprovedCnt
const ApprovedCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/search/routes/approved/containers/ApprovedCnt').default);
  }, 'ApprovedCnt');
}

//SearchRejectDetail
const SearchRejectDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/search/routes/reject/containers/SearchRejectDetail').default);
  }, 'SearchRejectDetail');
}

//BeingProcessed
const BeingProcessed = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/search/routes/beingProcessed/containers/BeingProcessed').default);
  }, 'BeingProcessed');
}
//SelectManagers
const SelectManagers = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/apply/containers/SelectManagers').default);
  }, 'SelectManagers');
}


//合同管理首页按需加载
const TradeMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/TradeMain').default);
  }, 'tradeMain');
}

//资产证明按需加载
const AssetCertificateMain = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/assetsCertification/asset_certificate_main/AssetCertificateMain').default);
  }, 'assetCertificateMain');
}

//受益账户变更
const CustomerModify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustomerModify').default);
  }, 'customerModify');
}
//受益账户 持仓记录
const CustPositionList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CustPositionList').default);
  }, 'custPositionList');
}
//受益账户变更
const AccountChange = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/AccountChange').default);
  }, 'accountChange');
}
//受益账户变更--->选择银行卡
const SelectBankCus = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/SelectBankCus').default);
  }, 'selectBankCus');
}
//受益账户变更查询
const ApplyRecordsList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/ApplyRecordsList').default);
  }, 'applyRecordsList');
}
//受益账户变更详情
const CusRecordsDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/CusRecordsDetail').default);
  }, 'cusRecordsDetail');
}
//受益账户变更驳回列表
const BankRebutCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BankRebutCnt').default);
  }, 'bankRebutCnt');
}
//驳回或者作废的详情部分
const RebutDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/RebutDetail').default);
  }, 'rebutDetail');
}
//开户行变更
const OpenBankModify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/OpenBankModify').default);
  }, 'openBankModify');
}
//开户行变更-选择银行账户
const BankAccountCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BankAccountCnt').default);
  }, 'bankAccountCnt')
}
const BankAccountModifyCnt = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/BankAccountModifyCnt').default);
  }, 'bankAccountModifyCnt')
}
const AccountChangeDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/AccountChangeDetails').default);
  }, 'accountChangeDetails')
}
const RebutBankDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/customer/RebutBankDetail').default);
  }, 'rebutBankDetail')
}
const DealList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/productPages/DealList').default);
  }, 'dealList')
}

const ApplyPending = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/ApplyPending').default);
  }, 'applyPending')
}

const ApplyPendingupdate = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/ApplyPendingupdate').default);
  }, 'applyPendingupdate')
}

const Rebutpostpone = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/Rebutpostpone').default);
  }, 'rebutpostpone')
}

const Rebutdelaymodify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/Rebutdelaymodify').default);
  }, 'rebutdelaymodify')
}

const PayProofList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/trade/PayProofList').default);
  }, 'PayProofList');
}

const ProofDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('./components/trade/payProof/ProofDetail').default)
  }, 'ProofDetail')
}

// --------------------- load on demand ---------------------⏫
export default function({ history }) {
  return (
    <Router history={history} onUpdate={pageOnUpdate}>
      <Route path="/" component={App} >
        <IndexRoute getComponent={MainComponent} />
        <Route path='mainComponent' getComponent={MainComponent} />
        <Route path="productMain(/:type)" getComponent={ProductMain} />
        <Route path="todayProduct" getComponent={TodayProduct} />
        <Route path="otherProduct" getComponent={OtherProduct} />
        <Route path="productMenu" getComponent={ProductMenu} />
        <Route path="onlineProductList" getComponent={OnlineProList} />
        <Route path="filterPage" getComponent={FilterPage} />
        <Route path="safeGuard" getComponent={SafeGuard} />
        <Route path="productDetail" getComponent={ProductDetail} />
        <Route path="ProDetailNobtn" getComponent={ProDetailNobtn} />
        <Route path="filePreview" getComponent={FilePreview} />
        <Route path="FilePreviewOut" getComponent={FilePreviewOut} />
        <Route path="salePreview" getComponent={SalePreview} />
        <Route path='ProductNotify' getComponent={ProductNotify} />

        <Route path="productQrnh" getComponent={ProductQrnh} />
        <Route path="appoint" getComponent={Appoint} />
        <Route path="marketMonth" getComponent={MarketMonth} />
        <Route path="addcontractnumber" getComponent={AddContractNumber} />
        <Route path="searchPage" getComponent={SearchPage} />
        <Route path="holdMeeting" getComponent={HoldMeeting} />
        <Route path="productVideo" getComponent={ProductVideo} />
        <Route path="productOverView" getComponent={ProductOverView} />
        <Route path="custBuyDetail" getComponent={CustBuyDetail} />
        <Route path="productInfoTab" getComponent={ProductInfo} />
        <Route path="buyCustomer" getComponent={BuyCustomer} />
        <Route path="proHoldSpeed" getComponent={ProHoldSpeed} />
        <Route path="typeToSelectCustomer" getComponent={TypeToSelectCustomer} />


        <Route path="personalCusDetail" getComponent={PersonalCustomerDetail} />
        <Route path="orgCusDetail" getComponent={OrgCustomerDetail} />
        <Route path="customerMain" getComponent={CustomerMain} />
        <Route path="riskBearSec" getComponent={RiskBearSec} />
        <Route path="giveupCause" getComponent={GiveUp} />
        <Route path="riskAssess" getComponent={RiskAssess} />
        <Route path="customerInquire" getComponent={CustomerInquire} />
        <Route path="secCustomer" getComponent={SecCustomer} />
        <Route path="bankCardManage" getComponent={BankCardManage} />
        <Route path="giveUpCustomer" getComponent={GiveUpCustomer} />
        <Route path="transaction" getComponent={Transaction} />
        <Route path="backVisit" getComponent={BackVisit} />
        <Route path="newBankId" getComponent={NewBankId} />
        <Route path="bankChange" getComponent={BankChange} />
        <Route path="imageAdd" getComponent={ImageAdd} />
        <Route path="oldBankUser" getComponent={OldBankUser} />
        <Route path="newBankUser" getComponent={NewBankUser} />
        <Route path="removeChange" getComponent={RemoveChange} />
        <Route path="customerFilter" getComponent={CustomerFilter} />
        <Route path="recallDetail" getComponent={RecallDetail} />
        <Route path="personalCustomerMaterial" getComponent={PersonalCustomerMaterial} />
        <Route path="personalCustomerIncrease" getComponent={PersonalCustomerIncrease} />
        <Route path="personalLatentCustomerEdit" getComponent={PersonalLatentCustomerEdit} />
        <Route path="personalCustMaterialInfo" getComponent={PersonalCustMaterialInfo} />
        <Route path="CustomerCapiDetail" getComponent={CustomerCapiDetail} />
        <Route path="orgCusAdd" getComponent={OrgCusAdd} />
        <Route path="orgCusAddMore" getComponent={OrgCusAddMore} />
        <Route path="customerWait" getComponent={CustomerWait} />
        <Route path="orgCusWaitChange" getComponent={OrgCusWaitChange} />


        <Route path="tradeSafeMain" getComponent={TradeSafeMain} />
        <Route path="tradeProduct" getComponent={TradeProduct} />
        <Route path="tradeRejectProduct" getComponent={TradeRejectProduct} />
        <Route path="tradeSafeInquire" getComponent={TradeSafeInquire} />
        <Route path="tradeSafeContract" getComponent={TradeSafeContract} />
        <Route path="xtTradeMain" getComponent={XTTradeMain} />
        <Route path="buyXTproList" getComponent={BuyXTproList} />
        <Route path="redeemList" getComponent={RedeemList} />
        <Route path="tradeInfoSee" getComponent={TradeInfoSee} />
        <Route path="xtTradeInput" getComponent={XTTradeInput} />
        <Route path="redeemAsk" getComponent={RedeemAsk} />
        <Route path="recallList" getComponent={RecallList} />
        <Route path="recallAsk" getComponent={RecallAsk} />
        <Route path="buyokInfo" getComponent={BuyokInfo} />
        <Route path="myOrder" getComponent={MyOrder} />
        <Route path="rebutBuy" getComponent={RebutBuy} />
        <Route path="orderDetail" getComponent={OrderDetail} />
        <Route path="tradeRebut" getComponent={TradeRebut} />
        <Route path="transferMode" getComponent={TransferMode} />
        <Route path="customerPositionInfo" getComponent={CustomerPositionInfo} />
        <Route path="transferInput" getComponent={TransferInput} />
        <Route path="transferReject" getComponent={TransferReject} />
        <Route path="transferRejectModify" getComponent={TransferRejectModify} />
        <Route path="regAuth" getComponent={RegAuth} />
        <Route path="regAuthDetail" getComponent={RegAuthDetail} />
        <Route path="rebutRecall" getComponent={RebutRecall} />
        <Route path="rebutRedeem" getComponent={RebutRedeem} />
        <Route path="rebutFundChange" getComponent={RebutFundChange} />
        <Route path="tradeContractEnter" getComponent={TradeContractEnter} />
        <Route path="tradeRedChange" getComponent={TradeRedChange} />
        <Route path="tradePayRecord" getComponent={TradePayRecord} />
        <Route path="TradePayRecordSee" getComponent={TradePayRecordSee} />
        <Route path="addPayRecord" getComponent={AddPayRecord} />
        <Route path="rebutBuyChange" getComponent={RebutBuyChange} />
        <Route path="recallChange" getComponent={RecallChange} />
        <Route path="tradeReject" getComponent={TradeReject} />
        <Route path="tradeUnsubmitted" getComponent={TradeUnsubmitted} />
        <Route path="xtRemitInfo" getComponent={XTRemitInfo} />
        <Route path="remittorAccount" getComponent={RemittorAccount} />
        <Route path="remitAccountAdd" getComponent={RemitAccountAdd} />
        <Route path="payeeAccount" getComponent={PayeeAccount} />
        <Route path="tradeMain" getComponent={TradeMain} />
        <Route path="remitDetail" getComponent={RemitDetail} />
        <Route path="redeemDetail" getComponent={RedeemDetail} />
        <Route path="recallRejectDetail" getComponent={RecallRejectDetail} />
        <Route path="subscriptionDetail" getComponent={SubscriptionDetail} />
        <Route path="tradeRejectDetail" getComponent={TradeRejectDetail} />
        <Route path="tradeUnsubmittedDetail" getComponent={TradeUnsubmittedDetail} />
        <Route path="tradeExpireDeal" getComponent={TradeExpireDeal} />
        <Route path="tradePositionInfo" getComponent={TradePositionInfo} />
        <Route path="tradePositionDetail" getComponent={TradePositionDetail} />
        <Route path="customerTradeSearch" getComponent={CustomerTradeSearch} />
        <Route path="tradeAffirmPortion" getComponent={TradeAffirmPortion} />
        <Route path="userGainFind" getComponent={UserGainFind} />
        <Route path="fundInquire" getComponent={FundInquire} />
        <Route path="fundDetail" getComponent={FundDetail} />
        <Route path="customerShareDetail" getComponent={CustomerShareDetail} />
        <Route path="customerShareInquire" getComponent={CustomerShareInquire} />
        <Route path="transferDetail" getComponent={TransferDetail} />
        <Route path="inputSelectCustomer" getComponent={InputSelectCustomer} />
        <Route path="tradeProduct" getComponent={TradeProduct} />
        <Route path="contractNoSelect" getComponent={ContractNoSelect} />

        <Route path="optionSuccess" getComponent={OptionSuccess} />
        <Route path="CustomerConfAmt" getComponent={CustomerConfAmt} />
        <Route path="intentionWrite" getComponent={IntentionWrite} />
        <Route path="writtenDetail" getComponent={WrittenDetail} />
        <Route path="selectProWritten" getComponent={SelectProWritten} />
        <Route path="writeenFrom" getComponent={WrittenForm} />
        <Route path="vpShareList" getComponent={VpShareList} />
        <Route path="vpShareDetail" getComponent={VpShareDetail} />
        <Route path="queueOrderList" getComponent={QueueOrderList} />
        <Route path="queueOrderDetail" getComponent={QueueOrderDetail} />
        <Route path="operationManual" getComponent={OperationManual} />
        <Route path="biTypeInputListCnt" getComponent={BiTypeInputListCnt} />
        <Route path="biTypeInputItemDetailCnt" getComponent={BiTypeInputItemDetailCnt} />
        <Route path="applyCnt" getComponent={ApplyCnt} />
        <Route path="pubbiTypeInputListCnt" getComponent={PubbiTypeInputListCnt} />
        <Route path="rejectListCnt" getComponent={RejectListCnt} />
        <Route path="searchListCnt" getComponent={SearchListCnt} />
        <Route path="searchItemDetailCnt" getComponent={SearchItemDetailCnt} />
        <Route path="applyforChangeCnt" getComponent={ApplyforChangeCnt} />
        <Route path="roleChangeRejectCnt" getComponent={RoleChangeRejectCnt} />
        <Route path="itemDetail" getComponent={ItemDetail} />
        <Route path="investorSearchListCnt" getComponent={InvestorSearchListCnt} />
        <Route path="investorItemDetail" getComponent={InvestorItemDetail} />
        <Route path="investorApplyInqueryCnt" getComponent={InvestorApplyInqueryCnt} />
        <Route path="pubAcceptorSelectCnt" getComponent={PubAcceptorSelectCnt} />
        <Route path="playAndroidVideo" getComponent={PlayAndroidVideo} />
        <Route path="itemDetailChange" getComponent={ItemDetailChange} />
        <Route path="paymentOfInterestCnt" getComponent={PaymentOfInterestCnt} />
        <Route path="interestDetail" getComponent={InterestDetail} />
        // 基金转换相关
        <Route path="fundChangeList" getComponent={FundChangeList} />
        <Route path="fundChangeInfo" getComponent={FundChangeInfo} />
        <Route path="fundChangeAsk" getComponent={FundChangeAsk} />
        <Route path="fundProdList" getComponent={FundProdList} />
        <Route path="tradeFundCChange" getComponent={TradeFundCChange} />
        //资产证明
        <Route path="assetCertificateMain" getComponent={AssetCertificateMain} />
        <Route path="assetsApplyListCnt" getComponent={AssetsApplyListCnt} />
        <Route path="assetsApplyCnt" getComponent={AssetsApplyCnt} />
        <Route path="productListCnt" getComponent={ProductListCnt} />
        <Route path="assetsRejectListCnt" getComponent={AssetsRejectListCnt} />
        <Route path="assetsApplyReject" getComponent={AssetsApplyReject} />
        <Route path="assetsSearchListCnt" getComponent={AssetsSearchListCnt} />
        <Route path="approvedCnt" getComponent={ApprovedCnt} />
        <Route path="searchRejectDetail" getComponent={SearchRejectDetail} />
        <Route path="beingProcessed" getComponent={BeingProcessed} />
        <Route path="selectManagers" getComponent={SelectManagers} />
        //银行卡维护部分
        <Route path="customerModify" getComponent={CustomerModify} />
        <Route path="custPositionList" getComponent={CustPositionList} />
        <Route path="accountChange" getComponent={AccountChange} />
        <Route path="selectBankCus" getComponent={SelectBankCus} />
        <Route path="applyRecordsList" getComponent={ApplyRecordsList} />
        <Route path="cusRecordsDetail" getComponent={CusRecordsDetail} />
        <Route path="bankRebutCnt" getComponent={BankRebutCnt} />
        <Route path="rebutDetail" getComponent={RebutDetail} />
        <Route path="openBankModify" getComponent={OpenBankModify} />
        <Route path="bankAccountCnt" getComponent={BankAccountCnt} />
        <Route path="bankAccountModifyCnt" getComponent={BankAccountModifyCnt} />
        <Route path="accountChangeDetails" getComponent={AccountChangeDetails} />
        <Route path="rebutBankDetail" getComponent={RebutBankDetail} />

        //到期交易
        <Route path="dealList" getComponent={DealList} />
        <Route path="applyPending" getComponent={ApplyPending} />
        <Route path="applyPendingupdate" getComponent={ApplyPendingupdate} />
        <Route path="rebutpostpone" getComponent={Rebutpostpone} />
        <Route path="rebutdelaymodify" getComponent={Rebutdelaymodify} />

        //打款凭证
        <Route path='PayProofList' getComponent={PayProofList} />
        <Route path='ProofDetail' getComponent={ProofDetail} />
        <Route path="*" component={ErrorPage} />
      </Route>
    </Router>
  );
};
