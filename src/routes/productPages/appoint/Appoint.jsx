import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast,Button,Checkbox,List} from 'antd-mobile';
import { createForm } from 'rc-form';
import AppointList from './AppointList';
import styles from '../../../styles/product/AppointFirst.less';
const CheckboxItem = Checkbox.CheckboxItem;
let notify =[] ;
class Appoint extends React.Component{
	constructor(props) {
     super(props);
		 this.state = {
			 submitClickNum:0,
			 show:false,
       ifAlert:false,
       commAlert: false,
       msg: '',
       ifSubmit: false,
       notifyInfo:[
         { value: '00', label: '本人确认并已知晓本产品为中高风险/高风险的股权类产品；' },
         { value: '01', label: '本人已告知客户本产品的风险等级、产品类型以及本产品可能亏损本金的风险，客户已签署《特别风险提示函》。' },
       ]
		 }
  }
  onChange(value) {
    // console.log(value,'#');
    if(notify.includes(value)){
      notify.splice(notify.indexOf(value),1)
    }else{
      notify.push(value)
    }
  }
	onChangeMethord(item,value,name)
	{
		let {dispatch,form} = this.props;
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
		dispatch({
			type:'formStorage/fetchFormValue',
			payload:form.getFieldsValue()
		});
	}

  ShowAlert=()=>{
    return(
      <div className={styles.showAlert}>
        <div className={styles.infor}>
          <p>信息</p>
          <p>修改后您的预约申请将重新排队，确认修改？</p>
          <div>
            <Button onClick={this.confirm}>确定</Button>
            <Button onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

  ShowAlertSec=()=>{
    return(
      <div className={styles.showAlert}>
        <div className={styles.infor}>
          <p>信息</p>
          <p>产品额度不足或合同数不足，是否继续提交?</p>
          <div>
            <Button onClick={this.confirmSec}>确定</Button>
            <Button onClick={this.cancelSec}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

  ShowAlertThird=()=>{
    return(
      <div className={styles.showAlert}>
        <div className={styles.infor}>
          <p>信息</p>
          <p>{this.state.msg}</p>
          <div>
            <Button onClick={this.confirmThird}>确定</Button>
            <Button onClick={this.cancelThird}>取消</Button>
          </div>
        </div>
      </div>
    );
  }

	toBack(){
		history.back();
	}

	jump=()=>{
    let {dispatch} = this.props;
    dispatch(routerRedux.push({
      pathname: '/optionSuccess', state: {
        successTitle: '预约申请已受理，请等待系统确认！', backTitle: '返回产品主页',
        backMethord: () => {
          dispatch(routerRedux.push('/otherProduct'));
        }
      }
    }));
  }

  changeableSubmit=()=>{
    let {dispatch,xtProduct} = this.props;
    dispatch({
      type:'xtProduct/beforeCreateAlert',
      payload:{
        params: {
          prodId:xtProduct.touchItem.prodId?xtProduct.touchItem.prodId:this.props.location.state.basicData.prodId
        },
        callback:(response)=>{
          if (response.code==="00"){
            if (this.props.location.state.basicData){
              this.setState({
                show: true
              })
            }else {
              this.submit();
            }
          }else {
            if(xtProduct.touchItem.commFlag === '1'){
              this.setState({
                msg: response.message,
                commAlert: true
              })
            }else {
              this.setState({
                ifAlert: true
              })
            }
          }
        }
      }
    })
  }

  confirm=()=>{
    this.setState({
      show: false
    })
    this.submit();
  }

  cancel=()=>{
    this.setState({
      show: false
    })
  }

  confirmSec=()=>{
    this.setState({
      ifAlert: false,
      commAlert: false
    })
    if (this.props.location.state.basicData){
      this.setState({
        show: true
      })
    }else {
      this.submit();
    }
  }

  confirmThird=()=>{
    this.setState({
      commAlert: false
    })
    this.submit();
  }

  cancelThird=()=>{
    this.setState({
      commAlert: false
    })
  }

  cancelSec=()=>{
    this.setState({
      ifAlert: false,
      commAlert: false
    })
  }

  beforeSubmit=()=>{
    let {dispatch,form,location,formStorage,xtProduct} = this.props;
    let {formValue} = formStorage;
    if(!formValue.custName){
      Toast.fail('您还没有选择客户,请先选择预约客户!',2);
      return;
    }
    form.validateFields((error,value)=>{
      //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
      if(!error){
        if (xtProduct.touchItem&&xtProduct.touchItem.earnType =='2'){
          if(notify.length>1){
            this.changeableSubmit()
          }else{
            Toast.fail('请先勾选',2);
          }
        }else {
          this.changeableSubmit()
        }

      }else {
       if(value.ordDates === ''){
          Toast.fail('请选择欲打款日期!',1);
        } else {
          Toast.fail('输入参数中存在错误!',1);
        }
      }
    })
  }

  submit=()=>{
    let {dispatch,form,location,formStorage,xtProduct} = this.props;
    let {formValue} = formStorage;
    if(this.state.submitClickNum > 0){
      return ;
    }
    if(!formValue.custName){
      Toast.fail('您还没有选择客户,请先选择预约客户!',2);
      return;
    }
    if(formValue.renew && !formValue.tradeRenew){
      Toast.fail('请选择到期交易!',2);
      return;
    }
    this.setState({submitClickNum:1});
    form.validateFields((error,value)=>{
      //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
      if(!error)
      {
        Toast.loading('提交中...',30,undefined,true);
        let custChangeFlag;
        let customer={};
        var tradeRenew = {}
        if(formValue.tradeRenew){
          let all = formValue.tradeRenew
          tradeRenew = {tradeRenew : {
              id: all.id,
              renewId: all.renewId,
              reserveId: all.reserveId,
              prodName: all.prodName,
              renewRatio: all.renewRatio === undefined ? 0 : all.renewRatio,
              reqAmt: all.reqAmt
            }}
        }

        if (location.state.basicData){
           custChangeFlag = formValue.select?{custChangeFlag: 'Y'}:{custChangeFlag: 'N'}
           customer = formValue.select?{customer: formValue.customer}:{}
        }
        if (location.state.basicData){
          let contractInfo = {};
          if(value.addiOrd)
            contractInfo = {contNo:formValue.contractCode};
          let data = location.state.basicData
          let saveValue = {
            // ordDate: value.ordDate.format('YYYY-MM-DD'),
            ordDates: value.ordDates,
            id: data.id,
            prodId:data.prodId,
            shrTypeId:data.shrTypeId,
            openDayId:data.openDayId,
            resvAmt:value.resvAmt,
            custId:data.custId,
            addiOrd:value.addiOrd==true?'Y':'N',
            addRenew:formValue.renew==true?'Y':'N',
            resvPeriod:data.resvPeriod,
            remark: value.remark,
            ...customer,
            orderContNo:location.state.basicData.orderContNo,
            ...custChangeFlag,
            ...contractInfo,
            ...tradeRenew
          };
          console.log('🔥', saveValue)
          this.setState({
            ifSubmit: true
          })
          dispatch({
            type:'xtProduct/submitUpdate',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                this.setState({submitClickNum:0});
                Toast.hide();
                if(data&&data.code==='00')
                  dispatch(routerRedux.push({pathname:'/optionSuccess',state:{successTitle:'预约申请已受理，请等待系统确认！',backTitle:'返回产品主页',
                      backMethord:()=>{
                        dispatch(routerRedux.push('/otherProduct'));
                      }
                    }}));
                else {
                  this.setState({
                    ifSubmit: false
                  })
                  Toast.fail(data&&data.message?data.message:'提交错误!',3);
                }
              }
            }
          });
        }else {
          let contractInfo = {};
          if(value.addiOrd==true)
            contractInfo = {contractCode:formValue.contractCode,orderContNo:formValue.orderContNo};
          let saveValue = {
            ...value,
            openDayId: xtProduct.touchItem.openDayId,
            // ordDate: value.ordDate.format('YYYY-MM-DD'),
            ordDates: value.ordDates,
            customer:formValue.customer,
            addiOrd:value.addiOrd==true?'Y':'N',
            addRenew:formValue.renew==true?'Y':'N',
            resvPeriod:xtProduct.touchItem.resvPeriod,
            ...contractInfo,
            ...tradeRenew
          };
          console.log('🔥', saveValue)
          this.setState({
            ifSubmit: true
          })
          dispatch({
            type:'xtProduct/XTProductOrder',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                this.setState({submitClickNum:0});
                Toast.hide();
                if(data&&data.code==='00')
                  dispatch(routerRedux.push({pathname:'/optionSuccess',state:{successTitle:'预约申请已受理，请等待系统确认！',backTitle:'返回产品主页',
                      backMethord:()=>{
                        dispatch(routerRedux.push('/otherProduct'));
                      }
                    }}));
                // dispatch(routerRedux.push({pathname:'/optionSuccess',state:{
                // 	backMethord:()=>{
                // 		dispatch(routerRedux.push('/productMain'));
                // 	}
                // }}));
                else {
                  this.setState({
                    ifSubmit: false
                  })
                  Toast.fail(data&&data.message?data.message:'提交错误!',3);
                }
              }
            }
          });
        }
      }
      else {
        if(value.ordDates === ''){
          this.setState({submitClickNum:0});
          Toast.fail('请选择欲打款日期!',1);
        }else {
          this.setState({submitClickNum:0});
          Toast.fail('输入参数中存在错误!',1);
        }
      }
    });
  }

