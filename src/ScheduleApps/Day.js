import React, { Component } from 'react'

class Day extends Component{

    constructor(props) {
        super(props)
        console.log(props)
        this.style
        this.gantt
        this.today  = new Date()
        this.state = {
            mouseEvent : false , 
           
        }
    }

    componentDidMount(){
        
    }

    componentWillUnmount() {
    
    }
  
    _customStyle = () =>{
    
        
        if(this.state.mouseEvent){
            this.style = { backgroundColor: "lightgray" }
            // style = Object.assign(style, {fontSize : "20px"})
        } else {
            this.style =  { backgroundColor: "white" }
        }
        
        return  this.style
    }

    _overEvent = (event) =>{
        
        console.log(this.props)

        if(this.props.isClickDown) {
            this.props.dayOnMouseOver(event , this)
            this.gantt =  <span>&nbsp;</span>
            // console.log('클릭상태')

        }

        this.setState({
            mouseEvent : true
        })
        


    }
    _outEvent = (event) =>{
        // console.log(this.props.isClickDown)

        this.setState({
            mouseEvent : false
        })
        
    }
   
    _DayInfo = ({day , month, dayOfWeek , isMonth , year , isToday , isGantt , dayOnclick , dayOnMouseDown , dayOnMouseOver ,  dayOnMouseUp , schedule}) =>{
        
        let addSchedule = schedule.map( (value , index) => {
            let type = value.type
            let display
            switch(type){
                case 'SELECT' :  display = <span>&#10004;</span>
                break
                case 'TYPE1' :  display = <span>&#10000;</span>
                break
                case 'TYPE2' :  display =  <span>&#9996;</span>
                break
                default : display =  <span>&#9995;</span>
            }
            return <span className="scheduleIcon"  key={day+""+index}>{display}</span>
        })
        let className = isMonth ? "day"  : "day otherMonth"
        let addMonth = isMonth ? ""  : <span>{month}월</span>
        let el =<span>{addMonth}{day}일</span>
        if(isGantt) {
            this.gantt = <span>&nbsp;</span>
        }else{
            this.gantt = ''
        }
        let gantt = <div style={ { background : 'red'}}>{this.gantt}</div>
        // console.log(dayOnclick())
        return <div 
                    className={className} id={isToday ? "today" : "otherDay" } 
                    onMouseOver={(event) =>{ this._overEvent(event) }}
                    onMouseOut={(event) => { this._outEvent(event)  
                                            }}
                    onClick={(event) => { dayOnclick(event , this)  } }
                    onMouseDown={(event) =>{ dayOnMouseDown(event , this)
                                            //    this.gantt =  <span>&nbsp;</span>
                                             }}
                    onMouseUp={(event) =>{ dayOnMouseUp(event , this) 
                                            // this.gantt =  <span>&nbsp;</span>
                                        }}
                    style={this._customStyle() }
                >   {el}
                    {gantt}
                    <div className="scheduleBox">
                        {addSchedule}
                    </div>
                    
            
                </div>
    }
 
    _renderInfo = () =>{
        return <this._DayInfo 
            day={this.props.day}
            month={this.props.month}
            year={this.props.year}
            dayOfWeek={this.props.dayOfWeek}
            isMonth={this.props.isMonth}
            isToday={this.props.isToday}
            isGantt={this.props.isGantt}
            dayOnclick={this.props.dayOnclick}
            dayOnMouseDown={this.props.dayOnMouseDown}
            dayOnMouseUp={this.props.dayOnMouseUp}
            dayOnMouseOver={this.props.dayOnMouseOver}
            schedule={this.props.schedule}
        ></this._DayInfo>
    }
        
  
    render() {
        return (
            <this._renderInfo></this._renderInfo>
        )
    }
}



export default Day;