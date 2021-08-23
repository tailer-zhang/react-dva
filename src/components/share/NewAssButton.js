//重新测评按钮组件
import React,{ Component,PropTypes } from 'react';

import riskStyles from '../../styles/customer/riskBear.less';

const NewAssButton =({onClick}) =>{
  return(
    <div className={riskStyles.NewAssBtn} onClick={(e)=>{
        //   e.preventDefault();
          if(onClick)
            onClick(e);
      }}>
        重新测评
    </div>
  );
};

export default NewAssButton;
