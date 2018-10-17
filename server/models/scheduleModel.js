import mongoose from 'mongoose'

mongoose.Promise = global.Promise

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

const gantt = new Schema ({
    type : { type : String},
    text : { type : String } ,
    start : { type : Date} ,
    end : { type : Date} ,
    },
    {
        timestamps: true
})

export const ModelBasic = basic
