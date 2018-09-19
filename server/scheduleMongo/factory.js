import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import mongoose from 'mongoose'
import {ModelBasic} from '../models/scheduleModel';
import {post} from './post'
import {getScheduleList}from './find'


const Schema = mongoose.Schema

const basic = new Schema ({
    type : { type : String},
    text : { type : String } ,
    date : { type : Date} ,
    // date : { type : Date , default : Date.now}
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

export const scheduleGet = () => { return getScheduleList(scheduleModel) }
export const schedulePost = (data) => {  
                                             return post(scheduleModel , data) 
                                            }


