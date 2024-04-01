const express = require ("express");
const bcrypt = require("bcrypt");
const app = express();

const User = require('./model/UserModel');
const Feedback = require("./model/Feedback.js");
const connectToDatabase = require("./db.js");

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const port =3000;

connectToDatabase();

app.get('/',(req,res)=>{
    res.send("HEllo world");
});


app.listen(port,()=>{
     console.log(`The app running at http://localhost:${port}`);
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
       const user = new User(req.body);
       await user.save();
       res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
       res.status(500).send({ message: 'Error creating user', error });
    }
   });

   // Login route
app.post('/login', async (req, res) => {
    try {
       const user = await User.findOne({ username: req.body.username });
       if (!user) return res.status(400).send({ message: 'User not found' });
   
       const isMatch = await bcrypt.compare(req.body.password, user.password);
       if (!isMatch) return res.status(400).send({ message: 'Invalid password' });
   
       
   
       res.send({ message: 'Login successful', role: user.role });
    } catch (error) {
       res.status(500).send({ message: 'Error logging in', error });
    }
   });
   

   app.post('/feedback', async(req,res)=>{
      const { feedback } =req.body;
      if(!feedback){
         return res.status(400).json({message:"Enter a FeedBack"});
      }
      try{
         const message = new Feedback({feedback});
         const newMessage = await message.save();
         res.status(201).json(newMessage);
         console.log("Sucess")
      }catch(err){
         res.status(500).json({message: err.message})
      }
      app.get('/feedback', async (req, res) => {
         try {
           const feedback = await Feedback.find();
           res.json(feedback);
         } catch (err) {
           res.status(500).json({ message: err.message });
         }
       });
   });
   