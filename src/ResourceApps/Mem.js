import React, { Component } from 'react';
import {_draw , _nameSpace}  from '../Chartlib/line'
import {_check} from './comm'
import '../css/resource.css'
import loading from '../../asset/loading.gif'
import { Panel } from 'react-bootstrap'

class Mem extends Component {
    constructor(props) {
      super(props)
      let interval
      let nameSpace1
      let nameSpace2
      this.state = {
        fatching : false,
        viewLine : [] , 
        y :  ['memTotal' , 'memAvailable' ,'heapTotal' , 'heapUsed' , 'external' ,  'rss']
    }
  }
  componentDidMount(){
    let initViewLine = this.state.y.map( (key) => {
      return key
    })
    this.setState({
      viewLine : initViewLine
    })

    this._getData()
     this.interval = setInterval( ()=> {   
      this._getData()
    } , 10000 )
    
  }
  componentWillUnmount() {
    console.log('Mem willunmount')
    clearInterval(this.interval)
  }

  _checkBoxOnclick = (key , check) => {
   
    let viewList = this.state.viewLine
    _check(key,check,viewList)
     this.setState({
      viewLine : viewList,
    })
  }

  _callApi = () =>{
    return  fetch('http://jsplays.iptime.org:3000/monitor/findMem/120')
    // return  fetch('http://localhost:3001/monitor/findMem/120')
    // return  fetch('http://localhost:3000/monitor/findMem/120')
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
  
  _makeNameSpace =  (axis) => {

      return _nameSpace(axis).map( (name , index) =>{
      
      let checkBox = <span>&#x2611;</span>
      let check = true
      if(!this.state.viewLine.includes(name.name)){
        check = false
        checkBox = <span>&#x2610;</span>
      }
      return <div key={index}  className="nameSpaceCheck">
                 <font color={name.color}><span id={name.name} onClick={ () => this._checkBoxOnclick(name.name , check) } >{checkBox}</span></font>
                 <font color="black">{name.name}</font>
               </div>
      })
  }
  _renderChart = () =>{

    if(this.props.fixSize){
      this._renderChartBoard()

    }else{
      this.nameSpace1 = this._makeNameSpace(['memTotal' , 'memAvailable' ])
      this.nameSpace2 = this._makeNameSpace(['heapTotal' , 'heapUsed' , 'external' ,  'rss'])
      
      let axis = {
          x : 'date',
          y : ['memTotal' , 'memAvailable' ],
          // y : this.state.y ,
          viewY : this.state.viewLine ,
          yMax : 1000000
      }
      _draw("mem1" , this.state.data , axis)

      axis = {
        x : 'date',
        y : ['heapTotal' , 'heapUsed' , 'external' ,  'rss'],
        // y : this.state.y ,
        viewY : this.state.viewLine ,
        yMax : 200000
              
    }
    _draw("mem2" , this.state.data , axis)
  }

  }

  _renderChartBoard = () =>{

    this.nameSpace1 = this._makeNameSpace(['memTotal' , 'memAvailable' , 'heapTotal' , 'heapUsed' , 'external' ,  'rss' ])
   
    let axis = {
        x : 'date',
        // y : ['memTotal' , 'memAvailable' ],
        y : this.state.y ,
        viewY : this.state.viewLine ,
        yMax : 1000000
    }
    _draw("mem1" , this.state.data , axis)
   }


  render() {

    return (
      
      <div className={this.props.fixSize ? "resource resize" : "resource" }>
        {this.state.data ? this._renderChart() : <img className="loading" src={loading}/>}
        <Panel bsStyle="info">
        <Panel.Heading>
            <Panel.Title componentClass="h1" className="header">MEM</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
          <div className={this.props.fixSize ? "nameSpace display-none" : "nameSpace"}>{this.nameSpace1}</div>
            <div className="canvas">  <canvas className="chart"  id="mem1" height="600" width="1200"></canvas></div>
            <div className={this.props.fixSize ? "nameSpace display-none" : "nameSpace"}>{this.nameSpace2}</div>
            <div className={this.props.fixSize ? "canvas display-none" : "canvas"   }><canvas className="chart" id="mem2" height="600" width="1200"></canvas></div>
          </Panel.Body>
        </Panel>
      
    
     </div>
      )
    }
  
}
export default Mem;
