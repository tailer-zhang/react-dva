import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from '../../../styles/product/ProductMain.css';
import { Tool } from '../../../utils/tools';
import { WhiteSpace } from 'antd-mobile'
import watermark from '../../../watermark'
@connect()
export default class AssetCertificateMain extends React.Component {
  componentDidMount() {

    let {dispatch, main, location} = this.props;

    const params = Tool.GetRequest();
    const userObj = {
      userId: params.userId,
      childToken: params.token,
      childRefreshToken: params.rtoken,
    }
    Tool.localItem('UserToken', JSON.stringify(userObj));
    //资产证明部分水印
    if(document.getElementById('root').childNodes.length > 2){
      return
    }
    dispatch({
      type: 'main/getUserName',
      payload: {
        backMethod: (data) => {
          var cnName = data;
          watermark.initialize({
            watermark_txt0: cnName,
            watermark_txt1: userObj.userId,
            watermark_txt : "海银财富",
            watermark_id: 'root'
          });
        },
      },
    });
  }

  render() {
    const { dispatch } = this.props
    return (
      <div className={styles.prodMenu}>
        {/*{dispatch(routerRedux.push({pathname:'/ErrorPage'}))}*/}
        <div className={styles.whiteSpeace}></div>
        <p onClick={() => dispatch(routerRedux.push('/assetsApplyListCnt'))}>
          <img src={require('../images/assets_apply.png')} />资产证明申请
          <span>
            <img src={require('../../../image/icon/arrow_r.png')} className={styles.arrowLeft} />
           </span>
        </p>
        <WhiteSpace />
        <p onClick={() => dispatch(routerRedux.push('/assetsRejectListCnt'))}>
          <img src={require('../images/assets_reject.png')} />资产证明申请驳回修改
          <span>
             <img src={require('../../../image/icon/arrow_r.png')} className={styles.arrowLeft} />
          </span>
        </p>
        <WhiteSpace />
        <p onClick={() => dispatch(routerRedux.push('/assetsSearchListCnt'))}>
          <img src={require('../images/assets_search.png')} />资产证明申请查询
          <span>
            <img src={require('../../../image/icon/arrow_r.png')} className={styles.arrowLeft} />
          </span>
        </p>
      </div>
    )
  }
}

function connectMain({main})
{
  return {main};
}
