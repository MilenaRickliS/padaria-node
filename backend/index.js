const express = require('express')
const server = express()
const pao = require('./src/data/pao.json')

server.get('/pao', (req, res) =>{
    return res.json(pao)
})

server.listen(8080, () => {
    console.log('servidor está funcionando ...')
})