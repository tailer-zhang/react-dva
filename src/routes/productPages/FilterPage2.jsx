/*
 * @Author: your name
 * @Date: 2021-02-23 13:39:04
 * @LastEditTime: 2021-02-25 18:14:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \newStart\webapp\cfp\cfpWeb\src\routes\productPages\FilterPage2.jsx
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';


import Filter2 from '../../components/product/Filter2';

const FilterPage = ({backEvent,filterArgs,dispatch,open})=>{
  return (
    <div style={{height:'100%'}}>
        {
          open?<Filter2 backEvent={backEvent}
            filterEvent={(filterArgs, status)=>{
              if(status == undefined || status != 'reset'){//不等于重置
                  dispatch({
                    type:'xtProduct/fetchOtherProdRemote2',
                    payload:{filterArgs:filterArgs}
                  });
                  backEvent();
              }
          }}
            filterArgs={filterArgs}
          />:''
        }
    </div>
  );
};

// function connectProductFunc({xtProduct})
// {
//   return {xtProduct};
// }

export default FilterPage;
