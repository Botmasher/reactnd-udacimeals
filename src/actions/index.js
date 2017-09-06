export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR';

/* Action creators 2.2
 * - functions for events that change the state of the store
 * - these intend to make the action objects testable and portable
 * - Udacimeals has two basic actions:
 * 		1) Add a recipe to the calendar
 * 		2) Remove a food item from the calendar
 */

export function addRecipe ({ day, meal, recipe }) {
	return {
		type: ADD_RECIPE,
		day,
		recipe,
		meal
	}
}

export function removeFromCalendar ({ day, meal }) {
	return {
		type: REMOVE_FROM_CALENDAR,
		day,
		meal
	}
}