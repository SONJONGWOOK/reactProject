import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const out = () =>{
    const a = { "test" : 1  , "inner" : process.memoryUsage() } 
    return a
}
export default out