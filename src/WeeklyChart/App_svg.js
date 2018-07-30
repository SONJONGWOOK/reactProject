import React, { Component } from 'react';
import logo from './logo.svg';
import './chart/chart.css'
class App extends Component {


  componentDidMount(){
    this._draw();
  }

  _draw = () =>{
    
    let style
    
    document.querySelector('#svg1').innerHTML = '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /> ' 
    style = {
      fill:'yellow' ,
      stroke:'purple',
      strokeWidth:'2'
    } // 이걸로는 적용안댐
    document.querySelector('#svg2').innerHTML = '<ellipse cx="100" cy="80" rx="100" ry="50"  style="fill:yellow;stroke:purple;stroke-width:2"/>' //스타일 적용방법을 찾아봐야할꺼같음

    document.querySelector('#svg3').innerHTML = '<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />' 
    // x1 속성은 x 축에서 선의 시작을 정의합니다
    // y1 속성은 y 축에서 선의 시작을 정의합니다
    // x2 속성은 X 축의 선 끝을 정의합니다
    // y2 속성은 y 축에서 선의 끝을 정의합니다

    document.querySelector('#svg4').innerHTML =  '<polygon points="10,10 190,10 100,190" style="fill:lime;stroke:purple;stroke-width:1" />'
    document.querySelector('#svg5').innerHTML =  '<polyline points="20,20 40,25 60,40 80,120 120,140 200,180" style="fill:none;stroke:black;stroke-width:3" />'

    document.querySelector('#test').innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="777" height="480" style=""><title>my vector image</title><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="#FFFFFF" stroke="none"/><g style="" class="currentLayer"><title>Layer 1</title><rect fill="#4a90d6" stroke="#222222" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" id="svg_1" x="232" y="81" width="160" height="101" style="color: rgb(0, 0, 0);"/></g></svg>'
                                        
    
    


  }

  


  render() {
    console.log('render')
    return (
      <div className="App">
        <div>
          circle
          <svg id="svg1" width="200" height="200"></svg>
        </div>       
        <div>
         ellipse
          <svg id="svg2" width="200" height="200">
            {/* <ellipse cx="100" cy="80" rx="100" ry="50"  style={{fill:'yellow' , stroke:'purple' , strokeWidth:'2'} } />   */}
          </svg>
        </div> 
        <div>
          line
          <svg id="svg3" width="200" height="200"></svg>
        </div>      

         <div>
          polygon
          <svg id="svg4" width="200" height="200"></svg>
        </div>       
       
        <div>
          polyLine
          <svg id="svg5" width="200" height="200"></svg>
        </div>     
        
        <div id="test">
        
        
        </div>


      </div>
      
      
    );
  }
}

export default App;
