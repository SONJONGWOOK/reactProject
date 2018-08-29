import React, { Component } from 'react';
import {_draw , _nameSpace}  from '../Chartlib/line'
import {_check} from './comm'
import '../css/resource.css'
import loading from '../../asset/loading.gif'
import { Panel } from 'react-bootstrap'
import {getCpu , setCpu}from '../../server/utils/const'

// global.maxSystem = 0
// global.maxUser = 0

let maxUser 
let maxSystem  


class Cpu extends Component {

  constructor(props) {
    super(props)
    let interval
    let nameSpace
    let resize
    this.state = {
      viewLine : [] , 
      y :  ['user' , 'system']
    }
  }

  componentDidMount(){
    
    maxUser  = getCpu().user == undefined ? 0 : getCpu().user
    maxSystem  = getCpu().system == undefined ? 0 : getCpu().system
    
    if(this.props.fixSize == true){

      const divStyle = {
        fontSize : '20px'     
      }
      this.resize = divStyle;
      
    }

    let initViewLine = this.state.y.map( (key) => {
      return key
    })

    this.setState({
      viewLine : initViewLine
    })
    
    this._init()  
    this.interval = setInterval ( () => {
      this._getData()
    }, 5000)
  }

  componentWillUnmount() {
    console.log('Mem willunmount')
    setCpu(maxUser , maxSystem)
    clearInterval(this.interval)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
 
    return null
  }

  _checkBoxOnclick = (key , check) => {
   
    let viewList = this.state.viewLine
    _check(key,check,viewList)
     this.setState({
      viewLine : viewList,
    })
  }

   _callApi = (type ,count) =>{

    let result = []
    let postData 
    
    let output = fetch('http://jsplays.iptime.org:3000/monitor/findCpu/'+count)
    .then(data => data.json())
    .then(jsonData => {
        jsonData.map( (cpu , index) => {
          let user
          let system
          if(index % 2 !==0){
            let post =  postData.user + postData.system + postData.nice + postData.idel
            let pre = parseInt(cpu.user) + parseInt(cpu.system) + parseInt(cpu.nice) + parseInt(cpu.idel)
            user = ( postData.user -parseInt(cpu.user) ) /  ( post - pre)
            system = ( postData.system -parseInt(cpu.system) ) /  ( post - pre)
            // if(user !== 0) 
            result.push( {'user' : user*100  , 'system' : system*100 , 'date' : cpu.date  }  )
                                  
            if(parseInt(maxUser) <  parseInt(user*100) ) maxUser = user*100
            if(parseInt(maxSystem) <  parseInt(system*100) ) maxSystem = system*100

         
          }
                   
          postData ={  'user' :   parseInt(cpu.user) ,
          'system' : parseInt(cpu.system),
          'nice' : parseInt(cpu.nice),
          'idel' : parseInt(cpu.idel),
        }
        })
        
        if( type  === 'addData' ){
          
          let preData = this.state.data
          preData.pop()  
          let concatArr = result.concat(preData)
          result = concatArr
        }
        return result
        
    })
    .catch(err => console.log(err))
    
    return output
  }
   
  _init = async () =>{
    let data = await this._callApi('init' ,120);
    this.setState ({
      data : data ,
    }) 
  }

  _getData = async () => {
            
    let data = await this._callApi('addData' , 2)
    this.setState ({
      data : data,
    })  
  }
  _makeNameSpace =  (axis) => {
    
    this.nameSpace = _nameSpace(axis).map( (name , index) =>{
      
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
    
    this._makeNameSpace(this.state.y)

    let axis = {
      x : 'date',
      y : this.state.y ,
      viewY : this.state.viewLine ,
      yMax : 100
    }
    _draw("cpu1" , this.state.data , axis)

  }
  
  render() {
    // console.log("랜더")
    return (
      <div className={this.props.fixSize ? "resource resize" : "resource" }>
        {this.state.data ? this._renderChart() : <img className="loading" src={loading}/>}
        <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1" className="header">CPU</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          
          <div className={this.props.fixSize ? "nameSpace display-none" : "nameSpace"}>{this.nameSpace}</div>
          <div className="canvas"><canvas className="chart" id="cpu1" height="600" width="1200"></canvas></div>
        </Panel.Body>
      </Panel>
     </div>
    )
  }
}

export default Cpu;
export const maxValue = () => {
            return { user : maxUser ,
                      system : maxSystem}
}
