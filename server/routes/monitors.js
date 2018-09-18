import express from 'express'
import log4js , {jsonLogger , appLogger as logger} from '../logger/loggerInit'
import monitorFactory , {mongoose ,mem , cpu , tcp , memResult , cpuResult , tcpResult, tcpCount, memMaxResult} from '../monitor/monitorFactory'
const path = require('path')
const router = express.Router()


router.get('/conn' , (req , res) =>{
    let asdf = mongoose.connection.readyState
    console.log(asdf)
    console.log(typeof asdf)   
})


router.get('/' , (req , res) =>{
    let output = {
        "mem" : mem(),
        "tcp" : tcp(),
        "cpu" : cpu()
    }
    res.send(output)
})

router.get('/findMem' , (req , res) =>{
       
    memResult(10).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findMem/:count' , (req , res) =>{
       
    let count = req.params.count
    memResult(count).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findMemMax' , (req , res) =>{
       
    memMaxResult().then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findCpu' , (req , res) =>{
       
    cpuResult(10).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findCpu/:count' , (req , res) =>{
       
    let count = req.params.count
    cpuResult(count).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})


router.get('/findTcp' , (req , res) =>{
       
    tcpResult(10).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
     
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findTcp/:count' , (req , res) =>{
       
    let count = req.params.count
    tcpResult(count).then((posts) =>{
        return  posts
    }).then((findReuslt) => {
    
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/findTcpCount' , (req , res) =>{
    
    tcpCount().then((posts) =>{
        return  posts
    }).then((findReuslt) => {
        res.send(findReuslt)
    }).catch( (err) =>{
        logger.error(err)
        res.send(err)
    })
})

router.get('/mem' , (req , res) =>{
    res.send(mem())
})

router.get('/tcp' , (req , res) =>{
    res.send(tcp())    
})

router.get('/cpu', (req, res) => {
    res.send(cpu())
})



export default router