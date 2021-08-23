import React from 'react';
import { Link,routerRedux } from 'dva/router';
import styles from '../../styles/product/collectFlow.less';
import {Tool} from '../../utils/tools';
import * as commons from '../../utils/commonUtil';
import {Toast} from 'antd-mobile';

const PromptSelect = ({openFileFunc, shareLinkFunc, labelText })=>{

    return(
      <div className={styles.popover}>
        <p onClick={openFileFunc}><img src={require("../../image/product/icon_open.png")}/><span>打开文件</span></p>
        <p onClick={shareLinkFunc}><img src={require("../../image/product/icon_share.png")}/><span>分享到微信</span></p>
        <div>
          {labelText}
        </div>
      </div>
    );

}


export default PromptSelect;
