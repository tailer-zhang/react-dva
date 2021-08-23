import React,{ Component,PropTypes } from 'react';
import { ImagePicker, Button,hiteSpace, WingBlank ,Card} from 'antd-mobile';
import {ImageHostAddress,CrmImageHostAddress} from '../../utils/commonUtil';
import styles from '../../styles/customer/personalCustomerMaterial.less';
import ReactModal from 'react-modal';
import {Tool} from '../../utils/tools';
class PushFile extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      imgurl:''
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
    // e.preventDefault();
    this.setState({
      visible: false,
    });
  }

  render(){
    let {title,imgFiles,imgUseType} = this.props;
    return (
      <div>
        <Card>
          <Card.Header
            title={title}
            extra={<span>{imgFiles.length}张</span>}
          />
          <Card.Body>
            <div>
              {
                imgFiles.map((item,index) => {
                  let src = Tool.getSecretFilePath(item.fileId);
                   if(imgUseType=='trade'){
                     src = Tool.getSecretFilePath(item.url);
                   }else if(imgUseType == 'customer'){
                     src = CrmImageHostAddress + item.fileId;
                   }
                    return (
                      <img  className={styles.block}  src={src}  key={index} onClick={()=>this.showImg(src)}/>
                    )
                })
              }
            </div>
          </Card.Body>
          <Card.Footer content="" extra={<div></div>} />
        </Card>
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
              height:'100%',
              textAlign: 'center'
            }
           }}
        >
          <img src={this.state.imgurl} />
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
