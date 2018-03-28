import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

/**
 * TODO APP:
 * ---------
 * 
 * Step 4:  
 * - Establish where the state will reside: 
 * - <App /> will host the state because it is the immediate parent of <TodoList /> and <Form /> which both share the same state
 * - (Only App is becoming a stateful component)
 *
 ** Eric Njanga (March 2018) *
 *****************************
*/ 

//Main component
//Contains the state, major logic (event handlers that controls form submission and input change)
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
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
		if(!this.state.text.trim().length){
			this.setState(prevState => ({ 
				text: ''
			})); 
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		}; 
		this.setState(prevState => ({
			items: prevState.items.concat(newItem),
			text: ''
		}));
	}

	render() {
		let { items, text } = this.state;
		return(
			<section> 
	    		<h3>TODO</h3>
			    <TodoList items={items} />
			    <Form text={text} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
			</section>
		);
	};	
}


//Todo list component
//(Display the list of items)
//Gets items via props...
const TodoList = props => {
	const { items } = props;
	return(
		<ul className="todo-list">
			{
				items.map(item=>
					<li key={item.id}>{item.text}</li>
				)
			} 	
	    </ul>
    );
}


//Form component
//(Processes item submission)
//get text value, and event handlers via props ...
const Form = props => {
	let { text, handleSubmit, handleChange } = props;
	return(
		<form onSubmit={(event)=>handleSubmit(event)}> 
	      	<label htmlFor="todo-input">What needs to be done?</label>
	      	<div className="form-row">
		        <div className="col-sm-9"> 
		          	<input type="text" className="form-control" id="todo-input" onChange={(event)=>handleChange(event)} value={text} />
		        </div>
		        <div className="col">
		          	<button type="submit" className="btn btn-block btn-primary">Add #item</button>
		        </div>
	      	</div>
	    </form>
	);
}

//...
export default App;