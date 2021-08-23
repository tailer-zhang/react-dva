import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TodayProList from '../../components/product/TodayProList';
import TitleComp, { flushTitle } from 'react-title-component';
import styles from '../../styles/product/ProductMain.css';
import {Tool} from '../../utils/tools';

let myInter;
class TodayProduct extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      seconds: Tool.localItem("today_seconds"),
      tipText:'',
      props:props,
    };
    this.onStartChange = this.onStartChange.bind(this);
  }

  componentWillUnmount(){
    clearInterval(myInter);
    let {dispatch} = this.props;
    dispatch({type:'xtProduct/emptyTodayList'});
  }

  componentDidMount(){
    let seconds = this.state.seconds;

    console.log('onStartChange',seconds);

    if (seconds != 8) {
      if (seconds == 0) {
        let {dispatch} = this.state.props;
        dispatch({type:'xtProduct/fetchTodayProdRemote'});
      }

      if (seconds <= 0) {
        clearInterval(myInter);
        seconds = 8;
        this.state.seconds=8;
        Tool.localItem("today_seconds", 8);
      }

      function timer() {
        seconds--;
        console.log('onStartChange time',seconds);
        Tool.localItem("today_seconds", seconds);
        let tip = "请等待" + seconds + "秒";

        if (seconds === 0) {
          clearInterval(myInter);
          seconds = 8;
          this.state.seconds=8;
          Tool.localItem("today_seconds", 8);
          this.setState({
            tipText:'刷新',
          });
        } else {
          this.setState({
            seconds:seconds,
            tipText: tip,
          });
        }
      }

      timer.bind(this)();
      myInter = setInterval(timer.bind(this), 1000);
    } else {
      this.setState({
        tipText: '刷新',
      });
    }
  }

  onStartChange(){
    let seconds = this.state.seconds;

    if (seconds != 8 && seconds > 0) {
      return;
    }

    console.log('onStartChange',seconds);

    if (seconds == 8) {
      let {dispatch} = this.state.props;
      dispatch({type:'xtProduct/fetchTodayProdRemote'});
    }


    function timer() {
      seconds--;
      console.log('onStartChange time',seconds);
      Tool.localItem("today_seconds", seconds);
      let tip = "请等待" + seconds + "秒";

      if (seconds === 0) {
        this.state.seconds=8;
        Tool.localItem("today_seconds", 8);
        clearInterval(myInter);
        this.setState({
          tipText:'刷新',
        });
      } else {
        this.setState({
          seconds:seconds,
          tipText: tip,
        });
      }
    }

    timer.bind(this)();
    myInter = setInterval(timer.bind(this), 1000);
  }

  render()
  {
    let {xtProduct,bxProduct,dispatch,params} = this.props;
    let showIndex = (params.type =='bx'?1:0);
    let { seconds, tipText } = this.state;

    return (
      <div  style={{height: '100%',display: 'flex',flexDirection: 'column',position: 'relative'}}>
        <TitleComp render="产品"/>
        <div className={styles.renovate} onClick={()=>this.onStartChange()}>
          {( seconds > 0 ) ? tipText : "刷新"}
        </div>
        <TodayProList
          product = {showIndex==1?bxProduct:xtProduct}
          selectIndex = {showIndex}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

export default connect(({xtProduct})=>{
  return {xtProduct}
})(TodayProduct);
