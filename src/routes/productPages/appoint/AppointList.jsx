import React from 'react';
import { List,Toast,Button , Checkbox} from 'antd-mobile';
import {Link,routerRedux} from 'dva/router';
import styles from '../../../styles/product/AppointList.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Dic from '../../../utils/dictionary';
import Form from '../../../utils/form';
import {fetchDicValue} from '../../../utils/dictionary';
import {convertCurrency,formatDate} from '../../../utils/formatUtils';
import styles1 from '../../../styles/product/AppointFirst.less';
const CheckboxItem = Checkbox.CheckboxItem;
let notify =[] ;
export default class AppointList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      showAlert: false,
		}
	}

	switchOnChange(key,value)
  {
    let {dispatch,formValue} = this.props;
    let payload  = {};
    payload[key] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });

  }
  changeOrderDatePick(val) {
      let {dispatch,xtProduct,topData} = this.props;
      let workDay = Number(xtProduct.willOrderData[0].id) + 1;
      if(val){
          dispatch({
              type: 'xtProduct/fetch',
              payload: {
                  willOrderData:[
                      {   id: workDay,
                          name: `${workDay}个工作日内`,
                          text: `${workDay}个工作日内`,
                          value: workDay
                      },
                      ...xtProduct.willOrderData
                  ]
              }
          })
      }else {
          dispatch({
              type: 'xtProduct/getWillOrderDate',
              payload: {
                  params: topData.productDetail
              }
          })
      }
  }

	getOptions(){
		let recommendOptions = {}, addiOrdTemp ={}, renew = {},deadline = {},willOrderDatePick ={};
		let {formValue,form,onChangeMethord,dispatch,xtProduct,topData} = this.props;
	    xtProduct.willOrderData.forEach((item)=>{
            willOrderDatePick[item.value] = item.text;
        })

    let datePara = formatDate(new Date(), 'yyyy-MM-dd')+' +0800';
    let tradeCode, custLvl, prodId, id, custId,minDate,maxDate,openDayId;
    minDate = !xtProduct.judgeStartDate? moment(datePara, 'YYYY-MM-DD Z').add(-1,'month').startOf('month').utcOffset(8):moment(xtProduct.judgeStartDate, 'YYYY-MM-DD Z').utcOffset(8);
    maxDate = !xtProduct.judgeEndDate? moment(datePara, 'YYYY-MM-DD Z').add(1,'month').startOf('month').utcOffset(8):moment(xtProduct.judgeEndDate, 'YYYY-MM-DD Z').utcOffset(8);
    if (topData.basicData){
      tradeCode = topData.basicData.tradCode;
      custLvl = topData.basicData.custGradeLvl;
      prodId = topData.basicData.prodId;
      id = topData.basicData.id;
      custId= topData.basicData.custId;
      openDayId = topData.basicData.openDayId
    }else {
      tradeCode = topData.touchItem.tradCode;
      custLvl = topData.touchItem.custGradeLvl;
      prodId = topData.typeDetail.prodId;
      id = topData.typeDetail.id;
      custId = formValue.custID;
      openDayId = topData.touchItem.openDayId
    }
    if(topData.basicData){
      renew = {}
    }else {
      renew = {
        renew:{
          required:true,valueType:'switch',desc:'是否续签',
          justifyTrueValue:true,onChangeMethord:(value)=>{
            if(formValue.custNo){
              this.switchOnChange('renew',value)
                this.changeOrderDatePick(value)
            }else {
              Toast.show('请先选择会员', 2)
            }
          }
        }
      }
    }

    if(formValue.renew){
      deadline = {
        dealDeadline:
          {required:false,
            valueType:'selfSelect',
            title:'到期交易',
            desc:'到期交易',
            extra:formValue.tradeRenew?formValue.tradeRenew.prodName + '|' + formValue.tradeRenew.endDate  + '|' + formValue.tradeRenew.reqAmt + '|' + formValue.tradeRenew.renewRatio + '%':topData.basicData?topData.basicData.custName:'',
            onClick:()=>{
              dispatch({
                type:'formStorage/fetchFormValue',
                payload:form.getFieldsValue()
              });
              dispatch(routerRedux.push({pathname:'/dealList',state:{
                  mode:'deallist',
                  withOutGoBack:true,
                  // selected:{
                  //   id:id
                  // },
                  custNo: formValue.custNo,
                  filter:{
                    reserveRank:custLvl
                  },
                  selectResult:(rowData)=>{
                    dispatch({
                      type:'formStorage/fetchFormValue',
                      payload:{
                        // custName:rowData.custName,
                        // custID:rowData.custNo,
                        // customer:rowData,
                        // select: true
                        tradeRenew: rowData
                      }
                    });
                    dispatch({
                      type:'xtProduct/checkCustomerIsCommon',
                      payload:{
                        params:{
                          custCode:rowData.custNo,
                          prodId:prodId
                        },
                        backMethord:(data)=>{
                          Toast.hide();
                          if(data&&data.code=='00'&&data.model){
                            dispatch({
                              type:'formStorage/fetchFormValue',
                              payload:{
                                inveType:data.model
                              }
                            });
                          }
                          else dispatch({
                            type:'formStorage/fetchFormValue',
                            payload:{
                              inveType:''
                            }
                          });
                          dispatch(routerRedux.goBack());
                        }
                      }
                    });
                  }
                }}));
            }},
      }
    }
		if(tradeCode === '0022' || tradeCode === '0020') {
      addiOrdTemp = {
        addiOrd:{
        required:true,valueType:'switch',desc:'追加资金',
        justifyTrueValue:true,onChangeMethord:(value)=>this.switchOnChange('addiOrd',value)}
      };
      if(formValue.addiOrd==true||(topData.basicData&&topData.basicData.addiOrd==='Y'))
        recommendOptions = {
          contractCode:{required:false,
            valueType:'selfSelect',
            title:'合同号选择',
            desc:'追加合同号',
            extra:formValue.contractCode?formValue.contractCode:topData.basicData?topData.basicData.contNo:undefined,
            onClick:()=>{
              dispatch({
                type:'formStorage/fetchFormValue',
                payload:form.getFieldsValue()
              });
              dispatch(routerRedux.push({pathname:'/contractNoSelect',state:{
                param:{
                  prodId: prodId,
                  shrTypeId: id,
                  custId:custId,
                  openDayId:openDayId
                },
                selectCode:formValue.contractCode?formValue.contractCode:topData.basicData?topData.basicData.contNo:undefined,
                selectResult:(rowData)=>{
                  dispatch({
                    type:'formStorage/fetchFormValue',
                    payload:{
                      contractCode:rowData.contNo,
											orderContNo:rowData.orderContNo,
                      addiOrd:true
                    }
                  });
                }
              }}));
            }},
          addiOrdDiv:{
            valueType:'selfDiv',
            value:<div key={'addiOrdDiv'} className={styles.secAlert}>{Dic.fetchDicValue('addiOrdType',1)}</div>
          },
        };
    }


		return ({
			resvAmt:{
				required:true,
				type:'number',
				trigger:'onBlur',
				errMsg:'预约金额非法!',
				desc:'预约金额(元)',
        extra:formValue.resvAmt?formValue.resvAmt:topData.basicData?topData.basicData.resvAmt:undefined
			},
			amtMark:{
        valueType:'selfSelect',
        desc:'大写金额',
        extra:convertCurrency(formValue.resvAmt?formValue.resvAmt:topData.basicData?topData.basicData.resvAmt:undefined)?convertCurrency(formValue.resvAmt?formValue.resvAmt:topData.basicData?topData.basicData.resvAmt:undefined):'金额超过限制',
        arrow:'empty'
      },
			custName:{required:false,
								valueType:'selfSelect',
								title:'会员名称',
								desc:'会员名称',
								extra:formValue.custName?formValue.custName:topData.basicData?topData.basicData.custName:'',
								onClick:()=>{
                  if (topData.basicData){
                  }else {
                    let custLvl1 = topData.touchItem.custGradeLvl;
                    console.log('custLvl2&&&&&&&',custLvl1)
                    if((custLvl1 != 0 && !custLvl1) || custLvl1 == ''){
                      this.setState({
                        showAlert: true
                      })
                      return
                    }
                  }
									dispatch({
										type:'formStorage/fetchFormValue',
										payload:form.getFieldsValue()
									});
									dispatch(routerRedux.push({pathname:'/typeToSelectCustomer',state:{
											mode:'selectCustomer',
											withOutGoBack:true,
											selectCustomer:{
												custID:custId
											},
											filter:{
												reserveRank:custLvl
											},
											selectResult:(rowData)=>{
												dispatch({
													type:'formStorage/fetchFormValue',
													payload:{
														custName:rowData.custName,
														custID:rowData.custNo,
														customer:rowData,
                            select: true,
                            custNo: rowData.custNo
													}
												});
												Toast.loading('查询中',30);
												dispatch({
													type:'xtProduct/checkCustomerIsCommon',
													payload:{
														params:{
															custCode:rowData.custNo,
															prodId:prodId
														},
														backMethord:(data)=>{
															Toast.hide();
															if(data&&data.code=='00'){
															  if(data.model){
                                  dispatch({
                                    type:'formStorage/fetchFormValue',
                                    payload:{
                                      inveType:data.model
                                    }
                                  });
                                }else{
                                  dispatch({
                                    type:'formStorage/fetchFormValue',
                                    payload:{
                                      inveType:''
                                    }
                                  });
                                }
															  if(data.hmac==1){
                                  dispatch({
                                    type:'formStorage/fetchFormValue',
                                    payload:{
                                      inveNew:data.hmac
                                    }
                                  });
                                }else{
                                  dispatch({
                                    type:'formStorage/fetchFormValue',
                                    payload:{
                                      inveNew:''
                                    }
                                  });
                                }
                              }
															/*if(data&&data.code=='00'&&data.model){
																dispatch({
																	type:'formStorage/fetchFormValue',
																	payload:{
																		inveType:data.model
																	}
																});
															}
															else dispatch({
																type:'formStorage/fetchFormValue',
																payload:{
																	inveType:''
																}
															});
                              if(data&&data.code=='00'&&data.hmac){
                                dispatch({
                                  type:'formStorage/fetchFormValue',
                                  payload:{
                                    inveNew:data.hmac
                                  }
                                });
                              }
                              else dispatch({
                                type:'formStorage/fetchFormValue',
                                payload:{
                                  inveNew:''
                                }
                              });*/
															dispatch(routerRedux.goBack());
														}
													}
												});
										}
									}}));
								}},
			selfDiv:{
				valueType:'selfDiv',
				value:<div key={'selfDiv'} className={styles.secAlert}>{Dic.fetchDicValue('inveType',formValue.inveType)}</div>
			},
      investDiv:{
        valueType:'selfDiv',
        value:<div key={'investDiv'} className={styles.secAlert}>{Dic.fetchDicValue('inveNew',formValue.inveNew)}</div>
      },
            ordDates: {
                type: willOrderDatePick,
                required:true,
                valueType:'select',
                desc: '预计打款日期',
                title: '预计打款日期',
            },

/*			ordDate:{
			  // valueType:'date',
        // desc:'预计打款日期',
        // title:'选择日期',
        // mode:'date',
        // extra:topData.basicData?topData.basicData.ordDate:'可选,小于结束日期',
        // minDate:minDate,
        // maxDate:maxDate
        required:true,
        valueType:'date',
        desc:'预计打款日期',
        title:'选择日期',
        mode:'date',
        errMsg:'请选择预计打款日期!',
        extra:topData.basicData?topData.basicData.ordDate:'选择打款日期',
        minDate:minDate,
        maxDate:maxDate
      },*/
      ...addiOrdTemp,
      ...recommendOptions,
      ...renew,
      ...deadline,
			remark:{required:false,type:'text',trigger:'onBlur',desc:'备注',extra:formValue.remark?formValue.remark:topData.basicData?topData.basicData.remark:undefined,otherProps:{
        onChange:(value)=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:{
              remark:value
            }
          });
        }
      }},
		});
	}

  showJumpAlert=()=>{
    return(
      <div className={styles1.showAlert}>
        <div className={styles1.infor}>
          <p>信息</p>
          <p>参数为空，需跳转到首页重新预约</p>
          <div onClick={this.confirm}>
            <Button>确定</Button>
          </div>
        </div>
      </div>
    );
  }

  confirm=()=>{
    let {dispatch} = this.props;
    dispatch(routerRedux.go(-3));
	  this.setState({
      showAlert: false
    })
	}

	render(){
		let {dispatch,onChangeMethord,saveFormMethord,form,formValue,topData,topLocation} = this.props;
    let productName, tradeCode, shrType, useableAmt, commUseableAmt,onlineSignName;
    let endTipFlag = topLocation.state.endTipFlag
    let reserveEndDate = topLocation.state.reserveEndDate
    // let endTipFlag = '1'
    let reserveEndYear,reserveEndMonth,reserveEndDay
    if(reserveEndDate){
        reserveEndYear = reserveEndDate.slice(0,4)|| '--'
        reserveEndMonth = reserveEndDate.slice(5,7)|| '--'
        reserveEndDay = reserveEndDate.slice(8,10)|| '--'
    }
    if (topData.basicData){
       productName = topData.basicData.prodName;
       tradeCode = topData.basicData.tradCode;
       shrType = topData.basicData.shrType;
       useableAmt = topData.basicData.useableAmt!== undefined  ? parseFloat((topData.basicData.useableAmt / 10000).toFixed(2)) : '--';
       commUseableAmt = topData.basicData.commUseableAmt!== undefined  ? topData.basicData.commUseableAmt : '--';
       onlineSignName = topData.basicData.onlineSignName;
    }else {
      productName = topData.productDetail.prodName;
      tradeCode = topData.touchItem.tradCode;
      shrType = topData.typeDetail.shrType;
      useableAmt = topData.touchItem.useableAmt!== undefined  ? parseFloat((topData.touchItem.useableAmt / 10000).toFixed(2)) : '--';
      commUseableAmt = topData.touchItem.commUseableAmt!== undefined  ? topData.touchItem.commUseableAmt : '--';
      onlineSignName = topData.touchItem.onlineSignName;

    }
		return(
			<div>
				<header className={styles.total}>
					<div className={styles.card}>
						<p className={styles.product}><span>产品名称</span><em>{productName}</em></p>
						<p className={styles.deal}><span>交易类型</span><em>{fetchDicValue('tradCode',tradeCode)}</em></p>
						<p className={styles.deal}><span>份额类别</span><em>{shrType}</em></p>
            <p className={styles.deal}><span>支持线上签署</span><em>{onlineSignName}</em></p>
						<p className={styles.deal}><span>产品可用额度(万)</span><em>{useableAmt}</em></p>
						{/*<p className={styles.deal}><span>系列可用额度(万)</span><em>{commUseableAmt}</em></p>*/}
					</div>
				</header>
        {endTipFlag === '1' ? <div className={styles.secAlert}>该产品将于{reserveEndYear}年{reserveEndMonth}月{reserveEndDay}日募集结束，烦请于募集结束日前完成打款并录入系统，募集结束日后进账资金视为无效资金</div> :<div></div>}

				<div>
					<List>
						<Form
								options={this.getOptions()}
								dispatch={dispatch}
								form={form}
								onChangeMethord={onChangeMethord}
								formValue={formValue}/>
					</List>
				</div>
        {this.state.showAlert?this.showJumpAlert():<i/> }
			</div>
		);
	}
}
