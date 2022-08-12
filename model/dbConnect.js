import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async ()=>{
    mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("successfully connected to mongoDB atlas")
    })
    .catch((err)=>{
        console.log("unable to connect to mongoDb atlas");
        console.error(err);
    });
}

export default dbConnect;