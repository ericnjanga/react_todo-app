import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

/**
 * TODO APP:
 * ---------
 * 
 * Step 1: 
 * - Break UI into hierarchical components
 * - (Use only functional components for now)
 *
 * Hierarchy:
 * - App
 * -- TodoList
 * -- Form
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
	return <p>Todo List Component</p>
}

//Form component
//(Processes item submission)
const Form = props => {
	return <p>Form Component</p>
}

//...
export default App;