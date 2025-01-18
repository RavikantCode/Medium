import { SigninType } from "@ravinpm11/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostInput((prevPostInput) => ({
      ...prevPostInput,
      [name]: value,
    }))
  }

  async function sendRequest() {
    try {
      console.log("Request data:", postInput);

      const response = await axios.post(
        `http://127.0.0.1:8787/api/v1/user/${type === "signup" ? "signup" : "signin"}`,

        postInput,
        { headers: { "Content-Type": "application/json" ,
          Authorization:`${localStorage.getItem("token")}`
        } }
      );
      

      console.log(response.data)

      const token = response.data.jwt
      console.log("------------------------",token);
      
      localStorage.setItem("token", token)
      navigate("/blogs")
    } catch (error) {
      console.error("Error during request:", error)
    if(axios.isAxiosError(error)){
      console.log(error.response?.data);
      
    }
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="h-screen bg-white flex justify-center flex-col">
      <div className="flex justify-center mb-2">
        <div className="text-3xl font-extrabold">
          {type === "signup" ? "Create your Account" : "Sign in to your Account"}
        </div>
      </div>

      <div className="text-slate-400 flex justify-center">
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
        <Link className="underline" to={type === "signup" ? "/signin" : "/signup"}>
          {type === "signup" ? "Sign in" : "Sign up"}
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <LabelInput label="email" type="text" placeholder="email" onChange={handleChange} />
        <LabelInput label="password" type="password" placeholder="password" onChange={handleChange} />
        <button
          onClick={sendRequest}
          type="button"
          className="text-white mt-5 w-48 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  )
}

interface LabelInputType {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-600">{label}</label>
      <input
        onChange={onChange}
        name={label}
        type={type || "text"}
        id={label}
        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  )
}
