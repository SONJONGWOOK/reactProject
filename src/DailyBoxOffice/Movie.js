import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal'
import './movie.css';

class Movie extends Component{

    // state = {
    //             show: false 
    //         }
    // _showModal = () => {
        
    //     document.body.style.overflow = 'hidden';

    //     this.setState ({
    //         show : true
    //     })
    // } 

    // _hideModal = () => {
        
    //     document.body.style.overflow = 'auto';
    //     this.setState ({
    //         show : false
    //     })
    // }


    _hrefscroll = () =>{
        
    }

    _onClickDataBind = () =>{
        
       let sendData = {
            movieCd : this.props.movieCd,
            poster  : this.props.poster
       }
        this.props.showModal(sendData);
    }

    
    render(){

     return(

      // <div  className="Movie">
        <div className="Inner">
              <div className="Movie_Colums Movie_Poster">
              <a href={this._hrefscroll()} onClick={this._onClickDataBind}><MoviePoster poster={this.props.poster} alt={this.props.title}></MoviePoster></a>
            </div>
            <div className="Movie_Colums">
                <a href={this._hrefscroll()} onClick={this._onClickDataBind}><h1>{this.props.title}</h1></a>
                <div className="Movie_Rank">
                    순위 : {this.props.rank}({this.props.rankInten==='0' ? '-' : this.props.rankInten > 0 ? '+'+this.props.rankInten : this.props.rankInten})  신규여부 : {this.props.rankOldAndNew}
                    {/*genres.map( (genre ,index) => <MoiveGenres genre={genre} key={index} /> ) */}
                    
                    {/*genres.map( (genre , index) => { <MoiveGenres genre={genre} key={index} /> } )*/}
                </div>
                {/* <p className="Movie_Info"> */}
                    {/* 개봉일 :  {openDt}  누적관객수 : {audiAcc} 관객증감비 : {audiChange} */}
                    <MovieInfo openDt={this.props.openDt} audiAcc={this.props.audiAcc} audiChange={this.props.audiChange}></MovieInfo>
                {/* </p> */}
            </div>
        </div>
        // </div>
        )
    }
}



function MoviePoster ({poster , alt}) {

    return(
      <img src={poster} alt={alt} title={alt} className="Movie_Poster"/>
    )
}
function MovieInfo ({openDt , audiAcc , audiChange  }) {
    return(
        <div className="Movie_Info">
        <span >개봉일 : {openDt}   </span> 
        <span >누적관객수 : {audiAcc}   </span> 
        <span >관객증감비 : {audiChange}   </span> 
        </div>
    )
}
/*
Movie.propsTypes = {
    title : PropTypes.string.isRequired ,
    poster : PropTypes.string.isRequired ,
    genres : PropTypes.string.isRequired ,
    synopsis : PropTypes.string.isRequired ,
    
}

MoviePoster.propsTypes = {
    poster : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired,
}
MoiveGenres.propsTypes = {
    genres : PropTypes.string.isRequired,
} 
*/

export default Movie;
