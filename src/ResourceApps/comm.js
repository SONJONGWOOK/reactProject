

const _check = (key , check , viewList ) => {
    if(check){
      let index = viewList.indexOf(key)
      viewList.splice(index, 1)
    }else{
      viewList.push(key)
    }
  }
  const _numCounter = (dom , domId, number) =>{
  let current = 0
  const domRoot = document.getElementById(domId)
  const MS = 100
  const changeNum = (dom) => {
    // console.log(number , omRoot.innerText)
    if(parseInt(dom.innerText) !== number){
      dom.innerText = ++current
    }
    
  }
  const SetInterval = (cb, ms) => setInterval(() => {
    if(current == number) return clearInterval(SetInterval)
    cb();
  }, ms);
  dom.innerText = 0 
  SetInterval(changeNum.bind(null, domRoot), MS);
}

export {_check}
export {_numCounter}
