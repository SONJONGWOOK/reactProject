import React, { Component } from 'react';
import Day from './Day'
import '../css/schedule.css';
import { Button, ButtonGroup, InputGroup , InputGroupButtonDropdown ,DropdownToggle,DropdownMenu,DropdownItem,Input,InputGroupAddon   } from 'reactstrap';
import loading from '../../asset/loading.gif'


//윈도우 달력과 동일하게 제작
//총 6줄 기준은 1일에 기준에 맞추서 제작
// 1일이 토요일이라면
// 26 27 28 29 30 31 1
//~~~~`
// 30 1   2   3 4 5 6
//1일이 만약에 월요일이라면
//1번째줄 31  1 2 3 4 5 6 
//2번째줄 7~
//3번째줄 14~
//4번째줄 21~
//5번째줄 28 29 30 1 2 3 4
//6번재줄 5 6 7 8 9 10 11 로 한다.
class Schedule extends Component {

constructor(props) {
  super(props);
  
  this.today  = new Date()
  this.days = ['일' ,'월' ,'화' ,'수' ,'목' ,'금' ,'토' ]
  this.toggleDropDown = this._toggleDropDown.bind(this);
  this.toggleSplit = this._toggleSplit.bind(this);
  
    this.state = {
      now : this.today,
      inputOpen : false,
      dropdownOpen: false,
      splitButtonOpen: false
    }

  }
  
  componentDidMount(){
    
    //총 42칸 제작 = 7*6
    //달 시작
    // console.log(new Date( this.year , this.today.getMonth() , 1).toLocaleDateString())
    //달 끝
    // console.log(new Date( this.year , this.today.getMonth()+1 , 0).toLocaleDateString())
    //토요일=6 
   

  }

  componentWillUnmount() {
     
  }

  _toggleDropDown = ()=>{
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  _toggleSplit =() => {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    })
  }

  _dayOnclick = (event , thisObject) => {
    // console.log(event)
    // console.log(thisObject)
    // console.log(event.currentTarget)

    this.setState({
      inputOpen : true
    })
    
  }
  _inputSave =  (event , thisObject) => {
    console.log(event.currentTarget)
    console.log(thisObject)
    console.log(document.querySelector('.inputArea'))
    this.setState({
      inputOpen : false
    })
  }

 
  _prevMonth = () => {
    let dt = new Date(this.state.now)
    dt.setMonth(dt.getMonth() - 1)
    this.setState({
      now : dt
    })
  }

  _today = () => {
    this.setState({
      now : new Date()
    })
  }

  _nextMonth = () => {
    let dt = new Date(this.state.now)
    dt.setMonth(dt.getMonth() + 1)
    this.setState({
      now : dt
    })
  }

  _getFirstDate =(today) => {
    return new Date( today.getFullYear() ,today.getMonth() , 1)
  }

  _getLastDate =(today) => {
    return new Date( today.getFullYear() ,today.getMonth()+1 , 0)
  }
  _getDayOfWeek=(day) =>{
    return this.days[day.getDay()]
  }
  _getPrevDay = (date) =>{
    let target = new Date(date)
    let dayNumber = new Date(date).getDay()
    target.setDate(target.getDate()-dayNumber)
    return target
  }

  _getDateformat = (date) =>{
    return {  yyyy : date.getFullYear(),
              MM : date.getMonth()+1,
              dd : date.getDate()
      }
  } 
  _getDayArray = () =>{
    let arr = []
    let firstDay = this._getFirstDate(this.state.now)
    let preDay = this._getPrevDay(firstDay)

    for(let i = 0 ; i < 42 ;  i++){
      let pushDate = new Date(preDay)
      arr.push(this._setData(pushDate))
      preDay.setDate(preDay.getDate()+1)  
    }
          
    return arr
  }
   _setData = (date) =>{
      return {
            date : date,
            dayOfWeek : this.days[date.getDay()],
            isMonth : date.getMonth() == this.state.now.getMonth() ? true : false ,
            isToday : date.toLocaleDateString() == new Date().toLocaleDateString() ? true : false
    }
  }
  _getCalendar = () =>{
        
    let list = this._getDayArray() 
    
    return  list.map( (value , index) => {
      return  <Day 
                key={index}
                day={value.date.getDate()}
                month={value.date.getMonth()+1}
                year={value.date.getFullYear()}
                dayOfWeek={value.dayOfWeek}
                isMonth={value.isMonth}
                isToday={value.isToday}
                dayOnclick={this._dayOnclick}
              ></Day>
    })
  }
  
  _displayHeaderDate = () =>{
    let dt = this.state.now
    return dt.getFullYear()+'년 '+ parseInt(dt.getMonth()+1) +'월'
  }


  _inputgroup = () =>{
    return <div className="inputArea">
     <InputGroup>
      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
        <Button id="selectType" outline>선택</Button>
        <DropdownToggle split outline />
        <DropdownMenu>
          <DropdownItem header>종류</DropdownItem>
          <DropdownItem disabled>0</DropdownItem>
          <DropdownItem>1</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>다른종류</DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
      <Input id="test" placeholder="내용"/>
      <InputGroupAddon addonType="append"><Button color="secondary" onClick={ (event) => { this._inputSave(event , this) }}>기록</Button></InputGroupAddon>
    </InputGroup>
    </div> 
  }
  
  render() {  
    return (
      <div className="outer">
        <div className="header">
          <h1>{this._displayHeaderDate()}</h1>
          <div className="btnGroup" >
              <ButtonGroup >
              <Button onClick={this._prevMonth} >&lt;</Button>
              <Button onClick={this._today} >Today</Button>
              <Button  onClick={this._nextMonth} >&gt;</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="main">
          {this.state.now ? this._getCalendar() : '로딩'}     
        </div>   
          {this.state.inputOpen ? this._inputgroup() : '' }
        </div>
    )
  } 
}

export default Schedule;
