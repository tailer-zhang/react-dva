//客户主页  赵博文

import React from 'react';
import { connect } from 'dva';
import CustomerList from '../../components/customer/CustomerList';
import Title from '../../components/product/Title';
import TitleComp, { flushTitle } from 'react-title-component';

// const CustomerMain = (props) => {
//
  // const TitleProp = {title:'客户',showBack:'no'};
  // return (
  //   <div>
  //     {/*<Title {...TitleProp}/>*/}
  //       <CustomerList />
  //   </div>
  // )
// }

class  CustomerMain extends React.Component {
  constructor(props) {
     super(props);
    //  document.title='客户';
  }

  render()
  {
    var root = document.getElementById('root');
    if (!root.scrollTo) {
      root.scrollTo = function(left, top) {
        console.log('scroll left=', left, ',top=', top);
        this.scrollLeft = left;
        this.scrollTop = top;
      }
    }
    const TitleProp = {title:'客户',showBack:'no'};
    return (
      <div>
        <TitleComp render="客户"/>
        {/*<Title {...TitleProp}/>*/}
          <CustomerList />
      </div>
    )
  }
}


export default CustomerMain;
