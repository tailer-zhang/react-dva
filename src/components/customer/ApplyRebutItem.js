import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import tradeInfo from '../../styles/trade/redeem.less';
import * as Commons from "../../utils/commonUtil";
import ApprProgress from '../../components/customer/ApprProgress'
import DataImg from '../../components/share/DataImg';

const TabPane = Tabs.TabPane;
let isRepeat = 0;

@connect()
@createForm()
export default class ApplyRebutItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {}
  }
  getOption0() {
    let {location} = this.props;
    let data = location.state
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: data.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra: data.certTypeName,
        arrow: 'empty'
      }
    })
  }
  getOption1() {
    let {location} = this.props;
    let data = location.state
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '户名',
        changeType: 'modify',
        extra: data.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '开户证件',
        changeType: 'modify',
        extra: data.certTypeName,
        arrow: 'empty'
      },
      accountType1: {
        valueType: 'selfSelect',
        desc: '原开户行',
        changeType: 'modify',
        extra: data.origBankName,
        arrow: 'empty'
      },
      bankName: {
        valueType: 'selfSelect',
        desc: '新开户行',
        changeType: 'modify',
        extra: data.bankName,
        arrow: 'empty'
      },
      bankNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        changeType: 'modify',
        extra: data.cardNo,
        arrow: 'empty'
      },
    })
  }

  onChange=(files, type, index)=> {
    let {dispatch,formStorage,customer, location} = this.props;
    let {changeList} = formStorage;
    let data = location.state
    const temArr = changeList
    for (let index = 0; index < files.length; index ++) {
      const ifUpload = temArr.find((it) => {
        if(files[index].file){
          return it.fileName === files[index].file.name
        }else {
          return false
        }
      })
      if (ifUpload) {
        Toast.fail('文件已经存在', 2);
        return
      }
    }
    if(type=='add')//表示添加图片
    {
      let params = {orderNo:'',reqSeq: data.reqNo,type: 'k'};
      let image = files[files.length-1];
      dispatch({
        type:'trade/uploadTradeFiles',
        payload:{
          params: params,
          images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(resultFiles.length>0)
              {
                dispatch({
                  type:'formStorage/fetch',
                  payload:{
                    changeList:changeList ? changeList.concat(resultFiles) : resultFiles
                  }
                });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
          }
        }
      });

    }
    else if(type=='remove')//表示移除图片
    {
      let file = changeList[index];
      dispatch({
        type:'trade/delTradeFiles',
        payload:{
          delList:[{id:file.fileId}],
          backMethord:(data)=>{
            if(data&&data.code=='00')
            {
              changeList.splice(index,1);
              dispatch({
                type:'formStorage/fetch',
                payload:{
                  changeList:changeList
                }
              });
            }
            else Toast.fail(data&&data.message?data.message:'图片删除错误!',2);
          }
        }
      });
    }
  }

  renderList(){
    const { fileList} = this.props;
    let arr = []
    let {dispatch,formStorage,childlist} = this.props;
    let {myFileArr} = formStorage;
    let fileArr = myFileArr || []
    for(let i =0; i < fileList.length; i++){
      let tempArr = []
      let data = fileList[i]
      fileArr[i] = fileArr[i] || []
      fileArr[i].map((item,index)=>{
        tempArr.push({url:Commons.ImageHostAddress+item.fileId});
      });
      let temp = (
        <div key={i}>
          <DataImg dataSource={tempArr} innerTtile={data.prodName}/>
        </div>
      )
      arr.push(temp)
    }
    return arr
  }
  render(){
    const { dispatch,onChangeMethord,form,formStorage, progressList} = this.props;
    let reqFiles = formStorage.changeList?formStorage.changeList:[];
    let imageArr = []
    reqFiles.map((item,index)=>{
      imageArr.push({url:item.url? item.url : item.fileSvrPath ? Commons.ImageHostAddress+item.fileSvrPath :  Commons.ImageHostAddress+item.fileId});
    });
    let {formValue} = formStorage
    return (
      <div className={tradeInfo.redbox} style={{height: '100%'}} id='redbox'>
        <div className={tradeInfo.box}>
          <Tabs swipeable={false} animated={false}>
            <TabPane tab="银行卡信息" key="1">
              <div>
                <WhiteSpace/>
                <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
              </div>
            </TabPane>
            <TabPane tab="附件信息" key="3">
              <DataImg dataSource={imageArr} innerTtile={'申请共用附件'}/>
              {this.renderList()}
            </TabPane>
            <TabPane tab="审批进度" key="4">
              <ApprProgress progressList={progressList}/>
              <WhiteSpace/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
