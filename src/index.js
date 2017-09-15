import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux'; 		// vanilla redux added 2.4
import { Provider } from 'react-redux'; 	// react-redux store provision in 3.2
import reducer from './reducers';

const store = createStore(
	reducer,
 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 	// Redux store and the devtools extension check added in 2.4

// vanilla redux store added 2.4 removed 3.2
// ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// react-redux Provider to pass store between components
ReactDOM.render(
	<Provider store={store}><App/></Provider>,
	document.getElementById('root')
);
