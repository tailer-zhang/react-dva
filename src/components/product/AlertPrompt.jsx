import React,{Component} from 'react';
import { Link,routerRedux } from 'dva/router';
import {Tool} from '../../utils/tools';
import copy from 'copy-to-clipboard';
import styles from '../../styles/product/collectFlow.less';

// const AlertPrompt = () =>{
//
    // return(
    //     <div className={styles.alert} style={defineStyle}>
    //         <div className={styles.alertBody}>
    //             <div>
    //                 <section>
    //                     <span>已为您生成分享链接</span>
    //                     <p>{copyLinkText}</p>
    //                     <img src={require("../../image/product/icon_seal.png")}/>
    //                     <i>内部资料，严禁外传</i>
    //                 </section>
    //             </div>
    //
    //             <section className={styles.btnAlert + " " + styles.clearBox}>
    //                 <p onClick={closeMethord}>不分享了</p>
    //                 <p onClick={toCopyMethord}>去粘贴</p>
    //             </section>
    //         </div>
    //     </div>
    // )
// }


class  AlertPrompt extends Component{
    constructor(props) {
        super(props);
    }

    render(){
         let {defineStyle,closeMethord,toCopyMethord,copyLinkText} = this.props;
         return(
             <div className={styles.alert} style={defineStyle} id={this.props.id}>
                 <div className={styles.alertBody}>
                     <div>
                         <section>
                             <span>已为您生成分享链接</span>
                             <p>{copyLinkText}</p>
                             <img src={require("../../image/product/icon_seal.png")}/>
                             <i>内部资料，严禁外传</i>
                         </section>
                     </div>

                     <section className={styles.btnAlert + " " + styles.clearBox}>
                         <p onClick={closeMethord}>不分享了</p>
                         <p onClick={toCopyMethord}>去粘贴</p>
                     </section>
                 </div>
             </div>
         )

    }
}

export default AlertPrompt;
