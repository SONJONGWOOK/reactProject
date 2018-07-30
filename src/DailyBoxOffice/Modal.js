import React, { Component } from 'react'
import './Modal.css'
import { resolve } from 'url'
import { rejects } from 'assert'
import loading from '../../asset/loading.gif'


class Modal extends Component{
    

  state = {
    fatching : false,
    reRender : false,
    info : undefined,
  }
//     static getDerivedStateFromProps(nextProps, prevState) {
    
//     console.log(nextProps)

//     if(nextProps.show){
//        let out;
//        let movieCd = nextProps.movieCd;
//        let info = fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=00c2ee4b72a6e5b37c1cb99897ac9376&movieCd='+movieCd)
//         .then(data => data.json())
//         .then(json => {
//                        console.log(json)                                             
//                        return json.movieInfoResult.movieInfo
                       
//         })

//         .catch(err => console.log(err))
//         out = {info : info}
        
//         console.log(out)
//         if(nextProps.info !== undefined){
//           console.log("내부 "+out);
//           out = {fatching : true}
//         }
        

//       return out

//     }
//     return null;
//  }
 
  // shouldComponentUpdate(nextProps, nextState) {

  //   console.log(nextProps)
  //   console.log(nextState)
  //   return true;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log("스냅샷")
    // console.log(prevState)
    // console.log(this.state)
    // console.log(prevProps)
    // console.log(this.props)
    // if(prevProps.movieCd !== this.props.movieCd){
      if(prevProps.show !== this.props.show){
      console.log(prevState)
      console.log(this.state)
      this._getMovieInfo();
    }


    return true;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("이건 왜 사용?")
  }
     
  _callInfo = () => {
        let movieCd = this.props.movieCd;    
        return fetch('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=00c2ee4b72a6e5b37c1cb99897ac9376&movieCd='+movieCd)
        .then(data => data.json())
        .then(json => json.movieInfoResult.movieInfo)
        .catch(err => console.log(err))
   }

   _getMovieInfo = async () => {
    let movieInfo = await this._callInfo();
    // console.log(movieInfo);
    this.setState({
      info : movieInfo,
    })
  
  }
 
  _renderInfo = () =>{
    // state.info 내역
    // array index
    // actors 
    // audits 
    // companys
    // directors
    // genres
    // staffs

    // object index
    // movieCd
    // movieNm
    // movieNmEn
    // movieNmOg
    // openDt
    // prdtStatNm
    // showTm
    // showTypes
    // typeNm
    

    // return 
    //       <MovieInfo 
    //         poster={this.props.poster}
    //         actors={this.state.info.actors}
    //         audits={this.state.info.audits}
    //         companys={this.state.info.companys}
    //         directors={this.state.info.directors}
    //         genres={this.state.info.genres}
    //         staffs={this.state.info.staffs}
    //         movieNm={this.state.info.movieNm}
    //         movieNmEn={this.state.info.movieNmEn}
    //         openDt={this.state.info.openDt}
    //         prdtStatNm={this.state.info.prdtStatNm}
    //         showTm={this.state.info.showTm}
    //         showTypes={this.state.info.showTypes}
    //         typeNm={this.state.info.typeNm}
    //         ></MovieInfo>
    console.log(this.satate)
    return  <MovieInfo
            poster={this.props.poster}
            audits={this.state.info.audits}
            openDt={this.state.info.openDt}
            showTm={this.state.info.showTm}
            movieNm={this.state.info.movieNm}
            actors={this.state.info.actors}
            genres={this.state.info.genres}
            directors={this.state.info.directors}
            ></MovieInfo>
  }
        
  _handelClose = () =>{
      
     this.setState({
      fatching : false,
      reRender : false,
      // info : undefined,
      
           
    })
    console.log(this.state)
    this.props.handleClose();
  }
     
  render() {
      console.log("랜더링  fatecstate 값 : " + this.state.fatching)
      return (
            
        <div className={ this.props.show ? 
        
        "modal display-block" : "modal display-none"}>
        <section className="modal-main">
           <button className="close-btn" onClick={this._handelClose}>close</button>
            {/* {this.props.show ? this._rederInfo() : '' } */}
            {/* {this.state.info !==undefined ? this._renderInfo(): '로딩' } */}
            {this.state.info ? ( this.state.info.movieNm ? this._renderInfo() : <Loading></Loading> ) : <Loading></Loading> }
            
            
          </section>
      </div>

       );
  }
}

