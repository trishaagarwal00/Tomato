import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://trishagarwal:9897852652@cluster0.mj9qdij.mongodb.net/food-del').then(()=>console.log("DB connected"));
}