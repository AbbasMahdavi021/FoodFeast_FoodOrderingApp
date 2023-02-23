import './App.css';
import  axios from 'axios';

function App() {

  let handleClick = async () => {
    let res;
    res = await axios.get(`http://localhost:8080/about`);
    console.log(res.data);
    

  }

  return (
    <div className="App">
      <p> Hello World</p>
      
      <button onClick = {handleClick}>  </button>
    </div>
  );
}

export default App;
