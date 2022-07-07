import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { handleError } from "./middlewares/handleError.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleError);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});