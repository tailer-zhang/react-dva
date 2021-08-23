import React, { Component } from 'react'
import recordStyle from '../style/record.less'

export default class PrintLog extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={recordStyle.outline}>
        <div className={recordStyle.container}>
          {this.props.logList && this.props.logList.map((item, index) => {
            return (
              <div className={recordStyle.timelineItem} key={index}>
                <p className={recordStyle.circle} />
                <h1>{item.createTime}</h1>
                <div className={recordStyle.content}>
                  <div>{item.srcFileName}</div>
                  <div>打印人:{item.creator}</div>
                </div>
                {index === this.props.logList.length - 1 ? null : <p></p>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
