import React, { Component } from 'react'
import timelineStyle from './timeline.less'

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={timelineStyle.outline}>
        <p className={timelineStyle.firstp}>操作流水</p>
        <div className={timelineStyle.container}>
          {this.props.timeLineList && this.props.timeLineList.map((item, index) => {
            return (
              <div className={timelineStyle.timelineItem} key={index}>
                <p className={index === 0 ? timelineStyle.circleOpt : timelineStyle.circle} />
                <h1>{item.operTypeName ? item.operTypeName : item.operType}&nbsp;{item.chkStatName ? item.chkStatName : item.chkStat}</h1>
                <p>
                  {item.remark}
                </p>
                <p>
                  {item.creator}&nbsp;{item.createTime}
                </p>
                {index === this.props.timeLineList.length - 1 ? null : <p></p>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
