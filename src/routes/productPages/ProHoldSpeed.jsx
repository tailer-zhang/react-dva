import React,{ Component , PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import Title from '../../components/product/Title';
import styles from '../../styles/product/ProductDetail.less';
import {routerRedux} from "dva/router";
import {Toast} from "antd-mobile/lib/index";
import {Tool} from "../../utils/tools";

var empty = [
  {'empty': '暂无数据'}
]

class ProHoldSpeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillUnmount()
  {
    let {dispatch} = this.props;
    dispatch({
      type:'xtProduct/clearCache',
      params:{processList:[],showData:false}
    });
  }

  openFileFunc(data){
     let {dispatch} = this.props;
      // 过滤掉 大写的后缀名
      if(data.fileSvrPath.split(".")[1]=="PDF"){
        console.log("ProHoldSpeed---是大写");
        data.fileSvrPath = data.fileSvrPath+"".split(".")[0]+"."+"pdf"
      }
      
     let fileRef = data.fileSvrPath;
    if(fileRef&&fileRef.match(/.pdf$/g)!=null){
      dispatch(routerRedux.push({pathname:'/filePreview', state:{
          srcFileName:data.srcFileName,
          fileSvrPath:fileRef
        }}));
    }
    else if(fileRef&&fileRef.match(/.mp4$/g)!=null){
      dispatch(routerRedux.push({pathname:'/productVideo', state:{
          srcFileName:data.srcFileName,
          fileSvrPath:fileRef
        }}));
    }
    else if(fileRef&&(fileRef.match(/.zip$/g)!=null||fileRef.match(/.rar$/g)!=null||fileRef.match(/.cab$/g)!=null)){
      Toast.fail('暂时不支持此文件格式的文件打开!',1);
    }
    else {
      window.location =Tool.getSecretFilePath(fileRef);
    }
  }

  render(){
    let title = '产品存续进度';
    let color = '',bgColor ='',spanColor = '';
    return(
      <div className={styles.holdSpeed}>
        <Title  title={title}/>
        <div  className={styles.holdInfo}>
          {
            this.props.xtProduct.processList.length>0?this.props.xtProduct.processList.map((item,index) => {
              color = item.progressStatusName==='进行中' ? '#ff7e00':'#8c8c8c';
              bgColor = item.progressStatusName==='进行中' ? '#ff7e00':'#dedede';
              spanColor = item.progressStatusName==='进行中' ? '#ff7e00':'#333';

              return(
                <div className={styles.speedCard} key={index}>
                  <section className={styles.lineTime}>
                    <p style={{color:color}}>{item.publishDate}</p>
                    <span style={{backgroundColor:bgColor}}>
                    <Icon type="up" style={{fontSize:18,color:'#fff'}}/>
                    </span>
                  </section>
                  <section className={styles.speedInfo}>
                    <p><span style={{color:spanColor}}>{item.progressStatusName==='进行中'?item.progressFinishDate:item.progressStatusName}</span><span style={{color:color}}>{item.updateBy}</span></p>
                    <div>{item.progressRemark}
                      {item.fileList&&item.fileList.length>0&&item.fileList.map((items,key)=>{
                        return(
                          <span className={styles.fileName} key={key} onClick={this.openFileFunc.bind(this,items)}>《{items.srcFileName}》</span>
                        )
                      }) }
                    </div>
                  </section>
                </div>
              );
            }):this.props.xtProduct.showData&&empty.map((content,sub)=>{
              return (
                <div key={sub} className={styles.emptyType}>
                  {content.empty}
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

function connectProductFunc({xtProduct})
{
  return {xtProduct};
}

export default connect(connectProductFunc)(ProHoldSpeed);
