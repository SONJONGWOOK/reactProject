import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'isomorphic-fetch'
import  Schedule from './ScheduleApps/Schedule'
// import './style.css';

let rootElement = document.getElementById('schedule')

ReactDOM.render(<Schedule/>, rootElement)
