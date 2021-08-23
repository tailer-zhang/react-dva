import React ,{ Component,PropTypes} from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory } from 'dva/router';
import { List, Radio, Flex } from 'antd-mobile';
import ptoMonthSstyles from '../../../styles/product/SelectMonth.less';


export default class ContractNoList extends Component{
  constructor(props)
  {
    super(props);
    this.state = props;
  }

  render()
  {
    let {dataSource,location} = this.props;
    let {contractNoList} = dataSource;
    let {selectCode} = location.state;
    console.log('--xuanze---',contractNoList);
    let keys = Object.keys(contractNoList != undefined?contractNoList:[]);
    //console.log('keys---',keys);

    return (
      <div>
        <List>
          {keys.map(i => (
            <div className={ptoMonthSstyles.wrap} key={i} onClick={(e) => {
                // e.preventDefault();
                  let {location,dispatch} = this.state;
                  let {selectResult} = location.state;
                  if(selectResult)
                    selectResult(contractNoList[i]);
                  dispatch(routerRedux.goBack());
              }}>
              <p className={ptoMonthSstyles.item}>{contractNoList[i].contNo}
                <img src={require("../../../image/icon/choiced.png")} className={selectCode == contractNoList[i].contNo?ptoMonthSstyles.choicedIcon:ptoMonthSstyles.none}/>
              </p>
            </div>
          ))}
        </List>
      </div>);
  }
}
