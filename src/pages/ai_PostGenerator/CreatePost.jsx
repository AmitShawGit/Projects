import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { LoaderIcon } from 'react-hot-toast';
import ReactMarkdown from "react-markdown";
const CreatePost = () => {


  const { handleChange, handleSubmit, register, reset } = useForm()
  const [prompt, setPrompt] = useState([])

  const [aiData, setAIData] = useState([])

  const submitForm = async (value) => {
    console.log("I am value", value.promp);
    setAIData(prev => [...prev, { type: "user", prompt: value.promp }])
    reset()

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: value.promp,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://mayankstudypoint.com/",
            "X-OpenRouter-Title": "Learning",
            "Content-Type": "application/json",
          },
        }
      );
      setAIData(prev => [...prev, { type: "ai_response", ai_response: response.data?.choices[0]?.message?.content }])
      console.log("AI Response:", response.data);

      // localStorage.setItem('response', JSON.stringify(response.data))

    }
    catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
    }


  };


  const errorOnForm = (value) => {
    console.log(value);
  }


  return (
    <>
      <div className="row mb-3">
        {aiData.map((item, index) => (
          item.type === "user" ? (
            <div key={index} className="offset-lg-6 col-lg-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <ReactMarkdown>{item.prompt}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="col-lg-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <ReactMarkdown>{item.ai_response}</ReactMarkdown>

                </div>
              </div>
            </div>
          )
        ))}
      </div>

      <form onSubmit={handleSubmit(submitForm, errorOnForm)} >
        <div className="prompt_form">
          <div className="text-area">
            {/* <select name="" id="">
              <option value="">GPT-1</option>
            </select> */}
            <input name="prompt_user" onChange={handleChange} {...register('promp')} placeholder="Enter Topic to generate post" className="form-control"></input>
            <button type="submit" name="" className="submit_btn" ><i class="ri-send-plane-fill"></i></button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreatePost


// Textarea
// Dropdown
// Generate Button
// Loading State
// Response Card




