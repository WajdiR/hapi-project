// src/routes/notesRoutes.ts

import { Server } from "@hapi/hapi";
import { notesController } from "../controllers/notes.controllers";

export const notesRoutes = (server: Server) => {
  server.route([
    {
      method: "POST",
      path: "/notes",
      handler: notesController.createNote,
    },
    {
      method: "GET",
      path: "/notes",
      handler: notesController.getAllNotes,
    },
    {
      method: "GET",
      path: "/notes/{id}",
      handler: notesController.getNoteById,
    },
    {
      method: "PUT",
      path: "/notes/{id}",
      handler: notesController.updateNote,
    },
    {
      method: "DELETE",
      path: "/notes/{id}",
      handler: notesController.deleteNote,
    },
  ]);
};
