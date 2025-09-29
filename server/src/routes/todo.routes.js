import { Router } from "express";
import { todoController } from "../controllers/todo.controller.js";

// == Роутер для запросов задач ==
export const todoRouter = Router();

/*
GET /todos (возвращает массив задач)
POST /todos (добавление задачи)
DELETE /todos/:id (удаление задачи)
PATCH /todos/:id/toggle (отметить задачу)
PUT /todos/:id (изменение задачи)
PUT /todos/reorder (изменение порядка задач) (BULK-роутер)
*/

todoRouter.get("/todos", todoController.getTodos);
todoRouter.post("/todos", todoController.createTodo);
todoRouter.delete("/todos/:id", todoController.deleteTodo);
todoRouter.patch("/todos/:id/toggle", todoController.toggleTodo);
todoRouter.put("/todos/reorder", todoController.reorderTodos);
todoRouter.put("/todos/:id", todoController.updateTodo);