import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { Tabs, WhiteSpace,List, WingBlank,Toast } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import Form from '../../utils/form';
import styles from '../../styles/trade/tradeEnterTabs.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2118-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1990-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const TabPane = Tabs.TabPane;
const Item = List.Item;

class TradeEnterTabs extends React.Component{
  constructor() {
    super();
  }

  getOption1() {
    let {dispatch,formValue} = this.props;
    return({
      contNo: {
        required:true,
        type: 'text',
        desc:'合同编号'
      },
      space1:{valueType:'whiteSpace'},
      prodId: {
        required:true,
        valueType:'selfSelect',
        title:'产品名称',
        desc:'产品名称',
        extra:formValue.prodId?formValue.prodIdDesc:'*',
        otherProps:{
          error:!formValue.prodId,
        },
        onClick:()=>{
          // 如果已经选择份额类别再重新选择产品清空份额类别重新选择
          if (formValue.kpiId) {
            formValue.kpiId = null;
            formValue.kpiIdDesc = null;
          }

          dispatch(routerRedux.push({
            pathname: '/tradeProduct',
            state: {
              params: {},
              selectValue: formValue.prodId,
              formValue: formValue
            }
          }));
        }
      },
      kpiId: {
        required:true,
        valueType:'selfSelect',
        title:'产品类别',
        desc:'产品类别',
        extra:formValue.kpiId?formValue.kpiIdDesc:'*',
        onClick:()=>{
          if (formValue.prodId==undefined) Toast.fail('请先选择产品名称!',2);
          else dispatch(routerRedux.push({
            pathname:'/tradeProduct',
            state: {
              params: {prodId: formValue.prodId,},
              selectValue: formValue.kpiId,
              mode: 'productType',
              formValue: formValue
            }
          }));
        },
        otherProps:{
          error:!formValue.kpiId,
        },
      },
      space2:{valueType:'whiteSpace'},
      custName: {
        required:true,
        valueType:'selfSelect',
        title:'投保人',
        desc:'投保人',
        extra:formValue.custNameDesc?formValue.custNameDesc:'*',
        onClick:()=>{
          dispatch(routerRedux.push({
            pathname:'/tradeProduct',
            state: {
              params: {reserveRank: '2'},
              selectValue: formValue.custName,
              mode: 'people',
              formValue: formValue
            }
          }));
        },
        otherProps:{
          error:!formValue.custNameDesc,
        },
      },
      insurePerson: {
        required:true,
        type: 'text',
        desc:'被保人',
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
     /* payTerm: {
        required:false,
        type: 'text',
        desc:'缴费期限(年)',
        trigger:'onBlur',
        validatorType:'integer',
        errMsg:'请输入数字!',
      },*/
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
      space3:{valueType:'whiteSpace'},
      effectDate: {
        required:true,
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
      space4:{valueType:'whiteSpace'},
      remark: {
        required:false,
        type: 'text',
        desc:'备注'
      },
      space5:{valueType:'whiteSpace'},
      space6:{valueType:'whiteSpace'},
    })
  }

  render() {
    const {dispatch,location,defaultActiveKey,onChangeMethord,saveFormMethord,form,formValue,list} = this.props;
    const { getFieldProps } = this.props.form;
    console.log('formValue--list-',formValue,list);
    let recordList = list;
    if (recordList==undefined) recordList = [];

    let key = defaultActiveKey;
    if(key==undefined)
     key = '1';

    return (
      <div className={styles.boxScroll}>
        <Tabs defaultActiveKey={key} swipeable={false} onChange={(activeKey)=>{
          dispatch({type: 'formStorage/fetch',payload: {activeKey: activeKey}})
        }}>
         <TabPane tab="合同详情" key="1" >
          <WhiteSpace style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
           <List>
            <Form options={this.getOption1()} dispatch={dispatch} form={form} formValue={formValue} onChangeMethord={onChangeMethord} />
            <div className={styles.medium}>多个受益人用“,”隔开</div>
            <Form options={this.getOption2()} dispatch={dispatch} form={form} formValue={formValue} onChangeMethord={onChangeMethord} />
           </List>
         </TabPane>
         <TabPane tab="缴费记录" key="2">
           <div>
             {
               recordList.map((item,index)=>{
                 return (
                   <div className={styles.total} key={index} onClick={(e)=>{
                    //    e.preventDefault();
                       saveFormMethord();
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
                         {
                           item.payAmtRmb?<div className={styles.right}>
                             <h3 className={styles.rmb}>{item.payAmtRmb}<span>万</span></h3>
                             <em>折合人民币</em>
                             <img src={require('../../image/icon/arrow_r.png')} />
                           </div>:<div />
                         }
                       </div>
                       <div className={styles.remark}>
                         <p>备注:</p>
                         <p>{item.remark}</p>
                       </div>
                     </div>
                   </div>
                 )
               })
             }
             <WhiteSpace  style={{background: '#efeff4',height: '0.56rem'}}/>
             <p className={styles.payRecord}
             onClick={(e)=>{
                //  e.preventDefault();
                 saveFormMethord();
               dispatch(routerRedux.push({
                 pathname: '/tradePayRecord',
                 state:{}
               }))
             }}>添加缴费记录</p>
             <WhiteSpace style={{background: '#efeff4',height: '2.8534rem'}}/>
           </div>
         </TabPane>
        </Tabs>
      </div>
    )
  }
}


export default TradeEnterTabs;
