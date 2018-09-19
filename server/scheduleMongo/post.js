import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const post = (scheduleModel , data) =>{
    logger.info("테스트")
    logger.info(data)
    logger.info(data.type)
    logger.info(data.text)
    const save = new scheduleModel({
        type : data.type,
        text : data.text,
        date : data.setDate
    })
    
   save.save().then( () => logger.info("shedule save complete")).catch(e => logger.error(e))

}

export {post}
