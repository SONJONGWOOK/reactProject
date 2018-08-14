import React from 'react'
import ReactDOM1 from 'react-dom'
import 'babel-polyfill'
import Resource from './client/resourceRoot'
import './style.css';

let rootElement = document.getElementById('resource')

ReactDOM1.render(<Resource/>, rootElement)
