import express from 'express'
const path = require('path')
const router = express.Router()

router.get('/' , (req , res) =>{
    res.send('post1231')
    
})

router.get('/test' , (req , res) =>{
    res.sendfile(path.join(__dirname , '../../public//test.html' ) )
    
})

router.get('/read/:id', (req, res) => {
    res.send('You are reading post ' + req.params.id)
})

export default router