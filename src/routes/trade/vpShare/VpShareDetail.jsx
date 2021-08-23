import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List } from 'antd-mobile';
import Title from '../../../components/product/Title';//顶部标题和返回按钮组件
import VpShareTable from '../../../components/trade/vpShare/vpShareTable';//私募产品列表组件
import SliderTable from '../../../components/trade/vpShare/SliderTable';//私募产品列表组件
import styles from '../../../styles/trade/vpShare/vplist.less';
import {Tool} from '../../../utils/tools';
import * as commons from '../../../utils/commonUtil';
import {routerRedux} from 'dva/router';
import {fmoney,convertCurrency} from '../../../utils/formatUtils';

const Prompt = (props) => {
  let {show,clickMethord} = props;
  return (
    <div className={styles.promptPage} style={{display:show?'block':'none'}}>
      <div className={styles.pointer}>
          <img src={require("../../../image/icon/pointer.png")}/>
          <p>左右滑动查看更多</p>
          <p onClick={clickMethord}>知道了</p>
      </div>
		</div>
  );
};

class VpShareDetail extends Component {

    constructor(props) {
       super(props);
       let userObj = Tool.getSessionUser();
       let initalIntroduceShow = false;
       if(userObj&&userObj.userId){
           let userInital = Tool.localItem(userObj.userId);
           if(!userInital){
               initalIntroduceShow = true;
           }
       }
       this.state={
           introduceShow:initalIntroduceShow,
           userObj:userObj
       };
    }

    clickHidden(){
        this.setState({
            introduceShow:false,
        });
        let {userObj} = this.state;
        Tool.localItem(userObj.userId,'1');
    }


      render()
      {
        document.getElementById('root').style['-webkit-overflow-scrolling'] = 'auto';
        const TitleProps = {
          title:'VP共享额度使用详情',
          showBack:'no'
        };
        let {vpShare,location} = this.props;
        let rowData = location.state?location.state:{};
        let {vpShareDetail,shareCompanyList} = vpShare;
        return (
          <div className={styles.vpDetail}>
            {/*<Title {...TitleProps}></Title>*/}
            <div className={styles.testBox}></div>
            <Prompt show={this.state.introduceShow} clickMethord={this.clickHidden.bind(this)} />
            <div className={styles.limitProud}>
              <p>{rowData.prodName}</p>
              <section>
                <div className={styles.limit_left}>
                  <p><span>VP共享额度</span><span>VP共享合同数</span></p>
                  <p><span>{vpShareDetail.totAmt}万</span><span>{vpShareDetail.totCont}份</span></p>
                </div>
                <div>
                  <p><span>剩余VP共享额度</span><span>剩余VP共享合同数</span></p>
                  <p><span>{vpShareDetail.useableAmt}万</span><span>{vpShareDetail.useableCont}份</span></p>
                </div>
              </section>
            </div>
            <div className={this.state.introduceShow?styles.limit_table_flow:styles.limit_table} >
                <VpShareTable list={shareCompanyList}/>
            </div>
            <Prompt/>
          </div>
        );
      }
};

function connectVpShareFun({vpShare}){
    return {vpShare};
}

export default connect(connectVpShareFun)(VpShareDetail);
