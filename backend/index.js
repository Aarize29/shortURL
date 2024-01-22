const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  URL = require('./models/url');
const User  = require('./models/user');
require('dotenv').config();

const app = express();
const port = 3000;



app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGODB_URI,).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})


//Authentication

//Register

app.post('/register',async(req,res)=>{
   try {
    const {firstname, lastname, email,password}=req.body
   // const hashedPassword =  await bcrypt.hash(password,10)

    const newUser = new User({
        firstname,
        lastname,
        email,
        //password: hashedPassword,
        password
      });
    
    await newUser.save();

    res.json({status:"ok"})

   } catch (error) {
         console.log(error);
         res.status(500).send("Error");
   }

})


//Login

const secret="aarize_secret"
app.post('/login',async(req,res)=>{
    try {
     const {email,password}=req.body
    //console.log(email,password);

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if(password===user.password){
        const token = jwt.sign({ userId: user._id }, secret);
        res.json({status:"ok",accessToken:token})
    }
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
})



// //auth middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Bearer token missing or invalid.' });
  }

  const extractedToken = token.split(' ')[1];
   
   const decoded=jwt.verify(extractedToken,secret)
    req.user = decoded;



    next();

}



  
//user details

app.get('/user',verifyToken,async(req,res)=>{
  try {

    const user=req.user
      const userDetail=await User.findOne({_id:user.userId})
      res.json(userDetail)

    
  } catch (error) {

    console.log(error)
    res.status(500).send("Error")
    
  }
} )

//update user details

app.put('/user',verifyToken,async(req,res)=>{
  try {
        const user=req.user
        const {firstname,lastname,email}=req.body
        await User.updateOne({_id:user.userId},{$set:{firstname,lastname,email}})
        res.json({status:"ok"})
        
  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
})

//URL Shortener

// const shortURL=shortid.generate()

app.post('/shorturl',verifyToken,async(req,res)=>{

  try {
    const user=req.user

  const {longURL,detail}=req.body
  const shortURL=shortid.generate()

  const newURL = new URL({
    longURL,
    detail,
    shortURL,
    userId:user.userId
  });
  await newURL.save();
   
  res.json({shortURL:shortURL})
  } catch (error) {
    
    console.log(error)
    res.status(500).send("Error")
  }

})

app.get('/:shortURL', async(req,res)=>{

    try {
      
      const shortid=req.params.shortURL
      //console.log(shortid);
      const url=await URL.findOne({shortURL:shortid})
    if(!url){
        return res.status(404).send("Not found")
    }
    res.redirect(url.longURL)

    } catch (error) {
     
      console.log(error)
      res.status(500).send("Error")
    }
})


//get all urls
app.get('/api/urls',verifyToken,async(req,res)=>{
  try {
    const user=req.user
    const urls=await URL.find({userId:user.userId})
    res.json(urls)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error")
  }
})

app.delete('/api/urls/:id',verifyToken,async(req,res)=>{

  try {

    const user=req.user
    const id=req.params.id
    await URL.deleteOne({_id:id,userId:user.userId})
    res.json({status:"ok"})
    
  } catch (error) {

    console.log(error)
    res.status(500).send("Error")
  }})



app.listen(port, () => console.log(`App listening on port ${port}!`));