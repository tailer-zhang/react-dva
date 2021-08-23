//个人客户详情-基本信息-客户资料-查看 赵博文

import React from 'react';
import Title from '../../components/product/Title';

const PersonalCustMaterialInfo = (props) => {
  const titleProps = {title: '客户资料'};
  const data1 = [require('../../image/customer/customerMaterial1.png'),
                require('../../image/customer/customerMaterial1.png')];
  const data2 = [require('../../image/customer/customerMaterial2_03.png'),
                  require('../../image/customer/customerMaterial2_03.png'),
                  require('../../image/customer/customerMaterial2_03.png'),
                  require('../../image/customer/customerMaterial2_03.png'),
                  require('../../image/customer/customerMaterial2_03.png')];
  return (
    <div>
      <Title {...titleProps}/>
      <div style={{width: '100%',height: '11.334rem',marginTop: '3.2rem',backgroundColor: '#838383'}}></div>
    </div>
  )
}
export default PersonalCustMaterialInfo;
