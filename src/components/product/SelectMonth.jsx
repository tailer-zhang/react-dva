import React ,{ Component,PropTypes} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Radio, Flex } from 'antd-mobile';
import ptoMonthSstyles from '../../styles/product/SelectMonth.less';

const RadioItem = Radio.RadioItem;

export default class SelectMounth extends Component{
  constructor(props)
  {
    super(props);
    this.state=props;
  }


  render()
  {
    let {dataSource,selectValue} = this.props;
    let keys = Object.keys(dataSource);
    let {onChange} = this.state;
    keys = keys.sort();
    // console.log('--dom内部---',this.props);
    return (
      <div>
        <List>
          {keys.map(i => (
            <div className={ptoMonthSstyles.wrap} key={i} onClick={(e) => {
                // e.preventDefault();
                // console.log('=======dianji ===',onChange);
                if(onChange){
                  onChange(i,dataSource[i]);
                }
              }}>
              <p className={ptoMonthSstyles.item}>{dataSource[i]}
                <img src={require("../../image/icon/choiced.png")} className={selectValue == i?ptoMonthSstyles.choicedIcon:ptoMonthSstyles.none}/>
              </p>
            </div>
          ))}
        </List>
      </div>);
  }
}
