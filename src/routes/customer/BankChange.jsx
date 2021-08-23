//银行卡维护 新增银行账户  以及银行卡维护

import React,{ Component,PropTypes } from 'react';
import Titles from '../../components/product/Titles';
import Title from '../../components/product/Title';
import { List,ImagePicker, Button,Radio,InputItem,Toast,WhiteSpace } from 'antd-mobile';
import newUserStyles from '../../styles/customer/bankCard.less';
import {Link,routerRedux} from 'dva/router';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import * as  Commons from '../../utils/commonUtil';

import OldUserStyle from '../../styles/customer/bankCard.less';

class BankChange extends React.Component{
  constructor() {
    super();
    this.state={
      index: ''
    }
  }

  onChangeMethord(item,value,name)
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:form.getFieldsValue()
    });
  }

  getOption1() {
    let {dispatch,form,formValue,location} = this.props;
    let dataSource = location.state.data;
    return({
      origCardNo1: {
        valueType:'selfSelect',
        required: true,
        title:'原银行卡账户',
        desc:'原银行卡账户',
        onClick:(e)=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:form.getFieldsValue()
          });
        dispatch(routerRedux.push({pathname:'/oldBankUser',state:{custId: dataSource.id,cardClass: '1'}}));
        }
      }
    })
  }

  getOption2() {
    let {dispatch,form,formValue,location} = this.props;
    let dataSource = location.state.data;
    return({
      cardNo1: {
        valueType:'selfSelect',
        required: true,
        title:'新银行卡账户',
        desc:'新银行卡账户',
        onClick:(e)=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:form.getFieldsValue()
          });
        dispatch(routerRedux.push({
          pathname:'/newBankUser',
          state:{
            params: {
              custId: dataSource.id,
              cardClass: '2',
            },
            data: dataSource,
          }}));
        }
      },
    })
  }

  getOption3() {
    return({
      operator: {
        required:true,
        type: 'text',
        desc:'经办人姓名'
      },
      operCertType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('certType'),
        title:'经办人证件类型',
        desc:'经办人证件类型'
      },
      operCertNo: {
        required:true,
        type: 'text',
        desc:'经办人证件号码'
      },
      space1:{valueType:'whiteSpace'},
    })
  }

  onChange(files, type, index)
  {
    console.log('files',files,type,index);
    let {dispatch,formStorage} = this.props;
    let {chaCardPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
     console.log('image',image);
     if(image.file.size > 5000000){//5M 5000000
       Toast.fail('文件大小超出限制',2);
       return;
     }
     dispatch({
       type:'trade/uploadTradeCommonFiles',
       payload:{
        params:{},
         images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let resultFiles = data.model;
              if(files.length>0)
              {
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      chaCardPic:formStorage.chaCardPic?formStorage.chaCardPic.concat(resultFiles):resultFiles
                    }
                  });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
          }
        }
     });

    }
    else if(type=='remove')//表示移除图片
    {
      console.log('sssssss',index);

      chaCardPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            chaCardPic:chaCardPic
          }
      });
      let image = files.splice(index,1);

      files.map((item,value)=>{
        images.push({file:item.file});
        return images;
      })
      // dispatch({
      //   type:'trade/uploadTradeCommonFiles',
      //   payload:{
      //    params:{},
      //     images:image.file,
      //      backMethord:(data)=>{
      //        if(data&&data.code=='0'&&data.object)
      //        {
      //          let resultFiles = data.object.files;
      //          if(files.length>0)
      //          {
      //            dispatch({
      //                type:'formStorage/fetch',
      //                payload:{
      //                  chaCardPic:formStorage.chaCardPic?formStorage.chaCardPic.concat(resultFiles):resultFiles
      //                }
      //              });
      //          }
      //        }
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
      //      }
      //    }
      // });
    }
  }

  onChange1(files, type, index)
  {
    console.log('files',files,type,index);
    let {dispatch,formStorage} = this.props;
    let {operCertPic} = formStorage;
    if(type=='add')//表示添加图片
    {
     let image = files[files.length-1];
     console.log('image',image);
     dispatch({
       type:'trade/uploadTradeCommonFiles',
       payload:{
        params:{},
         images:[{file:image.file}],
          backMethord:(data)=>{
            if(data&&data.code=='00'&&data.model)
            {
              let operResultFiles = data.model;
              if(files.length>0)
              {
                dispatch({
                    type:'formStorage/fetch',
                    payload:{
                      operCertPic:formStorage.operCertPic?formStorage.operCertPic.concat(operResultFiles):operResultFiles
                    }
                  });
              }
            }
            else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
          }
        }
     });

    }
    else if(type=='remove')//表示移除图片
    {
      console.log('sssssss',index);

      operCertPic.splice(index,1);
      dispatch({
          type:'formStorage/fetch',
          payload:{
            operCertPic:operCertPic
          }
      });
      let image = files.splice(index,1);

      files.map((item,value)=>{
        images.push({file:item.file});
        return images;
      })
      // dispatch({
      //   type:'trade/uploadTradeCommonFiles',
      //   payload:{
      //    params:{},
      //     images:image.file,
      //      backMethord:(data)=>{
      //        if(data&&data.code=='0'&&data.object)
      //        {
      //          let operResultFiles = data.object.files;
      //          if(files.length>0)
      //          {
      //            dispatch({
      //                type:'formStorage/fetch',
      //                payload:{
      //                  operCertPic:formStorage.operCertPic?formStorage.operCertPic.concat(operResultFiles):resultFiles
      //                }
      //              });
      //          }
      //        }
      //        else Toast.fail(data&&data.message?data.message:'图片上传错误!',2);
      //      }
      //    }
      // });

    }
  }

  render() {

    const TitleProp = {title:'银行卡变更'};
    const {dispatch,location,bank,form,formStorage} = this.props;
    let {formValue,card,card1} = formStorage;
    let { getFieldProps,getFieldError} = form;

    let dataSource = location.state.data;

    if(card==undefined) card = {};
    if(card1==undefined) card1 = {};
    console.log('card',card);
    let data = card;
    let data1 = card1;

    const cardStyle ={
      height:'45px',
      color:'#333333',
      fontSize:'28px',
    }

    let files = formStorage.chaCardPic?formStorage.chaCardPic:[];
    let chaCardPic = [];
    files.map((item,index)=>{
      chaCardPic.push({url:Commons.ImageHostAddress+item.fileId});
    });

    let operFiles = formStorage.operCertPic?formStorage.operCertPic:[];
    let operCertPic = [];
    operFiles.map((item,index)=>{
      operCertPic.push({url:Commons.ImageHostAddress+item.fileId});
    });

    return (
      <div className={newUserStyles.newBankIdBox}><div>
        <Titles {...TitleProp}>
          <div className={newUserStyles.cancel} onClick={()=>dispatch(routerRedux.goBack())}>取消</div>
          <div className={newUserStyles.push} onClick={()=>{
            form.validateFields((error,value)=>{
              console.log('----------error',error,value,formStorage.chaCardPic);
              //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
              if(!error)
              {
                 let saveValue = {
                    ...value,
                    origCardNo: data.number,
                    cardNo: data1.number1,
                    custId: dataSource.id,
                    custType: dataSource.custType,
                    chaCardPic: formStorage.chaCardPic,
                    operCertPic: formStorage.operCertPic
                 };

                 console.log('saveValue',saveValue);

                 dispatch({
                   type:'bank/bankCustChange',
                   payload:{
                     params:saveValue,
                     backMethord:(data)=>{
                       if(data&&data.code=='00')
                       dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                         successTitle:'银行卡变更成功!',
                         backTitle:'返回选择客户列表',
                       }}));
                        Toast.fail(data&&data.message?data.message:'银行卡保存错误!',2);
                     }
                   }
                 });
              }
              else {
                Toast.fail('输入参数中存在错误!',2);
              }
            });
          }}>保存</div>
        </Titles>
        <div className={newUserStyles.nameId}>
            <ul className={newUserStyles.leftUl}>
              <li>户名</li>
              <li>证件类型</li>
              <li>证件号</li>
            </ul>
            <ul className={newUserStyles.rightUl}>
              <li>{dataSource.custName}</li>
              <li>{Dic.fetchDicValue('bankCertType',dataSource.certType)}</li>
              <li>{dataSource.certNo}</li>
            </ul>
        </div>
        <div className={newUserStyles.newCardOld} >
          <List>
            {
              dataSource.custType=='0'?<div className={newUserStyles.passPeople} >
                <Form options={this.getOption3()} dispatch={dispatch} form={form} formValue={formValue} onChangeMethord={this.onChangeMethord.bind(this)} />
              </div>:<div />
            }
            <Form options={this.getOption1()} dispatch={dispatch} form={form} formValue={card} onChangeMethord={this.onChangeMethord.bind(this)} />
            <div className={newUserStyles.backCard}>
              <p>{data.number}</p>
              <p>{data.name}</p>
            </div>
          </List>
        </div>
        <div className={newUserStyles.newCardOld}>
          <List>
            <Form options={this.getOption2()} dispatch={dispatch} form={form} formValue={card1} onChangeMethord={this.onChangeMethord.bind(this)} />
            <div className={newUserStyles.backCard}>
              <p>{data1.number1}</p>
              <p>{data1.name1}</p>
            </div>
          </List>
        </div>
        <div className={newUserStyles.chang}>
          <PushFile
            key={'PushFile'}
            onChange={this.onChange.bind(this)}
            files={chaCardPic}
            maxImgCount={5}
            title={'换卡申请附件'}
          />
        </div>
        <WhiteSpace style={{backgroundColor: '#efeff4',height: '30px'}} />
        {
          dataSource.custType=='0'?<div className={newUserStyles.chang}>
            <PushFile
              key={'OperFile'}
              onChange={this.onChange1.bind(this)}
              files={operCertPic}
              maxImgCount={5}
              title={'经办人附件'}
            />
            <WhiteSpace style={{backgroundColor: '#efeff4',height: '20px'}} />
          </div>:<div />
        }
      </div>
    </div>
    )
  }
};
//,'',files, type, index

function connectBankChange({bank,formStorage}) {
  return {bank,formStorage}
}

export default connect(connectBankChange)(createForm()(BankChange));
