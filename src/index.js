import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import Root from './client/Root'
import './style.css';

let rootElement = document.getElementById('root')

ReactDOM.render(<Root/>, rootElement)
