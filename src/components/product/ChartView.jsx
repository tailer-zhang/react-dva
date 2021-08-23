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
         let {type} = this.props;
         let option = {
                 title: {
                     show:false
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
                        orginX = orginX-135;
                       // 固定在顶部
                       return [orginX, '10%'];
                     },
                     backgroundColor:'#f22f33',
                     formatter:function (params, ticket, callback) {
                       if(chartData.data.length<=0)
                       return '';
                       let valueArr = params[0].value;
                       if(!valueArr||valueArr.length<=0)
                         return '';
                       return type =='annualRate'?params[0].name+'<br/>'+params[0].value + '%' : params[0].name+'<br/>'+params[0].value
                     }
                 },
                 legend: {
                 },
                 toolbox: {
                 },
                 grid: {
                    containLabel: true,
                    backgroundColor:'f00',
                    left:'6%',
                    right:'3%',
                    top:'3%',
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
                                 type:'dashed'
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
                         type : 'value',
                         scale:true,
                         axisLine:{
                             show:false,
                             lineStyle:{
                                 color:'#ff0000',
                                 type:'dashed'
                             },
                         },
                          axisLabel:{
                                 margin:10,
                                 textStyle:{
                                     color:'#848484',
                                     fontSize:11*window.dpr
                                 },
                                formatter:  type =='annualRate'?'{value}%':'{value}'
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
                     }
                 ],
                 series : [
                     {
                         name:'',
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
                               color:'#f0000000'
                           },
                         },
                         data:chartData.data,
                         lineStyle:{
                             normal:{
                                 color:'#f22f33',
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
      // console.log('----打印chartData---',chartData);
      // console.log('----打印chartData的data---',chartData.data);
      if(!data||!data.data||!data.data.length){
          return (
              <EmptyChartView></EmptyChartView>
          );
      }
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
