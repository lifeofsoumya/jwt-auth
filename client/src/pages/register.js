import React, {useState} from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async(e) =>{
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {'Content-Type':' application/json'},
      body: JSON.stringify({name, email, password})
    })
    const data = await res.json();
    console.log(data);
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <br />
        <input type="Email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br />
        <input type='submit' value="Register"/>
      </form>

    </div>
  );
}

export default Register;
