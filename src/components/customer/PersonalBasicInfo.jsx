import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import { Link ,routerRedux} from 'dva/router';
import moment from 'moment';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件
const PersonalBasicInfo = ({dispatch,perCustInfo}) =>{
  const data = perCustInfo.perInfoList;
  console.log("data.isBenefitSelf=--------",data.isBenefitSelf);
  let isBenefitSelf = data.isBenefitSelf === undefined || '' ? '01': data.isBenefitSelf;
  let isControl = data.isControl === undefined || '' ? '01': data.isControl;

  return(
    <div className={PerCusDetailStyles.basicInfoWrap}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <div>
            {
              data.custGrade?<li className={proDetailStyles.infoItem}>
                <p className={proDetailStyles.infoTitle}>客户等级</p>
                <p className={proDetailStyles.infoCon}>
                  {Dic.fetchDicValue('customerFilter2',data.custGrade)}
                </p>
              </li>:<div />
            }
            {
              data.memberNo?<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                <p className={proDetailStyles.infoTitle}>会员编号</p>
                <p className={proDetailStyles.infoCon}>{data.memberNo}</p>
              </li>:<div />
            }
          </div>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>姓名</p>
  					<p className={proDetailStyles.infoCon}>{data.custName}</p>
  				</li>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>是否存在控制关系</p>
  					<p className={proDetailStyles.infoCon}>{Dic.fetchDicValue('isControl',isControl)}</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
              <p className={proDetailStyles.infoTitle}>说明：</p>
              <p className={proDetailStyles.infoCon}>{data.actualControl}</p>
          </li>
          <li className={proDetailStyles.infoItem} >
              <p className={proDetailStyles.infoTitle}>是否本人受益</p>
              <p className={proDetailStyles.infoCon}>{Dic.fetchDicValue('isBenefitSelf',isBenefitSelf)}</p>
          </li>
          <li className={proDetailStyles.infoItem} >
              <p className={proDetailStyles.infoTitle}>说明：</p>
              <p className={proDetailStyles.infoCon}>{data.isBenefitSelf=='01'?data.custName:data.actualBenefit}</p>
          </li>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>性别</p>
  					<p className={proDetailStyles.infoCon} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <img src={data != undefined?
              (data.sex == '02'?require('../../image/icon/female.png')
              :require('../../image/icon/male.png')):''}
              className={PerCusDetailStyles.s_icon} style={{marginRight:'19px'}}/>
              {data.sex == '01'?Dic.fetchDicValue('gender','01'):Dic.fetchDicValue('gender','02')}</p>
  				</li>
          {
            data.custNameE != undefined?<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
    					<p className={proDetailStyles.infoTitle}>外文名</p>
    					<p className={proDetailStyles.infoCon}>{data.custNameE}</p>
    				</li>:''
          }
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>证件类型</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('certTypes',data.certType)}
            </p>
  				</li>
            {
              data.certType == '04'?<li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>说明</p>
      					<p className={proDetailStyles.infoCon}>{data.certDesc}</p>
      				</li>:''
            }
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>证件号码</p>
  					<p className={proDetailStyles.infoCon}>{data.certCode}</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>证件到期日</p>
  					<p className={proDetailStyles.infoCon}>{data.certEndDate=='9999-12-31'?'长期有效':data.certEndDate}</p>
  				</li>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>出生日期</p>
  					<p className={proDetailStyles.infoCon}>{moment(data.birthDay).format('YYYY-MM-DD')}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>民族</p>
  					<p className={proDetailStyles.infoCon}>{data.nation}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>国籍</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('nationality',data.nationalityType)}
            </p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>常住城市</p>
  					<p className={proDetailStyles.infoCon}>{data.residentCity}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>是否有海银会员推荐</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('isPrivary',data.isfmanForMember)}
            </p>
  				</li>
          {
              data.isfmanForMember=='01'?(<div>
                <li className={proDetailStyles.infoItem}>
        					<p className={proDetailStyles.infoTitle}>会员姓名/名称</p>
        					<p className={proDetailStyles.infoCon}>{data.relationCustName}</p>
        				</li>
                <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
        					<p className={proDetailStyles.infoTitle}>与推荐人/机构关系</p>
        					<p className={proDetailStyles.infoCon}>
                    {
                      Dic.fetchDicValue('relation',data.relation)
                    }
                  </p>
        				</li>
                <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
        					<p className={proDetailStyles.infoTitle}>联系电话</p>
        					<p className={proDetailStyles.infoCon}>
                    {
                      data.relationMobile
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
      <div className={PerCusDetailStyles.infoWrap}>
        <ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
                      <p className={proDetailStyles.infoTitle}>您的财务是否对家庭保密</p>
                      <p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('isPrivary',data.isSecret)}
            </p>
          </li>
      </ul>
      </div>
      <div className={PerCusDetailStyles.infoWrap} onClick={()=>{
        dispatch(routerRedux.push({
          pathname: 'PersonalCustomerMaterial',
          state: {
            certPic:data.certPic,
            memPic:data.memPic
          }
        }))
      }}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>资料查看</p>
  					<p className={proDetailStyles.infoCon}>
              <img src={require("../../image/icon/arrow_r.png")} className={PerCusDetailStyles.arrow_r_icon}/>
  					</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>备注</p>
  					<p className={proDetailStyles.infoCon}>
              {data.remark}
  					</p>
  				</li>
  			</ul>

  		</div>
    </div>
  );
};
export default PersonalBasicInfo;
