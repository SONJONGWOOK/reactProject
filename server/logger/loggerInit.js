//log4js
const log4js = require('log4js')

log4js.addLayout('json', (config) => {
    return (logEvent)=>{ return JSON.stringify(logEvent) + config.separator; }
})
log4js.configure("./log4js.config.json" , {reloadSec : 30} )
// const etcLogger = log4js.getLogger('etcLogger')

//3가지 방식으로 할수있음.
// {}로 감싸면 변수그대로 모듈화
// 선언방식으로 할때는 지정하고 = 값 넣고 모듈화
// default 옵션은 import할때 가장 기본되는 변수를 모듈화
// 실제로 받을때
// import log4js , {appLogger as logger} from './logger/loggerInit';
// default로 한것은 그대로 log4js로 받았고
// const AppLogger은 appLogger로 받아서 logger라는 이름으로 변경하여 사용


// export {etcLogger}
export const jsonLogger = log4js.getLogger('jsonOut')
export const appLogger = log4js.getLogger('app')
export default log4js

