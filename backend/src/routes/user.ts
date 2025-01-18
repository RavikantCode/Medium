import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput,signupInput } from '@ravinpm11/medium-common'
import { cors } from 'hono/cors'
const userRoute = new Hono<{Bindings:{DATABASE_URL:string,JWT_SECRET:string}}>()


userRoute.post('/signup',async(c)=>{ 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();

  try {
  
  const result = signupInput.safeParse(body);
  
  if(!result.success){
    c.status(411);
    return c.json(
      { message: "Invalid input"},
       
    )
  }


    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
      }
    })


    const token = await sign({id:user.id},c.env.JWT_SECRET)

    return c.json({ jwt: token ,message:'User created successfully'})

  } catch (error) {
    c.status(500);
    return c.status(500),c.json({ message: 'Error during signup' });
  }
  

})
  
    
userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
    const result = signinInput.safeParse(body);
  
  if(!result.success){
    c.status(400);
    return c.json({
      message:"Input's are incorrect"
    })
  }
    
     const user = await prisma.user.findFirst({
         where: {
             email: body.email
         }
     });
 
     if (!user) {
         c.status(404);
         return c.json({ error: "user not found" });
     }
 
     const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
     return c.json({ success:true,message:"Signed in Sucessfully",jwt})
   } catch (error) {
    console.error('Signin error:', error);
    return c.json({ 
      success: false,
      message: 'Error during signin'
    }, 500)
  }

})



export default userRoute
