import express from "express";
import routes from "./routes/index.js";
import { startBrowser } from "./utils/browser.js";

export const browser = await startBrowser();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(
    "Node Production Environment:",
    process.env.NODE_ENV === "production"
  );
});
