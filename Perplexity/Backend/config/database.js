import mongoose from "mongoose";

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Sucessfully connected with database");
        
    })
}

export default connectToDb