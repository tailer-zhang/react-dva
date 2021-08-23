import React, {Component, PropTypes} from 'react';
// import { Router, Route, IndexRoute, Link } from 'react-router';
// import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import {formatDate} from '../../utils/formatUtils';
import EmptyChartView from '../share/emptyChartView';
import moment from 'moment';
// import {processNavList} from '../../action/product';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */

 export default class ChartView extends Component {
     constructor(props) {
         super(props);
     }

     getOtion(chartData) {
         console.log('===dddddfsfsd==',chartData);
         let option = {
                 title: {
                     show:false
                 },
                 legend: {
                    data:['七日年化','万份收益'],
                   top:0,
                   textStyle:{
                     color:'#848484',
                     fontSize:11*window.dpr
                   }
                 },
                 tooltip : {
                     trigger: 'axis',
                     axisPointer:{
                         type:'line',
                         lineStyle:{
                             color:'#f22f33',
                             type:'solid',
                         }
                     },
                     textStyle:{
                       fontSize:11*window.dpr
                     },
                     position:function (point, params, dom) {
                       let orginX = point[0];
                       if(orginX+150>=window.screen.width-50)
                        orginX = orginX-150;
                       // 固定在顶部
                       return [orginX, '10%'];
                     },
                     backgroundColor:'#f22f33',
                     formatter:function (params, ticket, callback) {
                         if(!params||params.length<=0)
                            return '';
                    //    let valueArr = params[0].value;
                       console.log('==dddsssss==',params);
                    //    if(!valueArr||valueArr.length<=0)
                    //    return '';
                      let firstItem = ''+params[0].name;
                       for(let item of params){
                           if(item.seriesName =='七日年化')
                              firstItem = firstItem + '<br/>七日年化:'+item.value+'%';
                           else if(item.seriesName =='万份收益')
                              firstItem = firstItem + '<br/>万份收益:'+item.value+'元';
                       }
                       return firstItem;
                     }
                 },
                 toolbox: {
                 },
                 grid: {
                    containLabel: true,
                    backgroundColor:'f00',
                    left:'6%',
                    right:'6%',
                    top:'20%',
                    bottom:'3%'
                 },
                 xAxis : [
                     {
                         type : 'category',
                         scale:true,
                         boundaryGap : false,
                         data : chartData.navdt,
                         axisLine:{
                             show:true,
                             lineStyle:{
                                 width:1,
                                 color:'#848484',
                                 type:'solid'
                             },
                         },
                          axisLabel:{
                                 margin:10,
                                 textStyle:{
                                     color:'#848484',
                                     fontSize:11*window.dpr,
                                 },
                                rotate:45,
                                 formatter:function (value, index) {
                                        return moment(value,'YYYY-MM-DD').format('MM-DD');
                                 }
                          },
                          axisTick:{
                              show:false
                          },
                     }
                 ],
                 yAxis : [
                     {
                         name:'七日年化(%)',
                         nameGap:15,
                         nameTextStyle:{color:'#848484',fontSize:11*window.dpr,},
                         type : 'value',
                         scale:true,
                         axisLine:{
                             show:true,
                             lineStyle:{
                                 color:'#ff0000',
                                 type:'solid'
                             },
                         },
                          axisLabel:{
                                 margin:10,
                                 textStyle:{
                                     color:'#848484',
                                     fontSize:11*window.dpr
                                 },
                                 formatter: '{value} %'
                          },
                          axisTick:{
                              show:false
                          },
                          splitLine:{
                             show:false,
                             lineStyle:{
                                 color:'#848484',
                                 type:'dashed'
                             }
                          }
                     },
                     {
                         name:'万份收益(元)',
                         nameTextStyle:{color:'#848484',fontSize:11*window.dpr,},
                         nameGap:15,
                         type : 'value',
                         scale:true,
                         axisLine:{
                             show:true,
                             lineStyle:{
                                 color:'#848484',
                                 type:'solid'
                             },
                         },
                          axisLabel:{
                                 margin:10,
                                 textStyle:{
                                     color:'#848484',
                                     fontSize:11*window.dpr
                                 },
                                 formatter: '{value}'
                          },
                          axisTick:{
                              show:false
                          },
                          splitLine:{
                             show:true,
                             lineStyle:{
                                 color:'#848484',
                                 type:'dashed'
                             }
                          }
                     },
                 ],
                 series : [
                     {
                         name:'七日年化',
                         type:'line',
                         stack: '',
                         areaStyle: {normal: {
                             color:'#fff7ee',
                         }},
                         symbol:'roundRect',
                         itemStyle:{
                           normal:{
                               color:'#f22f33'
                           },
                           emphasis:{
                               color:'#f22f33'
                           },
                         },
                         data:chartData.sevenAge,
                         lineStyle:{
                             normal:{
                                 color:'#f22f33',
                                 type:'solid',
                                 width:1*window.dpr
                             }
                         },

                     },
                     {
                         name:'万份收益',
                         yAxisIndex:1,
                         type:'line',
                         stack: '',
                         areaStyle: {normal: {
                             color:'#fff7ee',
                         }},
                         symbol:'roundRect',
                         itemStyle:{
                           normal:{
                               color:'#848484'
                           },
                           emphasis:{
                               color:'#848484'
                           },
                         },
                         data:chartData.milProfit,
                         lineStyle:{
                             normal:{
                                 color:'#333333',
                                 type:'solid',
                                 width:1*window.dpr
                             }
                         },

                     }
                 ]
             };
         return option;
     }


     render() {
      //  let chartData = this.props.data;
      let {data} = this.props;
      if(!data||((!data.milProfit||!data.milProfit.length)&&(!data.sevenAge||!data.sevenAge.length))){
          return (
              <EmptyChartView></EmptyChartView>
          );
      }
      // console.log('----打印chartData的data---',chartData.data);
       return (
         <ReactEcharts
           option={this.getOtion(data)}
           style={{height: '5.333333rem', width: '100%',paddingBottom:0}}
           className='react_for_echarts'
         />
         );
     }
 }



 // return (
 //       <ReactEcharts
 //           option={this.getOtion(chartData)}
 //           style={{height: '5.333333rem', width: '100%',paddingBottom:0}}
 //           className='react_for_echarts' />
 //   );
