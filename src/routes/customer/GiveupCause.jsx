//放弃原因
import React, { Component,PropTypes } from 'react';
import Title from '../../components/product/Title';
import { List, Radio, Flex } from 'antd-mobile';

import proDetailStyles from '../../styles/product/ProductDetail.less';
import giveUpStyles from '../../styles/customer/giveUp.less';



const RadioItem = Radio.RadioItem;


const ViewSettingDic = {
  'black':{
      title:'拉黑原因',
      data:[
        { value: 0, label: '空号' },
        { value: 1, label: '停机' },
        { value: 2, label: '暂停服务'},
        { value: 3, label: '错号' },
        { value: 6, label: '其他' },
      ]
   },
  'giveUp':{
      title:'放弃原因',
      data:[
        { value: 0, label: '空号' },
        { value: 1, label: '停机' },
        { value: 2, label: '暂停服务' },
        { value: 3, label: '错号' },
        { value: 4, label: '无法接通' },
        { value: 5, label: '无购买意向' },
        { value: 6, label: '其他' },
      ]
   }
};

export default class GiveUp extends React.Component
{
  constructor()
  {
    super();
    this.state={
      value: 0,
    };
  }

  onChange(value) {
    console.log('checkbox');
    this.setState({
      value,
    });
  }

  render() {
    let {location} = this.props;
    const { value } = this.state;
    let ViewSetting = ViewSettingDic['giveUp'];
    if(location.query&&location.query.mode=='black' )
      ViewSetting = ViewSettingDic['black'];
    return (
      <div>
        <div className={giveUpStyles.giveUpheader}>
          <Title  {...ViewSetting}/>
        </div>
        <p className={giveUpStyles.pFull}></p>
        <div className={giveUpStyles.listInfo}>
          <List>
            {ViewSetting.data.map(i => (
              <RadioItem key={i.value} checked={value === i.value} onChange={this.onChange.bind(this,i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}
