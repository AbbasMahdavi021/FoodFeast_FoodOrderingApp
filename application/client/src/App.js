import  axios from 'axios';

function App() {

  let handleClick = async () => {

    let res;
    res = await axios.get(`/test`);
    console.log("Recieved Info: " + res.data.msg);

  }

  return (

    <div className="App">
      <p> Hello! This is the main FrontEnd - Page</p>
      
      <button onClick = {handleClick}> </button>
    </div>

  );
}

export default App;
