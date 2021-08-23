import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import productMainStyles from '../../styles/product/ProductMain.css';
import { SegmentedControl,DatePicker, List, Button ,ListView, SearchBar, Icon, Drawer, NavBar } from 'antd-mobile';


// const Header = ({selectIndex,searchValue,segValueChange,searchEvent})=>{

// };
//
// export default Header;
//

export default class Header extends Component {
  constructor(props) {
     super(props);
  }

  render()
  {
    let {selectIndex,searchValue,searchEvent,showIndex} = this.props;
    return (
      <div className={productMainStyles.container}>
            {
              showIndex==1?(
                <SearchBar  ref='searchBar' className={productMainStyles.searchBar}  onSubmit={(value)=>{
                  // console.log('-----',this.refs.searchBar);
                  // this.refs.searchBar.onBlur();
                  // this.refs.searchBar.onCancel();
                    searchEvent(value);
                  }}
                  onClear={()=>searchEvent()}
                  placeholder="产品名称/简称" defaultValue={searchValue}  />
              ):(
                <div>
                <SearchBar  ref='searchBar1' className={productMainStyles.searchBar}  onSubmit={(value)=>{
                  // console.log('-----',this.refs.searchBar);
                  // this.refs.searchBar.onBlur();
                  // this.refs.searchBar.onCancel();
                    searchEvent(value);
                  }}
                  onClear={()=>searchEvent()}
                  placeholder="产品名称/简称/备案编码" defaultValue={searchValue}  />
              </div>
              )
            }


      </div>
    );
  }
}


//
//       <input type="search" className={productMainStyles.searchBar} defaultValue={searchValue}
    //   placeholder="产品名称/简称" onSubmit={(value)=>{
    //     console.log('1111');
    //     // searchEvent('21321');
    // }} />
