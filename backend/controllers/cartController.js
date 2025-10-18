import userModel from"../models/userModel.js"

//add items to user cart
// const addToCart=async(req,res)=>{
// try {
//    let userData=await userModel.findById((req.body.userId)) ;
//    let cartData=await userData.cartData;
//    if(!cartData[req.body.itemId]){
//     cartData[req.body.itemId]=1;
//    }
//    else{
//     cartData[req.body.itemId]+=1;
//    }
//    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//    res.json({success:true,message:"Added To Cart"});
   
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
    
// }
// }

// //remove items from user cart
// const removeFromCart=async(req,res)=>{
//     try {
//         let userData=await userModel.findById(req.body.userId)
//         let cartData=await userData.cartData;
//         if(cartData[req.body.itemId]>0)
//         {
//   cartData[req.body.itemId]-=1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Removed From Cart"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }

// }
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // Set from authMiddleware
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });

  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//fetch user cart data
// const getCart=async (req,res) =>{
//   try {
    
//     let userData=await userModel.findById(req.body.userId);
//     let cartData=await userData.cartData;
//     res.json({success:true,cartData})
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
//   }

// }
const getCart = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // ✅ Debug step 1

    const userId = req.userId;
    if (!userId) {
      console.log("❌ No userId provided");
      return res.json({ success: false, message: "Missing userId in request" });
    }

    const userData = await userModel.findById(userId);
    console.log("User Data:", userData); // ✅ Debug step 2

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (error) {
    console.error("🔥 Error in getCart:", error); // ✅ See exact cause
    res.json({ success: false, message: "Error" });
  }
};


export{addToCart,removeFromCart,getCart}
