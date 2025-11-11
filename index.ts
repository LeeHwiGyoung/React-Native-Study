import { createServer, Response, Server } from "miragejs";
import "expo-router/entry";

declare global {
  interface Window {
    server: Server;
  }
}

if (__DEV__) {
  if (window.server) {
    window.server.shutdown();
  }
}
window.server = createServer({
  routes() {
    this.post("/login", (schema, request) => {
      const { username, password } = JSON.parse(request.requestBody);

      if (username === "hwigyoung" && password === "1234") {
        return {
          accessToken: "access-token",
          refreshToken: "refresh-token",
          user: {
            id: "hwigyoung",
          },
        };
      } else {
        return new Response(401, {}, { message: "InValid credentials" });
      }
    });
  },
});
