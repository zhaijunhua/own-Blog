import React from 'react';
import Demo1 from './Demo2'
export default class Demo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }; // state进行调用值
    }
    add = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    reduce() {
        this.setState({
            count: this.state.count -1
        })
    }
    render() {
        return (
        <div>
            <p>生命周期</p>
            <button onClick={this.add}>按钮</button>
            <button onClick={this.reduce.bind(this)}> 需要使用bind绑定</button>
            <p>{this.state.count}</p>
            <Demo1 name={this.state.count}></Demo1>
        </div>
        );
    }
}