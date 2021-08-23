import React from 'react';

import shadeStyle from '../../styles/product/collectFlow.less';


class ProOpenShade extends React.Component{
  constructor(props){
    super(props);
  }

  offShade(){
  //  let { shadeClose } = this.props;
  //  shadeClose();
  }

  render()
  {
    return(
      <div className={shadeStyle.openShade}>
        <div className={shadeStyle.prompt}>
          <section>
            <p>产品开放日通知</p>
            <p>根据基金业协会《私募投资基金募集管理办法》规定，即日起只有经特定对象确定程序的客户才能登录私募网站查看，特此公告！</p>
          </section>
          <p style={{borderTop:'1px solid #f22f33'}} onClick={this.offShade.bind(this,)}>关闭</p>
        </div>
      </div>
    );
  }
}

export default ProOpenShade;
