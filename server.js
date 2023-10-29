import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Routes file
import routes from "./routes/index.js";
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
