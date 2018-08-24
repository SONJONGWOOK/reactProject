import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'isomorphic-fetch'
import './style.css';
import './css/resourceRouter.css'
import { Navbar, Nav ,NavItem } from 'react-bootstrap'

class Index extends Component {

  _navInstace = () =>{

    return   <Navbar >
     <Navbar.Header className = "mainNav">
         <Navbar.Brand >
             <NavItem href="/" to="/">HOME</NavItem>
         </Navbar.Brand>
         </Navbar.Header>
         <Nav className = "subNav">
             <NavItem href="/resource/" to="/resource.">Resource</NavItem>
             <NavItem href="/movie/" to="/movie/">Movie</NavItem>
            
        </Nav>
      </Navbar>
}
    render() { 
        

        return (
        <div>
             <div>{this._navInstace()}</div>
        </div>
        )
      }
}

let rootElement = document.getElementById('index')
ReactDOM.render(<Index/>, rootElement)

