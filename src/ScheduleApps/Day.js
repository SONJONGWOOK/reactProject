import React, { Component } from 'react'
import bigStar from '../../asset/big-star.svg'

class Day extends Component{

    constructor(props) {
        super(props)
        this.style
        this.gantt
        this.today  = new Date()
        this.prevMonth = { display: "none"}
        this.nextMonth = { display: "none"}
        this.ref = React.createRef()
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
        
        
        if(this.props.isClickDown) {
            this.props.dayOnMouseOver(event , this)
            this.gantt =  <span>&nbsp;</span>

            let nextWidth = this.ref.current.clientWidth+'px'

            this.prevMonth = { display: "inline" }
            this.nextMonth = { display: "inline" ,
                                left : nextWidth}
           
        }        
        this.setState({
            mouseEvent : true
        })
        


    }
    _outEvent = (event) =>{
        // console.log(this.props.isClickDown)
        if(this.props.isClickDown) {
            if(this.props.index == 0 ){
                this.prevMonth = { display: "none" }
            }
            else if(this.props.index == 41 ){
                this.nextMonth = { display: "none" }
            }
        }
        this.setState({
            mouseEvent : false
        })
        
    }
   
   
    _DayInfo = ({index, day , month, dayOfWeek , isMonth , year , isToday , isGantt , dayOnclick , dayOnMouseDown , dayOnMouseOver ,  dayOnMouseUp , schedule , ganttSchedule, moveMonth}) =>{
        let colorIndex  = 0

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
                break
            }
            return <span className="scheduleIcon"  key={day+""+index}>{display}</span>
        })
        
        // let color = "rgb("+(255-(ganttSchedule.length*20))+", "+(255-(ganttSchedule.length*20))+", 255)"

        let ganttStyle =ganttSchedule.length > 0 ? {background : "rgba( 255 , 0 , 0 , "+ganttSchedule.length*0.1+")" ,  height : "0.2rem"} : {}   
        let addGantt = <div style={ ganttStyle }><span>&nbsp;</span></div>
        
        let className = isMonth ? "day"  : "day otherMonth"
        let addMonth = isMonth ? ""  : <span>{month}월</span>
        let el =<span id={isToday ? "today" : "otherDay" } >{addMonth}{day}일  {isToday ? <object id="todaySvg" type="image/svg+xml" data={bigStar}></object> : "" }</span>
        let prevMonth
        let nextMonth
        if(index == 0 ){
            prevMonth = <div id="prevMonth"
                            onMouseOver={(event) => { moveMonth(event , this)  } }
                            style={ this.prevMonth }
                         >prev</div>
        }
        if(index == 41 ){
                        nextMonth = <div id="nextMonth"
                            onMouseOver={(event) => { moveMonth(event , this)  } }
                            style={ this.nextMonth }
                         >next</div>
        }
        
        
        return <div 
                    className={className}
                    id={isGantt ? "gantt" : "notGantt" } 
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
                    ref={this.ref}
                >   
                    
                    {el}
                    <div>
                        {addGantt}
                    </div>
                    
                    <div className="scheduleBox">
                    {addSchedule}
                    </div>
                    {prevMonth}
                    {nextMonth}
                    
                                       
                </div>
    }
 
    _renderInfo = () =>{
        return <this._DayInfo

            index={this.props.index}
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
            moveMonth={this.props.moveMonth}
            schedule={this.props.schedule}
            ganttSchedule={this.props.ganttSchedule}
        ></this._DayInfo>
    }
        
  
    render() {
        return (
            <this._renderInfo></this._renderInfo>
        )
    }
}



export default Day;