import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux'; 		// vanilla redux added 2.4; middleware 5.3
import { Provider } from 'react-redux'; 	// react-redux store provision in 3.2
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 5.3 logger middleware to show state before and after action hits reducer
const logger = store => next => action => {
	console.group(action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.groupEnd(action.type);
	return result;
};

const store = createStore(
	reducer,
 	composeEnhancers(applyMiddleware(logger))
); 	// Redux store and the devtools extension check added in 2.4; enhancer/middleware in 5.3

// vanilla redux store added 2.4 removed 3.2
// ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// react-redux Provider to pass store between components
ReactDOM.render(
	<Provider store={store}><App/></Provider>,
	document.getElementById('root')
);
