// 載入 Express
const express = require('express')
const app = express()

// 設定路由
const port = 3000

// 將請求的 URL 與指定的路徑結合，以定位並返回相應的靜態資源文件。
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('this a restaurant-listing website!')
})

// 將根路徑重新導向至restaurant.json
app.get('/', (req, res) => {
  res.redirect('/restaurant')
})

// 使用 params 做動態路由
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`reading restaurant id: ${id}`)
})

// 用來啟動伺服器
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})