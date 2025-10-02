import { TodoModel } from "../models/todo.model.js";
import { ApiError } from "../errors/ApiError.js";

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

    // == Отметить задачу как выполненная ==
    async toggleTodo(id) {
        const todo = await TodoModel.findById(id);
        if (!todo) throw ApiError.BadRequestError();
        todo.isCompleted = !todo.isCompleted;
        await todo.save();
        return todo;
    }

    // == Отметить задачу как избранное =
    async starTodo(id) {
        const todo = await TodoModel.findById(id);
        if (!todo) throw ApiError.BadRequestError();
        todo.isStarred = !todo.isStarred;
        await todo.save();
        return todo;
    }

    // == Обновление задачи ==
    async updateTodo(id, updatedFields) {
        const todo = await TodoModel.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true, runValidators: true }
        );
        return todo;
    }

    // == Изменение порядка задач ==
    async reorderTodos(updatedTodos) {
        const bulkOps = updatedTodos.map((todo) => ({
            updateOne: {
                filter: { _id: todo.id },
                update: { order: todo.order },
            },
        }));

        return await TodoModel.bulkWrite(bulkOps);
    }
};

export const todoService = new TodoService();