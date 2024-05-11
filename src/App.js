import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [state1, setState1] = useState(false);


  const get = async ()=> {
    setState1(true);
    const res = await axios.get("https://localhost:3000");
  }
  
  return (
    <div className="App">
      <h1>
        Hola buenas
      </h1>
      <button onClick={()=>get()}>
        Click
      </button>
      {state1===true &&(
        <h1>
          Funco?
        </h1>
      )}
    </div>
  );
}

export default App;
