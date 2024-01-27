// src/app.ts

import Hapi from "@hapi/hapi";
import { notesRoutes } from "./routes/notes.routes";
import { requestLogger } from "./middlewares/requestLogger";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  requestLogger(server); // Apply the request logger middleware
  notesRoutes(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
