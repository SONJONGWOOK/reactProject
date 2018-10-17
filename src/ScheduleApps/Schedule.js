import React, { Component } from 'react';
import Day from './Day'
import '../css/schedule.css';
import { SplitButton  ,  MenuItem  , Table , Button , ButtonGroup ,ButtonToolbar , FormControl  } from 'react-bootstrap';
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
  
  this.inputText
  this.detail
  this.clickDay 
  this.dropDownText = 'SELECT'
  this.today  = new Date()
  this.days = ['일' ,'월' ,'화' ,'수' ,'목' ,'금' ,'토' ]

  this.attachRef = target =>  {
    this.setState({ target })
  }
  
    this.state = {
      now : this.today,
      inputOpen : false,
      ganttOpen : false,
      dropdownOpen: false,
      splitButtonOpen: false,
      dropDownValue : this.dropDownText,
      mouseDown : false,
      list : [],
      ganttList : [],
      show: false,
      target : undefined
    }

    //데이터 형태
    // { date : 날짜  : type  : 타입 : text : 할일}

  }
  
  componentDidMount(){
    this._getDataList()
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
    

    document.querySelector('.outer').addEventListener('mouseleave' , () => {
      if(this.state.mouseDown)
        this.setState({
          mouseDown : false,
          ganttEnd  : undefined,
          ganttOpen : undefined, 
          inputOpen : false,
        })
  
    })



  }

  componentWillUnmount() {
    
  }

  _getDataList = async () =>{

    let list = await this._callApi();
    let daily = []
    list.map( ( data) =>{
      let convertDate = new Date(data.date)
      data.date = convertDate
      daily.push(data)
      
    })
    
    this.setState({
      list : daily
    })
    
    
  }
  //스케쥴 데이터
  _callApi = () =>{

    return  fetch('http://localhost:3000/calendar/get')
    .then(data => data.json())
    .catch(err => console.log(err))
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
  //커스텀 스타일용
  _customStyle = () =>{
    if(this.state.inputOpen){
        return { display: "block" }
    } else {
      return { display: "none" }
    }
}

  _dayOnclick = (event , thisObject) => {
    
    let date = new Date(thisObject.props.year , thisObject.props.month-1 ,  thisObject.props.day)    
    this.detail = [ ...thisObject.props.schedule , ...thisObject.props.ganttSchedule]
        
    this.setState({
      inputOpen : true ,
      inputDay : date ,
      // ganttEnd  : undefined,
      // ganttStart : undefined
    })

    this.clickDay = date 
    
  }
  //마우스 클릭 다운 이벤트
  _dayOnMouseDown = (event , thisObject) => {
    let date = new Date(thisObject.props.year , thisObject.props.month-1 ,  thisObject.props.day)
    
    if(this.state.ganttOpen){
      this.setState({
        inputOpen : false,
        ganttEnd  : undefined,
        ganttOpen : false,
      })
    }
    this.setState({
      mouseDown : true,
      ganttStart  : date
    })
       
  }
  //마우스 클릭 업 이벤트
  _dayOnMouseUp = (event , thisObject) => {
    console.log(this.state)
    
    let date = new Date(thisObject.props.year , thisObject.props.month-1 ,  thisObject.props.day)
    
    // this.mouseDown = true
    thisObject.prevMonth = {display : "none"}
    thisObject.nextMonth = {display : "none"}

    let start = this.state.ganttStart 
    let end = date

    if(this.state.ganttStart  >  date){
      end = this.state.ganttStart
      start = date
    }
    

    this.setState({
      mouseDown : false,
      ganttStart : start ,
      ganttEnd  : end,
      ganttOpen : this.state.ganttStart.getTime()  ==  date.getTime()  ? false  : true ,
      inputOpen : false,
    })
  }
  //일일 마우스 오버 이벤트
  _dayOnMouseOver = (event , thisObject) =>{ 
    let date = new Date(thisObject.props.year , thisObject.props.month-1 ,  thisObject.props.day)
 
    this.setState({
      ganttEnd  : date,
    })
  }

  //간트차트용 드래그 달 이동
  _moveMonth = (event , thisObject) =>{
    thisObject.prevMonth = {display : "none"}
    thisObject.nextMonth = {display : "none"}
    if(thisObject.props.index == 0 ){
      this._prevMonth()
    }else if(thisObject.props.index == 41 ){
      this._nextMonth()
    }
  }

  //일일 스케쥴 저장
  _inputSave = async (event , thisObject) => {
    
    let inputDay = this.state.inputDay
    let list  = this.state.list
    let inputData = {
          date : inputDay ,
          type : this.state.dropDownValue ,
          text :  document.querySelector("#inputText").value  
    }   
  
    let result = await send('http://localhost:3001/calendar/post' , {'type' : this.state.dropDownValue  , 'text' : document.querySelector("#inputText").value , 'date' : inputDay })
    if(result == undefined || result  == null || result._id == undefined ){
      alert("저장실패")
      return
    }   
    result.date = new Date(result.date)
    this.detail.push(result)  
    
    this._getDataList()
  
    this.setState({
      // inputOpen : false,
      dropDownValue : this.dropDownText,
    
    })
       

  document.querySelector("#inputText").value=""
    
  }
  //간트차트 저장
  _ganttSave = (event , thisObject) => {
    let ganttList  = this.state.ganttList
    let gantt = { 
                start : this.state.ganttStart,
                end : this.state.ganttEnd,
                type : this.state.dropDownValue ,
                text :  document.querySelector("#inputText").value  
    }
    ganttList.push(gantt)

    this.setState({
      mouseDown : false,
      ganttStart : undefined,
      ganttEnd  : undefined,
      ganttOpen : false,
      ganttList
    })
  }

  _removeData = async (event , thisObject) => {
    let targetNo = event.target.name
   
    let result = await send('http://localhost:3001/calendar/remove' , thisObject.detail[targetNo] )

    if(result == undefined || result  == null || result._id == undefined ){
      alert("저장실패")
    }   
    
    this.detail.splice(targetNo , 1)
    this._getDataList()
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
  //데이트 포멧
  _getDateformat = (date) =>{
    return {  yyyy : date.getFullYear(),
              MM : date.getMonth()+1,
              dd : date.getDate()
      }
  } 
  //데이트 어레이
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

  //일일 데이터
   _setData = (date) =>{
      let list = this.state.list
      let ganttList = this.state.ganttList
      
      let matchList =list.filter(el => {
        return el.date.getTime() == date.getTime()
      })

      let matchGanttList =ganttList.filter(el => {
        return el.start <= date && el.end >= date
      })
        
      
      let ganttStart = this.state.ganttStart
      let ganttEnd = this.state.ganttEnd

      if(ganttStart > ganttEnd){
        ganttEnd =  this.state.ganttStart
        ganttStart = this.state.ganttEnd
      }


      return {
            date : date,
            dayOfWeek : this.days[date.getDay()],
            isMonth : date.getMonth() == this.state.now.getMonth() ? true : false ,
            isToday : date.toLocaleDateString() == new Date().toLocaleDateString() ? true : false ,
            isGantt : date >= ganttStart &&  date <= ganttEnd ?  true : false , 
            schedule : matchList,
            ganttSchedule : matchGanttList    
   }
  }
  //캘린더그리기
  _getCalendar = () =>{
    
    let list = this._getDayArray() 
    
    return  list.map( (value , index) => {
      
      return  <Day 
                key={index}
                index={index}
                day={value.date.getDate()}
                month={value.date.getMonth()+1}
                year={value.date.getFullYear()}
                dayOfWeek={value.dayOfWeek}
                isMonth={value.isMonth}
                isToday={value.isToday}
                isClickDown={this.state.mouseDown}
                isGantt={value.isGantt}
                dayOnclick={this._dayOnclick}
                dayOnMouseDown={this._dayOnMouseDown}
                dayOnMouseUp={this._dayOnMouseUp}
                dayOnMouseOver={this._dayOnMouseOver}
                moveMonth={this._moveMonth}
                schedule={value.schedule}
                ganttSchedule={value.ganttSchedule}
              ></Day>
    })
  }
  
  _displayHeaderDate = () =>{
    let dt = this.state.now
    return dt.getFullYear()+'년 '+ parseInt(dt.getMonth()+1) +'월'
  }
  _bottomHeder = () =>{
      // console.log(this.clickDay)
    return <h1 style={this._customStyle()}  >{this.clickDay.toLocaleDateString() + " Detail Schedule"}</h1>
  }

  _inputgroupProperty = (fnc) => {

    return  <div id="inputGourpProperty">
            <SplitButton id="splitBtn " title={this.state.dropDownValue} pullRight id="split-button-pull-right">
           <MenuItem onClick={(event) => this._changeDropValue(event) } eventKey="1">TYPE1</MenuItem>
            <MenuItem onClick={(event) => this._changeDropValue(event) } eventKey="2">TYPE2</MenuItem>
            <MenuItem onClick={(event) => this._changeDropValue(event) } eventKey="3">TYPE3</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={(event) => this._changeDropValue(event) } eventKey="4">TYPE4</MenuItem>
          </SplitButton>
          <FormControl aria-describedby="basic-addon1" id="inputText" type="text" placeholder="내용" />
          <Button id="inputGroupBtn" color="secondary" onClick={ (event) => { fnc(event , this) }}>SAVE</Button>
          </div>
  }

  _inputgroup = () =>{    
     //드롭다운 버튼 
     //<button type="button" tabindex="0" class="dropdown-item">1</button>
    //  return <div className="inputArea"  style={this._customStyle()} ></div>
    return <div className="inputArea">
    {this._inputgroupProperty(this._inputSave)}
    </div> 
  }

  _ganttInput = () =>{
    
    return <div className="ganttArea">
      <h1 >{this.state.ganttStart.toLocaleDateString() +' ~ '+ this.state.ganttEnd.toLocaleDateString() + " Gantt Schedule"}</h1>
      {this._inputgroupProperty(this._ganttSave)}
    </div> 
  }
  _detailgroup = () =>{   
    // console.log(this.detail)
    let addBody = this.detail.map( (value , index) =>{
       let date = value.date == undefined ? value.start.toLocaleDateString()+"~"+value.end.toLocaleDateString()  : value.date.toLocaleDateString()
        return    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td className="detail">{date}</td>
                    <td className="detail" id="detailType">{value.type}</td>
                    <td className="detail" id="detailDesc">{value.text}</td>
                    <td className="detailBtn"> 수정</td>
                    <td className="detailBtn" >
                      <Button name={index}onClick={ (e) => { this._removeData(e, this)}}>삭제
                      </Button>
                    </td>
                  </tr>
      
    })
    
    return <Table style={this._customStyle()} hover>
    <thead>
      <tr >
        <th></th>
        <th className="detail">일자</th>
        <th className="detail" id="detailType">종류</th>
        <th className="detail">내용</th>
        <th className="detailBtn">수정</th>  
        <th className="detailBtn">삭제</th>  
      </tr>
    </thead>
    <tbody>
      {addBody}
    </tbody>
  </Table>


  }
  render() { 
    console.log("랜더링")
    
    return (
      <div className="outer">
      {/* <Button onMouseOver={this._test}  ref={this.attachRef} >TEST</Button> */}
       
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
          {this.state.ganttOpen ? this._ganttInput()  : '' }
          </div>
          
          
        </div>
    )
  } 
}

export default Schedule;
