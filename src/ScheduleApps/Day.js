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
    
    _DayInfo = ({day , month, dayOfWeek , isMonth , year , isToday , dayOnclick}) =>{
        

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
                >  
                {el}
                    {/* <span>{dayOfWeek}</span> */}
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
        ></this._DayInfo>
    }
        
  
    render() {
        return (
            <this._renderInfo></this._renderInfo>
        )
    }
}



export default Day;