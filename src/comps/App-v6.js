import React from 'react'; 

// import jquery from 'jquery';
// import popper from 'popper.js';
// import bootstrap from 'bootstrap';
import './App.css';
import './LinkInput.css';

/**
 * TODO APP:
 * ---------
 * 
 * Step 6:  
 * - Sorting
 * - reorganising (dragging)
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
		this.handleItemChange = this.handleItemChange.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
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

	handleItemChange(event, index) {
		event.preventDefault();
		// console.log('>>>>handleItemChange', this.state.items, ' | index = ', index, ' | xxx = ', event.target.value);

		const items = this.state.items.slice();
		items[index].text = event.target.value;
		this.setState(prevState => ({
			items: items
		}));
	}

	handleItemDelete(event, index) {
		event.preventDefault();
		let items = this.state.items.slice();
		items.splice(index, 1); //remove item
		this.setState(prevState => ({
			items: items
		}));
		// console.log('>>>>handleItemDelete  | index = ', index, ' | xxx = ', items.splice(index, 1)  );

	}

	render() {
		let { items, text } = this.state;
		return(
			<section> 
	    		<h3>TODO</h3>
			    <TodoList items={items} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} />
			    <Form text={text} items={items} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
			</section>
		);
	};	
}





class LinkInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputVisible: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this); 
	}

	//Hides link and display input when:
	handleClick(event) {
		event.preventDefault(); 
		this.setState({
			inputVisible: !this.state.inputVisible
		});
	} 

	//Hides input and display link when:
	//user leaves input (blur), user press 'escape' or 'enter'
	handleKeyPress(event) {   console.log('>>>event.type=', event.type);
		if( event.key && (event.key.toLowerCase()==='enter' || event.key.toLowerCase()==='escape') || event.type==='blur'){
			this.setState({
				inputVisible: false
			});
		}
	}
	

	render() {
		let { value, index, ...others } = this.props;
		return(
			<li className="link-input"> 
				{ 
					!this.state.inputVisible && <a href="#" onClick={this.handleClick}>{value}</a>
				}
				{
					this.state.inputVisible &&  
					<input className="form-control" value={value} 
					// onKeyPress={this.handleKeyPress} 
					onKeyDown={this.handleKeyPress} 
					onBlur={this.handleKeyPress} 
					{...others}
					autoFocus={true} /> 
				}

				<button type="button" className="btn btn-danger link-input__btn-delete" 
				onClick={(event)=>others.handleItemDelete(event, index)}>
					<i className="fas fa-minus-circle"></i>
				</button>
			</li>
		);
	}
}





//Todo list component
//(Display the list of items)
//Gets items via props...
const TodoList = props => {
	const { items, handleItemChange, handleItemDelete } = props;
	return(
		<ul className="todo-list">
			{
				items.map((item, index)=> 
					<LinkInput key={item.id} value={item.text} index={index}
					onChange={(event)=>handleItemChange(event, index)} 
					handleItemDelete={handleItemDelete} /> 
				)
			} 	
	    </ul>
    );
}






//Form component
//(Processes item submission)
//get text value, and event handlers via props ...
const Form = props => {
	let { text, items, handleSubmit, handleChange } = props;
	return(
		<form onSubmit={(event)=>handleSubmit(event)}> 
	      	<label htmlFor="todo-input">What needs to be done?</label>
	      	<div className="form-row">
		        <div className="col-sm-9"> 
		          	<input type="text" className="form-control" id="todo-input" onChange={(event)=>handleChange(event)} value={text} />
		        </div>
		        <div className="col">
		          	<button type="submit" className="btn btn-block btn-primary">Add #{items.length+1}</button>
		        </div>
	      	</div>
	    </form>
	);
}





//...
export default App;