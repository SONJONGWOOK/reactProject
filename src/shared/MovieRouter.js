import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link ,NavLink , Switch } from "react-router-dom"
import {MovieHome , Daily, Weekly} from '../pages/index'

const highlight ={
     fontSize: '2rem' 
}

class Welcome extends Component {
   
  
    render() {
              
        return(
            <div>
                <h1>Welcome Movie page</h1>
                 <ul>
                    <li><NavLink exact to="/movie" activeStyle={highlight}>Info</NavLink></li>
                    <li><NavLink to="/movie/daily/" activeStyle={highlight}>DailyBoxoffice</NavLink></li>
                    <li><NavLink to="/movie/weekly/" activeStyle={highlight}>WeeklyBoxofficeChart</NavLink></li>
                 </ul>
                     
                <Route exact path="/movie" component = {MovieHome} />
                <Route path="/movie/daily/" component ={Daily}/>
                <Switch>
                    <Route path="/movie/weekly/:week" component ={Weekly}/>
                    <Route path="/movie/weekly/" component ={Weekly}/>
                </Switch>
            </div>
        )
    }
}



export default Welcome;
