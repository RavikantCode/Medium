import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput } from '@ravinpm11/medium-common';
const userRoute = new Hono();
userRoute.use('/*', async (c, next) => {
    await next();
});
userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const result = signinInput.safeParse(body);
    if (!result.success) {
        c.status(411);
        return c.json({
            message: "Input's are incorrect"
        });
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token, message: "signed-up" });
    }
    catch (error) {
        console.log(error);
        return c.status(403);
    }
});
userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const result = signinInput.safeParse(body);
    if (!result.success) {
        c.status(411);
        return c.json({
            message: "Input's are incorrect"
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: jwt, message: "signed-in" });
    }
    catch (error) {
        c.status(411);
        return c.json({
            message: "Logged In"
        });
    }
});
export default userRoute;
