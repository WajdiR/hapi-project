// src/middlewares/requestLogger.ts

import { Request, ResponseToolkit, Lifecycle, Server } from "@hapi/hapi";

export const requestLogger = (server: Server) => {
  server.ext("onRequest", (request: Request, h: ResponseToolkit) => {
    const { method, path } = request;
    console.log(`Received ${method.toUpperCase()} request for ${path}`);
    return h.continue;
  });

  server.ext("onPreResponse", (request: Request, h: ResponseToolkit) => {
    const responseTime = Date.now() - request.info.received;
    console.log(
      `Response time for ${request.method.toUpperCase()} ${
        request.path
      }: ${responseTime}ms`
    );
    return h.continue;
  });
};
