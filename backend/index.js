const express = require('express')
const server = express()
const pao = require('./src/data/pao.json')

const port = process.env.PORT || 8080;

server.get('/pao', (req, res) =>{
    return res.json(pao)
})

server.listen(port, () => {
    console.log('servidor está funcionando ...')
})