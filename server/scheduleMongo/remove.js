import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const deleteOne = (scheduleModel , data) =>{
   
    const remove = new scheduleModel({
        _id : data._id , 
        type : data.type,
        text : data.text,
        date : data.date,
        property : data.property,
    })
    return remove.remove();
}

const deleteOneGantt = (ganttModel , data) =>{
   
    const remove = new ganttModel({
        _id : data._id , 
        type : data.type,
        text : data.text,
        start : data.start, 
        end  : data.end , 
        property : data.property,
    })
    return remove.remove();
}

export {deleteOne}
export {deleteOneGantt}
