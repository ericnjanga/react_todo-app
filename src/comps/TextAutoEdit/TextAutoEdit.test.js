import React from 'react';
import ReactDOM from 'react-dom';
import TextAutoEdit from './TextAutoEdit';
// import './TextAutoEdit.css';

it('renders [TextAutoEdit] without crashing', () => {

	const testRoot = document.createElement('div'),
	item = {
		id: 0,
		text:'Jamiroquai - Cloud 9'
	},
	index = 10;
	ReactDOM.render( 
		<TextAutoEdit key={item.id} value={item.text} index={index} />,  
		testRoot 
	); 
  	ReactDOM.unmountComponentAtNode(testRoot);

});