
const express = require('express')
const app = express()
const port = 3030

app.post('/', (req, res) => {
  res.send({date: new Date().toString()})
})

app.get('/', (req, res) => {
  res.send({date: new Date().toString()})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
