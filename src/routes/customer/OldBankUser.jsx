//45银行卡变更-选择原银行卡账户  原银行卡账户
//46银行卡变更-选择新银行卡账户 +
import React ,{ Component, PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import { List, Radio } from 'antd-mobile';

import OldUserStyle from '../../styles/customer/bankCard.less';


const RadioItem = Radio.RadioItem;

const OldBankUser = ({bank,location,dispatch}) => {

  let mode = location.query.mode;
  let titleProps={title:'原银行卡账户',};
  if(mode=='new') titleProps={title:'新银行卡账户',};

  const cardStyle ={
    height:'45px',
    color:'#333333',
    fontSize:'28px',
  }


  let data = bank.BankCustList;
  if(data == undefined) data = [];

  return (
    <div>
      <div>
        <Title {...titleProps}>
          <div className={OldUserStyle.right}></div>
        </Title>
      </div>
      <div>
        {
          data.map((item,index)=>{
            return (
              <div className={OldUserStyle.circle} key={index} onClick={()=>{
                dispatch(routerRedux.goBack());
                dispatch({
                  type: 'formStorage/fetch',
                  payload: {
                    card: {
                      name: item.bankName,
                      number: item.cardNo,
                    }
                  }
                })
              }}>
                <p>{item.cardNo}</p>
                <p>{item.bankName}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};


function connectOldBank({bank,formStorage}) {
  return {bank,formStorage}
}

export default connect(connectOldBank)(OldBankUser);
