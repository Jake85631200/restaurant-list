// 載入 Express
const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
// 設定路由
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' })) // extname: handlebars 的功能，用來指定樣版引使用的擴充文件名
app.set('view engine', '.hbs')
app.set('views', './views')

// 將請求的 URL 與指定的路徑結合，以定位並返回相應的靜態資源文件。
app.use(express.static('public'))

// 將根路徑重新導向至restaurant.json
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  // index.hbs 的 <input name='keyword'> ，name 將用於識別該字段的值，因此為 req.query.keyword 而非教案的 req.query.search
  const keyword = req.query.keyword?.trim() 
  const matchedRestaurant = keyword ? restaurants.filter((store) =>
    Object.values(store).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  // { A : B }: A 是視圖模板中可以訪問的變量名稱，而 B 是你要傳遞給視圖模板的實際數據。
  res.render('index', { restaurants: matchedRestaurant, keyword })
})

// 使用 params 做動態路由
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((store) => store.id.toString() === id)
  res.render('detail', { restaurant })
})

// 用來啟動伺服器
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})