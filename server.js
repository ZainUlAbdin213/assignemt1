const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 80;

app.use(express.json());

async function connectDb() {
  try {
    await mongoose.connect("mongodb+srv://thegamer213988:window100@cluster0.khgbak2.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected Successfully!")
  } catch (error) {
    console.log(error)
  }
}
connectDb()

const userSchema = new mongoose.Schema({
  AddTask: String,
})
const User = mongoose.model('User', userSchema)

app.post('/create', async (req, res) => {
  const { AddTask } = req.body
  const user = new User({
    AddTask
  })
  await user.save()
  res.status(200).json(user)
})

app.get('/getUser',async(req,res)=>{
  const user = await User.find()
  res.status(200).json(user)
})

app.put('/update/:id',async(req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(user)
})

app.delete('/delete/:id',async(req,res)=>{
  const user = await User.findByIdAndDelete(req.params.id,req.body,{new:true})
  res.json(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
