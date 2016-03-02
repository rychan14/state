import { createStore } from 'redux'
import roundRobinApp from './reducers/reducers.js'
import { addPlayer, completedSet, addSet } from './actions/actions.js'

let store = createStore(roundRobinApp)

const playerAdd = document.createElement('button'),
			playerInput = document.createElement('input'),
			playerForm = document.createElement('form'),
			setup = document.createElement('div'),
			add = document.createTextNode('+'),
			playerList = document.createElement('ul'),
			table = document.createElement('div')

playerAdd.setAttribute('id', 'playerAdd')
playerAdd.setAttribute('type', 'submit')
playerInput.setAttribute('id', 'playerInput')
playerInput.setAttribute('autofocus', '')
playerForm.setAttribute('id', 'playerForm')
setup.setAttribute('id', 'setup')
playerList.setAttribute('id', 'playerList')
table.setAttribute('id', 'matchup')

document
	.body
		.appendChild(setup)
			.appendChild(playerForm)
				.appendChild(playerInput)
				.parentNode.insertBefore(playerAdd, playerInput.nextSibling)
					.appendChild(add)
		.parentNode.parentNode.parentNode.appendChild(playerList)
document
	.body
		.appendChild(table)

class Player {
	constructor(params) {
		this.tag = params.tag
	}
}

class PlayerForm {
	constructor(data) {
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
		//Only if pulling from an existing store
		//this.store.getState().players.map(player => {
		//	let tag = document.createTextNode(player.tag),
		//			list = document.createElement('li')
		//	this.ele.appendChild(list).appendChild(tag)
		//})
	}
	update() {
		let list = this.ele
		while (list.lastChild) { list.removeChild(list.lastChild) }
		console.log(store.getState())
		this.store.getState().players.map(player => {
			let	listItem = document.createElement('li'),
					tag = document.createTextNode(player.tag)
			listItem.appendChild(tag)
			list.appendChild(listItem)
		})
	}
}

class SetList {
	constructor(data) {
		const contDiv = document.createElement('div'),
					list = document.createElement('ul'),
					genBtn  = document.createElement('div'),
					genBtnText = document.createTextNode('Generate')
		this.ele = data.ele
		this.store = data.store
		genBtn.setAttribute('id', 'genBtn')
		genBtn.appendChild(genBtnText)
		contDiv.setAttribute('id', 'container')
		contDiv.appendChild(genBtn)
		data.ele.appendChild(contDiv)
		store.subscribe(this.generate.bind(this))
		genBtn.addEventListener('click', function() {
			contDiv.insertBefore(list, genBtn)
		})
	}
	generate() {
		let origArr = this.store.getState().players.map(player => player.tag),
				arr1 = origArr.slice(),
				arr2 = origArr.slice()
		arr1.sort(() => 0.5 - Math.random())
		arr2.sort(() => 0.5 - Math.random())
		while (arr1.length) {
			var name1 = arr1.pop(),
					name2 = arr2[0] == name1 ? arr2.pop() : arr2.shift();
    }
		this.store.getState().sets.map(set => {
			let listItem = document.createElement('li')
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
	const setList = new SetList({
		ele: document.querySelector('#matchup'),
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
