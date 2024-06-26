import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { syncDatabase } from "./utils/sync-db.js";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json();
      return;
  }
  next();
});
app.use(express.urlencoded({ extended: true}));


syncDatabase();
routes(app);

export default app;