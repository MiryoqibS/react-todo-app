import { todoService } from "../services/todo.service.js";
import { ApiError } from "../errors/ApiError.js";

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

    // == Изменение задачи ==
    async updateTodo(req, res, next) {
        try {
            const id = req.params.id;
            const { text, deadline, description } = req.body;
            const updatedTodo = await todoService.updateTodo(id, { text, deadline, description });
            if (!updatedTodo) {
                return res.status(404).json({
                    success: false,
                    message: "задача не была найдена",
                });
            };

            return res.status(200).json({
                success: true,
                message: "задача успешно обновлена",
                todo: updatedTodo.toObject(),
            });
        } catch (error) {
            next(error);
        }
    }

    // == Изменение порядка задач ==
    async reorderTodos(req, res, next) {
        try {
            const updatedTodos = req.body;

            if (!Array.isArray(updatedTodos)) {
                return res.status(400).json({
                    success: false,
                    message: "нужен массив задач",
                });
            };

            await todoService.reorderTodos(updatedTodos);

            return res.status(200).json({
                success: true,
                message: "порядок задачи успешно обновлён"
            });
        } catch (error) {
            next(error);
        };
    }

    // == Отметить задачу как избранную ==
    async startTodo(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw ApiError.BadRequestError("идентификатор задачи не был передан");
            const updatedTodo = await todoService.starTodo(id);

            return res.status(200).json({
                success: true,
                message: "задача успешно добавлена в избранные",
                todo: updatedTodo.toObject(),
            });
        } catch (error) {
            next(error);
        };
    }
};

export const todoController = new TodoController();