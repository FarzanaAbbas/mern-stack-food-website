import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://farzu502:whspDAZzeBqYr4DV@cluster0.hv7vd.mongodb.net/FOODWEBSITE');
        console.log('DB connected');
    } catch (err) {
        console.error('Connection error:', err);
    }
};
