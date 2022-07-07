import { Router } from "express";
import { postBattle } from "../controllers/battleController.js";
import { validateUsernames } from "../middlewares/battleMiddleware.js";

const battleRouter = Router();

battleRouter.post("/battle", validateUsernames ,postBattle);

export default battleRouter;