
import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";
import { handlePost, handleRoot } from "./src/controllers/colorController.tsx";

const app = createApp();

app.post("/", handlePost);
app.handle("/", handleRoot);

app.listen({ port: 8080 });
