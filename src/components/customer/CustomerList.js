import React from 'react';
import { Badge } from 'antd-mobile';
import styles from '../../styles/customer/customerMain.less';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';


const CustomerList = ({dispatch,customer}) => {
  // console.log('---customer---',customer.customerList.length);
  let data = customer.dataTotal;
  if (data == undefined) data = 0;
  let customerMenuArr = [
      {
        image:require("../../image/icon/customerMain_03.png"),
        name:'客户查询',
        badge:0,
        clickMethord:(item)=>dispatch(routerRedux.push('/customerInquire'))
      },
      {
        image:require("../../image/icon/customerMain_07.png"),
        name:'客户待办',
        badge:data,
        clickMethord:(item)=>{dispatch(routerRedux.push('/customerWait'))}
        // clickMethord:(item)=>dispatch(routerRedux.push({
        //   pathname: '/customerWait',
        //   // query: {userId: '000176',pageNumber: '1',pageSize: '10'}
        // }))
        // clickMethord:(item)=>dispatch(routerRedux.push({pathname:'/customerInquire',query:{mode:'undoCustomer'}}))
      },{
        image:require("../../image/icon/customerMain_10.png"),
        name:'个人客户添加',
        badge:0,
        clickMethord:(item)=>dispatch(routerRedux.push('/personalCustomerIncrease'))
      },{
        image:require("../../image/icon/customerMain_13.png"),
        name:'机构客户添加',
        badge:0,
        clickMethord:(item)=>dispatch(routerRedux.push('/orgCusAdd'))
      },{
        image:require("../../image/icon/customerMain_16.png"),
        name:'客户银行卡维护',
        badge:0,
        clickMethord:(item)=>dispatch(routerRedux.push({
          pathname: '/secCustomer',
          state: {}
        }))
      },{
        image:require("../../image/icon/customerMain_19.png"),
        name:'客户银行卡变更',
        badge:0,
        clickMethord:(item)=>dispatch(routerRedux.push({
          pathname: '/secCustomer',
          query: {mode: 'change'}
        }))
      }
  ];
      return (
        <div >
          <ul>
            {
              customerMenuArr.map((item,index)=>{
                return (
                  <li key={index} className={styles.li} onClick={(e)=>{
                        //    e.preventDefault();
                          item.clickMethord(item);}}>
                    <div className={styles.customer}><img src={item.image} /><span>{item.name}</span></div>
                    <div className={styles.arrow_r}>
                      {item.badge>0?<Badge text={data} size="large" style={{ marginRight: 12 }} />:<div />}
                      <img src={require("../../image/icon/arrow_r.png")}/>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      )

}

function connectCustomerFunc({customer})
{
  return {customer};
}
export default connect(connectCustomerFunc)(CustomerList);
