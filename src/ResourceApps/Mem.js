import React, { Component } from 'react';
import loading from '../../asset/loading.gif'
import {_draw}  from '../Chartlib/line'

class Mem extends Component {
    constructor(props) {
    let interval
    super(props)
    this.state = {
     
      fatching : false,

    }
  }
  componentDidMount(){
    console.log('Mem didunmount')
    this._getData()
     this.interval = setInterval( ()=> {   
      this._getData()
    } , 5000 )
    
  }
  componentWillUnmount() {
    console.log('Mem willunmount')
    clearInterval(this.interval)
    
  }

  _callApi = () =>{
    // return  fetch('http://jsplays.iptime.org:3000/monitor/findMem/120')
    // return  fetch('http://localhost:3001/monitor/findMem/120')
    return  fetch('http://localhost:3000/monitor/findMem/120')
    .then(data => data.json())
    //.then(jsonData => console.log(jsonData))
    .then(jsonData => jsonData)
    .catch(err => console.log(err))
    
  }
  _getData = async () => {
    let data = await this._callApi();
    this.setState ({
      data : data ,
      // fatching : true,
    })  
    
  }

  _renderChart = () =>{
    console.log(this.state.data)
    let axis = {
        x : 'date',
        // y : ['memTotal' , 'memAvailable' , 'heapTotal' ,  'rss'],
        y : ['memTotal' , 'memAvailable' ],
        yMax : 1000000
    }
    _draw("main" , this.state.data , axis)

    axis = {
      x : 'date',
      y : ['heapTotal' , 'heapUsed' , 'external' ,  'rss'],
      yMax : 150000
             
  }
  _draw("node" , this.state.data , axis)
  
     return <div>완료</div>
  }
  render() {
    console.log("랜더")
    return (
     <div className ="mem">
        <div>memTestPage</div>
        {this.state.data ? this._renderChart() : '로딩'}
        <div>
          <canvas className="mem"  id="main" height="600" width="1200"></canvas>
        </div>
        <div>
          <canvas className="mem"  id="node" height="600" width="1200"></canvas>
        </div>
     </div>
    )
  }
}

export default Mem;
