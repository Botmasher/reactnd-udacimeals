import {
	ADD_RECIPE,
	REMOVE_FROM_CALENDAR
} from '../actions';
import { combineReducers } from 'redux';

const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
};

// add reducer function for 2 basic states in 2.3
function calendar (state=initialCalendarState, action) {
	switch (action.type) {
		case ADD_RECIPE:
			return {
				...state,
				[action.day]: {
					...state[action.day],
					[action.meal]: action.recipe.label 	// name of a recipe
				}
			}
		case REMOVE_FROM_CALENDAR:
			return {
				...state,
				[action.day]: {
					...state[action.day],
					[action.meal]: null 	// reset the specific meal to none
				}
			}
		default:
			return state;
	}
}

// add separate reducer for food section of state in 4.2 for combineReducers
// (separating store into { food, calendar } state pieces)
function food (state={}, action) {
  switch (action.type) {
    case ADD_RECIPE:
      const { recipe } = action;
      return {
        ...state,
        [recipe.label]: recipe
      };
    default:
      return state;
  }
}

//export default calendar;  // removed in 4.2 for combineReducers
export default combineReducers({food, calendar});   // takes obj with all reducers, in 4.2
