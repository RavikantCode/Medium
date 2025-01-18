import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { AppBar } from "./AppBar"
import { BlogCard } from "./BlogCard"


export const Blogs = () => {
  const {blogs,loading} = useBlogs();
  console.log(blogs);
  
  if(loading){
    return <div>
      <AppBar/>
      <div>

      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      </div>

    </div>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl m-3">

        <div className="border-b-slate-800 mb-4">
          <AppBar />
        </div>
        <div className="space-y-4">
        {blogs.map((post)=> (
            <BlogCard
                key={post.id}
                id={post.id}
                authorname={post.author.name || "Anonymous"}
                title={post.title}
                content={post.content}
          />)
          )}
         
        </div>
      </div>
    </div>
  )
}
