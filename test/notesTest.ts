import { Server } from "@hapi/hapi";
import { notesController } from "../src/controllers/notes.controllers";
import { notesService } from "../src/services/notes.services";
import { Note } from "../src/models/note"; // Import the Note class

describe("Notes Controller Test", () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.initialize();
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new note", async () => {
    const requestPayload = {
      title: "Test Note",
      body: "This is a test note.",
    };

    const response = await server.inject({
      method: "POST",
      url: "/notes",
      payload: requestPayload,
    });

    // Create an instance of Note for the expected result
    const expectedNote = new Note(
      response.result.id,
      requestPayload.title,
      requestPayload.body
    );

    expect(response.statusCode).toBe(201);
    expect(response.result).toEqual(expectedNote); // Compare with the instance of Note
  });

  it("should return all notes", async () => {
    const getAllNotesSpy = jest.spyOn(notesService, "getAllNotes");
    getAllNotesSpy.mockReturnValue([
      {
        id: "1",
        title: "Note 1",
        body: "This is note 1.",
      },
      {
        id: "2",
        title: "Note 2",
        body: "This is note 2.",
      },
    ]);

    const response = await server.inject({
      method: "GET",
      url: "/notes",
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toHaveLength(2);
    expect(response.result).toContainEqual({
      id: "1",
      title: "Note 1",
      body: "This is note 1.",
    });
    expect(response.result).toContainEqual({
      id: "2",
      title: "Note 2",
      body: "This is note 2.",
    });
  });

  it("should return a specific note by ID", async () => {
    const getNoteByIdSpy = jest.spyOn(notesService, "getNoteById");
    getNoteByIdSpy.mockReturnValue({
      id: "1",
      title: "Test Note",
      body: "This is a test note.",
    });

    const response = await server.inject({
      method: "GET",
      url: "/notes/1",
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual({
      id: "1",
      title: "Test Note",
      body: "This is a test note.",
    });
  });

  it("should update a specific note by ID", async () => {
    const updateNoteSpy = jest.spyOn(notesService, "updateNote");
    updateNoteSpy.mockReturnValue({
      id: "1",
      title: "Updated Note",
      body: "This is an updated note.",
    });

    const requestPayload = {
      title: "Updated Note",
      body: "This is an updated note.",
    };

    const response = await server.inject({
      method: "PUT",
      url: "/notes/1",
      payload: requestPayload,
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual({
      id: "1",
      title: "Updated Note",
      body: "This is an updated note.",
    });
  });

  it("should delete a specific note by ID", async () => {
    const deleteNoteSpy = jest.spyOn(notesService, "deleteNote");
    deleteNoteSpy.mockReturnValue();

    const response = await server.inject({
      method: "DELETE",
      url: "/notes/1",
    });

    expect(response.statusCode).toBe(204);
  });
});
