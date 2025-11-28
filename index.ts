import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
  RestSerializer,
  Server,
} from "miragejs";
import "expo-router/entry";
import { faker } from "@faker-js/faker";

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
  models: {
    user: Model.extend({
      posts: hasMany("post"),
    }),
    post: Model.extend({
      user: belongsTo("user"),
    }),
    activity: Model.extend({
      user: belongsTo("user"),
    }),
  },
  serializers: {
    post: RestSerializer.extend({
      include: ["user"],
      embed: true,
    }),
    activity: RestSerializer.extend({
      include: ["user"],
    }),
  },
  factories: {
    user: Factory.extend({
      id: () => faker.person.firstName(),
      name: () => faker.person.fullName(),
      description: () => faker.lorem.sentence(),
      profileImageUrl: () =>
        `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100_000)}?v=4`,
      isVerified: () => Math.random() > 0.5,
      follower: () => Math.floor(Math.random() * 1000),
      following: () => Math.random() > 0.3,
    }),
    post: Factory.extend({
      id: () => faker.string.numeric(6),
      content: () => faker.lorem.sentence(),
      imageUrls: () =>
        Array.from({ length: Math.floor(Math.random() * 3) }, () =>
          faker.image.url()
        ),
      likes: () => Math.floor(Math.random() * 100),
      comments: () => Math.floor(Math.random() * 100),
      reposts: () => Math.floor(Math.random() * 100),
      timeAgo: () => Math.floor(Math.random() * 10) + 1,
    }),
    activity: Factory.extend({
      id: () => faker.string.numeric(6),
      name: () => faker.person.fullName(),
      content: () => faker.lorem.sentence(),
    }),
  },
  seeds(server) {
    const hwigyoung = server.create("user", {
      id: "hwigyoung",
      name: "휘경",
      profileImageUrl: "",
      description: "프론트엔드 개발자가 되고 싶은 사람",
    });
    const users = server.createList("user", 10);
    users.forEach((user) => {
      server.createList("post", 10, {
        user,
      });
    });
    server.create("post", {
      id: "1",
      content: "Hello, world!",
      imgaeUrl: [],
      user: hwigyoung,
    });
  },
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

    this.post("/posts", (schema, request) => {
      const { posts } = JSON.parse(request.requestBody);
      posts.forEach((post: any) => {
        schema.create("post", {
          content: post.content,
          imageUrls: post.imageUrls,
          location: post.location,
          hashtag: post.hashtag,
          user: schema.find("user", "hwigyoung"),
        });
      });
    });

    this.get("/posts", (schema, request) => {
      let posts = schema.all("post");
      if (request.queryParams.type === "following") {
        posts = posts.filter((post) => post.user?.following);
      }

      let targetIndex = -1;

      if (request.queryParams.cursor) {
        targetIndex = posts.models.findIndex(
          (v) => v.id === request.queryParams.cursor
        );
      }
      return schema.all("post").slice(targetIndex + 1, targetIndex + 11);
    });

    this.get("/users/:userId/posts", (schema, request) => {
      const post = schema.where(
        "post",
        (post) => post.userId === request.params.userId
      );
      let targetIndex = -1;
      if (request.queryParams.cursor) {
        targetIndex = post.models.findIndex(
          (v) => v.id === request.queryParams.cursor
        );
      }
      return post.slice(targetIndex + 1, targetIndex + 6);
    });

    this.get("/posts/:id", (schema, request) => {
      return schema.find("post", request.params.id);
    });

    this.get("/replies/:id", (schema, request) => {
      const post = schema.where(
        "post",
        (post) => post.userId !== request.params.id
      );
      let targetIndex = -1;
      if (request.queryParams.cursor) {
        targetIndex = post.models.findIndex(
          (v) => v.id === request.queryParams.cursor
        );
      }
      return post.slice(targetIndex + 1, targetIndex + 6);
    });

    this.get("activities", (schema, request) => {
      const cursor = parseInt((request.queryParams.cursor as string) || "0");
      return schema.all("activity").slice(cursor, cursor + 10);
    });

    this.get("users", (schema, request) => {
      const users = schema.all("user");
      let targetIndex = -1;
      if (request.queryParams.cursor) {
        targetIndex = users.models.findIndex(
          (v) => v.id === request.queryParams.cursor
        );
      }

      return schema.all("user").slice(targetIndex + 1, targetIndex + 6);
    });

    this.get("users/:id", (schema, request) => {
      return schema.find("user", request.params.id.slice(1));
    });
  },
});
