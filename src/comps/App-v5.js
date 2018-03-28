import React from 'react'; 
import moment from 'moment';
 
import './App.css';

import TextAutoEdit from './TextAutoEdit/TextAutoEdit.js';
import './TextAutoEdit/TextAutoEdit.css';




/**
 * TODO APP:
 * ---------
 * 
 * Step 5:  
 * - Turning each item into link (when clicked, generate popover that allows to edit or delete item)
 * - Add a delete button for each
 * - Add Bootstrap tooltip on "linlks" and "delete" buttons
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
	}

	render() {
		let { items, text } = this.state;
		return(
			<section className="todo">  
	    		<header className="todo__hero">
	    			<h1 className="todo__hero__title">My Tasks Today</h1>
	    			<h2 className="todo__hero__subtitle">{ moment().format('MMM D, YYYY') }</h2>
	    		</header>
			    <TodoList items={items} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} />
  
			    <Form text={text} items={items} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
			</section>
		);
	};	
}//App





// class TextAutoEdit extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			inputVisible: false
// 		};
// 		this.handleClick = this.handleClick.bind(this);
// 		this.handleKeyPress = this.handleKeyPress.bind(this); 
// 		this.displayTooltip = this.displayTooltip.bind(this);
// 	}

// 	//Hides link and display input when:
// 	handleClick(event) {
// 		event.preventDefault(); 
// 		this.setState({
// 			inputVisible: !this.state.inputVisible
// 		}); 
// 		this.displayTooltip(false);			
// 	} 

// 	displayTooltip(value) {
// 		const thisNode = ReactDOM.findDOMNode(this);
// 		console.log('displayTooltip:', thisNode, ' ||| value=', value);
// 		if(value){
// 			$(thisNode).find('[data-toggle="tooltip"]').tooltip();
// 		}else{
// 			console.log('>>>>>>', $(thisNode).find('[data-toggle="tooltip"]').html() );
// 			$(thisNode).find('[data-toggle="tooltip"]').tooltip('dispose');
// 		}
// 	}

// 	//Hides input and display link when:
// 	//user leaves input (blur), user press 'escape' or 'enter'
// 	handleKeyPress(event) {
// 		if( event.key && (event.key.toLowerCase()==='enter' || event.key.toLowerCase()==='escape') || event.type==='blur'){
// 			this.setState({
// 				inputVisible: false
// 			});
// 		}
// 	}
	
// 	componentDidMount() { 
// 		this.displayTooltip(true);
// 	}

// 	componentWillUnmount() {
// 	    console.log(' >>>>>> componentWillUnmount'); 
// 		this.displayTooltip(false);
// 	}

// 	componentDidUpdate(prevProps, prevState, prevContext) {
// 	    console.log(' >>>>>> componentDidUpdate', prevState.inputVisible, ' - this.state= ', this.state.inputVisible); 

// 	    if(prevState.inputVisible!==this.state.inputVisible){
// 			this.displayTooltip(prevState.inputVisible);
// 	    }
// 	}

// 	render() {
// 		let { value, index, handleItemDelete, ...others } = this.props;
// 		return(
// 			<div className="link-input"> 
// 				{ 
// 					!this.state.inputVisible && <a href="#" onClick={this.handleClick} 
// 					data-toggle="tooltip" data-placement="top" data-container="false" title="Click to edit">{value}</a>
// 				}
// 				{
// 					this.state.inputVisible &&  
// 					<input className="form-control" value={value} 
// 					// onKeyPress={this.handleKeyPress} 
// 					onKeyDown={this.handleKeyPress} 
// 					onBlur={this.handleKeyPress} 
// 					{...others}
// 					autoFocus={true} /> 
// 				}

// 				<button type="button" className="btn btn-danger link-input__btn-delete" 
// 				data-toggle="tooltip" data-placement="top" data-container="false" title="Click to delete" 
// 				onClick={(event)=>handleItemDelete(event, index)}>
// 					<i className="fas fa-minus-circle"></i>
// 				</button>
// 			</div>
// 		);
// 	}
// }





//Todo list component
//(Display the list of items)
//Gets items via props...
const TodoList = props => {
	const { items, handleItemChange, handleItemDelete } = props;
	return(
		<div>

			<table className="table table-striped todo__list">
				{
					/*<thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">TODO List</th> 
					    </tr>
					</thead>*/
				}
				<tbody> 
					{
						items.map((item, index)=>{ 
							return(
								<tr className="todo__list__item" key={item.id}>
			      					<th scope="row">{index + 1}</th>
			      					<td>
										<TextAutoEdit key={item.id} value={item.text} index={index}
										onChange={(event)=>handleItemChange(event, index)} 
										handleItemDelete={handleItemDelete} /> 
									</td>
								</tr>
							);
						})
					} 


					{ /*--- NO ITEMS IN THE LIST MESSAGE ---*/
						items.length===0 && <tr> 
						      					<td colSpan="2">
													No items in the list
												</td>
											</tr>

					}
				</tbody>
			</table>


			
		</div>
    );
}






//Form component
//(Processes item submission)
//get text value, and event handlers via props ...
const Form = props => {
	let { text, items, handleSubmit, handleChange } = props;
	return(
		<form className="todo__form" onSubmit={(event)=>handleSubmit(event)}> 
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