function Loading({}){
  return <div className="Loading"><img src={loading}/></div>
}



// poster , actors, audits, companys, directors, genres, staffs, movieNm, movieNmEn, openDt, prdtStatNm, showTm, showTypes, typeNm
function MovieInfo ({poster , actors, audits, companys, directors, genres, staffs, movieNm, movieNmEn, openDt, prdtStatNm, showTm, showTypes, typeNm }){

  return <div className="Info">
            <div className="Info_Colums"><MoviePoster poster={poster}></MoviePoster></div>
            <div className="Info_Inner"> 
              <h1>{movieNm}</h1> 
              <MovieDetail actors={actors} genres={genres} directors={directors} audits={audits} openDt={openDt} showTm={showTm} ></MovieDetail>
              {/* <MovieDetail_bottom audits={audits} openDt={openDt} showTm={showTm} ></MovieDetail_bottom> */}
            </div>
          </div>
         
  // return  <div className="Info">
  //           <div className="Right_Info">
  //             <div className="Info_Colums">
  //               <MoviePoster poster={poster}></MoviePoster>
  //             </div>
              
  //             <div>  <h1>{movieNm}</h1> </div>
              
  //             <div className="Info_Colums">
  //               <MovieDetail actors={actors} genres={genres} directors={directors} ></MovieDetail>
  //             </div>
            
  //           </div>
  //         </div>
}

function MoviePoster ({poster}){  
  return  <img src={poster} className="Info_Poster" />
}

function MovieDetail ({actors , genres , directors , audits , openDt , showTm} ){ 

  return <div className="Info_Detail">
           <div className="Info_Detail_c">장르{genres.map( (genre , index) => <div className="Detail_Arrays" key={index}>{genre.genreNm}</div> )}</div>
           <div className="Info_Detail_c">감독{directors.map( (director , index) => <div className="Detail_Arrays"  key={index}>{director.peopleNm}</div> )}</div>
           <div className="Info_Detail_c">배우{actors.map( (actor , index) => <div className="Detail_Arrays" key={index}>{actor.peopleNm}</div> )} </div>
        
          <div className="Info_Detail_c">등급{audits.map( (audit , index) => <div className="Detail_Arrays" key={index}>{audit.watchGradeNm}</div> )}</div>
           <div className="Info_Detail_c">개봉일<div className="Detail_Arrays">{openDt}</div></div>
           <div className="Info_Detail_c">러닝타임<div className="Detail_Arrays">{showTm}분</div></div>
          </div>
}


// function MovieDetail ({actors , genres , directors } ){ 

//   return <div className="Info_Detail">
//            <div className="Info_Detail_c">장르{genres.map( (genre , index) => <div className="Detail_Arrays" key={index}>{genre.genreNm}</div> )}</div>
//            <div className="Info_Detail_c">감독{directors.map( (director , index) => <div className="Detail_Arrays"  key={index}>{director.peopleNm}</div> )}</div>
//            <div className="Info_Detail_c">배우{actors.map( (actor , index) => <div className="Detail_Arrays" key={index}>{actor.peopleNm}</div> )} </div>
            
//           </div>
// }
// function MovieDetail_bottom  ({audits , openDt , showTm } ){ 

//   return <div className="Info_Detail">
//           <div className="Info_Detail_c">등급{audits.map( (audit , index) => <div className="Detail_Arrays" key={index}>{audit.watchGradeNm}</div> )}</div>
//            <div className="Info_Detail_c">개봉일<div className="Detail_Arrays">{openDt}</div></div>
//            <div className="Info_Detail_c">러닝타임<div className="Detail_Arrays">{showTm}분</div></div>
//           </div>
// }



export default Modal;