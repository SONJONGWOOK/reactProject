import React, { Component } from 'react';
import Modal from './Modal'
import Movie from './Movie'
import './App.css';
import './movie.css';
import loading from '../../asset/loading.gif'

class App extends Component {
//reder 순서는 will-> render -> did
//update 순서는 will recevies(변경 getDerivedStateFromProps()) -> should -> true ->willupdqte - render 

constructor(props) {
  super(props)
  this._showModal = this._showModal.bind(this);
  this.state = {
    page  : 1 ,
    scrollH : 0,
    next : false,
    fatching :false,
    date : [],
    nbsp : ' ',
    show: false ,
    setModal : true,      
  }
}
  
  componentDidMount(){
    this._getMoives();
    window.addEventListener('scroll', this._handleScroll)
  }

  componentWillUnmount() {
    console.log('willunmount')
    window.removeEventListener('scroll', this._handleScroll)
    
  }

   _handleScroll = () => {

    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    var clientHeight = document.documentElement.clientHeight;
    
    // let heightScroll = window.innerHeight + window.scrollY
    // if(heightScroll === document.body.offsetHeight && this.state.next === false){
      
      if(scrollHeight-50 <= scrollTop+clientHeight && this.state.next === false){
      alert("다음 날짜");
      this.setState ({
          next : true,       
       })
      this._getMoives();
      
    }
   
   
  }
  _setDate = () =>{
    let dt = new Date();
    let mDay = (this.state.page-1)*5;
    
    dt.setDate(dt.getDate()-this.state.page-mDay);
    let month = dt.getMonth()+1;
    let day = dt.getDate();
    month = month > 9 ?  String(month) : "0"+String(month);
    day = day > 9 ?  String(day) : "0"+String(day);
    //console.log(dt.getFullYear()+""+month+""+dt.getDate());

    
    this.setState({
      date : [ ...this.state.date ,dt.getFullYear()+""+month+""+day]
    })
    return dt.getFullYear()+""+month+""+day;
  }

  _showModal = (movieCd) => {

        document.body.style.overflow = 'hidden';

      //   document.body.addEventListener("touchmove", function(event) {
      //     event.preventDefault();
      //     event.stopPropagation();
      // }, false);

      this.setState ({
          show : true,
          setModal : movieCd
       })
     
    } 

  _hideModal = () => {
        
        document.body.style.overflow = 'auto';
        
        this.setState ({
            show : false,
            setModal : ''
        })
    }

  



  _getPoster = (movies) =>{
    let count =0;
    
    movies.map( (movie , index) => {
      
      fetch('https://api.themoviedb.org/3/search/movie?api_key=2eb8461774852e09b603b1f2137ab5b9&query='+movie.movieNm+'&include_adult=true')
      // poster_path
      .then(data => data.json())
      //.then(json => json.boxOfficeResult.dailyBoxOfficeList)
      //.then(json => console.log(json) )
      //https://image.tmdb.org/t/p/original
      //.then(json => console.log(json.results[0].poster_path ) )
      //.then(json => console.log(json.results[0].poster_path ) )
      .then(json => { 
                      //movie.poster =  'https://image.tmdb.org/t/p/original'+json.results[0].poster_path
                      
                      if(!(json.results.length === 0)){
                        movie.poster = 'https://image.tmdb.org/t/p/original'+json.results[0].poster_path
                      
                      }else{
                        movie.poster =  'https://image.tmdb.org/t/p/original/tu2CF9DuAEE7V9hK0s6NPKbm6uv.jpg'  
                      }
                      //console.log(json.results[0].poster_path === undefined ? '/tu2CF9DuAEE7V9hK0s6NPKbm6uv.jpg' : json.results[0].poster_path )
                      //movie.poster =  'https://image.tmdb.org/t/p/original/tu2CF9DuAEE7V9hK0s6NPKbm6uv.jpg'
                      count++
                     
                      if(count===10) {
                        this.setState({
                          fatching : true,

                        })
                      }
                      
                    }
                     )
      .catch(err => console.log(err))
     
                    

      // movie.poster_path = poster_path
                           
    })
    
    return movies;
  }
  _callApi = () =>{
    const pageNum = this.state.page;
    const date = this._setDate();
    // alert(date)
    this.setState({
      page : pageNum+1
    })
    //console.log( fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating'))
    //fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating&page=1')
    //console.log("호출페이지"+pageNum)
    //console.log("날짜"+date)
    //return fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=00c2ee4b72a6e5b37c1cb99897ac9376&targetDt='+date)
    // http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList
    // return  fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=00c2ee4b72a6e5b37c1cb99897ac9376&targetDt='+date)
    return  fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=00c2ee4b72a6e5b37c1cb99897ac9376&targetDt='+date)
    .then(data => data.json())
    //.then(jsonData => console.log(jsonData))
    .then(jsonData => jsonData.boxOfficeResult.dailyBoxOfficeList)
    .catch(err => console.log(err))

    console.log("api Call JSON END")
 
 
  }
   
  _renderMovies = () => {
    console.log("dom render moives")
    let addDate = 0;
    let innerList ;
    let output;
    let movies = this.state.movies.map( (movie , index) => {
      innerList =   <Movie 
                    key={index}
                    title={movie.movieNm} 
                    poster={movie.poster} 
                    openDt={movie.openDt}
                    audiAcc={movie.audiAcc}
                    audiChange={movie.audiChange}
                    rankOldAndNew={movie.rankOldAndNew}
                    rankInten={movie.rankInten}
                    rank={movie.rank}
                    boxofficeType={movie.boxofficeType}
                    movieCd={movie.movieCd}
                    showModal={this._showModal}
                    >
                    </Movie>   
     if(index%10 === 0 || index%10  === 1 ){
      output = 
                    <div className="Outer" key={index} >
                        {index%10 ===0 ? <div className="Header"> {this.state.date[addDate++]} </div> : <div className="Header">  &nbsp; </div> }
                      {/* <div className="Header">{index%10  === 0 ? this.state.date[addDate++] : <br></>b}</div> */}
                     <div className="Inner">
                        <div className="Movie"> {innerList}  </div>
                      </div>
                    </div>
      } else{
        output = 
        <div className="Outer" key={index}>
        <div className="Header"></div>
       <div className="Inner">
          <div className="Movie" key={index}> {innerList}  </div>
        </div>
      </div>
      }
         
     return output
    })
    

   return movies
  }

  _getMoives = async () => {
    //await이유? 
    //callAPi의 기능이 끝나길 기다리고 그 후에 무비 리스트를 받아오겠다.라는 의미인덧
    console.log("getmovie")
     let addMovies = await this._callApi();
    
     addMovies = await this._getPoster(addMovies);
        let oddMovies = this.state.movies;
    if (!(oddMovies === undefined)) {
      addMovies = [...oddMovies , ...addMovies ];
    }
    
    this.setState ({
      // moives : moives 같은 효과
        movies : addMovies ,
        next : false,
        fatching : false,
     })
     
  }

  _dateLayer = () =>{
    return <div>
          <h1>{this.state.date}</h1>
    </div>
  }
  
  render() {  
    return (
      <div id="MainPage">
        <p className="headerTitle">{'DailyBoxOfficeList'}</p>
           
      <div className="App">
                
          <Modal show={this.state.show} 
                handleClose={this._hideModal} 
                movieCd={this.state.setModal.movieCd}
                poster={this.state.setModal.poster}
          ></Modal>       
        {this.state.movies ?   this._renderMovies() : <img src={loading}/> }
        </div>
       </div>
    )
  }

 
}

export default App;
