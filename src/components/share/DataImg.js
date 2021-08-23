import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { List, Button ,ListView,ImagePicker,Modal} from 'antd-mobile';
import * as Commons from '../../utils/commonUtil';
import Dic from '../../utils/dictionary';
import AddFileStyle from '../../styles/customer/personalCustAddMore.less'
import styles from '../../styles/customer/personalCustomerMaterial.less';
import ReactModal from 'react-modal';
import {Tool} from '../../utils/tools';

export default class DataImg extends React.Component
 {
   constructor(props){
     super(props);
     this.state={
       visible:false,
       imgurl:'',
       hrefSetting:''
     }
   }

   showImg = (img) => {
     console.log('img',img);
     // e.preventDefault();
     this.setState({
       visible: true,
       imgurl:img
     });
   }
   onClose = (e) => {
    //  e.preventDefault();
     this.setState({
       visible: false,
     });
   }

   componentDidMount() {
     let locationHref = window.location.href;
     if(locationHref.indexOf('index.html')!=-1){
       this.setState({
         hrefSetting: locationHref.substring(0,locationHref.indexOf('index.html'))
       })
     } else{
       this.setState({
         hrefSetting: locationHref.substring(0,locationHref.indexOf(window.location.hash))
       })
     }
   }

   render(){
     let { dataSource} = this.props;
  console.log('this.props=======',this.props)
     if(dataSource&&dataSource.length > 0 && dataSource[0].list){
       return(
         <div>
           { dataSource.map((item,index)=>{
             return (
               <div key={index} className={AddFileStyle.fileType}>
                 <p>{Dic.fetchDicValue('matrType',item.matrType)}<span>{item.list.length}张</span></p>
                 <div className={AddFileStyle.dataImg}>
                   {
                     item.list.map((value,idx)=>{
                       let src = Tool.getSecretFilePath(value.url);
                       return(
                         <span key={idx}>
                           {
                             /\.pdf/.test(src)?
                               <img src={require('../../image/icon/pdf.png')}  onClick={()=>this.showImg(src)}  />
                               : <img src={src}  onClick={()=>this.showImg(src)}  />
                           }
                      </span>
                       )
                     })
                   }
                 </div>
               </div>
             );
           })}

           <ReactModal
             isOpen={this.state.visible}
             onRequestClose={this.onClose}
             contentLabel="图片预览"
             style={{
               overlay: {
                 backgroundColor: 'rgba(255, 255, 255, 0.75)',
                 zIndex:100,
                 overflow:'hidden'
               },
               content: {
                 color: 'lightsteelblue',
                 height:'100%'
               }
             }}
           >
             {
                  /\.pdf/.test(this.state.imgurl)?
                  <div className={AddFileStyle.pdfBox}>
                    <iframe src={this.state.hrefSetting + 'pdfjs/web/viewer.html?file='+encodeURIComponent(this.state.imgurl)} frameBorder="0" scrolling="auto" height="100%" width="100%"></iframe>
                  </div>
                  :<img src={this.state.imgurl}/>
             }
             <Button className="btn"  type="primary" onClick={this.onClose}>关闭</Button>
           </ReactModal>
         </div>
       )
     }else {
       return(
         <div>
               <div className={AddFileStyle.fileType}>
                 <p>{this.props.innerTtile}<span>{dataSource?dataSource.length:0}张</span></p>
                 <div className={AddFileStyle.dataImg}>
                   {

                     (!!!dataSource)?"":dataSource.map((value,idx)=>{
                       let src = Tool.getSecretFilePath(value.url);
                       return(
                         <span key={idx}>
                            {
                              /\.pdf/.test(src)?
                                <img src={require('../../image/icon/pdf.png')}  onClick={()=>this.showImg(src)}  />
                                :  <img src={src}  onClick={()=>this.showImg(src)}  />
                            }
                        </span>
                       )
                     })
                   }
                 </div>
               </div>

           <ReactModal
             isOpen={this.state.visible}
             onRequestClose={this.onClose}
             contentLabel="图片预览"
             style={{
               overlay: {
                 backgroundColor: 'rgba(255, 255, 255, 0.75)',
                 zIndex:100,
                 overflow:'hidden'
               },
               content: {
                 color: 'lightsteelblue',
                 height:'100%'
               }
             }}
           >
             {
               /\.pdf/.test(this.state.imgurl)?
                 <div className={AddFileStyle.pdfBox}>
                   <iframe src={this.state.hrefSetting + 'pdfjs/web/viewer.html?file='+encodeURIComponent(this.state.imgurl)} frameBorder="0" scrolling="auto" height="100%" width="100%"></iframe>
                 </div>
                 :<img src={this.state.imgurl}/>
             }
             <Button className="btn"  type="primary" onClick={this.onClose}>关闭</Button>
           </ReactModal>
         </div>
       )
     }
   }
};
