import { TodoModel } from "../models/todo.model.js";

class TodoService {
    // == Создание задачи ==
    async createTodo({ text, deadline, }) {
        if (!text) throw ApiError.BadRequestError("текст задачи не был передан");

        const count = await TodoModel.countDocuments();
        const todo = await TodoModel.create({
            text,
            deadline: deadline || null,
            order: count + 1,
        });

        return todo.toObject();
    }

    // == Получение задач ==
    async getTodos() {
        const todos = await TodoModel.find().sort({ order: 1 });
        return todos;
    }

    // == Удаление задачи ==
    async deleteTodo(id) {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        return deletedTodo;
    }

    // == Отметить задачу ==
    async toggleTodo(id) {
        const todo = await TodoModel.findById(id);
        todo.isCompleted = !todo.isCompleted;
        await todo.save();
        return todo;
    }
};

export const todoService = new TodoService();