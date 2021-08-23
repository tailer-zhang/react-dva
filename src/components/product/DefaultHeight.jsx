import React from 'react';

import style from '../../styles/product/collectFlow.less';

class DefaultHeight extends React.Component{
  constructor(props){
    super(props);
  }

  render()
  {
    return(
      <div className={style.defaultHeight}>
        <p className={style.lackLine}><i><img src={require("../../image/product/collect_01.png")}/></i></p>
      </div>
    );
  }
}

export default DefaultHeight;
