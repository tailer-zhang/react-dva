import React, {Component, PropTypes} from 'react';
// import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
// import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */

 export default class TradeCountChart extends Component {
     constructor(props) {
         super(props);
     }

     getOtion(chartData,colorsArr) {
         if(!colorsArr){
             colorsArr = ['#39d8dc','#ffca6b','#ff7777','#87abfd'];
         }
         let option = {
                  tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)",
                      textStyle:{
                        fontSize:11*window.dpr
                      }
                  },
                  color:colorsArr,
                  series: [
                        {
                            name:chartData.name,
                            type:'pie',
                            radius: ['50%', '65%'],
                            // center:['50%','61%'],
                            label: {
                              normal: {
                                show: true,
                                textStyle:{
                                  fontSize:11*window.dpr
                                },
                                position: 'outside'
                              }
                            },
                            labelLine: {
                              normal: {
                                  show: true,
                                  smooth: true
                              }
                            },
                            data:chartData.data
                        }

                    ],
                    // textStyle:{
                    //   fontSize:11*window.dpr
                    // }
                };
         return option;
     }
     render() {
      let {data,colorsArr} = this.props;
       return (
         <ReactEcharts
           option={this.getOtion(data,colorsArr)}
           style={{height: '4.3rem', width: '100%',paddingBottom:0}}
           className='react_for_echarts'
         />
         );
     }
 }

 // ,this.props.style
