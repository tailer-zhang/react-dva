import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import recordsStyle from '../../styles/customer/recordsStyle.less';
import CusRecordsItem from '../../components/customer/CusRecordsItem'
import * as  Commons from '../../utils/commonUtil';

class CusRecordsDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const titleProps = {
      title:'受益账户变更申请详情',
      showback: 'yes'
    };
     let {location,formStorage} = this.props
    let rawList = formStorage.formValue&&formStorage.formValue.bankImageList ? formStorage.formValue.bankImageList : []
    let rawList1 = formStorage.formValue&&formStorage.formValue.bankImageList1 ? formStorage.formValue.bankImageList1 : []
    let imageList = []
    let imageList1 = []
    for(let i = 0; i < rawList.length; i++){
       let temp = {
         fileId: rawList[i].id,
         fileName: rawList[i].srcFileName,
         url:Commons.ImageHostAddress+rawList[i].fileSvrPath
       }
       imageList.push(temp)
    }
    for(let i = 0; i < rawList1.length; i++){
      let temp = {
        fileId: rawList1[i].id,
        fileName: rawList1[i].srcFileName,
        url:Commons.ImageHostAddress+rawList1[i].fileSvrPath
      }
      imageList1.push(temp)
    }
    let progressList = formStorage.formValue.progressList
    let basic = location.state
    return (
      <div className={recordsStyle.tradeInfo}>
        <Title {...titleProps} from='redeem'></Title>
        <CusRecordsItem basic={basic} bankImageList={imageList} bankImageList1={imageList1} progressList={progressList} />
      </div>);
  }
};

function connectProps({rebutSpace, formStorage, bank}) {
  return { rebutSpace, formStorage, bank }
}

export default connect(connectProps)(CusRecordsDetail);
