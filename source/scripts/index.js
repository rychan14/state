import { createStore } from 'redux'
import roundRobinApp from './reducers/reducers.js'
import { addPlayer, completedSet, addSet } from './actions/actions.js'

let store = createStore(roundRobinApp)

const playerAdd = document.createElement('button'),
			playerInput = document.createElement('input'),
			playerForm = document.createElement('form'),
			setup = document.createElement('div'),
			add = document.createTextNode('+'),
			playerList = document.createElement('ul')

playerAdd.setAttribute('id', 'playerAdd')
playerAdd.setAttribute('type', 'submit')
playerInput.setAttribute('id', 'playerInput')
playerInput.setAttribute('autofocus', '')
playerForm.setAttribute('id', 'playerForm')
setup.setAttribute('id', 'setup')
playerList.setAttribute('id', 'playerList')

document
	.body
		.appendChild(setup)
			.appendChild(playerForm)
				.appendChild(playerInput)
				.parentNode.insertBefore(playerAdd, playerInput.nextSibling)
					.appendChild(add)
		.parentNode.parentNode.parentNode.appendChild(playerList)

class Player {
	constructor(params) {
		this.tag = params.tag
	}
}

class PlayerForm {
	constructor(data) {
		let id = 0
		data.ele.querySelector('#playerAdd').addEventListener('click', e => {
			e.preventDefault()
			let player = new Player({
				tag: data.ele.querySelector('#playerInput').value,
			})
			data.store.dispatch(addPlayer(player))
			data.ele.querySelector('#playerInput').value = ''
		})
	}
}

class PlayerList {
	constructor(data) {
		this.ele = data.ele
		this.store = data.store
		store.subscribe(this.update.bind(this))
		this.store.getState().players.map(player => {
			let tag = document.createTextNode(player.tag),
					list = document.createElement('li')
			this.ele.appendChild(list).appendChild(tag)
		})
	}
	update() {
		let list = this.ele
		console.log(store.getState())
		while (list.lastChild) { list.removeChild(list.lastChild) }
		this.store.getState().players.map((player, index) => {
			let	listItem = document.createElement('li'),
					tag = document.createTextNode(player.tag)
			listItem.appendChild(tag)
			list.appendChild(listItem)
		})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const listofPlayers = new PlayerList({
		ele: document.querySelector('#playerList'),
		store
	})
	const form = new PlayerForm({
		ele: document.querySelector('#playerForm'),
		store
	})
})

//console.log(store.getState())
//
//let unsubscribe = store.subscribe(() =>
//  console.log(store.getState())
//)
//
//store.dispatch(addPlayer('ARCH'))
//store.dispatch(addPlayer('IBALD'))
//store.dispatch(addSet('2-1'))
//store.dispatch(completedSet(0))
//store.dispatch(addSet('1-2'))
//store.dispatch(completedSet(1))
//
//unsubscribe()
