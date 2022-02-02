import './App.css';

function App() {
  const callLoginApi = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
    })
    .then((r)=>r.json().then((json)=>console.log(json)), (r)=>{console.log(r.json().then((json)=>console.log(json)))})
  }

  return (
    <div className="App">
      <div className='App-header'>
        Login
        <form onSubmit={callLoginApi}>
        <input type='text' placeholder='Enter username' name='username' /> <br/>
        <input type='password' placeholder='Enter password' name='password' /> <br />
        <input type='submit' value='login'/>
      </form>
      </div>
    </div>
  );
}

export default App;
