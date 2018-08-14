let colorList = []
while(colorList.length <= 50){
    let color = '#'+(Math.round(Math.random() * 0xFFFFFF).toString(16))
    if(colorList.includes(color)) continue
    colorList.push(color)
}

  export default colorList