//11客户分红查询 客户分红查询页
import React,{ Component , PropTypes } from 'react';
import Title from '../../components/product/Title';
import BankCard from '../../components/share/BankCard';
import TransList1 from '../../components/share/TransList1';
import { SearchBar,WhiteSpace,List,Tabs,Drawer,NavBar } from 'antd-mobile';

import gainStyles from '../../styles/customer/bankCard.less';


const UserGainFind = React.createClass({
  getInitialState() {
    return {
      open: false,
      position: 'left',
    };
  },
  onOpenChange(isOpen) {
    console.log(isOpen, arguments);
    this.setState({ open: !this.state.open });
  },
  render() {
    const sidebar = (<List>
      {[...Array(20).keys()].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >分类</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >分类{index}</List.Item>);
      })}
    </List>);

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    const TitleProp = {
      title:'客户分红查询',
      };
    const userInfo = {
      prodName:'产品名称',
      contractNum:'',
      transMoney:'1000.00',
      userName:'拉卡',
      tradeUnit:'分红份额(份)',
      userTitle:'客户名称'
    }

    return (
      <div >
        <div className={gainStyles.ccc}>
          <Title {...TitleProp}>
            <div className={gainStyles.right}>
                <img src={require('../../image/product/filter.png')} />
            </div>
          </Title>
        </div>
        <div className={gainStyles.bankCard}>
          <SearchBar placeholder="客户名称/产品名称"/>
          <WhiteSpace/>
          <div>
            <TransList1 {...userInfo}/>
            <WhiteSpace/>
            <TransList1 {...userInfo}/>
            <WhiteSpace/>
            <TransList1 {...userInfo}/>
          </div>
        </div>


      <div style={{ height: '100%'}}>
        <NavBar style={{
                      width:'100%',
                      position: 'fixed',
                      bottom: '0',
                      left: '0',}}>基本</NavBar>
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          dragHandleStyle={{ display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          {...drawerProps}
        >
          请点击左上角图标
        </Drawer>
      </div>
      </div>
      );
  },
});


export default UserGainFind;
