import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

var allItems = [];
allItems.push("Create a todo react app");
allItems.push("Update trello board");
allItems.push("Give a demo");

class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.addEvent = this.addEvent.bind(this);
    }
    getInitialState() {
        return { allItems };
    }
    render() {
        var items = this.props.items.map((item) => {
            return <li><TodoItem item={item} /></li>;
        })

        return(
            <div>
                <ul>{items}</ul>
                <p><NewTodoItem addEvent={this.addEvent} /></p>
            </div>
        );
    }
    addEvent(todoItem){
        allItems.push(todoItem.newItem);
        this.setState({ allItems });
    }
}

class TodoItem extends React.Component {
    render(){
        return <div>{this.props.item}</div>;
    }
}

class NewTodoItem extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.itemName).focus();
    }
    render(){
        return (<form onSubmit={this.onSubmit}>
    <input ref="itemName" type="text" />
            </form>);
    }
    onSubmit(event){
        event.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.itemName)
        var newItem = input.value;
        this.props.addEvent({ newItem });
        input.value = '';
    }
}

ReactDOM.render(<TodoList items={allItems}/>, document.getElementById('root'));
