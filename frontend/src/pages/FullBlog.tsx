import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog =({blog}:{blog:Blog})=>{
   
    
    return <div>

        <AppBar/>
        <div className="flex justify-center text-5xl"></div>
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
            <div className="col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>

                <div className="">
                    {blog.content}
                </div>
            </div>

            <div className="col-span-4">
                <div>Author
                    <div className="flex"><Avatar size={6} name={blog.author.name}/></div>
                    <div className="text-2xl font-bold pt-2">
                        {blog.author.name || "Anonymous"}
                    </div>

                    <div>
                    Random Catch ability to catch to random phrase
                    </div>
                </div>
            </div>
              

        </div>
    </div>
}