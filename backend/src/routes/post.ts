import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {createPostInput,updatePostInput} from '@ravinpm11/medium-common'
const postRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string,
  }
}>()


postRoute.use('/*', async (c, next) => {
  
    const token = c.req.header("Authorization");

    if (!token) {
      return c.status(401),c.json({ message: 'Authorization token is missing' });
    }  
   try {
     const user =await verify(token,c.env.JWT_SECRET) as {id:string};
 
     if(user){
        c.set("userId", user.id);
        await next();
        
     }else{
         c.status(403)
         return c.json({
             message:"you are not logged in"
         })
     }
   } catch (error) {
    c.status(403);
    return c.json({
      message:"Invalid or expired token"
    })
   }
  })

postRoute.post('/blog',async(c)=> { 
  const authorId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();

      const result = createPostInput.safeParse(body);

      if(!result.success){
        c.status(411);
        return c.json({
          message:"Input's are incorrect"
        })
      }
    try {
      const post = await prisma.post.create({
          data:{
              title:body.title,
              content:body.content,
              authorId:authorId,
          }
      })
      return c.json({id:post.id,message:"blog posted"})
    } catch (error) {
      c.status(411);
      return c.json({
        message:"Error while posting job"
      })
      
    }
  })
  postRoute.put('/blog',async(c)=> {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const authorId = c.get("userId")
    console.log("author ka id",authorId);
    const body = await c.req.json()

    const result = updatePostInput.safeParse(body);

    if(!result.success){
      c.status(411);
      return c.json({
        message:"Inputs's are incorrect"
      })
    }
    
     try {
       const post =await prisma.post.update({
         where:{
             id: body.id,
         },data:{
             title:body.title,
             content:body.content,
         }
       })
 
 
     return c.json({id:post.id,message:"blog post changed"})
     } catch (error) {
        c.status(411)
        return c.json({
          message:"Error while updating the blog"
        })
     }
  })

  postRoute.get('/bulk',async(c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

     try {
         const post =await prisma.post.findMany({
          select:{
            content:true,
            title:true,
            id:true,
            author:{
              select:{
                name:true
              }
            }
          }
         })
         
       return c.json({
           post,message:"all blog"
       })
     } catch (error) {
        console.log(error);
        return c.json({error:"Error fetching blog"},500)
        
     }
  })

  //pagination
  postRoute.get('/:id',async(c)=> {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

     try {
       const post = await prisma.post.findMany({
         where:{
           id:id
         },
         select: {
           id: true,
           title: true,
           content: true,
           author: {
               select: {
                   name: true
               }
           }
       }
       })
     return c.json(post)
     } catch (error) {
        c.status(411)
        return c.json({
          message:"Error while fetching blog post"
        })
     }
  })

  export default postRoute