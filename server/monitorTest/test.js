import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const out = () =>{
    let test = '테스트'
    logger.info(test)
    return test
}
export default out