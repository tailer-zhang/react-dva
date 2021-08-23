//银行卡维护  银行卡管理
import React,{ Component , PropTypes } from 'react';
import Title from '../../components/product/Title';
import BankCard from '../../components/share/BankCard';
import BankCardManageList from '../../components/customer/BankCardManageList';
import SelectBankCardNoList from '../../components/customer/SelectBankCardNoList';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import bankCardStyles from '../../styles/customer/bankCard.less';


const BankCardManage = ({dispatch,bank,location}) =>{
  let dataSource = bank.BankCustList;
  if(dataSource == undefined) dataSource = [];
  let data = dataSource[dataSource.length-1];
  if (data == undefined) data = {};

  let getData = location.state.data;
  let tradMode = location.state.mode;
  // const TitleProp = {title:tradMode=='selectCustomerAccount'?'银行卡选择':'银行卡管理'};
  const TitleProp = {title:tradMode=='selectCustomerAccount'?'银行卡选择':'银行卡维护'};
  return (
    <div style={{height: '100%'}}>
      <div className={bankCardStyles.ccc}>
        <Title {...TitleProp}>
          <div className={bankCardStyles.titleImg}
           onClick={()=>dispatch(routerRedux.push({
              pathname: '/newBankId',
              state: {data: getData,mode: 'add',tradMode:tradMode}
            }))}>
              新增
          </div>
        </Title>
      </div>
      <div className={bankCardStyles.bankCard + " " + bankCardStyles.boxScorll}>
        {
          tradMode=='selectCustomerAccount'?(<SelectBankCardNoList
             dataSource={bank.BankCustList} location={location} /> ):(
               <BankCardManageList dataSource={bank.BankCustList} location={location} />
           )
        }

      </div>
    </div>
  );
};

function connectBankCardManage({bank,formStorage}) {
  return {bank,formStorage}
}

export default connect(connectBankCardManage)(createForm()(BankCardManage));
