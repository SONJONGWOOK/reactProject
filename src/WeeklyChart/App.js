import React, { Component } from 'react';
// import './App.css';
import './chart/chart.css'
import { isObject } from 'util';
import loading from '../../asset/loading.gif'
import { EMLINK } from 'constants';
class App extends Component {
 
  constructor(props){
    super(props);
    this.removeCd 
    this.spot = {
      drawable : false,
      processDraw : false,
      x : -1,
      y : -1,
      scale : undefined,
      translate : undefined, 
      xOffset : [] ,
      xOffsetRange : {
        setRange : false ,
        xFirst : undefined, 
        xLast: undefined, 
      },
    }
     
    this.canvas
    this.ctx
      
    
    //현재 주부터 6주까지 날짜 리스트업
    let basicWeek = new Date()
    let dateList = []
    let addDay
    
    basicWeek = new Date(this._scaleWeek(basicWeek))
    for(let i= 0 ; i<6 ; i++){

      let month = basicWeek.getMonth()+1;
      let day = basicWeek.getDate();
      month = month > 9 ?  String(month) : "0"+String(month);
      day = day > 9 ?  String(day) : "0"+String(day);
      addDay =  basicWeek.getFullYear()+"-"+month+"-"+day

      dateList = [  addDay.replace(/-/g , '')  , ... dateList ]
      
      basicWeek.setDate(basicWeek.getDate()-7);
    }

    let colorList = []
    //라인 색상 50개 지정
    while(colorList.length <= 50){
      let color = '#'+(Math.round(Math.random() * 0xFFFFFF).toString(16))
      if(colorList.includes(color)) continue
      colorList.push(color)
    }
    
    this.state = {
      fatching : false,
      rankList : undefined,
      setRange : false ,
      date : dateList  ,
      colorList : colorList,
      removeLineCd : [] , 
    }
  }
      
  componentDidMount(){
    console.log('weekly didmount')

    this.spot.xOffset = ((1000/this.state.date.length)/2) + 100  
    this.spot.xOffsetAdd = 1000/this.state.date.length
    
    //scale up/down을 위한 이벤트
    document.querySelector('#backLayer').addEventListener('mousedown' , this._canvasMouse)
    document.querySelector('#backLayer').addEventListener('mousemove' , this._canvasMouse)
    document.querySelector('#backLayer').addEventListener('mouseup' , this._canvasMouse)
    document.querySelector('#backLayer').addEventListener('mouseout' , this._canvasMouse)
    document.querySelector('#backLayer').addEventListener('dblclick' , this._canvasMouse)
    
    // document.querySelector('#rank1').addEventListener('mouseout' , this._canvasMouse)
    // this.canvas = document.querySelector('#backChart')
    this.canvas = document.querySelector('#backLayer')
    this.ctx = this.canvas.getContext('2d');
    
    //아직 로드되지않은 dom의요소를 컨트롤하기위해 바디전체에 이벤트를 건다.
    //전체 로드방식에서 부분 onclick이벤트로 전환
    //innerHtml => react element 생성으로 전환
    // document.body.addEventListener('click', this._setRemoveList) 

    //영화랭크데이터get
    this._getData()
  }
  componentWillUnmount() {
    console.log('willunmount')
    document.querySelector('#backLayer').removeEventListener('mousedown' , this._canvasMouse)
    document.querySelector('#backLayer').removeEventListener('mousemove' , this._canvasMouse)
    document.querySelector('#backLayer').removeEventListener('mouseup' , this._canvasMouse)
    document.querySelector('#backLayer').removeEventListener('dblclick' , this._canvasMouse)
    //삭제예정
    // document.body.removeEventListener('click', this._setRemoveList) 
    
    
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevState.date != this.state.date){
      this._getData()
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    
  }
  _canvasMouse = (event) =>{    
    
    
    switch(event.type){
      case "mousedown" : this._drawRangeInit(event) 
                        break
      case "mousemove" : if(this.spot.drawable ) this._drawRange(event) 
                        break
      case "mouseup" :  this._drawRangeFinish(event) 
                        break
      case "dblclick" : this._drawRangeReset(event) 
                        break
      // case "mouseout" : this._canvasMouseOut(event) 
      //                   break
 
    }
  }
  //동적 체크박스처리
  //하단에 체크 박스 이벤트로 변경
  _setRemoveList = (event) =>{
    
    let element = event.path[0]
    let removeList = this.state.removeLineCd

    if(element.className == 'uncheck'){
      
      let index = removeList.indexOf(element.id)
      removeList.splice(index, 1)
    }
    if(element.className == 'checked'){
      
      removeList.push(element.id)
    }
   
    this.setState({
      removeLineCd : removeList,
    })

  
  }
//체크박스 이벤트
  _checkBoxOnclick = (key , check) => {
    // console.log(this.spot)

    let removeList = this.state.removeLineCd
    if(check){
     removeList.push(key[0])
    }else{
      let index = removeList.indexOf(key[0])
      removeList.splice(index, 1)
    }

    this.setState({
      removeLineCd : removeList,
    })
  }


