//个人客户资料添加 上传资料
import React,{ Component, PropTypes } from 'react';
import PushFile from '../../components/share/PushFile';
import Titles from '../../components/product/Titles';
import { Toast,Modal,Button } from 'antd-mobile';

//import AddFileStyle from '../../styles/customer/personalCustAddMore.less';
import giveUpStyles from '../../styles/customer/giveUp.less';
import { Link ,routerRedux} from 'dva/router';
import { connect } from 'dva';
import * as  Commons from '../../utils/commonUtil';
import ShowImg from '../../components/share/ShowImg';

class ImageAdd extends React.Component{
  constructor() {
    super();
  }

  render() {
    let {dispatch,formStorage,location} = this.props;
    let {edit,memMaterial} = location.state;
    if(memMaterial==undefined) memMaterial=[];
    console.log('memMaterial-----',memMaterial);

    const titleProps = {
      title:'资料上传',
      btn1:'证件扫描件',
      btn2:'会员扫描件',
    }
    let files = formStorage.certPic?formStorage.certPic:[];
    let certPic = [];
    files.map((item,index)=>{
      certPic.push({url:Commons.CrmImageHostAddress+item.fileId});
    })

     files = formStorage.memPic?formStorage.memPic:[];
    let memPic = [];
    files.map((item,index)=>{
      memPic.push({url:Commons.CrmImageHostAddress+item.fileId});
    })

    function goBack(e)
    {
        // e.preventDefault();
       dispatch(routerRedux.goBack());
    };


    function onChange(addType,files, type, index)
    {
      console.log('-------------file',files, type, index);
        if(type=='add')//表示添加图片
        {
         let image = files[files.length-1];
         console.log('image',image);
         if(image.file.size > 5000000){//5M 5000000
           Toast.fail('文件大小超出限制',2);
           return;
         }
         dispatch({
           type:'customer/uploadCustomerImage',
           payload:{
             params:{},
             images:[{
               file:image.file
              }],
              backMethord:(data)=>{
                if(data&&data.code=='0'&&data.object)
                {
                  let resultFiles = data.object.files;
                  if(files.length>0)
                  {
                    let tempFiles ;
                    if(addType=='certPic')//表示证件
                    {
                      dispatch({
                        type:'formStorage/fetch',
                        payload:{
                          certPic:formStorage.certPic?formStorage.certPic.concat(resultFiles):resultFiles
                        }
                      });
                    }
                    else dispatch({
                        type:'formStorage/fetch',
                        payload:{
                          memPic:formStorage.memPic?formStorage.memPic.concat(resultFiles):resultFiles
                        }
                      });
                  }
                }
                else Toast.fail(data&&data.msg?data.msg:'图片上传错误!',1);
              }
            }
         });
        }
        else if(type=='remove')//表示移除图片
        {
          if(addType=='certPic')//表示证件
          {
            formStorage.certPic.splice(index,1);
            dispatch({
              type:'formStorage/fetch',
              payload:{
                certPic:formStorage.certPic
              }
            });
          }
          else {
            formStorage.memPic.splice(index,1);
            dispatch({
                type:'formStorage/fetch',
                payload:{
                  memPic:formStorage.memPic
                }
              });
          }
        }
    };
    // let imageTypes=edit?[{type:'certPic',value:certPic,maxImgCount:5,title:'证件资料'}]
    //                     :[{type:'certPic',value:certPic,maxImgCount:5,title:'证件资料'}
    //                       ,{type:'memPic',value:memPic,maxImgCount:5,title:'会员资料'}];
    let certPicObj = {type:'certPic',value:certPic,maxImgCount:5,title:'证件资料'};
    let memPicObj = {type:'memPic',value:memPic,maxImgCount:5,title:'会员资料'};
    let memview = '';
    if(edit){
      memview = <ShowImg title="会员资料" imgFiles={memMaterial}  imgUseType={'customer'}/>;
    }else {
      memview = <PushFile
                    key={2}
                    onChange={(files, type, index)=>onChange(memPicObj.type,files, type, index)}
                    files={memPicObj.value}
                    maxImgCount={memPicObj.maxImgCount}
                    title={memPicObj.title}
                    imgUseType={'customer'}
                    />
    }
    return (
      <div>
        <Titles {...titleProps}>
          <div className={giveUpStyles.cancel} onClick={goBack}>取消</div>
          <div className={giveUpStyles.push} onClick={goBack}>完成</div>
        </Titles>
        <PushFile
          key={1}
          onChange={(files, type, index)=>onChange(certPicObj.type,files, type, index)}
          files={certPicObj.value}
          maxImgCount={certPicObj.maxImgCount}
          title={certPicObj.title}
          imgUseType={'customer'}
          />
        {memview}

      </div>
    )
  }
};

function connectFunc({formStorage})
{
  return {formStorage};
}



export default connect(connectFunc)(ImageAdd);
