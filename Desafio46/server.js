import koa from 'koa'
import { koaBody } from 'koa-body'
import routerCarts from './src/api/routes/carts.js'
import routerProducts from './src/api/routes/products.js'
import koaStatic from 'koa-static'

const app = new koa()

app.use(koaBody())

app.use(routerCarts.routes())
app.use(routerProducts.routes())
app.use(koaStatic('public'))


const PORT = 8080

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)
server.on('error', (err) => console.log('Server error', err))
