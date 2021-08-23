import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

// import CircleComponent from '../components/product/CircleProgress';
// import Filter from '../components/product/Filter';


// const TestSVG = ()=>{
//     return (
//        <div style={{backgroundColor:'green'}}>
//         <CircleComponent style={{padding:20,width:440,height:440}} borderWidth={10}
//         titleStyle={{font:"normal bold 30px arial,serif",fontSize:30,color:'#00ff00'}}
//         progressColor={"#ff0000"}
//         unFillColor={"#f1f2f3"}
//         fillColor={"#ffff00"}
//          title={'售罄'}  angle={200} />
//        </div>
//     );
// }

const TestSVG = () => {
  return (
      <div style={{height:'100%'}}>
      </div>
  );
};

export default TestSVG;

// import { Drawer, List, NavBar } from 'antd-mobile';

// const App1 = React.createClass({
//   getInitialState() {
//     return {
//       open: false,
//       position: 'left',
//     };
//   },
//   onOpenChange(isOpen) {
//     console.log(isOpen, arguments);
//     this.setState({ open: !this.state.open });
//   },
//   render() {
//     const sidebar = (<List>
//       {[...Array(20).keys()].map((i, index) => {
//         if (index === 0) {
//           return (<List.Item key={index}
//             thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//             multipleLine
//           >分类</List.Item>);
//         }
//         return (<List.Item key={index}
//           thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
//         >分类{index}</List.Item>);
//       })}
//     </List>);

//     const drawerProps = {
//       open: this.state.open,
//       position: this.state.position,
//       onOpenChange: this.onOpenChange,
//     };
//     return (<div style={{ height: '100%' }}>
//       <NavBar iconName="ellipsis" onLeftClick={this.onOpenChange}>基本</NavBar>
//       <Drawer
//         className="my-drawer"
//         sidebar={sidebar}
//         dragHandleStyle={{ display: 'none' }}
//         contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
//         {...drawerProps}
//       >
//         请点击左上角图标
//       </Drawer>
//     </div>);
//   },
// });

// export default App1;
