import React from 'react';
export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentWillMount() { // 生命周期中的方法
        console.log('will mount');
    }
    componentDidMount() {
        console.log('did mount');
    }
    componentWillReceiveProps(props) { // 接收父组件传递过来的属性值
        console.log('will props' + props.name);
    }
    shouldComponentUpdate() {
        console.log('should update');
        return true;    // true之后，后面的周期才会继续执行
    }
    componentWillUpdate() {
        console.log('will update');
    }
    componentDidUpdate() {
        console.log('Did update');
    }
    render() {
        return <div>
            <p>子组件声明周期</p>
            {this.props.name}
        </div>
    }
}