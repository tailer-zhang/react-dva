import React from 'react';
import manualStyles from '../../styles/trade/manual.less'
var arr = [
  {
    step: "选择私募产品",
    imageUrl: require('../../image/trade/click_private.png')
  },
  {
    head: '1 产品预约操作',
    step: "1.1选择产品预约",
    imageUrl: require('../../image/trade/click_preorder.png')
  },
  {
    step: "1.2选择一个可预约的产品",
    imageUrl: require('../../image/trade/click_orderOption.png')
  },
  {
    step: `1.3点击"立即预约"按钮`,
    imageUrl: require('../../image/trade/click_orderBtn.png')
  },
  {
    step: "1.4跳转到私募产品预约页面",
    imageUrl: require('../../image/trade/click_orderfillList.png')
  },
  {
    step: "1.5提交成功",
    imageUrl: require('../../image/trade/click_submitSucess.png')
  },
  {
    head: '2 查看我的产品预约操作',
    step: "2.1点击我的预约",
    imageUrl: require('../../image/trade/click_myOrder.png')
  },
  {
    step: "2.2跳转到我的预约列表",
    imageUrl: require('../../image/trade/click_myOrderList.png')
  },
  {
    step: `2.2.1点击"编辑"按钮，跳转到编辑页面`,
    imageUrl: require('../../image/trade/click_myorderChange.png')
  },
  {
    step: "2.2.2点击非编辑按钮部分，跳转到详情页面",
    imageUrl: require('../../image/trade/click_cancle.png')
  },
  {
    step: "2.2.3取消预约",
    imageUrl: require('../../image/trade/click_cancleAlert.png')
  },
  {
    head: '3 查看预约排队情况操作',
    step: "3.1点击预约排队情况",
    imageUrl: require('../../image/trade/click_queue.png')
  },
  {
    step: "3.2跳转的排队查询列表",
    imageUrl: require('../../image/trade/click_queueList.png')
  },
  {
    step: "3.3点击排队查询列表任意项 跳转到详情页面",
    imageUrl: require('../../image/trade/click_queueDetail.png')
  },
]
class OperationManual extends React.Component{
  constructor(props) {
    super(props);
  }

  render () {
    const titleProps = {
      title:'产品预约操作手册',
      showBack:'yes',
    };
    return (
      <div className={manualStyles.operBox}>
      {
        arr.map((item,index)=>{
          return(
            <div className={manualStyles.contain} key={index}>
              {item.head ? <p className={manualStyles.title}>{item.head}</p> : null}
              <p className={manualStyles.titleH2}>{item.step}</p>
              <img src={item.imageUrl}/>
            </div>
            )
        })
      }
      </div>
    );
  }
}

export default OperationManual;

// {
//   arr.map((item,index)=>{
//     return(
//       <div className={manualStyles.contain} key={index}>
//         {item.head ? <p className={manualStyles.title}>{item.head}</p> : null}
//         <p>{item.step}</p>
//         <img src={item.imageUrl}/>
//       </div>
//       )
//   })
// }
