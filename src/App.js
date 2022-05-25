import { React, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import './App.scss';


function App() {
const [responses, setResponses] = useState([]);
const [prompts, setPrompts] = useState([]);
const [prompt, setPrompt] = useState({});
const [firstRender, setFirstRender] = useState(true);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  document.title = "Ashley Chiu - Fun with AI";
  setFirstRender(false)
}, []);

useEffect(() => {
  if (!firstRender){
  const postAPI = async () => {
    setIsLoading(true);
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
         setResponses([data.choices[0], ...responses]);
         setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  postAPI();
  setPrompts((prev) => [prompt, ...prev])
}
}, [prompt]);

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
  e.target.reset();
};

const handleSelect = (e) => {
  e.preventDefault();
  const input = e.target.value;
  setPrompt({
    prompt: input,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   });
};

  return (
    <main>
      <header>
        <h1>
          Fun with AI
        </h1>
        </header>
        <section>
        <div className="select">
  <select onChange={handleSelect}>
    <option>Select a prompt</option>
    <option value="">I'm feeling lucky (Random response)</option>
    <option value="Knock knock">Knock knock</option>
    <option value="Tell me a joke">Tell me a joke</option>
    <option value="Siri, what do you think of Alexa?">Siri, what do you think of Alexa?</option>
    <option value="What should Elon Musk buy next?">What should Elon Musk buy next?</option>
    <option value="How to fix Google without Googling?">How to fix Google without Googling?</option>
  </select>
</div>
        <form onSubmit={handleSubmit}>
      <label htmlFor="input">Or enter your own here:</label>
      <textarea id="input" name="input" rows="10" cols="50"></textarea>
      <button type="submit" className="btn">Submit</button>
      </form></section>
      <section>
<div className="response-container">
{isLoading && responses.length === 0 && (
  <LinearProgress/>
      )}
        {responses.length > 0 && <><h2>Responses</h2>
       <p>{isLoading && (
  <LinearProgress/>
      )}</p>
        {responses.map((res, index) => {
          const prompt = prompts[index];
        return (
          <div key={index} className={index === 0? "animation response-card": "response-card"}>
            <p>Prompt:</p><p>{prompt.prompt}</p>
            <p>Response: </p><p>{res.text}</p>
          </div>
        );
      })}</>}
      </div> 
      </section>
    </main>
  );
}

export default App;
