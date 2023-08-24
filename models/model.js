const mongoose=require('mongoose');

const dataSchema=mongoose.Schema(
    {
    name:
    {
        type:String,
        required:[true, "Please Enter Valid data"]
    }
    ,
    quantity:
    {
        type:Number,
        required:true,
        default:0

    }
    ,price:
    {
        type:Number,
        required:true,
    }
    
},

//timestamps used to track when data is saved to the database and when data is modified on the database
{
    timestamps:true
}

)
const product=mongoose.model('product', dataSchema);
module.exports=product;