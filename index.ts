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
            name: "휘경",
            profileImageUrl: "",
            description: "프론트엔드 개발자가 되고 싶은 사람",
          },
        };
      } else {
        return new Response(401, {}, { message: "InValid credentials" });
      }
    });
  },
});
