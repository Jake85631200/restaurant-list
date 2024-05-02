// 載入 Express
const express = require('express')
const app = express()

// 設定路由
const port = 3000

app.get('/', (req, res) => {
  res.send('this a restaurant-listing website!')
})

// 用來啟動伺服器
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})