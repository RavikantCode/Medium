import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import userRoute from './routes/user'
import postRoute from './routes/post'
import { cors } from 'hono/cors'

const app = new Hono<{Bindings:{DATABASE_URL:string,JWT_SECRET:string}}>()

app.use('/*', cors())
app.route('/api/v1/user',userRoute)
app.route('/api/v1/post',postRoute)



export default app