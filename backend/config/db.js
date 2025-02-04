import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected');
    } catch (err) {
        console.error('Connection error:', err);
    }
};
