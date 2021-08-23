import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

//样式文件
const OrgBasicInfo = ({data,dispatch}) =>{
  let isBenefitSelf = data.isBenefitSelf === undefined || '' ? '01': data.isBenefitSelf;
  return(
    <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom:'120px'}}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          {
            data.custGrade?
    				<li className={proDetailStyles.infoItem}>
    					<p className={proDetailStyles.infoTitle}>客户等级</p>
    					<p className={proDetailStyles.infoCon}>
                {
                  Dic.fetchDicValue('customerFilter2',data.custGrade)
                }
              </p>
    				</li>:<div />
          }
  				<li className={proDetailStyles.infoItem} >
  					<p className={proDetailStyles.infoTitle}>机构名称</p>
  					<p className={proDetailStyles.infoCon}>{data.busiName}</p>
  				</li>
          <li className={proDetailStyles.infoItem} >
              <p className={proDetailStyles.infoTitle}>法人代表</p>
              <p className={proDetailStyles.infoCon} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                  {data.legalMen}
              </p>
          </li>
          <li className={proDetailStyles.infoItem}>
              <p className={proDetailStyles.infoTitle}>控股股东或实际控制人</p>
              <p className={proDetailStyles.infoCon}>
                  {data.actualControl? data.actualControl:data.legalMen}
              </p>
          </li>
          <li className={proDetailStyles.infoItem} >
              <p className={proDetailStyles.infoTitle}>是否本人受益</p>
              <p className={proDetailStyles.infoCon}>{Dic.fetchDicValue('isControl',isBenefitSelf)}</p>
          </li>
          <li className={proDetailStyles.infoItem} >
              <p className={proDetailStyles.infoTitle}>说明：</p>
              <p className={proDetailStyles.infoCon}>
                  {data.isBenefitSelf=='01'? data.busiName:data.actualBenefit}
              </p>
          </li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>主联系人姓名</p>
  					<p className={proDetailStyles.infoCon}>{data.linkName}</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>主联系人性别</p>
  					<p className={proDetailStyles.infoCon} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <img src={data.linkSex=='02'?require("../../image/icon/female.png")
              :require("../../image/icon/male.png")}
              className={PerCusDetailStyles.s_icon} style={{marginRight:'19px'}}/>
              {
                Dic.fetchDicValue('gender',data.linkSex)
              }
              </p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>机构性质</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('busiClass',data.busiClass)
              }
            </p>
  				</li>
			<li className={proDetailStyles.infoItem}>
				<p className={proDetailStyles.infoTitle}>执照类型</p>
				<p className={proDetailStyles.infoCon}>
                    {
                        Dic.fetchDicValue('budiPermit',data.certType)
                    }
                </p>
			</li>
            <li className={proDetailStyles.infoItem}>
                   <p className={proDetailStyles.infoTitle}>经营范围</p>
                   <p className={proDetailStyles.infoCon}>
                       {data.runScope}
                   </p>
            </li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>执照号码</p>
  					<p className={proDetailStyles.infoCon}>{data.certCode}</p>
  		  </li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>执照有效年限</p>
  					<p className={proDetailStyles.infoCon}>{data.certStartDate}~{data.certEndDate=='9999-12-31'?'长期有效':data.certEndDate}</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>年检是否有效</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('isPrivary',data.busiYCheck)
              }
            </p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle} style={{display:'flex',alignItems:'center'}}>注册地址</p>
  					<p className={proDetailStyles.infoCon} style={{paddingLeft:'60px'}}>{data.logingAddress}</p>
  		 </li>
         <li className={proDetailStyles.infoItem}>
           <p className={proDetailStyles.infoTitle}>办公地址</p>
           <p className={proDetailStyles.infoCon}>{data.messageAddress}</p>
         </li>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>注册资本(万元)</p>
  					<p className={proDetailStyles.infoCon}>{data.logingMoney}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>是否有海银会员推荐</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('isPrivary',data.isfmanForMember)
              }
            </p>
  				</li>
          {
            data.isfmanForMember=='01'?(<div >
              <li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>会员姓名/名称</p>
      					<p className={proDetailStyles.infoCon}>{data.relationCustName}</p>
      				</li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>联系电话</p>
                <p className={proDetailStyles.infoCon}>{data.IntroducerMobile}</p>
              </li>
              <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
      					<p className={proDetailStyles.infoTitle}>与推荐人/机构关系</p>
      					<p className={proDetailStyles.infoCon}>
                  {
                    Dic.fetchDicValue('instiRelative',data.relation)
                  }
                </p>
      				</li>
            </div>):<div />
          }
          <li className={proDetailStyles.infoItem}>
            <p className={proDetailStyles.infoTitle}>客户来源</p>
            <p className={proDetailStyles.infoCon}>{Dic.fetchDicValue('custSource',data.remark1)}
            </p>
          </li>
  			</ul>
  		</div>
        <div className={PerCusDetailStyles.infoWrap}>
    			<ul>
                    <li className={proDetailStyles.infoItem} style={data.badRecords=='02'?{}:{borderBottom:'0px'}}>
                        <p className={proDetailStyles.infoTitle}>有无不良诚信记录</p>
                        <p className={proDetailStyles.infoCon}>
                            {data.badRecords=='02'?'有':'无'}
                        </p>
                    </li>
                    {
                        data.badRecords=='02'?<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                            <p className={proDetailStyles.infoTitle}>不良诚信记录描述</p>
                            <p className={proDetailStyles.infoCon}>
                                {data.recordDesc}
                            </p>
                        </li>:<div />
                    }
    			</ul>
    	</div>
      <div className={PerCusDetailStyles.infoWrap} onClick={()=>dispatch(routerRedux.push({
        pathname: 'PersonalCustomerMaterial',
        state:{
           certPic:data.certPic,
           memPic:data.memPic
        }
      }))}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>资料查看</p>
  					<p className={proDetailStyles.infoCon}>
              <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
  					</p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};

export default OrgBasicInfo;
