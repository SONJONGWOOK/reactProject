import express from 'express'
import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import {schedulePost , scheduleGet , schdeuleDelete} from '../scheduleMongo/factory'
const path = require('path')
const router = express.Router()


router.post('/post', (req, res) => {
    schedulePost(req.body).then( (result) =>{
        logger.info("저장완료")
        logger.info(result)
        res.send(result)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })

})

router.post('/remove', (req, res) => {
    logger.info("remove")
    schdeuleDelete(req.body).then( (result) =>{
        logger.info("삭제완료")
        logger.info(result)
        res.send(result)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
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