// import foodModel from '../models/foodModel.js'; 
// import fs from 'fs'


// //add food item


// const addFood=async (req,res)=>{

//    let image_filename=`${req.file.filename}`;

//    const food=new foodModel({
//     name:req.body.name,
//     description:req.body.description,
//     price:req.body.price,
//     category:req.body.category,
//     image:image_filename
//    })
// try{
//     await food.save();
//   res.json({success:true,message:"Food Added"})
// }
// catch(error)
// {
//     console.log(error)
//     res.json({success:false,message:"Error"})
// }
// }
// export {addFood}
// import foodModel from '../models/foodModel.js';
// import fs from 'fs';

// // Add food item controller
// export const addFood = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No image uploaded" });
//     }

//     const image_filename = req.file.filename;

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename
//     });

//     await food.save();
//     res.json({ success: true, message: "Food Added" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error adding food" });
//   }
// };
import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No image uploaded" });
  }

  const { name, description, price, category } = req.body;
  const image_filename = req.file.filename;

  try {
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};
//all food list
const listFood=async(req,res)=>{
     try{
      const foods=await foodModel.find({});
      res.json({success:true,data:foods})
     }
     catch(error){
      res.json({success:false,message:"Error"})
     }
}
//remove food item
const removeFood=async(req,res)=>{
try{
  const food=await foodModel.findById(req.body.id);
  fs.unlink(`uploads/${food.image}`,()=>{})

  await foodModel.findByIdAndDelete(req.body.id);
  res.json({success:true,message:"Food Removed"})
}
catch(error){
console.log(error);
res.json({success:false,message:"error"})
}
}

export { addFood,listFood, removeFood};
