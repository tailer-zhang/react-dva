import React from 'react';
import { List, Radio } from 'antd-mobile';


const RadioItem = Radio.RadioItem;

const AddList = React.createClass({
  getInitialState() {
    return {
      value: 1,
    };
  },
  onChange(value) {
    this.setState({
      value,
    });
  },
  render() {
    const { value } = this.state;
    const data = [
      { value: 0, label: '111' },
      { value: 1, label: '222' },
      { value: 2, label: '333' },
    ];
    return (<div>
      <List>
        {data.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </RadioItem>
        ))}
      </List>
    </div>);
  },
});

export default AddList;
