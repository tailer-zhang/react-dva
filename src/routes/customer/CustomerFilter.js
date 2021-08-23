//客户筛选  赵博文
import React,{ Component } from "react";
import styles from '../../styles/customer/customerFilter.less';
import Dic from '../../utils/dictionary';

export default class CustomerFilter extends React.Component {
  constructor(props) {
		 super(props);
     this.state = props;
	}
  renderList(key,selectValue) {
    let dic = Dic.fetchDicList(key);
    return (
      <ul>
        {
          Object.keys(dic).map((item,index) => {
            // console.log('selectValue',selectValue);
            // console.log('item',item)
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
          numberType0 : item
        });
    } else if (key==='customerFilter1') {
        this.setState({
          numberType1 : item
        });
    } else if (key==='customerFilter2') {
        this.setState({
          numberType2 : item
        })
    } else {
      this.setState({
        numberType3 : item
      })
    }
    console.log('clickLi',item)
  }
  render () {
    const {numberType0,numberType1,numberType2,numberType3} = this.state;
    return (
      <div className={styles.total}>
        <div className={styles.left}>
          <img className={styles.leftImg} src={require('../../image/icon/dot.png')} />
        </div>
        <div className={styles.right} style={{display: 'felx',flexDirection: 'column'}}>
          <div className={styles.padding}>
            <p>筛选项</p>
            <div className={styles.flex}>
              { this.renderList('customerFilter0',numberType0) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>性别</p>
            <div className={styles.flex}>
              { this.renderList('customerFilter1',numberType1) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>客户等级</p>
            <div className={styles.flex}>
              { this.renderList('customerFilter2',numberType2) }
            </div>
          </div>
          <div className={styles.padding}>
            <p>客户状态</p>
            <div className={styles.flex}>
              { this.renderList('customerFilter3',numberType3) }
            </div>
          </div>
          <div style={{height: '1.6rem'}}></div>
          <div className={styles.foot}>
            <div className={styles.reset}>重置</div>
            <div className={styles.submit}>确定</div>
          </div>
        </div>
      </div>
    )
  }
}