  _setDateList = () =>{
    
    let start = document.getElementById("startDate").value;
    let end = document.getElementById("endDate").value;


    if(start == '' || start == null ){
        let today = new Date()
        let month = today.getMonth()+1;
        let day = today.getDate();
        month = month > 9 ?  String(month) : "0"+String(month);
        day = day > 9 ?  String(day) : "0"+String(day);
        start =  today.getFullYear()+"-"+month+"-"+day
    }

    if(end == '' || end == null ){
        let today = new Date()
        let month = today.getMonth()+1;
        let day = today.getDate();
        month = month > 9 ?  String(month) : "0"+String(month);
        day = day > 9 ?  String(day) : "0"+String(day);
        end =  today.getFullYear()+"-"+month+"-"+day
    }
    if( new Date(start) > new Date(end) ){
      let temp
      temp = start
      start = end
      end  = temp
    }

    // console.log(start)
    // console.log(end)
    
    start = this._scaleWeek(start)
    end = this._scaleWeek(end)
     
    let addDay
    let list = []
    
    let dt = new Date(start)

    while(addDay != end){
        let month = dt.getMonth()+1
        let day = dt.getDate()
        month = month > 9 ?  String(month) : "0"+String(month);
        day = day > 9 ?  String(day) : "0"+String(day);
        addDay =  dt.getFullYear()+"-"+month+"-"+day

        list = [ ... list  , addDay.replace(/-/g , '')]

        // console.log(addDay+"     "+end)
        if(addDay == end){
            break;
        }
        dt.setDate(dt.getDate()+7);

    }
  
    this.setState({
      date : list , 
      fatching : false,
    })
  
    
 }
   
