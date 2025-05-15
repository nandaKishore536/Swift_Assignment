import http, { IncomingMessage, ServerResponse } from "http";
import { connectDB } from "./db";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const method = req.method || "";
  const url = req.url || "";
  const db = await connectDB();

  if (method === "GET" && url === "/load") {
    try {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch(`${BASE_URL}/users`).then(res => res.json()),
        fetch(`${BASE_URL}/posts`).then(res => res.json()),
        fetch(`${BASE_URL}/comments`).then(res => res.json()),
      ]);

      const users = usersRes.slice(0, 10);
      const userIds = users.map((u: any) => u.id);
      const posts = postsRes.filter((p: any) => userIds.includes(p.userId));
      const postIds = posts.map((p: any) => p.id);
      const comments = commentsRes.filter((c: any) => postIds.includes(c.postId));

      await db.collection("users").deleteMany({});
      await db.collection("posts").deleteMany({});
      await db.collection("comments").deleteMany({});

      await db.collection("users").insertMany(users);
      await db.collection("posts").insertMany(posts);
      await db.collection("comments").insertMany(comments);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Loaded users, posts, and comments." }));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Failed to load data" }));
    }
    return;
  }

if (method === "DELETE" && url === "/users") {
  try {
    const result = await db.collection("users").deleteMany({});
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Deleted ${result.deletedCount} users.` }));
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to delete users." }));
  }
  return;
}


 
  if (method === "DELETE" && url.startsWith("/users/")) {
    const userId = parseInt(url.split("/")[2]);
    try {
      const result = await db.collection("users").deleteOne({ id: userId });
      if (result.deletedCount === 0) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "User not found." }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: `User ${userId} deleted.` }));
      }
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Error deleting user." }));
    }
    return;
  }

  if (method === "GET" && url.startsWith("/users/")) {
    const userId = parseInt(url.split("/")[2]);
    try {
      const user = await db.collection("users").findOne({ id: userId });
      if (!user) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "User not found." }));
        return;
      }

      const posts = await db.collection("posts").find({ userId }).toArray();
      const postIds = posts.map((p: any) => p.id);
      const comments = await db.collection("comments").find({ postId: { $in: postIds } }).toArray();

      const postsWithComments = posts.map((post: any) => ({
        ...post,
        comments: comments.filter((c: any) => c.postId === post.id)
      }));

      const userWithPosts = {
        ...user,
        posts: postsWithComments
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userWithPosts));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Failed to fetch user." }));
    }
    return;
  }

  if (method === "PUT" && url === "/users") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const user = JSON.parse(body);
        const existing = await db.collection("users").findOne({ id: user.id });
        if (existing) {
          res.writeHead(409); // Conflict
          res.end(JSON.stringify({ error: "User already exists." }));
          return;
        }

        await db.collection("users").insertOne(user);
        res.writeHead(201, {
          "Content-Type": "application/json",
          "Location": `/users/${user.id}`
        });
        res.end(JSON.stringify({ message: "User created." }));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid user data." }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}
