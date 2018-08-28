import React, {Component} from 'react'
import { Cpu , Mem , Tcp , Summary } from '../pages/index'

import '../css/resource.css'

class Board extends Component {

    render() {
        
        return(
            <div className="board">

                <div className="boardBody"><Cpu fixSize={true}></Cpu></div>
                <div className="boardBody"><Tcp fixSize={true}></Tcp></div>
                <div className="boardBody"><Mem fixSize={true}></Mem></div>
                <div className="boardBody"><Summary ></Summary></div>
                
            </div>
        )
    }
}

export default Board;