  _scaleWeek = (date) => {
    let dt = new Date()
    dt = new Date(date)
  
    let getDay = dt.getDay()
    
    if(getDay != 0 ){
       dt.setDate(dt.getDate()-(getDay));
    }

    let month = dt.getMonth()+1;
    let day = dt.getDate();
    month = month > 9 ?  String(month) : "0"+String(month);
    day = day > 9 ?  String(day) : "0"+String(day);
    
    
    return dt.getFullYear()+"-"+month+"-"+day
} 
  _draw = (rankList , scaleRadio , translatePot) =>{

    let canvas = document.querySelector('#rank1')
    let ctx = canvas.getContext('2d');
    let checkMovie =''
    let colorIndex = 0
    let colorList = this.state.colorList
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px'
    ctx.beginPath();
    //비율결정 
    if(scaleRadio == undefined || scaleRadio == null ) scaleRadio = { x : 1 , y : 1}
    if(translatePot == undefined || translatePot == null)  translatePot = { x : 0 , y : 0}
    ctx.scale(scaleRadio.x  ,  scaleRadio.y)
    ctx.translate(translatePot.x , translatePot.y)
    let dayOffset = (1000/this.state.date.length)
    // console.log('범위 길이 '+this.state.date.length)
    // console.log(this.spot)
    if(this.spot.xOffsetRange.setRange){
      dayOffset = (1000/(this.spot.xOffsetRange.xLast - this.spot.xOffsetRange.xFirst))
      // console.log('변경 범위 길이 '+(this.spot.xOffsetRange.xLast - this.spot.xOffsetRange.xFirst))
    }

    // console.log('오프셋 :'+dayOffset)
    
    let rankOffset = 50
    let day =0
    let rankP
    let max = 99999999
    let min = 0
    
    // 체크박스 그리는 부분 
    // 여기에 리사이즈할 최대값과 최소값을 체크

    let rangeSetCheck = []

    if(this.spot.xOffsetRange.setRange){
      for(let i = this.spot.xOffsetRange.xFirst ; i<this.spot.xOffsetRange.xLast ; i++){
        rangeSetCheck.push(this.state.date[i])
      }
    }
    // console.log(rangeSetCheck)
    this.removeCd= Array.from(rankList.entries() ).map ( (key, index) =>{
        
      let color = colorList[index]
      
      let check = true
      let checkBox = <span>&#x2611;</span>
      let passMakeCheckBox 

      if(this.state.removeLineCd.includes(key[0])){
        check = false
        checkBox = <span>&#x2610;</span>
      }

      if(check && !this.spot.xOffsetRange.setRange){
        key[1].map((data,index)  =>{
          // console.log(data)
          let rank = parseInt(data.rank)
          max = max < rank  ?  max : rank
          min = min > rank  ?  min : rank
        })     
      }

      if(this.spot.xOffsetRange.setRange && check){
        passMakeCheckBox = true
        key[1].forEach( (item) => {
          // console.log(item)
          // console.log(rangeSetCheck.includes(item.day))
          if(rangeSetCheck.includes(item.day)) {
            let rank = parseInt(item.rank)
            console.log(item)
            max = max < rank  ?  max : rank
            min = min > rank  ?  min : rank
            passMakeCheckBox = false
          }
        })
      }
      //차트 범위 줄일때 해당 범위안에 영화가 없으면 콤포넌트를 만들지않는다

      // console.log(key[1]["0"].movieNm)
      // console.log(passMakeCheckBox)
      if(passMakeCheckBox) return

      //클릭이벤트로 체크안하겠다고 추가된 removeListCd와 key를 비교하여 체크 해제된 콤포넌트를 출력함
   
      // console.log('출력되는영화 ' +key[1]["0"].movieNm)
     
      
     
      return <div key={index}  className="checkMovieList">
                <font color={color}><span id={key[0]} onClick={ () => this._checkBoxOnclick(key , check) }>{checkBox}</span></font>
                 <font color="black">{key[1]["0"].movieNm}</font>
             </div>
    })
    //오프셋 보정
    rankOffset = 550/ ( min - max + 2 )
    let rankSet = max-1
    let daySet = this.spot.xOffsetRange.xFirst == undefined ? 0 : this.spot.xOffsetRange.xFirst

    console.log('랭킹 맥스 ' +max)
    console.log('랭킹 민 ' +min)
    

    //실제 라인 그리는 부분
    for(let cd of rankList){
      ctx.beginPath();
      let color = colorList[colorIndex]
      colorIndex++
      ctx.fillStyle = color

      // value json arr
      // value내용 =>day 랭킹날짜 
      //             movieNm 이름
      //             rank 날짜의 랭킹
      //             movieCd 영화코드
      let [key, value] = cd;

      //하단 체크박스 이벤트 삭제예정
      // removeLineCd에 추가된것들은 unchecked
      // 그리고 반복문에서 continue함
      //  <label>남</label><input type="checkbox" onChange={this._handleChange} />
      //       if(this.state.removeLineCd.includes(key) ){
      //   // 패스 항목
      //   checkMovie += '<div class="checkMovieList"><label><font color="'+color+'"><span value="false" class="uncheck" id="'+key+'">&#x2610;</span><font color="black">'+value[0].movieNm+'</label></div>'
      //   continue
      // }
      // checkMovie += '<div class="checkMovieList"><label><font color="'+color+'"><span value="true" class="checked" id="'+key+'">&#x2611;</span><font color="black">'+value[0].movieNm+'</label></div>'

      
        if(this.state.removeLineCd.includes(key) ) continue

        let viewMovieNm =  true;
        
        value.map( (value , index) =>{
          
          this.state.date.map( (date , index) =>{
            if (this.spot.xOffsetRange.xFirst > index || this.spot.xOffsetRange.xLast <= index )  return

            if(value.day == date){
       
              day = (dayOffset/2) + ((index-daySet)*dayOffset) + 100
              rankP = rankOffset* (value.rank-rankSet)
              if(viewMovieNm)   {
                ctx.fillText(value.movieNm , day ,  rankP-10 )
                viewMovieNm =false
              }
              ctx.lineTo(day,rankP)
              ctx.moveTo(day,rankP)
              ctx.arc(day, rankP, 2, 0, 2*Math.PI);
            }
          })
          ctx.lineWidth = 3
          ctx.lineCap = 'round'
          ctx.strokeStyle = color
          ctx.closePath()
          ctx.stroke()

        })

    }

    //xy축 설정
    ctx.beginPath()
    ctx.fillStyle = "#000000"
    ctx.strokeStyle ="#000000"
    ctx.lineWidth = 1
    ctx.moveTo(100 , 0 )
    ctx.lineTo(100 , 550 )
    ctx.lineTo(1100 , 550 )

    this.spot.xOffset = []

    //날짜에 따른 범례 크기 결정
    this.state.date.map( (data , index) => {
      console.log(index+' -  '+data )
      console.log(this.spot.xOffsetRange.xFirst)
      console.log(this.spot.xOffsetRange.xLast)
      console.log(this.spot.xOffsetRange.xFirst > index || this.spot.xOffsetRange.xLast <= index)
      if (this.spot.xOffsetRange.xFirst > index || this.spot.xOffsetRange.xLast <= index )  return
      day = (dayOffset/2) + ((index-daySet)*dayOffset) + 100
      this.spot.xOffset = [ ...this.spot.xOffset  , day]
      ctx.fillText(data , day , 580 )
    })
    ctx.stroke()
    //점선으로 표현
    ctx.setLineDash([5, 15])
    //랭킹 그리는부분
    for(let i=max ; i<=min ; i++){
      
      rankP = ((i-rankSet)*rankOffset)
      
      ctx.fillText('Rank '+i , 50 , rankP)
      
      ctx.moveTo(100,rankP)
      ctx.lineTo(1100,rankP)
    }
    ctx.stroke()
    //점선 원래대로
    ctx.setLineDash([])
    // document.querySelector('.checkMovie').innerHTML = checkMovie

  }

