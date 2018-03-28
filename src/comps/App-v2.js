import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

/**
 * TODO APP:
 * ---------
 * 
 * Step 3: 
 * - Build static version
 * - (Just insert markup into components, no states, no methods)
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
//(Display the list of items)
const TodoList = props => {
	return(
		<ul className="todo-list">
	      	<li>item 1</li>
	      	<li>item 2</li>
	      	<li>item 3</li>
	      	<li>item 4</li>
	      	<li>item 5</li>
	    </ul>
	);
}

//Form component
//(Processes item submission)
const Form = props => {
	return(
		<form> 
	      	<label htmlFor="todo-input">What needs to be done?</label>
	      	<div className="form-row">
		        <div className="col-sm-9">
		          	<input type="text" className="form-control" id="todo-input" placeholder="Enter something to do" />
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