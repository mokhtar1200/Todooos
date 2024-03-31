const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")
const TodoModel=require("./Modules/Todo")
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static("public"))

mongoose.connect('mongodb://127.0.0.1:27017/Bi')
  .then(() => console.log('Connected!'));


app.post("/add",(req,res)=>{

const task=req.body.task

TodoModel.create({
    task:task
}).then(result=>res.json(result))
.catch(err=>res.json(err))
})

app.get("/get",(req,res)=>{

TodoModel.find()

.then(result=>res.json(result))
.catch(err=>res.json(err))

})

app.delete("/delete/:id",(req,res)=>{
const {id}=req.params;
TodoModel.findByIdAndDelete({_id:id})
.then(result=>res.json(result))
.catch(err=>res.json(err))
})

app.listen("3001",()=>{
    console.log("serveur is live on port 3001")
})