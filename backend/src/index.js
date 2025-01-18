import { Hono } from 'hono';
import userRoute from './routes/user';
import postRoute from './routes/post';
const app = new Hono();
app.route('/api/v1', userRoute);
app.route('/api/v1', postRoute);
export default app;
