import express from "express";
import cors from "cors";
import { requestsLoggerMiddleware } from "../middlewares/requestsLogger.middleware.js";
import { errorsHandlerMiddleware } from "../middlewares/errorsHandler.middleware.js";
import { todoRouter } from "../routes/todo.routes.js";

export const app = express();

// == Базовые Middlewares ==
app.use(express.json());
app.use(cors());

// == Кастомные Middlewares ==
app.use(requestsLoggerMiddleware);

// == Роуты ==
app.use("/api", todoRouter);

// == Обработчик ошибок ==
app.use(errorsHandlerMiddleware);