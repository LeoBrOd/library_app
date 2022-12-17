import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import dataBase from "./config/database.js";
import router from "./routes/UsersAndLibrary.js";
import path from "path";

dotenv.config();
const app = express();
const _dirname = path.resolve();

app.use(
  cors({
    credentials: true,
    origin:
      "https://leobrod.github.io/library_app/",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `run on ${process.env.PORT || 8080}`
  );
});

try {
  await dataBase.authenticate();
  console.log("Database connected");
} catch (e) {
  console.log(e);
}

app.use(
  express.static(path.join(_dirname, "./build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(
      _dirname,
      "./build",
      "index.html"
    )
  );
});
