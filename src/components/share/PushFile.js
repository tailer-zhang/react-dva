import React,{ Component,PropTypes } from 'react';
import { ImagePicker, Button,hiteSpace, WingBlank } from 'antd-mobile';

import AddFileStyle from '../../styles/customer/personalCustAddMore.less';
import ReactModal from 'react-modal';
import {Tool} from '../../utils/tools';

class PushFile extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      imgurl:'',
      hrefSetting:'',
      imgfiles:[],
      imgList:[]
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    let {files} = nextProps;
    console.log(files,'文件====》')
    this.transformFilesData(files)
  }
  showImg = (img) => {
    // e.preventDefault();
    this.setState({
      visible: true,
      imgurl:img.url
    });
  }
  onClose = (e) => {
    // e.preventDefault();
    this.setState({
      visible: false,
    });
  }
  transformFilesData = (files) =>{
    if(files.length<=0){
      this.setState({
        imgfiles:[],
        imgList:[]
      });
      return
    }
    let imgList = new Array(files.length);
    let imgfiles = []
    for(let i = 0; i<files.length; i++){
      if(this.state.imgList[i]&&this.state.imgList[i].url.split('?')[0]==files[i].url){
        imgList[i] = this.state.imgList[i];
      }else{
        imgList[i] = {...this.state.imgList[i],url:Tool.getSecretFilePath(files[i].url)};
      }
      this.setState({
        imgList:imgList
      })
      if(!/\.pdf/.test(imgList[i].url)){
        imgfiles.push(imgList[i])
        this.setState({
          imgfiles:imgfiles
        })
      }
    }
  }
  componentDidMount() {
    if(this.props.files.length>0) {
      this.transformFilesData(this.props.files)
    }
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
    let {title,files,onChange,maxImgCount, from, selectKey,fileKeyType,fileUploadParams} = this.props;
    let {imgList,imgfiles} = this.state;
    return (
      <div className={AddFileStyle.fileType}>
        <p>{ title }<span>{imgList.length}/{maxImgCount}</span></p>
        {
         imgList.map((item,index)=>{
            if( /\.pdf/.test(item.url)){
              return <div key={index} className={AddFileStyle.filePdfIcon}><img src={require('../../image/icon/pdf.png')}  onClick={()=>this.showImg(item)}  /></div>
            }
          })
        }
        <ImagePicker
          files={imgfiles}
          fileKeyType = {fileKeyType}
          fileUploadParams={fileUploadParams?fileUploadParams:''}
          acceptLength={from&&from == 'recall' ? 1 : from&&from == 'change' ? 20 : from==='postpone' ? 10 :5}
          maxNum={from&&from == 'recall' ? 1 - imgList.length : from&&from == 'change' ? 20 - imgList.length : from==='postpone' ? 10 - imgList.length  : 5 - imgList.length}
          onChange={onChange}
          title={title}
          selectKey={selectKey}
          selectable={imgfiles.length < maxImgCount}
          onImageClick={(index,imgList)=>this.showImg(imgList[index])}/>

          <ReactModal
            isOpen={this.state.visible}
            onRequestClose={this.onClose}
            contentLabel="图片预览"
            style={{
               overlay: {
                 backgroundColor: 'rgba(0, 0, 0, 0.4)',
                 zIndex:100,
                 overflow:'hidden'
               },
               content: {
                 color: 'lightsteelblue',
                 height:'100%',
                 textAlign: 'center'
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
    );
  }
}



// const PushFile = ({title,files,onChange,maxImgCount}) =>{
//   this.setState();
//   let showImg = (img)=>{
//     console.log('img',img);
//     this.setState({
//       imgurl:img.url
//     });
//
//   }
//   return (
//       <div className={AddFileStyle.fileType}>
//         <p>{ title }<span>{files.length}/{maxImgCount}</span></p>
//         <ImagePicker files={files}
//           onChange={onChange}
//           selectable={files.length < maxImgCount}/>
//           <Modal
//             title="这是 title"
//             visible={this.state.visible}
//             footer={[{ text: '关闭', onPress: () => {  this.onClose(); } }]}
//           >
//             <img src={{uri:this.state.imgurl}} />
//           </Modal>
//       </div>
//   );
// };

// onImageClick={()=>{
//
// }}
// <div className={AddFileStyle.fileType}>
//   <p>{ btn2 }<span>{files2.length}/{maxImgCount2}</span></p>
//     <ImagePicker files={files2}
//       onChange={onChange2}
//       selectable={files2.length < maxImgCount2}/>
//   </div>
// </div>
export default PushFile;
