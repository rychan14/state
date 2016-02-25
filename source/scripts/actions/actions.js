//Action Types

export const ADD_PLAYER = 'ADD_PLAYER'
export const ADD_SET = 'ADD_SET'
export const COMPLETED_SET = 'COMPLETED_SET'

//Action Creators
let playerId = 0
export function addPlayer(params) {
	return { type: ADD_PLAYER, tag: params.tag, id: playerId++ }
}

export function completedSet(index) {
	return { type: COMPLETED_SET, index }
}

export function addSet(score) {
	return { type: ADD_SET, score }
}
