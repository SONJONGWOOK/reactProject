import React, { Component } from 'react';
import {_draw , _nameSpace}  from '../Chartlib/line'
import {_check , _numCounter } from './comm'
import '../css/resource.css'
import loading from '../../asset/loading.gif'

class Tcp extends Component {

  constructor(props) {
    super(props)
    let count1 = 0
    let count2 = 0
    let interval
    let nameSpace
    let counterDom
    this.state = {
      viewLine : [] , 
      y :  ['established' ,'synSent' , 'synRecv' , 'timeWait' , 'close' , 'closeWait' , 'listen'] 
    }
  }

  componentDidMount(){

    if(this.props.fixSize == true){

      const divStyle = {
        fontSize : '16px'     
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
    clearInterval(this.interval)
    
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
    let output = fetch('http://localhost:3000/monitor/findTcp/'+count)
    .then(data => data.json())
    .then(jsonData => {
      result = jsonData
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
    let data = await this._callApi('init' , 60)
    this.setState ({
      data : data ,
    }) 
  }


  _getData = async () => {
    
    let data = await this._callApi('addData' ,1)
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

  _dataCounter = () =>{
    // 숫자메타크리틱 형태로 
    //established+ synSent + synRecv  + listen
    // timeWait + close + closeWait  
    // 두가지 데이터를 가장 마지막행에 대해서 카운터를 한다.
    let last = this.state.data[0]
    this.count1 = last.established + last.synSent + last.synRecv + last.listen
    this.count2 = last.timeWait + last.close + last.closeWait
   
   this.counterDom =  <div className ="outerCounter">
    <div className="counter" id="count1">
      <span>{this.count1}</span>
      <span className="innerCounter">ConnectionProcess</span>
    </div>
    <div className="counter" id="count2">
      <span>{this.count2}</span>
      <span className="innerCounter">ClosingProcess</span>
    </div>
  </div> 
  }

  _renderChart = () =>{

    this._makeNameSpace(this.state.y)
      
    let axis = {
      x : 'date',
      y : this.state.y ,
      viewY : this.state.viewLine ,
      yMax : 20
    }
    _draw("tcp1" , this.state.data , axis)
    this._dataCounter()
   
  }

 
  render() {
    
    return (
      <div className="resource" style={this.resize}>
        <div>TCP Socket</div>
        {this.state.data ? this._renderChart() : <img className="loading" src={loading}/> }
        <div>
        <div  className="nameSpace">{this.nameSpace}</div> 
        {this.counterDom}
      

        <div>
          <canvas className="chart" id="tcp1" height="600" width="1200"></canvas>
        </div>
        
      </div>
   </div>
    )
  }
}

export default Tcp;