  _drawRangeInit = (event) =>{
    console.log('클릭시작')
    
    // let ctx = canvas.getContext('2d');
    // ctx.save()
    // this.ctx.beginPath()
    let eventSpot = this._getMouseEventPosition(event)
    this.spot.drawable = true
    if(eventSpot.x < 100  || eventSpot.x > 1100) this.spot.drawable = false
    this.spot.x = eventSpot.x
    this.spot.y = eventSpot.y
    
    console.log('시작 x '+this.spot.x)
    console.log('시작 y '+this.spot.y)
    // this.ctx.moveTo(this.spot.x , this.spot.y)
     
  }
  _drawRange = (event) =>{
    // console.log('이동')
    let eventSpot = this._getMouseEventPosition(event)
    // eventSpot.x
    // eventSpot.y
    // this.ctx.lineTo( eventSpot.x ,  eventSpot.y)
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath()
    this.ctx.fillStyle = 'gray'
    this.ctx.globalAlpha = "0.5"
    
    if(eventSpot.x < 100){
      eventSpot.x = 100
    } 
    else if(eventSpot.x >1100){
      eventSpot.x = 1100
    }
    this.ctx.fillRect(this.spot.x, 0 , eventSpot.x-this.spot.x , 550)    
    this.ctx.stroke()
    this.spot.processDraw = true
    // console.log('이동 y '+eventSpot.y)
  }
  _drawRangeFinish = (event) =>{
    console.log('클릭완료')
    this.spot.drawable = false
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if(!this.spot.processDraw) return
    let eventSpot = this._getMouseEventPosition(event)
       
    
    this.spot.xOffset.map( (x , index) => {
      console.log(x+"  "+index)
      if( this.spot.x > x ) this.spot.xOffsetRange.xFirst = index+1
      if( eventSpot.x > x ) this.spot.xOffsetRange.xLast = index+1
    })
    this.spot.xOffsetRange.xFirst = this.spot.xOffsetRange.xFirst == undefined ? 0 : this.spot.xOffsetRange.xFirst
    this.spot.xOffsetRange.xLast = this.spot.xOffsetRange.xLast == undefined ? 0 : this.spot.xOffsetRange.xLast

    if(this.spot.xOffsetRange.xFirst > this.spot.xOffsetRange.xLast ){
      let temp = this.spot.xOffsetRange.xFirst
      this.spot.xOffsetRange.xFirst =  this.spot.xOffsetRange.xLast
      this.spot.xOffsetRange.xLast = temp
    } 
    
    if(this.spot.xOffsetRange.xFirst == this.spot.xOffsetRange.xLast ) return
    
    this.spot.xOffsetRange.setRange = true
    console.log(this.spot.xOffsetRange)
            
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.spot.drawable = false
    this.spot.processDraw = false
    this.spot.xOffsetRange.setRange = true
    this.setState({
      setRange : true ,
    })
   
    // this._draw(this.state.rankList)    
    
    // this.spot = {
    //   drawable : false,
    //   processDraw : false,
    //   x : -1,
    //   y : -1,
    //   scale : undefined,
    //   translate : undefined, 
    //   xOffset : this.spot.xOffset,
    //   xOffsetRange : {
    //     setRange  : true,
    //     xFirst : undefined, 
    //     xLast: undefined,
    //   },
    // }
    
  }
   _drawRangeReset = () =>{
    console.log('더블')
    // let canvas = document.querySelector('#rank1')
    // let ctx = canvas.getContext('2d');
    // ctx.restore()
    
    //만약에중간단계를 안거치고 더블클릭할경우 블락 방지
    document.getSelection().removeAllRanges()
    //드래그후 마우스 업까지 하지않으면 안되게끔
    if(!this.spot.xOffsetRange.setRange) return

     this.spot = {
      drawable : false,
      processDraw : false,
      x : -1,
      y : -1,
      scale : undefined,
      translate : undefined, 
      xOffset : this.spot.xOffset,
      xOffsetRange : {
        setRange  : false,
        xFirst : undefined, 
        xLast: undefined,
      },
    }
    this.setState({
      setRange : false ,
    })
    // this._draw(this.state.rankList)

    // 캔버스 초기화 후 더블클릭 블락 방지
    document.getSelection().removeAllRanges()
    document.querySelector('#rank1').focus()  
    
  }


