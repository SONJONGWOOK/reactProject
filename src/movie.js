import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import Movie from './client/Root'
import Resource from './client/resourceRoot'
import './style.css';

let rootElement = document.getElementById('movie')
let test = document.getElementById('test')

ReactDOM.render(<Resource/>, rootElement)
ReactDOM.render(<Resource/>, test)
// ReactDOM.render(<Resource/>, document.getElementById('resource'))

