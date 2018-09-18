import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const basic = new Schema ({
    type : { type : String},
    text : { type : String } ,
    date : { type : Date , default : Date.now}
    },
    {
        timestamps: true
    }
)

export const ModelBasic = basic
