import rateLimiter from "express-rate-limit";
import slowDown from "express-slow-down";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import { requestsLoggerMiddleware } from "../middlewares/requestsLogger.middleware.js";
import { errorsHandlerMiddleware } from "../middlewares/errorsHandler.middleware.js";
import { todoRouter } from "../routes/todo.routes.js";
import { ENV } from "./env.js";

export const app = express();

console.log(ENV.FRONTEND_ORIGIN);


// == Безопасность сервера ==
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "data:", "https:"],
            "scripts-src": ["'self'"],
        },
    },
    crossOriginResourcePolicy: {
        policy: "cross-origin",
    },
}));
app.disable("x-powered-by");
app.use(hpp());

// == Ограничители ==
const requestsLimiter = rateLimiter({
    windowMs: 1000 * 60 * 15, // 15 минут
    max: 100, // макс. 100 запросов за Window
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(requestsLimiter);

const speedLimiter = slowDown({
    windowMs: 1000 * 60 * 15,
    delayAfter: 50,
    delayMs: () => 500,
});
app.use(speedLimiter);

// == Оптимизация сервера ==
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10kb",
}));

// == Сайты которым разрешён доступ к серверу ==
app.use(cors({
    origin: (origin, cb) => {
        const allowed = [ENV.FRONTEND_ORIGIN];
        cb(null, allowed.includes(origin));
    },
    credentials: true,
}));

// == Кастомные Middlewares ==
app.use(requestsLoggerMiddleware);

// == Роуты ==
app.use("/api", todoRouter);

// == Обработчик ошибок ==
app.use(errorsHandlerMiddleware);