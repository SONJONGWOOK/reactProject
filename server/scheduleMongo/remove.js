import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'

const deleteOne = (scheduleModel , data) =>{
   
    const remove = new scheduleModel({
        _id : data._id , 
        type : data.type,
        text : data.text,
        date : data.date
    })
    return remove.remove();
}

export {deleteOne}
