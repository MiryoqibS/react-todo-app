import { connectDatabase } from "./config/database.js";
import { app } from "./config/server.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 8080;
// == Запуск сервера ==
const start = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту: ${PORT}`);
        });
    } catch (error) {
        console.log(`Не удалось запустить сервер: ${error.message}`);
    };
};

start();