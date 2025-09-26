import { todoService } from "../services/todo.service.js";

class TodoController {
    // == Создание задачи ==
    async createTodo(req, res, next) {
        try {
            if (!req.body.text) throw ApiError.BadRequestError("текст задачи не передан");
            const todo = await todoService.createTodo(req.body);

            return res.status(201).json({
                message: "задача создана",
                success: true,
                todo,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Получение задач ==
    async getTodos(req, res, next) {
        try {
            const todos = await todoService.getTodos();

            return res.status(200).json({
                success: true,
                todos,
            });
        } catch (error) {
            next(error);
        }
    }

    // == Удаление задачи ==
    async deleteTodo(req, res, next) {
        try {
            const id = req.params.id;
            await todoService.deleteTodo(id);

            return res.status(200).json({
                success: true,
                message: "задача была успешна удалена",
            });
        } catch (error) {
            next(error);
        }
    }

    // == Отметить задачу ==
    async toggleTodo(req, res, next) {
        try {
            const id = req.params.id;
            await todoService.toggleTodo(id);

            return res.status(200).json({
                success: true,
                message: "задача было успешно изменена",
            });
        } catch (error) {
            next(error);
        }
    }
};

export const todoController = new TodoController();