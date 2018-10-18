import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const post = (scheduleModel , data) =>{
   
    logger.debug(data)

    const save = new scheduleModel({
        
        type : data.type,
        text : data.text,
        date : data.date,
        property : data.property,

    })  
    return save.save()
    
}

const postGantt = (ganttModel , data) =>{
   
    logger.debug(data)

    const save = new ganttModel({     
        type : data.type,
        text : data.text,
        start : data.start, 
        end  : data.end , 
        property : data.property,

    })  
    return save.save()
    
}



export {post}
export {postGantt}
