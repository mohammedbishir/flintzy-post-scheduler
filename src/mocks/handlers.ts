import type { CreatePostInput, Post } from "@/types/post";
import { delay, http, HttpResponse } from "msw";
import seedPosts from "@/data/posts.json";

/** In-memory DB for the session — seeded from the local JSON file */
let posts: Post[] = structuredClone(seedPosts) as Post[];

function sortBySchedule(list: Post[]) {
  return [...list].sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );
}

export const handlers = [
  // GET /api/posts — list all posts
  http.get("/api/posts", async () => {
    await delay(400);
    return HttpResponse.json(sortBySchedule(posts));
  }),

  // POST /api/posts — create a scheduled post
  http.post("/api/posts", async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as CreatePostInput;

    const post: Post = {
      id: `p${Date.now()}`,
      content: body.content,
      platforms: body.platforms,
      mediaUrl: body.mediaUrl || undefined,
      scheduledAt: body.scheduledAt,
      status: "scheduled",
    };

    posts = [post, ...posts];
    return HttpResponse.json(post, { status: 201 });
  }),

  // POST /api/posts/:id/retry — retry a failed post
  // Assignment: 1s delay, 20% failure rate
  http.post("/api/posts/:id/retry", async ({ params }) => {
    await delay(1000);

    const id = String(params.id);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const failedAgain = Math.random() < 0.2;
    if (failedAgain) {
      const message = "Retry failed — platform rejected the post again.";
      posts[index] = {
        ...posts[index],
        status: "failed",
        errorMessage: message,
      };
      return HttpResponse.json({ message }, { status: 500 });
    }

    posts[index] = {
      ...posts[index],
      status: "scheduled",
      errorMessage: undefined,
    };
    return HttpResponse.json(posts[index]);
  }),
];
