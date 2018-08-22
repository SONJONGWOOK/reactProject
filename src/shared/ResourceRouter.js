import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link ,NavLink , Switch } from "react-router-dom"
import {ResourceHome , Cpu , Mem , Tcp , Board} from '../pages/index'
import { Navbar, Nav ,NavItem } from 'react-bootstrap'
import '../css/resourceRouter.css'

class Welcome extends Component {

    _navInstace = () =>{
       return   <Navbar >
        <Navbar.Header className = "mainNav">
            <Navbar.Brand >
                <NavItem href="/" to="/">HOME</NavItem>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav className = "subNav">
                <NavItem componentClass={Link} href="/resource" to="/resource">INFO</NavItem>
                <NavItem componentClass={Link} href="/resource/board" to="/resource/board">DASHBOARD</NavItem>
                <NavItem componentClass={Link} href="/resource/cpu" to="/resource/cpu">CPU</NavItem>
                <NavItem componentClass={Link} href="/resource/mem" to="/resource/mem">MEM</NavItem>
                <NavItem componentClass={Link} href="/resource/tcp" to="/resource/tcp">TCP</NavItem>
           </Nav>
         </Navbar>

          /* <Nav pullRight>
            <NavItem componentClass={Link} href="/resource" to="/resource">Home</NavItem>
            <NavItem componentClass={Link} href="/resource/cpu" to="/resource/cpu">Book Inv</NavItem>
           </Nav> */
  
    }
    render() {
        
        return(
            <div className="resourceRouter">
                <div>{this._navInstace()}</div>
                
               
                
                <div></div>
                    <Route exact path="/resource" component = {ResourceHome} />
                    <Route path="/resource/board/" component ={Board}/>
                    <Route path="/resource/cpu/" component ={Cpu}/>
                    <Route path="/resource/mem/" component ={Mem}/>
                    <Route path="/resource/tcp/" component ={Tcp}/>
               
                
            </div>
        )
    }
}



export default Welcome;
