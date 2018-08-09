import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link ,NavLink , Switch } from "react-router-dom"
import {ResourceHome , Cpu , Mem , Tcp} from '../pages/index'

const highlight ={
     fontSize: '2rem' 
}

class Welcome extends Component {
   
    render() {
              
        return(
            <div>
                <h1>Resoruce page</h1>
                 <ul>
                    <li><NavLink exact to="/resource" activeStyle={highlight}>Info</NavLink></li>
                    <li><NavLink to="/resource/cpu/" activeStyle={highlight}>Cpu</NavLink></li>
                    <li><NavLink to="/resource/mem/" activeStyle={highlight}>Mem</NavLink></li>
                    <li><NavLink to="/resource/tcp/" activeStyle={highlight}>Tcp</NavLink></li>
                 </ul>
                     
                <Route exact path="/resource" component = {ResourceHome} />
                <Route path="/resource/cpu/" component ={Cpu}/>
                <Route path="/resource/mem/" component ={Mem}/>
                <Route path="/resource/tcp/" component ={Tcp}/>
            </div>
        )
    }
}



export default Welcome;
