import getDate from '../../server/utils/Date'
import colorList from '../../server/utils/colorList'

let offsetX 
let offsetY
let xPoint
let yPoint
let xSet
let ySet
let canvas
let ctx
let size
let yMax

let color = colorList

const _draw = (canvasId , data , axis) =>{
    
    canvas = document.querySelector('#'+canvasId)
    ctx = canvas.getContext('2d');
    //초기에 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    size = _radio(canvas) 



    yMax = axis.yMax
    // offsetX = _radio(canvas).x
    // offsetY = _radio(canvas).y
    offsetX = 1200
    offsetY = 600
    //x축 보통 시간순으로 표현  data길이가 시간이니 전체 /시간 = 시간당 칸수
    // console.log((offsetX-(offsetX*(1/6))))
    // console.log(data.length)
    xPoint = (offsetX-(offsetX*(1/6))) /data.length
    //y축 값의 퍼센트로 표현 y축 크기 /100 1퍼센트당 몇포인트인지 표현
    yPoint = (offsetY-(offsetY*(1/6))) /100
    
    xSet = (offsetX*(1/6))/2
    ySet = (offsetY*(1/6))/2

    // console.log("포인트")
    // console.log(xPoint)
    // console.log(yPoint)
    ctx.beginPath()
    ctx.fillStyle = "#000000"
    ctx.strokeStyle ="#000000"
    ctx.lineWidth = 1
    
    ctx.moveTo( (offsetX*(1/6))/2 , (offsetY*(1/6))/2  )
    ctx.lineTo( (offsetX*(1/6))/2 , offsetY-((offsetY*(1/6))/2) )
    ctx.lineTo( offsetX-((offsetX*(1/6))/2) , offsetY-((offsetY*(1/6))/2) )
    

    // y축 
    for(let i = 0 ; i<11 ;i++){
        ctx.fillText( yMax-( (yMax/10)*i) , 0 ,  ((offsetY*(1/6))/2) + yPoint*(i*10))     
    }

    //x축
    //시간 표현 2~3가지만 처음 중간 끝
    ctx.fillText( getDate(data[data.length-1].date) , (offsetX*(1/6))/2 , offsetY-((offsetY*(1/6))/2)+20 )
    ctx.fillText( getDate(data[0].date) , (offsetX-(offsetX*(1/6))/2)-20 , offsetY-((offsetY*(1/6))/2)+20 )
    // console.log(data[0])
    ctx.stroke()
    
    axis.y.map( (y , index) =>{
        
        if(!axis.viewY.includes(y)) return

        _drawLine(data ,axis, index)    
    })
}
const _drawLine = (data , axis , yIndex)  =>{
    
    let x=  offsetX-((offsetX*(1/6))/2)   
    let arrLength = data.length
    ctx.beginPath()
    ctx.fillStyle = color[yIndex]
    ctx.strokeStyle = color[yIndex]

    data.map( (data, index)=>{
        
        let y = _persent(yMax , data[axis.y[yIndex]])
        
        y = y*yPoint
        ctx.lineTo(x, offsetY-((offsetY*(1/6))/2) - y)
        ctx.moveTo(x,offsetY-((offsetY*(1/6))/2) - y)
        ctx.arc(x, offsetY-((offsetY*(1/6))/2) - y, 1, 0, 2*Math.PI);
        // console.log(index + "   :    "+arrLength +" " + index==arrLength-1)
        if(index == 0 && y != 0){
            ctx.fillText( axis.y[yIndex] , x, (offsetY-((offsetY*(1/6))/2) - y)-10 )  
        }
        ctx.closePath()

        x -= xPoint
        
    })

    ctx.stroke()
}

const _radio = (canvas) =>{
    return { 
        x : canvas.offsetWidth ,
        y : canvas.offsetHeight
     }
}

const _persent = (maxValue , currentValue) =>{
    return currentValue/maxValue*100
}

const _nameSpace = (axis)  =>{
    let out
    let index = 0
    return axis.map( (y ) =>{
       out = { 'name' : y , 'color' : color[index++]}
       return out
    })
}

export {_draw}
export {_nameSpace}
