import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions'; 	// redux action creators
import '../App.css';

class App extends Component {

/* Redux lesson 2 - build a vanilla redux setup from scratch
	Removed in lesson 3; use react-redux Provider instead!
	state = {
		calendar: null
	};

	// added to sync with store updates in 2.5
	// - note: normally React-Redux handles this
	componentDidMount() {
		const {store} = this.props;
		console.log(store);
		store.subscribe(() => {
			this.setState(() => ({
				calendar: store.getState()
			}));
		});
	}

	// added to dispatch an action to update the store in 2.5
	// - note: typically React-Redux handles this
	submitFood = () => {
		this.props.store.dispatch(addRecipe({
			day: 'monday',
			meal: 'breakfast',
			recipe: {
				label: this.input.value
			}
		}));
		this.input.value = '';
	};
*/

	render() {
		return (
			<div>
				<input type='text' ref={(input) => this.input=input} placeholder="Monday's Breakfast" />
				<button onClick={this.submitFood}>Submit</button>
				<pre>
					Breakfast for Monday: {this.props.calendar && this.props.calendar.monday && this.props.calendar.monday.breakfast}
				</pre>
			</div>
		);
	}
}

// react-redux getting updates from the store in lesson 3.4
// 	note that with 2 reducers, we're now getting calendar as well as food as an object!
function mapStateToProps({calendar, food}) {
	const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	
	// recreate store calendar as an array to display in shape of a grid on the page
	return {
		calendar: dayOrder.map((day) => (
			{
				day,
				meals: Object.keys(calendar[day]).reduce((meals, meal) => {
					meals[meal] = calendar[day][meal]
						? food[calendar[day][meal]] 	// updated 4.2 for combineReducers
						: null
					return meals
				}, {})
			})),
	};
}

// optional "clean" action dispatch methods added in lesson 3.4
function mapDispatchToProps(dispatch) {
	return {
		selectRecipe: (data) => dispatch(addRecipe(data)),
		remove: (data) => dispatch(removeFromCalendar(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
	summary:
		- connect() connects 2 things: the store and a component
		- a container component connects store to your component, giving it slices of state via props
		- currying is fundamental to understanding the connect method
		- compare connect to subscribe for use and behavior
		https://stackoverflow.com/questions/41963225/redux-subscribe-vs-mapstatetoprops/41963751#41963751
 */