import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import { startBrowser } from "./utils/browser.js";
import { request_logger } from "./middleware/request-logger.js";
import path from "path";

export const browser = await startBrowser();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(request_logger);

app.use("/api", routes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(
    "Node Production Environment:",
    process.env.NODE_ENV === "production"
  );
});
