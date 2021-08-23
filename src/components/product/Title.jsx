import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const Title = (props) => {
  let {title,backMethord, showBack, from} = props;
  let backButton = <ToBackBtn toBack={backMethord} />;
  if(showBack && showBack=='no'){
    backButton = <div></div>
  }
    return (
      <div className={from&&from=='redeem' ? proDetailStyles.titleWrap1 :proDetailStyles.titleWrap}>
        {backButton}
        <h3 className={proDetailStyles.title1}>{title}</h3>
        {props.children}
      </div>
    );
};
export default Title;
