import { Application, Context } from "https://deno.land/x/oak/mod.ts";

const PORT = 4446;
const app = new Application();

app.use(async (ctx: Context) => {
  await ctx.send({
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

app.addEventListener("listen", ({ hostname = "localhost", port = PORT }) => {
  console.log(`Server running on ${hostname}:${PORT}`);
});

await app.listen({ port: PORT });
