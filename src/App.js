import { React, useEffect, useState } from "react";
import './App.scss';


function App() {
const [responses, setResponses] = useState([]);
const [prompts, setPrompts] = useState([]);
const [prompt, setPrompt] = useState({});

useEffect(() => {
  document.title = "Ashley Chiu - Fun with AI"
}, []);

const postPrompt = async () => {
  try {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target[0].value;
    setPrompt({
      prompt: input,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
     });
    setPrompts([...prompts, prompt])
    postPrompt();
    e.target.reset();
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
        <h2>Responses</h2>
<div className="test">
        {responses.length ? (responses.map((res, index) => {
          const prompt = prompts[index];
        return (
          <div key={index} className="response-card">
            <p>Prompt: {prompt.prompt}</p>    
            <p>Response: {res.text}</p>
          </div>
        );
      })) : (<p>Please enter a prompt</p>)}
      </div> 
      </section>
    </main>
  );
}

export default App;
