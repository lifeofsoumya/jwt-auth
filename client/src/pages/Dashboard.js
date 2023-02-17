import React, { useEffect, useState} from 'react';
import { useNavigate } from'react-router-dom';
import jwt_decode from 'jwt-decode';

const Dashboard = () =>{
    const history = useNavigate();
    const [quote, setQuote] = useState();
    const [tempQuote, setTempQuote] = useState();

    async function populateQuote(){
        const req = await fetch('http://localhost:8080/api/quote',{
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        const data = await req.json();
        console.log(data);
        if(data.status === 'ok'){
            setQuote(data.quote)
        }
        else{alert(data.error)}
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt_decode(token);
            if(!user){
                localStorage.removeItem('token');
                history.replace('/login');
            }else{ // if user exists in token
                populateQuote();
            }
        }
    }, [])

    async function updateQuote(e){
        e.preventDefault();
        const req = await fetch('http://localhost:8080/api/quote',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({quote: tempQuote})
        })
        const data = await req.json();
        console.log(data);
        if(data.status === 'ok'){
            setTempQuote('')
            setQuote(data.quote)
        }
        else{alert(data.error)}
    }

    return(
        <div>
            <h1> Your quote: {tempQuote} </h1>
            <form onSubmit={updateQuote}>
                <input type="text" value={tempQuote} onChange={e => setTempQuote(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Dashboard;