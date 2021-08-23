import React from 'react';

import buycustStyle from '../../styles/product/buyCustomer.less';

class BuyCustFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      changeColor:{
        color:'#f22f33'
      }
    }
  }

  clickFilter(item){
      let {sortEvent,sortTags} = this.props;
      sortEvent(item.attrName,sortTags.sortFlag==1?0:1);
  }

  render()
  {
    let changeColor = this.state.changeColor;
    let {sortTags,sortEvent} = this.props;
    let {sortFlag,sortAttr} = sortTags;
    // if(!sortAttr)//默认打款日期降序排列
    //    sortAttr  = 'remitDate';
    let sortArray=[{name:'打款日期',attrName:'remitDate'},{name:'购买金额',attrName:'reqAmt'},{name:'确认份额',attrName:'confShr'}];
    return(
      <ul className={buycustStyle.filterTitle}>
        {
            sortArray.map((item,index)=>{
                if(sortAttr===item.attrName)
                    return (
                        <li key={index} onClick={this.clickFilter.bind(this,item)} style={changeColor}><span>{item.name}</span><img src={sortFlag==1?require("../../image/icon/buyIcon_02.png"):require("../../image/icon/buyIcon_01.png")}/></li>
                    );
                else return (<li key={index} onClick={this.clickFilter.bind(this,item)}>{item.name}<img src={require("../../image/icon/buyIcon_03.png")}/></li>);
            })
        }
      </ul>
    );
  }
}

// <li style={changeColor}><span>打款日期</span><img src={require("../../image/icon/buyIcon_01.png")}/></li>
// <li>购买金额 <img src={require("../../image/icon/buyIcon_03.png")}/></li>
// <li>确认份额 <img src={require("../../image/icon/buyIcon_03.png")}/></li>

export default BuyCustFilter;
