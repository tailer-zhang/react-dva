import React,{Component} from 'react';
import Title from '../../components/product/Title';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
import { List, Radio, Flex } from 'antd-mobile';
import {Tool} from '../../utils/tools';

import proMarketStyles from '../../styles/product/MarketMonth.less';

const TradeRejectProduct = (props) => {
  let {mode} = props.location.state;
  let titleProps = {title: '产品名称'};
  if (mode=='productType') titleProps = {title: '产品类别'};
  if (mode=='people') titleProps = {title: '投保人'};

  return (
    <div>
      <Title {...titleProps}/>
			<SelectName {...props}/>
    </div>
  )
};

const RadioItem = Radio.RadioItem;
const SelectName = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },
  onChange(i,e) {
    // e.preventDefault();
    let {tradeForm,dispatch,location} = this.props;
    let {formValue,mode,modify} = location.state;
    console.log('modify',modify);
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
          custChangeFlag: modify?'Y':'',
          prodId: mode?formValue.prodId:i.id,  //i.id?i.id:formValue.prodId,
          prodIdDesc:i.prodAlia?i.prodAlia:formValue.prodIdDesc,
          kpiId: mode=='productType'?i.id:formValue.kpiId,   //?i.id:formValue.kpiId,
          kpiIdDesc: i.prodTypeName?i.prodTypeName:formValue.kpiIdDesc,
          // custIdDesc: i.custName?i.custName:formValue.custIdDesc,
          custNameDesc: i.custName?i.custName:formValue.custNameDesc,
          custCode: {
            mgrCode: Tool.getSessionUser().userId,
            custNo: i.custID?i.custID:(formValue.custCode==undefined?'':formValue.custCode.custNo),
            custType: i.custClass?(i.custClass=='01'?'1':'0'):(formValue.custCode==undefined?'':formValue.custCode.custType),
            custName: i.custName?i.custName:formValue.custNameDesc,
            certType: i.certType?i.certType:(formValue.custCode==undefined?'':formValue.custCode.certType),
            certNo: i.certCode?i.certCode:(formValue.custCode==undefined?'':formValue.custCode.certNo),
            sex: i.sex?i.sex.replace(/^0/,''):(formValue.custCode==undefined?'':formValue.custCode.sex),
            qualifiedFlg: i.isQualified?i.isQualified:(formValue.custCode==undefined?'':formValue.custCode.qualifiedFlg),
            qualBegDate: i.qualifierStartDate?i.qualifierStartDate:(formValue.custCode==undefined?'':formValue.custCode.qualBegDate),
            qualEndDate: i.qualifierOverDate?i.qualifierOverDate:(formValue.custCode==undefined?'':formValue.custCode.qualEndDate),
          }
      }
    });

    dispatch(routerRedux.goBack());

  },
  render() {
    let {dispatch,location,tradeSafe} = this.props;
    let {selectValue,mode,formValue} = location.state;
    let list = tradeSafe.tradeProNameList;
    if(mode == 'productType') list = tradeSafe.tradeProTypeList;
    if(mode == 'people') list = tradeSafe.tradeCustomerList;
    console.log('list',list);
    if(list == undefined) list = [];
    return (<div>
      <List>
        {list.map((item,index) => (
          <RadioItem key={index} checked={selectValue === item.id?item.id:item.custId}
            onTouchStart={(e)=>this.onChange(item,e)}>
           {
             mode=='productType'?item.prodTypeName:(mode=='people'?item.custName:item.prodAlia)
           }
          </RadioItem>
        ))}
      </List>
    </div>);
  },
});

function connectProduct({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectProduct)(TradeRejectProduct);
