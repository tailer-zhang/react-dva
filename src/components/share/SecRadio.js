import React ,{ Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from '../../styles/customer/secRadio.less';


class SecRadio extends React.Component{
  constructor() {
    super();
    this.state={
      value: ''
    }
  }

  render() {
    let {data,index,indexAdd,listPush,setRepeat} = this.props;
    return (
      <div>
        <ul>
          {data[index]==undefined?'':data[index].answerList.map((item,num) => {
            return(
              <li key={num} className={styles.li} onClick={()=>{
                  this.setState({value: item.answerId});
                  indexAdd(index+1);
                  listPush({answerId: item.answerId,quesitionId: item.quesitionId,remark1: item.remark1});
                  console.log('remark1', item.remark1);
              }}>
                <div className={styles.first}>
                  <img src={this.state.value!==item.answerId?
                    require('../../image/icon/un_check.png')
                    :require('../../image/icon/check_03.png')}
                  />
                </div>
                <div className={styles.second}>{item.answerName}</div>
              </li>
            )

          })}
        </ul>
    </div>
  )
  }
}

  // <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
  //   {i.label}
  // </CheckboxItem>

export default SecRadio;
