import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom"
import {ResourceHome , Cpu , Mem , Tcp , Board} from '../pages/index'
// import { Navbar, Nav ,NavItem } from 'react-bootstrap'
import '../css/resourceRouter.css'
import { Nav, NavItem, NavLink , NavbarBrand , Navbar  } from 'reactstrap';

class Welcome extends Component {

    _navInstace = () =>{
       return<Navbar color="light" light expand="md" >
                <NavbarBrand href="/">HOME</NavbarBrand>
             {/* <Navbar.Header>
            <Navbar.Brand >
                <NavItem href="/" to="/">HOME</NavItem>
            </Navbar.Brand>
            </Navbar.Header> */}
            <Nav className="ml-auto" navbar >
                <NavItem>
                    <NavLink tag={Link} to="/resource">INFO</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/resource/board">BOARD</NavLink>            
                </NavItem>
                <NavItem>
                    <NavLink tag={Link}  to="/resource/cpu">CPU</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link}  to="/resource/mem">MEM</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link}  to="/resource/tcp">TCP</NavLink>
                </NavItem>
           </Nav>
         </Navbar> 
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
