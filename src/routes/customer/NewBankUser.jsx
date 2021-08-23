//45银行卡变更-选择原银行卡账户  原银行卡账户
//46银行卡变更-选择新银行卡账户 +
import React ,{ Component, PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import { List, Radio } from 'antd-mobile';

import OldUserStyle from '../../styles/customer/bankCard.less';


const RadioItem = Radio.RadioItem;

const NewBankUser = ({bank,location,dispatch}) => {

  let mode = location.query.mode;
  let titleProps={title:'新银行卡账户',};

  const cardStyle ={
    height:'45px',
    color:'#333333',
    fontSize:'28px',
  }


  let data = bank.BankCustList;
  if(data == undefined) data = [];

  let getData = location.state.data;

  return (
    <div>
      <div>
        <Title {...titleProps}>
          <div className={OldUserStyle.titleImg} onClick={(e)=>{
            // e.preventDefault();
            dispatch(routerRedux.push({
              pathname: '/newBankId',
              state: {data: getData,mode: 'add'}
            }))
          }}>
            <img src={require("../../image/icon/plus_01.png")}/>
          </div>
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
                    card1: {
                      name1: item.bankName,
                      number1: item.cardNo,
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

export default connect(connectOldBank)(NewBankUser);
