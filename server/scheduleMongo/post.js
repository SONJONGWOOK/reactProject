import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const post = (scheduleModel , data) =>{
   
    const save = new scheduleModel({
        type : data.type,
        text : data.text,
        date : data.date
    })
    
//    save.save().then( (e) => {
//        logger.info("shedule save complete") 
//     }).catch(e => {
//         logger.error(e)
//     })
    return save.save()
    
}

export {post}
