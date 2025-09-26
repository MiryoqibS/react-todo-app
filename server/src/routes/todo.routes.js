import { Router } from "express";
import { todoController } from "../controllers/todo.controller.js";

// == Роутер для запросов задач ==
export const todoRouter = Router();

/*
GET /todos (возвращает массив задач)
POST /todos (добавление задачи)
DELETE /todos/:id (удаление задачи)
PATCH /todos/:id/toggle (отметить задачу)
*/

todoRouter.get("/todos", todoController.getTodos);
todoRouter.post("/todos", todoController.createTodo);
todoRouter.delete("/todos/:id", todoController.deleteTodo);
todoRouter.patch("/todos/:id/toggle", todoController.toggleTodo);