	render(){
		let {dispatch,form,formStorage,location,xtProduct} = this.props;
    let {formValue} = formStorage;
    if (formValue&&formValue.custName===undefined&&location.state.basicData){
      dispatch({
        type:'formStorage/fetchFormValue',
        payload:{
          custName:location.state.basicData.custName
        },
      });
    }
    if (formValue&&formValue.custName===undefined&&location.state.basicData){
      dispatch({
        type:'formStorage/fetchFormValue',
        payload:{
          addiOrd:location.state.basicData.addiOrd==='N'?false:true
        },
      });
    }
    // if (formValue&&formValue.ordDate===undefined&&location.state.basicData){
    //   dispatch({
    //     type:'formStorage/fetchFormValue',
    //     payload:{
    //       ordDate:location.state.basicData.ordDate
    //     }
    //   });
    // }


		return(
			<div style={{height:'100%'}}>
			 <header>
				 <div>
	 				<header className={styles.total}>
	 					<div className={styles.cancel} onClick={this.toBack.bind(this)}><span>取消</span></div>
	 					<div className={styles.appoint}><span>私募产品预约</span></div>
	 					<div className={styles.submit} style={{pointerEvents: this.state.ifSubmit ? 'none' : 'auto', color: this.state.ifSubmit ? 'gray' : '#f22f33'}} onClick={()=>{
                // this.changeableSubmit();
              this.beforeSubmit()
					}}><span>提交</span></div>
	 				</header>
	 			</div>
			 </header>
			 <section className={styles.container}>
				 <AppointList
				 			form={form}
							formValue={formValue}
							dispatch={dispatch}
							xtProduct={xtProduct}
							onChangeMethord={this.onChangeMethord.bind(this)}
							saveFormMethord={this.saveFormMethord.bind(this)}
							topData={location.state.data}
              topLocation={location.state.location}
         />
         {
           xtProduct.touchItem&&xtProduct.touchItem.earnType =='2' ?
             <List renderHeader={() => '股权类产品风险揭示'}>
               {this.state.notifyInfo.map(i => (
                 <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                   {i.label}
                 </CheckboxItem>
               ))}
             </List> : ''
         }

				</section>
				{this.state.show?this.ShowAlert():<i/> }
        {this.state.ifAlert?this.ShowAlertSec():<i/> }
        {this.state.commAlert?this.ShowAlertThird():<i/> }
				 {/*<div style={{width: '100%',height: '9.33rem',backgroundColor: '#efeff4'}}></div>*/}
			</div>
		);
	}
    componentDidMount() {
	  let {dispatch,location,formStorage,xtProduct} = this.props;
      let {formValue} = formStorage;
      dispatch({
        type: 'xtProduct/getWillOrderDate',
        payload: {
          params:location.state.data.productDetail,
          backMethord(data){
            console.log(data,'返回数据====》')
            if(formValue.renew){
              let workDay = Number(data[0].id) + 1
              dispatch({
                type: 'xtProduct/fetch',
                payload: {
                  willOrderData:[
                    {   id: workDay,
                      name: `${workDay}个工作日内`,
                      text: `${workDay}个工作日内`,
                      value: workDay
                    },
                    ...data
                  ]
                }
              })
            }
          }
        },

      })
    }
}

function onFieldsChange(props, changedFields)
{
	let {dispatch} = props;
	if(changedFields.resvAmt)
	{
		let resvAmtTF = changedFields.resvAmt;
		dispatch({
			type:'formStorage/fetchFormValue',
			payload:{
				resvAmt:resvAmtTF.value
			},
		});
	}
}

function connectProductFunc({xtProduct,formStorage})
{
  return {xtProduct,formStorage};
}
export default connect(connectProductFunc)(createForm({onFieldsChange:onFieldsChange})(Appoint));
