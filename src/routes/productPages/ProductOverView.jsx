import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import CollectFlow from '../../components/product/CollectFlow';//募集流程

class ProductOverView extends Component{

    constructor(props){
        super(props);
        this.state={
            selectHref:'-1',//缺省值
        }
    }

    showHref(linkHref,isShow){
        if(isShow){
            this.setState({
                selectHref:linkHref
            });
        }
        else return this.state.selectHref === linkHref;
    }

    transformCurrentStateToIndex(currentState){
      //   1：待上线 2：募集期 3：存续期  4：已到期
        if(currentState=='2'){
            return 0;
        }
        else if(currentState=='3'){
            return 1;
        }
        else if(currentState=='4'){
            return 2;
        }
        else return undefined;
    }


    render(){
        let {dispatch,location} = this.props;
        let {lineMapp,prdStage,detail} = location.state;

        return (
            <CollectFlow data={lineMapp} currentState={this.transformCurrentStateToIndex(prdStage)} detail={detail}
                 dispatch={dispatch} showHrefFunc={this.showHref.bind(this)} />
        );
    }
}

export default connect(({xtProduct})=>{
    return {xtProduct};
})(ProductOverView);
