export const errorsHandlerMiddleware = (error, req, res, next) => {
    console.log(`Ошибка: ${error.message}`);

    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "внутрення ошибка сервера",
    });
};