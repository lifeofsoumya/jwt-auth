import React, {useState} from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e) =>{
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {'Content-Type':' application/json'},
      body: JSON.stringify({email, password})
    })
    const data = await res.json();
    console.log(data);
    if(data.user !== 'false'){ // if data.user exits in data we are passing the jwt token from backend, if user exists
      localStorage.setItem('token', data.user)
      alert('login successful');
      window.location.href = '/dashboard';
    }else{
      alert('Please check Email and Password')
    }
    console.log(data);
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="Email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br />
        <input type='submit' value="Login"/>
      </form>

    </div>
  );
}

export default Login;
