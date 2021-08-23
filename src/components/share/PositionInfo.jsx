import React, { PropTypes } from 'react';
import { SearchBar,WhiteSpace,List,Tabs,InputItem, DatePicker} from 'antd-mobile';
import tradeInfo from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';
import Dic from '../../utils/dictionary';


const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;

const PositionInfo = ({postModel}) => {
  return(
    <div style={{backgroundColor:'#efeff4'}} >
       <List>
         <Item  extra={postModel.custName} >客户名称</Item>
         <Item  extra={Dic.fetchDicValue('operCertType',postModel.certType)} >证件类型</Item>
         <Item  extra={postModel.certNo} >证件号码</Item>
       </List>
       <WhiteSpace/>
       <List>
         <Item  extra={postModel.prodName}>产品名称</Item>
         <Item  extra={postModel.prodExpiName}>产品类别</Item>
       </List>
       <WhiteSpace/>
       <List>
         <Item  extra={postModel.totShr}>持有份额(份)</Item>
         <Item  extra={postModel.avlShr}>可用份额(份)</Item>
         <Item  extra={postModel.tradShr}>交易冻结份额(份)</Item>
         <Item  extra={postModel.pledShr}>质押冻结份额(份)</Item>
         <Item  extra={postModel.abnoShr}>异常冻结份额(份)</Item>
       </List>
       <WhiteSpace/>
       <List style={{backgroundColor:'#fff'}}>
         <Item  extra={postModel.totCost}>总成本</Item>
       </List>
       <WhiteSpace/>
       <List style={{backgroundColor:'#fff'}}>
         <Item  extra={postModel.accuEarn}>累计收益</Item>
       </List>
       <WhiteSpace/>
       <List style={{backgroundColor:'#fff'}}>
         <Item  extra={postModel.createBy}>创建人</Item>
         <Item extra={postModel.createTime}>创建时间</Item>
         {/*<Item extra={Dic.fetchDicValue('recStat',postModel.recStat)}>记录状态</Item>*/}
       </List>
    </div>
  )
};
export default PositionInfo;
