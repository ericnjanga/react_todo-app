import ReactTestUtils from 'react-dom/test-utils';

import React from 'react';
import ReactDOM from 'react-dom';
import TextAutoEdit from './TextAutoEdit';

// import { shallow, mount, render } from 'enzyme';

//Basic init ...
const 	testRoot = document.createElement('div'),
		data = {
			id: 0,
			text:'Jamiroquai - Cloud 9'
		},
		index = 10,
		testedComponent = <TextAutoEdit key={data.id} value={data.text} index={index} />



describe('A suite', function() {
	//Make sure component renders properly without crashing
	it('renders [TextAutoEdit] without crashing', () => { 
		ReactDOM.render( 
			testedComponent,  
			testRoot 
		); 
	  	ReactDOM.unmountComponentAtNode(testRoot);
	});


	const rendered = ReactTestUtils.renderIntoDocument(
        testedComponent
    );


	it('--->>>', () => { 
	    const btns = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'a');


		// ReactTestUtils.Simulate.click(btns, {type:'click', index:13});
		// expect(rendered.state.editMode).toEqual(true);

	    console.log('>>>>>>btns=', btns);
	});


	// ReactDOM.scryRenderedDOMComponentsWithTag



	// //Make sure 
	// it('should be selectable by class "TextAutoEdit"', () => { 
 //    	expect(shallow(testedComponent).is('.foo')).toBe(true);
	// });


});



// //Make sure 
// it('renders [TextAutoEdit] without crashing', () => { 

// 	// ReactDOM.render( 
// 	// 	testedComponent,  
// 	// 	testRoot 
// 	// ); 



// 	// ReactDOM.findDOMNode(testedComponent);

// 	// ReactReactTestUtils.Simulate.click(testedComponent);


// 	console.log('...======>>>>', testedComponent.find);


//   	// ReactDOM.unmountComponentAtNode(testRoot);
// });