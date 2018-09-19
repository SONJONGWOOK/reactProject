import express from 'express'
import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import {schedulePost , scheduleGet} from '../scheduleMongo/factory'
const path = require('path')
const router = express.Router()


router.post('/post', (req, res) => {
    schedulePost(req.body)
    logger.info("저장완료")
    logger.info(req.body)
})

router.get('/get' , (req , res) =>{
        
    scheduleGet().then((result) =>{
        return  result
    }).then((findReuslt) => {
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})


export default router