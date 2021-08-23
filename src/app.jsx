import React, {Component} from 'react';
import {connect} from 'dva';
import watermark from './watermark'
import {Tool} from "./utils/tools";


class app extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        let {dispatch} = this.props;
        let params = Tool.GetRequest();
        let userObj = {
            userId: params.userId,
            childToken: params.token,
            childRefreshToken: params.rtoken
        }
        Tool.localItem('UserToken', JSON.stringify(userObj));
        let hashLocation = window.location.hash;
        if(hashLocation.indexOf('version')>-1 ){
            Tool.localItem('productMenuContract', '3.0');
            Tool.localItem('tradeMainContract', '3.0');
        }
        dispatch({
            type: 'main/getUserName',
            payload: {
                backMethod: (data) => {
                    let cnName = data
                    watermark.initialize({
                        watermark_txt0: cnName,
                        watermark_txt1: params&&params.userId || '000042',
                        watermark_txt : "海银财富",
                        watermark_id: 'root'
                    });
                },
            },
        });
    }

    render() {
        return(
            <div style={{height:'100%'}}>
                {this.props.children}
            </div>
        )
    }
}

function connectMain({main})
{
    return {main};
}
export default connect(connectMain)(app);


