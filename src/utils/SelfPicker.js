import React,{Component} from 'react';
import { Tabs, WhiteSpace,List,InputItem,Switch,DatePicker,Toast,TextareaItem,Picker} from 'antd-mobile';

export default class  SelfPicker extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let props = this.props;
        let newValue = [];
        newValue[0] = props.value;

        return (
            <Picker {...props} value={newValue}>{this.props.children}</Picker>
        );
    }
}
