import React , { Component , PropTypes } from 'react';
import Title from '../../../components/product/Title';
import { WhiteSpace } from 'antd-mobile';
import PushImg from '../../share/PushImg2';//资料上传组件
import { Toast} from 'antd-mobile';
import {initUploadFileParams} from '../../../utils/commonMethods'
import styles from '../../../styles/trade/proofOrder.less';
import {connect} from 'dva'
import * as commonUtil from "../../../utils/commonUtil";
import {routerRedux} from "dva/router";
//列表详情
class ProofDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            attachList:[
                {
                    list: [],
                    matrType:'proof',
                    matrTypeName: '凭证资料',
                    fileNumber:3
                }
            ],
            fileUploadParams:{}
        }
    }
    componentDidMount() {
        this.setState({
            fileUploadParams: initUploadFileParams('product')
        })
        var _this = this;
        window.addEventListener('message',_this.onMessage,false);
    }

    componentWillUnmount()
    {
        let _this = this
        window.removeEventListener('message',_this.onMessage,false)
        global.selectIndex = ''
        global.receiveType =''
    }
    //监听的返回数据
    onMessage=(e)=> {
        if(!e.data ||!e.origin) return;

        // try {
        let blobs,content,content1,receiveData=JSON.parse(e.data);
        if(receiveData.resposeResult.code != '00'){
            Toast.fail(receiveData.resposeResult.data&&receiveData.resposeResult.data.message?receiveData.resposeResult.data.message:'图片上传错误!',3)
            return;
        }
        var type = global.receiveType
        var selectIndex = global.selectIndex
        let resultFiles = receiveData.resposeResult.model,tempFiles= [];
        for(let i=0;i<resultFiles.length;i++)
        {
            let file = resultFiles[i];
            tempFiles.push({
                fileName:file.fileName,
                filePath:file.fileId,
                url:commonUtil.ImageHostAddress+file.fileId,
                fileId:file.fileId,
                type:type,
                srcFileName:file.fileName});
        }
        let attachList = this.state.attachList;
        let modifyImgs = attachList[selectIndex];
        modifyImgs.list = modifyImgs.list.concat(tempFiles);
        this.setState({
            attachList:attachList
        })
        // dispatch({
        //     type:'payProofModel/uploadTradeCommonFiles',
        //     payload:{
        //         params:{},
        //         images:[{
        //             file: blobs
        //         }],
        //         backMethord:(data)=>{
        //             if(data&&data.code=='00'&&data.model) {
        //                 let resultFiles = data.model,tempFiles= [];
        //                 for(let i=0;i<resultFiles.length;i++)
        //                 {
        //                     let file = resultFiles[i];
        //                     tempFiles.push({
        //                         fileName:file.fileName,
        //                         filePath:file.fileId,
        //                         url:commonUtil.ImageHostAddress+file.fileId,
        //                         fileId:file.fileId,
        //                         type:type,
        //                         srcFileName:file.fileName});
        //                 }
        //                 let attachList = this.state.attachList;
        //                 let modifyImgs = attachList[selectIndex];
        //                 modifyImgs.list = modifyImgs.list.concat(tempFiles);
        //                 this.setState({
        //                     attachList:attachList
        //                 })
        //
        //
        //             }
        //             else{
        //                 Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
        //             }
        //         }
        //     }
        // })

        // }catch (e) {
        //
        // }
    }
    imageChange(selectIndex,type,files, operType, operIndex, myType){
        let {dispatch,attachList} = this.props;
        if(operType=='add')//表示添加图片
        {
            let image = files[files.length-1];
            // console.log('image4444',image)
            // console.log('myType4444',myType)
            if(image.file.size > 5000000){//5M 5000000
                Toast.fail('文件大小超出限制',3);
                return;
            }
            if(myType === 'l'){
                console.log('image.file.type',image.file.type)
                if ((image.file.type).indexOf('image/jpeg') === -1) {
                    Toast.fail('请上传正确格式的合同签署页资料,资料格式为jpg或者jpeg', 3);
                    return
                }
            }

            dispatch({
                type:'payProofModel/uploadTradeCommonFiles',
                payload:{
                    params:{},
                    images:[{
                        file:image.file
                    }],
                    backMethord:(data)=>{
                        if(data&&data.code=='00'&&data.model) {
                            let resultFiles = data.model,tempFiles= [];
                            for(let i=0;i<resultFiles.length;i++)
                            {
                                let file = resultFiles[i];
                                tempFiles.push({
                                    fileName:file.fileName,
                                    filePath:file.fileId,
                                    url:commonUtil.ImageHostAddress+file.fileId,
                                    fileId:file.fileId,
                                    type:type,
                                    srcFileName:file.fileName});
                            }
                            let attachList = this.state.attachList;
                            let modifyImgs = attachList[selectIndex];
                            modifyImgs.list = modifyImgs.list.concat(tempFiles);
                            this.setState({
                                attachList:attachList
                            })


                        }
                        else{
                            Toast.fail(data&&data.message?data.message:'图片上传错误!',3);
                        }
                    }
                }
            });
        }
        else if(operType=='remove')//表示移除图片
        {
            let attachList = this.state.attachList;
            let modifyImgs = attachList[selectIndex];
            let file = modifyImgs.list[operIndex];
            // console.log(file)
            dispatch({
                type:'payProofModel/deleteLocalFile',
                payload:{
                    path:file.fileId,
                    backMethord:(data)=>{
                        if(data&&data.code=='00') {
                            modifyImgs.list.splice(operIndex,1)
                            this.setState({
                                    attachList:attachList
                                }
                            )
                        } else{
                            Toast.fail(data&&data.message?data.message:'图片删除错误!',2);
                        }
                    }
                }
            });
        }
    }
    submitFiles(){
        let {dispatch} = this.props;
        let files = this.state.attachList[0].list;
        if(this.state.attachList[0].list.length >0){
            dispatch({
                type:'payProofModel/remitUploadSubmit',
                payload:{
                    files:files,
                    backMethord:(data)=>{
                        if(data&&data.code=='00'){
                            dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                                    successTitle:'提交成功!',
                                    backTitle:'返回打款凭证列表',
                                }}));
                        }else{
                            Toast.fail(data&&data.message?data.message:'网络错误!',2);
                        }
                    }
                },
            })
        }else{
            Toast.info('请先添加凭证资料',2)
        }

    }
    render(){
        const titleProps = {
            title:'打款凭证详情'
        }
        let {rowData} = this.props.payProofModel;
        console.log(this.props.payProofModel)
        return(
            <div className={styles.detail}>
                <Title {...titleProps} />
                <div className={styles.contractInfo}>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>合同编号</p>
                        <p className={styles.text_02}>{rowData.contNo}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>订单编号</p>
                        <p className={styles.text_02}>{rowData.orderNo}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>份额类别</p>
                        <p className={styles.text_02}>{rowData.prodExpiName}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>客户名称</p>
                        <p className={styles.text_02}>{rowData.custName}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>证件类型</p>
                        <p className={styles.text_02}>{rowData.certTypeName}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>证件号码</p>
                        <p className={styles.text_02}>{rowData.certNo}</p>
                    </div>
                    <div className={styles.info00}>
                        <p className={styles.text_01}>交易类型</p>
                        <p className={styles.text_02}>{rowData.tradCodeName}</p>
                    </div>
                </div>
                <WhiteSpace />
                <div>
                    <PushImg fileUploadParams={this.state.fileUploadParams} dataSource={this.state.attachList} onChange={this.imageChange.bind(this)} dispatch={this.props.dispatch}/>
                </div>
                <div className={styles.submitBtn}>
                    <button onClick={this.submitFiles.bind(this)} type="button">提交</button>
                </div>
            </div>
        )
    }
}
function getProps({payProofModel}) {
    return {payProofModel}
}
export default connect(getProps)(ProofDetail);
