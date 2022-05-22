import { React, useEffect, useState } from "react";
import './App.scss';


function App() {
const [responses, setResponses] = useState([]);
const [prompts, setPrompts] = useState([]);
const [prompt, setPrompt] = useState({});

useEffect(() => {
  document.title = "Ashley Chiu - Fun with AI"
}, []);


const handleSubmit = (e) => {
  e.preventDefault();
  const input = e.target[0].value;
  setPrompt({
    prompt: input,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   });
   console.log("after", prompt)
  setPrompts((prev) => [prompt, ...prev])
  console.log("prompts", prompts)
  postPrompt();
  e.target.reset();
};

const postPrompt = async () => {
  try {
    console.log("before", prompt);
    const res = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(prompt),
       })
       const data = await res.json();
       setResponses([...responses, data.choices[0]]);
  } catch (err) {
    console.log(err);
  }
};

  

  return (
    <main>
      <header>
        <h1>
          Fun with AI
        </h1>
        </header>
        <section>
        <form onSubmit={handleSubmit}>
      <label htmlFor="input">Enter prompt</label>
      <textarea id="input" name="input" rows="10" cols="50"></textarea>
      <button type="submit" className="btn">Submit</button>
      </form></section>
      <section>
<div className="response-container">
        {responses.length > 0 && <><h2>Responses</h2>
        {responses.map((res, index) => {
          const prompt = prompts[index];
        return (
          <div key={index} className="response-card">
            <p>Prompt: {prompt.prompt}</p>    
            <p>Response: {res.text}</p>
          </div>
        );
      })}</>}
      </div> 
      </section>
    </main>
  );
}

export default App;
