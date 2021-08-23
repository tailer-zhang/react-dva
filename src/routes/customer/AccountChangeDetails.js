import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import recordsStyle from '../../styles/customer/recordsStyle.less';
import AccountChangeRebutItem from '../../components/customer/AccountChangeRebutItem'
import * as Commons from "../../utils/commonUtil";

class AccountChangeDetails extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let {location,dispatch} = this.props
    let data = location.state
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        bankName: data.bankName
      },
    });
  }

  render(){
    const titleProps = {
      title:'受益账户变更驳回',
      showback: 'yes'
    };
    let {location,formStorage} = this.props
    let {fileList,childlist} = formStorage
    let progressList = formStorage.formValue.progressList
    return (
      <div className={recordsStyle.tradeInfo}>
        <Title {...titleProps} from='redeem'></Title>
        <AccountChangeRebutItem formStorage={formStorage} location={location} fileList={fileList} childlist={childlist} progressList={progressList}/>
      </div>);
  }
};

function connectProps({formStorage, openBank, bank}) {
  return {formStorage, openBank, bank}
}
export default connect(connectProps)(AccountChangeDetails);
