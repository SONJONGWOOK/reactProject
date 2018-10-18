import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'


const getScheduleList = (scheduleModel) =>{
    return scheduleModel.find()
}
const getScheduleGanttList = (ganttModel) =>{
    return ganttModel.find()
}

export {getScheduleList}
export {getScheduleGanttList}

