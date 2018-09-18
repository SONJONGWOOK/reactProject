import React, { Component } from 'react';
import Day from './Day'
import '../css/schedule.css';
import { Table, Button, ButtonGroup, InputGroup , InputGroupButtonDropdown ,DropdownToggle,DropdownMenu,DropdownItem,Input,InputGroupAddon   } from 'reactstrap';
import loading from '../../asset/loading.gif'
import {send} from './DataProcess'


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

  this.dropDownText = 'SELECT'
  this.inputText
  this.detail
  this.clickDay 
  this.today  = new Date()
  this.days = ['일' ,'월' ,'화' ,'수' ,'목' ,'금' ,'토' ]
  this.toggleDropDown = this._toggleDropDown.bind(this);
  this.toggleSplit = this._toggleSplit.bind(this);
  
    this.state = {
      now : this.today,
      inputOpen : false,
      dropdownOpen: false,
      splitButtonOpen: false,
      dropDownValue : this.dropDownText,
      list : [],
    }

    //데이터 형태
    // { date : 날짜  : type  : 타입 : text : 할일}

  }
  
  componentDidMount(){
    send('http://localhost:3001/calendar/post' , {'type' : 'aaa' , 'text' : 'bbb'})
  //총 42칸 제작 = 7*6
    //달 시작
    // console.log(new Date( this.year , this.today.getMonth() , 1).toLocaleDateString())
    //달 끝
    // console.log(new Date( this.year , this.today.getMonth()+1 , 0).toLocaleDateString())
    //토요일=6 

    // class="dropdown-item"

    // NodeList.prototype.addEventListener = function (eventType, callback, options) {
    //   for (var i = 0; i < this.length; i++) {
    //       this[i].addEventListener(eventType, callback, options);
    //   }
    // }

    // let dropItem = document.querySelectorAll('.input-group-prepend')

    // dropItem.addEventListener('click' , (e) => {
    //   console.log(e.target)
    // })
      



  }

  componentWillUnmount() {
    
  }

  _changeDropValue = (e) =>{
    
    this.setState({
      dropDownValue : e.currentTarget.textContent
    })
    
  }
  _changeInputValue = (e) => {
    // console.log(e.target.value)
    this.inputText = e.target.value
  }

  _customStyle = () =>{
    if(this.state.inputOpen){
        return { display: "block" }
    } else {
      return { display: "none" }
    }
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
    
    let date = new Date(thisObject.props.year , thisObject.props.month-1 ,  thisObject.props.day)
    this.detail = thisObject.props.schedule
    this.setState({
      inputOpen : true ,
      inputDay : date ,
    })

    this.clickDay = date 
    
  }
  _inputSave =  (event , thisObject) => {
    
    let inputDay = this.state.inputDay
    let list  = this.state.list
    
    let inputData = {
          date : inputDay ,
          type : this.state.dropDownValue ,
          text :  document.querySelector("#inputText").value
      
    }   
    list.push(inputData)
    //초기화
    this.setState({
      inputOpen : false,
      dropDownValue : this.dropDownText,
      list
    })
    document.querySelector("#inputText").value=""

    
  }

  //달력 이전달
  _prevMonth = () => {
    let dt = new Date(this.state.now)
    dt.setMonth(dt.getMonth() - 1)
    this.setState({
      now : dt
    })
  }
// 달력 오늘
  _today = () => {
    this.setState({
      now : new Date()
    })
  }
// 달력다음달
  _nextMonth = () => {
    let dt = new Date(this.state.now)
    dt.setMonth(dt.getMonth() + 1)
    this.setState({
      now : dt
    })
  }
//달의 첫날가져오기
  _getFirstDate =(today) => {
    return new Date( today.getFullYear() ,today.getMonth() , 1)
  }
//달의 마지막날 가져오기
  _getLastDate =(today) => {
    return new Date( today.getFullYear() ,today.getMonth()+1 , 0)
  }
  //요일 표시
  _getDayOfWeek=(day) =>{
    return this.days[day.getDay()]
  }
  // 저번달 가져오기
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
//달력에 표시되는날짜는 총 42일
    for(let i = 0 ; i < 42 ;  i++){
      let pushDate = new Date(preDay)
      arr.push(this._setData(pushDate))
      preDay.setDate(preDay.getDate()+1)  
    }
          
    return arr
  }
   _setData = (date) =>{
     
      let list = this.state.list
      
      let matchList =list.filter(el => {
        return el.date.getTime() == date.getTime()
      })
      

      return {
            date : date,
            dayOfWeek : this.days[date.getDay()],
            isMonth : date.getMonth() == this.state.now.getMonth() ? true : false ,
            isToday : date.toLocaleDateString() == new Date().toLocaleDateString() ? true : false ,
            schedule : matchList    
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
                schedule={value.schedule}
              ></Day>
    })
  }
  
  _displayHeaderDate = () =>{
    let dt = this.state.now
    return dt.getFullYear()+'년 '+ parseInt(dt.getMonth()+1) +'월'
  }
  _bottomHeder = () =>{
      console.log(this.clickDay)
    return <h1 style={this._customStyle()}  >{this.clickDay.toLocaleDateString() + " detail schedule"}</h1>
  }

  _inputgroup = () =>{    
     //드롭다운 버튼 
     //<button type="button" tabindex="0" class="dropdown-item">1</button>
    return <div className="inputArea"  style={this._customStyle()} >
     <InputGroup>
      <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
        <Button id="selectType" outline>{this.state.dropDownValue}</Button>
        <DropdownToggle split outline />
              
        <DropdownMenu>
          <DropdownItem header>종류</DropdownItem>
          {/* <DropdownItem disabled>0</DropdownItem> */}
          <DropdownItem  onClick={(event) => this._changeDropValue(event)} >1</DropdownItem>
          <DropdownItem  onClick={(event) => this._changeDropValue(event)} >2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem  onClick={(event) => this._changeDropValue(event)} >3</DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
      <Input id="inputText" type="text" placeholder="내용"/>
      <InputGroupAddon addonType="append"><Button color="secondary" onClick={ (event) => { this._inputSave(event , this) }}>SAVE</Button></InputGroupAddon>
    </InputGroup>
    </div> 
  }
  _detailgroup = () =>{   
    // console.log(this.detail)
    let addBody = this.detail.map( (value , index) =>{
        return    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{value.date.toLocaleDateString()}</td>
                    <td>{value.type}</td>
                    <td>{value.text}</td>
                  </tr>
      // return <div key={index} >{value.text}</div>
    })

    return <Table  style={this._customStyle()} hover>
    <thead>
      <tr >
        <th></th>
        <th className="detail">일자</th>
        <th className="detail">종류</th>
        <th className="detail" >내용</th>
     
      </tr>
    </thead>
    <tbody>
      {addBody}
      {/* <tr>
        <th scope="row">1</th>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
    
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
   
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
   
      </tr> */}
    </tbody>
  </Table>

    // return <div style={this._customStyle()} > {this.detail} </div>
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
        <div className="bottom">
          {this.state.inputOpen ? this._bottomHeder() : ''}
          {this.state.inputOpen ? this._inputgroup() : ''}
          {this.state.inputOpen ? this._detailgroup() : '' }
          </div>
        </div>
    )
  } 
}

export default Schedule;
