import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link ,NavLink , Switch } from "react-router-dom"
import {MovieHome , Daily, Weekly} from '../pages/index'
import { Navbar, Nav ,NavItem } from 'react-bootstrap'
import '../css/resourceRouter.css'

const highlight ={
     fontSize: '2rem' 
}

class Welcome extends Component {
   

    _navInstace = () =>{
        return   <Navbar >
         <Navbar.Header className = "mainNav">
             <Navbar.Brand >
                 <NavItem href="/" to="/">HOME</NavItem>
             </Navbar.Brand>
             </Navbar.Header>
             <Nav className = "subNav">
                 <NavItem componentClass={Link} href="/movie" to="/movie">INFO</NavItem>
                 <NavItem componentClass={Link} href="/movie/daily/" to="/movie/daily/">DailyBoxoffice</NavItem>
                 <NavItem componentClass={Link} href="/movie/weekly/" to="/movie/weekly/">WeeklyBoxofficeChart</NavItem>
            </Nav>
          </Navbar>
    }

    render() {
              
        return(
            <div className="resourceRouter">
                <div>{this._navInstace()}</div>
                
                {/* <h1>Welcome Movie page</h1>
                 <ul>
                    <li><NavLink exact to="/movie" activeStyle={highlight}>Info</NavLink></li>
                    <li><NavLink to="/movie/daily/" activeStyle={highlight}>DailyBoxoffice</NavLink></li>
                    <li><NavLink to="/movie/weekly/" activeStyle={highlight}>WeeklyBoxofficeChart</NavLink></li>
                 </ul> */}
                     
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
