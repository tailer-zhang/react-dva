import React, {Component} from 'react';
import { browserHistory,routerRedux } from 'dva/router';
import { Tabs,List, InputItem,WhiteSpace,DatePicker,TextareaItem } from 'antd-mobile';
import styles from '../../styles/trade/tradeEnterTabs.less';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Form from '../../utils/form';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2118-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1990-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const TabPane = Tabs.TabPane;
const Item = List.Item
export default class TradeEnterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: zhNow,
      dpValue: null,
      visible: false,
    }
  }
  componentDidMount()
  {
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }
  getOption1() {
    let {formValue,dispatch} = this.props;
    console.log('formValueXXXXX',formValue)
    return({
      space1:{valueType:'whiteSpace'},
      contNo: {
        required:true,
        type: 'text',
        desc:'合同编号'
      },
      space2:{valueType:'whiteSpace'},
      prodId: {
        valueType:'selfSelect',
        title:'产品名称',
        desc:'产品名称',
        extra:formValue.prodIdDesc?formValue.prodIdDesc:formValue.prodName,
        onClick:()=>{
          // 如果已经选择份额类别再重新选择产品清空份额类别重新选择
          if (formValue.kpiId) {
            formValue.kpiId = null;
            formValue.kpiIdDesc = null;
            formValue.kpiName = null;
          }
          dispatch(routerRedux.push({
            pathname: '/tradeProduct',
            state: {
              params: {},
              selectValue: formValue.prodId,
              formValue: formValue,
            }
          }));
        }
      },
      kpiId: {
        required:true,
        valueType:'selfSelect',
        title:'产品类别',
        desc:'产品类别',
        extra:formValue.kpiIdDesc?formValue.kpiIdDesc:formValue.kpiId?formValue.kpiName:'*',
        onClick:()=>{
          console.log('formValue5?',formValue)
          if (formValue.prodId==undefined) Toast.fail('请先选择产品名称!',2);
          else dispatch(routerRedux.push({
            pathname:'/tradeProduct',
            state: {
              params: {prodId: formValue.prodId},
              selectValue: formValue.kpiId,
              mode: 'productType',
              formValue: formValue
            }
          }));
        }
      },
      space3:{valueType:'whiteSpace'},
      custId: {
        required:true,
        valueType:'selfSelect',
        title:'投保人',
        desc:'投保人',
        extra:formValue.custNameDesc?formValue.custNameDesc:formValue.custName,
        onClick:()=>{
          dispatch(routerRedux.push({
            pathname:'/tradeProduct',
            state: {
              params: {reserveRank: '3'},   //
              selectValue: formValue.custId,
              mode: 'people',
              modify: 'true',
              formValue: formValue
            }
          }));
        }
      },
      insurePerson: {
        required:false,
        type: 'text',
        desc:'被保人'
      },
      beneficiaries: {
        required:false,
        type: 'text',
        desc:'受益人'
      },
    })
  }

  getOption2() {
    return({
      payTerm: {
        required:true,
        type: 'text',
        desc:'缴费期限',
        trigger:'onBlur',
        validatorType:'integer',
        errMsg:'请输入数字!',
      },
      payCurType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('payCurType'),
        title:'缴费币种',
        desc:'缴费币种'
      },
      premiumYear: {
        required:true,
        type: 'text',
        desc:'年缴保费',
        trigger:'onBlur',
        validatorType:'float',
        errMsg:'请输入数字!',
      },
      premium: {
        required:false,
        type: 'text',
        desc:'保额',
        trigger:'onBlur',
        validatorType:'integer',
        errMsg:'请输入数字!',
      },
      space1:{valueType:'whiteSpace'},
      effectDate: {
        valueType:'date',
        desc:'保单生效日',
        title:'选择日期',
        mode:'date',
        extra:'请输入签单日期',
        minDate:minDate,
        maxDate:maxDate,
      },
      insureStat: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('tradeSafeFilter1'),
        title:'保单状态',
        desc:'保单状态',
        disabled:true
      },
      space2:{valueType:'whiteSpace'},
      remark: {
        required:false,
        type: 'text',
        desc:'备注'
      },
      space3:{valueType:'whiteSpace'},
      space4:{valueType:'whiteSpace'},
    })
  }

  render() {
    const {dispatch,location,recordList,defaultActiveKey,onChangeMethord,
      saveFormMethord,form,formValue} = this.props;
    const { getFieldProps } = this.props.form;

    let activeKey = defaultActiveKey;
    if(activeKey==undefined)
     activeKey = '1';

    return (
      <div onChange={(activeKey)=>{
        dispatch({type: 'formStorage/fetch',payload: {activeKey:activeKey}})
      }}>
      <WhiteSpace size="md" style={{backgroundColor: '#efeff4'}} />
        <Tabs defaultActiveKey={activeKey} swipeable={false} onChange={(activeKey)=>dispatch({type:'formStorage/fetch',payload:{activeKey:activeKey}})}>
          <TabPane tab="合同详情" key="1">
            <div>
              <List>
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
                <div className={styles.medium}>多个受益人用“,”隔开</div>
                <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} saveFormMethord={saveFormMethord}/>
              </List>
            </div>
          </TabPane>
          <TabPane tab="缴费记录" key="2">
            <div>
            {
              recordList.map((item,index)=>{
                return (
                  <div className={styles.total} key={index} onClick={(e)=>{
                    //   e.preventDefault();
                    dispatch(routerRedux.push({
                      pathname: '/tradePayRecord',
                      state: {
                        index: index,
                        recordDetail:item,
                        mode: 'modify',
                        tradePayPic:item.fileList,
                      }
                    }))
                  }}>
                    <WhiteSpace size="lg" style={{background: '#efeff4'}}/>
                    <WhiteSpace size="md" style={{background: '#efeff4'}}/>
                    <h5 className={styles.date}>{item.payDate}</h5>
                      <WhiteSpace size="md" style={{background: '#efeff4'}}/>
                    <div className={styles.content}>
                      <div className={styles.wrap}>
                        <div className={styles.left}>
                          <h3 className={styles.dolar}>{item.payAmt}<span></span></h3>
                          <em className={styles.deal}>交易金额({Dic.fetchDicValue('payCurType',item.payCurType)})</em>
                        </div>
                        <div className={styles.right}>
                          {/*
                          <h3 className={styles.rmb}>{item.payAmtRmb}<span>万</span></h3>
                          <em>折合人民币</em>
                          <img src={require('../../image/icon/arrow_r.png')} />
                            */}
                        </div>
                      </div>
                      <p className={styles.remark}>备注: {item.remark}</p>
                    </div>
                  </div>
                )
              })
            }
              <WhiteSpace  style={{background: '#efeff4',height: '0.56rem'}}/>
              <p className={styles.payRecord}
              onClick={(e)=>{
                //   e.preventDefault();
                dispatch(routerRedux.push({
                  pathname: '/tradePayRecord',
                  state:{}
                }))
              }}>添加缴费记录</p>
              <WhiteSpace  style={{background: '#efeff4',height: '2.8534rem'}}/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

TradeEnterTabs = createForm()(TradeEnterTabs);
