import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import mongoose from 'mongoose'
// import {ModelBasic} from '../models/scheduleModel';
import {post , postGantt} from './post'
import {deleteOne , deleteOneGantt}from './remove'
import {getScheduleList, getScheduleGanttList}from './find'


const Schema = mongoose.Schema

const basic = new Schema ({
    property : {type : String},
    type : { type : String},
    text : { type : String } ,
    date : { type : Date} ,
    },
    {
        timestamps: true
})

const gantt = new Schema ({
    property : {type : String},
    type : { type : String},
    text : { type : String } ,
    start : { type : Date} ,
    end : { type : Date} ,
    },
    {
        timestamps: true
})
    
const scheduleConn = mongoose.createConnection('mongodb://jsplays.iptime.org:27017/schedule')
// .then( (conn)=> {
//         console.log('Successfully connected to mongodb to schedule')
//         (conn.connection.readyState)
//     return conn
// })
// .catch(e => console.error(e))
// console.log("mongoose  " ,mongoose.connection.readyState)
// console.log("scheduleConn  " ,scheduleConn.connection.readyState)

const scheduleModel = scheduleConn.model('schedule' , basic , 'schedule')
const ganttModel = scheduleConn.model('gantt' , gantt , 'gantt')


export const scheduleGet = () => { return getScheduleList(scheduleModel) }
export const schedulePost = (data) => {return post(scheduleModel , data) }
export const schdeuleDelete = (data) =>{return deleteOne (scheduleModel , data )}

export const scheduleGanttGet = () => { return getScheduleGanttList(ganttModel) }
export const scheduleGanttPost = (data) => {return postGantt(ganttModel , data) }
export const schdeuleGanttDelete = (data) =>{return deleteOneGantt (ganttModel , data )}



