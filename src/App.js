import { React, useEffect, useState } from "react";
import './App.scss';


function App() {
const [responses, setResponses] = useState([]);
const [prompts, setPrompts] = useState([]);
const [prompt, setPrompt] = useState([]);

   useEffect(() => {
    setPrompts([...prompts, prompt])
    const promptAPI = {
      prompt: prompt,
      // temperature: 0.5,
      // max_tokens: 64,
      // top_p: 1.0,
      // frequency_penalty: 0.0,
      // presence_penalty: 0.0,
     };
 }, [prompt]);

 const promptAPI = {
  prompt: prompt,
  // temperature: 0.5,
  // max_tokens: 64,
  // top_p: 1.0,
  // frequency_penalty: 0.0,
  // presence_penalty: 0.0,
 };
  
//   useEffect(() => {
//    const postPrompt = async () => {
//     try {
//       const res = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
//           },
//           body: JSON.stringify(promptAPI),
//          })
//          const data = await res.json();
//          setResponses([...responses, data.choices[0]]);
//          console.log("res", responses)
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   postPrompt();
// }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target[0].value;
    setPrompt(input);
    const postPrompt = async () => {
      try {
        const res = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
            },
            body: JSON.stringify(promptAPI),
           })
           const data = await res.json();
           setResponses([...responses, data.choices[0]]);
           console.log("res", responses)
      } catch (err) {
        console.log(err);
      }
    };
    postPrompt();
  };

  return (
    <main>
      <header>
        <h1>
          Fun with AI
        </h1>
        </header>
        <form onSubmit={handleSubmit}>
      <label htmlFor="prompt-input">Enter prompt</label>
      <textarea id="prompt-input" name="prompt-input" rows="10" cols="50">

</textarea>
      <button>Submit</button>
      </form>
      <section>
        <h2>Responses</h2>
<div className="test">
        {prompts.map((prompt, index) => {
        return (
          <div key={index} className="response-card">
            
{prompt.prompt}
          </div>
        );
      })}

        {responses.map((res, index) => {
        return (
          <div key={index} className="response-card">
            
{res.text}
          </div>
        );
      })}
      </div> 
      </section>


    </main>
  );
}

export default App;
