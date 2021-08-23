import React, { Component } from 'react'
import recordsStyle from '../../styles/customer/recordsStyle.less'

export default class ApprProgress extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    let { progressList } = this.props
    return (
      <div className={recordsStyle.outline}>
        <div className={recordsStyle.container}>
          {progressList.map((item, index) => {
            return (
              <div className={recordsStyle.timelineItem} key={index}>
                <p className={recordsStyle.leftWords}>{item.createTime.split(' ')[0]}<br/>{item.createTime.split(' ')[1]}</p>
                <p className={index === 0 ? recordsStyle.circleOpt : recordsStyle.circle} />
                <h1>{item.creator} {item.operType}</h1>
                <p style={{color: '#999999'}}>
                  {item.remark || ''}
                </p>
                <p>&nbsp;</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