  _drawScaleInit = (event) =>{
    console.log('클릭시작')
    document.querySelector('#rank1').focus()  
    // let ctx = canvas.getContext('2d');
    // ctx.save()
    // this.ctx.beginPath()
    this.spot.drawable = true
    let eventSpot = this._getMouseEventPosition(event)
    this.spot.x = eventSpot.x
    this.spot.y = eventSpot.y
    this.spot.scale = undefined
    this.spot.translate = undefined
    
    console.log('시작 x '+this.spot.x)
    console.log('시작 y '+this.spot.y)
    // this.ctx.moveTo(this.spot.x , this.spot.y)
     
  }
  _drawScale = (event) =>{
    console.log('이동')
    document.querySelector('#rank1').getContext('2d').save()
    let eventSpot = this._getMouseEventPosition(event)
    // eventSpot.x
    // eventSpot.y
    // this.ctx.lineTo( eventSpot.x ,  eventSpot.y)
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath()
    this.ctx.rect(this.spot.x , this.spot.y , eventSpot.x-this.spot.x , eventSpot.y- this.spot.y)
    this.ctx.stroke()
    this.spot.processDraw = true
    console.log('이동 x '+eventSpot.x)
    console.log('이동 y '+eventSpot.y)
  }
  _drawScaleFinish = (event) =>{
    console.log('클릭완료')
    this.spot.drawable = false
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let eventSpot = this._getMouseEventPosition(event)
    // console.log('켄버스크기 x '+this.canvas.width)
    // console.log('켄버스크기 y '+this.canvas.height)
    // console.log('비율 x '+eventSpot.x)
    // console.log('비율 y '+eventSpot.y)
    // console.log('이동 x '+this.spot.x)
    // console.log('이동 y '+this.spot.y)
    let scaleRadio = { x : Math.abs(this.canvas.width/(eventSpot.x-this.spot.x)) ,  y : Math.abs(this.canvas.height/(eventSpot.y-this.spot.y))}
    let translatePot = { x : (this.spot.x > eventSpot.x ? eventSpot.x : this.spot.x) *-1   , y :  (this.spot.y > eventSpot.y ? eventSpot.y : this.spot.y)*-1 }
    
    if(!this.spot.processDraw) return
       
    this.spot.scale = scaleRadio
    this.spot.translate = translatePot

    if(!scaleRadio.x > 10 || scaleRadio.y > 10) return

    console.log('확대')
    console.log('확대비율 x '+scaleRadio.x)
    console.log('확대비율 y '+scaleRadio.y)
    console.log('확대이동 x '+translatePot.x)
    console.log('확대이동 y '+translatePot.y)
    this._draw(this.state.rankList , scaleRadio , translatePot)    
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.spot = {
      drawable : false,
      processDraw : false,
      x : -1,
      y : -1,
      scale : undefined,
      translate : undefined, 
    }
    
  }
  _dbClick = () =>{
    this.spot = {
      drawable : false,
      processDraw : false,
      x : -1,
      y : -1,
      scale : undefined,
      translate : undefined, 
    }
    console.log('더블')
    // let canvas = document.querySelector('#rank1')
    // let ctx = canvas.getContext('2d');
    // ctx.restore()
    document.querySelector('#rank1').getContext('2d').restore()
    this._draw(this.state.rankList)
    
    document.getSelection().removeAllRanges();
    // document.removeAllRanges();
    document.querySelector('#rank1').focus()  
    
  }

