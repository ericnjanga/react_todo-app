import React from 'react';
import ReactDOM from 'react-dom';

//Dependencies 
import $ from 'jquery'; 
import bootstrap from 'bootstrap'; 


/**
 * TextAutoEdit:
 * *************
 *
 * Job:
 * ---------------
 * Component which gives the possibility to edit/delete a text entry 
 *
 * UI Description:
 * ---------------
 * - Anchor tag
 * - Text node
 * - Input text 
 * - button (delete)
 *
 * How it works:
 * ---------------
 * - Text and most event handling functions are passed via props.
 * - Wraps the text entry in an anchor tag (<a />) and displays an optional delete button
 * - When user hovers the link, he is invited to click in order
 *
 * Event Handlers:
 * ---------------
 * - Hovers [Anchor tag] and [Delete button]:
 * - - Displays a Bootstrap tooltip (with descriptive text)
 *
 * - Click [Anchor tag]:
 * - - Anchor tag becomes into an input field and text becomes editable (if onChange handler is provided otherwise input field becomes readOnly)
 * - Click [Delete Buttons]:
 * - - props delete handler function is called otherwise local delete function is called (which does nothing)
**/

class TextAutoEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false
		};
		this.handleClick 				= this.handleClick.bind(this);
		this.handleKeyDown 				= this.handleKeyDown.bind(this); 
		this.toggleTooltipActivation 	= this.toggleTooltipActivation.bind(this);
		this.compHandleItemDelete 		= this.compHandleItemDelete.bind(this);
	}

	//Hides link and display input when:
	handleClick(event) {
		event.preventDefault(); 
		this.setState({
			editMode: !this.state.editMode
		}); 
		this.toggleTooltipActivation(false);			
	} 

	//Activate/delete tooltip... 
	toggleTooltipActivation(value) {
		const thisNode = ReactDOM.findDOMNode(this),
			selTooltip = '[data-toggle="tooltip"]'; 
 
		if(value){
			$(this.textLink).tooltip();
			$(this.btnDel).tooltip();
			// $(thisNode).find(selTooltip).tooltip();
		}else{ 
			$(this.textLink).tooltip('dispose');
			$(this.btnDel).tooltip('dispose');
			// $(thisNode).find(selTooltip).tooltip('dispose');
		}
	}

	//Hides input and display link when:
	//user leaves input (blur), user press 'escape' or 'enter'
	handleKeyDown(event) {
		if( event.key && (event.key.toLowerCase()==='enter' || event.key.toLowerCase()==='escape') || event.type==='blur'){
			this.setState({
				editMode: false
			});
		}
	}
	
	//Activate tooltip after component has been mounted
	componentDidMount() { 
		this.toggleTooltipActivation(true);
	}
	
	//Deactivate tooltip before component is unmounted
	componentWillUnmount() { 
		this.toggleTooltipActivation(false);
	}
	
	//Toggle tooltip activation when component updates (if there is a state change)
	componentDidUpdate(prevProps, prevState, prevContext) {
	    if(prevState.editMode!==this.state.editMode){
			this.toggleTooltipActivation(prevState.editMode);
	    }
	}

	//Local handle delete method
	compHandleItemDelete(event, index) {
		console.log('Handle delete [',event.type,', ',index,']')
	}

	render() {
		let { value, index, handleItemDelete, ...others } = this.props,
			readOnlyVal = others.onChange?false:true;
		//Pass prop "delete function" locally or keep 
		this.compHandleItemDelete = handleItemDelete?handleItemDelete:this.compHandleItemDelete;
		//... 

		return(
			<div className="TextAutoEdit"> 
				{	//[Edit mode]: Display input text (with text as value)
					this.state.editMode &&  
					<input className="form-control TextAutoEdit__input" value={value} onKeyDown={this.handleKeyDown} 
					onBlur={this.handleKeyDown} {...others} readOnly={readOnlyVal} autoFocus={true} /> 
				}
				{ 	//[non edit mode]: Display text as a link
					!this.state.editMode && <a href="#" onClick={this.handleClick} 
					data-toggle="tooltip" data-placement="top" data-container="false" title="Click to edit" 
					ref={(link) => this.textLink = link}>{value}</a>
				}

				<button type="button" className="btn btn-danger TextAutoEdit__btn-delete" 
				data-toggle="tooltip" data-placement="top" data-container="false" title="Click to delete" 
				onClick={(event)=>this.compHandleItemDelete(event, index)} 
					ref={(btn) => this.btnDel = btn}>
					<i className="fas fa-minus-circle"></i>
				</button>
			</div>
		);
	}
}



export default TextAutoEdit;