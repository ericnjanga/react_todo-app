import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

/**
 * TODO APP:
 * ---------
 * 
 * Step 4: 
 * - Establish minimal UI state (TodoList and Form)
 * Problem: The way the current state is organized prevents it to be shared between both components
 *
 ** Eric Njanga (March 2018) *
 *****************************
*/ 
const App = props => {
	return(
		<section> 
    		<h3>TODO</h3>
		    <TodoList />
		    <Form />
		</section>
	); 
}

//Todo list component
//(contains array of items state)
class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
		};
	}
	render() {
		const { items } = this.state;
		return(
			<ul className="todo-list">
				{
					items.map(item=>
						<li key={item}>{item}</li>
					)
				} 	
		    </ul>
	    );
	}
}

//Form component
//(Processes item submission)
//(contains a value state)
class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//Save target value each time there is a change
	handleChange(event) {
		this.setState({ text:event.target.value });
	}

	//Supposed to save new value in items[] (state)
	//** Problem: Cannot communicate with <TodoList /> state with the current state origanisation
	//(prevent any empty value)
	handleSubmit(event) {
		event.preventDefault();
		if(!this.state.text.length){
			return;
		}
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}> 
		      	<label htmlFor="todo-input">What needs to be done?</label>
		      	<div className="form-row">
			        <div className="col-sm-9"> 
			          	<input type="text" className="form-control" id="todo-input" onChange={this.handleChange} value={this.state.text} />
			        </div>
			        <div className="col">
			          	<button type="submit" className="btn btn-block btn-primary">Add #item</button>
			        </div>
		      	</div>
		    </form>
	    );
	}
}

//...
export default App;