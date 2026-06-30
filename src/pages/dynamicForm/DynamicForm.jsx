
import { useState } from 'react';
import { toast } from 'react-hot-toast';
let DynamicForm = () => {
    let [showModal, setShowModal] = useState(false)
    let [formInput, setFormInput] = useState([{ name: 'Name', type: 'text', placeholder: "write your name" }])
    // here I recieve the suggested fields from AI 
    let [suggestion, setSuggestion] = useState([])
    let [formData, setFormData] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormData(formInput);

        alert(JSON.stringify(formData))
        toast.success('Form Successfully Submited')
        console.log(formData)


    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }))
    }

    const recommendedByAi = async () => {
        if (formInput.length < 0) {
            return toast.error('Please add more fields to get recommendation from AI')
        }
        const formFields = formInput.map((item) => `label:${item.name} type:${item.type} placeholder:${item.placeholder}`).join(',')

        console.log("form", formFields);



        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENROUTER_API_KEY}`,

                    "HTTP-Referer": "https://mayankstudypoint.com/",
                    "X-OpenRouter-Title": "Learning",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "model": "openrouter/free",
                    // "model": "meta-llama/llama-3.2-3b-instruct:free",
                    // "model": "cohere/north-mini-code:free",
                    // "model": "nvidia/llama-nemotron-rerank-vl-1b-v2:free",


                    "messages": [
                        {
                            "role": "system",
                            "content": "You are a UX UI designer. Analyze the user's current form structure and suggest exactly 3 logical next fields they should add. You must return ONLY JSON matching the requested schema. Do not add markdown formatting or code blocks."
                        },
                        {
                            "role": "user",
                            "content": `The form currently contains: [${formFields}]. Suggest the next 3 fields.`
                        }
                    ],
                    "response_format": {
                        "type": "json_object",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "recommendedFields": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "label": { "type": "string" },
                                            "type": { "type": "string" },
                                            "placeholder": { "type": "string" }
                                        },
                                        "required": ["label", "type", "placeholder"]
                                    }
                                }
                            },
                            "required": ["recommendedFields"]
                        }
                    }
                })
            });
            const data = await response.json();

            // OpenRouter returns stringified JSON in content, we must parse it
            const rawJsonContent = data.choices[0].message.content;
            const parsedData = JSON.parse(rawJsonContent);

            setSuggestion(parsedData || []);
        } catch (error) {
            console.error("OpenRouter direct fetch failed:", error);
        } finally {
            // setIsLoading(false);
        }

    }


    console.log("I am suggestion", suggestion);


    return (
        <>
            <div className="card mb-2 position-relative">
                <div className="card-body pt-5">
                    <form onSubmit={handleSubmit}>
                        {formInput?.map((item, index) => {

                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor={item.name}>{item.name}</label>
                                    <input type={item.type} name={item.name} id={item.name} className="form-control" onChange={handleChange} />
                                </div>
                            )

                        })}

                        <button type="button" className="position-absolute m-2 top-0 end-0 btn btn-primary" onClick={() => { setShowModal(true); recommendedByAi() }}>Add Input</button> &nbsp;
                        <button type="submit" className="btn btn-success">Save Data</button>
                    </form>
                </div>
            </div>

            {showModal && <Modal setFormInput={setFormInput} setShowModal={setShowModal} aiFields={suggestion?.fields} />}


        </>
    )
}

export default DynamicForm;

let Modal = ({ setFormInput, setShowModal, aiFields }) => {
    let [formData, setFormData] = useState()

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setFormData(prev =>
        ({ ...prev, [name]: value }))
    }

    const addInput = (label, type, placeholder) => {
        let compile = { name: label, type: type == undefined ? "text" : type, placeholder: placeholder }
        setFormInput(prev => [...prev, compile]);
    }
    let submitForm = (e) => {
        e.preventDefault();
        addInput(formData.label, formData.type, formData.placeholder)
        setShowModal(false)

    }
    let setByAi = (label, type, placeholder) => {
        addInput(label, type, placeholder)
        setShowModal(false)
    }





    return (
        <>
            <div className="card">
                <div className="card-body">
                    {aiFields?.map((item) => (<button className="btn btn-outline-success" onClick={() => setFormData(item.label, item.type, item.placeholder)}>{item.label}</button>))}
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <label htmlFor="modalLabel">Add Label</label>
                            <input type="text" id="label" className="form-control" name="label" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="placeholder">Placeholder</label>
                            <input type="text" name="placeholder" id="placeholder" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputType">Select input type</label>
                            <select name="type" id="inputType" onChange={handleChange} className="form-control">
                                <option value="text">text</option>
                                <option value="number">number</option>
                                <option value="password">password</option>
                                <option value="tel">tel</option>
                            </select>
                        </div>

                        <button className="btn btn-primary" type="submit">Add Field</button>
                    </form>
                </div>
            </div>


        </>
    )
}







