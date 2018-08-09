import express from 'express'
import monitorFactory , {mem , cpu , tcp} from '../monitor/monitorFactory'
const path = require('path')
const router = express.Router()


router.get('/' , (req , res) =>{
    let output = {
        "mem" : mem(),
        "tcp" : tcp(),
        "cpu" : cpu()
    }
    res.send(output)
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