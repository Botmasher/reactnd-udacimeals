import {
	ADD_RECIPE,
	REMOVE_FROM_CALENDAR
} from '../actions';

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

export default calendar;
