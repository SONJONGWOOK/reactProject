import React, { Component } from 'react';
import logo from './logo.svg';
import './chart/chart.css'
class App extends Component {


  componentDidMount(){
    this._draw();
  }

  _draw = () =>{
    let canvas = document.getElementById('tutorial');
    let ctx
    if(canvas.getContext){
      ctx = canvas.getContext('2d')

      ctx.fillStyle = 'rgb(200, 0, 0)'
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
      ctx.fillRect(30, 30, 50, 50);
    }

    canvas = document.querySelector('#tutorial2')
    
    if(canvas.getContext){
      ctx = canvas.getContext('2d');
      
      ctx.beginPath();
      ctx.moveTo(0, 0); //10 10 에서 시작
      ctx.lineTo(0, 200); //첫번째 점 선택 10 100
      ctx.lineTo(200, 0); // 두번째 점 200 10
      ctx.lineTo(200, 200); // 200 100
      ctx.moveTo(0, 0); //10 10 에서 시작
      ctx.fillStyle = 'rgb(200, 0 , 0 )'
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0); //10 10 에서 시작
      ctx.lineTo(200, 0); //첫번째 점 선택 10 100
      ctx.lineTo(0, 200); // 두번째 점 200 10
      ctx.lineTo(200, 200); // 200 100
      ctx.lineTo(0, 0); // 200 100
      ctx.fillStyle = 'rgb(0, 0 , 0 )'
      ctx.fill();
    
    }

    
    canvas = document.querySelector('#tutorial3')
    
    if(canvas.getContext){

      ctx = canvas.getContext('2d');
            
      ctx.beginPath();
      ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
      ctx.fillStyle =  'rgb(300 , 300 , 0 )'
      ctx.fill();
      ctx.moveTo(135, 115);
      ctx.arc(100, 115, 35, 0, Math.PI, false); 
      ctx.moveTo(80, 80);
      ctx.arc(75, 80  , 5, 0, Math.PI * 2, true); 
      ctx.moveTo(130, 80);
      ctx.arc(125, 80, 5, 0, Math.PI * 2, true);  
      ctx.stroke();

     
    }

    canvas = document.querySelector('#tutorial4')
    
    if(canvas.getContext){

      ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = '#FD0';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#6C0';
      ctx.fillRect(100, 0, 100, 100);
      ctx.fillStyle = '#09F';
      ctx.fillRect(0, 100, 100, 100);
      ctx.fillStyle = '#F30';
      ctx.fillRect(100, 100, 100, 100);
      ctx.fillStyle = '#FFF';

      ctx.globalAlpha = 0.5;

      for (let i =0 ; i < 10 ; i++){
        ctx.beginPath();
        // ctx.arc(100, 100, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fillRect( 10+ (i*20) , 0, 10, 200); 
        ctx.fill()

      }
     
    }

    canvas = document.querySelector('#tutorial5')
    
    if(canvas.getContext){

      ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.fillRect(0, 0, 200, 200);
      ctx.save();
      ctx.fillStyle =  '#09F';   
      ctx.fillRect(20, 20, 160, 160);

      ctx.fillStyle =  '#FFF';   
      ctx.fillRect(40, 40, 120, 120);

      ctx.fillStyle =  '#FF0';   
      //이렇게하면 노란네모가 아니라 검정 네모가 나온다.
      ctx.restore();  
      ctx.fillRect(60, 60, 80, 80);
     
    }

    



       this._animaionInit();

  }

  _aniDraw = () =>{
    let max =200;

    let x = 200;
    let y = 200;
    let ctx = document.querySelector('#tutorial6').getContext('2d');
    let add=0;
    ctx.beginPath();
    ctx.fillStyle = '#FF0';
    ctx.fillRect( 0 , 0, x, y); 
    ctx.save();

    setInterval( () => {
      // ctx.translate(100 , 100)
      add+=0.001;
      x=x-add*2;
      y=y-add*2;
      

      if(x <= 0) {
        x = 200
        y = 200
        add=0
        
      }
      console.log(x)
      ctx.clearRect(0, 0, 200, 200);

      ctx.fillRect( 0 , 0 , x, y);   
      
    } ,5)


    
    // ctx.restore();

    // ctx.fill()

  }
  _testDraw = (max) =>{
    let ctx = document.querySelector('#tutorial6').getContext('2d');
    
    let x = 0;
    let y = 200;
    let add=1;

    let pivot=add;
    let t = true
    ctx.beginPath();
    ctx.fillStyle = '#FF0';
    
    let interval = setInterval( () => {

      if(t){
        pivot = add
      }else{
        pivot = -add
      }
      
      if(x > 200){
        x=200
        t=false
      }else if( x < 0){
        x=0
        t=true
      } 

      
      x=x+(pivot);
      
      
      ctx.clearRect(0, 0, 200, 200)
      ctx.fillRect( 0 , 0 , x, y);   
      
    
    } ,5)
   
   
    

    

    ctx.clearRect(0, 0, 200, 200);
    ctx.fillRect(0, 0, max, max ); // Shadow
    
    ctx.restore();
    
  }



  _animaionInit = () =>{
    
    window.requestAnimationFrame(this._testDraw)


  }



  render() {
    console.log('render')
    return (
      <div className="App">
       <canvas className="basic" id="tutorial" height="200" width="200">test</canvas>
       <canvas className="basic" id="tutorial2" height="200" width="200">test</canvas>
       <canvas className="basic" id="tutorial3" height="200" width="200">test</canvas>
       <canvas className="basic" id="tutorial4" height="200" width="200">test</canvas>
       <canvas className="basic" id="tutorial5" height="200" width="200">test</canvas>
       <canvas className="basic" id="tutorial6" height="200" width="200">test</canvas>
      </div>
    );
  }
}

export default App;
