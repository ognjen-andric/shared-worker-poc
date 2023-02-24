import './App.css';
import {useState} from 'react';
import { WebsocketWorker } from './service/ws-worker';

function App() {
  const [counter, setCounter] = useState<number>(0);
  const worker =  WebsocketWorker;
  
  const addCounter = () => {
    console.log('sending updated value by 100');
    worker.port.postMessage({
      event: 'incrementGlobalCounter',
      payload: 100
    });
  }
  worker.port.onmessage = (e) => {
    console.log('Received value '+e.data.payload+ ' from worker.');
    setCounter(e.data.payload);
  }

  return (
    <div className="App">
 
      <p>{counter}</p>
      <button onClick={addCounter}>+</button>
    </div>
  );
}

export default App;
