import React, { Component } from 'react';
// import { addRecipe, removeFromCalendar } from '../actions'; // vanilla redux removed 3.2
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
				<input
					type='text'
					ref={(input) => this.input=input}
					placeholder="Monday's Breakfast"
				/>
				<button onClick={this.submitFood}>Submit</button>
				<pre>
					Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
				</pre>
			</div>
		);
	}
}

export default App;
