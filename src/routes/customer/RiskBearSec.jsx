//风险测评 年龄选择
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Toast,Checkbox,List,Flex} from 'antd-mobile';
import Titles from '../../components/product/Titles';
import ToBackImg from '../../components/product/ToBackImg';
import RiskQuestion from '../../components/share/RiskQuestion';
import SecRadio from '../../components/share/SecRadio';

import riskBearStylkes from '../../styles/customer/riskBear.less';
import {Link,routerRedux} from 'dva/router';


class RiskBearSec extends React.Component{
  constructor() {
    super();
    this.state={
      index: 0,
      list: [],
      num: '',
      repeat: false,
      last: 1,
      value: 0,
      hobbyStr: '',
    }
  }

  indexAdd(subscript) {

    if(subscript>=this.state.num) {
      subscript -= 1;
    }
    setTimeout(()=>{this.setState({   //设置延时显示点中效果
      index: subscript
    })},20)

  }

  setRepeat() {
    this.setState({
      repeat: false
    })
  }

  listPush(arr) {
    let index = this.state.index;

    if(index==this.state.num-1) { //当为最后一题时；第一次点击会push进入list
      this.state.list.push(arr);
      console.log('aaaaaaaaa');
      this.setState({
        list: this.state.list,
        last: index==this.state.num-1?this.state.last+1:1
      })
      if(this.state.last>=2) {  //当大于二次点击时会先push再删除前一个选择
      console.log('sssssssss');
        this.state.list.splice(index-1,1);
        this.setState({
          list: this.state.list,
        });
      }
    }
    //else if(this.state.repeat) { //当点击上一题后会先删后加
    //  this.state.list.splice(index,0,arr);
    //}
    else{                      //理想状态下的点击
      this.state.list.push(arr);
      console.log('bbbbb');
      this.setState({
        list: this.state.list,
      })
    }
  }

  onChange(item) {

    let {hobbyStr} = this.state;
    let reg = new RegExp(item.dictId);
    let isFalse = reg.test(hobbyStr);
    console.log('/item.dictId/g',reg.test(hobbyStr));
    if(isFalse) {
      hobbyStr = hobbyStr.replace(reg,'');
    }
    else {
      if(hobbyStr) {
        hobbyStr += ',';
        hobbyStr += item.dictId;
      } else{
        hobbyStr += item.dictId;
      }
    }
    if(/^\,+$/.test(hobbyStr)) hobbyStr = hobbyStr.replace(/^\,+$/,'');
    console.log('hobbyStr----',hobbyStr);
    this.setState({
      hobbyStr: hobbyStr,
    });
  }

  render() {

    const {header,dispatch,customer,location} = this.props;
    let {custID} = location.state;
    let dataSource  = customer.riskInquireObj;
    if (dataSource == undefined) dataSource = [];
    let data = dataSource.questionlist;
    if(data==undefined) data = [];
    this.state.num = data.length;

    let dataList = dataSource.productList;
    if(dataList==undefined) dataList==[];

    let value = this.state.value;

    const  butonText={
       prev:'上一题',
       submit:'提交',
    };
    const TitleProp = {title:'风险承受能力评估'};

    const AgreeItem = Checkbox.AgreeItem;

    return (
      <div>
          <Titles {...TitleProp}>
            <ToBackImg/>
          </Titles>
          <div>
            <p className={riskBearStylkes.pFull}></p>
            <RiskQuestion data = {data} index = {this.state.index} />
            <SecRadio data = {data}
             index = {this.state.index}
             indexAdd={this.indexAdd.bind(this)}
             listPush={this.listPush.bind(this)}
            />
            <p className={riskBearStylkes.prev} onClick={()=>{
              this.setState({index: this.state.index-1===-1?0:this.state.index-1})
            }}>
              <span className={riskBearStylkes.boxSpan} onClick={() => {
                this.setState({        //点击上一题repeat变为true,last变为1
                  repeat: true,
                  last: 1,
                });
                if(this.state.last>=2) this.state.list.splice(this.state.index,1);
                this.state.list.splice(this.state.index-1,1); //同时把对应上一题的选择项删除
              }}>
                {butonText.prev}
              </span>
            </p>
          </div>
          {
            this.state.index == this.state.num-1?
            <div>
              <div>
                <h5 className={riskBearStylkes.mapH5}>请选择产品爱好 (多选)</h5>
                <Flex style={{flexWrap: 'wrap',paddingBottom: '120px',overflow: 'auto'}} className={riskBearStylkes.flexMap}>
                  {
                    dataList.map((item,index)=>{
                      return(
                      <div key={index} style={{width: '4.6rem'}}>
                        <Flex.Item>
                          <AgreeItem onChange={this.onChange.bind(this,item)}>
                            <span className={riskBearStylkes.flexSpan}>{item.dictName}</span>
                          </AgreeItem >
                        </Flex.Item>
                      </div>
                      )
                    })
                  }
                </Flex>
              </div>
              <p className={riskBearStylkes.put} onClick={() => {
                console.log('sssssss',this.state.index);
                if(this.state.last<2) {
                  Toast.info('请选择完整!!!', 2);
                }
                else {
                  Toast.loading('提交中...',30,undefined,true);
                  dispatch({
                    type: 'customer/riskSubmit',
                    payload: {
                      params: {list: this.state.list,custID: custID,hobby: this.state.hobbyStr},
                      backMethord: (data)=>{
                        Toast.hide();
                        if(data&&data.code=='0') {
                          Toast.info('提交成功!!!', 2);
                          dispatch(routerRedux.goBack());
                        }
                        else Toast.fail(data&&data.msg?data.msg:'提交错误!',2);
                      }
                    }
                  });
                }
              }}>
                <span className={riskBearStylkes.boxSpan}>
                  {butonText.submit}
                </span>
              </p>
            </div>:''
          }

      </div>
    );
  }
}

//{
//  pathname: '/orgCusDetail',
//  state: {
//    detail: {rejectFlag: '1',busiID: custID},
//    hold: {certType: '0',custType: '1',certNo: '320502197612231018'}
//  }
//}

function connectCustomerFunc({customer})
{
  return {customer};
}

export default connect(connectCustomerFunc)(RiskBearSec);
