import { ADD_PLAYER, ADD_SET, COMPLETED_SET } from '../actions/actions'
import { combineReducers } from 'redux'

function sets(state = [], action) {
	switch(action.type) {
		case ADD_SET:
			return [...state,
				{
					matchup: action.matchup,
					completed: false
				}
			]
		case COMPLETED_SET:
			return [
					...state.slice(0, action.index),
					{...state[action.index],...{completed: true}},
					...state.slice(action.index + 1)
			]
		default:
			return state
	}
}

function players(state = [], action) {
	switch(action.type) {
		case ADD_PLAYER:
			return [...state,
				{
					tag: action.tag,
					id: action.id
				}
			]
		default:
			return state
	}
}

const roundRobinApp = combineReducers({
	players,
	sets
})

export default roundRobinApp
