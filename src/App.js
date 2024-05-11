import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [state1, setState1] = useState(false);
  
  return (
    <div className="App">
      <h1>
        Hola buenas
      </h1>
      <button onClick={()=>setState1(true)}>
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
