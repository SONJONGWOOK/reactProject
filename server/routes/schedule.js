import express from 'express'
import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import {schedulePost} from '../scheduleMongo/factory'
const path = require('path')
const router = express.Router()


router.post('/post', (req, res) => {
    console.log("시작")
    logger.info(req.body)  
    schedulePost(req.body)
    console.log("끝")
    
})



export default router