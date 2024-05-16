import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(7000, () => {
  console.log("Server is running on http://locahost:7000");
});
