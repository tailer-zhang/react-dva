//客户查询 赵博文
import React, { Component } from 'react';
import { connect } from 'dva';
import {Link,routerRedux} from 'dva/router';
import { SearchBar,List, Radio,Popup, Popover, NavBar,Drawer} from 'antd-mobile';
import Title from '../../components/product/Title';
import CustomerInquireList from '../../components/customer/CustomerInquireList';
import styles from '../../styles/customer/CustomerInquire.less';
import Dic from '../../utils/dictionary';
import domAlign from 'dom-align';

class CustomerInquire extends React.Component {

  constructor(props) {
     super(props);
     let {customer} = props;
    //  console.log('=====渲染进入===',customer.filterArgs);
     this.state = {
       num: undefined,
       visible: false,
       mask: true,
       open: false,
       position: 'right',
       ...customer.filterArgs
      //  filterArgs: {custClass: '',custGrade: '',curStat:　''}
    };
    this.onOpenChange = this.onOpenChange.bind(this);
  }
    // tapEvent(e) {
    //   e.preventDefault();
    //   this.setState({
    //     num: 'haiyin',
    //     visible: true,
    //   });
    //   if(!this.state.visible&&this.state.open) {      //控制抽屉组件
    //     this.setState({open: !this.state.open})
    //   }
    //   Popup.hide();//控制排序消失
    // }
    // onSelect(opt) {
    //     // this.setState({
    //     //   visible: false,
    //     //   selected: opt.props.value,
    //     // });
    //     //  console.log('sssssssssss',opt);
    //     setTimeout(()=>{
    //       let {key} =opt;
    //       let {dispatch} = this.props;
    //       if(key=='4'){
    //         dispatch(routerRedux.push({
    //           pathname: '/personalCustomerIncrease',
    //           state: {methord: 'inquire'}
    //         }));
    //       } else{
    //         dispatch(routerRedux.push({
    //           pathname: '/orgCusAdd',
    //           state: {methord: 'inquire'}
    //         }));
    //       }
    //     },200);
    //     // this.setState({ visible: false,});
    // }
    handleVisibleChange(visible) {
        this.setState({
          num : undefined,
          visible: false,
        });
      }

    renderList(key,selectValue) {
      let dic = Dic.fetchDicList(key);
      return (
        <ul>
          {
            Object.keys(dic).map((item,index) => {
                let value = dic[item];
                let className = '';
                if(selectValue === item) {
                  className = styles.li;
                }
                return (
                  <li onClick={this.clickLi.bind(this,item,key)}  className={className} key={index}>{ value }</li>
                )
              }
            )
          }
        </ul>
      )
    }
    clickLi(item,key) {
      if(key==='customerFilter0') {
        this.setState({
            custClass : item==this.state.custClass ? '':item,
          });
      } else if (key==='customerFilter1') {
          this.setState({
            sex : item==this.state.sex ? '':item,
          });
      } else if (key==='customerFilter2') {
          this.setState({
            custGrade : item==this.state.custGrade ? '':item
          });
      } else if (key==='customerFilter4') {
          this.setState({
            custType : item==this.state.custType ? '':item
          });
      }else {
        this.setState({
          curStat : item==this.state.curStat ? '':item
        });
      }
    }

    onOpenChange(e) {
    //   if(e) e.preventDefault();
      this.setState({ open: !this.state.open });
    }

    render() {
      let { num,visible,mask,sex,custClass,custGrade,curStat,custType} = this.state;
      let filterArgs = {custClass,custGrade,curStat,sex,custType};
      let {dispatch,customer} = this.props;
      // let dataSource = customer.customerList;

      const sidebar = (
        <div className={styles.all}>
          <div className={styles.content} style={{display: 'felx',flexDirection: 'column'}}>
            <div className={styles.padding}>
              <p>筛选项</p>
              <div className={styles.flex}>
                { this.renderList('customerFilter0',custClass) }
              </div>
            </div>
            <div className={styles.padding}>
              <p>性别</p>
              <div className={styles.flex}>
                { this.renderList('customerFilter1',sex) }
              </div>
            </div>
            <div className={styles.padding}>
              <p>客户类型</p>
              <div className={styles.flex}>
                { this.renderList('customerFilter4',custType) }
              </div>
            </div>
            {
              this.state.custType=='02'?<div />
              :(this.state.custType=='03'?<div />
              :<div className={styles.padding}>
                <p>客户等级</p>
                <div className={styles.flex}>
                  { this.renderList('customerFilter2',custGrade) }
                </div>
              </div>)
            }
            <div className={styles.padding}>
              <p>客户状态</p>
              <div className={styles.flex}>
                {
                  this.state.custType=='01'?this.renderList('customerOfficial',curStat)
                  :(this.state.custType=='02'?this.renderList('customerLatent',curStat)
                  :(this.state.custType=='03'?this.renderList('customerMemBer',curStat)
                  :this.renderList('customerFilter3',curStat)))
                }
              </div>
            </div>
            <div style={{height: '1.6rem'}}></div>
            <div className={styles.foot}>
              <div className={styles.reset} onClick={()=>{dispatch({
                type: 'customer/fetchRemote',
                payload: {filterArgs:{},loadingMore:false}
              });this.setState({ custClass: '',custGrade: '',curStat: '',sex: '',custType: '' })}}>重置</div>
              <div className={styles.submit} onClick={()=>{dispatch({
                type: 'customer/fetchRemote',
                payload: {filterArgs:filterArgs,loadingMore:false}
                });this.setState({ open: !this.state.open })}}>确定</div>
            </div>
          </div>
        </div>
      );

      const drawerProps = {
        open: this.state.open,
        position: this.state.position,
        onOpenChange: this.onOpenChange,
      };

      const titleProps = {title: '客户查询',showBack: 'no'};
      return (
        <div className={styles.wrap} style={{display: 'flex',flexDirection: 'column',position: 'relative'}}>
          <Drawer
            className={styles.myDrawer}
            sidebar={sidebar}
            dragHandleStyle={{ display: 'none' }}
            contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
            {...drawerProps}
          >
            <div style={{position: 'absolute',zIndex: '1',width: '100%'}}>
              <Title {...titleProps} style={{height: '1.33rem'}}>
                <div onClick={ this.onOpenChange } className={styles.right}>
                  <img src={require('../../image/icon/orde_02.png')} />
                </div>
              </Title>
              <SearchBarExample dispatch={dispatch} custName={customer.custName} />
            </div>
            <div style={{height: '100%'}}>
              <CustomerInquireList dispatch={dispatch} customer={customer} />
            </div>
          </Drawer>
        </div>)
    }
};

