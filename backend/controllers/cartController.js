import userModel from "../models/userModel.js"

//add items to userCart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        // Handle case where user is not found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {};  // Initialize cartData if it doesn't exist
        
        // Add item to cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update user cart in DB
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

//remove items from userCart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        // Handle case where user is not found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let cartData = userData.cartData || {};  // Initialize cartData if it doesn't exist

        // Remove item from cart if it exists and quantity is greater than 0
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // Optionally remove the item completely if quantity reaches 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update user cart in DB
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        // Handle case where user is not found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};  // Initialize cartData if it doesn't exist
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export {
    addToCart,
    removeFromCart,
    getCart
}