  _getMouseEventPosition = (event) => {
    return  { x : (event.pageX - this.canvas.offsetLeft) , y : (event.pageY - this.canvas.offsetTop) }
  }

  _getData =  () => {
    let arrayRank  =  [] 
     this.state.date.map(  async (date , index) => {
       
      let addRank = await this._callApi(date)
      arrayRank = [ ...arrayRank , addRank ]

      if (arrayRank.length === this.state.date.length){
        
        let rankList = this._getDateMap(arrayRank)
        
       
        this.setState({
          rankList : rankList,
          
          fatching : true,
        })
      }
    })
  }

  _callApi = (date) =>{
    return   fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?weekGb=0&key=00c2ee4b72a6e5b37c1cb99897ac9376&targetDt='+date)
      .then(data => data.json())
      .then(jsonData =>  {
         
          return  jsonData.boxOfficeResult 
        })
    .catch(err => console.log(err))
    
  }

  _getDateMap = (arrayRank) =>{
    
    let inputDays = this.state.date;
    let movieMap = new Map()

    
    inputDays.map( (day , index) =>{

      arrayRank.map( (rank , index) =>{ 
        let targetday = rank.showRange
    
        if(targetday.endsWith(day)){
          
          rank.weeklyBoxOfficeList.map( (movie , index) => {
            
            let innerData = {'day' : day , 'movieNm' : movie.movieNm , 'rank' : movie.rank ,  'movieCd' : movie.movieCd } 

              
            if(movieMap.get(movie.movieCd) ==null){
              movieMap.set(movie.movieCd , [innerData] )
              
            }else{
              let originData = movieMap.get(movie.movieCd)
              movieMap.set(movie.movieCd , [ ...originData ,innerData] )
            
            }
          
          })

        }
      })
    }) 
     return movieMap
  }

