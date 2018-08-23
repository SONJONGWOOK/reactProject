import React, {Component} from 'react'
import { Cpu , Mem , Tcp} from '../pages/index'
import '../css/resource.css'

class Board extends Component {

    render() {
        return(
            <div className="board">
                <Cpu fixSize={true}></Cpu>
                <Mem fixSize={true}></Mem>
                <Tcp fixSize={true}></Tcp>
                
            </div>
        )
    }
}



export default Board;
