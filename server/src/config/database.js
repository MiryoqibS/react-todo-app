import mongoose from "mongoose"
import { ENV } from "./env.js";

// == Подключение к базе данных ==
export const connectDatabase = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
    } catch (error) {
        console.log(`Не удалось подключиться к базе данных: ${error.message}`);
    };
};