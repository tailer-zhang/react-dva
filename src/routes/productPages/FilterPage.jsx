import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';


import Filter from '../../components/product/Filter';

const FilterPage = ({backEvent,filterArgs,dispatch,open})=>{
  return (
    <div style={{height:'100%'}}>
        {
          open?<Filter backEvent={backEvent}
            filterEvent={(filterArgs, status)=>{

              if(status == undefined || status != 'reset'){//不等于重置
                  dispatch({
                    type:'xtProduct/fetchRemote',
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