  _getArrays = (arrayRank) =>{
    let inputDays = this.state.date;
    let movieCdList = []
    let innerRankList = []
    arrayRank.map( (rank , index) =>{
      // console.log(rank)
      rank.weeklyBoxOfficeList.map( (movie , index) => {
        // console.log(movie.rank + "   " + movie.movieNm + "    "+ movie.movieCd)
        let innerElement = { 'movieNm' : movie.movieNm , 'rank' : movie.rank ,  'movieCd' : movie.movieCd}
        movieCdList = [ ... movieCdList , movie.movieCd  ]
        innerRankList = [ ...innerRankList ,  innerElement ]
                
      })
      inputDays.map( (day , index) => {
        let targetday = rank.showRange;
        if(targetday.endsWith(day)) {
          inputDays[index] =  {'day' : day ,  'dayRange' : rank.showRange ,  'yearWeekTime' : rank.yearWeekTime  ,  'rankList' : innerRankList} 
          innerRankList = []
        }
      })
    })
    
    let qniqueKey = new Set(movieCdList)
    return [ inputDays , qniqueKey]
  }
     

  _renderRank = ()=> {
    this._draw(this.state.rankList)
    return  <div>
              <label >시작 : </label>
              <input type="date" id="startDate"/>
              <label >끝 : </label>
              <input type="date" id="endDate"/>
              <label> 검색 : </label>
              <button onClick={this._setDateList}>검색</button>
              <div  className="checkMovie" >{this.removeCd}</div>       
            </div>
  }
  _test1 = () => {
    let canvas = document.querySelector('#rank1')
    let ctx = canvas.getContext('2d');
    let x = document.getElementById('xInput').value
    let y = document.getElementById('yInput').value
    ctx.translate(x, y )
    
  }
  _test2 = () => {
    let canvas = document.querySelector('#rank1')
    let ctx = canvas.getContext('2d');
    let scaleRadio = { x : 1/ this.spot.scale.x  ,  y : 1/this.spot.scale.y}

    ctx.scale(scaleRadio.x , scaleRadio.y)
  }
  _test3 = () => {
    alert("초기화t")
    let canvas = document.querySelector('#rank1')
    let ctx = canvas.getContext('2d');
    ctx.restore()
    this._draw(this.state.rankList)
    // ctx.setTransform(1,0,0,1,0,0)
    
  }

  render() {
    console.log('랜더링')
    return (
      <div className="WeeklyApp">
        
        {/* <button onClick={this._test1}>이동</button>
        <button onClick={this._test2}>축소</button>
        <button onClick={this._test3}>초기화</button>
        <input id="xInput"/>
        <input id="yInput"/> */}
        
        
        {/* <div className="checkMovie"></div> */}
        
        {this.state.fatching ? this._renderRank()  : <img className="loadingImg"src={loading}/> }
        <canvas className="basic"  id="rank1" height="600" width="1200"></canvas>
        <canvas className="basic"  id="backLayer" height="600" width="1200"></canvas>
              
      </div>
    )
  }
}

export default App;
