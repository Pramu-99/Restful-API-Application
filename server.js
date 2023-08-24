const express=require('express');
const mongoose=require('mongoose');
//const { updateMany } = require('./models/model');
const Product=require('./models/model');
const app=express();

app.use(express.json());

//routes
app.get('/',(req, res)=>{
res.send('Hello Node API')
});

//sample to get some output
app.get('/blog',(req, res)=>{
res.send('Welcome to blog');
});


//post request used to store in the database
app.post('/product',async(req, res)=>{
    try
    {
    const product=await Product.create(req.body);
    res.status(200).json(product);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message:error.message});
    }
  

});


//get request used to retrieve something from database

//fetch data from the database
app.get('/product',async(req ,res)=>{
    try{
        const product=await Product.find({});
        res.status(200).json(product);
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
});


//fetch data by id from database
app.get('/product/:id',async(req, res)=>{
try
{  
   const {id}=req.params;
   const sinProduct=await Product.findById(id);
   res.status(200).json(sinProduct); 
}catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
}
});


//update and delete from database
//put() method used to update the database

app.put('/product/:id',async(req, res)=>{

    try{
    const {id}=req.params;
    const upProduct=await Product.findByIdAndUpdate(id,req.body);
    if(!upProduct)
    {
        res.status(404).json({message:`cannot find product with id:${id}`});
    }
    const finalUpdate=await Product.findById(id);
    res.status(200).json(finalUpdate);
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
});


//delete from database
app.delete('/product/:id',async(req, res)=>{
try{
const {id}=req.params;
const delProduct=await Product.findByIdAndDelete(id);
if(!delProduct)
{
    res.status(404).json({message:`cannot find product with id:${id}`});
}
res.status(200).json(delProduct);

}catch(error){
console.log(error);
res.status(200).json({message:error.message});
}
});

mongoose.
connect('mongodb+srv://root:root123@myapi.ec0l7f6.mongodb.net/API?retryWrites=true&w=majority')
.then(()=>{
console.log('Connected to Database');

app.listen(8000 ,()=>{
    console.log('Node API app is Running on port 8000');
    });

}).catch((error)=>{

    console.log(error);
})