// 搜索组件
class SearchBarExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  searchEvent(custName) {
    let {dispatch} = this.props;
    dispatch({
      type: 'customer/fetchRemote',
      payload: {custName: custName,loadingMore:false}
    })
  }

  clearEvent(custName) {
    let {dispatch} = this.props;
    dispatch({
      type: 'customer/fetchRemote',
      payload: {custName: '',loadingMore:false}
    })
  }

  render() {
    let {custName,dispatch} = this.props;
    return (<div>
      <SearchBar
        placeholder="客户名称"
        defaultValue={custName}
        onSubmit={this.searchEvent.bind(this)}
        onClear={this.clearEvent.bind(this)}
      />
    </div>);
  }
};
//排序和筛选
// <SearchBarExample dispatch={dispatch} custName={customer.custName} />
// <SortAndFilter onOpenChange = {this.onOpenChange.bind(this)}
// dispatch={dispatch} />
// const SortAndFilter = React.createClass({
//     onClick(e) {
//       e.preventDefault(); // 修复 Android 上点击穿透
//       Popup.show(<PopupContent onClose={() => Popup.hide()} />, { onMaskClose: this.onMaskClose,transitionName: 'ToBottom' });
//     },
//     onMaskClose() { },
//     render() {
//       let {onOpenChange,dispatch} = this.props;
//       return (
//         <div className={styles.total}>
//           <div className={styles.sort}>
//             <div onClick={this.onClick}>
//               <span>默认排序</span><img className={styles.img} src={require('../../image/icon/invertedTriangle.png')} />
//             </div>
//             <div  className={styles.sortMethod}></div>
//           </div>
//           <div className={styles.filter} onClick={onOpenChange}>
//             <span>筛选</span><img className={styles.img} src={require('../../image/product/filter.png')} />
//           </div>
//         </div>
//       )
//     }
//
//   }
// )

//弹出内容
//   const RadioItem = Radio.RadioItem;
//   const PopupContent = React.createClass({
//   getInitialState() {
//     return {
//       value: 0
//     };
//   },
//   onChange(value) {
//     console.log('checkbox');
//     this.setState({
//       value,
//     });
//   },
//   render() {
//     const { value } = this.state;
//     const data = [
//       { value: 0, label: '默认排序' },
//       { value: 1, label: '存续资金升序' },
//       { value: 2, label: '存续资金降序' },
//     ];
//     return (
//       <List>
//         {data.map(i => (
//           <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
//             {i.label}
//           </RadioItem>
//         ))}
//       </List>
//     );
//   },
// });

// <Popover
//   visible={visible}
//   mask={mask}
//   overlay={[
//     (<Popover.Item style={{color: '#f22f33',padding: '0 0.6rem'}} key="4">添加个人客户</Popover.Item>),
//     (<Popover.Item key="5" style={{ whiteSpace: 'nowrap',color: '#f22f33',padding: '0 0.6rem' }}>添加机构客户</Popover.Item>)
//   ]}
//   placement ={'bottomRight'}
//   popupAlign={{
//     overflow: { adjustY: 0, adjustX: 0 },
//     offset: [3, -10],
//   }}
//   onVisibleChange={this.handleVisibleChange.bind(this)}
//   onSelect={this.onSelect.bind(this)}
// >
//   <div style={{
//     height: '100%',
//     padding: '0 0.3rem',
//     marginRight: '0.3rem',
//     display: 'flex',
//     alignItems: 'center',
//   }}
//   >
//   </div>
// </Popover>

function connectCustomerFunc({customer})
{
  return {customer};
}

export default connect(connectCustomerFunc)(CustomerInquire);
