import React, {Component} from 'react'
import '../css/resource.css'
import {maxValue}from'./Cpu'
import loading from '../../asset/loading.gif'
import { Panel } from 'react-bootstrap'


class Summary extends Component {
    
    constructor(props) {
        super(props)
        let interval
       
        this.state = {
                    
        }
      }
      
    
    componentDidMount(){

    this._getData()

    this.interval = setInterval ( () => {
        this._setData()
    },  60000*30)
    }
    _setData = () =>{
      this._getData()
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }
    _callApiMem = () =>{
        
        return  fetch('http://jsplays.iptime.org:3000/monitor/findMemMax')
       
        .then(data => data.json())
        // .then(jsonData => console.log(jsonData))
        .then(jsonData => jsonData)
        .catch(err => console.log(err))   
    }

    _callApiTcp = () =>{
      return  fetch('http://jsplays.iptime.org:3000/monitor/findTcpCount')
        .then(data => data.json())
        // .then(jsonData => console.log(jsonData))
        .then(jsonData => jsonData)
        .catch(err => console.log(err))   
    }

    _getData = async () => {
        let mem = await this._callApiMem()
        let tcp = await this._callApiTcp()
        let cpu = maxValue()
        this.setState ({
          mem : mem ,
          tcp : tcp,
          cpu : cpu ,
          data : true,
        })   
      }

    _renderCpu = () =>{
      return <div className="outerBoard"> 
      <div className="innerCpu">
        <span>{this.state.cpu.user.toFixed(0)}%</span>
        <span>MAX USER</span>
      </div>
      <div className="innerCpu">
        <span>{this.state.cpu.system.toFixed(0)}%</span>
        <span>MAX SYSTEM</span>
      </div>
    </div>
    }
    _renderMem = () =>{
      return <div className="outerBoard"> 
      <div className="innerMem">
        <span>{this.state.mem[0].memAvailable.toFixed(0)}</span>
        <span>MAX MEMAVAILABLE</span>
      </div>
      <div className="innerMem">
        <span>{this.state.mem[0].heapUsed.toFixed(0)}</span>
        <span>MAX HEAPUSED</span>
      </div>
    </div>
    }
    _renderTcp = () =>{
      return   <div className="outerBoard"> 
      <div className="innerTcp">
        <span>{this.state.tcp[0].synSent}</span>
        <span>SYNSENT</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].close}</span>
        <span>CLOSE</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].closeWait}</span>
        <span>CLOSEWAIT</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].timeWait}</span>
        <span>TIMEWAIT</span>
      </div>
      <div className="innerTcp">
        <span>{parseInt(this.state.tcp[0].finWait1)+parseInt(this.state.tcp[0].finWait2)}</span>
        <span>FINWAIT</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].listen}</span>
        <span>LISTEN</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].synRecv}</span>
        <span>SYNRECV</span>
      </div>
      <div className="innerTcp">
        <span>{this.state.tcp[0].lastAck}</span>
        <span>LASTACK</span>
      </div>
    </div>
    }
    _renderChart = () => {
    return <div className="PBoard">
      {this._renderCpu()}
      {!this.state.mem.message ? this._renderMem() : 'mem aggregate fail : '+ this.state.mem.kind + " "+ this.state.mem.name}
      {!this.state.tcp.message ? this._renderTcp() : 'tcp aggregate fail : '+ this.state.tcp.kind + " "+ this.state.tcp.name}
    </div>
    }
    
  render() {
    
    return (
      <div className="resource">
        <Panel bsStyle="warning">
        <Panel.Heading>
        <Panel.Title componentClass="h1" className="header">SUMMARY</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
          {this.state.data ? this._renderChart() : <img className="loading" src={loading}/>}
          
        </Panel.Body>
        </Panel>
     </div>
    )
  }
}

export default Summary;
