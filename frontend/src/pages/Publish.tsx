import { ChangeEvent, useState } from "react"
import { AppBar } from "./AppBar"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish=()=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()
    return (
    <div>
        <AppBar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border-gray-300 text-gray-900
                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title"></input>
            <TextEditor onChange={(e)=>{
                setDescription(e.target.value);
            }}/>

           <button
           onClick={async()=>{
                const res =await axios.post(`http://127.0.0.1:8787/api/v1/post/blog`,{
                    title,
                    content:description
                }, {  
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${res.data.id}`)
           }}
                type="button"
                className="text-white bg-green-500 hover:bg-green-800 focus:outline-none
                            font-medium rounded-full 
                            text-sm px-5 py-2.5 text-center">
            Publish
            </button>

            </div>
        </div>

    </div>
    
)}

export function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}