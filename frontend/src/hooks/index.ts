import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog{
    content:string,
    title:string,
    id:string,
    author:{name:string}
}

export const useBlogs =()=>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8787/api/v1/post/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
                .then((response)=>{
                   setBlogs(response.data.post);
                   setLoading(false)
        })
    },[])
    return { blogs,loading}
}

export const useBlog =({id}:{id:string})=>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog>();

    // console.log(blog);
    // console.log(id);
    
    

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8787/api/v1/post/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
                .then((response)=>{
                    console.log("Fetched Blog:", response.data); 
                    
                   setBlog(response.data[0]);
                //    setBlog(response.data.post);
                   setLoading(false)
        })
    },[id])
    return { blog,loading}
}