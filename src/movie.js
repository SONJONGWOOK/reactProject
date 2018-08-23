import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'isomorphic-fetch'
import Movie from './client/Root'

import './style.css';

let rootElement = document.getElementById('movie')
ReactDOM.render(<Movie/>, rootElement)

