import logo from './logo.svg';
import './App.css';
import  axios from 'axios';

function App() {

  let handleClick = async () => {
    let res;
    res = await axios.get(`http://localhost:8080/test`);
    console.log(res.data.f2);

  }

  return (
    <div className="App">
      <p> Hello Work</p>
      
      <button onClick = {handleClick}>  </button>
    </div>
  );
}

export default App;
