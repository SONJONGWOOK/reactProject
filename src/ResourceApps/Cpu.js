import React, { Component } from 'react';
import {_draw}  from '../Chartlib/line'
import loading from '../../asset/loading.gif'

class Cpu extends Component {

  constructor(props) {
    super(props)
    let interval
    this.state = {
    }
  }

  componentDidMount(){
   
    this._init()  

    this.interval = setInterval ( () => {
      this._getData()
    }, 3000)
  }

  componentWillUnmount() {
    console.log('Mem willunmount')
    clearInterval(this.interval)
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
 
    return null
  }

   _callApi = (type ,count) =>{

    let result = []
    let postData 
    
    let output = fetch('http://localhost:3000/monitor/findCpu/'+count)
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
    
    // console.log(preData)
    // preData.splice(preData.length-1 , 1)
    // let count = 60 - (preData.length)
    // console.log("겟" + count)
    // const data = await this._callApi(count*2)
    let data = await this._callApi('addData' , 2)
    this.setState ({
      data : data,
    })  
  }

  _renderChart = () =>{
    console.log(this.state.data)  
    let axis = {
      x : 'date',
      // y : ['memTotal' , 'memAvailable' , 'heapTotal' ,  'rss'],
      y : ['user' , 'system'],
      yMax : 100
    }
    _draw("main" , this.state.data , axis)

  }
  
  render() {
    // console.log("랜더")
    return (
      
     <div>
        {this.state.data ? this._renderChart() : '로딩' }
        <div>
          <canvas className="cpu" id="main" height="600" width="1200"></canvas>
        </div>
     </div>
     
     
     
    )
  }
}

export default Cpu;
