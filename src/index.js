import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './comps/App-v5';

// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));



import TextAutoEdit from './comps/TextAutoEdit/TextAutoEdit.js';
import './comps/TextAutoEdit/TextAutoEdit.css';
const item = {
	id: 0,
	text:'Jamiroquai - Cloud 9'
},
index = 10;
ReactDOM.render( <TextAutoEdit key={item.id} value={item.text} index={index} /> ,  document.getElementById('root') );






// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.focusTextInput = this.focusTextInput.bind(this);
//   }

//   focusTextInput() {
//     // Explicitly focus the text input using the raw DOM API
//     this.textInput.focus();
//   }

//   render() {
//     // Use the `ref` callback to store a reference to the text input DOM
//     // element in an instance field (for example, this.textInput).
//     return (
//       <div>
//         <input
//           type="text"
//           ref={(input) => { this.textInput = input; }} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput}
//         />
//       </div>
//     );
//   }
// }

// const comp = <CustomTextInput />;

// ReactDOM.render( <CustomTextInput /> ,  document.getElementById('root') );


// console.log('>>>>>comp.textInput=', comp.textInput);



/**

Jamiroquai - Cloud 9
Pharrel William - Marilyn Monroe
Jay Z - 99 Problems
Jamiroquai - White Knuckle Ride
Sean Paul - She Doesn't Mind
French Montana - Unforgettable ft. Swae Lee
French Montana - No Shopping ft. Drake
Drake - God’s Plan
Drake - Hold On, We’re Going Home ft. Majid Jordan

**/