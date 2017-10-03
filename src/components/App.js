import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions'; 	// redux action creators
import { capitalize } from '../utils/helper'; 					// added 4.4 for calendar grid
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'; 	// added 4.4 for calendar grid
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';		// added 4.4 for modal
import Modal from 'react-modal'; 											// added 4.4 for modal
import Loading from 'react-loading'; 									// added 4.4 for modal
import { fetchRecipes } from '../utils/api'; 					// added 4.4 for modal
import FoodList from './FoodList'; 										// added 4.4 for modal
import ShoppingList from './ShoppingList'; 						// added 4.4 for modal
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
	// 4.4 dealing with modal and API
	state = {
		foodModalOpen: false,
		meal: null,
		day: null,
		food: null,
		loadingFood: false,
		ingredientsModalOpen: false
	};

	// 4.4 methods to handle modal, loading modal and storing food array from API
	openFoodModal = ({ meal, day }) => {
		this.setState(() => ({
			foodModalOpen: true,
			meal,
			day
		}));
	};
	closeFoodModal = () => {
		this.setState(() => ({
			foodModalOpen: false,
			meal: null,
			day: null,
			food: null
		}));
	};
	searchFood = (e) => {
		if (!this.input.value) {
			return;
		}
		e.preventDefault();
		this.setState(() => ({loadingFood : true}));
		fetchRecipes(this.input.value)
		.then((food) => this.setState(() => ({
			food, 		// 4.4 array; we will Redux store the spec food on selection
			loadingFood: false
		})));
	};
	openIngredientsModal = () => this.setState(() => ({ingredientsModalOpen: true}));
	closeIngredientsModal = () => this.setState(() => ({ingredientsModalOpen: false}));
	generateShoppingList = () => {
		// get all meals and push them into a single array
		return this.props.calendar.reduce((result, { meals }) => {
			const { breakfast, lunch, dinner } = meals;
			breakfast && result.push(breakfast);
			lunch && result.push(lunch);
			dinner && result.push(dinner);
			return result;
		}, [])
		.reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), []); 	// flatten the array
	};

	// mapped props and grid layout 4.4
	render() {
		const { foodModalOpen, loadingFood, food, ingredientsModalOpen } = this.state;
		const {calendar, remove, selectRecipe } = this.props;
		const mealOrder = ['breakfast', 'lunch', 'dinner'];
		return (
			<div className="container">
				<div className="nav">
					<h1 className="header">Udacimeals</h1>
					<button
						className="shopping-list"
						onClick={this.openIngredientsModal}
					>Shopping List
					</button>
				</div>
				<ul className="meal-types">
					{mealOrder.map(mealType => (
						<li key={mealType} className="subheader">{capitalize(mealType)}</li>
					))}
				</ul>
				<div className="calendar">
					{/* create row header for each day */}
					<div className="days">
						{calendar.map(({ day }) => <h3 key={day} className="subheader">{capitalize(day)}</h3>)}
					</div>
					{/* map over calendar again to create list of meals for each day */}
					<div className="icon-grid">
						{calendar.map(({ day, meals }) => (
							<ul key={day}>
								{mealOrder.map((meal) => (
									<li key={meal} className='meal'>
										{meals[meal]
											? <div className="food-item">
												<img src={meals[meal].image} alt={meals[meal].label} />
												<button onClick={() => remove({meal, day})}>Clear</button>
											  </div>
											: <button onClick={() => this.openFoodModal({meal, day})} className="icon-btn">
												<CalendarIcon size={30} />
											  </button>
										}
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
					<Modal
			      className='modal'
			      overlayClassName='overlay'
			      isOpen={foodModalOpen}
			      onRequestClose={this.closeFoodModal}
			      contentLabel='Modal'
			    >
			      <div>
			        {loadingFood === true
			          ? <Loading delay={200} type='spin' color='#222' className='loading' />
			          : <div className='search-container'>
			              <h3 className='subheader'>
			                Find a meal for {capitalize(this.state.day)} {this.state.meal}.
			              </h3>
			              <div className='search'>
			                <input
			                  className='food-input'
			                  type='text'
			                  placeholder='Search Foods'
			                  ref={(input) => this.input = input}
			                />
			                <button
			                  className='icon-btn'
			                  onClick={this.searchFood}>
			                    <ArrowRightIcon size={30}/>
			                </button>
			              </div>
			              {food !== null && (
			                <FoodList
			                  food={food}
			                  onSelect={(recipe) => {
			                    selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
			                    this.closeFoodModal()
			                  }}
			                />)}
			            </div>}
			      </div>
			    </Modal>

			    <Modal
			      className='modal'
			      overlayClassName='overlay'
			      isOpen={ingredientsModalOpen}
			      onRequestClose={this.closeIngredientsModal}
			      contentLabel='Modal'
			    >
			      {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
			    </Modal>
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