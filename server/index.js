const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth')

app.post('/api/register', async(req, res)=>{
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }); 
        res.json({status: 'ok'});
    }
    catch(err){
        console.log(err)
        res.json({status: 'Not ok', error: 'duplicate email'}); // duplicate as mongodb schema has email == unique
    }
})

app.post('/api/login', async(req, res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
        })
    
    if(user){
        const token = jwt.sign({
            email: user.email
        }, 'secret')
        return res.status(200).json({status : 'ok', user: token});
    }else{
        return res.status(400).json({status : 'not ok', user: 'false'});
    }

    
})


app.get('/api/quote', async(req, res)=>{

    const token = req.headers['x-access-token']
    try{
        const decoded = jwt_decode(token, 'secret');
        const email = decoded.email;
        const user = await User.findOne({email:email});
        return res.json({status: 'ok', quote: user.quote})
    }catch(err){
        console.log(err)
        res.json({status: 'err', error: 'invalid token'})
    }  
    
})

app.post('/api/quote', async(req, res)=>{

    const token = req.headers['x-access-token']
    try{
        const decoded = jwt_decode(token, 'secret');
        const email = decoded.email;
        await User.updateOne(
            {email:email},
            {$set: {quote: req.body.quote}}
            );

        return res.json({status: 'ok'})
    }catch(err){
        console.log(err)
        res.json({status: 'err', error: 'invalid token'})
    }
    
    
})


app.get('/api/users', (req, res)=>{
    res.send('api/users route');
})

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
