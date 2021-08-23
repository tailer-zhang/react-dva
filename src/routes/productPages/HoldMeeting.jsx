import React from 'react';
import holdStyle from '../../styles/product/HoldMeeting.less';
import { connect } from 'dva';

class HoldMeeting extends React.Component{
  constructor(props){
    super(props);
    this.transformProdConfPersD=this.transformProdConfPersD.bind(this);
  }

  transformProdConfPersD(peopleList){
      if(!peopleList||peopleList.length<=0)
        return '无参与人';
      let partPeople = '';
      for(let i = 0;i<peopleList.length;i++){
          let peopleInfo = peopleList[i];
          if(i<peopleList.length-1)
           partPeople = partPeople + peopleInfo.staffName+',';
          else  partPeople = partPeople + peopleInfo.staffName;
      }
      return partPeople;
  }
  render()
  {
      let {meetingDetail} = this.props;
    //   meetingDetail =  {
    //        "updateBy": "sysadmin",
    //        "createTime": 1495508911438,
    //        "updateTime": 1495508911438,
    //        "prodId": 234,
    //        "confEndTime": "2017-05-02 00:00",
    //        "type": "2",
    //        "createBy": "sysadmin",
    //        "version": 1,
    //        "typeName": "电话会议",
    //        "content": "222",
    //        "id": 11,
    //        "title": "111",
    //        "prodName": "上海御怀投资中心",
    //        "passKey": "faebfa1bdc4b4763684bb8743cca3a33",
    //        "speakerId": "003299",
    //        "speakerName": "汪婷",
    //        "prodConfPersDtoList":
    //        [
    //            {
    //                "updateBy": "sysadmin",
    //                "id": 7,
    //                "createTime": 1495508911476,
    //                "confId": 11,
    //                "staffId": "000042",
    //                "updateTime": 1495508911476,
    //                "staffName": "卢晓琳",
    //                "createBy": "sysadmin",
    //                "recStat": "1",
    //                "version": 1
    //            }
    //        ],
    //        "recStat": "1",
    //        "confBeginTime": "2017-05-01 00:00"
    //    };
    return(
     <div className={holdStyle.holdMeeting}>
        <ul>
          <li>
            <span className={holdStyle.infoTitle}>会议主题</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.title}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>会议类型</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.typeName}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>主讲人</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.speakerName}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>会议开始时间</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.confBeginTime}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>会议结束时间</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.confEndTime}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>参会人员</span>
            <p className={holdStyle.holdInfo}>{this.transformProdConfPersD(meetingDetail.prodConfPersDtoList)}</p>
          </li>
          <li>
            <span className={holdStyle.infoTitle}>会议内容</span>
            <p className={holdStyle.holdInfo}>{meetingDetail.content}</p>
          </li>
        </ul>
      </div>);
  }
}

function connectStateFunc({xtProduct}){
    return {
        meetingDetail:xtProduct.meetingDetail
    };
}

export default connect(connectStateFunc)(HoldMeeting);
