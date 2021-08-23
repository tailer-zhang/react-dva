import React from 'react';
import FlowInfoType from '../../components/product/FlowInfoType';

import style from '../../styles/product/collectFlow.less';

class FlowBlack extends React.Component{
  constructor(props){
    super(props);
    this.state={
        offsetHeight:0,
    }
    console.log('==subData==',props.data);
  }
  componentDidMount()
  {
    this.setState({
      offsetHeight:this.refs.blockHeight.offsetHeight,
    });
  }

  renderSubItem(subItem,index){
      let {dispatch,showHrefFunc,shareFileFunc,openFileFunc} = this.props;
      return (
          <FlowInfoType key={index} data={subItem}  dispatch={dispatch}
              shareFileFunc={shareFileFunc} openFileFunc={openFileFunc}  showHrefFunc={showHrefFunc}/>
      );
  }

  renderRow(item,index){
    let sunLable = item.sunLable || []
      let {dispatch,showHrefFunc,shareFileFunc,openFileFunc} =this.props;
      return (
          <div key={index}>
              <section  className={style.flowBlack} >
                <i></i>
                <p className={style.flowTime}>{item.lineDate}</p>
                <span className={style.after}></span>
                <div style={{position:'relative'}}>
                    {
                        item.subLable&&typeof(item.subLable)=='object'?item.subLable.map((subItem, index)=>{
                          let {dispatch,showHrefFunc,shareFileFunc,openFileFunc} = this.props;
                          return (
                            <FlowInfoType key={index} data={subItem}  dispatch={dispatch} sunLable={sunLable} myIndex={index}
                                          shareFileFunc={shareFileFunc} openFileFunc={openFileFunc}  showHrefFunc={showHrefFunc}/>
                          );
                        }):<FlowInfoType data={item} sunLable={sunLable}
                        dispatch={dispatch}  showHrefFunc={showHrefFunc}  shareFileFunc={shareFileFunc} openFileFunc={openFileFunc}/>
                    }
                </div>
              </section>
          </div>
      );
  }

  render()
  {
    let blockHeight = this.state.offsetHeight;
    let {data} = this.props;
    // console.log("data是否存在",data);
    return(
      <div className={style.autoBlack} ref={'blockHeight'}>
        <p className={style.autoLine}>
        {
           !data||data.length<=0?<i style={{height:blockHeight}}><img src={require("../../image/product/collect_01.png")}/></i>:<i style={{height:blockHeight}}>
           <img src={require("../../image/product/collect_01.png")}/>
           <img src={require("../../image/product/collect_01.png")}/>
           <img src={require("../../image/product/collect_01.png")}/>
          </i>
        }
        </p>
        <span className={style.clear}></span>
        {
            data.map(this.renderRow.bind(this))
        }
        <span className={style.clear}></span>
      </div>
    );
  }
}

export default FlowBlack;
