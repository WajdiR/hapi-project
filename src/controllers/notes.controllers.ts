// src/controllers/notesController.ts

import { Request, ResponseToolkit } from "@hapi/hapi";
import { notesService } from "../services/notes.services";
import { noteValidationSchema } from "../validators/note.validator";
import Joi, { ValidationError } from "joi";

export const notesController = {
  createNote: async (request: Request, h: ResponseToolkit) => {
    try {
      const validated = await noteValidationSchema.validateAsync(
        request.payload
      );
      const note = notesService.createNote(validated.title, validated.body);
      return h.response(note).code(201);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return h.response(error.details).code(400);
      }
      // Handle other types of errors or rethrow if not a validation error
      console.error(error);
      return h.response("Internal Server Error").code(500);
    }
  },
  /* createNote: async (request: Request, h: ResponseToolkit) => {
    try {
        const validated = await noteValidationSchema.validateAsync(request.payload);
        const note = notesService.createNote(validated.title, validated.body);
        return h.response(note).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ error: "Internal Server Error" }).code(500);
    }
},     */

  getAllNotes: (request: Request, h: ResponseToolkit) => {
    const notes = notesService.getAllNotes();
    return h.response(notes).code(200);
  },

  getNoteById: (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;
    const note = notesService.getNoteById(id);
    if (!note) {
      return h.response({ error: "Note not found" }).code(404);
    }
    return h.response(note).code(200);
  },

  updateNote: async (request: Request, h: ResponseToolkit) => {
    try {
      const { id } = request.params;
      const validated = await noteValidationSchema.validateAsync(
        request.payload
      );
      const note = notesService.updateNote(id, validated.title, validated.body);
      if (!note) {
        return h.response("Not Found").code(404);
      }
      return h.response(note).code(200);
    } catch (error) {
      if (error instanceof ValidationError) {
        return h.response(error.details).code(400);
      }
      console.error("Internal Server Error:", error);
      return h.response("Internal Server Error").code(500);
    }
  },
  deleteNote: (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;
    notesService.deleteNote(id);
    return h.response().code(204);
  },
};
