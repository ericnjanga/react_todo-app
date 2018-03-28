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