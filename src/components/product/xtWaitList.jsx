import React from 'react';

import styles from '../../styles/product/xtWaitList.less'

export default class XtWaitList extends React.Component{
  constructor(props){
    super(props);
  }
  render()
  {
      let {data} = this.props;
    return(
      <div className={styles.highLineList}>
        <p className={styles.waitProName}>{data.prodName}</p>
        <p className={styles.expectTime}>预计上线时间: <span>{data.expeOnlineDate}</span></p>

      </div>
    );
  }
}
