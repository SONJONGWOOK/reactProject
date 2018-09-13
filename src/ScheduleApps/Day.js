import React, { Component } from 'react'

class Day extends Component{


    constructor(props) {
        super(props)
        this.today  = new Date()
        this.state = {
            mouseEvent : false
        }
    }
    _customStyle = () =>{
        if(this.state.mouseEvent){
            return { backgroundColor: "lightgray" }
        } else {
          return { backgroundColor: "white" }
        }
    }

    _overEvent = (event) =>{
        
        this.setState({
            mouseEvent : true
        })
    }
    _outEvent = (event) =>{
        
        this.setState({
            mouseEvent : false
        })
    }
    
    _DayInfo = ({day , month, dayOfWeek , isMonth , year , isToday , dayOnclick , schedule}) =>{
        
        let addSchedule = schedule.map( (value , index) => {
            let type = value.type
            let display
            switch(type){
                case 'SELECT' :  display = <span>&#10004;</span>
                break
                case '1' :  display = <span>&#10000;</span>
                break
                case '2' :  display =  <span>&#9996;</span>
                break
            }
            return <span className="scheduleIcon"  key={day+""+index}>{display}</span>
        })
        let className = isMonth ? "day"  : "day otherMonth"
        let addMonth = isMonth ? ""  : <span>{month}월</span>
        let el =<span>{addMonth}{day}일</span>
        // console.log(dayOnclick())
        return <div 
                    className={className} id={isToday ? "today" : "otherDay" } 
                    onMouseOver={(event) =>{ this._overEvent(event) }}
                    onMouseOut={(event) => { this._outEvent(event) }}
                    onClick={(event) => { dayOnclick(event , this)  } }
                    style={this._customStyle() }
                >   {el}
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
            dayOnclick={this.props.dayOnclick}
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