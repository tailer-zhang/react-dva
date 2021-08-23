import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import recordsStyle from '../../styles/customer/recordsStyle.less';
import RebutItem from '../../components/customer/RebutItem'
import * as Commons from "../../utils/commonUtil";

class RebutDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const titleProps = {
      title:'受益账户变更驳回',
      showback: 'yes'
    };
    let {location,formStorage} = this.props
    let progressList = formStorage.formValue.progressList
    let basic = location.state
    return (
      <div className={recordsStyle.tradeInfo}>
        <Title {...titleProps} from='redeem'></Title>
        <RebutItem basic={basic} progressList={progressList} newBankData={formStorage.newBank || ''}/>
      </div>);
  }
};

function connectProps({rebutSpace, formStorage, bank}) {
  return {rebutSpace, formStorage, bank}
}
export default connect(connectProps)(RebutDetail);
